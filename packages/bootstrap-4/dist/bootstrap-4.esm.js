import { withTheme } from '@rjsf/core';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { BsPlus } from '@react-icons/all-files/bs/BsPlus';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { getUiOptions, getTemplate, getInputProps, ariaDescribedByIds, examplesId, errorId, helpId, titleId, descriptionId, canExpand, getSubmitButtonOptions, ADDITIONAL_PROPERTY_FLAG, schemaRequiresTrueValue, enumOptionsIsSelected, optionId, enumOptionsSelectValue, enumOptionsDeselectValue, enumOptionsValueForIndex, enumOptionsIndexForValue } from '@rjsf/utils';
import Form$1 from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { IoIosRemove } from '@react-icons/all-files/io/IoIosRemove';
import { AiOutlineArrowUp } from '@react-icons/all-files/ai/AiOutlineArrowUp';
import { AiOutlineArrowDown } from '@react-icons/all-files/ai/AiOutlineArrowDown';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

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

var _excluded$2 = ["uiSchema", "registry"];
function AddButton(_ref) {
  var props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  return React.createElement(Button, _extends({}, props, {
    style: {
      width: "100%"
    },
    className: "ml-1 " + props.className,
    title: "Add Item"
  }), React.createElement(BsPlus, null));
}

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
    registry = props.registry,
    uiSchema = props.uiSchema;
  var _registry$templates$B = registry.templates.ButtonTemplates,
    MoveDownButton = _registry$templates$B.MoveDownButton,
    MoveUpButton = _registry$templates$B.MoveUpButton,
    RemoveButton = _registry$templates$B.RemoveButton;
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return React.createElement("div", null, React.createElement(Row, {
    className: "mb-2  d-flex align-items-center"
  }, React.createElement(Col, {
    xs: "9",
    lg: "9"
  }, children), React.createElement(Col, {
    xs: "3",
    lg: "3",
    className: "py-4"
  }, hasToolbar && React.createElement("div", {
    className: "d-flex flex-row"
  }, (hasMoveUp || hasMoveDown) && React.createElement("div", {
    className: "m-0 p-0"
  }, React.createElement(MoveUpButton, {
    className: "array-item-move-up",
    style: btnStyle,
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onReorderClick(index, index - 1),
    uiSchema: uiSchema,
    registry: registry
  })), (hasMoveUp || hasMoveDown) && React.createElement("div", {
    className: "m-0 p-0"
  }, React.createElement(MoveDownButton, {
    style: btnStyle,
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onReorderClick(index, index + 1),
    uiSchema: uiSchema,
    registry: registry
  })), hasRemove && React.createElement("div", {
    className: "m-0 p-0"
  }, React.createElement(RemoveButton, {
    style: btnStyle,
    disabled: disabled || readonly,
    onClick: onDropIndexClick(index),
    uiSchema: uiSchema,
    registry: registry
  }))))));
}

var _excluded$1 = ["key"];
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
  return React.createElement("div", null, React.createElement(Row, {
    className: "p-0 m-0"
  }, React.createElement(Col, {
    className: "p-0 m-0"
  }, React.createElement(ArrayFieldTitleTemplate, {
    idSchema: idSchema,
    title: uiOptions.title || title,
    schema: schema,
    uiSchema: uiSchema,
    required: required,
    registry: registry
  }), React.createElement(ArrayFieldDescriptionTemplate, {
    idSchema: idSchema,
    description: uiOptions.description || schema.description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), React.createElement(Container, {
    fluid: true,
    key: "array-item-list-" + idSchema.$id,
    className: "p-0 m-0"
  }, items && items.map(function (_ref) {
    var key = _ref.key,
      itemProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);
    return React.createElement(ArrayFieldItemTemplate, _extends({
      key: key
    }, itemProps));
  }), canAdd && React.createElement(Container, {
    className: ""
  }, React.createElement(Row, {
    className: "mt-2"
  }, React.createElement(Col, {
    xs: 9
  }), React.createElement(Col, {
    xs: 3,
    className: "py-4 col-lg-3 col-3"
  }, React.createElement(AddButton, {
    className: "array-item-add",
    onClick: onAddClick,
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  }))))))));
}

function BaseInputTemplate(_ref) {
  var id = _ref.id,
    placeholder = _ref.placeholder,
    required = _ref.required,
    readonly = _ref.readonly,
    disabled = _ref.disabled,
    type = _ref.type,
    value = _ref.value,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    autofocus = _ref.autofocus,
    options = _ref.options,
    schema = _ref.schema,
    _ref$rawErrors = _ref.rawErrors,
    rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors,
    children = _ref.children,
    extraProps = _ref.extraProps;
  var inputProps = _extends({}, extraProps, getInputProps(schema, type, options));
  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(value === "" ? options.emptyValue : value);
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, value);
  };
  // const classNames = [rawErrors.length > 0 ? "is-invalid" : "", type === 'file' ? 'custom-file-label': ""]
  return React.createElement(React.Fragment, null, React.createElement(Form$1.Control, _extends({
    id: id,
    name: id,
    placeholder: placeholder,
    autoFocus: autofocus,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    className: rawErrors.length > 0 ? "is-invalid" : "",
    list: schema.examples ? examplesId(id) : undefined
  }, inputProps, {
    value: value || value === 0 ? value : "",
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id, !!schema.examples)
  })), children, Array.isArray(schema.examples) ? React.createElement("datalist", {
    id: examplesId(id)
  }, schema.examples.concat(schema["default"] && !schema.examples.includes(schema["default"]) ? [schema["default"]] : []).map(function (example) {
    return React.createElement("option", {
      key: example,
      value: example
    });
  })) : null);
}

function DescriptionField(_ref) {
  var id = _ref.id,
    description = _ref.description;
  if (description) {
    return React.createElement("div", null, React.createElement("div", {
      id: id,
      className: "mb-3"
    }, description));
  }
  return null;
}

function ErrorList(_ref) {
  var errors = _ref.errors;
  return React.createElement(Card, {
    border: "danger",
    className: "mb-4"
  }, React.createElement(Card.Header, {
    className: "alert-danger"
  }, "Errors"), React.createElement(Card.Body, {
    className: "p-0"
  }, React.createElement(ListGroup, null, errors.map(function (error, i) {
    return React.createElement(ListGroup.Item, {
      key: i,
      className: "border-0"
    }, React.createElement("span", null, error.stack));
  }))));
}

var _excluded = ["icon", "iconType", "className", "uiSchema", "registry"];
function IconButton(props) {
  var icon = props.icon,
    iconType = props.iconType,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  return React.createElement(Button, _extends({
    block: iconType === "block"
  }, otherProps, {
    variant: props.variant || "light",
    size: "sm"
  }), icon);
}
function MoveDownButton(props) {
  return React.createElement(IconButton, _extends({
    title: "Move down"
  }, props, {
    icon: React.createElement(AiOutlineArrowDown, null)
  }));
}
function MoveUpButton(props) {
  return React.createElement(IconButton, _extends({
    title: "Move up"
  }, props, {
    icon: React.createElement(AiOutlineArrowUp, null)
  }));
}
function RemoveButton(props) {
  return React.createElement(IconButton, _extends({
    title: "Remove"
  }, props, {
    variant: "danger",
    icon: React.createElement(IoIosRemove, null)
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
  return React.createElement(ListGroup, {
    as: "ul",
    id: id
  }, errors.map(function (error, i) {
    return React.createElement(ListGroup.Item, {
      as: "li",
      key: i,
      className: "border-0 m-0 p-0"
    }, React.createElement("small", {
      className: "m-0 text-danger"
    }, error));
  }));
}

/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
function FieldHelpTemplate(props) {
  var idSchema = props.idSchema,
    help = props.help,
    hasErrors = props.hasErrors;
  if (!help) {
    return null;
  }
  var id = helpId(idSchema);
  return React.createElement(Form$1.Text, {
    className: hasErrors ? "text-danger" : "text-muted",
    id: id
  }, help);
}

function FieldTemplate(_ref) {
  var id = _ref.id,
    children = _ref.children,
    displayLabel = _ref.displayLabel,
    _ref$rawErrors = _ref.rawErrors,
    rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors,
    errors = _ref.errors,
    help = _ref.help,
    rawDescription = _ref.rawDescription,
    classNames = _ref.classNames,
    style = _ref.style,
    disabled = _ref.disabled,
    label = _ref.label,
    hidden = _ref.hidden,
    onDropPropertyClick = _ref.onDropPropertyClick,
    onKeyChange = _ref.onKeyChange,
    readonly = _ref.readonly,
    required = _ref.required,
    schema = _ref.schema,
    uiSchema = _ref.uiSchema,
    registry = _ref.registry;
  var uiOptions = getUiOptions(uiSchema);
  var WrapIfAdditionalTemplate = getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
  if (hidden) {
    return React.createElement("div", {
      className: "hidden"
    }, children);
  }
  return React.createElement(WrapIfAdditionalTemplate, {
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
  }, React.createElement(Form$1.Group, null, displayLabel && React.createElement(Form$1.Label, {
    htmlFor: id,
    className: rawErrors.length > 0 ? "text-danger" : ""
  }, label, required ? "*" : null), children, displayLabel && rawDescription && React.createElement(Form$1.Text, {
    className: rawErrors.length > 0 ? "text-danger" : "text-muted"
  }, rawDescription), errors, help));
}

function ObjectFieldTemplate(_ref) {
  var description = _ref.description,
    title = _ref.title,
    properties = _ref.properties,
    required = _ref.required,
    uiSchema = _ref.uiSchema,
    idSchema = _ref.idSchema,
    schema = _ref.schema,
    formData = _ref.formData,
    onAddClick = _ref.onAddClick,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    registry = _ref.registry;
  var uiOptions = getUiOptions(uiSchema);
  var TitleFieldTemplate = getTemplate("TitleFieldTemplate", registry, uiOptions);
  var DescriptionFieldTemplate = getTemplate("DescriptionFieldTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  return React.createElement(React.Fragment, null, (uiOptions.title || title) && React.createElement(TitleFieldTemplate, {
    id: titleId(idSchema),
    title: uiOptions.title || title,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), (uiOptions.description || description) && React.createElement(DescriptionFieldTemplate, {
    id: descriptionId(idSchema),
    description: uiOptions.description || description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), React.createElement(Container, {
    fluid: true,
    className: "p-0"
  }, properties.map(function (element, index) {
    return React.createElement(Row, {
      key: index,
      style: {
        marginBottom: "10px"
      },
      className: element.hidden ? "d-none" : undefined
    }, React.createElement(Col, {
      xs: 12
    }, " ", element.content));
  }), canExpand(schema, uiSchema, formData) ? React.createElement(Row, null, React.createElement(Col, {
    xs: {
      offset: 9,
      span: 3
    },
    className: "py-4"
  }, React.createElement(AddButton, {
    onClick: onAddClick(schema),
    disabled: disabled || readonly,
    className: "object-property-expand",
    uiSchema: uiSchema,
    registry: registry
  }))) : null));
}

function SubmitButton(props) {
  var _getSubmitButtonOptio = getSubmitButtonOptions(props.uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    submitButtonProps = _getSubmitButtonOptio.props;
  if (norender) {
    return null;
  }
  return React.createElement("div", null, React.createElement(Button, _extends({
    variant: "primary",
    type: "submit"
  }, submitButtonProps), submitText));
}

function TitleField(_ref) {
  var id = _ref.id,
    title = _ref.title,
    uiSchema = _ref.uiSchema;
  var uiOptions = getUiOptions(uiSchema);
  return React.createElement("div", {
    id: id,
    className: "my-1"
  }, React.createElement("h5", null, uiOptions.title || title), React.createElement("hr", {
    className: "border-0 bg-secondary",
    style: {
      height: "1px"
    }
  }));
}

function WrapIfAdditionalTemplate(_ref) {
  var classNames = _ref.classNames,
    style = _ref.style,
    children = _ref.children,
    disabled = _ref.disabled,
    id = _ref.id,
    label = _ref.label,
    onDropPropertyClick = _ref.onDropPropertyClick,
    onKeyChange = _ref.onKeyChange,
    readonly = _ref.readonly,
    required = _ref.required,
    schema = _ref.schema,
    uiSchema = _ref.uiSchema,
    registry = _ref.registry;
  // Button templates are not overridden in the uiSchema
  var RemoveButton = registry.templates.ButtonTemplates.RemoveButton;
  var keyLabel = label + " Key"; // i18n ?
  var additional = (ADDITIONAL_PROPERTY_FLAG in schema);
  if (!additional) {
    return React.createElement("div", {
      className: classNames,
      style: style
    }, children);
  }
  var handleBlur = function handleBlur(_ref2) {
    var target = _ref2.target;
    return onKeyChange(target.value);
  };
  var keyId = id + "-key";
  return React.createElement(Row, {
    className: classNames,
    style: style,
    key: keyId
  }, React.createElement(Col, {
    xs: 5
  }, React.createElement(Form$1.Group, null, React.createElement(Form$1.Label, {
    htmlFor: keyId
  }, keyLabel), React.createElement(Form$1.Control, {
    required: required,
    defaultValue: label,
    disabled: disabled || readonly,
    id: keyId,
    name: keyId,
    onBlur: !readonly ? handleBlur : undefined,
    type: "text"
  }))), React.createElement(Col, {
    xs: 5
  }, children), React.createElement(Col, {
    xs: 2,
    className: "py-4"
  }, React.createElement(RemoveButton, {
    iconType: "block",
    className: "w-100",
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

function CheckboxWidget(props) {
  var id = props.id,
    value = props.value,
    disabled = props.disabled,
    readonly = props.readonly,
    label = props.label,
    schema = props.schema,
    autofocus = props.autofocus,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus;
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  var required = schemaRequiresTrueValue(schema);
  var _onChange = function _onChange(_ref) {
    var checked = _ref.target.checked;
    return onChange(checked);
  };
  var _onBlur = function _onBlur(_ref2) {
    var checked = _ref2.target.checked;
    return onBlur(id, checked);
  };
  var _onFocus = function _onFocus(_ref3) {
    var checked = _ref3.target.checked;
    return onFocus(id, checked);
  };
  var desc = label || schema.description;
  return React.createElement(Form$1.Group, {
    className: "checkbox " + (disabled || readonly ? "disabled" : ""),
    "aria-describedby": ariaDescribedByIds(id)
  }, React.createElement(Form$1.Check, {
    id: id,
    name: id,
    label: desc,
    checked: typeof value === "undefined" ? false : value,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onChange: _onChange,
    type: "checkbox",
    onBlur: _onBlur,
    onFocus: _onFocus
  }));
}

function CheckboxesWidget(_ref) {
  var id = _ref.id,
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
  return React.createElement(Form$1.Group, null, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var checked = enumOptionsIsSelected(option.value, checkboxesValues);
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    return React.createElement(Form$1.Check, {
      key: option.value,
      inline: inline,
      custom: true,
      required: required,
      checked: checked,
      className: "bg-transparent border-0",
      type: "checkbox",
      id: optionId(id, index),
      name: id,
      label: option.label,
      autoFocus: autofocus && index === 0,
      onChange: _onChange(index),
      onBlur: _onBlur,
      onFocus: _onFocus,
      disabled: disabled || itemDisabled || readonly,
      "aria-describedby": ariaDescribedByIds(id)
    });
  }));
}

function RadioWidget(_ref) {
  var id = _ref.id,
    options = _ref.options,
    value = _ref.value,
    required = _ref.required,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var inline = Boolean(options && options.inline);
  return React.createElement(Form$1.Group, {
    className: "mb-0"
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    var checked = enumOptionsIsSelected(option.value, value);
    var radio = React.createElement(Form$1.Check, {
      inline: inline,
      label: option.label,
      id: optionId(id, index),
      key: index,
      name: id,
      type: "radio",
      disabled: disabled || itemDisabled || readonly,
      checked: checked,
      required: required,
      value: String(index),
      onChange: _onChange,
      onBlur: _onBlur,
      onFocus: _onFocus,
      "aria-describedby": ariaDescribedByIds(id)
    });
    return radio;
  }));
}

function RangeWidget(props) {
  var value = props.value,
    label = props.label,
    options = props.options,
    registry = props.registry;
  var BaseInputTemplate = getTemplate("BaseInputTemplate", registry, options);
  return React.createElement(BaseInputTemplate, _extends({}, props, {
    extraProps: label
  }), React.createElement("span", {
    className: "range-view"
  }, value));
}

function SelectWidget(_ref) {
  var schema = _ref.schema,
    id = _ref.id,
    options = _ref.options,
    required = _ref.required,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    value = _ref.value,
    multiple = _ref.multiple,
    autofocus = _ref.autofocus,
    _onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    placeholder = _ref.placeholder,
    _ref$rawErrors = _ref.rawErrors,
    rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    optEmptyValue = options.emptyValue;
  var emptyValue = multiple ? [] : "";
  function getValue(event, multiple) {
    if (multiple) {
      return [].slice.call(event.target.options).filter(function (o) {
        return o.selected;
      }).map(function (o) {
        return o.value;
      });
    } else {
      return event.target.value;
    }
  }
  var selectedIndexes = enumOptionsIndexForValue(value, enumOptions, multiple);
  return React.createElement(Form$1.Control, {
    as: "select",
    bsPrefix: "custom-select",
    id: id,
    name: id,
    value: typeof selectedIndexes === "undefined" ? emptyValue : selectedIndexes,
    required: required,
    multiple: multiple,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    className: rawErrors.length > 0 ? "is-invalid" : "",
    onBlur: onBlur && function (event) {
      var newValue = getValue(event, multiple);
      onBlur(id, enumOptionsValueForIndex(newValue, enumOptions, optEmptyValue));
    },
    onFocus: onFocus && function (event) {
      var newValue = getValue(event, multiple);
      onFocus(id, enumOptionsValueForIndex(newValue, enumOptions, optEmptyValue));
    },
    onChange: function onChange(event) {
      var newValue = getValue(event, multiple);
      _onChange(enumOptionsValueForIndex(newValue, enumOptions, optEmptyValue));
    },
    "aria-describedby": ariaDescribedByIds(id)
  }, !multiple && schema["default"] === undefined && React.createElement("option", {
    value: ""
  }, placeholder), enumOptions.map(function (_ref2, i) {
    var value = _ref2.value,
      label = _ref2.label;
    var disabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(value) != -1;
    return React.createElement("option", {
      key: i,
      id: label,
      value: String(i),
      disabled: disabled
    }, label);
  }));
}

function TextareaWidget(_ref) {
  var id = _ref.id,
    placeholder = _ref.placeholder,
    value = _ref.value,
    required = _ref.required,
    disabled = _ref.disabled,
    autofocus = _ref.autofocus,
    readonly = _ref.readonly,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onChange = _ref.onChange,
    options = _ref.options;
  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(value === "" ? options.emptyValue : value);
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, value);
  };
  return React.createElement(InputGroup, null, React.createElement(FormControl, {
    id: id,
    name: id,
    as: "textarea",
    placeholder: placeholder,
    disabled: disabled,
    readOnly: readonly,
    value: value,
    required: required,
    autoFocus: autofocus,
    rows: options.rows || 5,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  }));
}

function FileWidget(props) {
  var options = props.options,
    registry = props.registry;
  var BaseInputTemplate = getTemplate("BaseInputTemplate", registry, options);
  return React.createElement(BaseInputTemplate, _extends({}, props, {
    type: "file"
  }));
}

function generateWidgets() {
  return {
    CheckboxWidget: CheckboxWidget,
    CheckboxesWidget: CheckboxesWidget,
    RadioWidget: RadioWidget,
    RangeWidget: RangeWidget,
    SelectWidget: SelectWidget,
    TextareaWidget: TextareaWidget,
    FileWidget: FileWidget
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
var Form = /*#__PURE__*/generateForm();

export { Form, Templates, Theme, Widgets, Form as default, generateForm, generateTemplates, generateTheme, generateWidgets };
//# sourceMappingURL=bootstrap-4.esm.js.map
