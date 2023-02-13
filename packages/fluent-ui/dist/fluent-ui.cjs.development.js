'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('@fluentui/react');
var core = require('@rjsf/core');
var React = require('react');
var utils = require('@rjsf/utils');
var _pick = require('lodash/pick');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _pick__default = /*#__PURE__*/_interopDefaultLegacy(_pick);

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
  return React__default["default"].createElement("div", {
    className: "ms-Grid",
    dir: "ltr"
  }, React__default["default"].createElement("div", {
    className: "ms-Grid-row"
  }, React__default["default"].createElement("div", {
    className: "ms-Grid-col ms-sm6 ms-md8 ms-lg9"
  }, React__default["default"].createElement("div", {
    className: "ms-Grid-row"
  }, children)), hasToolbar && React__default["default"].createElement("div", {
    className: "ms-Grid-col ms-sm6 ms-md4 ms-lg3",
    style: {
      textAlign: "right"
    }
  }, (hasMoveUp || hasMoveDown) && React__default["default"].createElement(MoveUpButton, {
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onReorderClick(index, index - 1),
    uiSchema: uiSchema,
    registry: registry
  }), (hasMoveUp || hasMoveDown) && React__default["default"].createElement(MoveDownButton, {
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onReorderClick(index, index + 1),
    uiSchema: uiSchema,
    registry: registry
  }), hasRemove && React__default["default"].createElement(RemoveButton, {
    disabled: disabled || readonly,
    onClick: onDropIndexClick(index),
    uiSchema: uiSchema,
    registry: registry
  }))));
}

var addIcon = {
  iconName: "Add"
};
function AddButton(props) {
  return React__default["default"].createElement(react.CommandBarButton, {
    style: {
      height: "32px"
    },
    iconProps: addIcon,
    text: "Add item",
    className: props.className,
    onClick: props.onClick,
    disabled: props.disabled
  });
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

var _excluded = ["key"];
var rightJustify = {
  "float": "right"
};
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
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(ArrayFieldTitleTemplate, {
    idSchema: idSchema,
    title: uiOptions.title || title,
    schema: schema,
    uiSchema: uiSchema,
    required: required,
    registry: registry
  }), React__default["default"].createElement(ArrayFieldDescriptionTemplate, {
    idSchema: idSchema,
    description: uiOptions.description || schema.description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), items.length > 0 && items.map(function (_ref) {
    var key = _ref.key,
      itemProps = _objectWithoutPropertiesLoose(_ref, _excluded);
    return React__default["default"].createElement(ArrayFieldItemTemplate, _extends({
      key: key
    }, itemProps));
  }), canAdd && React__default["default"].createElement("span", {
    style: rightJustify
  }, React__default["default"].createElement(AddButton, {
    className: "array-item-add",
    onClick: onAddClick,
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  })));
}

// Keys of ITextFieldProps from @fluentui/react
var allowedProps$7 = ["multiline", "resizable", "autoAdjustHeight", "underlined", "borderless", "label", "onRenderLabel", "description", "onRenderDescription", "prefix", "suffix", "onRenderPrefix", "onRenderSuffix", "iconProps", "defaultValue", "value", "disabled", "readOnly", "errorMessage", "onChange", "onNotifyValidationResult", "onGetErrorMessage", "deferredValidationTime", "className", "inputClassName", "ariaLabel", "validateOnFocusIn", "validateOnFocusOut", "validateOnLoad", "theme", "styles", "autoComplete", "mask", "maskChar", "maskFormat", "type", "list"];
function BaseInputTemplate(_ref) {
  var id = _ref.id,
    placeholder = _ref.placeholder,
    required = _ref.required,
    readonly = _ref.readonly,
    disabled = _ref.disabled,
    label = _ref.label,
    value = _ref.value,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    autofocus = _ref.autofocus,
    options = _ref.options,
    schema = _ref.schema,
    type = _ref.type,
    rawErrors = _ref.rawErrors,
    multiline = _ref.multiline;
  var inputProps = utils.getInputProps(schema, type, options);
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
  var uiProps = _pick__default["default"](options.props || {}, allowedProps$7);
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(react.TextField, _extends({
    id: id,
    name: id,
    placeholder: placeholder,
    label: label || schema.title,
    autoFocus: autofocus,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    multiline: multiline
  }, inputProps, {
    value: value || value === 0 ? value : "",
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    errorMessage: (rawErrors || []).join("\n"),
    list: schema.examples ? utils.examplesId(id) : undefined
  }, uiProps, {
    "aria-describedby": utils.ariaDescribedByIds(id, !!schema.examples)
  })), Array.isArray(schema.examples) && React__default["default"].createElement("datalist", {
    id: utils.examplesId(id)
  }, schema.examples.concat(schema["default"] && !schema.examples.includes(schema["default"]) ? [schema["default"]] : []).map(function (example) {
    return React__default["default"].createElement("option", {
      key: example,
      value: example
    });
  })));
}

function DescriptionField(_ref) {
  var description = _ref.description,
    id = _ref.id;
  if (description) {
    return React__default["default"].createElement(react.Text, {
      id: id
    }, description);
  }
  return null;
}

function ErrorList(_ref) {
  var errors = _ref.errors;
  return React__default["default"].createElement(React__default["default"].Fragment, null, errors.map(function (error, i) {
    return React__default["default"].createElement(react.MessageBar, {
      key: i,
      messageBarType: react.MessageBarType.error,
      isMultiline: false,
      dismissButtonAriaLabel: "Close"
    }, error.stack);
  }));
}

function FluentIconButton(props) {
  var iconProps = {
    iconName: props.icon
  };
  return React__default["default"].createElement(react.IconButton, {
    disabled: props.disabled,
    onClick: props.onClick,
    iconProps: iconProps,
    color: "secondary"
  });
}
function MoveDownButton(props) {
  return React__default["default"].createElement(FluentIconButton, _extends({
    title: "Move down"
  }, props, {
    icon: "Down"
  }));
}
function MoveUpButton(props) {
  return React__default["default"].createElement(FluentIconButton, _extends({
    title: "Move up"
  }, props, {
    icon: "Up"
  }));
}
function RemoveButton(props) {
  return React__default["default"].createElement(FluentIconButton, _extends({
    title: "Remove"
  }, props, {
    icon: "Delete"
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
  return React__default["default"].createElement(react.List, {
    id: id,
    items: errors
  });
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
  return React__default["default"].createElement(react.Text, {
    id: id
  }, help);
}

function FieldTemplate(props) {
  var id = props.id,
    children = props.children,
    errors = props.errors,
    help = props.help,
    rawDescription = props.rawDescription,
    hidden = props.hidden,
    uiSchema = props.uiSchema,
    registry = props.registry;
  var uiOptions = utils.getUiOptions(uiSchema);
  var WrapIfAdditionalTemplate = utils.getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
  // TODO: do this better by not returning the form-group class from master.
  var _props$classNames = props.classNames,
    classNames = _props$classNames === void 0 ? "" : _props$classNames;
  classNames = "ms-Grid-col ms-sm12 " + classNames.replace("form-group", "");
  return React__default["default"].createElement(WrapIfAdditionalTemplate, _extends({}, props), React__default["default"].createElement("div", {
    id: id,
    className: classNames,
    style: {
      marginBottom: 15,
      display: hidden ? "none" : undefined
    }
  }, children, rawDescription && React__default["default"].createElement(react.Text, null, rawDescription), errors, help));
}

function ObjectFieldTemplate(_ref) {
  var description = _ref.description,
    title = _ref.title,
    properties = _ref.properties,
    required = _ref.required,
    schema = _ref.schema,
    uiSchema = _ref.uiSchema,
    idSchema = _ref.idSchema,
    registry = _ref.registry;
  var uiOptions = utils.getUiOptions(uiSchema);
  var TitleFieldTemplate = utils.getTemplate("TitleFieldTemplate", registry, uiOptions);
  var DescriptionFieldTemplate = utils.getTemplate("DescriptionFieldTemplate", registry, uiOptions);
  return React__default["default"].createElement(React__default["default"].Fragment, null, (uiOptions.title || title) && React__default["default"].createElement(TitleFieldTemplate, {
    id: utils.titleId(idSchema),
    title: title,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), (uiOptions.description || description) && React__default["default"].createElement(DescriptionFieldTemplate, {
    id: utils.descriptionId(idSchema),
    schema: schema,
    uiSchema: uiSchema,
    description: uiOptions.description || description,
    registry: registry
  }), React__default["default"].createElement("div", {
    className: "ms-Grid",
    dir: "ltr"
  }, React__default["default"].createElement("div", {
    className: "ms-Grid-row"
  }, properties.map(function (element) {
    return element.content;
  }))));
}

function SubmitButton(_ref) {
  var uiSchema = _ref.uiSchema;
  var _getSubmitButtonOptio = utils.getSubmitButtonOptions(uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    submitButtonProps = _getSubmitButtonOptio.props;
  if (norender) {
    return null;
  }
  return React__default["default"].createElement("div", null, React__default["default"].createElement("br", null), React__default["default"].createElement("div", {
    className: "ms-Grid-col ms-sm12"
  }, React__default["default"].createElement(react.PrimaryButton, _extends({
    text: submitText,
    type: "submit"
  }, submitButtonProps))));
}

var styles = {
  root: [{
    fontSize: 24,
    marginBottom: 20,
    paddingBottom: 0
  }]
};
function TitleField(_ref) {
  var id = _ref.id,
    title = _ref.title;
  return React__default["default"].createElement(react.Label, {
    id: id,
    styles: styles
  }, title);
}

function WrapIfAdditionalTemplate(props) {
  var children = props.children;
  // TODO Implement WrapIfAdditionalTemplate features in FluentUI (#2777)
  return React__default["default"].createElement(React__default["default"].Fragment, null, children);
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

// Keys of ICheckboxProps from @fluentui/react
var allowedProps$6 = ["ariaDescribedBy", "ariaLabel", "ariaPositionInSet", "ariaSetSize", "boxSide", "checked", "checkmarkIconProps", "className", "componentRef", "defaultChecked", "defaultIndeterminate", "disabled", "indeterminate", "inputProps", "keytipProps", "label", "onChange", "onRenderLabel", "styles", "theme"];
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
    onFocus = props.onFocus,
    options = props.options;
  var _onChange = React__default["default"].useCallback(function (_, checked) {
    onChange(checked);
  }, [onChange]);
  var _onBlur = function _onBlur(_ref) {
    var value = _ref.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref2) {
    var value = _ref2.target.value;
    return onFocus(id, value);
  };
  var uiProps = _pick__default["default"](options.props || {}, allowedProps$6);
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(react.Checkbox, _extends({
    id: id,
    name: id,
    label: label || schema.title,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onBlur: _onBlur,
    onFocus: _onFocus,
    checked: typeof value === "undefined" ? false : value,
    onChange: _onChange
  }, uiProps, {
    "aria-describedby": utils.ariaDescribedByIds(id)
  })));
}

var styles_red$2 = {
  // TODO: get this color from theme.
  color: "rgb(164, 38, 44)",
  fontSize: 12,
  fontWeight: "normal",
  fontFamily: "\"Segoe UI\", \"Segoe UI Web (West European)\", \"Segoe UI\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif;"
};
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
    onFocus = _ref.onFocus,
    _ref$rawErrors = _ref.rawErrors,
    rawErrors = _ref$rawErrors === void 0 ? [] : _ref$rawErrors;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var checkboxesValues = Array.isArray(value) ? value : [value];
  var _onChange = function _onChange(index) {
    return function (_ev, checked) {
      if (checked) {
        onChange(utils.enumOptionsSelectValue(index, checkboxesValues, enumOptions));
      } else {
        onChange(utils.enumOptionsDeselectValue(index, checkboxesValues, enumOptions));
      }
    };
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var uiProps = _pick__default["default"](options.props || {}, allowedProps$6);
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(react.Label, null, label || schema.title, required && React__default["default"].createElement("span", {
    style: styles_red$2
  }, "\xA0*")), Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var checked = utils.enumOptionsIsSelected(option.value, checkboxesValues);
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    return React__default["default"].createElement(react.Checkbox, _extends({
      id: utils.optionId(id, index),
      name: id,
      checked: checked,
      label: option.label,
      disabled: disabled || itemDisabled || readonly,
      autoFocus: autofocus && index === 0,
      onChange: _onChange(index),
      onBlur: _onBlur,
      onFocus: _onFocus,
      key: index
    }, uiProps, {
      "aria-describedby": utils.ariaDescribedByIds(id)
    }));
  }), React__default["default"].createElement("span", {
    style: styles_red$2
  }, (rawErrors || []).join("\n")));
}

var styles_red$1 = {
  // TODO: get this color from theme.
  color: "rgb(164, 38, 44)",
  fontSize: 12,
  fontWeight: "normal",
  fontFamily: "\"Segoe UI\", \"Segoe UI Web (West European)\", \"Segoe UI\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif;"
};
var allowedProps$5 = ["componentRef", "color", "strings", "onChange", "alphaType", "alphaSliderHidden", "hexLabel", "redLabel", "greenLabel", "blueLabel", "alphaLabel", "className", "theme", "styles", "showPreview"];
function ColorWidget(_ref) {
  var id = _ref.id,
    schema = _ref.schema,
    options = _ref.options,
    value = _ref.value,
    required = _ref.required,
    label = _ref.label,
    onChange = _ref.onChange;
  var updateColor = function updateColor(_ev, colorObj) {
    onChange(colorObj.hex);
  };
  var uiProps = _pick__default["default"](options.props || {}, allowedProps$5);
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(react.Label, null, label || schema.title, required && React__default["default"].createElement("span", {
    style: styles_red$1
  }, "\xA0*")), React__default["default"].createElement(react.ColorPicker, _extends({
    color: react.getColorFromString(value),
    onChange: updateColor,
    alphaType: "alpha",
    showPreview: true
  }, uiProps, {
    "aria-describedby": utils.ariaDescribedByIds(id)
  })));
}

// Keys of IDropdownProps from @fluentui/react
var allowedProps$4 = ["componentRef", "styles", "theme", "calloutProps", "calendarProps", "textField", "calendarAs", "onSelectDate", "label", "isRequired", "disabled", "ariaLabel", "underlined", "pickerAriaLabel", "isMonthPickerVisible", "showMonthPickerAsOverlay", "allowTextInput", "disableAutoFocus", "placeholder", "today", "value", "formatDate", "parseDateFromString", "firstDayOfWeek", "strings", "highlightCurrentMonth", "highlightSelectedMonth", "showWeekNumbers", "firstWeekOfYear", "showGoToToday", "borderless", "className", "dateTimeFormatter", "minDate", "maxDate", "initialPickerDate", "allFocusable", "onAfterMenuDismiss", "showCloseButton", "tabIndex"];
var controlClass = /*#__PURE__*/react.mergeStyleSets({
  control: {
    margin: "0 0 15px 0"
  }
});
// TODO: move to utils.
// TODO: figure out a standard format for this, as well as
// how we can get this to work with locales.
var formatDate = function formatDate(date) {
  if (!date) {
    return "";
  }
  var yyyy = utils.pad(date.getFullYear(), 4);
  var MM = utils.pad(date.getMonth() + 1, 2);
  var dd = utils.pad(date.getDate(), 2);
  return yyyy + "-" + MM + "-" + dd;
};
var parseDate = function parseDate(dateStr) {
  if (!dateStr) {
    return undefined;
  }
  var _dateStr$split$map = dateStr.split("-").map(function (e) {
      return parseInt(e);
    }),
    year = _dateStr$split$map[0],
    month = _dateStr$split$map[1],
    day = _dateStr$split$map[2];
  var dt = new Date(year, month - 1, day);
  return dt;
};
function DateWidget(_ref) {
  var id = _ref.id,
    required = _ref.required,
    label = _ref.label,
    value = _ref.value,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    options = _ref.options,
    placeholder = _ref.placeholder;
  var _onSelectDate = function _onSelectDate(date) {
    if (date) {
      var formatted = formatDate(date);
      formatted && onChange(formatted);
    }
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, value);
  };
  var uiProps = _pick__default["default"](options.props || {}, allowedProps$4);
  return React__default["default"].createElement(react.DatePicker, _extends({
    id: id,
    className: controlClass.control,
    firstDayOfWeek: react.DayOfWeek.Sunday,
    placeholder: placeholder,
    ariaLabel: "Select a date",
    isRequired: required,
    label: label,
    onSelectDate: _onSelectDate,
    onBlur: _onBlur,
    onFocus: _onFocus,
    value: parseDate(value)
  }, uiProps, {
    "aria-describedby": utils.ariaDescribedByIds(id)
  }));
}

function DateTimeWidget(props) {
  var registry = props.registry;
  var uiProps = props.options["props"] || {};
  var options = _extends({}, props.options, {
    props: _extends({
      type: "datetime-local"
    }, uiProps)
  });
  var BaseInputTemplate = utils.getTemplate("BaseInputTemplate", registry, options);
  var value = utils.utcToLocal(props.value);
  var onChange = function onChange(value) {
    props.onChange(utils.localToUTC(value));
  };
  // TODO: rows and columns.
  return React__default["default"].createElement(BaseInputTemplate, _extends({}, props, {
    options: options,
    value: value,
    onChange: onChange
  }));
}

var allowedProps$3 = ["componentRef", "options", "defaultSelectedKey", "selectedKey", "onChange", "label", "onChanged", "theme", "styles", "ariaLabelledBy"];
function RadioWidget(_ref) {
  var id = _ref.id,
    schema = _ref.schema,
    options = _ref.options,
    value = _ref.value,
    required = _ref.required,
    label = _ref.label,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    disabled = _ref.disabled,
    readonly = _ref.readonly;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  function _onChange(_ev, option) {
    if (option) {
      onChange(option.key);
    }
  }
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var newOptions = Array.isArray(enumOptions) ? enumOptions.map(function (option, index) {
    return {
      key: String(index),
      name: id,
      id: utils.optionId(id, index),
      text: option.label,
      disabled: Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1,
      "aria-describedby": utils.ariaDescribedByIds(id)
    };
  }) : [];
  var selectedIndex = utils.enumOptionsIndexForValue(value, enumOptions);
  var uiProps = _pick__default["default"](options.props || {}, allowedProps$3);
  return React__default["default"].createElement(react.ChoiceGroup, _extends({
    id: id,
    name: id,
    options: newOptions,
    disabled: disabled || readonly,
    onChange: _onChange,
    onFocus: _onFocus,
    onBlur: _onBlur,
    label: label || schema.title,
    required: required,
    selectedKey: selectedIndex
  }, uiProps));
}

var styles_red = {
  // TODO: get this color from theme.
  color: "rgb(164, 38, 44)",
  fontSize: 12,
  fontWeight: "normal",
  fontFamily: "\"Segoe UI\", \"Segoe UI Web (West European)\", \"Segoe UI\", -apple-system, BlinkMacSystemFont, Roboto, \"Helvetica Neue\", sans-serif;"
};
// Keys of ISliderProps from @fluentui/react
var allowedProps$2 = ["componentRef", "styles?", "theme", "label", "defaultValue", "value", "min", "max", "step", "showValue", "onChange", "ariaLabel", "ariaValueText", "vertical", "disabled", "snapToStep", "className", "buttonProps", "valueFormat", "originFromZero"];
function RangeWidget(_ref) {
  var value = _ref.value,
    readonly = _ref.readonly,
    disabled = _ref.disabled,
    options = _ref.options,
    schema = _ref.schema,
    onChange = _ref.onChange,
    required = _ref.required,
    label = _ref.label,
    id = _ref.id;
  var sliderProps = _extends({
    value: value,
    label: label,
    id: id
  }, utils.rangeSpec(schema));
  var _onChange = function _onChange(value) {
    return onChange(value);
  };
  var uiProps = _pick__default["default"](options.props || {}, allowedProps$2);
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(react.Label, null, label || schema.title, required && React__default["default"].createElement("span", {
    style: styles_red
  }, "\xA0*")), React__default["default"].createElement(react.Slider, _extends({
    disabled: disabled || readonly,
    min: sliderProps.min,
    max: sliderProps.max,
    step: sliderProps.step,
    onChange: _onChange,
    snapToStep: true
  }, uiProps, {
    "aria-describedby": utils.ariaDescribedByIds(id)
  })));
}

// Keys of IDropdownProps from @fluentui/react
var allowedProps$1 = ["placeHolder", "options", "onChange", "onChanged", "onRenderLabel", "onRenderPlaceholder", "onRenderPlaceHolder", "onRenderTitle", "onRenderCaretDown", "dropdownWidth", "responsiveMode", "defaultSelectedKeys", "selectedKeys", "multiselectDelimiter", "notifyOnReselect", "isDisabled", "keytipProps", "theme", "styles",
// ISelectableDroppableTextProps
"componentRef", "label", "ariaLabel", "id", "className", "defaultSelectedKey", "selectedKey", "multiSelect", "options", "onRenderContainer", "onRenderList", "onRenderItem", "onRenderOption", "onDismiss", "disabled", "required", "calloutProps", "panelProps", "errorMessage", "placeholder", "openOnKeyboardFocus"];
function SelectWidget(_ref) {
  var schema = _ref.schema,
    id = _ref.id,
    options = _ref.options,
    label = _ref.label,
    required = _ref.required,
    disabled = _ref.disabled,
    readonly = _ref.readonly,
    value = _ref.value,
    multiple = _ref.multiple,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var _onChange = function _onChange(_ev, item) {
    if (!item) {
      return;
    }
    if (multiple) {
      var valueOrDefault = value || [];
      if (item.selected) {
        onChange(utils.enumOptionsSelectValue(item.key, valueOrDefault, enumOptions));
      } else {
        onChange(utils.enumOptionsDeselectValue(item.key, valueOrDefault, enumOptions));
      }
    } else {
      onChange(utils.enumOptionsValueForIndex(item.key, enumOptions, emptyValue));
    }
  };
  var _onBlur = function _onBlur(e) {
    return onBlur(id, utils.enumOptionsValueForIndex(e.target.value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(e) {
    return onFocus(id, utils.enumOptionsValueForIndex(e.target.value, enumOptions, emptyValue));
  };
  var newOptions = Array.isArray(enumOptions) ? enumOptions.map(function (option, index) {
    return {
      key: String(index),
      text: option.label,
      disabled: Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1
    };
  }) : [];
  var uiProps = _pick__default["default"](options.props || {}, allowedProps$1);
  var selectedIndexes = utils.enumOptionsIndexForValue(value, enumOptions, multiple);
  return React__default["default"].createElement(react.Dropdown, _extends({
    id: id,
    label: label || schema.title,
    multiSelect: multiple,
    defaultSelectedKey: multiple ? undefined : selectedIndexes,
    defaultSelectedKeys: multiple ? selectedIndexes : undefined,
    required: required,
    options: newOptions,
    disabled: disabled || readonly,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus
  }, uiProps, {
    "aria-describedby": utils.ariaDescribedByIds(id)
  }));
}

function TextareaWidget(props) {
  var uiSchema = props.uiSchema,
    registry = props.registry;
  var options = utils.getUiOptions(uiSchema);
  var BaseInputTemplate = utils.getTemplate("BaseInputTemplate", registry, options);
  // TODO: rows and columns.
  return React__default["default"].createElement(BaseInputTemplate, _extends({}, props, {
    multiline: true
  }));
}

// Keys of ISpinButtonProps from @fluentui/react
var allowedProps = ["ariaDescribedBy", "ariaLabel", "ariaPositionInSet", "ariaSetSize", "ariaValueNow", "ariaValueText", "className", "componentRef", "decrementButtonAriaLabel", "decrementButtonIcon", "defaultValue", "disabled", "downArrowButtonStyles", "getClassNames", "iconButtonProps", "iconProps", "incrementButtonAriaLabel", "incrementButtonIcon", "inputProps", "keytipProps", "label", "labelPosition", "max", "min", "onBlur", "onDecrement", "onFocus", "onIncrement", "onValidate", "precision", "step", "styles", "theme", "title", "upArrowButtonStyles", "value"];
function UpDownWidget(_ref) {
  var id = _ref.id,
    required = _ref.required,
    readonly = _ref.readonly,
    disabled = _ref.disabled,
    label = _ref.label,
    value = _ref.value,
    onChange = _ref.onChange,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    options = _ref.options,
    schema = _ref.schema;
  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;
    return onChange(Number(value));
  };
  var _rangeSpec = utils.rangeSpec(schema),
    min = _rangeSpec.min,
    max = _rangeSpec.max,
    step = _rangeSpec.step;
  if (min === undefined) {
    min = -1 * Infinity;
  }
  if (max === undefined) {
    max = Infinity;
  }
  if (step === undefined) {
    step = 1;
  }
  var _onIncrement = function _onIncrement(value) {
    if (Number(value) + step <= max) {
      onChange(Number(value) + step);
    }
  };
  var _onDecrement = function _onDecrement(value) {
    if (Number(value) - step >= min) {
      onChange(Number(value) - step);
    }
  };
  var _onBlur = function _onBlur(_ref3) {
    var value = _ref3.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref4) {
    var value = _ref4.target.value;
    return onFocus(id, value);
  };
  var requiredSymbol = required ? "*" : "";
  var uiProps = _pick__default["default"](options.props || {}, allowedProps);
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(react.Label, {
    htmlFor: id
  }, label + requiredSymbol), React__default["default"].createElement(react.SpinButton, _extends({
    id: id,
    min: min,
    max: max,
    step: step,
    incrementButtonAriaLabel: "Increase value by 1",
    decrementButtonAriaLabel: "Decrease value by 1",
    disabled: disabled || readonly,
    value: value || value === 0 ? value : "",
    onBlur: _onBlur,
    onFocus: _onFocus,
    onChange: _onChange,
    onIncrement: _onIncrement,
    onDecrement: _onDecrement
  }, uiProps, {
    "aria-describedby": utils.ariaDescribedByIds(id)
  })));
}

function generateWidgets() {
  return {
    CheckboxWidget: CheckboxWidget,
    CheckboxesWidget: CheckboxesWidget,
    ColorWidget: ColorWidget,
    DateWidget: DateWidget,
    DateTimeWidget: DateTimeWidget,
    RadioWidget: RadioWidget,
    RangeWidget: RangeWidget,
    SelectWidget: SelectWidget,
    TextareaWidget: TextareaWidget,
    UpDownWidget: UpDownWidget
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
var FuiForm = /*#__PURE__*/generateForm();

react.initializeIcons();

exports.Form = FuiForm;
exports.Templates = Templates;
exports.Theme = Theme;
exports.Widgets = Widgets;
exports["default"] = FuiForm;
exports.generateForm = generateForm;
exports.generateTemplates = generateTemplates;
exports.generateTheme = generateTheme;
exports.generateWidgets = generateWidgets;
//# sourceMappingURL=fluent-ui.cjs.development.js.map
