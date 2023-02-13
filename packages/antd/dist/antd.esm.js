import { withTheme } from '@rjsf/core';
import React, { useState, useEffect } from 'react';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import { getUiOptions, getTemplate, getInputProps, ariaDescribedByIds, examplesId, errorId, titleId, descriptionId, canExpand, getSubmitButtonOptions, UI_OPTIONS_KEY, ADDITIONAL_PROPERTY_FLAG, parseDateString, toDateString, pad, enumOptionsIndexForValue, optionId, enumOptionsValueForIndex, rangeSpec } from '@rjsf/utils';
import classNames from 'classnames';
import { ConfigConsumer } from 'antd/es/config-provider/context';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import Alert from 'antd/es/alert';
import List from 'antd/es/list';
import Space from 'antd/es/space';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import Form$1 from 'antd/es/form';
import isObject from 'lodash-es/isObject';
import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
import Checkbox from 'antd/es/checkbox';
import dayjs from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import Radio from 'antd/es/radio';
import Slider from 'antd/es/slider';
import Select from 'antd/es/select';

var BTN_GRP_STYLE = {
  width: "100%"
};
var BTN_STYLE = {
  width: "calc(100% / 3)"
};
/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldItemTemplate(props) {
  var children = props.children,
    disabled = props.disabled,
    hasMoveDown = props.hasMoveDown,
    hasMoveUp = props.hasMoveUp,
    hasRemove = props.hasRemove,
    hasToolbar = props.hasToolbar,
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
  var _registry$formContext = registry.formContext,
    _registry$formContext2 = _registry$formContext.rowGutter,
    rowGutter = _registry$formContext2 === void 0 ? 24 : _registry$formContext2,
    _registry$formContext3 = _registry$formContext.toolbarAlign,
    toolbarAlign = _registry$formContext3 === void 0 ? "top" : _registry$formContext3;
  return /*#__PURE__*/React.createElement(Row, {
    align: toolbarAlign,
    key: "array-item-" + index,
    gutter: rowGutter
  }, /*#__PURE__*/React.createElement(Col, {
    flex: "1"
  }, children), hasToolbar && /*#__PURE__*/React.createElement(Col, {
    flex: "192px"
  }, /*#__PURE__*/React.createElement(Button.Group, {
    style: BTN_GRP_STYLE
  }, (hasMoveUp || hasMoveDown) && /*#__PURE__*/React.createElement(MoveUpButton, {
    disabled: disabled || readonly || !hasMoveUp,
    onClick: onReorderClick(index, index - 1),
    style: BTN_STYLE,
    uiSchema: uiSchema,
    registry: registry
  }), (hasMoveUp || hasMoveDown) && /*#__PURE__*/React.createElement(MoveDownButton, {
    disabled: disabled || readonly || !hasMoveDown,
    onClick: onReorderClick(index, index + 1),
    style: BTN_STYLE,
    uiSchema: uiSchema,
    registry: registry
  }), hasRemove && /*#__PURE__*/React.createElement(RemoveButton, {
    disabled: disabled || readonly,
    onClick: onDropIndexClick(index),
    style: BTN_STYLE,
    uiSchema: uiSchema,
    registry: registry
  }))));
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

var _excluded$1 = ["key"];
var DESCRIPTION_COL_STYLE$1 = {
  paddingBottom: "8px"
};
/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
function ArrayFieldTemplate(props) {
  var canAdd = props.canAdd,
    className = props.className,
    disabled = props.disabled,
    formContext = props.formContext,
    idSchema = props.idSchema,
    items = props.items,
    onAddClick = props.onAddClick,
    readonly = props.readonly,
    registry = props.registry,
    required = props.required,
    schema = props.schema,
    title = props.title,
    uiSchema = props.uiSchema;
  var uiOptions = getUiOptions(uiSchema);
  var ArrayFieldDescriptionTemplate = getTemplate("ArrayFieldDescriptionTemplate", registry, uiOptions);
  var ArrayFieldItemTemplate = getTemplate("ArrayFieldItemTemplate", registry, uiOptions);
  var ArrayFieldTitleTemplate = getTemplate("ArrayFieldTitleTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  var _formContext$labelAli = formContext.labelAlign,
    labelAlign = _formContext$labelAli === void 0 ? "right" : _formContext$labelAli,
    _formContext$rowGutte = formContext.rowGutter,
    rowGutter = _formContext$rowGutte === void 0 ? 24 : _formContext$rowGutte;
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (configProps) {
    var getPrefixCls = configProps.getPrefixCls;
    var prefixCls = getPrefixCls("form");
    var labelClsBasic = prefixCls + "-item-label";
    var labelColClassName = classNames(labelClsBasic, labelAlign === "left" && labelClsBasic + "-left"
    // labelCol.className,
    );

    return /*#__PURE__*/React.createElement("fieldset", {
      className: className,
      id: idSchema.$id
    }, /*#__PURE__*/React.createElement(Row, {
      gutter: rowGutter
    }, (uiOptions.title || title) && /*#__PURE__*/React.createElement(Col, {
      className: labelColClassName,
      span: 24
    }, /*#__PURE__*/React.createElement(ArrayFieldTitleTemplate, {
      idSchema: idSchema,
      required: required,
      title: uiOptions.title || title,
      schema: schema,
      uiSchema: uiSchema,
      registry: registry
    })), (uiOptions.description || schema.description) && /*#__PURE__*/React.createElement(Col, {
      span: 24,
      style: DESCRIPTION_COL_STYLE$1
    }, /*#__PURE__*/React.createElement(ArrayFieldDescriptionTemplate, {
      description: uiOptions.description || schema.description || "",
      idSchema: idSchema,
      schema: schema,
      uiSchema: uiSchema,
      registry: registry
    })), /*#__PURE__*/React.createElement(Col, {
      className: "row array-item-list",
      span: 24
    }, items && items.map(function (_ref) {
      var key = _ref.key,
        itemProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);
      return /*#__PURE__*/React.createElement(ArrayFieldItemTemplate, _extends({
        key: key
      }, itemProps));
    })), canAdd && /*#__PURE__*/React.createElement(Col, {
      span: 24
    }, /*#__PURE__*/React.createElement(Row, {
      gutter: rowGutter,
      justify: "end"
    }, /*#__PURE__*/React.createElement(Col, {
      flex: "192px"
    }, /*#__PURE__*/React.createElement(AddButton, {
      className: "array-item-add",
      disabled: disabled || readonly,
      onClick: onAddClick,
      uiSchema: uiSchema,
      registry: registry
    }))))));
  });
}

var INPUT_STYLE$2 = {
  width: "100%"
};
/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
function BaseInputTemplate(props) {
  var disabled = props.disabled,
    formContext = props.formContext,
    id = props.id,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    options = props.options,
    placeholder = props.placeholder,
    readonly = props.readonly,
    schema = props.schema,
    value = props.value,
    type = props.type;
  var inputProps = getInputProps(schema, type, options, false);
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var handleNumberChange = function handleNumberChange(nextValue) {
    return onChange(nextValue);
  };
  var handleTextChange = function handleTextChange(_ref) {
    var target = _ref.target;
    return onChange(target.value === "" ? options.emptyValue : target.value);
  };
  var handleBlur = function handleBlur(_ref2) {
    var target = _ref2.target;
    return onBlur(id, target.value);
  };
  var handleFocus = function handleFocus(_ref3) {
    var target = _ref3.target;
    return onFocus(id, target.value);
  };
  var input = inputProps.type === "number" || inputProps.type === "integer" ? /*#__PURE__*/React.createElement(InputNumber, _extends({
    disabled: disabled || readonlyAsDisabled && readonly,
    id: id,
    name: id,
    onBlur: !readonly ? handleBlur : undefined,
    onChange: !readonly ? handleNumberChange : undefined,
    onFocus: !readonly ? handleFocus : undefined,
    placeholder: placeholder,
    style: INPUT_STYLE$2,
    list: schema.examples ? examplesId(id) : undefined
  }, inputProps, {
    value: value,
    "aria-describedby": ariaDescribedByIds(id, !!schema.examples)
  })) : /*#__PURE__*/React.createElement(Input, _extends({
    disabled: disabled || readonlyAsDisabled && readonly,
    id: id,
    name: id,
    onBlur: !readonly ? handleBlur : undefined,
    onChange: !readonly ? handleTextChange : undefined,
    onFocus: !readonly ? handleFocus : undefined,
    placeholder: placeholder,
    style: INPUT_STYLE$2,
    list: schema.examples ? examplesId(id) : undefined
  }, inputProps, {
    value: value,
    "aria-describedby": ariaDescribedByIds(id, !!schema.examples)
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, input, Array.isArray(schema.examples) && /*#__PURE__*/React.createElement("datalist", {
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
  return /*#__PURE__*/React.createElement("span", {
    id: id
  }, description);
}

/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
function ErrorList(_ref) {
  var errors = _ref.errors;
  var renderErrors = function renderErrors() {
    return /*#__PURE__*/React.createElement(List, {
      className: "list-group",
      size: "small"
    }, errors.map(function (error, index) {
      return /*#__PURE__*/React.createElement(List.Item, {
        key: index
      }, /*#__PURE__*/React.createElement(Space, null, /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null), error.stack));
    }));
  };
  return /*#__PURE__*/React.createElement(Alert, {
    className: "panel panel-danger errors",
    description: renderErrors(),
    message: "Errors",
    type: "error"
  });
}

var _excluded = ["iconType", "icon", "uiSchema", "registry"];
function IconButton(props) {
  var _props$iconType = props.iconType,
    iconType = _props$iconType === void 0 ? "default" : _props$iconType,
    icon = props.icon,
    otherProps = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/React.createElement(Button, _extends({
    type: iconType,
    icon: icon
  }, otherProps));
}
function AddButton(props) {
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    title: "Add Item"
  }, props, {
    block: true,
    iconType: "primary",
    icon: /*#__PURE__*/React.createElement(PlusCircleOutlined, null)
  }));
}
function MoveDownButton(props) {
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    title: "Move down"
  }, props, {
    icon: /*#__PURE__*/React.createElement(ArrowDownOutlined, null)
  }));
}
function MoveUpButton(props) {
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    title: "Move up"
  }, props, {
    icon: /*#__PURE__*/React.createElement(ArrowUpOutlined, null)
  }));
}
function RemoveButton(props) {
  // The `block` prop is not part of the `IconButtonProps` defined in the template, so get it from the uiSchema instead
  var options = getUiOptions(props.uiSchema);
  return /*#__PURE__*/React.createElement(IconButton, _extends({
    title: "Remove"
  }, props, {
    danger: true,
    block: !!options.block,
    iconType: "primary",
    icon: /*#__PURE__*/React.createElement(DeleteOutlined, null)
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
  return /*#__PURE__*/React.createElement("div", {
    id: id
  }, errors.map(function (error) {
    return /*#__PURE__*/React.createElement("div", {
      key: "field-" + id + "-error-" + error
    }, error);
  }));
}

var VERTICAL_LABEL_COL$1 = {
  span: 24
};
var VERTICAL_WRAPPER_COL$1 = {
  span: 24
};
/** The `FieldTemplate` component is the template used by `SchemaField` to render any field. It renders the field
 * content, (label, description, children, errors and help) inside of a `WrapIfAdditional` component.
 *
 * @param props - The `FieldTemplateProps` for this component
 */
function FieldTemplate(props) {
  var children = props.children,
    classNames = props.classNames,
    style = props.style,
    description = props.description,
    disabled = props.disabled,
    displayLabel = props.displayLabel,
    errors = props.errors,
    formContext = props.formContext,
    help = props.help,
    hidden = props.hidden,
    id = props.id,
    label = props.label,
    onDropPropertyClick = props.onDropPropertyClick,
    onKeyChange = props.onKeyChange,
    rawErrors = props.rawErrors,
    rawDescription = props.rawDescription,
    rawHelp = props.rawHelp,
    readonly = props.readonly,
    registry = props.registry,
    required = props.required,
    schema = props.schema,
    uiSchema = props.uiSchema;
  var colon = formContext.colon,
    _formContext$labelCol = formContext.labelCol,
    labelCol = _formContext$labelCol === void 0 ? VERTICAL_LABEL_COL$1 : _formContext$labelCol,
    _formContext$wrapperC = formContext.wrapperCol,
    wrapperCol = _formContext$wrapperC === void 0 ? VERTICAL_WRAPPER_COL$1 : _formContext$wrapperC,
    wrapperStyle = formContext.wrapperStyle;
  var uiOptions = getUiOptions(uiSchema);
  var WrapIfAdditionalTemplate = getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
  if (hidden) {
    return /*#__PURE__*/React.createElement("div", {
      className: "field-hidden"
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
  }, id === "root" ? children : /*#__PURE__*/React.createElement(Form$1.Item, {
    colon: colon,
    extra: rawDescription && description,
    hasFeedback: schema.type !== "array" && schema.type !== "object",
    help: !!rawHelp && help || (rawErrors !== null && rawErrors !== void 0 && rawErrors.length ? errors : undefined),
    htmlFor: id,
    label: displayLabel && label,
    labelCol: labelCol,
    required: required,
    style: wrapperStyle,
    validateStatus: rawErrors !== null && rawErrors !== void 0 && rawErrors.length ? "error" : undefined,
    wrapperCol: wrapperCol
  }, children));
}

var DESCRIPTION_COL_STYLE = {
  paddingBottom: "8px"
};
/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
function ObjectFieldTemplate(props) {
  var description = props.description,
    disabled = props.disabled,
    formContext = props.formContext,
    formData = props.formData,
    idSchema = props.idSchema,
    onAddClick = props.onAddClick,
    properties = props.properties,
    readonly = props.readonly,
    required = props.required,
    registry = props.registry,
    schema = props.schema,
    title = props.title,
    uiSchema = props.uiSchema;
  var uiOptions = getUiOptions(uiSchema);
  var TitleFieldTemplate = getTemplate("TitleFieldTemplate", registry, uiOptions);
  var DescriptionFieldTemplate = getTemplate("DescriptionFieldTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  var AddButton = registry.templates.ButtonTemplates.AddButton;
  var _formContext$colSpan = formContext.colSpan,
    colSpan = _formContext$colSpan === void 0 ? 24 : _formContext$colSpan,
    _formContext$labelAli = formContext.labelAlign,
    labelAlign = _formContext$labelAli === void 0 ? "right" : _formContext$labelAli,
    _formContext$rowGutte = formContext.rowGutter,
    rowGutter = _formContext$rowGutte === void 0 ? 24 : _formContext$rowGutte;
  var findSchema = function findSchema(element) {
    return element.content.props.schema;
  };
  var findSchemaType = function findSchemaType(element) {
    return findSchema(element).type;
  };
  var findUiSchema = function findUiSchema(element) {
    return element.content.props.uiSchema;
  };
  var findUiSchemaField = function findUiSchemaField(element) {
    return getUiOptions(findUiSchema(element)).field;
  };
  var findUiSchemaWidget = function findUiSchemaWidget(element) {
    return getUiOptions(findUiSchema(element)).widget;
  };
  var calculateColSpan = function calculateColSpan(element) {
    var type = findSchemaType(element);
    var field = findUiSchemaField(element);
    var widget = findUiSchemaWidget(element);
    var defaultColSpan = properties.length < 2 ||
    // Single or no field in object.
    type === "object" || type === "array" || widget === "textarea" ? 24 : 12;
    if (isObject(colSpan)) {
      var colSpanObj = colSpan;
      if (isString(widget)) {
        return colSpanObj[widget];
      }
      if (isString(field)) {
        return colSpanObj[field];
      }
      if (isString(type)) {
        return colSpanObj[type];
      }
    }
    if (isNumber(colSpan)) {
      return colSpan;
    }
    return defaultColSpan;
  };
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (configProps) {
    var getPrefixCls = configProps.getPrefixCls;
    var prefixCls = getPrefixCls("form");
    var labelClsBasic = prefixCls + "-item-label";
    var labelColClassName = classNames(labelClsBasic, labelAlign === "left" && labelClsBasic + "-left"
    // labelCol.className,
    );

    return /*#__PURE__*/React.createElement("fieldset", {
      id: idSchema.$id
    }, /*#__PURE__*/React.createElement(Row, {
      gutter: rowGutter
    }, (uiOptions.title || title) && /*#__PURE__*/React.createElement(Col, {
      className: labelColClassName,
      span: 24
    }, /*#__PURE__*/React.createElement(TitleFieldTemplate, {
      id: titleId(idSchema),
      title: uiOptions.title || title,
      required: required,
      schema: schema,
      uiSchema: uiSchema,
      registry: registry
    })), (uiOptions.description || description) && /*#__PURE__*/React.createElement(Col, {
      span: 24,
      style: DESCRIPTION_COL_STYLE
    }, /*#__PURE__*/React.createElement(DescriptionFieldTemplate, {
      id: descriptionId(idSchema),
      description: uiOptions.description || description,
      schema: schema,
      uiSchema: uiSchema,
      registry: registry
    })), properties.filter(function (e) {
      return !e.hidden;
    }).map(function (element) {
      return /*#__PURE__*/React.createElement(Col, {
        key: element.name,
        span: calculateColSpan(element)
      }, element.content);
    })), canExpand(schema, uiSchema, formData) && /*#__PURE__*/React.createElement(Col, {
      span: 24
    }, /*#__PURE__*/React.createElement(Row, {
      gutter: rowGutter,
      justify: "end"
    }, /*#__PURE__*/React.createElement(Col, {
      flex: "192px"
    }, /*#__PURE__*/React.createElement(AddButton, {
      className: "object-property-expand",
      disabled: disabled || readonly,
      onClick: onAddClick(schema),
      uiSchema: uiSchema,
      registry: registry
    })))));
  });
}

/** The `SubmitButton` renders a button that represent the `Submit` action on a form
 */
function SubmitButton(_ref) {
  var uiSchema = _ref.uiSchema;
  var _getSubmitButtonOptio = getSubmitButtonOptions(uiSchema),
    submitText = _getSubmitButtonOptio.submitText,
    norender = _getSubmitButtonOptio.norender,
    submitButtonProps = _getSubmitButtonOptio.props;
  if (norender) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Button, _extends({
    type: "submit"
  }, submitButtonProps, {
    htmlType: "submit"
  }), submitText);
}

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
function TitleField(_ref) {
  var id = _ref.id,
    required = _ref.required,
    registry = _ref.registry,
    title = _ref.title;
  var formContext = registry.formContext;
  var _formContext$colon = formContext.colon,
    colon = _formContext$colon === void 0 ? true : _formContext$colon;
  var labelChildren = title;
  if (colon && typeof title === "string" && title.trim() !== "") {
    labelChildren = title.replace(/[：:]\s*$/, "");
  }
  var handleLabelClick = function handleLabelClick() {
    if (!id) {
      return;
    }
    var control = document.querySelector("[id=\"" + id + "\"]");
    if (control && control.focus) {
      control.focus();
    }
  };
  return title ? /*#__PURE__*/React.createElement(ConfigConsumer, null, function (configProps) {
    var _classNames;
    var getPrefixCls = configProps.getPrefixCls;
    var prefixCls = getPrefixCls("form");
    var labelClassName = classNames((_classNames = {}, _classNames[prefixCls + "-item-required"] = required, _classNames[prefixCls + "-item-no-colon"] = !colon, _classNames));
    return /*#__PURE__*/React.createElement("label", {
      className: labelClassName,
      htmlFor: id,
      onClick: handleLabelClick,
      title: typeof title === "string" ? title : ""
    }, labelChildren);
  }) : null;
}

var VERTICAL_LABEL_COL = {
  span: 24
};
var VERTICAL_WRAPPER_COL = {
  span: 24
};
var INPUT_STYLE$1 = {
  width: "100%"
};
/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
function WrapIfAdditionalTemplate(props) {
  var _extends2;
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
    registry = props.registry,
    schema = props.schema,
    uiSchema = props.uiSchema;
  var _registry$formContext = registry.formContext,
    colon = _registry$formContext.colon,
    _registry$formContext2 = _registry$formContext.labelCol,
    labelCol = _registry$formContext2 === void 0 ? VERTICAL_LABEL_COL : _registry$formContext2,
    _registry$formContext3 = _registry$formContext.readonlyAsDisabled,
    readonlyAsDisabled = _registry$formContext3 === void 0 ? true : _registry$formContext3,
    _registry$formContext4 = _registry$formContext.rowGutter,
    rowGutter = _registry$formContext4 === void 0 ? 24 : _registry$formContext4,
    _registry$formContext5 = _registry$formContext.toolbarAlign,
    toolbarAlign = _registry$formContext5 === void 0 ? "top" : _registry$formContext5,
    _registry$formContext6 = _registry$formContext.wrapperCol,
    wrapperCol = _registry$formContext6 === void 0 ? VERTICAL_WRAPPER_COL : _registry$formContext6,
    wrapperStyle = _registry$formContext.wrapperStyle;
  // Button templates are not overridden in the uiSchema
  var RemoveButton = registry.templates.ButtonTemplates.RemoveButton;
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
  // The `block` prop is not part of the `IconButtonProps` defined in the template, so put it into the uiSchema instead
  var uiOptions = uiSchema ? uiSchema[UI_OPTIONS_KEY] : {};
  var buttonUiOptions = _extends({}, uiSchema, (_extends2 = {}, _extends2[UI_OPTIONS_KEY] = _extends({}, uiOptions, {
    block: true
  }), _extends2));
  return /*#__PURE__*/React.createElement("div", {
    className: classNames,
    style: style
  }, /*#__PURE__*/React.createElement(Row, {
    align: toolbarAlign,
    gutter: rowGutter
  }, /*#__PURE__*/React.createElement(Col, {
    className: "form-additional",
    flex: "1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement(Form$1.Item, {
    colon: colon,
    className: "form-group",
    hasFeedback: true,
    htmlFor: id + "-key",
    label: keyLabel,
    labelCol: labelCol,
    required: required,
    style: wrapperStyle,
    wrapperCol: wrapperCol
  }, /*#__PURE__*/React.createElement(Input, {
    className: "form-control",
    defaultValue: label,
    disabled: disabled || readonlyAsDisabled && readonly,
    id: id + "-key",
    name: id + "-key",
    onBlur: !readonly ? handleBlur : undefined,
    style: INPUT_STYLE$1,
    type: "text"
  })))), /*#__PURE__*/React.createElement(Col, {
    className: "form-additional",
    flex: "1"
  }, children), /*#__PURE__*/React.createElement(Col, {
    flex: "192px"
  }, /*#__PURE__*/React.createElement(RemoveButton, {
    className: "array-item-remove",
    disabled: disabled || readonly,
    onClick: onDropPropertyClick(label),
    uiSchema: buttonUiOptions,
    registry: registry
  }))));
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
    FieldTemplate: FieldTemplate,
    ObjectFieldTemplate: ObjectFieldTemplate,
    TitleFieldTemplate: TitleField,
    WrapIfAdditionalTemplate: WrapIfAdditionalTemplate
  };
}
var index$1 = /*#__PURE__*/generateTemplates();

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
var readyForChange = function readyForChange(state) {
  return Object.values(state).every(function (value) {
    return value !== -1;
  });
};
function dateElementProps(state, time, yearsRange) {
  if (yearsRange === void 0) {
    yearsRange = [1900, new Date().getFullYear() + 2];
  }
  var year = state.year,
    month = state.month,
    day = state.day,
    hour = state.hour,
    minute = state.minute,
    second = state.second;
  var data = [{
    type: "year",
    range: yearsRange,
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
  if (time) {
    data.push({
      type: "hour",
      range: [0, 23],
      value: hour || -1
    }, {
      type: "minute",
      range: [0, 59],
      value: minute || -1
    }, {
      type: "second",
      range: [0, 59],
      value: second || -1
    });
  }
  return data;
}
function AltDateWidget(props) {
  var autofocus = props.autofocus,
    disabled = props.disabled,
    formContext = props.formContext,
    id = props.id,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    options = props.options,
    readonly = props.readonly,
    registry = props.registry,
    showTime = props.showTime,
    value = props.value;
  var SelectWidget = registry.widgets.SelectWidget;
  var _formContext$rowGutte = formContext.rowGutter,
    rowGutter = _formContext$rowGutte === void 0 ? 24 : _formContext$rowGutte;
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
  var renderDateElement = function renderDateElement(elemProps) {
    return /*#__PURE__*/React.createElement(SelectWidget, {
      autofocus: elemProps.autofocus,
      className: "form-control",
      disabled: elemProps.disabled,
      id: elemProps.id,
      name: elemProps.name,
      onBlur: elemProps.onBlur,
      onChange: function onChange(elemValue) {
        return elemProps.select(elemProps.type, elemValue);
      },
      onFocus: elemProps.onFocus,
      options: {
        enumOptions: rangeOptions(elemProps.range[0], elemProps.range[1])
      },
      placeholder: elemProps.type,
      readonly: elemProps.readonly,
      schema: {
        type: "integer"
      },
      value: elemProps.value,
      registry: registry,
      label: "",
      "aria-describedby": ariaDescribedByIds(id)
    });
  };
  return /*#__PURE__*/React.createElement(Row, {
    gutter: [Math.floor(rowGutter / 2), Math.floor(rowGutter / 2)]
  }, dateElementProps(state, showTime, options.yearsRange).map(function (elemProps, i) {
    var elemId = id + "_" + elemProps.type;
    return /*#__PURE__*/React.createElement(Col, {
      flex: "88px",
      key: elemId
    }, renderDateElement(_extends({}, elemProps, {
      autofocus: autofocus && i === 0,
      disabled: disabled,
      id: elemId,
      name: id,
      onBlur: onBlur,
      onFocus: onFocus,
      readonly: readonly,
      registry: registry,
      select: handleChange,
      // NOTE: antd components accept -1 rather than issue a warning
      // like material-ui, so we need to convert -1 to undefined here.
      value: elemProps.value < 0 ? undefined : elemProps.value
    })));
  }), !options.hideNowButton && /*#__PURE__*/React.createElement(Col, {
    flex: "88px"
  }, /*#__PURE__*/React.createElement(Button, {
    block: true,
    className: "btn-now",
    onClick: handleNow,
    type: "primary"
  }, "Now")), !options.hideClearButton && /*#__PURE__*/React.createElement(Col, {
    flex: "88px"
  }, /*#__PURE__*/React.createElement(Button, {
    block: true,
    className: "btn-clear",
    danger: true,
    onClick: handleClear,
    type: "primary"
  }, "Clear")));
}
AltDateWidget.defaultProps = {
  autofocus: false,
  disabled: false,
  options: {
    yearsRange: [1900, /*#__PURE__*/new Date().getFullYear() + 2]
  },
  readonly: false,
  showTime: false
};

function AltDateTimeWidget(props) {
  var AltDateWidget = props.registry.widgets.AltDateWidget;
  return /*#__PURE__*/React.createElement(AltDateWidget, _extends({
    showTime: true
  }, props));
}
AltDateTimeWidget.defaultProps = /*#__PURE__*/_extends({}, AltDateWidget.defaultProps, {
  showTime: true
});

/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
function CheckboxesWidget(_ref) {
  var autofocus = _ref.autofocus,
    disabled = _ref.disabled,
    formContext = _ref.formContext,
    id = _ref.id,
    onBlur = _ref.onBlur,
    onChange = _ref.onChange,
    onFocus = _ref.onFocus,
    options = _ref.options,
    readonly = _ref.readonly,
    value = _ref.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    inline = options.inline,
    emptyValue = options.emptyValue;
  var handleChange = function handleChange(nextValue) {
    return onChange(enumOptionsValueForIndex(nextValue, enumOptions, emptyValue));
  };
  var handleBlur = function handleBlur(_ref2) {
    var target = _ref2.target;
    return onBlur(id, enumOptionsValueForIndex(target.value, enumOptions, emptyValue));
  };
  var handleFocus = function handleFocus(_ref3) {
    var target = _ref3.target;
    return onFocus(id, enumOptionsValueForIndex(target.value, enumOptions, emptyValue));
  };
  // Antd's typescript definitions do not contain the following props that are actually necessary and, if provided,
  // they are used, so hacking them in via by spreading `extraProps` on the component to avoid typescript errors
  var extraProps = {
    id: id,
    onBlur: !readonly ? handleBlur : undefined,
    onFocus: !readonly ? handleFocus : undefined
  };
  var selectedIndexes = enumOptionsIndexForValue(value, enumOptions, true);
  return Array.isArray(enumOptions) && enumOptions.length > 0 ? /*#__PURE__*/React.createElement(Checkbox.Group, _extends({
    disabled: disabled || readonlyAsDisabled && readonly,
    name: id,
    onChange: !readonly ? handleChange : undefined,
    value: selectedIndexes
  }, extraProps, {
    "aria-describedby": ariaDescribedByIds(id)
  }), Array.isArray(enumOptions) && enumOptions.map(function (option, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i
    }, /*#__PURE__*/React.createElement(Checkbox, {
      id: optionId(id, i),
      name: id,
      autoFocus: i === 0 ? autofocus : false,
      disabled: Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1,
      value: String(i)
    }, option.label), !inline && /*#__PURE__*/React.createElement("br", null));
  })) : null;
}

/** The `CheckBoxWidget` is a widget for rendering boolean properties.
 *  It is typically used to represent a boolean.
 *
 * @param props - The `WidgetProps` for this component
 */
function CheckboxWidget(props) {
  var autofocus = props.autofocus,
    disabled = props.disabled,
    formContext = props.formContext,
    id = props.id,
    label = props.label,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    readonly = props.readonly,
    value = props.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var handleChange = function handleChange(_ref) {
    var target = _ref.target;
    return onChange(target.checked);
  };
  var handleBlur = function handleBlur(_ref2) {
    var target = _ref2.target;
    return onBlur(id, target.checked);
  };
  var handleFocus = function handleFocus(_ref3) {
    var target = _ref3.target;
    return onFocus(id, target.checked);
  };
  // Antd's typescript definitions do not contain the following props that are actually necessary and, if provided,
  // they are used, so hacking them in via by spreading `extraProps` on the component to avoid typescript errors
  var extraProps = {
    onBlur: !readonly ? handleBlur : undefined,
    onFocus: !readonly ? handleFocus : undefined
  };
  return /*#__PURE__*/React.createElement(Checkbox, _extends({
    autoFocus: autofocus,
    checked: typeof value === "undefined" ? false : value,
    disabled: disabled || readonlyAsDisabled && readonly,
    id: id,
    name: id,
    onChange: !readonly ? handleChange : undefined
  }, extraProps, {
    "aria-describedby": ariaDescribedByIds(id)
  }), label);
}

var DatePicker = /*#__PURE__*/generatePicker(dayjsGenerateConfig);

var DATE_PICKER_STYLE$1 = {
  width: "100%"
};
/** The `DateTimeWidget` component uses the `BaseInputTemplate` changing the type to `datetime-local` and transforms
 * the value to/from utc using the appropriate utility functions.
 *
 * @param props - The `WidgetProps` for this component
 */
function DateTimeWidget(props) {
  var disabled = props.disabled,
    formContext = props.formContext,
    id = props.id,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    placeholder = props.placeholder,
    readonly = props.readonly,
    value = props.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var handleChange = function handleChange(nextValue) {
    return onChange(nextValue && nextValue.toISOString());
  };
  var handleBlur = function handleBlur() {
    return onBlur(id, value);
  };
  var handleFocus = function handleFocus() {
    return onFocus(id, value);
  };
  var getPopupContainer = function getPopupContainer(node) {
    return node.parentNode;
  };
  return /*#__PURE__*/React.createElement(DatePicker, {
    disabled: disabled || readonlyAsDisabled && readonly,
    getPopupContainer: getPopupContainer,
    id: id,
    name: id,
    onBlur: !readonly ? handleBlur : undefined,
    onChange: !readonly ? handleChange : undefined,
    onFocus: !readonly ? handleFocus : undefined,
    placeholder: placeholder,
    showTime: true,
    style: DATE_PICKER_STYLE$1,
    value: value && dayjs(value),
    "aria-describedby": ariaDescribedByIds(id)
  });
}

var DATE_PICKER_STYLE = {
  width: "100%"
};
/** The `DateWidget` component uses the `BaseInputTemplate` changing the type to `date` and transforms
 * the value to undefined when it is falsy during the `onChange` handling.
 *
 * @param props - The `WidgetProps` for this component
 */
function DateWidget(props) {
  var disabled = props.disabled,
    formContext = props.formContext,
    id = props.id,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    placeholder = props.placeholder,
    readonly = props.readonly,
    value = props.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var handleChange = function handleChange(nextValue) {
    return onChange(nextValue && nextValue.format("YYYY-MM-DD"));
  };
  var handleBlur = function handleBlur() {
    return onBlur(id, value);
  };
  var handleFocus = function handleFocus() {
    return onFocus(id, value);
  };
  var getPopupContainer = function getPopupContainer(node) {
    return node.parentNode;
  };
  return /*#__PURE__*/React.createElement(DatePicker, {
    disabled: disabled || readonlyAsDisabled && readonly,
    getPopupContainer: getPopupContainer,
    id: id,
    name: id,
    onBlur: !readonly ? handleBlur : undefined,
    onChange: !readonly ? handleChange : undefined,
    onFocus: !readonly ? handleFocus : undefined,
    placeholder: placeholder,
    showTime: false,
    style: DATE_PICKER_STYLE,
    value: value && dayjs(value),
    "aria-describedby": ariaDescribedByIds(id)
  });
}

/** The `PasswordWidget` component uses the `BaseInputTemplate` changing the type to `password`.
 *
 * @param props - The `WidgetProps` for this component
 */
function PasswordWidget(props) {
  var disabled = props.disabled,
    formContext = props.formContext,
    id = props.id,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    options = props.options,
    placeholder = props.placeholder,
    readonly = props.readonly,
    value = props.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var emptyValue = options.emptyValue || "";
  var handleChange = function handleChange(_ref) {
    var target = _ref.target;
    return onChange(target.value === "" ? emptyValue : target.value);
  };
  var handleBlur = function handleBlur(_ref2) {
    var target = _ref2.target;
    return onBlur(id, target.value);
  };
  var handleFocus = function handleFocus(_ref3) {
    var target = _ref3.target;
    return onFocus(id, target.value);
  };
  return /*#__PURE__*/React.createElement(Input.Password, {
    disabled: disabled || readonlyAsDisabled && readonly,
    id: id,
    name: id,
    onBlur: !readonly ? handleBlur : undefined,
    onChange: !readonly ? handleChange : undefined,
    onFocus: !readonly ? handleFocus : undefined,
    placeholder: placeholder,
    value: value || "",
    "aria-describedby": ariaDescribedByIds(id)
  });
}

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function RadioWidget(_ref) {
  var autofocus = _ref.autofocus,
    disabled = _ref.disabled,
    formContext = _ref.formContext,
    id = _ref.id,
    onBlur = _ref.onBlur,
    onChange = _ref.onChange,
    onFocus = _ref.onFocus,
    options = _ref.options,
    readonly = _ref.readonly,
    value = _ref.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var handleChange = function handleChange(_ref2) {
    var nextValue = _ref2.target.value;
    return onChange(enumOptionsValueForIndex(nextValue, enumOptions, emptyValue));
  };
  var handleBlur = function handleBlur(_ref3) {
    var target = _ref3.target;
    return onBlur(id, enumOptionsValueForIndex(target.value, enumOptions, emptyValue));
  };
  var handleFocus = function handleFocus(_ref4) {
    var target = _ref4.target;
    return onFocus(id, enumOptionsValueForIndex(target.value, enumOptions, emptyValue));
  };
  var selectedIndexes = enumOptionsIndexForValue(value, enumOptions);
  return /*#__PURE__*/React.createElement(Radio.Group, {
    disabled: disabled || readonlyAsDisabled && readonly,
    id: id,
    name: id,
    onChange: !readonly ? handleChange : undefined,
    onBlur: !readonly ? handleBlur : undefined,
    onFocus: !readonly ? handleFocus : undefined,
    value: selectedIndexes,
    "aria-describedby": ariaDescribedByIds(id)
  }, Array.isArray(enumOptions) && enumOptions.map(function (option, i) {
    return /*#__PURE__*/React.createElement(Radio, {
      id: optionId(id, i),
      name: id,
      autoFocus: i === 0 ? autofocus : false,
      disabled: Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1,
      key: i,
      value: String(i)
    }, option.label);
  }));
}

/** The `RangeWidget` component uses the `BaseInputTemplate` changing the type to `range` and wrapping the result
 * in a div, with the value along side it.
 *
 * @param props - The `WidgetProps` for this component
 */
function RangeWidget(props) {
  var autofocus = props.autofocus,
    disabled = props.disabled,
    formContext = props.formContext,
    id = props.id,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onFocus = props.onFocus,
    options = props.options,
    placeholder = props.placeholder,
    readonly = props.readonly,
    schema = props.schema,
    value = props.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var _rangeSpec = rangeSpec(schema),
    min = _rangeSpec.min,
    max = _rangeSpec.max,
    step = _rangeSpec.step;
  var emptyValue = options.emptyValue || "";
  var handleChange = function handleChange(nextValue) {
    return onChange(nextValue === "" ? emptyValue : nextValue);
  };
  var handleBlur = function handleBlur() {
    return onBlur(id, value);
  };
  var handleFocus = function handleFocus() {
    return onFocus(id, value);
  };
  // Antd's typescript definitions do not contain the following props that are actually necessary and, if provided,
  // they are used, so hacking them in via by spreading `extraProps` on the component to avoid typescript errors
  var extraProps = {
    placeholder: placeholder,
    onBlur: !readonly ? handleBlur : undefined,
    onFocus: !readonly ? handleFocus : undefined
  };
  return /*#__PURE__*/React.createElement(Slider, _extends({
    autoFocus: autofocus,
    disabled: disabled || readonlyAsDisabled && readonly,
    id: id,
    max: max,
    min: min,
    onChange: !readonly ? handleChange : undefined,
    range: false,
    step: step,
    value: value
  }, extraProps, {
    "aria-describedby": ariaDescribedByIds(id)
  }));
}

var SELECT_STYLE = {
  width: "100%"
};
/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function SelectWidget(_ref) {
  var autofocus = _ref.autofocus,
    disabled = _ref.disabled,
    _ref$formContext = _ref.formContext,
    formContext = _ref$formContext === void 0 ? {} : _ref$formContext,
    id = _ref.id,
    multiple = _ref.multiple,
    onBlur = _ref.onBlur,
    onChange = _ref.onChange,
    onFocus = _ref.onFocus,
    options = _ref.options,
    placeholder = _ref.placeholder,
    readonly = _ref.readonly,
    value = _ref.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var enumOptions = options.enumOptions,
    enumDisabled = options.enumDisabled,
    emptyValue = options.emptyValue;
  var handleChange = function handleChange(nextValue) {
    return onChange(enumOptionsValueForIndex(nextValue, enumOptions, emptyValue));
  };
  var handleBlur = function handleBlur() {
    return onBlur(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var handleFocus = function handleFocus() {
    return onFocus(id, enumOptionsValueForIndex(value, enumOptions, emptyValue));
  };
  var filterOption = function filterOption(input, option) {
    if (option && isString(option.label)) {
      // labels are strings in this context
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    return false;
  };
  var getPopupContainer = function getPopupContainer(node) {
    return node.parentNode;
  };
  var selectedIndexes = enumOptionsIndexForValue(value, enumOptions, multiple);
  // Antd's typescript definitions do not contain the following props that are actually necessary and, if provided,
  // they are used, so hacking them in via by spreading `extraProps` on the component to avoid typescript errors
  var extraProps = {
    name: id
  };
  return /*#__PURE__*/React.createElement(Select, _extends({
    autoFocus: autofocus,
    disabled: disabled || readonlyAsDisabled && readonly,
    getPopupContainer: getPopupContainer,
    id: id,
    mode: typeof multiple !== "undefined" ? "multiple" : undefined,
    onBlur: !readonly ? handleBlur : undefined,
    onChange: !readonly ? handleChange : undefined,
    onFocus: !readonly ? handleFocus : undefined,
    placeholder: placeholder,
    style: SELECT_STYLE,
    value: selectedIndexes
  }, extraProps, {
    filterOption: filterOption,
    "aria-describedby": ariaDescribedByIds(id)
  }), Array.isArray(enumOptions) && enumOptions.map(function (_ref2, index) {
    var optionValue = _ref2.value,
      optionLabel = _ref2.label;
    return /*#__PURE__*/React.createElement(Select.Option, {
      disabled: Array.isArray(enumDisabled) && enumDisabled.indexOf(optionValue) !== -1,
      key: String(index),
      value: String(index)
    }, optionLabel);
  }));
}

var INPUT_STYLE = {
  width: "100%"
};
/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
function TextareaWidget(_ref) {
  var disabled = _ref.disabled,
    formContext = _ref.formContext,
    id = _ref.id,
    onBlur = _ref.onBlur,
    onChange = _ref.onChange,
    onFocus = _ref.onFocus,
    options = _ref.options,
    placeholder = _ref.placeholder,
    readonly = _ref.readonly,
    value = _ref.value;
  var _formContext$readonly = formContext.readonlyAsDisabled,
    readonlyAsDisabled = _formContext$readonly === void 0 ? true : _formContext$readonly;
  var handleChange = function handleChange(_ref2) {
    var target = _ref2.target;
    return onChange(target.value === "" ? options.emptyValue : target.value);
  };
  var handleBlur = function handleBlur(_ref3) {
    var target = _ref3.target;
    return onBlur(id, target.value);
  };
  var handleFocus = function handleFocus(_ref4) {
    var target = _ref4.target;
    return onFocus(id, target.value);
  };
  // Antd's typescript definitions do not contain the following props that are actually necessary and, if provided,
  // they are used, so hacking them in via by spreading `extraProps` on the component to avoid typescript errors
  var extraProps = {
    type: "textarea"
  };
  return /*#__PURE__*/React.createElement(Input.TextArea, _extends({
    disabled: disabled || readonlyAsDisabled && readonly,
    id: id,
    name: id,
    onBlur: !readonly ? handleBlur : undefined,
    onChange: !readonly ? handleChange : undefined,
    onFocus: !readonly ? handleFocus : undefined,
    placeholder: placeholder,
    rows: options.rows || 4,
    style: INPUT_STYLE,
    value: value
  }, extraProps, {
    "aria-describedby": ariaDescribedByIds(id)
  }));
}

function generateWidgets() {
  return {
    AltDateTimeWidget: AltDateTimeWidget,
    AltDateWidget: AltDateWidget,
    CheckboxesWidget: CheckboxesWidget,
    CheckboxWidget: CheckboxWidget,
    DateTimeWidget: DateTimeWidget,
    DateWidget: DateWidget,
    PasswordWidget: PasswordWidget,
    RadioWidget: RadioWidget,
    RangeWidget: RangeWidget,
    SelectWidget: SelectWidget,
    TextareaWidget: TextareaWidget
  };
}
var index = /*#__PURE__*/generateWidgets();

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

export { Form, index$1 as Templates, Theme, index as Widgets, Form as default, generateForm, generateTemplates, generateTheme, generateWidgets };
//# sourceMappingURL=antd.esm.js.map
