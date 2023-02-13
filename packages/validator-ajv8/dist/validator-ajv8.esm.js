import toPath from 'lodash-es/toPath';
import isObject from 'lodash-es/isObject';
import clone from 'lodash-es/clone';
import { ADDITIONAL_PROPERTY_FLAG, RJSF_ADDITONAL_PROPERTIES_FLAG, ErrorSchemaBuilder, ERRORS_KEY, getUiOptions, PROPERTIES_KEY, getDefaultFormState, mergeValidationData, REF_KEY } from '@rjsf/utils';
import get from 'lodash-es/get';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

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
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var AJV_CONFIG = {
  allErrors: true,
  multipleOfPrecision: 8,
  strict: false,
  verbose: true
};
var COLOR_FORMAT_REGEX = /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/;
var DATA_URL_FORMAT_REGEX = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
/** Creates an Ajv version 8 implementation object with standard support for the 'color` and `data-url` custom formats.
 * If `additionalMetaSchemas` are provided then the Ajv instance is modified to add each of the meta schemas in the
 * list. If `customFormats` are provided then those additional formats are added to the list of supported formats. If
 * `ajvOptionsOverrides` are provided then they are spread on top of the default `AJV_CONFIG` options when constructing
 * the `Ajv` instance. With Ajv v8, the JSON Schema formats are not provided by default, but can be plugged in. By
 * default, all formats from the `ajv-formats` library are added. To disable this capability, set the `ajvFormatOptions`
 * parameter to `false`. Additionally, you can configure the `ajv-formats` by providing a custom set of
 * [format options](https://github.com/ajv-validator/ajv-formats) to the `ajvFormatOptions` parameter.
 *
 * @param [additionalMetaSchemas] - The list of additional meta schemas that the validator can access
 * @param [customFormats] - The set of additional custom formats that the validator will support
 * @param [ajvOptionsOverrides={}] - The set of validator config override options
 * @param [ajvFormatOptions] - The `ajv-format` options to use when adding formats to `ajv`; pass `false` to disable it
 * @param [AjvClass] - The `Ajv` class to use when creating the validator instance
 */
function createAjvInstance(additionalMetaSchemas, customFormats, ajvOptionsOverrides, ajvFormatOptions, AjvClass) {
  if (ajvOptionsOverrides === void 0) {
    ajvOptionsOverrides = {};
  }
  if (AjvClass === void 0) {
    AjvClass = Ajv;
  }
  var ajv = new AjvClass(_extends({}, AJV_CONFIG, ajvOptionsOverrides));
  if (ajvFormatOptions) {
    addFormats(ajv, ajvFormatOptions);
  } else if (ajvFormatOptions !== false) {
    addFormats(ajv);
  }
  // add custom formats
  ajv.addFormat("data-url", DATA_URL_FORMAT_REGEX);
  ajv.addFormat("color", COLOR_FORMAT_REGEX);
  // Add RJSF-specific additional properties keywords so Ajv doesn't report errors if strict is enabled.
  ajv.addKeyword(ADDITIONAL_PROPERTY_FLAG);
  ajv.addKeyword(RJSF_ADDITONAL_PROPERTIES_FLAG);
  // add more schemas to validate against
  if (Array.isArray(additionalMetaSchemas)) {
    ajv.addMetaSchema(additionalMetaSchemas);
  }
  // add more custom formats to validate against
  if (isObject(customFormats)) {
    Object.keys(customFormats).forEach(function (formatName) {
      ajv.addFormat(formatName, customFormats[formatName]);
    });
  }
  return ajv;
}

var _excluded = ["instancePath", "keyword", "params", "schemaPath", "parentSchema"];
var ROOT_SCHEMA_PREFIX = "__rjsf_rootSchema";
/** `ValidatorType` implementation that uses the AJV 8 validation mechanism.
 */
var AJV8Validator = /*#__PURE__*/function () {
  /** The AJV instance to use for all validations
   *
   * @private
   */

  /** The Localizer function to use for localizing Ajv errors
   *
   * @private
   */

  /** Constructs an `AJV8Validator` instance using the `options`
   *
   * @param options - The `CustomValidatorOptionsType` options that are used to create the AJV instance
   * @param [localizer] - If provided, is used to localize a list of Ajv `ErrorObject`s
   */
  function AJV8Validator(options, localizer) {
    this.ajv = void 0;
    this.localizer = void 0;
    var additionalMetaSchemas = options.additionalMetaSchemas,
      customFormats = options.customFormats,
      ajvOptionsOverrides = options.ajvOptionsOverrides,
      ajvFormatOptions = options.ajvFormatOptions,
      AjvClass = options.AjvClass;
    this.ajv = createAjvInstance(additionalMetaSchemas, customFormats, ajvOptionsOverrides, ajvFormatOptions, AjvClass);
    this.localizer = localizer;
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
  var _proto = AJV8Validator.prototype;
  _proto.toErrorSchema = function toErrorSchema(errors) {
    var builder = new ErrorSchemaBuilder();
    if (errors.length) {
      errors.forEach(function (error) {
        var property = error.property,
          message = error.message;
        var path = toPath(property);
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
    if (ERRORS_KEY in errorSchema) {
      errorList = errorList.concat(errorSchema[ERRORS_KEY].map(function (message) {
        var property = "." + fieldPath.join(".");
        return {
          property: property,
          message: message,
          stack: property + " " + message
        };
      }));
    }
    return Object.keys(errorSchema).reduce(function (acc, key) {
      if (key !== ERRORS_KEY) {
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
    if (Array.isArray(formData)) {
      return formData.reduce(function (acc, value, key) {
        var _extends2;
        return _extends({}, acc, (_extends2 = {}, _extends2[key] = _this2.createErrorHandler(value), _extends2));
      }, handler);
    }
    if (isObject(formData)) {
      var formObject = formData;
      return Object.keys(formObject).reduce(function (acc, key) {
        var _extends3;
        return _extends({}, acc, (_extends3 = {}, _extends3[key] = _this2.createErrorHandler(formObject[key]), _extends3));
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
      } else if (key === ERRORS_KEY) {
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
   * @protected
   */;
  _proto.transformRJSFValidationErrors = function transformRJSFValidationErrors(errors, uiSchema) {
    if (errors === void 0) {
      errors = [];
    }
    return errors.map(function (e) {
      var instancePath = e.instancePath,
        keyword = e.keyword,
        params = e.params,
        schemaPath = e.schemaPath,
        parentSchema = e.parentSchema,
        rest = _objectWithoutPropertiesLoose(e, _excluded);
      var _rest$message = rest.message,
        message = _rest$message === void 0 ? "" : _rest$message;
      var property = instancePath.replace(/\//g, ".");
      var stack = (property + " " + message).trim();
      if ("missingProperty" in params) {
        property = property ? property + "." + params.missingProperty : params.missingProperty;
        var currentProperty = params.missingProperty;
        var uiSchemaTitle = getUiOptions(get(uiSchema, "" + property.replace(/^\./, ""))).title;
        if (uiSchemaTitle) {
          message = message.replace(currentProperty, uiSchemaTitle);
        } else {
          var parentSchemaTitle = get(parentSchema, [PROPERTIES_KEY, currentProperty, "title"]);
          if (parentSchemaTitle) {
            message = message.replace(currentProperty, parentSchemaTitle);
          }
        }
        stack = message;
      } else {
        var _uiSchemaTitle = getUiOptions(get(uiSchema, "" + property.replace(/^\./, ""))).title;
        if (_uiSchemaTitle) {
          stack = ("'" + _uiSchemaTitle + "' " + message).trim();
        } else {
          var _parentSchemaTitle = parentSchema === null || parentSchema === void 0 ? void 0 : parentSchema.title;
          if (_parentSchemaTitle) {
            stack = ("'" + _parentSchemaTitle + "' " + message).trim();
          }
        }
      }
      // put data in expected format
      return {
        name: keyword,
        property: property,
        message: message,
        params: params,
        stack: stack,
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
    var compilationError = undefined;
    var compiledValidator;
    if (schema["$id"]) {
      compiledValidator = this.ajv.getSchema(schema["$id"]);
    }
    try {
      if (compiledValidator === undefined) {
        compiledValidator = this.ajv.compile(schema);
      }
      compiledValidator(formData);
    } catch (err) {
      compilationError = err;
    }
    var errors;
    if (compiledValidator) {
      if (typeof this.localizer === "function") {
        this.localizer(compiledValidator.errors);
      }
      errors = compiledValidator.errors || undefined;
      // Clear errors to prevent persistent errors, see #1104
      compiledValidator.errors = null;
    }
    return {
      errors: errors,
      validationError: compilationError
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
    var rawErrors = this.rawValidation(schema, formData);
    var invalidSchemaError = rawErrors.validationError;
    var errors = this.transformRJSFValidationErrors(rawErrors.errors, uiSchema);
    if (invalidSchemaError) {
      errors = [].concat(errors, [{
        stack: invalidSchemaError.message
      }]);
    }
    if (typeof transformErrors === "function") {
      errors = transformErrors(errors, uiSchema);
    }
    var errorSchema = this.toErrorSchema(errors);
    if (invalidSchemaError) {
      errorSchema = _extends({}, errorSchema, {
        $schema: {
          __errors: [invalidSchemaError.message]
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
    var newFormData = getDefaultFormState(this, schema, formData, schema, true);
    var errorHandler = customValidate(newFormData, this.createErrorHandler(newFormData), uiSchema);
    var userErrorSchema = this.unwrapErrorHandler(errorHandler);
    return mergeValidationData(this, {
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
      if (key === REF_KEY && typeof value === "string" && value.startsWith("#")) {
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
   * @param schema - The schema against which to validate the form data
   * @param formData - The form data to validate
   * @param rootSchema - The root schema used to provide $ref resolutions
   */;
  _proto.isValid = function isValid(schema, formData, rootSchema) {
    var _rootSchema$$id;
    var rootSchemaId = (_rootSchema$$id = rootSchema["$id"]) != null ? _rootSchema$$id : ROOT_SCHEMA_PREFIX;
    try {
      // add the rootSchema ROOT_SCHEMA_PREFIX as id.
      // then rewrite the schema ref's to point to the rootSchema
      // this accounts for the case where schema have references to models
      // that lives in the rootSchema but not in the schema in question.
      if (this.ajv.getSchema(rootSchemaId) === undefined) {
        this.ajv.addSchema(rootSchema, rootSchemaId);
      }
      var schemaWithIdRefPrefix = this.withIdRefPrefix(schema);
      var compiledValidator;
      if (schemaWithIdRefPrefix["$id"]) {
        compiledValidator = this.ajv.getSchema(schemaWithIdRefPrefix["$id"]);
      }
      if (compiledValidator === undefined) {
        compiledValidator = this.ajv.compile(schemaWithIdRefPrefix);
      }
      var result = compiledValidator(formData);
      return result;
    } catch (e) {
      console.warn("Error encountered compiling schema:", e);
      return false;
    } finally {
      // TODO: A function should be called if the root schema changes so we don't have to remove and recompile the schema every run.
      // make sure we remove the rootSchema from the global ajv instance
      this.ajv.removeSchema(rootSchemaId);
    }
  }
  /** Recursively prefixes all $ref's in a schema with `ROOT_SCHEMA_PREFIX`
   * This is used in isValid to make references to the rootSchema
   *
   * @param schemaNode - The object node to which a ROOT_SCHEMA_PREFIX is added when a REF_KEY is part of it
   * @protected
   */;
  _proto.withIdRefPrefix = function withIdRefPrefix(schemaNode) {
    if (Array.isArray(schemaNode)) {
      return this.withIdRefPrefixArray([].concat(schemaNode));
    }
    if (isObject(schemaNode)) {
      return this.withIdRefPrefixObject(clone(schemaNode));
    }
    return schemaNode;
  };
  return AJV8Validator;
}();

/** Creates and returns a customized implementation of the `ValidatorType` with the given customization `options` if
 * provided.
 *
 * @param [options={}] - The `CustomValidatorOptionsType` options that are used to create the `ValidatorType` instance
 * @param [localizer] - If provided, is used to localize a list of Ajv `ErrorObject`s
 */
function customizeValidator(options, localizer) {
  if (options === void 0) {
    options = {};
  }
  return new AJV8Validator(options, localizer);
}

var index = /*#__PURE__*/customizeValidator();

export { customizeValidator, index as default };
//# sourceMappingURL=validator-ajv8.esm.js.map
