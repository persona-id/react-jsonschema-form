import { withTheme } from '@rjsf/core';
import { Button, Icon, Segment, Grid, Form, Message, Label, List, Header, Radio, Input } from 'semantic-ui-react';
import React from 'react';
import { getUiOptions, getTemplate, isFixedItems, UI_OPTIONS_KEY, getInputProps, examplesId, ariaDescribedByIds, descriptionId, titleId, canExpand, getSubmitButtonOptions, ADDITIONAL_PROPERTY_FLAG, schemaRequiresTrueValue, enumOptionsIsSelected, optionId, enumOptionsSelectValue, enumOptionsDeselectValue, enumOptionsValueForIndex, rangeSpec, enumOptionsIndexForValue } from '@rjsf/utils';
import { nanoid } from 'nanoid';
import map from 'lodash-es/map';

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

var _excluded$4 = ["uiSchema", "registry", "color"];
/** The `AddButton` renders a button that represent the `Add` action on a form
 */
function AddButton(_ref) {
  var color = _ref.color,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  return /*#__PURE__*/React.createElement(Button, _extends({
    title: "Add Item",
    color: color
  }, props, {
    icon: true,
    size: "tiny"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }));
}

var _excluded$3 = ["wrap", "component"];
/**
 * Extract props meant for semantic UI components from props that are
 * passed to Widgets, Templates and Fields.
 * @param {Object} params
 * @param {Object?} params.formContext
 * @param {Object?} params.uiSchema
 * @param {Object?} params.options
 * @param {Object?} params.defaultSchemaProps
 * @param {Object?} params.defaultContextProps
 * @returns {any}
 */
function getSemanticProps(_ref) {
  var _ref$formContext = _ref.formContext,
    formContext = _ref$formContext === void 0 ? {} : _ref$formContext,
    _ref$uiSchema = _ref.uiSchema,
    uiSchema = _ref$uiSchema === void 0 ? {} : _ref$uiSchema,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options,
    _ref$defaultSchemaPro = _ref.defaultSchemaProps,
    defaultSchemaProps = _ref$defaultSchemaPro === void 0 ? {
      fluid: true,
      inverted: false
    } : _ref$defaultSchemaPro,
    _ref$defaultContextPr = _ref.defaultContextProps,
    defaultContextProps = _ref$defaultContextPr === void 0 ? {} : _ref$defaultContextPr;
  var formContextProps = formContext.semantic;
  var schemaProps = getUiOptions(uiSchema).semantic;
  var optionProps = options.semantic;
  // formContext props should overide other props
  return Object.assign({}, _extends({}, defaultSchemaProps), _extends({}, defaultContextProps), schemaProps, optionProps, formContextProps);
}
/**
 * Extract error props meant for semantic UI components from props that are
 * passed to Widgets, Templates and Fields.
 * @param {Object} params
 * @param {Object?} params.formContext
 * @param {Object?} params.uiSchema
 * @param {Object?} params.defaultProps
 * @returns {any}
 */
function getSemanticErrorProps(_ref2) {
  var _ref2$formContext = _ref2.formContext,
    formContext = _ref2$formContext === void 0 ? {} : _ref2$formContext,
    _ref2$uiSchema = _ref2.uiSchema,
    uiSchema = _ref2$uiSchema === void 0 ? {} : _ref2$uiSchema,
    _ref2$options = _ref2.options,
    options = _ref2$options === void 0 ? {} : _ref2$options,
    _ref2$defaultProps = _ref2.defaultProps,
    defaultProps = _ref2$defaultProps === void 0 ? {
      size: "small",
      pointing: "above"
    } : _ref2$defaultProps;
  var formContextProps = formContext.semantic && formContext.semantic.errorOptions;
  var semanticOptions = getUiOptions(uiSchema).semantic;
  var schemaProps = semanticOptions && semanticOptions.errorOptions;
  var optionProps = options.semantic && options.semantic.errorOptions;
  return Object.assign({}, _extends({}, defaultProps), schemaProps, optionProps, formContextProps);
}
/**
 * Combine multiple strings containing class names into a single string,
 * removing duplicates. E.g.
 * cleanClassNames('bar', 'baz bar', 'x y ', undefined)
 * // 'bar baz x y'
 * @param {Array} classNameArr
 * @param {Array} omit
 * @returns {string}
 */
function cleanClassNames(classNameArr, omit) {
  if (omit === void 0) {
    omit = [];
  }
  // Split each arg on whitespace, and add it to an array. Skip false-y args
  // like "" and undefined.
  var classList = classNameArr.filter(Boolean).reduce(function (previous, current) {
    return previous.concat(current.trim().split(/\s+/));
  }, []);
  // Remove any class names from omit, and make the rest unique before
  // returning them as a string
  return [].concat(new Set(classList.filter(function (cn) {
    return !omit.includes(cn);
  }))).join(" ");
}
/**
 *
 * @param {boolean} wrap
 * @param Component
 * @param {Object} props
 * @returns {*}
 * @constructor
 */
function MaybeWrap(_ref3) {
  var wrap = _ref3.wrap,
    _ref3$component = _ref3.component,
    Component = _ref3$component === void 0 ? "div" : _ref3$component,
    props = _objectWithoutPropertiesLoose(_ref3, _excluded$3);
  return wrap ? /*#__PURE__*/React.createElement(Component, _extends({}, props)) : props.children;
}

var gridStyle = function gridStyle(vertical) {
  return {
    display: "grid",
    gridTemplateColumns: "1fr " + (vertical ? 65 : 110) + "px"
  };
};
/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldItemTemplate(props) {
  var children = props.children,
    disabled = props.disabled,
    hasToolbar = props.hasToolbar,
    hasMoveDown = props.hasMoveDown,
    hasMoveUp = props.hasMoveUp,
    hasRemove = props.hasRemove,
    index = props.index,
    onDropIndexClick = props.onDropIndexClick,
    onReorderClick = props.onReorderClick,
    readonly = props.readonly,
    uiSchema = props.uiSchema,
    registry = props.registry;
  var _registry$templates$B = registry.templates.ButtonTemplates,
    MoveDownButton = _registry$templates$B.MoveDownButton,
    MoveUpButton = _registry$templates$B.MoveUpButton,
    RemoveButton = _registry$templates$B.RemoveButton;
  var uiOptions = getUiOptions(uiSchema);
  // Pull the semantic props out of the uiOptions that were put in via the ArrayFieldTemplate
  var _uiOptions$semantic = uiOptions.semantic,
    _uiOptions$semantic$h = _uiOptions$semantic.horizontalButtons,
    horizontalButtons = _uiOptions$semantic$h === void 0 ? false : _uiOptions$semantic$h,
    _uiOptions$semantic$w = _uiOptions$semantic.wrapItem,
    wrapItem = _uiOptions$semantic$w === void 0 ? false : _uiOptions$semantic$w;
  return /*#__PURE__*/React.createElement("div", {
    className: "array-item"
  }, /*#__PURE__*/React.createElement(MaybeWrap, {
    wrap: wrapItem,
    component: Segment
  }, /*#__PURE__*/React.createElement(Grid, {
    style: index !== 0 ? _extends({}, gridStyle(!horizontalButtons), {
      alignItems: "center"
    }) : gridStyle(!horizontalButtons)
  }, /*#__PURE__*/React.createElement(Grid.Column, {
    width: 16,
    verticalAlign: "middle"
  }, children), hasToolbar && /*#__PURE__*/React.createElement(Grid.Column, null, (hasMoveUp || hasMoveDown || hasRemove) && /*#__PURE__*/React.createElement(Button.Group, {
    size: "mini",
    vertical: !horizontalButtons
  }, (hasMoveUp || hasMoveDown) && /*#__PURE__*/React.createElement(MoveUpButton, {
    className: "array-item-move-up",
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onReorderClick(index, index - 1),
    uiSchema: uiSchema,
    registry: registry
  }), (hasMoveUp || hasMoveDown) && /*#__PURE__*/React.createElement(MoveDownButton, {
    className: "array-item-move-down",
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onReorderClick(index, index + 1),
    uiSchema: uiSchema,
    registry: registry
  }), hasRemove && /*#__PURE__*/React.createElement(RemoveButton, {
    className: "array-item-remove",
    disabled: disabled || readonly,
    onClick: onDropIndexClick(index),
    uiSchema: uiSchema,
    registry: registry
  }))))));
}

var _excluded$2 = ["key", "uiSchema"];
/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldTemplate(props) {
  var uiSchema = props.uiSchema,
    idSchema = props.idSchema,
    canAdd = props.canAdd,
    className = props.className,
    disabled = props.disabled,
    formContext = props.formContext,
    items = props.items,
    onAddClick = props.onAddClick,
    readonly = props.readonly,
    required = props.required,
    schema = props.schema,
    title = props.title,
    registry = props.registry;
  var semanticProps = getSemanticProps({
    uiSchema: uiSchema,
    formContext: formContext,
    defaultSchemaProps: {
      horizontalButtons: false,
      wrapItem: false
    }
  });
  var horizontalButtons = semanticProps.horizontalButtons,
    wrapItem = semanticProps.wrapItem;
  var semantic = {
    horizontalButtons: horizontalButtons,
    wrapItem: wrapItem
  };
  var uiOptions = getUiOptions(uiSchema);
  var ArrayFieldDescriptionTemplate = getTemplate("ArrayFieldDescriptionTemplate", registry, uiOptions);
  var ArrayFieldItemTemplate = getTemplate("ArrayFieldItemTemplate", registry, uiOptions);
  var ArrayFieldTitleTemplate = getTemplate("ArrayFieldTitleTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  return /*#__PURE__*/React.createElement("div", {
    className: cleanClassNames([className, isFixedItems(schema) ? "" : "sortable-form-fields"])
  }, /*#__PURE__*/React.createElement(ArrayFieldTitleTemplate, {
    idSchema: idSchema,
    title: uiOptions.title || title,
    schema: schema,
    uiSchema: uiSchema,
    required: required,
    registry: registry
  }), /*#__PURE__*/React.createElement(ArrayFieldDescriptionTemplate, {
    idSchema: idSchema,
    description: uiOptions.description || schema.description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), /*#__PURE__*/React.createElement("div", {
    key: "array-item-list-" + idSchema.$id
  }, /*#__PURE__*/React.createElement("div", {
    className: "row array-item-list"
  }, items && items.map(function (_ref) {
    var _extends2;
    var key = _ref.key,
      _ref$uiSchema = _ref.uiSchema,
      itemUiSchema = _ref$uiSchema === void 0 ? {} : _ref$uiSchema,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
    // Merge in the semantic props from the ArrayFieldTemplate into each of the items
    var mergedUiSchema = _extends({}, itemUiSchema, (_extends2 = {}, _extends2[UI_OPTIONS_KEY] = _extends({}, itemUiSchema[UI_OPTIONS_KEY], {
      semantic: semantic
    }), _extends2));
    return /*#__PURE__*/React.createElement(ArrayFieldItemTemplate, _extends({
      key: key
    }, props, {
      uiSchema: mergedUiSchema
    }));
  })), canAdd && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1rem",
      position: "relative",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(AddButton, {
    onClick: onAddClick,
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  }))));
}

/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
function BaseInputTemplate(props) {
  var id = props.id,
    placeholder = props.placeholder,
    label = props.label,
    value = props.value,
    required = props.required,
    readonly = props.readonly,
    disabled = props.disabled,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    autofocus = props.autofocus,
    options = props.options,
    schema = props.schema,
    uiSchema = props.uiSchema,
    formContext = props.formContext,
    type = props.type,
    registry = props.registry,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors;
  var inputProps = getInputProps(schema, type, options);
  var semanticProps = getSemanticProps({
    uiSchema: uiSchema,
    formContext: formContext,
    options: options
  });
  var schemaUtils = registry.schemaUtils;
  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return onChange(value === "" ? options.emptyValue : value);
  };
  var _onBlur = function _onBlur() {
    return onBlur && onBlur(id, value);
  };
  var _onFocus = function _onFocus() {
    return onFocus && onFocus(id, value);
  };
  var displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Form.Input, _extends({
    key: id,
    id: id,
    name: id,
    placeholder: placeholder
  }, inputProps, {
    label: displayLabel ? label || schema.title : false,
    required: required,
    autoFocus: autofocus,
    disabled: disabled || readonly,
    list: schema.examples ? examplesId(id) : undefined
  }, semanticProps, {
    value: value || value === 0 ? value : "",
    error: rawErrors.length > 0,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id, !!schema.examples)
  })), Array.isArray(schema.examples) && /*#__PURE__*/React.createElement("datalist", {
    id: examplesId(id)
  }, schema.examples.concat(schema["default"] && !schema.examples.includes(schema["default"]) ? [schema["default"]] : []).map(function (example) {
    return /*#__PURE__*/React.createElement("option", {
      key: example,
      value: example
    });
  })));
}

/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
function DescriptionField(props) {
  var id = props.id,
    description = props.description;
  if (!description) {
    return null;
  }
  return /*#__PURE__*/React.createElement("p", {
    id: id,
    className: "sui-description"
  }, description);
}

/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
function ErrorList(_ref) {
  var errors = _ref.errors;
  return /*#__PURE__*/React.createElement(Message, {
    negative: true
  }, /*#__PURE__*/React.createElement(Message.Header, null, "Errors"), /*#__PURE__*/React.createElement(Message.List, null, errors.map(function (error, index) {
    return /*#__PURE__*/React.createElement(Message.Item, {
      key: "error-" + index
    }, error.stack);
  })));
}

var _excluded$1 = ["icon", "iconType", "color", "className", "uiSchema", "registry"];
function IconButton(props) {
  var icon = props.icon,
    iconType = props.iconType,
    color = props.color,
    className = props.className,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded$1);
  return /*#__PURE__*/React.createElement(Button, _extends({
    icon: icon,
    size: iconType,
    color: color,
    className: className
  }, otherProps));
}
function MoveDownButton(props) {
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    title: "Move down"
  }, props, {
    icon: "angle down"
  }));
}
function MoveUpButton(props) {
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    title: "Move up"
  }, props, {
    icon: "angle up"
  }));
}
function RemoveButton(props) {
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    title: "Remove"
  }, props, {
    icon: "trash"
  }));
}

var DEFAULT_OPTIONS$1 = {
  options: {
    pointing: "above",
    size: "small"
  }
};
/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
function FieldErrorTemplate(_ref) {
  var errors = _ref.errors,
    idSchema = _ref.idSchema,
    uiSchema = _ref.uiSchema,
    registry = _ref.registry;
  var formContext = registry.formContext;
  var options = getSemanticErrorProps({
    formContext: formContext,
    uiSchema: uiSchema,
    defaultProps: DEFAULT_OPTIONS$1
  });
  var pointing = options.pointing,
    size = options.size;
  if (errors && errors.length > 0) {
    var id = idSchema.$id + "__error";
    return /*#__PURE__*/React.createElement(Label, {
      id: id,
      color: "red",
      pointing: pointing || "above",
      size: size || "small",
      basic: true
    }, /*#__PURE__*/React.createElement(List, {
      bulleted: true
    }, errors.map(function (error) {
      return /*#__PURE__*/React.createElement(List.Item, {
        key: nanoid()
      }, error);
    })));
  }
  return null;
}

/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
function FieldHelpTemplate(props) {
  var idSchema = props.idSchema,
    help = props.help;
  if (help) {
    var id = idSchema.$id + "__help";
    return /*#__PURE__*/React.createElement(Message, {
      size: "mini",
      info: true,
      id: id,
      content: help
    });
  }
  return null;
}

var _excluded = ["id", "children", "classNames", "style", "displayLabel", "label", "errors", "help", "hidden", "rawDescription", "registry", "schema", "uiSchema"];
/** The `FieldTemplate` component is the template used by `SchemaField` to render any field. It renders the field
 * content, (label, description, children, errors and help) inside of a `WrapIfAdditional` component.
 *
 * @param props - The `FieldTemplateProps` for this component
 */
function FieldTemplate(props) {
  var id = props.id,
    children = props.children,
    classNames = props.classNames,
    style = props.style,
    displayLabel = props.displayLabel,
    label = props.label,
    errors = props.errors,
    help = props.help,
    hidden = props.hidden,
    rawDescription = props.rawDescription,
    registry = props.registry,
    schema = props.schema,
    uiSchema = props.uiSchema,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  var semanticProps = getSemanticProps(otherProps);
  var wrapLabel = semanticProps.wrapLabel,
    wrapContent = semanticProps.wrapContent;
  var uiOptions = getUiOptions(uiSchema);
  var WrapIfAdditionalTemplate = getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
  var DescriptionFieldTemplate = getTemplate("DescriptionFieldTemplate", registry, uiOptions);
  if (hidden) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "none"
      }
    }, children);
  }
  return /*#__PURE__*/React.createElement(WrapIfAdditionalTemplate, _extends({
    classNames: classNames,
    style: style,
    id: id,
    label: label,
    registry: registry,
    schema: schema,
    uiSchema: uiSchema
  }, otherProps), /*#__PURE__*/React.createElement(Form.Group, {
    key: id,
    widths: "equal",
    grouped: true
  }, /*#__PURE__*/React.createElement(MaybeWrap, {
    wrap: wrapContent,
    className: "sui-field-content"
  }, children, displayLabel && rawDescription && /*#__PURE__*/React.createElement(MaybeWrap, {
    wrap: wrapLabel,
    className: "sui-field-label"
  }, rawDescription && /*#__PURE__*/React.createElement(DescriptionFieldTemplate, {
    id: descriptionId(id),
    description: rawDescription,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  })), help, errors)));
}

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
function ObjectFieldTemplate(props) {
  var description = props.description,
    onAddClick = props.onAddClick,
    title = props.title,
    properties = props.properties,
    disabled = props.disabled,
    readonly = props.readonly,
    required = props.required,
    uiSchema = props.uiSchema,
    schema = props.schema,
    formData = props.formData,
    idSchema = props.idSchema,
    registry = props.registry;
  var uiOptions = getUiOptions(uiSchema);
  var TitleFieldTemplate = getTemplate("TitleFieldTemplate", registry, uiOptions);
  var DescriptionFieldTemplate = getTemplate("DescriptionFieldTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  var fieldTitle = uiOptions.title || title;
  var fieldDescription = uiOptions.description || description;
  return /*#__PURE__*/React.createElement(React.Fragment, null, fieldTitle && /*#__PURE__*/React.createElement(TitleFieldTemplate, {
    id: titleId(idSchema),
    title: fieldTitle,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), fieldDescription && /*#__PURE__*/React.createElement(DescriptionFieldTemplate, {
    id: descriptionId(idSchema),
    description: fieldDescription,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), properties.map(function (prop) {
    return prop.content;
  }), canExpand(schema, uiSchema, formData) && /*#__PURE__*/React.createElement(Grid.Column, {
    width: 16,
    verticalAlign: "middle"
  }, /*#__PURE__*/React.createElement(Grid.Row, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1rem",
      position: "relative",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement(AddButton, {
    onClick: onAddClick(schema),
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  })))));
}

/** The `SubmitButton` renders a button that represent the `Submit` action on a form
 */
function SubmitButton(_ref) {
  var uiSchema = _ref.uiSchema;
  var _getSubmitButtonOptio = getSubmitButtonOptions(uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    _getSubmitButtonOptio2 = _getSubmitButtonOptio.props,
    submitButtonProps = _getSubmitButtonOptio2 === void 0 ? {} : _getSubmitButtonOptio2;
  if (norender) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Button, _extends({
    type: "submit",
    primary: true
  }, submitButtonProps), submitText);
}

var DEFAULT_OPTIONS = {
  inverted: false,
  dividing: true
};
/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
function TitleField(_ref) {
  var id = _ref.id,
    title = _ref.title,
    uiSchema = _ref.uiSchema;
  var semanticProps = getSemanticProps({
    uiSchema: uiSchema,
    defaultSchemaProps: DEFAULT_OPTIONS
  });
  if (!title) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Header, _extends({
    id: id
  }, semanticProps, {
    as: "h5"
  }), title);
}

/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
function WrapIfAdditionalTemplate(props) {
  var children = props.children,
    classNames = props.classNames,
    style = props.style,
    disabled = props.disabled,
    id = props.id,
    label = props.label,
    onDropPropertyClick = props.onDropPropertyClick,
    onKeyChange = props.onKeyChange,
    readonly = props.readonly,
    required = props.required,
    schema = props.schema,
    uiSchema = props.uiSchema,
    registry = props.registry;
  // Button templates are not overridden in the uiSchema
  var RemoveButton = registry.templates.ButtonTemplates.RemoveButton;
  var _registry$formContext = registry.formContext,
    _registry$formContext2 = _registry$formContext.readonlyAsDisabled,
    readonlyAsDisabled = _registry$formContext2 === void 0 ? true : _registry$formContext2,
    wrapperStyle = _registry$formContext.wrapperStyle;
  var keyLabel = label + " Key"; // i18n ?
  var additional = (ADDITIONAL_PROPERTY_FLAG in schema);
  if (!additional) {
    return /*#__PURE__*/React.createElement("div", {
      className: classNames,
      style: style
    }, children);
  }
  var handleBlur = function handleBlur(_ref) {
    var target = _ref.target;
    return onKeyChange(target.value);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classNames,
    style: style,
    key: id + "-key"
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: "equal"
  }, /*#__PURE__*/React.createElement(Grid.Row, null, /*#__PURE__*/React.createElement(Grid.Column, {
    className: "form-additional"
  }, /*#__PURE__*/React.createElement(Form.Group, {
    widths: "equal",
    grouped: true
  }, /*#__PURE__*/React.createElement(Form.Input, {
    className: "form-group",
    hasFeedback: true,
    fluid: true,
    htmlFor: "" + id,
    label: keyLabel,
    required: required,
    defaultValue: label,
    disabled: disabled || readonlyAsDisabled && readonly,
    id: "" + id,
    name: "" + id,
    onBlur: !readonly ? handleBlur : undefined,
    style: wrapperStyle,
    type: "text"
  }))), /*#__PURE__*/React.createElement(Grid.Column, {
    className: "form-additional",
    verticalAlign: "middle"
  }, children), /*#__PURE__*/React.createElement(Grid.Column, null, /*#__PURE__*/React.createElement(RemoveButton, {
    iconType: "mini",
    className: "array-item-remove",
    disabled: disabled || readonly,
    onClick: onDropPropertyClick(label),
    uiSchema: uiSchema,
    registry: registry
  })))));
}

function generateTemplates() {
  return {
    ArrayFieldItemTemplate: ArrayFieldItemTemplate,
    ArrayFieldTemplate: ArrayFieldTemplate,
    BaseInputTemplate: BaseInputTemplate,
    ButtonTemplates: {
      AddButton: AddButton,
      MoveDownButton: MoveDownButton,
      MoveUpButton: MoveUpButton,
      RemoveButton: RemoveButton,
      SubmitButton: SubmitButton
    },
    DescriptionFieldTemplate: DescriptionField,
    ErrorListTemplate: ErrorList,
    FieldErrorTemplate: FieldErrorTemplate,
    FieldHelpTemplate: FieldHelpTemplate,
    FieldTemplate: FieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate,
    TitleFieldTemplate: TitleField,
    WrapIfAdditionalTemplate: WrapIfAdditionalTemplate
  };
}
var Templates = /*#__PURE__*/generateTemplates();

/** The `CheckBoxWidget` is a widget for rendering boolean properties.
 *  It is typically used to represent a boolean.
 *
 * @param props - The `WidgetProps` for this component
 */
function CheckboxWidget(props) {
  var id = props.id,
    value = props.value,
    disabled = props.disabled,
    readonly = props.readonly,
    label = props.label,
    autofocus = props.autofocus,
    onChange = props.onChange,
    onBlur = props.onBlur,
    options = props.options,
    onFocus = props.onFocus,
    formContext = props.formContext,
    schema = props.schema,
    uiSchema = props.uiSchema,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors;
  var semanticProps = getSemanticProps({
    options: options,
    formContext: formContext,
    uiSchema: uiSchema,
    defaultSchemaProps: {
      inverted: false
    }
  });
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  var required = schemaRequiresTrueValue(schema);
  var _onChange = function _onChange(_, data) {
    return onChange && onChange(data.checked);
  };
  var _onBlur = function _onBlur() {
    return onBlur && onBlur(id, value);
  };
  var _onFocus = function _onFocus() {
    return onFocus && onFocus(id, value);
  };
  var checked = value == "true" || value == true;
  return /*#__PURE__*/React.createElement(Form.Checkbox, _extends({
    id: id,
    name: id,
    disabled: disabled || readonly,
    autoFocus: autofocus
  }, semanticProps, {
    checked: typeof value === "undefined" ? false : checked,
    error: rawErrors.length > 0,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    required: required,
    label: label || "",
    "aria-describedby": ariaDescribedByIds(id)
  }));
}

/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
function CheckboxesWidget(props) {
  var id = props.id,
    disabled = props.disabled,
    options = props.options,
    value = props.value,
    autofocus = props.autofocus,
    readonly = props.readonly,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    formContext = props.formContext,
    schema = props.schema,
    uiSchema = props.uiSchema,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors,
    registry = props.registry;
  var TitleFieldTemplate = getTemplate("TitleFieldTemplate", registry, options);
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    inline = options.inline;
  var checkboxesValues = Array.isArray(value) ? value : [value];
  var title = schema.title;
  var semanticProps = getSemanticProps({
    options: options,
    formContext: formContext,
    uiSchema: uiSchema,
    defaultSchemaProps: {
      inverted: false
    }
  });
  var _onChange = function _onChange(index) {
    return function (_ref) {
      var checked = _ref.target.checked;
      // eslint-disable-next-line no-shadow
      if (checked) {
        onChange(enumOptionsSelectValue(index, checkboxesValues, enumOptions));
      } else {
        onChange(enumOptionsDeselectValue(index, checkboxesValues, enumOptions));
      }
    };
  };
  var _onBlur = function _onBlur() {
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus() {
    return onFocus(id, value);
  };
  var inlineOption = inline ? {
    inline: true
  } : {
    grouped: true
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, title && /*#__PURE__*/React.createElement(TitleFieldTemplate, {
    id: titleId(id),
    title: title,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), /*#__PURE__*/React.createElement(Form.Group, _extends({
    id: id,
    name: id
  }, inlineOption), Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var checked = enumOptionsIsSelected(option.value, checkboxesValues);
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    return /*#__PURE__*/React.createElement(Form.Checkbox, _extends({
      id: optionId(id, index),
      name: id,
      key: index,
      label: option.label
    }, semanticProps, {
      checked: checked,
      error: rawErrors.length > 0,
      disabled: disabled || itemDisabled || readonly,
      autoFocus: autofocus && index === 0,
      onChange: _onChange(index),
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": ariaDescribedByIds(id)
    }));
  })));
}

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function RadioWidget(props) {
  var id = props.id,
    value = props.value,
    required = props.required,
    disabled = props.disabled,
    readonly = props.readonly,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    options = props.options,
    formContext = props.formContext,
    uiSchema = props.uiSchema,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var semanticProps = getSemanticProps({
    formContext: formContext,
    options: options,
    uiSchema: uiSchema
  });
  var _onChange = function _onChange(_, _ref) {
    var eventValue = _ref.value;
    return onChange(enumOptionsValueForIndex(eventValue, enumOptions, emptyValue));
  };
  var _onBlur = function _onBlur() {
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus() {
    return onFocus(id, value);
  };
  var inlineOption = options.inline ? {
    inline: true
  } : {
    grouped: true
  };
  return /*#__PURE__*/React.createElement(Form.Group, _extends({}, inlineOption), Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var checked = enumOptionsIsSelected(option.value, value);
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    return /*#__PURE__*/React.createElement(Form.Field, _extends({
      required: required,
      control: Radio,
      id: optionId(id, index),
      name: id
    }, semanticProps, {
      onFocus: _onFocus,
      onBlur: _onBlur,
      onChange: _onChange,
      label: option.label,
      value: String(index),
      error: rawErrors.length > 0,
      key: index,
      checked: checked,
      disabled: disabled || itemDisabled || readonly,
      "aria-describedby": ariaDescribedByIds(id)
    }));
  }));
}

/** The `RangeWidget` component uses the `BaseInputTemplate` changing the type to `range` and wrapping the result
 * in a div, with the value along side it.
 *
 * @param props - The `WidgetProps` for this component
 */
function RangeWidget(props) {
  var id = props.id,
    value = props.value,
    required = props.required,
    readonly = props.readonly,
    disabled = props.disabled,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    options = props.options,
    schema = props.schema,
    uiSchema = props.uiSchema,
    formContext = props.formContext,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors;
  var semanticProps = getSemanticProps({
    formContext: formContext,
    options: options,
    uiSchema: uiSchema,
    defaultSchemaProps: {
      fluid: true
    }
  });
  // eslint-disable-next-line no-shadow
  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return onChange && onChange(value === "" ? options.emptyValue : value);
  };
  var _onBlur = function _onBlur() {
    return onBlur && onBlur(id, value);
  };
  var _onFocus = function _onFocus() {
    return onFocus && onFocus(id, value);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, _extends({
    id: id,
    key: id,
    name: id,
    type: "range",
    required: required,
    disabled: disabled || readonly
  }, rangeSpec(schema), semanticProps, {
    value: value || "",
    error: rawErrors.length > 0,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  })), /*#__PURE__*/React.createElement("span", null, value));
}

/**
 * Returns and creates an array format required for semantic drop down
 * @param {array} enumOptions- array of items for the dropdown
 * @param {array} enumDisabled - array of enum option values to disable
 * @returns {*}
 */
function createDefaultValueOptionsForDropDown(enumOptions, enumDisabled) {
  var disabledOptions = enumDisabled || [];
  var options = map(enumOptions, function (_ref, index) {
    var label = _ref.label,
      value = _ref.value;
    return {
      disabled: disabledOptions.indexOf(value) !== -1,
      key: label,
      text: label,
      value: String(index)
    };
  });
  return options;
}
/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function SelectWidget(props) {
  var schema = props.schema,
    uiSchema = props.uiSchema,
    formContext = props.formContext,
    id = props.id,
    options = props.options,
    label = props.label,
    required = props.required,
    disabled = props.disabled,
    readonly = props.readonly,
    value = props.value,
    multiple = props.multiple,
    placeholder = props.placeholder,
    autofocus = props.autofocus,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors;
  var semanticProps = getSemanticProps({
    uiSchema: uiSchema,
    formContext: formContext,
    options: options,
    defaultSchemaProps: {
      inverted: "false",
      selection: true,
      fluid: true,
      scrolling: true,
      upward: false
    }
  });
  var enumDisabled = options.enumDisabled,
    enumOptions = options.enumOptions,
    optEmptyVal = options.emptyValue;
  var emptyValue = multiple ? [] : "";
  var dropdownOptions = createDefaultValueOptionsForDropDown(enumOptions, enumDisabled);
  var _onChange = function _onChange(_, _ref2) {
    var value = _ref2.value;
    return onChange(enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  // eslint-disable-next-line no-shadow
  var _onBlur = function _onBlur(_, _ref3) {
    var value = _ref3.target.value;
    return onBlur(id, enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  var _onFocus = function _onFocus(_, _ref4) {
    var value = _ref4.target.value;
    return onFocus(id, enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  var selectedIndexes = enumOptionsIndexForValue(value, enumOptions, multiple);
  return /*#__PURE__*/React.createElement(Form.Dropdown, _extends({
    key: id,
    id: id,
    name: id,
    label: label || schema.title,
    multiple: typeof multiple === "undefined" ? false : multiple,
    value: typeof value === "undefined" ? emptyValue : selectedIndexes,
    error: rawErrors.length > 0,
    disabled: disabled,
    placeholder: placeholder
  }, semanticProps, {
    required: required,
    autoFocus: autofocus,
    readOnly: readonly,
    options: dropdownOptions,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  }));
}

/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
function TextareaWidget(props) {
  var id = props.id,
    placeholder = props.placeholder,
    value = props.value,
    required = props.required,
    disabled = props.disabled,
    autofocus = props.autofocus,
    label = props.label,
    readonly = props.readonly,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    onChange = props.onChange,
    options = props.options,
    schema = props.schema,
    uiSchema = props.uiSchema,
    formContext = props.formContext,
    registry = props.registry,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors;
  var semanticProps = getSemanticProps({
    formContext: formContext,
    options: options,
    defaultSchemaProps: {
      inverted: false
    }
  });
  var schemaUtils = registry.schemaUtils;
  // eslint-disable-next-line no-shadow
  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return onChange && onChange(value === "" ? options.emptyValue : value);
  };
  var _onBlur = function _onBlur() {
    return onBlur && onBlur(id, value);
  };
  var _onFocus = function _onFocus() {
    return onFocus && onFocus(id, value);
  };
  var displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema);
  return /*#__PURE__*/React.createElement(Form.TextArea, _extends({
    id: id,
    key: id,
    name: id,
    label: displayLabel ? label || schema.title : false,
    placeholder: placeholder,
    autoFocus: autofocus,
    required: required,
    disabled: disabled || readonly
  }, semanticProps, {
    value: value || "",
    error: rawErrors.length > 0,
    rows: options.rows || 5,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  }));
}

function generateWidgets() {
  return {
    CheckboxWidget: CheckboxWidget,
    CheckboxesWidget: CheckboxesWidget,
    RadioWidget: RadioWidget,
    RangeWidget: RangeWidget,
    SelectWidget: SelectWidget,
    TextareaWidget: TextareaWidget
  };
}
var Widgets = /*#__PURE__*/generateWidgets();

function generateTheme() {
  return {
    templates: generateTemplates(),
    widgets: generateWidgets(),
    _internalFormWrapper: Form
  };
}
var Theme = /*#__PURE__*/generateTheme();

function generateForm() {
  return withTheme(generateTheme());
}
var SemanticUIForm = /*#__PURE__*/generateForm();

export { SemanticUIForm as Form, Templates, Theme, Widgets, SemanticUIForm as default, generateForm, generateTemplates, generateTheme, generateWidgets };
//# sourceMappingURL=semantic-ui.esm.js.map
