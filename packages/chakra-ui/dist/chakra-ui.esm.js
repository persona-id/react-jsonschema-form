import { withTheme } from '@rjsf/core';
import * as React from 'react';
import React__default, { useMemo, useState, useEffect } from 'react';
import { Button, HStack, Box, ButtonGroup, Grid, GridItem, shouldForwardProp, FormControl, FormLabel, Input, Text, Alert, AlertTitle, List, ListItem, ListIcon, IconButton, FormErrorMessage, FormHelperText, Heading, Divider, Checkbox, CheckboxGroup, Stack, RadioGroup, Radio, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Textarea, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, ChakraProvider } from '@chakra-ui/react';
import { AddIcon, WarningIcon, ArrowDownIcon, ArrowUpIcon, DeleteIcon } from '@chakra-ui/icons';
import { getUiOptions, getTemplate, getInputProps, examplesId, ariaDescribedByIds, errorId, helpId, titleId, descriptionId, canExpand, getSubmitButtonOptions, ADDITIONAL_PROPERTY_FLAG, parseDateString, toDateString, pad, schemaRequiresTrueValue, enumOptionsIndexForValue, enumOptionsValueForIndex, enumOptionsIsSelected, optionId, rangeSpec } from '@rjsf/utils';
import { Select } from 'chakra-react-select';
import { Global, CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import weakMemoize from '@emotion/weak-memoize';

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
  return React__default.createElement(Button, _extends({
    leftIcon: React__default.createElement(AddIcon, null)
  }, props), "Add Item");
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
    uiSchema = props.uiSchema,
    registry = props.registry;
  var _registry$templates$B = registry.templates.ButtonTemplates,
    MoveDownButton = _registry$templates$B.MoveDownButton,
    MoveUpButton = _registry$templates$B.MoveUpButton,
    RemoveButton = _registry$templates$B.RemoveButton;
  var onRemoveClick = useMemo(function () {
    return onDropIndexClick(index);
  }, [index, onDropIndexClick]);
  var onArrowUpClick = useMemo(function () {
    return onReorderClick(index, index - 1);
  }, [index, onReorderClick]);
  var onArrowDownClick = useMemo(function () {
    return onReorderClick(index, index + 1);
  }, [index, onReorderClick]);
  return React__default.createElement(HStack, {
    alignItems: "flex-end",
    py: 1
  }, React__default.createElement(Box, {
    w: "100%"
  }, children), hasToolbar && React__default.createElement(Box, null, React__default.createElement(ButtonGroup, {
    isAttached: true,
    mb: 1
  }, (hasMoveUp || hasMoveDown) && React__default.createElement(MoveUpButton, {
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onArrowUpClick,
    uiSchema: uiSchema,
    registry: registry
  }), (hasMoveUp || hasMoveDown) && React__default.createElement(MoveDownButton, {
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onArrowDownClick,
    uiSchema: uiSchema,
    registry: registry
  }), hasRemove && React__default.createElement(RemoveButton, {
    disabled: disabled || readonly,
    onClick: onRemoveClick,
    uiSchema: uiSchema,
    registry: registry
  }))));
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
  return React__default.createElement(Box, null, React__default.createElement(ArrayFieldTitleTemplate, {
    idSchema: idSchema,
    title: uiOptions.title || title,
    schema: schema,
    uiSchema: uiSchema,
    required: required,
    registry: registry
  }), React__default.createElement(ArrayFieldDescriptionTemplate, {
    idSchema: idSchema,
    description: uiOptions.description || schema.description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), React__default.createElement(Grid, {
    key: "array-item-list-" + idSchema.$id
  }, React__default.createElement(GridItem, null, items.length > 0 && items.map(function (_ref) {
    var key = _ref.key,
      itemProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);
    return React__default.createElement(ArrayFieldItemTemplate, _extends({
      key: key
    }, itemProps));
  })), canAdd && React__default.createElement(GridItem, {
    justifySelf: "flex-end"
  }, React__default.createElement(Box, {
    mt: 2
  }, React__default.createElement(AddButton, {
    className: "array-item-add",
    onClick: onAddClick,
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  })))));
}

function getChakra(_ref) {
  var _ref$uiSchema = _ref.uiSchema,
    uiSchema = _ref$uiSchema === void 0 ? {} : _ref$uiSchema;
  var chakraProps = uiSchema["ui:options"] && uiSchema["ui:options"].chakra || {};
  Object.keys(chakraProps).forEach(function (key) {
    /**
     * Leveraging `shouldForwardProp` to remove props
     *
     * This is a utility function that's used in `@chakra-ui/react`'s factory function.
     * Normally, it prevents ChakraProps from being passed to the DOM.
     * In this case we just want to delete the unknown props. So we flip the boolean.
     */
    if (shouldForwardProp(key)) {
      delete chakraProps[key];
    }
  });
  return chakraProps;
}

function BaseInputTemplate(props) {
  var id = props.id,
    type = props.type,
    value = props.value,
    label = props.label,
    schema = props.schema,
    uiSchema = props.uiSchema,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    options = props.options,
    required = props.required,
    readonly = props.readonly,
    rawErrors = props.rawErrors,
    autofocus = props.autofocus,
    placeholder = props.placeholder,
    disabled = props.disabled,
    registry = props.registry;
  var inputProps = getInputProps(schema, type, options);
  var chakraProps = getChakra({
    uiSchema: uiSchema
  });
  var schemaUtils = registry.schemaUtils;
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
  var displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema) && (!!label || !!schema.title);
  return React.createElement(FormControl, _extends({
    mb: 1
  }, chakraProps, {
    isDisabled: disabled || readonly,
    isRequired: required,
    isReadOnly: readonly,
    isInvalid: rawErrors && rawErrors.length > 0
  }), displayLabel ? React.createElement(FormLabel, {
    htmlFor: id,
    id: id + "-label"
  }, label || schema.title) : null, React.createElement(Input, _extends({
    id: id,
    name: id,
    value: value || value === 0 ? value : "",
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    autoFocus: autofocus,
    placeholder: placeholder
  }, inputProps, {
    list: schema.examples ? examplesId(id) : undefined,
    "aria-describedby": ariaDescribedByIds(id, !!schema.examples)
  })), Array.isArray(schema.examples) ? React.createElement("datalist", {
    id: examplesId(id)
  }, schema.examples.concat(schema["default"] && !schema.examples.includes(schema["default"]) ? [schema["default"]] : []).map(function (example) {
    return React.createElement("option", {
      key: example,
      value: example
    });
  })) : null);
}

function DescriptionField(_ref) {
  var description = _ref.description,
    id = _ref.id;
  if (!description) {
    return null;
  }
  if (typeof description === "string") {
    return React__default.createElement(Text, {
      id: id,
      mt: 2,
      mb: 4
    }, description);
  }
  return React__default.createElement(React__default.Fragment, null, description);
}

function ErrorList(_ref) {
  var errors = _ref.errors;
  return React__default.createElement(Alert, {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 3,
    status: "error"
  }, React__default.createElement(AlertTitle, null, "Errors"), React__default.createElement(List, null, errors.map(function (error, i) {
    return React__default.createElement(ListItem, {
      key: i
    }, React__default.createElement(ListIcon, {
      as: WarningIcon,
      color: "red.500"
    }), error.stack);
  })));
}

var _excluded = ["icon", "iconType", "uiSchema", "registry"];
function ChakraIconButton(props) {
  var icon = props.icon,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  return React__default.createElement(IconButton, _extends({
    "aria-label": props.title
  }, otherProps, {
    icon: icon
  }));
}
ChakraIconButton.displayName = "ChakraIconButton";
var ChakraIconButton$1 = /*#__PURE__*/React__default.memo(ChakraIconButton);

function MoveDownButton(props) {
  return React__default.createElement(ChakraIconButton$1, _extends({
    title: "Move down"
  }, props, {
    icon: React__default.createElement(ArrowDownIcon, null)
  }));
}
function MoveUpButton(props) {
  return React__default.createElement(ChakraIconButton$1, _extends({
    title: "Move up"
  }, props, {
    icon: React__default.createElement(ArrowUpIcon, null)
  }));
}
function RemoveButton(props) {
  return React__default.createElement(ChakraIconButton$1, _extends({
    title: "Remove"
  }, props, {
    icon: React__default.createElement(DeleteIcon, null)
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
  return React__default.createElement(List, null, errors.map(function (error, i) {
    return React__default.createElement(ListItem, {
      key: i
    }, React__default.createElement(FormErrorMessage, {
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
  return React__default.createElement(FormHelperText, {
    id: id
  }, help);
}

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
    registry = props.registry,
    required = props.required,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors,
    errors = props.errors,
    help = props.help,
    rawDescription = props.rawDescription,
    schema = props.schema,
    uiSchema = props.uiSchema;
  var uiOptions = getUiOptions(uiSchema);
  var WrapIfAdditionalTemplate = getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
  if (hidden) {
    return React__default.createElement("div", {
      style: {
        display: "none"
      }
    }, children);
  }
  return React__default.createElement(WrapIfAdditionalTemplate, {
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
  }, React__default.createElement(FormControl, {
    isRequired: required,
    isInvalid: rawErrors && rawErrors.length > 0
  }, children, displayLabel && rawDescription ? React__default.createElement(Text, {
    mt: 2
  }, rawDescription) : null, errors, help));
}

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
  return React__default.createElement(React__default.Fragment, null, (uiOptions.title || title) && React__default.createElement(TitleFieldTemplate, {
    id: titleId(idSchema),
    title: uiOptions.title || title,
    required: required,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), (uiOptions.description || description) && React__default.createElement(DescriptionFieldTemplate, {
    id: descriptionId(idSchema),
    description: uiOptions.description || description,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  }), React__default.createElement(Grid, {
    gap: description ? 2 : 6,
    mb: 4
  }, properties.map(function (element, index) {
    return element.hidden ? element.content : React__default.createElement(GridItem, {
      key: idSchema.$id + "-" + element.name + "-" + index
    }, element.content);
  }), canExpand(schema, uiSchema, formData) && React__default.createElement(GridItem, {
    justifySelf: "flex-end"
  }, React__default.createElement(AddButton, {
    className: "object-property-expand",
    onClick: onAddClick(schema),
    disabled: disabled || readonly,
    uiSchema: uiSchema,
    registry: registry
  }))));
}

function SubmitButton(_ref) {
  var uiSchema = _ref.uiSchema;
  var _getSubmitButtonOptio = getSubmitButtonOptions(uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    submitButtonProps = _getSubmitButtonOptio.props;
  if (norender) {
    return null;
  }
  return React__default.createElement(Box, {
    marginTop: 3
  }, React__default.createElement(Button, _extends({
    type: "submit",
    variant: "solid"
  }, submitButtonProps), submitText));
}

function TitleField(_ref) {
  var id = _ref.id,
    title = _ref.title;
  return React__default.createElement(Box, {
    id: id,
    mt: 1,
    mb: 4
  }, React__default.createElement(Heading, {
    as: "h5"
  }, title), React__default.createElement(Divider, null));
}

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
    registry = props.registry,
    required = props.required,
    schema = props.schema,
    uiSchema = props.uiSchema;
  // Button templates are not overridden in the uiSchema
  var RemoveButton = registry.templates.ButtonTemplates.RemoveButton;
  var additional = (ADDITIONAL_PROPERTY_FLAG in schema);
  if (!additional) {
    return React__default.createElement("div", {
      className: classNames,
      style: style
    }, children);
  }
  var keyLabel = label + " Key";
  var handleBlur = function handleBlur(_ref) {
    var target = _ref.target;
    return onKeyChange(target.value);
  };
  return React__default.createElement(Grid, {
    key: id + "-key",
    className: classNames,
    style: style,
    alignItems: "center",
    gap: 2
  }, React__default.createElement(GridItem, null, React__default.createElement(FormControl, {
    isRequired: required
  }, React__default.createElement(FormLabel, {
    htmlFor: id + "-key",
    id: id + "-key-label"
  }, keyLabel), React__default.createElement(Input, {
    defaultValue: label,
    disabled: disabled || readonly,
    id: id + "-key",
    name: id + "-key",
    onBlur: !readonly ? handleBlur : undefined,
    type: "text",
    mb: 1
  }))), React__default.createElement(GridItem, null, children), React__default.createElement(GridItem, null, React__default.createElement(RemoveButton, {
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

var rangeOptions = function rangeOptions(start, stop) {
  var options = [];
  for (var i = start; i <= stop; i++) {
    options.push({
      value: i,
      label: pad(i, 2)
    });
  }
  return options;
};
function DateElement(props) {
  var SelectWidget = props.registry.widgets.SelectWidget;
  var value = props.value ? props.value : undefined;
  return React__default.createElement(SelectWidget, _extends({}, props, {
    label: "",
    className: "form-control",
    onChange: function onChange(elemValue) {
      return props.select(props.type, elemValue);
    },
    options: {
      enumOptions: rangeOptions(props.range[0], props.range[1])
    },
    placeholder: props.type,
    schema: {
      type: "integer"
    },
    value: value,
    "aria-describedby": ariaDescribedByIds(props.name)
  }));
}
var readyForChange = function readyForChange(state) {
  return Object.keys(state).every(function (key) {
    return typeof state[key] !== "undefined" && state[key] !== -1;
  });
};
function AltDateWidget(props) {
  var autofocus = props.autofocus,
    disabled = props.disabled,
    id = props.id,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    options = props.options,
    readonly = props.readonly,
    registry = props.registry,
    showTime = props.showTime,
    value = props.value;
  var _useState = useState(parseDateString(value, showTime)),
    state = _useState[0],
    setState = _useState[1];
  useEffect(function () {
    setState(parseDateString(value, showTime));
  }, [showTime, value]);
  var handleChange = function handleChange(property, nextValue) {
    var _extends2;
    var nextState = _extends({}, state, (_extends2 = {}, _extends2[property] = typeof nextValue === "undefined" ? -1 : nextValue, _extends2));
    if (readyForChange(nextState)) {
      onChange(toDateString(nextState, showTime));
    } else {
      setState(nextState);
    }
  };
  var handleNow = function handleNow(event) {
    event.preventDefault();
    if (disabled || readonly) {
      return;
    }
    var nextState = parseDateString(new Date().toJSON(), showTime);
    onChange(toDateString(nextState, showTime));
  };
  var handleClear = function handleClear(event) {
    event.preventDefault();
    if (disabled || readonly) {
      return;
    }
    onChange(undefined);
  };
  var dateElementProps = function dateElementProps() {
    var year = state.year,
      month = state.month,
      day = state.day,
      hour = state.hour,
      minute = state.minute,
      second = state.second;
    var data = [{
      type: "year",
      range: options.yearsRange,
      value: year
    }, {
      type: "month",
      range: [1, 12],
      value: month
    }, {
      type: "day",
      range: [1, 31],
      value: day
    }];
    if (showTime) {
      data.push({
        type: "hour",
        range: [0, 23],
        value: hour
      }, {
        type: "minute",
        range: [0, 59],
        value: minute
      }, {
        type: "second",
        range: [0, 59],
        value: second
      });
    }
    return data;
  };
  return React__default.createElement(Box, null, React__default.createElement(Box, {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justify: "center"
  }, dateElementProps().map(function (elemProps, i) {
    var elemId = id + "_" + elemProps.type;
    return React__default.createElement(Box, {
      key: elemId,
      mr: "2",
      mb: "2"
    }, React__default.createElement(DateElement, _extends({}, props, elemProps, {
      autofocus: autofocus && i === 0,
      disabled: disabled,
      id: elemId,
      name: id,
      onBlur: onBlur,
      onFocus: onFocus,
      readonly: readonly,
      registry: registry,
      select: handleChange,
      value: elemProps.value < 0 ? "" : elemProps.value
    })));
  })), React__default.createElement(Box, {
    display: "flex"
  }, !options.hideNowButton && React__default.createElement(Button, {
    onClick: function onClick(e) {
      return handleNow(e);
    },
    mr: "2"
  }, "Now"), !options.hideClearButton && React__default.createElement(Button, {
    onClick: function onClick(e) {
      return handleClear(e);
    }
  }, "Clear")));
}
AltDateWidget.defaultProps = {
  autofocus: false,
  disabled: false,
  readonly: false,
  showTime: false,
  options: {
    yearsRange: [1900, /*#__PURE__*/new Date().getFullYear() + 2]
  }
};

function AltDateTimeWidget(props) {
  var AltDateWidget = props.registry.widgets.AltDateWidget;
  return React__default.createElement(AltDateWidget, _extends({}, props, {
    showTime: true
  }));
}
AltDateTimeWidget.defaultProps = /*#__PURE__*/_extends({}, AltDateWidget.defaultProps, {
  showTime: true
});

function CheckboxWidget(props) {
  var id = props.id,
    value = props.value,
    disabled = props.disabled,
    readonly = props.readonly,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    label = props.label,
    uiSchema = props.uiSchema,
    schema = props.schema;
  var chakraProps = getChakra({
    uiSchema: uiSchema
  });
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  var required = schemaRequiresTrueValue(schema);
  var _onChange = function _onChange(_ref) {
    var checked = _ref.target.checked;
    return onChange(checked);
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, value);
  };
  return React__default.createElement(FormControl, _extends({
    mb: 1
  }, chakraProps, {
    isRequired: required
  }), React__default.createElement(Checkbox, {
    id: id,
    name: id,
    isChecked: typeof value === "undefined" ? false : value,
    isDisabled: disabled || readonly,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  }, label && React__default.createElement(Text, null, label)));
}

function CheckboxesWidget(props) {
  var id = props.id,
    disabled = props.disabled,
    options = props.options,
    value = props.value,
    readonly = props.readonly,
    _onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    required = props.required,
    label = props.label,
    uiSchema = props.uiSchema,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors,
    schema = props.schema;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var chakraProps = getChakra({
    uiSchema: uiSchema
  });
  var checkboxesValues = Array.isArray(value) ? value : [value];
  var _onBlur = function _onBlur(_ref) {
    var value = _ref.target.value;
    return onBlur(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref2) {
    var value = _ref2.target.value;
    return onFocus(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var row = options ? options.inline : false;
  var selectedIndexes = enumOptionsIndexForValue(value, enumOptions, true);
  return React__default.createElement(FormControl, _extends({
    mb: 1
  }, chakraProps, {
    isDisabled: disabled || readonly,
    isRequired: required,
    isReadOnly: readonly,
    isInvalid: rawErrors && rawErrors.length > 0
  }), React__default.createElement(FormLabel, {
    htmlFor: id,
    id: id + "-label"
  }, label || schema.title), React__default.createElement(CheckboxGroup, {
    onChange: function onChange(option) {
      return _onChange(enumOptionsValueForIndex(option, enumOptions, emptyValue));
    },
    defaultValue: selectedIndexes,
    "aria-describedby": ariaDescribedByIds(id)
  }, React__default.createElement(Stack, {
    direction: row ? "row" : "column"
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var checked = enumOptionsIsSelected(option.value, checkboxesValues);
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    return React__default.createElement(Checkbox, {
      key: index,
      id: optionId(id, index),
      name: id,
      value: String(index),
      isChecked: checked,
      isDisabled: disabled || itemDisabled || readonly,
      onBlur: _onBlur,
      onFocus: _onFocus
    }, option.label && React__default.createElement(Text, null, option.label));
  }))));
}

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
    onFocus = _ref.onFocus,
    uiSchema = _ref.uiSchema;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var chakraProps = getChakra({
    uiSchema: uiSchema
  });
  var _onChange = function _onChange(nextValue) {
    return onChange(enumOptionsValueForIndex(nextValue, enumOptions, emptyValue));
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
  return React__default.createElement(FormControl, _extends({
    mb: 1
  }, chakraProps, {
    isDisabled: disabled || readonly,
    isRequired: required,
    isReadOnly: readonly
  }), React__default.createElement(FormLabel, {
    htmlFor: id,
    id: id + "-label"
  }, label || schema.title), React__default.createElement(RadioGroup, {
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    value: selectedIndex,
    name: id,
    "aria-describedby": ariaDescribedByIds(id)
  }, React__default.createElement(Stack, {
    direction: row ? "row" : "column"
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, index) {
    var itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
    return React__default.createElement(Radio, {
      value: String(index),
      key: index,
      id: optionId(id, index),
      disabled: disabled || itemDisabled || readonly
    }, option.label);
  }))));
}

function RangeWidget(_ref) {
  var value = _ref.value,
    readonly = _ref.readonly,
    disabled = _ref.disabled,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    options = _ref.options,
    schema = _ref.schema,
    uiSchema = _ref.uiSchema,
    onChange = _ref.onChange,
    label = _ref.label,
    id = _ref.id,
    registry = _ref.registry;
  var schemaUtils = registry.schemaUtils;
  var chakraProps = getChakra({
    uiSchema: uiSchema
  });
  var sliderWidgetProps = _extends({
    value: value,
    label: label,
    id: id
  }, rangeSpec(schema));
  var displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema) && (!!label || !!schema.title);
  var _onChange = function _onChange(value) {
    return onChange(value === undefined ? options.emptyValue : value);
  };
  var _onBlur = function _onBlur(_ref2) {
    var value = _ref2.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref3) {
    var value = _ref3.target.value;
    return onFocus(id, value);
  };
  return React__default.createElement(FormControl, _extends({
    mb: 1
  }, chakraProps), displayLabel ? React__default.createElement(FormLabel, {
    htmlFor: id
  }, label || schema.title) : null, React__default.createElement(Slider, _extends({}, sliderWidgetProps, {
    id: id,
    name: id,
    isDisabled: disabled || readonly,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  }), React__default.createElement(SliderTrack, null, React__default.createElement(SliderFilledTrack, null)), React__default.createElement(SliderThumb, null)));
}

function SelectWidget(props) {
  var schema = props.schema,
    id = props.id,
    options = props.options,
    label = props.label,
    placeholder = props.placeholder,
    multiple = props.multiple,
    required = props.required,
    disabled = props.disabled,
    readonly = props.readonly,
    value = props.value,
    autofocus = props.autofocus,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    _props$rawErrors = props.rawErrors,
    rawErrors = _props$rawErrors === void 0 ? [] : _props$rawErrors,
    uiSchema = props.uiSchema;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var chakraProps = getChakra({
    uiSchema: uiSchema
  });
  var _onMultiChange = function _onMultiChange(e) {
    return onChange(enumOptionsValueForIndex(e.map(function (v) {
      return v.value;
    }), enumOptions, emptyValue));
  };
  var _onChange = function _onChange(e) {
    return onChange(enumOptionsValueForIndex(e.value, enumOptions, emptyValue));
  };
  var _onBlur = function _onBlur(_ref) {
    var value = _ref.target.value;
    return onBlur(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _onFocus = function _onFocus(_ref2) {
    var value = _ref2.target.value;
    return onFocus(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var _valueLabelMap = {};
  var displayEnumOptions = Array.isArray(enumOptions) ? enumOptions.map(function (option, index) {
    var value = option.value,
      label = option.label;
    _valueLabelMap[index] = label || String(value);
    return {
      label: label,
      value: String(index),
      isDisabled: Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1
    };
  }) : [];
  var isMultiple = typeof multiple !== "undefined" && Boolean(enumOptions);
  var selectedIndex = enumOptionsIndexForValue(value, enumOptions, isMultiple);
  var formValue = isMultiple ? (selectedIndex || []).map(function (i) {
    return {
      label: _valueLabelMap[i],
      value: i
    };
  }) : {
    label: _valueLabelMap[selectedIndex] || "",
    selectedIndex: selectedIndex
  };
  return React__default.createElement(FormControl, _extends({
    mb: 1
  }, chakraProps, {
    isDisabled: disabled || readonly,
    isRequired: required,
    isReadOnly: readonly,
    isInvalid: rawErrors && rawErrors.length > 0
  }), (label || schema.title) && React__default.createElement(FormLabel, {
    htmlFor: isMultiple ? undefined : id
  }, label || schema.title), React__default.createElement(Select, {
    inputId: id,
    name: id,
    isMulti: isMultiple,
    options: displayEnumOptions,
    placeholder: placeholder,
    closeMenuOnSelect: !isMultiple,
    onBlur: _onBlur,
    onChange: isMultiple ? _onMultiChange : _onChange,
    onFocus: _onFocus,
    autoFocus: autofocus,
    value: formValue,
    "aria-describedby": ariaDescribedByIds(id)
  }));
}

function TextareaWidget(_ref) {
  var id = _ref.id,
    placeholder = _ref.placeholder,
    value = _ref.value,
    label = _ref.label,
    disabled = _ref.disabled,
    autofocus = _ref.autofocus,
    readonly = _ref.readonly,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    onChange = _ref.onChange,
    options = _ref.options,
    schema = _ref.schema,
    uiSchema = _ref.uiSchema,
    required = _ref.required,
    rawErrors = _ref.rawErrors,
    registry = _ref.registry;
  var chakraProps = getChakra({
    uiSchema: uiSchema
  });
  var schemaUtils = registry.schemaUtils;
  var displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema) && (!!label || !!schema.title);
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
  return React__default.createElement(FormControl, _extends({
    mb: 1
  }, chakraProps, {
    isDisabled: disabled || readonly,
    isRequired: required,
    isReadOnly: readonly,
    isInvalid: rawErrors && rawErrors.length > 0
  }), displayLabel ? React__default.createElement(FormLabel, {
    htmlFor: id
  }, label || schema.title) : null, React__default.createElement(Textarea, {
    id: id,
    name: id,
    value: value != null ? value : "",
    placeholder: placeholder,
    autoFocus: autofocus,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  }));
}

function UpDownWidget(props) {
  var id = props.id,
    schema = props.schema,
    uiSchema = props.uiSchema,
    readonly = props.readonly,
    disabled = props.disabled,
    label = props.label,
    value = props.value,
    onChange = props.onChange,
    onBlur = props.onBlur,
    onFocus = props.onFocus,
    rawErrors = props.rawErrors,
    required = props.required,
    registry = props.registry;
  var schemaUtils = registry.schemaUtils;
  var displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema) && (!!label || !!schema.title);
  var chakraProps = getChakra({
    uiSchema: uiSchema
  });
  var _onChange = function _onChange(value) {
    return onChange(value);
  };
  var _onBlur = function _onBlur(_ref) {
    var value = _ref.target.value;
    return onBlur(id, value);
  };
  var _onFocus = function _onFocus(_ref2) {
    var value = _ref2.target.value;
    return onFocus(id, value);
  };
  return React__default.createElement(FormControl, _extends({
    mb: 1
  }, chakraProps, {
    isDisabled: disabled || readonly,
    isRequired: required,
    isReadOnly: readonly,
    isInvalid: rawErrors && rawErrors.length > 0
  }), displayLabel ? React__default.createElement(FormLabel, {
    htmlFor: id
  }, label || schema.title) : null, React__default.createElement(NumberInput, {
    value: value != null ? value : "",
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    "aria-describedby": ariaDescribedByIds(id)
  }, React__default.createElement(NumberInputField, {
    id: id,
    name: id
  }), React__default.createElement(NumberInputStepper, null, React__default.createElement(NumberIncrementStepper, null), React__default.createElement(NumberDecrementStepper, null))));
}

function generateWidgets() {
  return {
    AltDateTimeWidget: AltDateTimeWidget,
    AltDateWidget: AltDateWidget,
    CheckboxWidget: CheckboxWidget,
    CheckboxesWidget: CheckboxesWidget,
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
  return withTheme(generateTheme());
}
var Form = /*#__PURE__*/generateForm();

/**
 *
 * The reason we need this is for ChakraProvider styling in Playground.
 * The User Developer would be responsible for styling with ChakraProvider in their app.
 *
 * Exact duplicate of `@chakra-ui/react`'s `CSSReset` component. Except for the following:
 *
  ```css
    input {
      border-width: revert;
      border-color: revert;
      border-style: revert;
    }
    .array-item > hr {
      margin-top: 16px;
      margin-bottom: 16px;
    }
  ```

  It is located at the bottom of the styles string.
 */
var CSSReset = function CSSReset() {
  return React.createElement(Global, {
    styles: "\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;\n        -moz-osx-font-smoothing: grayscale;\n        touch-action: manipulation;\n      }\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: 'kern';\n      }\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n      main {\n        display: block;\n      }\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n      b,\n      strong {\n        font-weight: bold;\n      }\n      small {\n        font-size: 80%;\n      }\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n      sub {\n        bottom: -0.25em;\n      }\n      sup {\n        top: -0.5em;\n      }\n      img {\n        border-style: none;\n      }\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n      button,\n      input {\n        overflow: visible;\n      }\n      button,\n      select {\n        text-transform: none;\n      }\n      button::-moz-focus-inner,\n      [type=\"button\"]::-moz-focus-inner,\n      [type=\"reset\"]::-moz-focus-inner,\n      [type=\"submit\"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n      progress {\n        vertical-align: baseline;\n      }\n      textarea {\n        overflow: auto;\n      }\n      [type=\"checkbox\"],\n      [type=\"radio\"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n      [type=\"number\"]::-webkit-inner-spin-button,\n      [type=\"number\"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n      input[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n      [type=\"search\"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n      [type=\"search\"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n      details {\n        display: block;\n      }\n      summary {\n        display: list-item;\n      }\n      template {\n        display: none;\n      }\n      [hidden] {\n        display: none !important;\n      }\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n      button {\n        background: transparent;\n        padding: 0;\n      }\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n      textarea {\n        resize: vertical;\n      }\n      button,\n      [role=\"button\"] {\n        cursor: pointer;\n      }\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n      table {\n        border-collapse: collapse;\n      }\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n      }\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {\n        outline: none;\n        box-shadow: none;\n      }\n      select::-ms-expand {\n        display: none;\n      }\n      input {\n        border-width: revert;\n        border-color: revert;\n        border-style: revert;\n      }\n      .array-item > hr {\n        margin-top: 16px;\n        margin-bottom: 16px;\n      }\n    "
  });
};

/**
 * __createChakraFrameProvider is used to ensure that <Global> emotion components
 * can be rendered within an iframe without changing the styles of the parent page.
 * Required for using Chakra UI in the playground.
 *
 * We have to define ChakraFrameProvider in this library, as opposed to the playground,
 * in order to avoid conflicting versions of emotion, which breaks the styling.
 *
 * NOTE: This is an internal component only used by @rjsf/playground (no
 * backwards compatibility guarantees!)
 *
 * From: https://codesandbox.io/s/p98y9o7jz0?file=/src/frame-provider.js:0-650
 * Also see: https://github.com/emotion-js/emotion/issues/760#issuecomment-404353706
 */
var memoizedCreateCacheWithContainer = /*#__PURE__*/weakMemoize(function (container) {
  var newCache = createCache({
    container: container,
    key: "rjsf"
  });
  return newCache;
});
var __createChakraFrameProvider = function __createChakraFrameProvider(props) {
  return function (_ref) {
    var document = _ref.document;
    return React.createElement("div", {
      style: {
        margin: 2
      }
    }, React.createElement(CacheProvider, {
      value: memoizedCreateCacheWithContainer(document.head)
    }, React.createElement(ChakraProvider, {
      resetCSS: false
    }, React.createElement(CSSReset, null), props.children)));
  };
};

export { Form, Templates, Theme, Widgets, __createChakraFrameProvider, Form as default, generateForm, generateTemplates, generateTheme, generateWidgets };
//# sourceMappingURL=chakra-ui.esm.js.map
