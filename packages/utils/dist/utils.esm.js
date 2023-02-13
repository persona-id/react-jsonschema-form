import isEqualWith from 'lodash-es/isEqualWith';
import get from 'lodash-es/get';
import isEmpty from 'lodash-es/isEmpty';
import jsonpointer from 'jsonpointer';
import omit from 'lodash-es/omit';
import has from 'lodash-es/has';
import isObject$1 from 'lodash-es/isObject';
import isString from 'lodash-es/isString';
import reduce from 'lodash-es/reduce';
import times from 'lodash-es/times';
import set from 'lodash-es/set';
import mergeAllOf from 'json-schema-merge-allof';
import union from 'lodash-es/union';
import isEqual from 'lodash-es/isEqual';
import cloneDeep from 'lodash-es/cloneDeep';
import React from 'react';
import ReactIs from 'react-is';

/** Determines whether a `thing` is an object for the purposes of RSJF. In this case, `thing` is an object if it has
 * the type `object` but is NOT null, an array or a File.
 *
 * @param thing - The thing to check to see whether it is an object
 * @returns - True if it is a non-null, non-array, non-File object
 */
function isObject(thing) {
  if (typeof File !== "undefined" && thing instanceof File) {
    return false;
  }
  if (typeof Date !== "undefined" && thing instanceof Date) {
    return false;
  }
  return typeof thing === "object" && thing !== null && !Array.isArray(thing);
}

/** Checks the schema to see if it is allowing additional items, by verifying that `schema.additionalItems` is an
 * object. The user is warned in the console if `schema.additionalItems` has the value `true`.
 *
 * @param schema - The schema object to check
 * @returns - True if additional items is allowed, otherwise false
 */
function allowAdditionalItems(schema) {
  if (schema.additionalItems === true) {
    console.warn("additionalItems=true is currently not supported");
  }
  return isObject(schema.additionalItems);
}

/** Attempts to convert the string into a number. If an empty string is provided, then `undefined` is returned. If a
 * `null` is provided, it is returned. If the string ends in a `.` then the string is returned because the user may be
 * in the middle of typing a float number. If a number ends in a pattern like `.0`, `.20`, `.030`, string is returned
 * because the user may be typing number that will end in a non-zero digit. Otherwise, the string is wrapped by
 * `Number()` and if that result is not `NaN`, that number will be returned, otherwise the string `value` will be.
 *
 * @param value - The string or null value to convert to a number
 * @returns - The `value` converted to a number when appropriate, otherwise the `value`
 */
function asNumber(value) {
  if (value === "") {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  if (/\.$/.test(value)) {
    // '3.' can't really be considered a number even if it parses in js. The
    // user is most likely entering a float.
    return value;
  }
  if (/\.0$/.test(value)) {
    // we need to return this as a string here, to allow for input like 3.07
    return value;
  }
  if (/\.\d*0$/.test(value)) {
    // It's a number, that's cool - but we need it as a string so it doesn't screw
    // with the user when entering dollar amounts or other values (such as those with
    // specific precision or number of significant digits)
    return value;
  }
  var n = Number(value);
  var valid = typeof n === "number" && !Number.isNaN(n);
  return valid ? n : value;
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
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
function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure " + obj);
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
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/** Below are the list of all the keys into various elements of a RJSFSchema or UiSchema that are used by the various
 * utility functions. In addition to those keys, there are the special `ADDITIONAL_PROPERTY_FLAG` and
 * `RJSF_ADDITONAL_PROPERTIES_FLAG` flags that is added to a schema under certain conditions by the `retrieveSchema()`
 * utility.
 */
var ADDITIONAL_PROPERTY_FLAG = "__additional_property";
var ADDITIONAL_PROPERTIES_KEY = "additionalProperties";
var ALL_OF_KEY = "allOf";
var ANY_OF_KEY = "anyOf";
var CONST_KEY = "const";
var DEFAULT_KEY = "default";
var DEFINITIONS_KEY = "definitions";
var DEPENDENCIES_KEY = "dependencies";
var ENUM_KEY = "enum";
var ERRORS_KEY = "__errors";
var ID_KEY = "$id";
var ITEMS_KEY = "items";
var NAME_KEY = "$name";
var ONE_OF_KEY = "oneOf";
var PROPERTIES_KEY = "properties";
var REQUIRED_KEY = "required";
var SUBMIT_BTN_OPTIONS_KEY = "submitButtonOptions";
var REF_KEY = "$ref";
var RJSF_ADDITONAL_PROPERTIES_FLAG = "__rjsf_additionalProperties";
var UI_FIELD_KEY = "ui:field";
var UI_WIDGET_KEY = "ui:widget";
var UI_OPTIONS_KEY = "ui:options";

/** Get all passed options from ui:options, and ui:<optionName>, returning them in an object with the `ui:`
 * stripped off.
 *
 * @param [uiSchema={}] - The UI Schema from which to get any `ui:xxx` options
 * @returns - An object containing all the `ui:xxx` options with the stripped off
 */
function getUiOptions(uiSchema) {
  if (uiSchema === void 0) {
    uiSchema = {};
  }
  return Object.keys(uiSchema).filter(function (key) {
    return key.indexOf("ui:") === 0;
  }).reduce(function (options, key) {
    var _extends2;
    var value = uiSchema[key];
    if (key === UI_WIDGET_KEY && isObject(value)) {
      console.error("Setting options via ui:widget object is no longer supported, use ui:options instead");
      return options;
    }
    if (key === UI_OPTIONS_KEY && isObject(value)) {
      return _extends({}, options, value);
    }
    return _extends({}, options, (_extends2 = {}, _extends2[key.substring(3)] = value, _extends2));
  }, {});
}

/** Checks whether the field described by `schema`, having the `uiSchema` and `formData` supports expanding. The UI for
 * the field can expand if it has additional properties, is not forced as non-expandable by the `uiSchema` and the
 * `formData` object doesn't already have `schema.maxProperties` elements.
 *
 * @param schema - The schema for the field that is being checked
 * @param [uiSchema={}] - The uiSchema for the field
 * @param [formData] - The formData for the field
 * @returns - True if the schema element has additionalProperties, is expandable, and not at the maxProperties limit
 */
function canExpand(schema, uiSchema, formData) {
  if (uiSchema === void 0) {
    uiSchema = {};
  }
  if (!schema.additionalProperties) {
    return false;
  }
  var _getUiOptions = getUiOptions(uiSchema),
    _getUiOptions$expanda = _getUiOptions.expandable,
    expandable = _getUiOptions$expanda === void 0 ? true : _getUiOptions$expanda;
  if (expandable === false) {
    return expandable;
  }
  // if ui:options.expandable was not explicitly set to false, we can add
  // another property if we have not exceeded maxProperties yet
  if (schema.maxProperties !== undefined && formData) {
    return Object.keys(formData).length < schema.maxProperties;
  }
  return true;
}

/** Implements a deep equals using the `lodash.isEqualWith` function, that provides a customized comparator that
 * assumes all functions are equivalent.
 *
 * @param a - The first element to compare
 * @param b - The second element to compare
 * @returns - True if the `a` and `b` are deeply equal, false otherwise
 */
function deepEquals(a, b) {
  return isEqualWith(a, b, function (obj, other) {
    if (typeof obj === "function" && typeof other === "function") {
      // Assume all functions are equivalent
      // see https://github.com/rjsf-team/react-jsonschema-form/issues/255
      return true;
    }
    return undefined; // fallback to default isEquals behavior
  });
}

/** Splits out the value at the `key` in `object` from the `object`, returning an array that contains in the first
 * location, the `object` minus the `key: value` and in the second location the `value`.
 *
 * @param key - The key from the object to extract
 * @param object - The object from which to extract the element
 * @returns - An array with the first value being the object minus the `key` element and the second element being the
 *      value from `object[key]`
 */
function splitKeyElementFromObject(key, object) {
  var value = object[key];
  var remaining = omit(object, [key]);
  return [remaining, value];
}
/** Given the name of a `$ref` from within a schema, using the `rootSchema`, look up and return the sub-schema using the
 * path provided by that reference. If `#` is not the first character of the reference, or the path does not exist in
 * the schema, then throw an Error. Otherwise return the sub-schema. Also deals with nested `$ref`s in the sub-schema.
 *
 * @param $ref - The ref string for which the schema definition is desired
 * @param [rootSchema={}] - The root schema in which to search for the definition
 * @returns - The sub-schema within the `rootSchema` which matches the `$ref` if it exists
 * @throws - Error indicating that no schema for that reference exists
 */
function findSchemaDefinition($ref, rootSchema) {
  if (rootSchema === void 0) {
    rootSchema = {};
  }
  var ref = $ref || "";
  if (ref.startsWith("#")) {
    // Decode URI fragment representation.
    ref = decodeURIComponent(ref.substring(1));
  } else {
    throw new Error("Could not find a definition for " + $ref + ".");
  }
  var current = jsonpointer.get(rootSchema, ref);
  if (current === undefined) {
    throw new Error("Could not find a definition for " + $ref + ".");
  }
  if (current[REF_KEY]) {
    var _splitKeyElementFromO = splitKeyElementFromObject(REF_KEY, current),
      remaining = _splitKeyElementFromO[0],
      theRef = _splitKeyElementFromO[1];
    var subSchema = findSchemaDefinition(theRef, rootSchema);
    if (Object.keys(remaining).length > 0) {
      return _extends({}, remaining, subSchema);
    }
    return subSchema;
  }
  return current;
}

/** Given the `formData` and list of `options`, attempts to find the index of the option that best matches the data.
 * Deprecated, use `getFirstMatchingOption()` instead.
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param formData - The current formData, if any, used to figure out a match
 * @param options - The list of options to find a matching options from
 * @param rootSchema - The root schema, used to primarily to look up `$ref`s
 * @returns - The index of the matched option or 0 if none is available
 * @deprecated
 */
function getMatchingOption(validator, formData, options, rootSchema) {
  // For performance, skip validating subschemas if formData is undefined. We just
  // want to get the first option in that case.
  if (formData === undefined) {
    return 0;
  }
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    // If the schema describes an object then we need to add slightly more
    // strict matching to the schema, because unless the schema uses the
    // "requires" keyword, an object will match the schema as long as it
    // doesn't have matching keys with a conflicting type. To do this we use an
    // "anyOf" with an array of requires. This augmentation expresses that the
    // schema should match if any of the keys in the schema are present on the
    // object and pass validation.
    if (option.properties) {
      // Create an "anyOf" schema that requires at least one of the keys in the
      // "properties" object
      var requiresAnyOf = {
        anyOf: Object.keys(option.properties).map(function (key) {
          return {
            required: [key]
          };
        })
      };
      var augmentedSchema = void 0;
      // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"
      if (option.anyOf) {
        // Create a shallow clone of the option
        var shallowClone = _extends({}, (_objectDestructuringEmpty(option), option));
        if (!shallowClone.allOf) {
          shallowClone.allOf = [];
        } else {
          // If "allOf" already exists, shallow clone the array
          shallowClone.allOf = shallowClone.allOf.slice();
        }
        shallowClone.allOf.push(requiresAnyOf);
        augmentedSchema = shallowClone;
      } else {
        augmentedSchema = Object.assign({}, option, requiresAnyOf);
      }
      // Remove the "required" field as it's likely that not all fields have
      // been filled in yet, which will mean that the schema is not valid
      delete augmentedSchema.required;
      if (validator.isValid(augmentedSchema, formData, rootSchema)) {
        return i;
      }
    } else if (validator.isValid(option, formData, rootSchema)) {
      return i;
    }
  }
  return 0;
}

/** Given the `formData` and list of `options`, attempts to find the index of the first option that matches the data.
 * Always returns the first option if there is nothing that matches.
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param formData - The current formData, if any, used to figure out a match
 * @param options - The list of options to find a matching options from
 * @param rootSchema - The root schema, used to primarily to look up `$ref`s
 * @returns - The index of the first matched option or 0 if none is available
 */
function getFirstMatchingOption(validator, formData, options, rootSchema) {
  return getMatchingOption(validator, formData, options, rootSchema);
}

/** Given a specific `value` attempts to guess the type of a schema element. In the case where we have to implicitly
 *  create a schema, it is useful to know what type to use based on the data we are defining.
 *
 * @param value - The value from which to guess the type
 * @returns - The best guess for the object type
 */
function guessType(value) {
  if (Array.isArray(value)) {
    return "array";
  }
  if (typeof value === "string") {
    return "string";
  }
  if (value == null) {
    return "null";
  }
  if (typeof value === "boolean") {
    return "boolean";
  }
  if (!isNaN(value)) {
    return "number";
  }
  if (typeof value === "object") {
    return "object";
  }
  // Default to string if we can't figure it out
  return "string";
}

/** Gets the type of a given `schema`. If the type is not explicitly defined, then an attempt is made to infer it from
 * other elements of the schema as follows:
 * - schema.const: Returns the `guessType()` of that value
 * - schema.enum: Returns `string`
 * - schema.properties: Returns `object`
 * - schema.additionalProperties: Returns `object`
 * - type is an array with a length of 2 and one type is 'null': Returns the other type
 *
 * @param schema - The schema for which to get the type
 * @returns - The type of the schema
 */
function getSchemaType(schema) {
  var type = schema.type;
  if (!type && schema["const"]) {
    return guessType(schema["const"]);
  }
  if (!type && schema["enum"]) {
    return "string";
  }
  if (!type && (schema.properties || schema.additionalProperties)) {
    return "object";
  }
  if (Array.isArray(type) && type.length === 2 && type.includes("null")) {
    type = type.find(function (type) {
      return type !== "null";
    });
  }
  return type;
}

/** Recursively merge deeply nested schemas. The difference between `mergeSchemas` and `mergeObjects` is that
 * `mergeSchemas` only concats arrays for values under the 'required' keyword, and when it does, it doesn't include
 * duplicate values.
 *
 * @param obj1 - The first schema object to merge
 * @param obj2 - The second schema object to merge
 * @returns - The merged schema object
 */
function mergeSchemas(obj1, obj2) {
  var acc = Object.assign({}, obj1); // Prevent mutation of source object.
  return Object.keys(obj2).reduce(function (acc, key) {
    var left = obj1 ? obj1[key] : {},
      right = obj2[key];
    if (obj1 && key in obj1 && isObject(right)) {
      acc[key] = mergeSchemas(left, right);
    } else if (obj1 && obj2 && (getSchemaType(obj1) === "object" || getSchemaType(obj2) === "object") && key === REQUIRED_KEY && Array.isArray(left) && Array.isArray(right)) {
      // Don't include duplicate values when merging 'required' fields.
      acc[key] = union(left, right);
    } else {
      acc[key] = right;
    }
    return acc;
  }, acc);
}

var _excluded$1 = ["if", "then", "else"],
  _excluded2 = ["$ref"],
  _excluded3 = ["allOf"],
  _excluded4 = ["dependencies"],
  _excluded5 = ["oneOf"];
/** Resolves a conditional block (if/else/then) by removing the condition and merging the appropriate conditional branch
 * with the rest of the schema
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that is used to detect valid schema conditions
 * @param schema - The schema for which resolving a condition is desired
 * @param rootSchema - The root schema that will be forwarded to all the APIs
 * @param [formData] - The current formData to assist retrieving a schema
 * @returns - A schema with the appropriate condition resolved
 */
function resolveCondition(validator, schema, rootSchema, formData) {
  var expression = schema["if"],
    then = schema.then,
    otherwise = schema["else"],
    resolvedSchemaLessConditional = _objectWithoutPropertiesLoose(schema, _excluded$1);
  var conditionalSchema = validator.isValid(expression, formData, rootSchema) ? then : otherwise;
  if (conditionalSchema && typeof conditionalSchema !== "boolean") {
    return retrieveSchema(validator, mergeSchemas(resolvedSchemaLessConditional, retrieveSchema(validator, conditionalSchema, rootSchema, formData)), rootSchema, formData);
  }
  return retrieveSchema(validator, resolvedSchemaLessConditional, rootSchema, formData);
}
/** Resolves references and dependencies within a schema and its 'allOf' children.
 * Called internally by retrieveSchema.
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that will be forwarded to all the APIs
 * @param schema - The schema for which resolving a schema is desired
 * @param [rootSchema={}] - The root schema that will be forwarded to all the APIs
 * @param [formData] - The current formData, if any, to assist retrieving a schema
 * @returns - The schema having its references and dependencies resolved
 */
function resolveSchema(validator, schema, rootSchema, formData) {
  if (rootSchema === void 0) {
    rootSchema = {};
  }
  if (REF_KEY in schema) {
    return resolveReference(validator, schema, rootSchema, formData);
  }
  if (DEPENDENCIES_KEY in schema) {
    var resolvedSchema = resolveDependencies(validator, schema, rootSchema, formData);
    return retrieveSchema(validator, resolvedSchema, rootSchema, formData);
  }
  if (ALL_OF_KEY in schema) {
    return _extends({}, schema, {
      allOf: schema.allOf.map(function (allOfSubschema) {
        return retrieveSchema(validator, allOfSubschema, rootSchema, formData);
      })
    });
  }
  // No $ref or dependencies attribute found, returning the original schema.
  return schema;
}
/** Resolves references within a schema and its 'allOf' children.
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that will be forwarded to all the APIs
 * @param schema - The schema for which resolving a reference is desired
 * @param rootSchema - The root schema that will be forwarded to all the APIs
 * @param [formData] - The current formData, if any, to assist retrieving a schema
 * @returns - The schema having its references resolved
 */
function resolveReference(validator, schema, rootSchema, formData) {
  // Retrieve the referenced schema definition.
  var $refSchema = findSchemaDefinition(schema.$ref, rootSchema);
  // Drop the $ref property of the source schema.
  var localSchema = _objectWithoutPropertiesLoose(schema, _excluded2);
  // Update referenced schema definition with local schema properties.
  return retrieveSchema(validator, _extends({}, $refSchema, localSchema), rootSchema, formData);
}
/** Creates new 'properties' items for each key in the `formData`
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that will be used when necessary
 * @param theSchema - The schema for which the existing additional properties is desired
 * @param [rootSchema] - The root schema, used to primarily to look up `$ref`s * @param validator
 * @param [aFormData] - The current formData, if any, to assist retrieving a schema
 * @returns - The updated schema with additional properties stubbed
 */
function stubExistingAdditionalProperties(validator, theSchema, rootSchema, aFormData) {
  // Clone the schema so we don't ruin the consumer's original
  var schema = _extends({}, theSchema, {
    properties: _extends({}, theSchema.properties)
  });
  // make sure formData is an object
  var formData = aFormData && isObject(aFormData) ? aFormData : {};
  Object.keys(formData).forEach(function (key) {
    if (key in schema.properties) {
      // No need to stub, our schema already has the property
      return;
    }
    var additionalProperties = {};
    if (typeof schema.additionalProperties !== "boolean") {
      if (REF_KEY in schema.additionalProperties) {
        additionalProperties = retrieveSchema(validator, {
          $ref: get(schema.additionalProperties, [REF_KEY])
        }, rootSchema, formData);
      } else if ("type" in schema.additionalProperties) {
        additionalProperties = _extends({}, schema.additionalProperties);
      } else if (ANY_OF_KEY in schema.additionalProperties || ONE_OF_KEY in schema.additionalProperties) {
        additionalProperties = _extends({
          type: "object"
        }, schema.additionalProperties);
      } else {
        additionalProperties = {
          type: guessType(get(formData, [key]))
        };
      }
    } else {
      additionalProperties = {
        type: guessType(get(formData, [key]))
      };
    }
    // The type of our new key should match the additionalProperties value;
    schema.properties[key] = additionalProperties;
    // Set our additional property flag so we know it was dynamically added
    set(schema.properties, [key, ADDITIONAL_PROPERTY_FLAG], true);
  });
  return schema;
}
/** Retrieves an expanded schema that has had all of its conditions, additional properties, references and dependencies
 * resolved and merged into the `schema` given a `validator`, `rootSchema` and `rawFormData` that is used to do the
 * potentially recursive resolution.
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that will be forwarded to all the APIs
 * @param schema - The schema for which retrieving a schema is desired
 * @param [rootSchema={}] - The root schema that will be forwarded to all the APIs
 * @param [rawFormData] - The current formData, if any, to assist retrieving a schema
 * @returns - The schema having its conditions, additional properties, references and dependencies resolved
 */
function retrieveSchema(validator, schema, rootSchema, rawFormData) {
  if (rootSchema === void 0) {
    rootSchema = {};
  }
  if (!isObject(schema)) {
    return {};
  }
  var resolvedSchema = resolveSchema(validator, schema, rootSchema, rawFormData);
  if ("if" in schema) {
    return resolveCondition(validator, schema, rootSchema, rawFormData);
  }
  var formData = rawFormData || {};
  if (ALL_OF_KEY in schema) {
    try {
      resolvedSchema = mergeAllOf(resolvedSchema, {
        deep: false
      });
    } catch (e) {
      console.warn("could not merge subschemas in allOf:\n" + e);
      var _resolvedSchema = resolvedSchema,
        resolvedSchemaWithoutAllOf = _objectWithoutPropertiesLoose(_resolvedSchema, _excluded3);
      return resolvedSchemaWithoutAllOf;
    }
  }
  var hasAdditionalProperties = ADDITIONAL_PROPERTIES_KEY in resolvedSchema && resolvedSchema.additionalProperties !== false;
  if (hasAdditionalProperties) {
    return stubExistingAdditionalProperties(validator, resolvedSchema, rootSchema, formData);
  }
  return resolvedSchema;
}
/** Resolves dependencies within a schema and its 'allOf' children.
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that will be forwarded to all the APIs
 * @param schema - The schema for which resolving a dependency is desired
 * @param rootSchema - The root schema that will be forwarded to all the APIs
 * @param [formData] - The current formData, if any, to assist retrieving a schema
 * @returns - The schema with its dependencies resolved
 */
function resolveDependencies(validator, schema, rootSchema, formData) {
  // Drop the dependencies from the source schema.
  var dependencies = schema.dependencies,
    remainingSchema = _objectWithoutPropertiesLoose(schema, _excluded4);
  var resolvedSchema = remainingSchema;
  if (Array.isArray(resolvedSchema.oneOf)) {
    resolvedSchema = resolvedSchema.oneOf[getFirstMatchingOption(validator, formData, resolvedSchema.oneOf, rootSchema)];
  } else if (Array.isArray(resolvedSchema.anyOf)) {
    resolvedSchema = resolvedSchema.anyOf[getFirstMatchingOption(validator, formData, resolvedSchema.anyOf, rootSchema)];
  }
  return processDependencies(validator, dependencies, resolvedSchema, rootSchema, formData);
}
/** Processes all the `dependencies` recursively into the `resolvedSchema` as needed
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that will be forwarded to all the APIs
 * @param dependencies - The set of dependencies that needs to be processed
 * @param resolvedSchema - The schema for which processing dependencies is desired
 * @param rootSchema - The root schema that will be forwarded to all the APIs
 * @param [formData] - The current formData, if any, to assist retrieving a schema
 * @returns - The schema with the `dependencies` resolved into it
 */
function processDependencies(validator, dependencies, resolvedSchema, rootSchema, formData) {
  var schema = resolvedSchema;
  // Process dependencies updating the local schema properties as appropriate.
  for (var dependencyKey in dependencies) {
    // Skip this dependency if its trigger property is not present.
    if (get(formData, [dependencyKey]) === undefined) {
      continue;
    }
    // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)
    if (schema.properties && !(dependencyKey in schema.properties)) {
      continue;
    }
    var _splitKeyElementFromO = splitKeyElementFromObject(dependencyKey, dependencies),
      remainingDependencies = _splitKeyElementFromO[0],
      dependencyValue = _splitKeyElementFromO[1];
    if (Array.isArray(dependencyValue)) {
      schema = withDependentProperties(schema, dependencyValue);
    } else if (isObject(dependencyValue)) {
      schema = withDependentSchema(validator, schema, rootSchema, dependencyKey, dependencyValue, formData);
    }
    return processDependencies(validator, remainingDependencies, schema, rootSchema, formData);
  }
  return schema;
}
/** Updates a schema with additionally required properties added
 *
 * @param schema - The schema for which resolving a dependent properties is desired
 * @param [additionallyRequired] - An optional array of additionally required names
 * @returns - The schema with the additional required values merged in
 */
function withDependentProperties(schema, additionallyRequired) {
  if (!additionallyRequired) {
    return schema;
  }
  var required = Array.isArray(schema.required) ? Array.from(new Set([].concat(schema.required, additionallyRequired))) : additionallyRequired;
  return _extends({}, schema, {
    required: required
  });
}
/** Merges a dependent schema into the `schema` dealing with oneOfs and references
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that will be forwarded to all the APIs
 * @param schema - The schema for which resolving a dependent schema is desired
 * @param rootSchema - The root schema that will be forwarded to all the APIs
 * @param dependencyKey - The key name of the dependency
 * @param dependencyValue - The potentially dependent schema
 * @param formData- The current formData to assist retrieving a schema
 * @returns - The schema with the dependent schema resolved into it
 */
function withDependentSchema(validator, schema, rootSchema, dependencyKey, dependencyValue, formData) {
  var _retrieveSchema = retrieveSchema(validator, dependencyValue, rootSchema, formData),
    oneOf = _retrieveSchema.oneOf,
    dependentSchema = _objectWithoutPropertiesLoose(_retrieveSchema, _excluded5);
  schema = mergeSchemas(schema, dependentSchema);
  // Since it does not contain oneOf, we return the original schema.
  if (oneOf === undefined) {
    return schema;
  }
  // Resolve $refs inside oneOf.
  var resolvedOneOf = oneOf.map(function (subschema) {
    if (typeof subschema === "boolean" || !(REF_KEY in subschema)) {
      return subschema;
    }
    return resolveReference(validator, subschema, rootSchema, formData);
  });
  return withExactlyOneSubschema(validator, schema, rootSchema, dependencyKey, resolvedOneOf, formData);
}
/** Returns a `schema` with the best choice from the `oneOf` options merged into it
 *
 * @param validator - An implementation of the `ValidatorType<T, S>` interface that will be used to validate oneOf options
 * @param schema - The schema for which resolving a oneOf subschema is desired
 * @param rootSchema - The root schema that will be forwarded to all the APIs
 * @param dependencyKey - The key name of the oneOf dependency
 * @param oneOf - The list of schemas representing the oneOf options
 * @param [formData] - The current formData to assist retrieving a schema
 * @returns  The schema with the best choice of oneOf schemas merged into
 */
function withExactlyOneSubschema(validator, schema, rootSchema, dependencyKey, oneOf, formData) {
  var validSubschemas = oneOf.filter(function (subschema) {
    if (typeof subschema === "boolean" || !subschema || !subschema.properties) {
      return false;
    }
    var conditionPropertySchema = subschema.properties[dependencyKey];
    if (conditionPropertySchema) {
      var _properties;
      var conditionSchema = {
        type: "object",
        properties: (_properties = {}, _properties[dependencyKey] = conditionPropertySchema, _properties)
      };
      var _validator$validateFo = validator.validateFormData(formData, conditionSchema),
        errors = _validator$validateFo.errors;
      return errors.length === 0;
    }
    return false;
  });
  if (validSubschemas.length !== 1) {
    console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid");
    return schema;
  }
  var subschema = validSubschemas[0];
  var _splitKeyElementFromO2 = splitKeyElementFromObject(dependencyKey, subschema.properties),
    dependentSubschema = _splitKeyElementFromO2[0];
  var dependentSchema = _extends({}, subschema, {
    properties: dependentSubschema
  });
  return mergeSchemas(schema, retrieveSchema(validator, dependentSchema, rootSchema, formData));
}

/** A junk option used to determine when the getFirstMatchingOption call really matches an option rather than returning
 * the first item
 */
var JUNK_OPTION = {
  type: "object",
  properties: {
    __not_really_there__: {
      type: "number"
    }
  }
};
/** Recursive function that calculates the score of a `formData` against the given `schema`. The computation is fairly
 * simple. Initially the total score is 0. When `schema.properties` object exists, then all the `key/value` pairs within
 * the object are processed as follows after obtaining the formValue from `formData` using the `key`:
 * - If the `value` contains a `$ref`, `calculateIndexScore()` is called recursively with the formValue and the new
 *   schema that is the result of the ref in the schema being resolved and that sub-schema's resulting score is added to
 *   the total.
 * - If the `value` contains a `oneOf` and there is a formValue, then score based on the index returned from calling
 *   `getClosestMatchingOption()` of that oneOf.
 * - If the type of the `value` is 'object', `calculateIndexScore()` is called recursively with the formValue and the
 *   `value` itself as the sub-schema, and the score is added to the total.
 * - If the type of the `value` matches the guessed-type of the `formValue`, the score is incremented by 1, UNLESS the
 *   value has a `default` or `const`. In those case, if the `default` or `const` and the `formValue` match, the score
 *   is incremented by another 1 otherwise it is decremented by 1.
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param rootSchema - The root JSON schema of the entire form
 * @param schema - The schema for which the score is being calculated
 * @param formData - The form data associated with the schema, used to calculate the score
 * @returns - The score a schema against the formData
 */
function calculateIndexScore(validator, rootSchema, schema, formData) {
  if (formData === void 0) {
    formData = {};
  }
  var totalScore = 0;
  if (schema) {
    if (isObject$1(schema.properties)) {
      totalScore += reduce(schema.properties, function (score, value, key) {
        var formValue = get(formData, key);
        if (typeof value === "boolean") {
          return score;
        }
        if (has(value, REF_KEY)) {
          var newSchema = retrieveSchema(validator, value, rootSchema, formValue);
          return score + calculateIndexScore(validator, rootSchema, newSchema, formValue || {});
        }
        if (has(value, ONE_OF_KEY) && formValue) {
          return score + getClosestMatchingOption(validator, rootSchema, formValue, get(value, ONE_OF_KEY));
        }
        if (value.type === "object") {
          return score + calculateIndexScore(validator, rootSchema, value, formValue || {});
        }
        if (value.type === guessType(formValue)) {
          // If the types match, then we bump the score by one
          var newScore = score + 1;
          if (value["default"]) {
            // If the schema contains a readonly default value score the value that matches the default higher and
            // any non-matching value lower
            newScore += formValue === value["default"] ? 1 : -1;
          } else if (value["const"]) {
            // If the schema contains a const value score the value that matches the default higher and
            // any non-matching value lower
            newScore += formValue === value["const"] ? 1 : -1;
          }
          // TODO eventually, deal with enums/arrays
          return newScore;
        }
        return score;
      }, 0);
    } else if (isString(schema.type) && schema.type === guessType(formData)) {
      totalScore += 1;
    }
  }
  return totalScore;
}
/** Determines which of the given `options` provided most closely matches the `formData`. Using
 * `getFirstMatchingOption()` to match two schemas that differ only by the readOnly, default or const value of a field
 * based on the `formData` and returns 0 when there is no match. Rather than passing in all the `options` at once to
 * this utility, instead an array of valid option indexes is created by iterating over the list of options, call
 * `getFirstMatchingOptions` with a list of one junk option and one good option, seeing if the good option is considered
 * matched.
 *
 * Once the list of valid indexes is created, if there is only one valid index, just return it. Otherwise, if there are
 * no valid indexes, then fill the valid indexes array with the indexes of all the options. Next, the index of the
 * option with the highest score is determined by iterating over the list of valid options, calling
 * `calculateIndexScore()` on each, comparing it against the current best score, and returning the index of the one that
 * eventually has the best score.
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param rootSchema - The root JSON schema of the entire form
 * @param formData - The form data associated with the schema
 * @param options - The list of options that can be selected from
 * @param [selectedOption=-1] - The index of the currently selected option, defaulted to -1 if not specified
 * @returns - The index of the option that is the closest match to the `formData` or the `selectedOption` if no match
 */
function getClosestMatchingOption(validator, rootSchema, formData, options, selectedOption) {
  if (selectedOption === void 0) {
    selectedOption = -1;
  }
  // Reduce the array of options down to a list of the indexes that are considered matching options
  var allValidIndexes = options.reduce(function (validList, option, index) {
    var testOptions = [JUNK_OPTION, option];
    var match = getFirstMatchingOption(validator, formData, testOptions, rootSchema);
    // The match is the real option, so add its index to list of valid indexes
    if (match === 1) {
      validList.push(index);
    }
    return validList;
  }, []);
  // There is only one valid index, so return it!
  if (allValidIndexes.length === 1) {
    return allValidIndexes[0];
  }
  if (!allValidIndexes.length) {
    // No indexes were valid, so we'll score all the options, add all the indexes
    times(options.length, function (i) {
      return allValidIndexes.push(i);
    });
  }
  // Score all the options in the list of valid indexes and return the index with the best score
  var _allValidIndexes$redu = allValidIndexes.reduce(function (scoreData, index) {
      var bestScore = scoreData.bestScore;
      var option = options[index];
      if (has(option, REF_KEY)) {
        option = retrieveSchema(validator, option, rootSchema, formData);
      }
      var score = calculateIndexScore(validator, rootSchema, option, formData);
      if (score > bestScore) {
        return {
          bestIndex: index,
          bestScore: score
        };
      }
      return scoreData;
    }, {
      bestIndex: selectedOption,
      bestScore: 0
    }),
    bestIndex = _allValidIndexes$redu.bestIndex;
  return bestIndex;
}

/** Detects whether the given `schema` contains fixed items. This is the case when `schema.items` is a non-empty array
 * that only contains objects.
 *
 * @param schema - The schema in which to check for fixed items
 * @returns - True if there are fixed items in the schema, false otherwise
 */
function isFixedItems(schema) {
  return Array.isArray(schema.items) && schema.items.length > 0 && schema.items.every(function (item) {
    return isObject(item);
  });
}

/** Merges the `defaults` object of type `T` into the `formData` of type `T`
 *
 * When merging defaults and form data, we want to merge in this specific way:
 * - objects are deeply merged
 * - arrays are merged in such a way that:
 *   - when the array is set in form data, only array entries set in form data
 *     are deeply merged; additional entries from the defaults are ignored
 *   - when the array is not set in form data, the default is copied over
 * - scalars are overwritten/set by form data
 *
 * @param [defaults] - The defaults to merge
 * @param [formData] - The form data into which the defaults will be merged
 * @returns - The resulting merged form data with defaults
 */
function mergeDefaultsWithFormData(defaults, formData) {
  if (Array.isArray(formData)) {
    var defaultsArray = Array.isArray(defaults) ? defaults : [];
    var mapped = formData.map(function (value, idx) {
      if (defaultsArray[idx]) {
        return mergeDefaultsWithFormData(defaultsArray[idx], value);
      }
      return value;
    });
    return mapped;
  }
  if (isObject(formData)) {
    var acc = Object.assign({}, defaults); // Prevent mutation of source object.
    return Object.keys(formData).reduce(function (acc, key) {
      acc[key] = mergeDefaultsWithFormData(defaults ? get(defaults, key) : {}, get(formData, key));
      return acc;
    }, acc);
  }
  return formData;
}

/** Recursively merge deeply nested objects.
 *
 * @param obj1 - The first object to merge
 * @param obj2 - The second object to merge
 * @param [concatArrays=false] - Optional flag that, when true, will cause arrays to be concatenated. Use
 *          "preventDuplicates" to merge arrays in a manner that prevents any duplicate entries from being merged.
 *          NOTE: Uses shallow comparison for the duplicate checking.
 * @returns - A new object that is the merge of the two given objects
 */
function mergeObjects(obj1, obj2, concatArrays) {
  if (concatArrays === void 0) {
    concatArrays = false;
  }
  return Object.keys(obj2).reduce(function (acc, key) {
    var left = obj1 ? obj1[key] : {},
      right = obj2[key];
    if (obj1 && key in obj1 && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays);
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      var toMerge = right;
      if (concatArrays === "preventDuplicates") {
        toMerge = right.reduce(function (result, value) {
          if (!left.includes(value)) {
            result.push(value);
          }
          return result;
        }, []);
      }
      acc[key] = left.concat(toMerge);
    } else {
      acc[key] = right;
    }
    return acc;
  }, Object.assign({}, obj1)); // Prevent mutation of source object.
}

/** This function checks if the given `schema` matches a single constant value. This happens when either the schema has
 * an `enum` array with a single value or there is a `const` defined.
 *
 * @param schema - The schema for a field
 * @returns - True if the `schema` has a single constant value, false otherwise
 */
function isConstant(schema) {
  return Array.isArray(schema["enum"]) && schema["enum"].length === 1 || CONST_KEY in schema;
}

/** Checks to see if the `schema` combination represents a select
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param theSchema - The schema for which check for a select flag is desired
 * @param [rootSchema] - The root schema, used to primarily to look up `$ref`s
 * @returns - True if schema contains a select, otherwise false
 */
function isSelect(validator, theSchema, rootSchema) {
  if (rootSchema === void 0) {
    rootSchema = {};
  }
  var schema = retrieveSchema(validator, theSchema, rootSchema, undefined);
  var altSchemas = schema.oneOf || schema.anyOf;
  if (Array.isArray(schema["enum"])) {
    return true;
  }
  if (Array.isArray(altSchemas)) {
    return altSchemas.every(function (altSchemas) {
      return typeof altSchemas !== "boolean" && isConstant(altSchemas);
    });
  }
  return false;
}

/** Checks to see if the `schema` combination represents a multi-select
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param schema - The schema for which check for a multi-select flag is desired
 * @param [rootSchema] - The root schema, used to primarily to look up `$ref`s
 * @returns - True if schema contains a multi-select, otherwise false
 */
function isMultiSelect(validator, schema, rootSchema) {
  if (!schema.uniqueItems || !schema.items || typeof schema.items === "boolean") {
    return false;
  }
  return isSelect(validator, schema.items, rootSchema);
}

/** Enum that indicates how `schema.additionalItems` should be handled by the `getInnerSchemaForArrayItem()` function.
 */
var AdditionalItemsHandling;
(function (AdditionalItemsHandling) {
  AdditionalItemsHandling[AdditionalItemsHandling["Ignore"] = 0] = "Ignore";
  AdditionalItemsHandling[AdditionalItemsHandling["Invert"] = 1] = "Invert";
  AdditionalItemsHandling[AdditionalItemsHandling["Fallback"] = 2] = "Fallback";
})(AdditionalItemsHandling || (AdditionalItemsHandling = {}));
/** Given a `schema` will return an inner schema that for an array item. This is computed differently based on the
 * `additionalItems` enum and the value of `idx`. There are four possible returns:
 * 1. If `idx` is >= 0, then if `schema.items` is an array the `idx`th element of the array is returned if it is a valid
 *    index and not a boolean, otherwise it falls through to 3.
 * 2. If `schema.items` is not an array AND truthy and not a boolean, then `schema.items` is returned since it actually
 *    is a schema, otherwise it falls through to 3.
 * 3. If `additionalItems` is not `AdditionalItemsHandling.Ignore` and `schema.additionalItems` is an object, then
 *    `schema.additionalItems` is returned since it actually is a schema, otherwise it falls through to 4.
 * 4. {} is returned representing an empty schema
 *
 * @param schema - The schema from which to get the particular item
 * @param [additionalItems=AdditionalItemsHandling.Ignore] - How do we want to handle additional items?
 * @param [idx=-1] - Index, if non-negative, will be used to return the idx-th element in a `schema.items` array
 * @returns - The best fit schema object from the `schema` given the `additionalItems` and `idx` modifiers
 */
function getInnerSchemaForArrayItem(schema, additionalItems, idx) {
  if (additionalItems === void 0) {
    additionalItems = AdditionalItemsHandling.Ignore;
  }
  if (idx === void 0) {
    idx = -1;
  }
  if (idx >= 0) {
    if (Array.isArray(schema.items) && idx < schema.items.length) {
      var item = schema.items[idx];
      if (typeof item !== "boolean") {
        return item;
      }
    }
  } else if (schema.items && !Array.isArray(schema.items) && typeof schema.items !== "boolean") {
    return schema.items;
  }
  if (additionalItems !== AdditionalItemsHandling.Ignore && isObject(schema.additionalItems)) {
    return schema.additionalItems;
  }
  return {};
}
/** Either add `computedDefault` at `key` into `obj` or not add it based on its value and the value of
 * `includeUndefinedValues`. Generally undefined `computedDefault` values are added only when `includeUndefinedValues`
 * is either true or "excludeObjectChildren". If `includeUndefinedValues` is false, then non-undefined and
 * non-empty-object values will be added.
 *
 * @param obj - The object into which the computed default may be added
 * @param key - The key into the object at which the computed default may be added
 * @param computedDefault - The computed default value that maybe should be added to the obj
 * @param includeUndefinedValues - Optional flag, if true, cause undefined values to be added as defaults.
 *          If "excludeObjectChildren", cause undefined values for this object and pass `includeUndefinedValues` as
 *          false when computing defaults for any nested object properties. If "allowEmptyObject", prevents undefined
 *          values in this object while allow the object itself to be empty and passing `includeUndefinedValues` as
 *          false when computing defaults for any nested object properties.
 * @param requiredFields - The list of fields that are required
 */
function maybeAddDefaultToObject(obj, key, computedDefault, includeUndefinedValues, requiredFields) {
  if (requiredFields === void 0) {
    requiredFields = [];
  }
  if (includeUndefinedValues) {
    obj[key] = computedDefault;
  } else if (isObject(computedDefault)) {
    // Store computedDefault if it's a non-empty object (e.g. not {})
    if (!isEmpty(computedDefault) || requiredFields.includes(key)) {
      obj[key] = computedDefault;
    }
  } else if (computedDefault !== undefined) {
    // Store computedDefault if it's a defined primitive (e.g. true)
    obj[key] = computedDefault;
  }
}
/** Computes the defaults for the current `schema` given the `rawFormData` and `parentDefaults` if any. This drills into
 * each level of the schema, recursively, to fill out every level of defaults provided by the schema.
 *
 * @param validator - an implementation of the `ValidatorType` interface that will be used when necessary
 * @param rawSchema - The schema for which the default state is desired
 * @param [parentDefaults] - Any defaults provided by the parent field in the schema
 * @param [rootSchema] - The options root schema, used to primarily to look up `$ref`s
 * @param [rawFormData] - The current formData, if any, onto which to provide any missing defaults
 * @param [includeUndefinedValues=false] - Optional flag, if true, cause undefined values to be added as defaults.
 *          If "excludeObjectChildren", cause undefined values for this object and pass `includeUndefinedValues` as
 *          false when computing defaults for any nested object properties.
 * @returns - The resulting `formData` with all the defaults provided
 */
function computeDefaults(validator, rawSchema, parentDefaults, rootSchema, rawFormData, includeUndefinedValues // Persona hack to always intialize the form with all fields even if undefined
) {
  if (rootSchema === void 0) {
    rootSchema = {};
  }
  if (includeUndefinedValues === void 0) {
    includeUndefinedValues = true;
  }
  var formData = isObject(rawFormData) ? rawFormData : {};
  var schema = isObject(rawSchema) ? rawSchema : {};
  // Compute the defaults recursively: give highest priority to deepest nodes.
  var defaults = parentDefaults;
  if (isObject(defaults) && isObject(schema["default"])) {
    // For object defaults, only override parent defaults that are defined in
    // schema.default.
    defaults = mergeObjects(defaults, schema["default"]);
  } else if (DEFAULT_KEY in schema) {
    defaults = schema["default"];
  } else if (REF_KEY in schema) {
    // Use referenced schema defaults for this node.
    var refSchema = findSchemaDefinition(schema[REF_KEY], rootSchema);
    return computeDefaults(validator, refSchema, defaults, rootSchema, formData, includeUndefinedValues);
  } else if (DEPENDENCIES_KEY in schema) {
    var resolvedSchema = resolveDependencies(validator, schema, rootSchema, formData);
    return computeDefaults(validator, resolvedSchema, defaults, rootSchema, formData, includeUndefinedValues);
  } else if (isFixedItems(schema)) {
    defaults = schema.items.map(function (itemSchema, idx) {
      return computeDefaults(validator, itemSchema, Array.isArray(parentDefaults) ? parentDefaults[idx] : undefined, rootSchema, formData, includeUndefinedValues);
    });
  } else if (ONE_OF_KEY in schema) {
    if (schema.oneOf.length === 0) {
      return undefined;
    }
    schema = schema.oneOf[getClosestMatchingOption(validator, rootSchema, isEmpty(formData) ? undefined : formData, schema.oneOf, 0)];
  } else if (ANY_OF_KEY in schema) {
    if (schema.anyOf.length === 0) {
      return undefined;
    }
    schema = schema.anyOf[getClosestMatchingOption(validator, rootSchema, isEmpty(formData) ? undefined : formData, schema.anyOf, 0)];
  }
  // Not defaults defined for this node, fallback to generic typed ones.
  if (typeof defaults === "undefined") {
    defaults = schema["default"];
  }
  switch (getSchemaType(schema)) {
    // We need to recur for object schema inner default values.
    case "object":
      {
        var objectDefaults = Object.keys(schema.properties || {}).reduce(function (acc, key) {
          // Compute the defaults for this node, with the parent defaults we might
          // have from a previous run: defaults[key].
          var computedDefault = computeDefaults(validator, get(schema, [PROPERTIES_KEY, key]), get(defaults, [key]), rootSchema, get(formData, [key]), includeUndefinedValues === true);
          maybeAddDefaultToObject(acc, key, computedDefault, includeUndefinedValues, schema.required);
          return acc;
        }, {});
        if (schema.additionalProperties && isObject(defaults)) {
          var additionalPropertiesSchema = isObject(schema.additionalProperties) ? schema.additionalProperties : {}; // as per spec additionalProperties may be either schema or boolean
          Object.keys(defaults).filter(function (key) {
            return !schema.properties || !schema.properties[key];
          }).forEach(function (key) {
            var computedDefault = computeDefaults(validator, additionalPropertiesSchema, get(defaults, [key]), rootSchema, get(formData, [key]), includeUndefinedValues === true);
            maybeAddDefaultToObject(objectDefaults, key, computedDefault, includeUndefinedValues);
          });
        }
        return objectDefaults;
      }
    case "array":
      // Inject defaults into existing array defaults
      if (Array.isArray(defaults)) {
        defaults = defaults.map(function (item, idx) {
          var schemaItem = getInnerSchemaForArrayItem(schema, AdditionalItemsHandling.Fallback, idx);
          return computeDefaults(validator, schemaItem, item, rootSchema);
        });
      }
      // Deeply inject defaults into already existing form data
      if (Array.isArray(rawFormData)) {
        var schemaItem = getInnerSchemaForArrayItem(schema);
        defaults = rawFormData.map(function (item, idx) {
          return computeDefaults(validator, schemaItem, get(defaults, [idx]), rootSchema, item);
        });
      }
      if (schema.minItems) {
        if (!isMultiSelect(validator, schema, rootSchema)) {
          var defaultsLength = Array.isArray(defaults) ? defaults.length : 0;
          if (schema.minItems > defaultsLength) {
            var defaultEntries = defaults || [];
            // populate the array with the defaults
            var fillerSchema = getInnerSchemaForArrayItem(schema, AdditionalItemsHandling.Invert);
            var fillerDefault = fillerSchema["default"];
            var fillerEntries = new Array(schema.minItems - defaultsLength).fill(computeDefaults(validator, fillerSchema, fillerDefault, rootSchema));
            // then fill up the rest with either the item default or empty, up to minItems
            return defaultEntries.concat(fillerEntries);
          }
        }
        return defaults ? defaults : [];
      }
  }
  return defaults;
}
/** Returns the superset of `formData` that includes the given set updated to include any missing fields that have
 * computed to have defaults provided in the `schema`.
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param theSchema - The schema for which the default state is desired
 * @param [formData] - The current formData, if any, onto which to provide any missing defaults
 * @param [rootSchema] - The root schema, used to primarily to look up `$ref`s
 * @param [includeUndefinedValues=false] - Optional flag, if true, cause undefined values to be added as defaults.
 *          If "excludeObjectChildren", cause undefined values for this object and pass `includeUndefinedValues` as
 *          false when computing defaults for any nested object properties.
 * @returns - The resulting `formData` with all the defaults provided
 */
function getDefaultFormState(validator, theSchema, formData, rootSchema, includeUndefinedValues // Persona hack to always intialize the form with all fields even if undefined
) {
  if (includeUndefinedValues === void 0) {
    includeUndefinedValues = true;
  }
  if (!isObject(theSchema)) {
    throw new Error("Invalid schema: " + theSchema);
  }
  var schema = retrieveSchema(validator, theSchema, rootSchema, formData);
  var defaults = computeDefaults(validator, schema, undefined, rootSchema, formData, includeUndefinedValues);
  if (typeof formData === "undefined" || formData === null || typeof formData === "number" && isNaN(formData)) {
    // No form data? Use schema defaults.
    return defaults;
  }
  if (isObject(formData)) {
    return mergeDefaultsWithFormData(defaults, formData);
  }
  if (Array.isArray(formData)) {
    return mergeDefaultsWithFormData(defaults, formData);
  }
  return formData;
}

/** Checks to see if the `uiSchema` contains the `widget` field and that the widget is not `hidden`
 *
 * @param uiSchema - The UI Schema from which to detect if it is customized
 * @returns - True if the `uiSchema` describes a custom widget, false otherwise
 */
function isCustomWidget(uiSchema) {
  if (uiSchema === void 0) {
    uiSchema = {};
  }
  return (
    // TODO: Remove the `&& uiSchema['ui:widget'] !== 'hidden'` once we support hidden widgets for arrays.
    // https://react-jsonschema-form.readthedocs.io/en/latest/usage/widgets/#hidden-widgets
    "widget" in getUiOptions(uiSchema) && getUiOptions(uiSchema)["widget"] !== "hidden"
  );
}

/** Checks to see if the `schema` and `uiSchema` combination represents an array of files
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param schema - The schema for which check for array of files flag is desired
 * @param [uiSchema={}] - The UI schema from which to check the widget
 * @param [rootSchema] - The root schema, used to primarily to look up `$ref`s
 * @returns - True if schema/uiSchema contains an array of files, otherwise false
 */
function isFilesArray(validator, schema, uiSchema, rootSchema) {
  if (uiSchema === void 0) {
    uiSchema = {};
  }
  if (uiSchema[UI_WIDGET_KEY] === "files") {
    return true;
  }
  if (schema.items) {
    var itemsSchema = retrieveSchema(validator, schema.items, rootSchema);
    return itemsSchema.type === "string" && itemsSchema.format === "data-url";
  }
  return false;
}

/** Determines whether the combination of `schema` and `uiSchema` properties indicates that the label for the `schema`
 * should be displayed in a UI.
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param schema - The schema for which the display label flag is desired
 * @param [uiSchema={}] - The UI schema from which to derive potentially displayable information
 * @param [rootSchema] - The root schema, used to primarily to look up `$ref`s
 * @returns - True if the label should be displayed or false if it should not
 */
function getDisplayLabel(validator, schema, uiSchema, rootSchema) {
  if (uiSchema === void 0) {
    uiSchema = {};
  }
  var uiOptions = getUiOptions(uiSchema);
  var _uiOptions$label = uiOptions.label,
    label = _uiOptions$label === void 0 ? true : _uiOptions$label;
  var displayLabel = !!label;
  var schemaType = getSchemaType(schema);
  if (schemaType === "array") {
    displayLabel = isMultiSelect(validator, schema, rootSchema) || isFilesArray(validator, schema, uiSchema, rootSchema) || isCustomWidget(uiSchema);
  }
  if (schemaType === "object") {
    displayLabel = false;
  }
  if (schemaType === "boolean" && !uiSchema[UI_WIDGET_KEY]) {
    displayLabel = false;
  }
  if (uiSchema[UI_FIELD_KEY]) {
    displayLabel = false;
  }
  return displayLabel;
}

/** Merges the errors in `additionalErrorSchema` into the existing `validationData` by combining the hierarchies in the
 * two `ErrorSchema`s and then appending the error list from the `additionalErrorSchema` obtained by calling
 * `validator.toErrorList()` onto the `errors` in the `validationData`. If no `additionalErrorSchema` is passed, then
 * `validationData` is returned.
 *
 * @param validator - The validator used to convert an ErrorSchema to a list of errors
 * @param validationData - The current `ValidationData` into which to merge the additional errors
 * @param [additionalErrorSchema] - The additional set of errors in an `ErrorSchema`
 * @returns - The `validationData` with the additional errors from `additionalErrorSchema` merged into it, if provided.
 */
function mergeValidationData(validator, validationData, additionalErrorSchema) {
  if (!additionalErrorSchema) {
    return validationData;
  }
  var oldErrors = validationData.errors,
    oldErrorSchema = validationData.errorSchema;
  var errors = validator.toErrorList(additionalErrorSchema);
  var errorSchema = additionalErrorSchema;
  if (!isEmpty(oldErrorSchema)) {
    errorSchema = mergeObjects(oldErrorSchema, additionalErrorSchema, true);
    errors = [].concat(oldErrors).concat(errors);
  }
  return {
    errorSchema: errorSchema,
    errors: errors
  };
}

var NO_VALUE = /*#__PURE__*/Symbol("no Value");
/** Sanitize the `data` associated with the `oldSchema` so it is considered appropriate for the `newSchema`. If the new
 * schema does not contain any properties, then `undefined` is returned to clear all the form data. Due to the nature
 * of schemas, this sanitization happens recursively for nested objects of data. Also, any properties in the old schema
 * that are non-existent in the new schema are set to `undefined`. The data sanitization process has the following flow:
 *
 * - If the new schema is an object that contains a `properties` object then:
 *   - Create a `removeOldSchemaData` object, setting each key in the `oldSchema.properties` having `data` to undefined
 *   - Create an empty `nestedData` object for use in the key filtering below:
 *   - Iterate over each key in the `newSchema.properties` as follows:
 *     - Get the `formValue` of the key from the `data`
 *     - Get the `oldKeySchema` and `newKeyedSchema` for the key, defaulting to `{}` when it doesn't exist
 *     - Retrieve the schema for any refs within each `oldKeySchema` and/or `newKeySchema`
 *     - Get the types of the old and new keyed schemas and if the old doesn't exist or the old & new are the same then:
 *       - If `removeOldSchemaData` has an entry for the key, delete it since the new schema has the same property
 *       - If type of the key in the new schema is `object`:
 *         - Store the value from the recursive `sanitizeDataForNewSchema` call in `nestedData[key]`
 *       - Otherwise, check for default or const values:
 *         - Get the old and new `default` values from the schema and check:
 *           - If the new `default` value does not match the form value:
 *             - If the old `default` value DOES match the form value, then:
 *               - Replace `removeOldSchemaData[key]` with the new `default`
 *               - Otherwise, if the new schema is `readOnly` then replace `removeOldSchemaData[key]` with undefined
 *         - Get the old and new `const` values from the schema and check:
 *           - If the new `const` value does not match the form value:
 *           - If the old `const` value DOES match the form value, then:
 *             - Replace `removeOldSchemaData[key]` with the new `const`
 *             - Otherwise, replace `removeOldSchemaData[key]` with undefined
 *   - Once all keys have been processed, return an object built as follows:
 *     - `{ ...removeOldSchemaData, ...nestedData, ...pick(data, keysToKeep) }`
 * - If the new and old schema types are array and the `data` is an array then:
 *   - If the type of the old and new schema `items` are a non-array objects:
 *     - Retrieve the schema for any refs within each `oldKeySchema.items` and/or `newKeySchema.items`
 *     - If the `type`s of both items are the same (or the old does not have a type):
 *       - If the type is "object", then:
 *         - For each element in the `data` recursively sanitize the data, stopping at `maxItems` if specified
 *       - Otherwise, just return the `data` removing any values after `maxItems` if it is set
 *   - If the type of the old and new schema `items` are booleans of the same value, return `data` as is
 * - Otherwise return `undefined`
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param rootSchema - The root JSON schema of the entire form
 * @param [newSchema] - The new schema for which the data is being sanitized
 * @param [oldSchema] - The old schema from which the data originated
 * @param [data={}] - The form data associated with the schema, defaulting to an empty object when undefined
 * @returns - The new form data, with all the fields uniquely associated with the old schema set
 *      to `undefined`. Will return `undefined` if the new schema is not an object containing properties.
 */
function sanitizeDataForNewSchema(validator, rootSchema, newSchema, oldSchema, data) {
  if (data === void 0) {
    data = {};
  }
  // By default, we will clear the form data
  var newFormData;
  // If the new schema is of type object and that object contains a list of properties
  if (has(newSchema, PROPERTIES_KEY)) {
    // Create an object containing root-level keys in the old schema, setting each key to undefined to remove the data
    var removeOldSchemaData = {};
    if (has(oldSchema, PROPERTIES_KEY)) {
      var properties = get(oldSchema, PROPERTIES_KEY, {});
      Object.keys(properties).forEach(function (key) {
        if (has(data, key)) {
          removeOldSchemaData[key] = undefined;
        }
      });
    }
    var keys = Object.keys(get(newSchema, PROPERTIES_KEY, {}));
    // Create a place to store nested data that will be a side-effect of the filter
    var nestedData = {};
    keys.forEach(function (key) {
      var formValue = get(data, key);
      var oldKeyedSchema = get(oldSchema, [PROPERTIES_KEY, key], {});
      var newKeyedSchema = get(newSchema, [PROPERTIES_KEY, key], {});
      // Resolve the refs if they exist
      if (has(oldKeyedSchema, REF_KEY)) {
        oldKeyedSchema = retrieveSchema(validator, oldKeyedSchema, rootSchema, formValue);
      }
      if (has(newKeyedSchema, REF_KEY)) {
        newKeyedSchema = retrieveSchema(validator, newKeyedSchema, rootSchema, formValue);
      }
      // Now get types and see if they are the same
      var oldSchemaTypeForKey = get(oldKeyedSchema, "type");
      var newSchemaTypeForKey = get(newKeyedSchema, "type");
      // Check if the old option has the same key with the same type
      if (!oldSchemaTypeForKey || oldSchemaTypeForKey === newSchemaTypeForKey) {
        if (has(removeOldSchemaData, key)) {
          // SIDE-EFFECT: remove the undefined value for a key that has the same type between the old and new schemas
          delete removeOldSchemaData[key];
        }
        // If it is an object, we'll recurse and store the resulting sanitized data for the key
        if (newSchemaTypeForKey === "object" || newSchemaTypeForKey === "array" && Array.isArray(formValue)) {
          // SIDE-EFFECT: process the new schema type of object recursively to save iterations
          var itemData = sanitizeDataForNewSchema(validator, rootSchema, newKeyedSchema, oldKeyedSchema, formValue);
          if (itemData !== undefined || newSchemaTypeForKey === "array") {
            // only put undefined values for the array type and not the object type
            nestedData[key] = itemData;
          }
        } else {
          // Ok, the non-object types match, let's make sure that a default or a const of a different value is replaced
          // with the new default or const. This allows the case where two schemas differ that only by the default/const
          // value to be properly selected
          var newOptionDefault = get(newKeyedSchema, "default", NO_VALUE);
          var oldOptionDefault = get(oldKeyedSchema, "default", NO_VALUE);
          if (newOptionDefault !== NO_VALUE && newOptionDefault !== formValue) {
            if (oldOptionDefault === formValue) {
              // If the old default matches the formValue, we'll update the new value to match the new default
              removeOldSchemaData[key] = newOptionDefault;
            } else if (get(newKeyedSchema, "readOnly") === true) {
              // If the new schema has the default set to read-only, treat it like a const and remove the value
              removeOldSchemaData[key] = undefined;
            }
          }
          var newOptionConst = get(newKeyedSchema, "const", NO_VALUE);
          var oldOptionConst = get(oldKeyedSchema, "const", NO_VALUE);
          if (newOptionConst !== NO_VALUE && newOptionConst !== formValue) {
            // Since this is a const, if the old value matches, replace the value with the new const otherwise clear it
            removeOldSchemaData[key] = oldOptionConst === formValue ? newOptionConst : undefined;
          }
        }
      }
    });
    newFormData = _extends({}, data, removeOldSchemaData, nestedData);
    // First apply removing the old schema data, then apply the nested data, then apply the old data keys to keep
  } else if (get(oldSchema, "type") === "array" && get(newSchema, "type") === "array" && Array.isArray(data)) {
    var oldSchemaItems = get(oldSchema, "items");
    var newSchemaItems = get(newSchema, "items");
    // If any of the array types `items` are arrays (remember arrays are objects) then we'll just drop the data
    // Eventually, we may want to deal with when either of the `items` are arrays since those tuple validations
    if (typeof oldSchemaItems === "object" && typeof newSchemaItems === "object" && !Array.isArray(oldSchemaItems) && !Array.isArray(newSchemaItems)) {
      if (has(oldSchemaItems, REF_KEY)) {
        oldSchemaItems = retrieveSchema(validator, oldSchemaItems, rootSchema, data);
      }
      if (has(newSchemaItems, REF_KEY)) {
        newSchemaItems = retrieveSchema(validator, newSchemaItems, rootSchema, data);
      }
      // Now get types and see if they are the same
      var oldSchemaType = get(oldSchemaItems, "type");
      var newSchemaType = get(newSchemaItems, "type");
      // Check if the old option has the same key with the same type
      if (!oldSchemaType || oldSchemaType === newSchemaType) {
        var maxItems = get(newSchema, "maxItems", -1);
        if (newSchemaType === "object") {
          newFormData = data.reduce(function (newValue, aValue) {
            var itemValue = sanitizeDataForNewSchema(validator, rootSchema, newSchemaItems, oldSchemaItems, aValue);
            if (itemValue !== undefined && (maxItems < 0 || newValue.length < maxItems)) {
              newValue.push(itemValue);
            }
            return newValue;
          }, []);
        } else {
          newFormData = maxItems > 0 && data.length > maxItems ? data.slice(0, maxItems) : data;
        }
      }
    } else if (typeof oldSchemaItems === "boolean" && typeof newSchemaItems === "boolean" && oldSchemaItems === newSchemaItems) {
      // If they are both booleans and have the same value just return the data as is otherwise fall-thru to undefined
      newFormData = data;
    }
    // Also probably want to deal with `prefixItems` as tuples with the latest 2020 draft
  }

  return newFormData;
}

/** Generates an `IdSchema` object for the `schema`, recursively
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param schema - The schema for which the `IdSchema` is desired
 * @param [id] - The base id for the schema
 * @param [rootSchema] - The root schema, used to primarily to look up `$ref`s
 * @param [formData] - The current formData, if any, to assist retrieving a schema
 * @param [idPrefix='root'] - The prefix to use for the id
 * @param [idSeparator='_'] - The separator to use for the path segments in the id
 * @returns - The `IdSchema` object for the `schema`
 */
function toIdSchema(validator, schema, id, rootSchema, formData, idPrefix, idSeparator) {
  if (idPrefix === void 0) {
    idPrefix = "root";
  }
  if (idSeparator === void 0) {
    idSeparator = "_";
  }
  if (REF_KEY in schema || DEPENDENCIES_KEY in schema || ALL_OF_KEY in schema) {
    var _schema = retrieveSchema(validator, schema, rootSchema, formData);
    return toIdSchema(validator, _schema, id, rootSchema, formData, idPrefix, idSeparator);
  }
  if (ITEMS_KEY in schema && !get(schema, [ITEMS_KEY, REF_KEY])) {
    return toIdSchema(validator, get(schema, ITEMS_KEY), id, rootSchema, formData, idPrefix, idSeparator);
  }
  var $id = id || idPrefix;
  var idSchema = {
    $id: $id
  };
  if (schema.type === "object" && PROPERTIES_KEY in schema) {
    for (var name in schema.properties) {
      var field = get(schema, [PROPERTIES_KEY, name]);
      var fieldId = idSchema[ID_KEY] + idSeparator + name;
      idSchema[name] = toIdSchema(validator, isObject(field) ? field : {}, fieldId, rootSchema,
      // It's possible that formData is not an object -- this can happen if an
      // array item has just been added, but not populated with data yet
      get(formData, [name]), idPrefix, idSeparator);
    }
  }
  return idSchema;
}

/** Generates an `PathSchema` object for the `schema`, recursively
 *
 * @param validator - An implementation of the `ValidatorType` interface that will be used when necessary
 * @param schema - The schema for which the `PathSchema` is desired
 * @param [name=''] - The base name for the schema
 * @param [rootSchema] - The root schema, used to primarily to look up `$ref`s
 * @param [formData] - The current formData, if any, to assist retrieving a schema
 * @returns - The `PathSchema` object for the `schema`
 */
function toPathSchema(validator, schema, name, rootSchema, formData) {
  var _pathSchema;
  if (name === void 0) {
    name = "";
  }
  if (REF_KEY in schema || DEPENDENCIES_KEY in schema || ALL_OF_KEY in schema) {
    var _schema = retrieveSchema(validator, schema, rootSchema, formData);
    return toPathSchema(validator, _schema, name, rootSchema, formData);
  }
  var pathSchema = (_pathSchema = {}, _pathSchema[NAME_KEY] = name.replace(/^\./, ""), _pathSchema);
  if (ONE_OF_KEY in schema) {
    var index = getClosestMatchingOption(validator, rootSchema, formData, schema.oneOf, 0);
    var _schema2 = schema.oneOf[index];
    return toPathSchema(validator, _schema2, name, rootSchema, formData);
  }
  if (ANY_OF_KEY in schema) {
    var _index = getClosestMatchingOption(validator, rootSchema, formData, schema.anyOf, 0);
    var _schema3 = schema.anyOf[_index];
    return toPathSchema(validator, _schema3, name, rootSchema, formData);
  }
  if (ADDITIONAL_PROPERTIES_KEY in schema && schema[ADDITIONAL_PROPERTIES_KEY] !== false) {
    set(pathSchema, RJSF_ADDITONAL_PROPERTIES_FLAG, true);
  }
  if (ITEMS_KEY in schema && Array.isArray(formData)) {
    formData.forEach(function (element, i) {
      pathSchema[i] = toPathSchema(validator, schema.items, name + "." + i, rootSchema, element);
    });
  } else if (PROPERTIES_KEY in schema) {
    for (var property in schema.properties) {
      var field = get(schema, [PROPERTIES_KEY, property]);
      pathSchema[property] = toPathSchema(validator, field, name + "." + property, rootSchema,
      // It's possible that formData is not an object -- this can happen if an
      // array item has just been added, but not populated with data yet
      get(formData, [property]));
    }
  }
  return pathSchema;
}

/** The `SchemaUtils` class provides a wrapper around the publicly exported APIs in the `utils/schema` directory such
 * that one does not have to explicitly pass the `validator` or `rootSchema` to each method. Since both the `validator`
 * and `rootSchema` generally does not change across a `Form`, this allows for providing a simplified set of APIs to the
 * `@rjsf/core` components and the various themes as well. This class implements the `SchemaUtilsType` interface.
 */
var SchemaUtils = /*#__PURE__*/function () {
  /** Constructs the `SchemaUtils` instance with the given `validator` and `rootSchema` stored as instance variables
   *
   * @param validator - An implementation of the `ValidatorType` interface that will be forwarded to all the APIs
   * @param rootSchema - The root schema that will be forwarded to all the APIs
   */
  function SchemaUtils(validator, rootSchema) {
    this.rootSchema = void 0;
    this.validator = void 0;
    this.rootSchema = rootSchema;
    this.validator = validator;
  }
  /** Returns the `ValidatorType` in the `SchemaUtilsType`
   *
   * @returns - The `ValidatorType`
   */
  var _proto = SchemaUtils.prototype;
  _proto.getValidator = function getValidator() {
    return this.validator;
  }
  /** Determines whether either the `validator` and `rootSchema` differ from the ones associated with this instance of
   * the `SchemaUtilsType`. If either `validator` or `rootSchema` are falsy, then return false to prevent the creation
   * of a new `SchemaUtilsType` with incomplete properties.
   *
   * @param validator - An implementation of the `ValidatorType` interface that will be compared against the current one
   * @param rootSchema - The root schema that will be compared against the current one
   * @returns - True if the `SchemaUtilsType` differs from the given `validator` or `rootSchema`
   */;
  _proto.doesSchemaUtilsDiffer = function doesSchemaUtilsDiffer(validator, rootSchema) {
    if (!validator || !rootSchema) {
      return false;
    }
    return this.validator !== validator || !deepEquals(this.rootSchema, rootSchema);
  }
  /** Returns the superset of `formData` that includes the given set updated to include any missing fields that have
   * computed to have defaults provided in the `schema`.
   *
   * @param schema - The schema for which the default state is desired
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @param [includeUndefinedValues=false] - Optional flag, if true, cause undefined values to be added as defaults.
   *          If "excludeObjectChildren", pass `includeUndefinedValues` as false when computing defaults for any nested
   *          object properties.
   * @returns - The resulting `formData` with all the defaults provided
   */;
  _proto.getDefaultFormState = function getDefaultFormState$1(schema, formData, includeUndefinedValues // Persona hack to always intialize the form with all fields even if undefined
  ) {
    if (includeUndefinedValues === void 0) {
      includeUndefinedValues = true;
    }
    return getDefaultFormState(this.validator, schema, formData, this.rootSchema, includeUndefinedValues);
  }
  /** Determines whether the combination of `schema` and `uiSchema` properties indicates that the label for the `schema`
   * should be displayed in a UI.
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [uiSchema] - The UI schema from which to derive potentially displayable information
   * @returns - True if the label should be displayed or false if it should not
   */;
  _proto.getDisplayLabel = function getDisplayLabel$1(schema, uiSchema) {
    return getDisplayLabel(this.validator, schema, uiSchema, this.rootSchema);
  }
  /** Determines which of the given `options` provided most closely matches the `formData`.
   * Returns the index of the option that is valid and is the closest match, or 0 if there is no match.
   *
   * The closest match is determined using the number of matching properties, and more heavily favors options with
   * matching readOnly, default, or const values.
   *
   * @param formData - The form data associated with the schema
   * @param options - The list of options that can be selected from
   * @param [selectedOption] - The index of the currently selected option, defaulted to -1 if not specified
   * @returns - The index of the option that is the closest match to the `formData` or the `selectedOption` if no match
   */;
  _proto.getClosestMatchingOption = function getClosestMatchingOption$1(formData, options, selectedOption) {
    return getClosestMatchingOption(this.validator, this.rootSchema, formData, options, selectedOption);
  }
  /** Given the `formData` and list of `options`, attempts to find the index of the first option that matches the data.
   * Always returns the first option if there is nothing that matches.
   *
   * @param formData - The current formData, if any, used to figure out a match
   * @param options - The list of options to find a matching options from
   * @returns - The firstindex of the matched option or 0 if none is available
   */;
  _proto.getFirstMatchingOption = function getFirstMatchingOption$1(formData, options) {
    return getFirstMatchingOption(this.validator, formData, options, this.rootSchema);
  }
  /** Given the `formData` and list of `options`, attempts to find the index of the option that best matches the data.
   * Deprecated, use `getFirstMatchingOption()` instead.
   *
   * @param formData - The current formData, if any, onto which to provide any missing defaults
   * @param options - The list of options to find a matching options from
   * @returns - The index of the matched option or 0 if none is available
   * @deprecated
   */;
  _proto.getMatchingOption = function getMatchingOption$1(formData, options) {
    return getMatchingOption(this.validator, formData, options, this.rootSchema);
  }
  /** Checks to see if the `schema` and `uiSchema` combination represents an array of files
   *
   * @param schema - The schema for which check for array of files flag is desired
   * @param [uiSchema] - The UI schema from which to check the widget
   * @returns - True if schema/uiSchema contains an array of files, otherwise false
   */;
  _proto.isFilesArray = function isFilesArray$1(schema, uiSchema) {
    return isFilesArray(this.validator, schema, uiSchema, this.rootSchema);
  }
  /** Checks to see if the `schema` combination represents a multi-select
   *
   * @param schema - The schema for which check for a multi-select flag is desired
   * @returns - True if schema contains a multi-select, otherwise false
   */;
  _proto.isMultiSelect = function isMultiSelect$1(schema) {
    return isMultiSelect(this.validator, schema, this.rootSchema);
  }
  /** Checks to see if the `schema` combination represents a select
   *
   * @param schema - The schema for which check for a select flag is desired
   * @returns - True if schema contains a select, otherwise false
   */;
  _proto.isSelect = function isSelect$1(schema) {
    return isSelect(this.validator, schema, this.rootSchema);
  }
  /** Merges the errors in `additionalErrorSchema` into the existing `validationData` by combining the hierarchies in
   * the two `ErrorSchema`s and then appending the error list from the `additionalErrorSchema` obtained by calling
   * `getValidator().toErrorList()` onto the `errors` in the `validationData`. If no `additionalErrorSchema` is passed,
   * then `validationData` is returned.
   *
   * @param validationData - The current `ValidationData` into which to merge the additional errors
   * @param [additionalErrorSchema] - The additional set of errors
   * @returns - The `validationData` with the additional errors from `additionalErrorSchema` merged into it, if provided.
   */;
  _proto.mergeValidationData = function mergeValidationData$1(validationData, additionalErrorSchema) {
    return mergeValidationData(this.validator, validationData, additionalErrorSchema);
  }
  /** Retrieves an expanded schema that has had all of its conditions, additional properties, references and
   * dependencies resolved and merged into the `schema` given a `rawFormData` that is used to do the potentially
   * recursive resolution.
   *
   * @param schema - The schema for which retrieving a schema is desired
   * @param [rawFormData] - The current formData, if any, to assist retrieving a schema
   * @returns - The schema having its conditions, additional properties, references and dependencies resolved
   */;
  _proto.retrieveSchema = function retrieveSchema$1(schema, rawFormData) {
    return retrieveSchema(this.validator, schema, this.rootSchema, rawFormData);
  }
  /** Sanitize the `data` associated with the `oldSchema` so it is considered appropriate for the `newSchema`. If the
   * new schema does not contain any properties, then `undefined` is returned to clear all the form data. Due to the
   * nature of schemas, this sanitization happens recursively for nested objects of data. Also, any properties in the
   * old schemas that are non-existent in the new schema are set to `undefined`.
   *
   * @param [newSchema] - The new schema for which the data is being sanitized
   * @param [oldSchema] - The old schema from which the data originated
   * @param [data={}] - The form data associated with the schema, defaulting to an empty object when undefined
   * @returns - The new form data, with all the fields uniquely associated with the old schema set
   *      to `undefined`. Will return `undefined` if the new schema is not an object containing properties.
   */;
  _proto.sanitizeDataForNewSchema = function sanitizeDataForNewSchema$1(newSchema, oldSchema, data) {
    return sanitizeDataForNewSchema(this.validator, this.rootSchema, newSchema, oldSchema, data);
  }
  /** Generates an `IdSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [id] - The base id for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @param [idPrefix='root'] - The prefix to use for the id
   * @param [idSeparator='_'] - The separator to use for the path segments in the id
   * @returns - The `IdSchema` object for the `schema`
   */;
  _proto.toIdSchema = function toIdSchema$1(schema, id, formData, idPrefix, idSeparator) {
    if (idPrefix === void 0) {
      idPrefix = "root";
    }
    if (idSeparator === void 0) {
      idSeparator = "_";
    }
    return toIdSchema(this.validator, schema, id, this.rootSchema, formData, idPrefix, idSeparator);
  }
  /** Generates an `PathSchema` object for the `schema`, recursively
   *
   * @param schema - The schema for which the display label flag is desired
   * @param [name] - The base name for the schema
   * @param [formData] - The current formData, if any, onto which to provide any missing defaults
   * @returns - The `PathSchema` object for the `schema`
   */;
  _proto.toPathSchema = function toPathSchema$1(schema, name, formData) {
    return toPathSchema(this.validator, schema, name, this.rootSchema, formData);
  };
  return SchemaUtils;
}();
/** Creates a `SchemaUtilsType` interface that is based around the given `validator` and `rootSchema` parameters. The
 * resulting interface implementation will forward the `validator` and `rootSchema` to all the wrapped APIs.
 *
 * @param validator - an implementation of the `ValidatorType` interface that will be forwarded to all the APIs
 * @param rootSchema - The root schema that will be forwarded to all the APIs
 * @returns - An implementation of a `SchemaUtilsType` interface
 */
function createSchemaUtils(validator, rootSchema) {
  return new SchemaUtils(validator, rootSchema);
}

/** Given the `FileReader.readAsDataURL()` based `dataURI` extracts that data into an actual Blob along with the name
 * of that Blob if provided in the URL. If no name is provided, then the name falls back to `unknown`.
 *
 * @param dataURI - The `DataUrl` potentially containing name and raw data to be converted to a Blob
 * @returns - an object containing a Blob and its name, extracted from the URI
 */
function dataURItoBlob(dataURI) {
  // Split metadata from data
  var splitted = dataURI.split(",");
  // Split params
  var params = splitted[0].split(";");
  // Get mime-type from params
  var type = params[0].replace("data:", "");
  // Filter the name property from params
  var properties = params.filter(function (param) {
    return param.split("=")[0] === "name";
  });
  // Look for the name and use unknown if no name property.
  var name;
  if (properties.length !== 1) {
    name = "unknown";
  } else {
    // Because we filtered out the other property,
    // we only have the name case here.
    name = properties[0].split("=")[1];
  }
  // Built the Uint8Array Blob parameter from the base64 string.
  var binary = atob(splitted[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  // Create the blob object
  var blob = new window.Blob([new Uint8Array(array)], {
    type: type
  });
  return {
    blob: blob,
    name: name
  };
}

/** Returns the value(s) from `allEnumOptions` at the index(es) provided by `valueIndex`. If `valueIndex` is not an
 * array AND the index is not valid for `allEnumOptions`, `emptyValue` is returned. If `valueIndex` is an array, AND it
 * contains an invalid index, the returned array will have the resulting undefined values filtered out, leaving only
 * valid values or in the worst case, an empty array.
 *
 * @param valueIndex - The index(es) of the value(s) that should be returned
 * @param [allEnumOptions=[]] - The list of all the known enumOptions
 * @param [emptyValue] - The value to return when the non-array `valueIndex` does not refer to a real option
 * @returns - The single or list of values specified by the single or list of indexes if they are valid. Otherwise,
 *        `emptyValue` or an empty list.
 */
function enumOptionsValueForIndex(valueIndex, allEnumOptions, emptyValue) {
  if (allEnumOptions === void 0) {
    allEnumOptions = [];
  }
  if (Array.isArray(valueIndex)) {
    return valueIndex.map(function (index) {
      return enumOptionsValueForIndex(index, allEnumOptions);
    }).filter(function (val) {
      return val;
    });
  }
  // So Number(null) and Number('') both return 0, so use emptyValue for those two values
  var index = valueIndex === "" || valueIndex === null ? -1 : Number(valueIndex);
  var option = allEnumOptions[index];
  return option ? option.value : emptyValue;
}

/** Removes the enum option value at the `valueIndex` from the currently `selected` (list of) value(s). If `selected` is
 * a list, then that list is updated to remove the enum option value with the `valueIndex` in `allEnumOptions`. If it is
 * a single value, then if the enum option value with the `valueIndex` in `allEnumOptions` matches `selected`, undefined
 * is returned, otherwise the `selected` value is returned.
 *
 * @param valueIndex - The index of the value to be removed from the selected list or single value
 * @param selected - The current (list of) selected value(s)
 * @param [allEnumOptions=[]] - The list of all the known enumOptions
 * @returns - The updated `selected` with the enum option value at `valueIndex` in `allEnumOptions` removed from it,
 *        unless `selected` is a single value. In that case, if the `valueIndex` value matches `selected`, returns
 *        undefined, otherwise `selected`.
 */
function enumOptionsDeselectValue(valueIndex, selected, allEnumOptions) {
  if (allEnumOptions === void 0) {
    allEnumOptions = [];
  }
  var value = enumOptionsValueForIndex(valueIndex, allEnumOptions);
  if (Array.isArray(selected)) {
    return selected.filter(function (v) {
      return !isEqual(v, value);
    });
  }
  return isEqual(value, selected) ? undefined : selected;
}

/** Determines whether the given `value` is (one of) the `selected` value(s).
 *
 * @param value - The value being checked to see if it is selected
 * @param selected - The current selected value or list of values
 * @returns - true if the `value` is one of the `selected` ones, false otherwise
 */
function enumOptionsIsSelected(value, selected) {
  if (Array.isArray(selected)) {
    return selected.some(function (sel) {
      return isEqual(sel, value);
    });
  }
  return isEqual(selected, value);
}

/** Returns the index(es) of the options in `allEnumOptions` whose value(s) match the ones in `value`. All the
 * `enumOptions` are filtered based on whether they are a "selected" `value` and the index of each selected one is then
 * stored in an array. If `multiple` is true, that array is returned, otherwise the first element in the array is
 * returned.
 *
 * @param value - The single value or list of values for which indexes are desired
 * @param [allEnumOptions=[]] - The list of all the known enumOptions
 * @param [multiple=false] - Optional flag, if true will return a list of index, otherwise a single one
 * @returns - A single string index for the first `value` in `allEnumOptions`, if not `multiple`. Otherwise, the list
 *        of indexes for (each of) the value(s) in `value`.
 */
function enumOptionsIndexForValue(value, allEnumOptions, multiple) {
  if (allEnumOptions === void 0) {
    allEnumOptions = [];
  }
  if (multiple === void 0) {
    multiple = false;
  }
  var selectedIndexes = allEnumOptions.map(function (opt, index) {
    return enumOptionsIsSelected(opt.value, value) ? String(index) : undefined;
  }).filter(function (opt) {
    return typeof opt !== "undefined";
  });
  if (!multiple) {
    return selectedIndexes[0];
  }
  return selectedIndexes;
}

/** Add the enum option value at the `valueIndex` to the list of `selected` values in the proper order as defined by
 * `allEnumOptions`
 *
 * @param valueIndex - The index of the value that should be selected
 * @param selected - The current list of selected values
 * @param [allEnumOptions=[]] - The list of all the known enumOptions
 * @returns - The updated list of selected enum values with enum value at the `valueIndex` added to it
 */
function enumOptionsSelectValue(valueIndex, selected, allEnumOptions) {
  if (allEnumOptions === void 0) {
    allEnumOptions = [];
  }
  var value = enumOptionsValueForIndex(valueIndex, allEnumOptions);
  if (value) {
    var index = allEnumOptions.findIndex(function (opt) {
      return value === opt.value;
    });
    var all = allEnumOptions.map(function (_ref) {
      var val = _ref.value;
      return val;
    });
    var updated = selected.slice(0, index).concat(value, selected.slice(index));
    // As inserting values at predefined index positions doesn't work with empty
    // arrays, we need to reorder the updated selection to match the initial order
    return updated.sort(function (a, b) {
      return Number(all.indexOf(a) > all.indexOf(b));
    });
  }
  return selected;
}

/** The `ErrorSchemaBuilder<T>` is used to build an `ErrorSchema<T>` since the definition of the `ErrorSchema` type is
 * designed for reading information rather than writing it. Use this class to add, replace or clear errors in an error
 * schema by using either dotted path or an array of path names. Once you are done building the `ErrorSchema`, you can
 * get the result and/or reset all the errors back to an initial set and start again.
 */
var ErrorSchemaBuilder = /*#__PURE__*/function () {
  /** The error schema being built
   *
   * @private
   */

  /** Construct an `ErrorSchemaBuilder` with an optional initial set of errors in an `ErrorSchema`.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   */
  function ErrorSchemaBuilder(initialSchema) {
    this.errorSchema = {};
    this.resetAllErrors(initialSchema);
  }
  /** Returns the `ErrorSchema` that has been updated by the methods of the `ErrorSchemaBuilder`
   */
  var _proto = ErrorSchemaBuilder.prototype;
  /** Will get an existing `ErrorSchema` at the specified `pathOfError` or create and return one.
   *
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to add the error(s)
   * @returns - The error block for the given `pathOfError` or the root if not provided
   * @private
   */
  _proto.getOrCreateErrorBlock = function getOrCreateErrorBlock(pathOfError) {
    var hasPath = Array.isArray(pathOfError) && pathOfError.length > 0 || typeof pathOfError === "string";
    var errorBlock = hasPath ? get(this.errorSchema, pathOfError) : this.errorSchema;
    if (!errorBlock && pathOfError) {
      errorBlock = {};
      set(this.errorSchema, pathOfError, errorBlock);
    }
    return errorBlock;
  }
  /** Resets all errors in the `ErrorSchemaBuilder` back to the `initialSchema` if provided, otherwise an empty set.
   *
   * @param [initialSchema] - The optional set of initial errors, that will be cloned into the class
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */;
  _proto.resetAllErrors = function resetAllErrors(initialSchema) {
    this.errorSchema = initialSchema ? cloneDeep(initialSchema) : {};
    return this;
  }
  /** Adds the `errorOrList` to the list of errors in the `ErrorSchema` at either the root level or the location within
   * the schema described by the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param errorOrList - The error or list of errors to add into the `ErrorSchema`
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to add the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */;
  _proto.addErrors = function addErrors(errorOrList, pathOfError) {
    var errorBlock = this.getOrCreateErrorBlock(pathOfError);
    var errorsList = get(errorBlock, ERRORS_KEY);
    if (!Array.isArray(errorsList)) {
      errorsList = [];
      errorBlock[ERRORS_KEY] = errorsList;
    }
    if (Array.isArray(errorOrList)) {
      var _errorsList;
      (_errorsList = errorsList).push.apply(_errorsList, errorOrList);
    } else {
      errorsList.push(errorOrList);
    }
    return this;
  }
  /** Sets/replaces the `errorOrList` as the error(s) in the `ErrorSchema` at either the root level or the location
   * within the schema described by the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param errorOrList - The error or list of errors to set into the `ErrorSchema`
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to set the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */;
  _proto.setErrors = function setErrors(errorOrList, pathOfError) {
    var errorBlock = this.getOrCreateErrorBlock(pathOfError);
    // Effectively clone the array being given to prevent accidental outside manipulation of the given list
    var listToAdd = Array.isArray(errorOrList) ? [].concat(errorOrList) : [errorOrList];
    set(errorBlock, ERRORS_KEY, listToAdd);
    return this;
  }
  /** Clears the error(s) in the `ErrorSchema` at either the root level or the location within the schema described by
   * the `pathOfError`. For more information about how to specify the path see the
   * [eslint lodash plugin docs](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/path-style.md).
   *
   * @param [pathOfError] - The optional path into the `ErrorSchema` at which to clear the error(s)
   * @returns - The `ErrorSchemaBuilder` object for chaining purposes
   */;
  _proto.clearErrors = function clearErrors(pathOfError) {
    var errorBlock = this.getOrCreateErrorBlock(pathOfError);
    set(errorBlock, ERRORS_KEY, []);
    return this;
  };
  _createClass(ErrorSchemaBuilder, [{
    key: "ErrorSchema",
    get: function get() {
      return this.errorSchema;
    }
  }]);
  return ErrorSchemaBuilder;
}();

/** Extracts the range spec information `{ step?: number, min?: number, max?: number }` that can be spread onto an HTML
 * input from the range analog in the schema `{ multipleOf?: number, minimum?: number, maximum?: number }`.
 *
 * @param schema - The schema from which to extract the range spec
 * @returns - A range specification from the schema
 */
function rangeSpec(schema) {
  var spec = {};
  if (schema.multipleOf) {
    spec.step = schema.multipleOf;
  }
  if (schema.minimum || schema.minimum === 0) {
    spec.min = schema.minimum;
  }
  if (schema.maximum || schema.maximum === 0) {
    spec.max = schema.maximum;
  }
  return spec;
}

/** Using the `schema`, `defaultType` and `options`, extract out the props for the <input> element that make sense.
 *
 * @param schema - The schema for the field provided by the widget
 * @param [defaultType] - The default type, if any, for the field provided by the widget
 * @param [options={}] - The UI Options for the field provided by the widget
 * @param [autoDefaultStepAny=true] - Determines whether to auto-default step=any when the type is number and no step
 * @returns - The extracted `InputPropsType` object
 */
function getInputProps(schema, defaultType, options, autoDefaultStepAny) {
  if (options === void 0) {
    options = {};
  }
  if (autoDefaultStepAny === void 0) {
    autoDefaultStepAny = true;
  }
  var inputProps = _extends({
    type: defaultType || "text"
  }, rangeSpec(schema));
  // If options.inputType is set use that as the input type
  if (options.inputType) {
    inputProps.type = options.inputType;
  } else if (!defaultType) {
    // If the schema is of type number or integer, set the input type to number
    if (schema.type === "number") {
      inputProps.type = "number";
      // Only add step if one isn't already defined and we are auto-defaulting the "any" step
      if (autoDefaultStepAny && inputProps.step === undefined) {
        // Setting step to 'any' fixes a bug in Safari where decimals are not
        // allowed in number inputs
        inputProps.step = "any";
      }
    } else if (schema.type === "integer") {
      inputProps.type = "number";
      // Only add step if one isn't already defined
      if (inputProps.step === undefined) {
        // Since this is integer, you always want to step up or down in multiples of 1
        inputProps.step = 1;
      }
    }
  }
  if (options.autocomplete) {
    inputProps.autoComplete = options.autocomplete;
  }
  return inputProps;
}

/** The default submit button options, exported for testing purposes
 */
var DEFAULT_OPTIONS = {
  props: {
    disabled: false
  },
  submitText: "Submit",
  norender: false
};
/** Extracts any `ui:submitButtonOptions` from the `uiSchema` and merges them onto the `DEFAULT_OPTIONS`
 *
 * @param [uiSchema={}] - the UI Schema from which to extract submit button props
 * @returns - The merging of the `DEFAULT_OPTIONS` with any custom ones
 */
function getSubmitButtonOptions(uiSchema) {
  if (uiSchema === void 0) {
    uiSchema = {};
  }
  var uiOptions = getUiOptions(uiSchema);
  if (uiOptions && uiOptions[SUBMIT_BTN_OPTIONS_KEY]) {
    var options = uiOptions[SUBMIT_BTN_OPTIONS_KEY];
    return _extends({}, DEFAULT_OPTIONS, options);
  }
  return DEFAULT_OPTIONS;
}

/** Returns the template with the given `name` from either the `uiSchema` if it is defined or from the `registry`
 * otherwise. NOTE, since `ButtonTemplates` are not overridden in `uiSchema` only those in the `registry` are returned.
 *
 * @param name - The name of the template to fetch, restricted to the keys of `TemplatesType`
 * @param registry - The `Registry` from which to read the template
 * @param [uiOptions={}] - The `UIOptionsType` from which to read an alternate template
 * @returns - The template from either the `uiSchema` or `registry` for the `name`
 */
function getTemplate(name, registry, uiOptions) {
  if (uiOptions === void 0) {
    uiOptions = {};
  }
  var templates = registry.templates;
  if (name === "ButtonTemplates") {
    return templates[name];
  }
  return (
    // Evaluating uiOptions[name] results in TS2590: Expression produces a union type that is too complex to represent
    // To avoid that, we cast uiOptions to `any` before accessing the name field
    uiOptions[name] || templates[name]
  );
}

var _excluded = ["options"];
/** The map of schema types to widget type to widget name
 */
var widgetMap = {
  "boolean": {
    checkbox: "CheckboxWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    hidden: "HiddenWidget"
  },
  string: {
    text: "TextWidget",
    password: "PasswordWidget",
    email: "EmailWidget",
    hostname: "TextWidget",
    ipv4: "TextWidget",
    ipv6: "TextWidget",
    uri: "URLWidget",
    "data-url": "FileWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    textarea: "TextareaWidget",
    hidden: "HiddenWidget",
    date: "DateWidget",
    datetime: "DateTimeWidget",
    "date-time": "DateTimeWidget",
    "alt-date": "AltDateWidget",
    "alt-datetime": "AltDateTimeWidget",
    color: "ColorWidget",
    file: "FileWidget"
  },
  number: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  integer: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  array: {
    select: "SelectWidget",
    checkboxes: "CheckboxesWidget",
    files: "FileWidget",
    hidden: "HiddenWidget"
  }
};
/** Wraps the given widget with stateless functional component that will merge any `defaultProps.options` with the
 * `options` that are provided in the props. It will add the wrapper component as a `MergedWidget` property onto the
 * `Widget` so that future attempts to wrap `AWidget` will return the already existing wrapper.
 *
 * @param AWidget - A widget that will be wrapped or one that is already wrapped
 * @returns - The wrapper widget
 */
function mergeWidgetOptions(AWidget) {
  var MergedWidget = get(AWidget, "MergedWidget");
  // cache return value as property of widget for proper react reconciliation
  if (!MergedWidget) {
    var defaultOptions = AWidget.defaultProps && AWidget.defaultProps.options || {};
    MergedWidget = function MergedWidget(_ref) {
      var options = _ref.options,
        props = _objectWithoutPropertiesLoose(_ref, _excluded);
      return /*#__PURE__*/React.createElement(AWidget, _extends({
        options: _extends({}, defaultOptions, options)
      }, props));
    };
    set(AWidget, "MergedWidget", MergedWidget);
  }
  return MergedWidget;
}
/** Given a schema representing a field to render and either the name or actual `Widget` implementation, returns the
 * React component that is used to render the widget. If the `widget` is already a React component, then it is wrapped
 * with a `MergedWidget`. Otherwise an attempt is made to look up the widget inside of the `registeredWidgets` map based
 * on the schema type and `widget` name. If no widget component can be found an `Error` is thrown.
 *
 * @param schema - The schema for the field
 * @param [widget] - Either the name of the widget OR a `Widget` implementation to use
 * @param [registeredWidgets={}] - A registry of widget name to `Widget` implementation
 * @returns - The `Widget` component to use
 * @throws - An error if there is no `Widget` component that can be returned
 */
function getWidget(schema, widget, registeredWidgets) {
  if (registeredWidgets === void 0) {
    registeredWidgets = {};
  }
  var type = getSchemaType(schema);
  if (typeof widget === "function" || widget && ReactIs.isForwardRef( /*#__PURE__*/React.createElement(widget)) || ReactIs.isMemo(widget)) {
    return mergeWidgetOptions(widget);
  }
  if (typeof widget !== "string") {
    throw new Error("Unsupported widget definition: " + typeof widget);
  }
  if (widget in registeredWidgets) {
    var registeredWidget = registeredWidgets[widget];
    return getWidget(schema, registeredWidget, registeredWidgets);
  }
  if (typeof type === "string") {
    if (!(type in widgetMap)) {
      throw new Error("No widget for type '" + type + "'");
    }
    if (widget in widgetMap[type]) {
      var _registeredWidget = registeredWidgets[widgetMap[type][widget]];
      return getWidget(schema, _registeredWidget, registeredWidgets);
    }
  }
  throw new Error("No widget '" + widget + "' for type '" + type + "'");
}

/** Detects whether the `widget` exists for the `schema` with the associated `registryWidgets` and returns true if it
 * does, or false if it doesn't.
 *
 * @param schema - The schema for the field
 * @param widget - Either the name of the widget OR a `Widget` implementation to use
 * @param [registeredWidgets={}] - A registry of widget name to `Widget` implementation
 * @returns - True if the widget exists, false otherwise
 */
function hasWidget(schema, widget, registeredWidgets) {
  if (registeredWidgets === void 0) {
    registeredWidgets = {};
  }
  try {
    getWidget(schema, widget, registeredWidgets);
    return true;
  } catch (e) {
    var err = e;
    if (err.message && (err.message.startsWith("No widget") || err.message.startsWith("Unsupported widget"))) {
      return false;
    }
    throw e;
  }
}

/** Generates a consistent `id` pattern for a given `id` and a `suffix`
 *
 * @param id - Either simple string id or an IdSchema from which to extract it
 * @param suffix - The suffix to append to the id
 */
function idGenerator(id, suffix) {
  var theId = isString(id) ? id : id[ID_KEY];
  return theId + "__" + suffix;
}
/** Return a consistent `id` for the field description element
 *
 * @param id - Either simple string id or an IdSchema from which to extract it
 * @returns - The consistent id for the field description element from the given `id`
 */
function descriptionId(id) {
  return idGenerator(id, "description");
}
/** Return a consistent `id` for the field error element
 *
 * @param id - Either simple string id or an IdSchema from which to extract it
 * @returns - The consistent id for the field error element from the given `id`
 */
function errorId(id) {
  return idGenerator(id, "error");
}
/** Return a consistent `id` for the field examples element
 *
 * @param id - Either simple string id or an IdSchema from which to extract it
 * @returns - The consistent id for the field examples element from the given `id`
 */
function examplesId(id) {
  return idGenerator(id, "examples");
}
/** Return a consistent `id` for the field help element
 *
 * @param id - Either simple string id or an IdSchema from which to extract it
 * @returns - The consistent id for the field help element from the given `id`
 */
function helpId(id) {
  return idGenerator(id, "help");
}
/** Return a consistent `id` for the field title element
 *
 * @param id - Either simple string id or an IdSchema from which to extract it
 * @returns - The consistent id for the field title element from the given `id`
 */
function titleId(id) {
  return idGenerator(id, "title");
}
/** Return a list of element ids that contain additional information about the field that can be used to as the aria
 * description of the field. This is correctly omitting `titleId` which would be "labeling" rather than "describing" the
 * element.
 *
 * @param id - Either simple string id or an IdSchema from which to extract it
 * @param [includeExamples=false] - Optional flag, if true, will add the `examplesId` into the list
 * @returns - The string containing the list of ids for use in an `aria-describedBy` attribute
 */
function ariaDescribedByIds(id, includeExamples) {
  if (includeExamples === void 0) {
    includeExamples = false;
  }
  var examples = includeExamples ? " " + examplesId(id) : "";
  return errorId(id) + " " + descriptionId(id) + " " + helpId(id) + examples;
}
/** Return a consistent `id` for the `optionIndex`s of a `Radio` or `Checkboxes` widget
 *
 * @param id - The id of the parent component for the option
 * @param optionIndex - The index of the option for which the id is desired
 * @returns - An id for the option index based on the parent `id`
 */
function optionId(id, optionIndex) {
  return id + "-" + optionIndex;
}

/** Converts a local Date string into a UTC date string
 *
 * @param dateString - The string representation of a date as accepted by the `Date()` constructor
 * @returns - A UTC date string if `dateString` is truthy, otherwise undefined
 */
function localToUTC(dateString) {
  return dateString ? new Date(dateString).toJSON() : undefined;
}

/** Returns the constant value from the schema when it is either a single value enum or has a const key. Otherwise
 * throws an error.
 *
 * @param schema - The schema from which to obtain the constant value
 * @returns - The constant value for the schema
 * @throws - Error when the schema does not have a constant value
 */
function toConstant(schema) {
  if (ENUM_KEY in schema && Array.isArray(schema["enum"]) && schema["enum"].length === 1) {
    return schema["enum"][0];
  }
  if (CONST_KEY in schema) {
    return schema["const"];
  }
  throw new Error("schema cannot be inferred as a constant");
}

/** Gets the list of options from the schema. If the schema has an enum list, then those enum values are returned. The
 * labels for the options will be extracted from the non-standard, RJSF-deprecated `enumNames` if it exists, otherwise
 * the label will be the same as the `value`. If the schema has a `oneOf` or `anyOf`, then the value is the list of
 * `const` values from the schema and the label is either the `schema.title` or the value.
 *
 * @param schema - The schema from which to extract the options list
 * @returns - The list of options from the schema
 */
function optionsList(schema) {
  // enumNames was deprecated in v5 and is intentionally omitted from the RJSFSchema type.
  // Cast the type to include enumNames so the feature still works.
  var schemaWithEnumNames = schema;
  if (schemaWithEnumNames.enumNames && process.env.NODE_ENV !== "production") {
    console.warn("The enumNames property is deprecated and may be removed in a future major release.");
  }
  if (schema["enum"]) {
    return schema["enum"].map(function (value, i) {
      var label = schemaWithEnumNames.enumNames && schemaWithEnumNames.enumNames[i] || String(value);
      return {
        label: label,
        value: value
      };
    });
  }
  var altSchemas = schema.oneOf || schema.anyOf;
  return altSchemas && altSchemas.map(function (aSchemaDef) {
    var aSchema = aSchemaDef;
    var value = toConstant(aSchema);
    var label = aSchema.title || String(value);
    return {
      schema: aSchema,
      label: label,
      value: value
    };
  });
}

/** Given a list of `properties` and an `order` list, returns a list that contains the `properties` ordered correctly.
 * If `order` is not an array, then the untouched `properties` list is returned. Otherwise `properties` is ordered per
 * the `order` list. If `order` contains a '*' then any `properties` that are not mentioned explicity in `order` will be
 * places in the location of the `*`.
 *
 * @param properties - The list of property keys to be ordered
 * @param order - An array of property keys to be ordered first, with an optional '*' property
 * @returns - A list with the `properties` ordered
 * @throws - Error when the properties cannot be ordered correctly
 */
function orderProperties(properties, order) {
  if (!Array.isArray(order)) {
    return properties;
  }
  var arrayToHash = function arrayToHash(arr) {
    return arr.reduce(function (prev, curr) {
      prev[curr] = true;
      return prev;
    }, {});
  };
  var errorPropList = function errorPropList(arr) {
    return arr.length > 1 ? "properties '" + arr.join("', '") + "'" : "property '" + arr[0] + "'";
  };
  var propertyHash = arrayToHash(properties);
  var orderFiltered = order.filter(function (prop) {
    return prop === "*" || propertyHash[prop];
  });
  var orderHash = arrayToHash(orderFiltered);
  var rest = properties.filter(function (prop) {
    return !orderHash[prop];
  });
  var restIndex = orderFiltered.indexOf("*");
  if (restIndex === -1) {
    if (rest.length) {
      throw new Error("uiSchema order list does not contain " + errorPropList(rest));
    }
    return orderFiltered;
  }
  if (restIndex !== orderFiltered.lastIndexOf("*")) {
    throw new Error("uiSchema order list contains more than one wildcard item");
  }
  var complete = [].concat(orderFiltered);
  complete.splice.apply(complete, [restIndex, 1].concat(rest));
  return complete;
}

/** Returns a string representation of the `num` that is padded with leading "0"s if necessary
 *
 * @param num - The number to pad
 * @param width - The width of the string at which no lead padding is necessary
 * @returns - The number converted to a string with leading zero padding if the number of digits is less than `width`
 */
function pad(num, width) {
  var s = String(num);
  while (s.length < width) {
    s = "0" + s;
  }
  return s;
}

/** Parses the `dateString` into a `DateObject`, including the time information when `includeTime` is true
 *
 * @param dateString - The date string to parse into a DateObject
 * @param [includeTime=true] - Optional flag, if false, will not include the time data into the object
 * @returns - The date string converted to a `DateObject`
 * @throws - Error when the date cannot be parsed from the string
 */
function parseDateString(dateString, includeTime) {
  if (includeTime === void 0) {
    includeTime = true;
  }
  if (!dateString) {
    return {
      year: -1,
      month: -1,
      day: -1,
      hour: includeTime ? -1 : 0,
      minute: includeTime ? -1 : 0,
      second: includeTime ? -1 : 0
    };
  }
  var date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Unable to parse date " + dateString);
  }
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: includeTime ? date.getUTCHours() : 0,
    minute: includeTime ? date.getUTCMinutes() : 0,
    second: includeTime ? date.getUTCSeconds() : 0
  };
}

/** Check to see if a `schema` specifies that a value must be true. This happens when:
 * - `schema.const` is truthy
 * - `schema.enum` == `[true]`
 * - `schema.anyOf` or `schema.oneOf` has a single value which recursively returns true
 * - `schema.allOf` has at least one value which recursively returns true
 *
 * @param schema - The schema to check
 * @returns - True if the schema specifies a value that must be true, false otherwise
 */
function schemaRequiresTrueValue(schema) {
  // Check if const is a truthy value
  if (schema["const"]) {
    return true;
  }
  // Check if an enum has a single value of true
  if (schema["enum"] && schema["enum"].length === 1 && schema["enum"][0] === true) {
    return true;
  }
  // If anyOf has a single value, evaluate the subschema
  if (schema.anyOf && schema.anyOf.length === 1) {
    return schemaRequiresTrueValue(schema.anyOf[0]);
  }
  // If oneOf has a single value, evaluate the subschema
  if (schema.oneOf && schema.oneOf.length === 1) {
    return schemaRequiresTrueValue(schema.oneOf[0]);
  }
  // Evaluate each subschema in allOf, to see if one of them requires a true value
  if (schema.allOf) {
    var schemaSome = function schemaSome(subSchema) {
      return schemaRequiresTrueValue(subSchema);
    };
    return schema.allOf.some(schemaSome);
  }
  return false;
}

/** Determines whether the given `component` should be rerendered by comparing its current set of props and state
 * against the next set. If either of those two sets are not the same, then the component should be rerendered.
 *
 * @param component - A React component being checked
 * @param nextProps - The next set of props against which to check
 * @param nextState - The next set of state against which to check
 * @returns - True if the component should be re-rendered, false otherwise
 */
function shouldRender(component, nextProps, nextState) {
  var props = component.props,
    state = component.state;
  return !deepEquals(props, nextProps) || !deepEquals(state, nextState);
}

/** Returns a UTC date string for the given `dateObject`. If `time` is false, then the time portion of the string is
 * removed.
 *
 * @param dateObject - The `DateObject` to convert to a date string
 * @param [time=true] - Optional flag used to remove the time portion of the date string if false
 * @returns - The UTC date string
 */
function toDateString(dateObject, time) {
  if (time === void 0) {
    time = true;
  }
  var year = dateObject.year,
    month = dateObject.month,
    day = dateObject.day,
    _dateObject$hour = dateObject.hour,
    hour = _dateObject$hour === void 0 ? 0 : _dateObject$hour,
    _dateObject$minute = dateObject.minute,
    minute = _dateObject$minute === void 0 ? 0 : _dateObject$minute,
    _dateObject$second = dateObject.second,
    second = _dateObject$second === void 0 ? 0 : _dateObject$second;
  var utcTime = Date.UTC(year, month - 1, day, hour, minute, second);
  var datetime = new Date(utcTime).toJSON();
  return time ? datetime : datetime.slice(0, 10);
}

/** Converts a UTC date string into a local Date format
 *
 * @param jsonDate - A UTC date string
 * @returns - An empty string when `jsonDate` is falsey, otherwise a date string in local format
 */
function utcToLocal(jsonDate) {
  if (!jsonDate) {
    return "";
  }
  // required format of `'yyyy-MM-ddThh:mm' followed by optional ':ss' or ':ss.SSS'
  // https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type%3Ddatetime-local)
  // > should be a _valid local date and time string_ (not GMT)
  // Note - date constructor passed local ISO-8601 does not correctly
  // change time to UTC in node pre-8
  var date = new Date(jsonDate);
  var yyyy = pad(date.getFullYear(), 4);
  var MM = pad(date.getMonth() + 1, 2);
  var dd = pad(date.getDate(), 2);
  var hh = pad(date.getHours(), 2);
  var mm = pad(date.getMinutes(), 2);
  var ss = pad(date.getSeconds(), 2);
  var SSS = pad(date.getMilliseconds(), 3);
  return yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm + ":" + ss + "." + SSS;
}

export { ADDITIONAL_PROPERTIES_KEY, ADDITIONAL_PROPERTY_FLAG, ALL_OF_KEY, ANY_OF_KEY, CONST_KEY, DEFAULT_KEY, DEFINITIONS_KEY, DEPENDENCIES_KEY, ENUM_KEY, ERRORS_KEY, ErrorSchemaBuilder, ID_KEY, ITEMS_KEY, NAME_KEY, ONE_OF_KEY, PROPERTIES_KEY, REF_KEY, REQUIRED_KEY, RJSF_ADDITONAL_PROPERTIES_FLAG, SUBMIT_BTN_OPTIONS_KEY, UI_FIELD_KEY, UI_OPTIONS_KEY, UI_WIDGET_KEY, allowAdditionalItems, ariaDescribedByIds, asNumber, canExpand, createSchemaUtils, dataURItoBlob, deepEquals, descriptionId, enumOptionsDeselectValue, enumOptionsIndexForValue, enumOptionsIsSelected, enumOptionsSelectValue, enumOptionsValueForIndex, errorId, examplesId, findSchemaDefinition, getClosestMatchingOption, getDefaultFormState, getDisplayLabel, getFirstMatchingOption, getInputProps, getMatchingOption, getSchemaType, getSubmitButtonOptions, getTemplate, getUiOptions, getWidget, guessType, hasWidget, helpId, isConstant, isCustomWidget, isFilesArray, isFixedItems, isMultiSelect, isObject, isSelect, localToUTC, mergeDefaultsWithFormData, mergeObjects, mergeSchemas, mergeValidationData, optionId, optionsList, orderProperties, pad, parseDateString, rangeSpec, retrieveSchema, sanitizeDataForNewSchema, schemaRequiresTrueValue, shouldRender, titleId, toConstant, toDateString, toIdSchema, toPathSchema, utcToLocal };
//# sourceMappingURL=utils.esm.js.map
