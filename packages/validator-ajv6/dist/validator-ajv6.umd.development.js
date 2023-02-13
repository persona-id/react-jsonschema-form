(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash-es/toPath'), require('@rjsf/utils'), require('ajv'), require('lodash-es/isObject')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash-es/toPath', '@rjsf/utils', 'ajv', 'lodash-es/isObject'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@rjsf/validator-ajv6"] = {}, global.toPath, global.utils, global.Ajv, global.isObject));
})(this, (function (exports, toPath, utils, Ajv, isObject) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var toPath__default = /*#__PURE__*/_interopDefaultLegacy(toPath);
  var Ajv__default = /*#__PURE__*/_interopDefaultLegacy(Ajv);
  var isObject__default = /*#__PURE__*/_interopDefaultLegacy(isObject);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  var AJV_CONFIG = {
    errorDataPath: "property",
    allErrors: true,
    multipleOfPrecision: 8,
    schemaId: "auto",
    unknownFormats: "ignore"
  };
  var COLOR_FORMAT_REGEX = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/;
  var DATA_URL_FORMAT_REGEX = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
  /** Creates an Ajv version 6 implementation object with standard support for the 'color` and `data-url` custom formats.
   * If `additionalMetaSchemas` are provided then the Ajv instance is modified to add each of the meta schemas in the
   * list. If `customFormats` are provided then those additional formats are added to the list of supported formats. If
   * `ajvOptionsOverrides` are provided then they are spread on top of the default `AJV_CONFIG` options when constructing
   * the `Ajv` instance.
   *
   * @param [additionalMetaSchemas] - The list of additional meta schemas that the validator can access
   * @param [customFormats] - The set of additional custom formats that the validator will support
   * @param [ajvOptionsOverrides={}] - The set of validator config override options
   * @deprecated in favor of the `@rjsf/validator-ajv8
   */
  function createAjvInstance(additionalMetaSchemas, customFormats, ajvOptionsOverrides) {
    if (ajvOptionsOverrides === void 0) {
      ajvOptionsOverrides = {};
    }
    var ajv = new Ajv__default["default"](_extends({}, AJV_CONFIG, ajvOptionsOverrides));
    // add custom formats
    ajv.addFormat("data-url", DATA_URL_FORMAT_REGEX);
    ajv.addFormat("color", COLOR_FORMAT_REGEX);
    // add more schemas to validate against
    if (Array.isArray(additionalMetaSchemas)) {
      ajv.addMetaSchema(additionalMetaSchemas);
    }
    // add more custom formats to validate against
    if (isObject__default["default"](customFormats)) {
      Object.keys(customFormats).forEach(function (formatName) {
        ajv.addFormat(formatName, customFormats[formatName]);
      });
    }
    return ajv;
  }

  var ROOT_SCHEMA_PREFIX = "__rjsf_rootSchema";
  /** `ValidatorType` implementation that uses the AJV 6 validation mechanism.
   *
   * @deprecated in favor of the `@rjsf/validator-ajv8
   */
  var AJV6Validator = /*#__PURE__*/function () {
    /** The AJV instance to use for all validations
     *
     * @private
     */

    /** Constructs an `AJV6Validator` instance using the `options`
     *
     * @param options - The `CustomValidatorOptionsType` options that are used to create the AJV instance
     */
    function AJV6Validator(options) {
      this.ajv = void 0;
      var additionalMetaSchemas = options.additionalMetaSchemas,
        customFormats = options.customFormats,
        ajvOptionsOverrides = options.ajvOptionsOverrides;
      this.ajv = createAjvInstance(additionalMetaSchemas, customFormats, ajvOptionsOverrides);
    }
    /** Transforms a ajv validation errors list:
     * [
     *   {property: '.level1.level2[2].level3', message: 'err a'},
     *   {property: '.level1.level2[2].level3', message: 'err b'},
     *   {property: '.level1.level2[4].level3', message: 'err b'},
     * ]
     * Into an error tree:
     * {
     *   level1: {
     *     level2: {
     *       2: {level3: {errors: ['err a', 'err b']}},
     *       4: {level3: {errors: ['err b']}},
     *     }
     *   }
     * };
     *
     * @param errors - The list of RJSFValidationError objects
     * @private
     */
    var _proto = AJV6Validator.prototype;
    _proto.toErrorSchema = function toErrorSchema(errors) {
      var builder = new utils.ErrorSchemaBuilder();
      if (errors.length) {
        errors.forEach(function (error) {
          var property = error.property,
            message = error.message;
          var path = toPath__default["default"](property);
          // If the property is at the root (.level1) then toPath creates
          // an empty array element at the first index. Remove it.
          if (path.length > 0 && path[0] === "") {
            path.splice(0, 1);
          }
          if (message) {
            builder.addErrors(message, path);
          }
        });
      }
      return builder.ErrorSchema;
    }
    /** Converts an `errorSchema` into a list of `RJSFValidationErrors`
     *
     * @param errorSchema - The `ErrorSchema` instance to convert
     * @param [fieldPath=[]] - The current field path, defaults to [] if not specified
     */;
    _proto.toErrorList = function toErrorList(errorSchema, fieldPath) {
      var _this = this;
      if (fieldPath === void 0) {
        fieldPath = [];
      }
      if (!errorSchema) {
        return [];
      }
      var errorList = [];
      if (utils.ERRORS_KEY in errorSchema) {
        errorList = errorList.concat(errorSchema.__errors.map(function (message) {
          var property = "." + fieldPath.join(".");
          return {
            property: property,
            message: message,
            stack: property + " " + message
          };
        }));
      }
      return Object.keys(errorSchema).reduce(function (acc, key) {
        if (key !== utils.ERRORS_KEY) {
          acc = acc.concat(_this.toErrorList(errorSchema[key], [].concat(fieldPath, [key])));
        }
        return acc;
      }, errorList);
    }
    /** Given a `formData` object, recursively creates a `FormValidation` error handling structure around it
     *
     * @param formData - The form data around which the error handler is created
     * @private
     */;
    _proto.createErrorHandler = function createErrorHandler(formData) {
      var _this2 = this;
      var handler = {
        // We store the list of errors for this node in a property named __errors
        // to avoid name collision with a possible sub schema field named
        // 'errors' (see `utils.toErrorSchema`).
        __errors: [],
        addError: function addError(message) {
          this.__errors.push(message);
        }
      };
      if (utils.isObject(formData)) {
        var formObject = formData;
        return Object.keys(formObject).reduce(function (acc, key) {
          var _extends2;
          return _extends({}, acc, (_extends2 = {}, _extends2[key] = _this2.createErrorHandler(formObject[key]), _extends2));
        }, handler);
      }
      if (Array.isArray(formData)) {
        return formData.reduce(function (acc, value, key) {
          var _extends3;
          return _extends({}, acc, (_extends3 = {}, _extends3[key] = _this2.createErrorHandler(value), _extends3));
        }, handler);
      }
      return handler;
    }
    /** Unwraps the `errorHandler` structure into the associated `ErrorSchema`, stripping the `addError` functions from it
     *
     * @param errorHandler - The `FormValidation` error handling structure
     * @private
     */;
    _proto.unwrapErrorHandler = function unwrapErrorHandler(errorHandler) {
      var _this3 = this;
      return Object.keys(errorHandler).reduce(function (acc, key) {
        var _extends5;
        if (key === "addError") {
          return acc;
        } else if (key === utils.ERRORS_KEY) {
          var _extends4;
          return _extends({}, acc, (_extends4 = {}, _extends4[key] = errorHandler[key], _extends4));
        }
        return _extends({}, acc, (_extends5 = {}, _extends5[key] = _this3.unwrapErrorHandler(errorHandler[key]), _extends5));
      }, {});
    }
    /** Transforming the error output from ajv to format used by @rjsf/utils.
     * At some point, components should be updated to support ajv.
     *
     * @param errors - The list of AJV errors to convert to `RJSFValidationErrors`
     * @private
     */;
    _proto.transformRJSFValidationErrors = function transformRJSFValidationErrors(errors) {
      if (errors === void 0) {
        errors = [];
      }
      return errors.map(function (e) {
        var dataPath = e.dataPath,
          keyword = e.keyword,
          message = e.message,
          params = e.params,
          schemaPath = e.schemaPath;
        var property = "" + dataPath;
        // put data in expected format
        return {
          name: keyword,
          property: property,
          message: message,
          params: params,
          stack: (property + " " + message).trim(),
          schemaPath: schemaPath
        };
      });
    }
    /** Runs the pure validation of the `schema` and `formData` without any of the RJSF functionality. Provided for use
     * by the playground. Returns the `errors` from the validation
     *
     * @param schema - The schema against which to validate the form data   * @param schema
     * @param formData - The form data to validate
     */;
    _proto.rawValidation = function rawValidation(schema, formData) {
      var validationError = undefined;
      try {
        this.ajv.validate(schema, formData);
      } catch (err) {
        validationError = err;
      }
      var errors = this.ajv.errors || undefined;
      // Clear errors to prevent persistent errors, see #1104
      this.ajv.errors = null;
      return {
        errors: errors,
        validationError: validationError
      };
    }
    /** This function processes the `formData` with an optional user contributed `customValidate` function, which receives
     * the form data and a `errorHandler` function that will be used to add custom validation errors for each field. Also
     * supports a `transformErrors` function that will take the raw AJV validation errors, prior to custom validation and
     * transform them in what ever way it chooses.
     *
     * @param formData - The form data to validate
     * @param schema - The schema against which to validate the form data
     * @param [customValidate] - An optional function that is used to perform custom validation
     * @param [transformErrors] - An optional function that is used to transform errors after AJV validation
     * @param [uiSchema] - An optional uiSchema that is passed to `transformErrors` and `customValidate`
     */;
    _proto.validateFormData = function validateFormData(formData, schema, customValidate, transformErrors, uiSchema) {
      var rootSchema = schema;
      var rawErrors = this.rawValidation(schema, formData);
      var validationError = rawErrors.validationError;
      var errors = this.transformRJSFValidationErrors(rawErrors.errors);
      var noProperMetaSchema = validationError && validationError.message && validationError.message.includes("no schema with key or ref ");
      if (noProperMetaSchema) {
        errors = [].concat(errors, [{
          stack: validationError.message
        }]);
      }
      if (typeof transformErrors === "function") {
        errors = transformErrors(errors, uiSchema);
      }
      var errorSchema = this.toErrorSchema(errors);
      if (noProperMetaSchema) {
        errorSchema = _extends({}, errorSchema, {
          $schema: {
            __errors: [validationError.message]
          }
        });
      }
      if (typeof customValidate !== "function") {
        return {
          errors: errors,
          errorSchema: errorSchema
        };
      }
      // Include form data with undefined values, which is required for custom validation.
      var newFormData = utils.getDefaultFormState(this, schema, formData, rootSchema, true);
      var errorHandler = customValidate(newFormData, this.createErrorHandler(newFormData), uiSchema);
      var userErrorSchema = this.unwrapErrorHandler(errorHandler);
      return utils.mergeValidationData(this, {
        errors: errors,
        errorSchema: errorSchema
      }, userErrorSchema);
    }
    /** Takes a `node` object and transforms any contained `$ref` node variables with a prefix, recursively calling
     * `withIdRefPrefix` for any other elements.
     *
     * @param node - The object node to which a ROOT_SCHEMA_PREFIX is added when a REF_KEY is part of it
     * @private
     */;
    _proto.withIdRefPrefixObject = function withIdRefPrefixObject(node) {
      for (var key in node) {
        var realObj = node;
        var value = realObj[key];
        if (key === utils.REF_KEY && typeof value === "string" && value.startsWith("#")) {
          realObj[key] = ROOT_SCHEMA_PREFIX + value;
        } else {
          realObj[key] = this.withIdRefPrefix(value);
        }
      }
      return node;
    }
    /** Takes a `node` object list and transforms any contained `$ref` node variables with a prefix, recursively calling
     * `withIdRefPrefix` for any other elements.
     *
     * @param node - The list of object nodes to which a ROOT_SCHEMA_PREFIX is added when a REF_KEY is part of it
     * @private
     */;
    _proto.withIdRefPrefixArray = function withIdRefPrefixArray(node) {
      for (var i = 0; i < node.length; i++) {
        node[i] = this.withIdRefPrefix(node[i]);
      }
      return node;
    }
    /** Validates data against a schema, returning true if the data is valid, or
     * false otherwise. If the schema is invalid, then this function will return
     * false.
     *
     * @param schema - The schema against which to validate the form data   * @param schema
     * @param formData- - The form data to validate
     * @param rootSchema - The root schema used to provide $ref resolutions
     */;
    _proto.isValid = function isValid(schema, formData, rootSchema) {
      try {
        // add the rootSchema ROOT_SCHEMA_PREFIX as id.
        // then rewrite the schema ref's to point to the rootSchema
        // this accounts for the case where schema have references to models
        // that lives in the rootSchema but not in the schema in question.
        var result = this.ajv.addSchema(rootSchema, ROOT_SCHEMA_PREFIX).validate(this.withIdRefPrefix(schema), formData);
        return result;
      } catch (e) {
        return false;
      } finally {
        // make sure we remove the rootSchema from the global ajv instance
        this.ajv.removeSchema(ROOT_SCHEMA_PREFIX);
      }
    }
    /** Recursively prefixes all $ref's in a schema with `ROOT_SCHEMA_PREFIX`
     * This is used in isValid to make references to the rootSchema
     *
     * @param schemaNode - The object node to which a ROOT_SCHEMA_PREFIX is added when a REF_KEY is part of it
     * @protected
     */;
    _proto.withIdRefPrefix = function withIdRefPrefix(schemaNode) {
      if (schemaNode.constructor === Object) {
        return this.withIdRefPrefixObject(_extends({}, schemaNode));
      }
      if (Array.isArray(schemaNode)) {
        return this.withIdRefPrefixArray([].concat(schemaNode));
      }
      return schemaNode;
    };
    return AJV6Validator;
  }();

  /** Creates and returns a customized implementation of the `ValidatorType` with the given customization `options` if
   * provided.
   *
   * @param [options={}] - The `CustomValidatorOptionsType` options that are used to create the `ValidatorType` instance
   * @deprecated in favor of the `@rjsf/validator-ajv8
   */
  function customizeValidator(options) {
    if (options === void 0) {
      options = {};
    }
    return new AJV6Validator(options);
  }

  /** @deprecated in favor of the `@rjsf/validator-ajv8
   */
  var index = /*#__PURE__*/customizeValidator();

  exports.customizeValidator = customizeValidator;
  exports["default"] = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=validator-ajv6.umd.development.js.map
