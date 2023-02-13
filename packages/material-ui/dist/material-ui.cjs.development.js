'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@rjsf/core');
var React = require('react');
var AddIcon = require('@material-ui/icons/Add');
var IconButton = require('@material-ui/core/IconButton');
var Box = require('@material-ui/core/Box');
var Grid = require('@material-ui/core/Grid');
var Paper = require('@material-ui/core/Paper');
var utils = require('@rjsf/utils');
var TextField = require('@material-ui/core/TextField');
var Typography = require('@material-ui/core/Typography');
var ErrorIcon = require('@material-ui/icons/Error');
var List = require('@material-ui/core/List');
var ListItem = require('@material-ui/core/ListItem');
var ListItemIcon = require('@material-ui/core/ListItemIcon');
var ListItemText = require('@material-ui/core/ListItemText');
var ArrowUpwardIcon = require('@material-ui/icons/ArrowUpward');
var ArrowDownwardIcon = require('@material-ui/icons/ArrowDownward');
var RemoveIcon = require('@material-ui/icons/Remove');
var FormHelperText = require('@material-ui/core/FormHelperText');
var FormControl = require('@material-ui/core/FormControl');
var Button = require('@material-ui/core/Button');
var Divider = require('@material-ui/core/Divider');
var InputLabel = require('@material-ui/core/InputLabel');
var Input = require('@material-ui/core/Input');
var Checkbox = require('@material-ui/core/Checkbox');
var FormControlLabel = require('@material-ui/core/FormControlLabel');
var FormGroup = require('@material-ui/core/FormGroup');
var FormLabel = require('@material-ui/core/FormLabel');
var Radio = require('@material-ui/core/Radio');
var RadioGroup = require('@material-ui/core/RadioGroup');
var Slider = require('@material-ui/core/Slider');
var MenuItem = require('@material-ui/core/MenuItem');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var AddIcon__default = /*#__PURE__*/_interopDefaultLegacy(AddIcon);
var IconButton__default = /*#__PURE__*/_interopDefaultLegacy(IconButton);
var Box__default = /*#__PURE__*/_interopDefaultLegacy(Box);
var Grid__default = /*#__PURE__*/_interopDefaultLegacy(Grid);
var Paper__default = /*#__PURE__*/_interopDefaultLegacy(Paper);
var TextField__default = /*#__PURE__*/_interopDefaultLegacy(TextField);
var Typography__default = /*#__PURE__*/_interopDefaultLegacy(Typography);
var ErrorIcon__default = /*#__PURE__*/_interopDefaultLegacy(ErrorIcon);
var List__default = /*#__PURE__*/_interopDefaultLegacy(List);
var ListItem__default = /*#__PURE__*/_interopDefaultLegacy(ListItem);
var ListItemIcon__default = /*#__PURE__*/_interopDefaultLegacy(ListItemIcon);
var ListItemText__default = /*#__PURE__*/_interopDefaultLegacy(ListItemText);
var ArrowUpwardIcon__default = /*#__PURE__*/_interopDefaultLegacy(ArrowUpwardIcon);
var ArrowDownwardIcon__default = /*#__PURE__*/_interopDefaultLegacy(ArrowDownwardIcon);
var RemoveIcon__default = /*#__PURE__*/_interopDefaultLegacy(RemoveIcon);
var FormHelperText__default = /*#__PURE__*/_interopDefaultLegacy(FormHelperText);
var FormControl__default = /*#__PURE__*/_interopDefaultLegacy(FormControl);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var Divider__default = /*#__PURE__*/_interopDefaultLegacy(Divider);
var InputLabel__default = /*#__PURE__*/_interopDefaultLegacy(InputLabel);
var Input__default = /*#__PURE__*/_interopDefaultLegacy(Input);
var Checkbox__default = /*#__PURE__*/_interopDefaultLegacy(Checkbox);
var FormControlLabel__default = /*#__PURE__*/_interopDefaultLegacy(FormControlLabel);
var FormGroup__default = /*#__PURE__*/_interopDefaultLegacy(FormGroup);
var FormLabel__default = /*#__PURE__*/_interopDefaultLegacy(FormLabel);
var Radio__default = /*#__PURE__*/_interopDefaultLegacy(Radio);
var RadioGroup__default = /*#__PURE__*/_interopDefaultLegacy(RadioGroup);
var Slider__default = /*#__PURE__*/_interopDefaultLegacy(Slider);
var MenuItem__default = /*#__PURE__*/_interopDefaultLegacy(MenuItem);

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

var _excluded$4 = ["uiSchema", "registry"];
/** The `AddButton` renders a button that represent the `Add` action on a form
 */
function AddButton(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  return /*#__PURE__*/React__default["default"].createElement(IconButton__default["default"], _extends({
    title: "Add Item"
  }, props, {
    color: "primary"
  }), /*#__PURE__*/React__default["default"].createElement(AddIcon__default["default"], null));
}

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
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
    minWidth: 0
  };
  return /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    container: true,
    alignItems: "center"
  }, /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    item: true,
    xs: true,
    style: {
      overflow: "auto"
    }
  }, /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
    mb: 2
  }, /*#__PURE__*/React__default["default"].createElement(Paper__default["default"], {
    elevation: 2
  }, /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
    p: 2
  }, children)))), hasToolbar && /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    item: true
  }, (hasMoveUp || hasMoveDown) && /*#__PURE__*/React__default["default"].createElement(MoveUpButton, {
    style: btnStyle,
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onReorderClick(index, index - 1),
    uiSchema: uiSchema,
    registry: registry
  }), (hasMoveUp || hasMoveDown) && /*#__PURE__*/React__default["default"].createElement(MoveDownButton, {
    style: btnStyle,
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onReorderClick(index, index + 1),
    uiSchema: uiSchema,
    registry: registry
  }), hasRemove && /*#__PURE__*/React__default["default"].createElement(RemoveButton, {
    style: btnStyle,
    disabled: disabled || readonly,
    onClick: onDropIndexClick(index),
    uiSchema: uiSchema,
    registry: registry
  })));
}

var _excluded$3 = ["key"];
/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldTemplate(props) {
  var canAdd = props.canAdd,
    disabled = props.disabled,
    idSchema = props.idSchema,
    uiSchema = props.uiSchema,
    items = props.items,
    onAddClick = props.onAddClick,
    readonly = props.readonly,
    registry = props.registry,
    required = props.required,
    schema = props.schema,
    title = props.title;
  var uiOptions = utils.getUiOptions(uiSchema);
  var ArrayFieldDescriptionTemplate = utils.getTemplate("ArrayFieldDescriptionTemplate", registry, uiOptions);
  var ArrayFieldItemTemplate = utils.getTemplate("ArrayFieldItemTemplate", registry, uiOptions);
  var ArrayFieldTitleTemplate = utils.getTemplate("ArrayFieldTitleTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  return /*#__PURE__*/React__default["default"].createElement(Paper__default["default"], {
    elevation: 2
  }, /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
    p: 2
  }, /*#__PURE__*/React__default["default"].createElement(ArrayFieldTitleTemplate, {
    idSchema: idSchema,
    title: uiOptions.title || title,
    schema: schema,
    uiSchema: uiSchema,
    required: required,
    registry: registry
  }), /*#__PURE__*/React__default["default"].createElement(ArrayFieldDescriptionTemplate, {
    idSchema: idSchema,
    description: uiOptions.description || schema.description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    container: true,
    key: "array-item-list-" + idSchema.$id
  }, items && items.map(function (_ref) {
    var key = _ref.key,
      itemProps = _objectWithoutPropertiesLoose(_ref, _excluded$3);
    return /*#__PURE__*/React__default["default"].createElement(ArrayFieldItemTemplate, _extends({
      key: key
    }, itemProps));
  }), canAdd && /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    container: true,
    justifyContent: "flex-end"
  }, /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
    mt: 2
  }, /*#__PURE__*/React__default["default"].createElement(AddButton, {
    className: "array-item-add",
    onClick: onAddClick,
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  })))))));
}

var _excluded$2 = ["id", "placeholder", "required", "readonly", "disabled", "type", "label", "value", "onChange", "onBlur", "onFocus", "autofocus", "options", "schema", "uiSchema", "rawErrors", "formContext", "registry"],
  _excluded2$1 = ["step", "min", "max"];
/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
function BaseInputTemplate(props) {
  var id = props.id,
    placeholder = props.placeholder,
    required = props.required,
    readonly = props.readonly,
    disabled = props.disabled,
    type = props.type,
    label = props.label,
    value = props.value,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    autofocus = props.autofocus,
    options = props.options,
    schema = props.schema,
    uiSchema = props.uiSchema,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors,
    registry = props.registry,
    textFieldProps = _objectWithoutPropertiesLoose(props, _excluded$2);
  var inputProps = utils.getInputProps(schema, type, options);
  // Now we need to pull out the step, min, max into an inner `inputProps` for material-ui
  var step = inputProps.step,
    min = inputProps.min,
    max = inputProps.max,
    rest = _objectWithoutPropertiesLoose(inputProps, _excluded2$1);
  var otherProps = _extends({
    inputProps: _extends({
      step: step,
      min: min,
      max: max
    }, schema.examples ? {
      list: utils.examplesId(id)
    } : undefined)
  }, rest);
  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return onChange(value === "" ? options.emptyValue : value);
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, value);
  };
  var schemaUtils = registry.schemaUtils;
  var displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(TextField__default["default"], _extends({
    id: id,
    name: id,
    placeholder: placeholder,
    label: displayLabel ? label || schema.title : false,
    autoFocus: autofocus,
    required: required,
    disabled: disabled || readonly
  }, otherProps, {
    value: value || value === 0 ? value : "",
    error: rawErrors.length > 0,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus
  }, textFieldProps, {
    "aria-describedby": utils.ariaDescribedByIds(id, !!schema.examples)
  })), Array.isArray(schema.examples) && /*#__PURE__*/React__default["default"].createElement("datalist", {
    id: utils.examplesId(id)
  }, schema.examples.concat(schema["default"] && !schema.examples.includes(schema["default"]) ? [schema["default"]] : []).map(function (example) {
    return /*#__PURE__*/React__default["default"].createElement("option", {
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
  if (description) {
    return /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
      id: id,
      variant: "subtitle2",
      style: {
        marginTop: "5px"
      }
    }, description);
  }
  return null;
}

/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
function ErrorList(_ref) {
  var errors = _ref.errors;
  return /*#__PURE__*/React__default["default"].createElement(Paper__default["default"], {
    elevation: 2
  }, /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
    mb: 2,
    p: 2
  }, /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
    variant: "h6"
  }, "Errors"), /*#__PURE__*/React__default["default"].createElement(List__default["default"], {
    dense: true
  }, errors.map(function (error, i) {
    return /*#__PURE__*/React__default["default"].createElement(ListItem__default["default"], {
      key: i
    }, /*#__PURE__*/React__default["default"].createElement(ListItemIcon__default["default"], null, /*#__PURE__*/React__default["default"].createElement(ErrorIcon__default["default"], {
      color: "error"
    })), /*#__PURE__*/React__default["default"].createElement(ListItemText__default["default"], {
      primary: error.stack
    }));
  }))));
}

var _excluded$1 = ["icon", "color", "uiSchema", "registry"],
  _excluded2 = ["iconType"];
function MuiIconButton(props) {
  var icon = props.icon,
    color = props.color,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded$1);
  return /*#__PURE__*/React__default["default"].createElement(IconButton__default["default"], _extends({}, otherProps, {
    size: "small",
    color: color
  }), icon);
}
function MoveDownButton(props) {
  return /*#__PURE__*/React__default["default"].createElement(MuiIconButton, _extends({
    title: "Move down"
  }, props, {
    icon: /*#__PURE__*/React__default["default"].createElement(ArrowDownwardIcon__default["default"], {
      fontSize: "small"
    })
  }));
}
function MoveUpButton(props) {
  return /*#__PURE__*/React__default["default"].createElement(MuiIconButton, _extends({
    title: "Move up"
  }, props, {
    icon: /*#__PURE__*/React__default["default"].createElement(ArrowUpwardIcon__default["default"], {
      fontSize: "small"
    })
  }));
}
function RemoveButton(props) {
  var iconType = props.iconType,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded2);
  return /*#__PURE__*/React__default["default"].createElement(MuiIconButton, _extends({
    title: "Remove"
  }, otherProps, {
    color: "secondary",
    icon: /*#__PURE__*/React__default["default"].createElement(RemoveIcon__default["default"], {
      fontSize: iconType === "default" ? "medium" : "small"
    })
  }));
}

/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
function FieldErrorTemplate(props) {
  var _props$errors = props.errors,
    errors = _props$errors === void 0 ? [] : _props$errors,
    idSchema = props.idSchema;
  if (errors.length === 0) {
    return null;
  }
  var id = utils.errorId(idSchema);
  return /*#__PURE__*/React__default["default"].createElement(List__default["default"], {
    dense: true,
    disablePadding: true
  }, errors.map(function (error, i) {
    return /*#__PURE__*/React__default["default"].createElement(ListItem__default["default"], {
      key: i,
      disableGutters: true
    }, /*#__PURE__*/React__default["default"].createElement(FormHelperText__default["default"], {
      id: id
    }, error));
  }));
}

/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
function FieldHelpTemplate(props) {
  var idSchema = props.idSchema,
    help = props.help;
  if (!help) {
    return null;
  }
  var id = utils.helpId(idSchema);
  return /*#__PURE__*/React__default["default"].createElement(FormHelperText__default["default"], {
    id: id
  }, help);
}

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
    disabled = props.disabled,
    displayLabel = props.displayLabel,
    hidden = props.hidden,
    label = props.label,
    onDropPropertyClick = props.onDropPropertyClick,
    onKeyChange = props.onKeyChange,
    readonly = props.readonly,
    required = props.required,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors,
    errors = props.errors,
    help = props.help,
    rawDescription = props.rawDescription,
    schema = props.schema,
    uiSchema = props.uiSchema,
    registry = props.registry;
  var uiOptions = utils.getUiOptions(uiSchema);
  var WrapIfAdditionalTemplate = utils.getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
  if (hidden) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        display: "none"
      }
    }, children);
  }
  return /*#__PURE__*/React__default["default"].createElement(WrapIfAdditionalTemplate, {
    classNames: classNames,
    style: style,
    disabled: disabled,
    id: id,
    label: label,
    onDropPropertyClick: onDropPropertyClick,
    onKeyChange: onKeyChange,
    readonly: readonly,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }, /*#__PURE__*/React__default["default"].createElement(FormControl__default["default"], {
    fullWidth: true,
    error: rawErrors.length ? true : false,
    required: required
  }, children, displayLabel && rawDescription ? /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
    variant: "caption",
    color: "textSecondary"
  }, rawDescription) : null, errors, help));
}

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
function ObjectFieldTemplate(props) {
  var description = props.description,
    title = props.title,
    properties = props.properties,
    required = props.required,
    disabled = props.disabled,
    readonly = props.readonly,
    uiSchema = props.uiSchema,
    idSchema = props.idSchema,
    schema = props.schema,
    formData = props.formData,
    onAddClick = props.onAddClick,
    registry = props.registry;
  var uiOptions = utils.getUiOptions(uiSchema);
  var TitleFieldTemplate = utils.getTemplate("TitleFieldTemplate", registry, uiOptions);
  var DescriptionFieldTemplate = utils.getTemplate("DescriptionFieldTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, (uiOptions.title || title) && /*#__PURE__*/React__default["default"].createElement(TitleFieldTemplate, {
    id: utils.titleId(idSchema),
    title: title,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), (uiOptions.description || description) && /*#__PURE__*/React__default["default"].createElement(DescriptionFieldTemplate, {
    id: utils.descriptionId(idSchema),
    description: uiOptions.description || description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    container: true,
    spacing: 2,
    style: {
      marginTop: "10px"
    }
  }, properties.map(function (element, index) {
    return (
      // Remove the <Grid> if the inner element is hidden as the <Grid>
      // itself would otherwise still take up space.
      element.hidden ? element.content : /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
        item: true,
        xs: 12,
        key: index,
        style: {
          marginBottom: "10px"
        }
      }, element.content)
    );
  }), utils.canExpand(schema, uiSchema, formData) && /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    container: true,
    justifyContent: "flex-end"
  }, /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(AddButton, {
    className: "object-property-expand",
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
  var _getSubmitButtonOptio = utils.getSubmitButtonOptions(uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    _getSubmitButtonOptio2 = _getSubmitButtonOptio.props,
    submitButtonProps = _getSubmitButtonOptio2 === void 0 ? {} : _getSubmitButtonOptio2;
  if (norender) {
    return null;
  }
  return /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
    marginTop: 3
  }, /*#__PURE__*/React__default["default"].createElement(Button__default["default"], _extends({
    type: "submit",
    variant: "contained",
    color: "primary"
  }, submitButtonProps), submitText));
}

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
function TitleField(_ref) {
  var id = _ref.id,
    title = _ref.title;
  return /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
    id: id,
    mb: 1,
    mt: 1
  }, /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
    variant: "h5"
  }, title), /*#__PURE__*/React__default["default"].createElement(Divider__default["default"], null));
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
  var keyLabel = label + " Key"; // i18n ?
  var additional = (utils.ADDITIONAL_PROPERTY_FLAG in schema);
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  if (!additional) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: classNames,
      style: style
    }, children);
  }
  var handleBlur = function handleBlur(_ref) {
    var target = _ref.target;
    return onKeyChange(target.value);
  };
  return /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    container: true,
    key: id + "-key",
    alignItems: "center",
    spacing: 2,
    className: classNames,
    style: style
  }, /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    item: true,
    xs: true
  }, /*#__PURE__*/React__default["default"].createElement(FormControl__default["default"], {
    fullWidth: true,
    required: required
  }, /*#__PURE__*/React__default["default"].createElement(InputLabel__default["default"], null, keyLabel), /*#__PURE__*/React__default["default"].createElement(Input__default["default"], {
    defaultValue: label,
    disabled: disabled || readonly,
    id: id + "-key",
    name: id + "-key",
    onBlur: !readonly ? handleBlur : undefined,
    type: "text"
  }))), /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    item: true,
    xs: true
  }, children), /*#__PURE__*/React__default["default"].createElement(Grid__default["default"], {
    item: true
  }, /*#__PURE__*/React__default["default"].createElement(RemoveButton, {
    iconType: "default",
    style: btnStyle,
    disabled: disabled || readonly,
    onClick: onDropPropertyClick(label),
    uiSchema: uiSchema,
    registry: registry
  })));
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
  var schema = props.schema,
    id = props.id,
    value = props.value,
    disabled = props.disabled,
    readonly = props.readonly,
    label = props.label,
    autofocus = props.autofocus,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus;
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  var required = utils.schemaRequiresTrueValue(schema);
  var _onChange = function _onChange(_, checked) {
    return onChange(checked);
  };
  var _onBlur = function _onBlur(_ref) {
    var value = _ref.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref2) {
    var value = _ref2.target.value;
    return onFocus(id, value);
  };
  return /*#__PURE__*/React__default["default"].createElement(FormControlLabel__default["default"], {
    control: /*#__PURE__*/React__default["default"].createElement(Checkbox__default["default"], {
      id: id,
      name: id,
      checked: typeof value === "undefined" ? false : Boolean(value),
      required: required,
      disabled: disabled || readonly,
      autoFocus: autofocus,
      onChange: _onChange,
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": utils.ariaDescribedByIds(id)
    }),
    label: label || ""
  });
}

/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
function CheckboxesWidget(_ref) {
  var schema = _ref.schema,
    label = _ref.label,
    id = _ref.id,
    disabled = _ref.disabled,
    options = _ref.options,
    value = _ref.value,
    autofocus = _ref.autofocus,
    readonly = _ref.readonly,
    required = _ref.required,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    inline = options.inline,
    emptyValue = options.emptyValue;
  var checkboxesValues = Array.isArray(value) ? value : [value];
  var _onChange = function _onChange(index) {
    return function (_ref2) {
      var checked = _ref2.target.checked;
      if (checked) {
        onChange(utils.enumOptionsSelectValue(index, checkboxesValues, enumOptions));
      } else {
        onChange(utils.enumOptionsDeselectValue(index, checkboxesValues, enumOptions));
      }
    };
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FormLabel__default["default"], {
    required: required,
    htmlFor: id
  }, label || schema.title), /*#__PURE__*/React__default["default"].createElement(FormGroup__default["default"], {
    id: id,
    row: !!inline
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var checked = utils.enumOptionsIsSelected(option.value, checkboxesValues);
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    var checkbox = /*#__PURE__*/React__default["default"].createElement(Checkbox__default["default"], {
      id: utils.optionId(id, index),
      name: id,
      checked: checked,
      disabled: disabled || itemDisabled || readonly,
      autoFocus: autofocus && index === 0,
      onChange: _onChange(index),
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": utils.ariaDescribedByIds(id)
    });
    return /*#__PURE__*/React__default["default"].createElement(FormControlLabel__default["default"], {
      control: checkbox,
      key: index,
      label: option.label
    });
  })));
}

/** The `DateWidget` component uses the `BaseInputTemplate` changing the type to `date` and transforms
 * the value to undefined when it is falsy during the `onChange` handling.
 *
 * @param props - The `WidgetProps` for this component
 */
function DateWidget(props) {
  var options = props.options,
    registry = props.registry;
  var BaseInputTemplate = utils.getTemplate("BaseInputTemplate", registry, options);
  return /*#__PURE__*/React__default["default"].createElement(BaseInputTemplate, _extends({
    type: "date",
    InputLabelProps: {
      shrink: true
    }
  }, props));
}

/** The `DateTimeWidget` component uses the `BaseInputTemplate` changing the type to `datetime-local` and transforms
 * the value to/from utc using the appropriate utility functions.
 *
 * @param props - The `WidgetProps` for this component
 */
function DateTimeWidget(props) {
  var options = props.options,
    registry = props.registry;
  var BaseInputTemplate = utils.getTemplate("BaseInputTemplate", registry, options);
  var value = utils.utcToLocal(props.value);
  var onChange = function onChange(value) {
    props.onChange(utils.localToUTC(value));
  };
  return /*#__PURE__*/React__default["default"].createElement(BaseInputTemplate, _extends({
    type: "datetime-local",
    InputLabelProps: {
      shrink: true
    }
  }, props, {
    value: value,
    onChange: onChange
  }));
}

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function RadioWidget(_ref) {
  var id = _ref.id,
    schema = _ref.schema,
    options = _ref.options,
    value = _ref.value,
    required = _ref.required,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    label = _ref.label,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var _onChange = function _onChange(_, value) {
    return onChange(utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var row = options ? options.inline : false;
  var selectedIndex = utils.enumOptionsIndexForValue(value, enumOptions);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FormLabel__default["default"], {
    required: required,
    htmlFor: id
  }, label || schema.title), /*#__PURE__*/React__default["default"].createElement(RadioGroup__default["default"], {
    id: id,
    name: id,
    value: selectedIndex,
    row: row,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": utils.ariaDescribedByIds(id)
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    var radio = /*#__PURE__*/React__default["default"].createElement(FormControlLabel__default["default"], {
      control: /*#__PURE__*/React__default["default"].createElement(Radio__default["default"], {
        name: id,
        id: utils.optionId(id, index),
        color: "primary"
      }),
      label: option.label,
      value: String(index),
      key: index,
      disabled: disabled || itemDisabled || readonly
    });
    return radio;
  })));
}

/** The `RangeWidget` component uses the `BaseInputTemplate` changing the type to `range` and wrapping the result
 * in a div, with the value along side it.
 *
 * @param props - The `WidgetProps` for this component
 */
function RangeWidget(props) {
  var value = props.value,
    readonly = props.readonly,
    disabled = props.disabled,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    options = props.options,
    schema = props.schema,
    onChange = props.onChange,
    required = props.required,
    label = props.label,
    id = props.id;
  var sliderProps = _extends({
    value: value,
    label: label,
    id: id,
    name: id
  }, utils.rangeSpec(schema));
  var _onChange = function _onChange(_, value) {
    onChange(value ? value : options.emptyValue);
  };
  var _onBlur = function _onBlur(_ref) {
    var value = _ref.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref2) {
    var value = _ref2.target.value;
    return onFocus(id, value);
  };
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FormLabel__default["default"], {
    required: required,
    htmlFor: id
  }, label || schema.title), /*#__PURE__*/React__default["default"].createElement(Slider__default["default"], _extends({
    disabled: disabled || readonly,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    valueLabelDisplay: "auto"
  }, sliderProps, {
    "aria-describedby": utils.ariaDescribedByIds(id)
  })));
}

var _excluded = ["schema", "id", "options", "label", "required", "disabled", "readonly", "placeholder", "value", "multiple", "autofocus", "onChange", "onBlur", "onFocus", "rawErrors", "registry", "uiSchema", "hideError", "formContext"];
/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function SelectWidget(_ref) {
  var schema = _ref.schema,
    id = _ref.id,
    options = _ref.options,
    label = _ref.label,
    required = _ref.required,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    placeholder = _ref.placeholder,
    value = _ref.value,
    multiple = _ref.multiple,
    autofocus = _ref.autofocus,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    _ref$rawErrors = _ref.rawErrors,
    rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors,
    textFieldProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    optEmptyVal = options.emptyValue;
  multiple = typeof multiple === "undefined" ? false : !!multiple;
  var emptyValue = multiple ? [] : "";
  var isEmpty = typeof value === "undefined" || multiple && value.length < 1 || !multiple && value === emptyValue;
  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(utils.enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, utils.enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, utils.enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  var selectedIndexes = utils.enumOptionsIndexForValue(value, enumOptions, multiple);
  return /*#__PURE__*/React__default["default"].createElement(TextField__default["default"], _extends({
    id: id,
    name: id,
    label: label || schema.title,
    value: isEmpty ? emptyValue : selectedIndexes,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    placeholder: placeholder,
    error: rawErrors.length > 0,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus
  }, textFieldProps, {
    select // Apply this and the following props after the potential overrides defined in textFieldProps
    : true,
    InputLabelProps: _extends({}, textFieldProps.InputLabelProps, {
      shrink: !isEmpty
    }),
    SelectProps: _extends({}, textFieldProps.SelectProps, {
      multiple: multiple
    }),
    "aria-describedby": utils.ariaDescribedByIds(id)
  }), Array.isArray(enumOptions) && enumOptions.map(function (_ref5, i) {
    var value = _ref5.value,
      label = _ref5.label;
    var disabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
    return /*#__PURE__*/React__default["default"].createElement(MenuItem__default["default"], {
      key: i,
      value: String(i),
      disabled: disabled
    }, label);
  }));
}

/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
function TextareaWidget(props) {
  var options = props.options,
    registry = props.registry;
  var BaseInputTemplate = utils.getTemplate("BaseInputTemplate", registry, options);
  var rows = 5;
  if (typeof options.rows === "string" || typeof options.rows === "number") {
    rows = options.rows;
  }
  return /*#__PURE__*/React__default["default"].createElement(BaseInputTemplate, _extends({}, props, {
    multiline: true,
    rows: rows
  }));
}

function generateWidgets() {
  return {
    CheckboxWidget: CheckboxWidget,
    CheckboxesWidget: CheckboxesWidget,
    DateWidget: DateWidget,
    DateTimeWidget: DateTimeWidget,
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
    widgets: generateWidgets()
  };
}
var Theme = /*#__PURE__*/generateTheme();

function generateForm() {
  return core.withTheme(generateTheme());
}
var MuiForm = /*#__PURE__*/generateForm();

exports.Form = MuiForm;
exports.Templates = Templates;
exports.Theme = Theme;
exports.Widgets = Widgets;
exports["default"] = MuiForm;
exports.generateForm = generateForm;
exports.generateTemplates = generateTemplates;
exports.generateTheme = generateTheme;
exports.generateWidgets = generateWidgets;
//# sourceMappingURL=material-ui.cjs.development.js.map
