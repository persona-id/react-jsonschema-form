import { withTheme } from '@rjsf/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getUiOptions, getTemplate, getInputProps, examplesId, ariaDescribedByIds, errorId, helpId, titleId, descriptionId, canExpand, getSubmitButtonOptions, ADDITIONAL_PROPERTY_FLAG, schemaRequiresTrueValue, enumOptionsIsSelected, optionId, enumOptionsSelectValue, enumOptionsDeselectValue, enumOptionsValueForIndex, utcToLocal, localToUTC, enumOptionsIndexForValue, rangeSpec } from '@rjsf/utils';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveIcon from '@material-ui/icons/Remove';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';

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
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    title: "Add Item"
  }, props, {
    color: "primary"
  }), /*#__PURE__*/React.createElement(AddIcon, null));
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
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    style: {
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement(Box, {
    mb: 2
  }, /*#__PURE__*/React.createElement(Paper, {
    elevation: 2
  }, /*#__PURE__*/React.createElement(Box, {
    p: 2
  }, children)))), hasToolbar && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, (hasMoveUp || hasMoveDown) && /*#__PURE__*/React.createElement(MoveUpButton, {
    style: btnStyle,
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onReorderClick(index, index - 1),
    uiSchema: uiSchema,
    registry: registry
  }), (hasMoveUp || hasMoveDown) && /*#__PURE__*/React.createElement(MoveDownButton, {
    style: btnStyle,
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onReorderClick(index, index + 1),
    uiSchema: uiSchema,
    registry: registry
  }), hasRemove && /*#__PURE__*/React.createElement(RemoveButton, {
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
  var uiOptions = getUiOptions(uiSchema);
  var ArrayFieldDescriptionTemplate = getTemplate("ArrayFieldDescriptionTemplate", registry, uiOptions);
  var ArrayFieldItemTemplate = getTemplate("ArrayFieldItemTemplate", registry, uiOptions);
  var ArrayFieldTitleTemplate = getTemplate("ArrayFieldTitleTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  return /*#__PURE__*/React.createElement(Paper, {
    elevation: 2
  }, /*#__PURE__*/React.createElement(Box, {
    p: 2
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
  }), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    key: "array-item-list-" + idSchema.$id
  }, items && items.map(function (_ref) {
    var key = _ref.key,
      itemProps = _objectWithoutPropertiesLoose(_ref, _excluded$3);
    return /*#__PURE__*/React.createElement(ArrayFieldItemTemplate, _extends({
      key: key
    }, itemProps));
  }), canAdd && /*#__PURE__*/React.createElement(Grid, {
    container: true,
    justifyContent: "flex-end"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Box, {
    mt: 2
  }, /*#__PURE__*/React.createElement(AddButton, {
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
  var inputProps = getInputProps(schema, type, options);
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
      list: examplesId(id)
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextField, _extends({
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
  if (description) {
    return /*#__PURE__*/React.createElement(Typography, {
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
  return /*#__PURE__*/React.createElement(Paper, {
    elevation: 2
  }, /*#__PURE__*/React.createElement(Box, {
    mb: 2,
    p: 2
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6"
  }, "Errors"), /*#__PURE__*/React.createElement(List, {
    dense: true
  }, errors.map(function (error, i) {
    return /*#__PURE__*/React.createElement(ListItem, {
      key: i
    }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(ErrorIcon, {
      color: "error"
    })), /*#__PURE__*/React.createElement(ListItemText, {
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
  return /*#__PURE__*/React.createElement(IconButton, _extends({}, otherProps, {
    size: "small",
    color: color
  }), icon);
}
function MoveDownButton(props) {
  return /*#__PURE__*/React.createElement(MuiIconButton, _extends({
    title: "Move down"
  }, props, {
    icon: /*#__PURE__*/React.createElement(ArrowDownwardIcon, {
      fontSize: "small"
    })
  }));
}
function MoveUpButton(props) {
  return /*#__PURE__*/React.createElement(MuiIconButton, _extends({
    title: "Move up"
  }, props, {
    icon: /*#__PURE__*/React.createElement(ArrowUpwardIcon, {
      fontSize: "small"
    })
  }));
}
function RemoveButton(props) {
  var iconType = props.iconType,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded2);
  return /*#__PURE__*/React.createElement(MuiIconButton, _extends({
    title: "Remove"
  }, otherProps, {
    color: "secondary",
    icon: /*#__PURE__*/React.createElement(RemoveIcon, {
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
  var id = errorId(idSchema);
  return /*#__PURE__*/React.createElement(List, {
    dense: true,
    disablePadding: true
  }, errors.map(function (error, i) {
    return /*#__PURE__*/React.createElement(ListItem, {
      key: i,
      disableGutters: true
    }, /*#__PURE__*/React.createElement(FormHelperText, {
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
  var id = helpId(idSchema);
  return /*#__PURE__*/React.createElement(FormHelperText, {
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
  var uiOptions = getUiOptions(uiSchema);
  var WrapIfAdditionalTemplate = getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
  if (hidden) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "none"
      }
    }, children);
  }
  return /*#__PURE__*/React.createElement(WrapIfAdditionalTemplate, {
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
  }, /*#__PURE__*/React.createElement(FormControl, {
    fullWidth: true,
    error: rawErrors.length ? true : false,
    required: required
  }, children, displayLabel && rawDescription ? /*#__PURE__*/React.createElement(Typography, {
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
  var uiOptions = getUiOptions(uiSchema);
  var TitleFieldTemplate = getTemplate("TitleFieldTemplate", registry, uiOptions);
  var DescriptionFieldTemplate = getTemplate("DescriptionFieldTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  return /*#__PURE__*/React.createElement(React.Fragment, null, (uiOptions.title || title) && /*#__PURE__*/React.createElement(TitleFieldTemplate, {
    id: titleId(idSchema),
    title: title,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), (uiOptions.description || description) && /*#__PURE__*/React.createElement(DescriptionFieldTemplate, {
    id: descriptionId(idSchema),
    description: uiOptions.description || description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 2,
    style: {
      marginTop: "10px"
    }
  }, properties.map(function (element, index) {
    return (
      // Remove the <Grid> if the inner element is hidden as the <Grid>
      // itself would otherwise still take up space.
      element.hidden ? element.content : /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12,
        key: index,
        style: {
          marginBottom: "10px"
        }
      }, element.content)
    );
  }), canExpand(schema, uiSchema, formData) && /*#__PURE__*/React.createElement(Grid, {
    container: true,
    justifyContent: "flex-end"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(AddButton, {
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
  var _getSubmitButtonOptio = getSubmitButtonOptions(uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    _getSubmitButtonOptio2 = _getSubmitButtonOptio.props,
    submitButtonProps = _getSubmitButtonOptio2 === void 0 ? {} : _getSubmitButtonOptio2;
  if (norender) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Box, {
    marginTop: 3
  }, /*#__PURE__*/React.createElement(Button, _extends({
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
  return /*#__PURE__*/React.createElement(Box, {
    id: id,
    mb: 1,
    mt: 1
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h5"
  }, title), /*#__PURE__*/React.createElement(Divider, null));
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
  var additional = (ADDITIONAL_PROPERTY_FLAG in schema);
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
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
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    key: id + "-key",
    alignItems: "center",
    spacing: 2,
    className: classNames,
    style: style
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(FormControl, {
    fullWidth: true,
    required: required
  }, /*#__PURE__*/React.createElement(InputLabel, null, keyLabel), /*#__PURE__*/React.createElement(Input, {
    defaultValue: label,
    disabled: disabled || readonly,
    id: id + "-key",
    name: id + "-key",
    onBlur: !readonly ? handleBlur : undefined,
    type: "text"
  }))), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, children), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(RemoveButton, {
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
  var required = schemaRequiresTrueValue(schema);
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
  return /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      id: id,
      name: id,
      checked: typeof value === "undefined" ? false : Boolean(value),
      required: required,
      disabled: disabled || readonly,
      autoFocus: autofocus,
      onChange: _onChange,
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": ariaDescribedByIds(id)
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
        onChange(enumOptionsSelectValue(index, checkboxesValues, enumOptions));
      } else {
        onChange(enumOptionsDeselectValue(index, checkboxesValues, enumOptions));
      }
    };
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormLabel, {
    required: required,
    htmlFor: id
  }, label || schema.title), /*#__PURE__*/React.createElement(FormGroup, {
    id: id,
    row: !!inline
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var checked = enumOptionsIsSelected(option.value, checkboxesValues);
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    var checkbox = /*#__PURE__*/React.createElement(Checkbox, {
      id: optionId(id, index),
      name: id,
      checked: checked,
      disabled: disabled || itemDisabled || readonly,
      autoFocus: autofocus && index === 0,
      onChange: _onChange(index),
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": ariaDescribedByIds(id)
    });
    return /*#__PURE__*/React.createElement(FormControlLabel, {
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
  var BaseInputTemplate = getTemplate("BaseInputTemplate", registry, options);
  return /*#__PURE__*/React.createElement(BaseInputTemplate, _extends({
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
  var BaseInputTemplate = getTemplate("BaseInputTemplate", registry, options);
  var value = utcToLocal(props.value);
  var onChange = function onChange(value) {
    props.onChange(localToUTC(value));
  };
  return /*#__PURE__*/React.createElement(BaseInputTemplate, _extends({
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
    return onChange(enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var row = options ? options.inline : false;
  var selectedIndex = enumOptionsIndexForValue(value, enumOptions);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormLabel, {
    required: required,
    htmlFor: id
  }, label || schema.title), /*#__PURE__*/React.createElement(RadioGroup, {
    id: id,
    name: id,
    value: selectedIndex,
    row: row,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    var radio = /*#__PURE__*/React.createElement(FormControlLabel, {
      control: /*#__PURE__*/React.createElement(Radio, {
        name: id,
        id: optionId(id, index),
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
  }, rangeSpec(schema));
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormLabel, {
    required: required,
    htmlFor: id
  }, label || schema.title), /*#__PURE__*/React.createElement(Slider, _extends({
    disabled: disabled || readonly,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    valueLabelDisplay: "auto"
  }, sliderProps, {
    "aria-describedby": ariaDescribedByIds(id)
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
    return onChange(enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, enumOptionsValueForIndex(value, enumOptions, optEmptyVal));
  };
  var selectedIndexes = enumOptionsIndexForValue(value, enumOptions, multiple);
  return /*#__PURE__*/React.createElement(TextField, _extends({
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
    "aria-describedby": ariaDescribedByIds(id)
  }), Array.isArray(enumOptions) && enumOptions.map(function (_ref5, i) {
    var value = _ref5.value,
      label = _ref5.label;
    var disabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
    return /*#__PURE__*/React.createElement(MenuItem, {
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
  var BaseInputTemplate = getTemplate("BaseInputTemplate", registry, options);
  var rows = 5;
  if (typeof options.rows === "string" || typeof options.rows === "number") {
    rows = options.rows;
  }
  return /*#__PURE__*/React.createElement(BaseInputTemplate, _extends({}, props, {
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
  return withTheme(generateTheme());
}
var MuiForm = /*#__PURE__*/generateForm();

export { MuiForm as Form, Templates, Theme, Widgets, MuiForm as default, generateForm, generateTemplates, generateTheme, generateWidgets };
//# sourceMappingURL=material-ui.esm.js.map
