(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@rjsf/core'), require('react'), require('antd/lib/button'), require('antd/lib/col'), require('antd/lib/row'), require('@rjsf/utils'), require('classnames'), require('antd/lib/config-provider/context'), require('antd/lib/input'), require('antd/lib/input-number'), require('antd/lib/alert'), require('antd/lib/list'), require('antd/lib/space'), require('@ant-design/icons/ExclamationCircleOutlined'), require('@ant-design/icons/ArrowDownOutlined'), require('@ant-design/icons/ArrowUpOutlined'), require('@ant-design/icons/DeleteOutlined'), require('@ant-design/icons/PlusCircleOutlined'), require('antd/lib/form'), require('lodash-es/isObject'), require('lodash-es/isNumber'), require('lodash-es/isString'), require('antd/lib/checkbox'), require('dayjs'), require('rc-picker/lib/generate/dayjs'), require('antd/lib/date-picker/generatePicker'), require('antd/lib/radio'), require('antd/lib/slider'), require('antd/lib/select')) :
  typeof define === 'function' && define.amd ? define(['exports', '@rjsf/core', 'react', 'antd/lib/button', 'antd/lib/col', 'antd/lib/row', '@rjsf/utils', 'classnames', 'antd/lib/config-provider/context', 'antd/lib/input', 'antd/lib/input-number', 'antd/lib/alert', 'antd/lib/list', 'antd/lib/space', '@ant-design/icons/ExclamationCircleOutlined', '@ant-design/icons/ArrowDownOutlined', '@ant-design/icons/ArrowUpOutlined', '@ant-design/icons/DeleteOutlined', '@ant-design/icons/PlusCircleOutlined', 'antd/lib/form', 'lodash-es/isObject', 'lodash-es/isNumber', 'lodash-es/isString', 'antd/lib/checkbox', 'dayjs', 'rc-picker/lib/generate/dayjs', 'antd/lib/date-picker/generatePicker', 'antd/lib/radio', 'antd/lib/slider', 'antd/lib/select'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@rjsf/antd"] = {}, global.core, global.React, global.Button, global.Col, global.Row, global.utils, global.classNames, global.context, global.Input, global.InputNumber, global.Alert, global.List, global.Space, global.ExclamationCircleOutlined, global.ArrowDownOutlined, global.ArrowUpOutlined, global.DeleteOutlined, global.PlusCircleOutlined, global.Form$1, global.isObject, global.isNumber, global.isString, global.Checkbox, global.dayjs, global.dayjsGenerateConfig, global.generatePicker, global.Radio, global.Slider, global.Select));
})(this, (function (exports, core, React, Button, Col, Row, utils, classNames, context, Input, InputNumber, Alert, List, Space, ExclamationCircleOutlined, ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, PlusCircleOutlined, Form$1, isObject, isNumber, isString, Checkbox, dayjs, dayjsGenerateConfig, generatePicker, Radio, Slider, Select) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
  var Col__default = /*#__PURE__*/_interopDefaultLegacy(Col);
  var Row__default = /*#__PURE__*/_interopDefaultLegacy(Row);
  var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);
  var Input__default = /*#__PURE__*/_interopDefaultLegacy(Input);
  var InputNumber__default = /*#__PURE__*/_interopDefaultLegacy(InputNumber);
  var Alert__default = /*#__PURE__*/_interopDefaultLegacy(Alert);
  var List__default = /*#__PURE__*/_interopDefaultLegacy(List);
  var Space__default = /*#__PURE__*/_interopDefaultLegacy(Space);
  var ExclamationCircleOutlined__default = /*#__PURE__*/_interopDefaultLegacy(ExclamationCircleOutlined);
  var ArrowDownOutlined__default = /*#__PURE__*/_interopDefaultLegacy(ArrowDownOutlined);
  var ArrowUpOutlined__default = /*#__PURE__*/_interopDefaultLegacy(ArrowUpOutlined);
  var DeleteOutlined__default = /*#__PURE__*/_interopDefaultLegacy(DeleteOutlined);
  var PlusCircleOutlined__default = /*#__PURE__*/_interopDefaultLegacy(PlusCircleOutlined);
  var Form__default = /*#__PURE__*/_interopDefaultLegacy(Form$1);
  var isObject__default = /*#__PURE__*/_interopDefaultLegacy(isObject);
  var isNumber__default = /*#__PURE__*/_interopDefaultLegacy(isNumber);
  var isString__default = /*#__PURE__*/_interopDefaultLegacy(isString);
  var Checkbox__default = /*#__PURE__*/_interopDefaultLegacy(Checkbox);
  var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
  var dayjsGenerateConfig__default = /*#__PURE__*/_interopDefaultLegacy(dayjsGenerateConfig);
  var generatePicker__default = /*#__PURE__*/_interopDefaultLegacy(generatePicker);
  var Radio__default = /*#__PURE__*/_interopDefaultLegacy(Radio);
  var Slider__default = /*#__PURE__*/_interopDefaultLegacy(Slider);
  var Select__default = /*#__PURE__*/_interopDefaultLegacy(Select);

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
    return /*#__PURE__*/React__default["default"].createElement(Row__default["default"], {
      align: toolbarAlign,
      key: "array-item-" + index,
      gutter: rowGutter
    }, /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
      flex: "1"
    }, children), hasToolbar && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
      flex: "192px"
    }, /*#__PURE__*/React__default["default"].createElement(Button__default["default"].Group, {
      style: BTN_GRP_STYLE
    }, (hasMoveUp || hasMoveDown) && /*#__PURE__*/React__default["default"].createElement(MoveUpButton, {
      disabled: disabled || readonly || !hasMoveUp,
      onClick: onReorderClick(index, index - 1),
      style: BTN_STYLE,
      uiSchema: uiSchema,
      registry: registry
    }), (hasMoveUp || hasMoveDown) && /*#__PURE__*/React__default["default"].createElement(MoveDownButton, {
      disabled: disabled || readonly || !hasMoveDown,
      onClick: onReorderClick(index, index + 1),
      style: BTN_STYLE,
      uiSchema: uiSchema,
      registry: registry
    }), hasRemove && /*#__PURE__*/React__default["default"].createElement(RemoveButton, {
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
    var uiOptions = utils.getUiOptions(uiSchema);
    var ArrayFieldDescriptionTemplate = utils.getTemplate("ArrayFieldDescriptionTemplate", registry, uiOptions);
    var ArrayFieldItemTemplate = utils.getTemplate("ArrayFieldItemTemplate", registry, uiOptions);
    var ArrayFieldTitleTemplate = utils.getTemplate("ArrayFieldTitleTemplate", registry, uiOptions);
    // Button templates are not overridden in the uiSchema
    var AddButton = registry.templates.ButtonTemplates.AddButton;
    var _formContext$labelAli = formContext.labelAlign,
      labelAlign = _formContext$labelAli === void 0 ? "right" : _formContext$labelAli,
      _formContext$rowGutte = formContext.rowGutter,
      rowGutter = _formContext$rowGutte === void 0 ? 24 : _formContext$rowGutte;
    return /*#__PURE__*/React__default["default"].createElement(context.ConfigConsumer, null, function (configProps) {
      var getPrefixCls = configProps.getPrefixCls;
      var prefixCls = getPrefixCls("form");
      var labelClsBasic = prefixCls + "-item-label";
      var labelColClassName = classNames__default["default"](labelClsBasic, labelAlign === "left" && labelClsBasic + "-left"
      // labelCol.className,
      );

      return /*#__PURE__*/React__default["default"].createElement("fieldset", {
        className: className,
        id: idSchema.$id
      }, /*#__PURE__*/React__default["default"].createElement(Row__default["default"], {
        gutter: rowGutter
      }, (uiOptions.title || title) && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        className: labelColClassName,
        span: 24
      }, /*#__PURE__*/React__default["default"].createElement(ArrayFieldTitleTemplate, {
        idSchema: idSchema,
        required: required,
        title: uiOptions.title || title,
        schema: schema,
        uiSchema: uiSchema,
        registry: registry
      })), (uiOptions.description || schema.description) && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        span: 24,
        style: DESCRIPTION_COL_STYLE$1
      }, /*#__PURE__*/React__default["default"].createElement(ArrayFieldDescriptionTemplate, {
        description: uiOptions.description || schema.description || "",
        idSchema: idSchema,
        schema: schema,
        uiSchema: uiSchema,
        registry: registry
      })), /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        className: "row array-item-list",
        span: 24
      }, items && items.map(function (_ref) {
        var key = _ref.key,
          itemProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);
        return /*#__PURE__*/React__default["default"].createElement(ArrayFieldItemTemplate, _extends({
          key: key
        }, itemProps));
      })), canAdd && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        span: 24
      }, /*#__PURE__*/React__default["default"].createElement(Row__default["default"], {
        gutter: rowGutter,
        justify: "end"
      }, /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        flex: "192px"
      }, /*#__PURE__*/React__default["default"].createElement(AddButton, {
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
    var inputProps = utils.getInputProps(schema, type, options, false);
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
    var input = inputProps.type === "number" || inputProps.type === "integer" ? /*#__PURE__*/React__default["default"].createElement(InputNumber__default["default"], _extends({
      disabled: disabled || readonlyAsDisabled && readonly,
      id: id,
      name: id,
      onBlur: !readonly ? handleBlur : undefined,
      onChange: !readonly ? handleNumberChange : undefined,
      onFocus: !readonly ? handleFocus : undefined,
      placeholder: placeholder,
      style: INPUT_STYLE$2,
      list: schema.examples ? utils.examplesId(id) : undefined
    }, inputProps, {
      value: value,
      "aria-describedby": utils.ariaDescribedByIds(id, !!schema.examples)
    })) : /*#__PURE__*/React__default["default"].createElement(Input__default["default"], _extends({
      disabled: disabled || readonlyAsDisabled && readonly,
      id: id,
      name: id,
      onBlur: !readonly ? handleBlur : undefined,
      onChange: !readonly ? handleTextChange : undefined,
      onFocus: !readonly ? handleFocus : undefined,
      placeholder: placeholder,
      style: INPUT_STYLE$2,
      list: schema.examples ? utils.examplesId(id) : undefined
    }, inputProps, {
      value: value,
      "aria-describedby": utils.ariaDescribedByIds(id, !!schema.examples)
    }));
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, input, Array.isArray(schema.examples) && /*#__PURE__*/React__default["default"].createElement("datalist", {
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
    if (!description) {
      return null;
    }
    return /*#__PURE__*/React__default["default"].createElement("span", {
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
      return /*#__PURE__*/React__default["default"].createElement(List__default["default"], {
        className: "list-group",
        size: "small"
      }, errors.map(function (error, index) {
        return /*#__PURE__*/React__default["default"].createElement(List__default["default"].Item, {
          key: index
        }, /*#__PURE__*/React__default["default"].createElement(Space__default["default"], null, /*#__PURE__*/React__default["default"].createElement(ExclamationCircleOutlined__default["default"], null), error.stack));
      }));
    };
    return /*#__PURE__*/React__default["default"].createElement(Alert__default["default"], {
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
    return /*#__PURE__*/React__default["default"].createElement(Button__default["default"], _extends({
      type: iconType,
      icon: icon
    }, otherProps));
  }
  function AddButton(props) {
    return /*#__PURE__*/React__default["default"].createElement(IconButton, _extends({
      title: "Add Item"
    }, props, {
      block: true,
      iconType: "primary",
      icon: /*#__PURE__*/React__default["default"].createElement(PlusCircleOutlined__default["default"], null)
    }));
  }
  function MoveDownButton(props) {
    return /*#__PURE__*/React__default["default"].createElement(IconButton, _extends({
      title: "Move down"
    }, props, {
      icon: /*#__PURE__*/React__default["default"].createElement(ArrowDownOutlined__default["default"], null)
    }));
  }
  function MoveUpButton(props) {
    return /*#__PURE__*/React__default["default"].createElement(IconButton, _extends({
      title: "Move up"
    }, props, {
      icon: /*#__PURE__*/React__default["default"].createElement(ArrowUpOutlined__default["default"], null)
    }));
  }
  function RemoveButton(props) {
    // The `block` prop is not part of the `IconButtonProps` defined in the template, so get it from the uiSchema instead
    var options = utils.getUiOptions(props.uiSchema);
    return /*#__PURE__*/React__default["default"].createElement(IconButton, _extends({
      title: "Remove"
    }, props, {
      danger: true,
      block: !!options.block,
      iconType: "primary",
      icon: /*#__PURE__*/React__default["default"].createElement(DeleteOutlined__default["default"], null)
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
    return /*#__PURE__*/React__default["default"].createElement("div", {
      id: id
    }, errors.map(function (error) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
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
    var uiOptions = utils.getUiOptions(uiSchema);
    var WrapIfAdditionalTemplate = utils.getTemplate("WrapIfAdditionalTemplate", registry, uiOptions);
    if (hidden) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "field-hidden"
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
    }, id === "root" ? children : /*#__PURE__*/React__default["default"].createElement(Form__default["default"].Item, {
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
    var uiOptions = utils.getUiOptions(uiSchema);
    var TitleFieldTemplate = utils.getTemplate("TitleFieldTemplate", registry, uiOptions);
    var DescriptionFieldTemplate = utils.getTemplate("DescriptionFieldTemplate", registry, uiOptions);
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
      return utils.getUiOptions(findUiSchema(element)).field;
    };
    var findUiSchemaWidget = function findUiSchemaWidget(element) {
      return utils.getUiOptions(findUiSchema(element)).widget;
    };
    var calculateColSpan = function calculateColSpan(element) {
      var type = findSchemaType(element);
      var field = findUiSchemaField(element);
      var widget = findUiSchemaWidget(element);
      var defaultColSpan = properties.length < 2 ||
      // Single or no field in object.
      type === "object" || type === "array" || widget === "textarea" ? 24 : 12;
      if (isObject__default["default"](colSpan)) {
        var colSpanObj = colSpan;
        if (isString__default["default"](widget)) {
          return colSpanObj[widget];
        }
        if (isString__default["default"](field)) {
          return colSpanObj[field];
        }
        if (isString__default["default"](type)) {
          return colSpanObj[type];
        }
      }
      if (isNumber__default["default"](colSpan)) {
        return colSpan;
      }
      return defaultColSpan;
    };
    return /*#__PURE__*/React__default["default"].createElement(context.ConfigConsumer, null, function (configProps) {
      var getPrefixCls = configProps.getPrefixCls;
      var prefixCls = getPrefixCls("form");
      var labelClsBasic = prefixCls + "-item-label";
      var labelColClassName = classNames__default["default"](labelClsBasic, labelAlign === "left" && labelClsBasic + "-left"
      // labelCol.className,
      );

      return /*#__PURE__*/React__default["default"].createElement("fieldset", {
        id: idSchema.$id
      }, /*#__PURE__*/React__default["default"].createElement(Row__default["default"], {
        gutter: rowGutter
      }, (uiOptions.title || title) && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        className: labelColClassName,
        span: 24
      }, /*#__PURE__*/React__default["default"].createElement(TitleFieldTemplate, {
        id: utils.titleId(idSchema),
        title: uiOptions.title || title,
        required: required,
        schema: schema,
        uiSchema: uiSchema,
        registry: registry
      })), (uiOptions.description || description) && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        span: 24,
        style: DESCRIPTION_COL_STYLE
      }, /*#__PURE__*/React__default["default"].createElement(DescriptionFieldTemplate, {
        id: utils.descriptionId(idSchema),
        description: uiOptions.description || description,
        schema: schema,
        uiSchema: uiSchema,
        registry: registry
      })), properties.filter(function (e) {
        return !e.hidden;
      }).map(function (element) {
        return /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
          key: element.name,
          span: calculateColSpan(element)
        }, element.content);
      })), utils.canExpand(schema, uiSchema, formData) && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        span: 24
      }, /*#__PURE__*/React__default["default"].createElement(Row__default["default"], {
        gutter: rowGutter,
        justify: "end"
      }, /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
        flex: "192px"
      }, /*#__PURE__*/React__default["default"].createElement(AddButton, {
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
    var _getSubmitButtonOptio = utils.getSubmitButtonOptions(uiSchema),
      submitText = _getSubmitButtonOptio.submitText,
      norender = _getSubmitButtonOptio.norender,
      submitButtonProps = _getSubmitButtonOptio.props;
    if (norender) {
      return null;
    }
    return /*#__PURE__*/React__default["default"].createElement(Button__default["default"], _extends({
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
    return title ? /*#__PURE__*/React__default["default"].createElement(context.ConfigConsumer, null, function (configProps) {
      var _classNames;
      var getPrefixCls = configProps.getPrefixCls;
      var prefixCls = getPrefixCls("form");
      var labelClassName = classNames__default["default"]((_classNames = {}, _classNames[prefixCls + "-item-required"] = required, _classNames[prefixCls + "-item-no-colon"] = !colon, _classNames));
      return /*#__PURE__*/React__default["default"].createElement("label", {
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
    var additional = (utils.ADDITIONAL_PROPERTY_FLAG in schema);
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
    // The `block` prop is not part of the `IconButtonProps` defined in the template, so put it into the uiSchema instead
    var uiOptions = uiSchema ? uiSchema[utils.UI_OPTIONS_KEY] : {};
    var buttonUiOptions = _extends({}, uiSchema, (_extends2 = {}, _extends2[utils.UI_OPTIONS_KEY] = _extends({}, uiOptions, {
      block: true
    }), _extends2));
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: classNames,
      style: style
    }, /*#__PURE__*/React__default["default"].createElement(Row__default["default"], {
      align: toolbarAlign,
      gutter: rowGutter
    }, /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
      className: "form-additional",
      flex: "1"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React__default["default"].createElement(Form__default["default"].Item, {
      colon: colon,
      className: "form-group",
      hasFeedback: true,
      htmlFor: id + "-key",
      label: keyLabel,
      labelCol: labelCol,
      required: required,
      style: wrapperStyle,
      wrapperCol: wrapperCol
    }, /*#__PURE__*/React__default["default"].createElement(Input__default["default"], {
      className: "form-control",
      defaultValue: label,
      disabled: disabled || readonlyAsDisabled && readonly,
      id: id + "-key",
      name: id + "-key",
      onBlur: !readonly ? handleBlur : undefined,
      style: INPUT_STYLE$1,
      type: "text"
    })))), /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
      className: "form-additional",
      flex: "1"
    }, children), /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
      flex: "192px"
    }, /*#__PURE__*/React__default["default"].createElement(RemoveButton, {
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
        label: utils.pad(i, 2)
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
    var _useState = React.useState(utils.parseDateString(value, showTime)),
      state = _useState[0],
      setState = _useState[1];
    React.useEffect(function () {
      setState(utils.parseDateString(value, showTime));
    }, [showTime, value]);
    var handleChange = function handleChange(property, nextValue) {
      var _extends2;
      var nextState = _extends({}, state, (_extends2 = {}, _extends2[property] = typeof nextValue === "undefined" ? -1 : nextValue, _extends2));
      if (readyForChange(nextState)) {
        onChange(utils.toDateString(nextState, showTime));
      } else {
        setState(nextState);
      }
    };
    var handleNow = function handleNow(event) {
      event.preventDefault();
      if (disabled || readonly) {
        return;
      }
      var nextState = utils.parseDateString(new Date().toJSON(), showTime);
      onChange(utils.toDateString(nextState, showTime));
    };
    var handleClear = function handleClear(event) {
      event.preventDefault();
      if (disabled || readonly) {
        return;
      }
      onChange(undefined);
    };
    var renderDateElement = function renderDateElement(elemProps) {
      return /*#__PURE__*/React__default["default"].createElement(SelectWidget, {
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
        "aria-describedby": utils.ariaDescribedByIds(id)
      });
    };
    return /*#__PURE__*/React__default["default"].createElement(Row__default["default"], {
      gutter: [Math.floor(rowGutter / 2), Math.floor(rowGutter / 2)]
    }, dateElementProps(state, showTime, options.yearsRange).map(function (elemProps, i) {
      var elemId = id + "_" + elemProps.type;
      return /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
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
    }), !options.hideNowButton && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
      flex: "88px"
    }, /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
      block: true,
      className: "btn-now",
      onClick: handleNow,
      type: "primary"
    }, "Now")), !options.hideClearButton && /*#__PURE__*/React__default["default"].createElement(Col__default["default"], {
      flex: "88px"
    }, /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
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
    return /*#__PURE__*/React__default["default"].createElement(AltDateWidget, _extends({
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
      return onChange(utils.enumOptionsValueForIndex(nextValue, enumOptions, emptyValue));
    };
    var handleBlur = function handleBlur(_ref2) {
      var target = _ref2.target;
      return onBlur(id, utils.enumOptionsValueForIndex(target.value, enumOptions, emptyValue));
    };
    var handleFocus = function handleFocus(_ref3) {
      var target = _ref3.target;
      return onFocus(id, utils.enumOptionsValueForIndex(target.value, enumOptions, emptyValue));
    };
    // Antd's typescript definitions do not contain the following props that are actually necessary and, if provided,
    // they are used, so hacking them in via by spreading `extraProps` on the component to avoid typescript errors
    var extraProps = {
      id: id,
      onBlur: !readonly ? handleBlur : undefined,
      onFocus: !readonly ? handleFocus : undefined
    };
    var selectedIndexes = utils.enumOptionsIndexForValue(value, enumOptions, true);
    return Array.isArray(enumOptions) && enumOptions.length > 0 ? /*#__PURE__*/React__default["default"].createElement(Checkbox__default["default"].Group, _extends({
      disabled: disabled || readonlyAsDisabled && readonly,
      name: id,
      onChange: !readonly ? handleChange : undefined,
      value: selectedIndexes
    }, extraProps, {
      "aria-describedby": utils.ariaDescribedByIds(id)
    }), Array.isArray(enumOptions) && enumOptions.map(function (option, i) {
      return /*#__PURE__*/React__default["default"].createElement("span", {
        key: i
      }, /*#__PURE__*/React__default["default"].createElement(Checkbox__default["default"], {
        id: utils.optionId(id, i),
        name: id,
        autoFocus: i === 0 ? autofocus : false,
        disabled: Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1,
        value: String(i)
      }, option.label), !inline && /*#__PURE__*/React__default["default"].createElement("br", null));
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
    return /*#__PURE__*/React__default["default"].createElement(Checkbox__default["default"], _extends({
      autoFocus: autofocus,
      checked: typeof value === "undefined" ? false : value,
      disabled: disabled || readonlyAsDisabled && readonly,
      id: id,
      name: id,
      onChange: !readonly ? handleChange : undefined
    }, extraProps, {
      "aria-describedby": utils.ariaDescribedByIds(id)
    }), label);
  }

  var DatePicker = /*#__PURE__*/generatePicker__default["default"](dayjsGenerateConfig__default["default"]);

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
    return /*#__PURE__*/React__default["default"].createElement(DatePicker, {
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
      value: value && dayjs__default["default"](value),
      "aria-describedby": utils.ariaDescribedByIds(id)
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
    return /*#__PURE__*/React__default["default"].createElement(DatePicker, {
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
      value: value && dayjs__default["default"](value),
      "aria-describedby": utils.ariaDescribedByIds(id)
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
    return /*#__PURE__*/React__default["default"].createElement(Input__default["default"].Password, {
      disabled: disabled || readonlyAsDisabled && readonly,
      id: id,
      name: id,
      onBlur: !readonly ? handleBlur : undefined,
      onChange: !readonly ? handleChange : undefined,
      onFocus: !readonly ? handleFocus : undefined,
      placeholder: placeholder,
      value: value || "",
      "aria-describedby": utils.ariaDescribedByIds(id)
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
      return onChange(utils.enumOptionsValueForIndex(nextValue, enumOptions, emptyValue));
    };
    var handleBlur = function handleBlur(_ref3) {
      var target = _ref3.target;
      return onBlur(id, utils.enumOptionsValueForIndex(target.value, enumOptions, emptyValue));
    };
    var handleFocus = function handleFocus(_ref4) {
      var target = _ref4.target;
      return onFocus(id, utils.enumOptionsValueForIndex(target.value, enumOptions, emptyValue));
    };
    var selectedIndexes = utils.enumOptionsIndexForValue(value, enumOptions);
    return /*#__PURE__*/React__default["default"].createElement(Radio__default["default"].Group, {
      disabled: disabled || readonlyAsDisabled && readonly,
      id: id,
      name: id,
      onChange: !readonly ? handleChange : undefined,
      onBlur: !readonly ? handleBlur : undefined,
      onFocus: !readonly ? handleFocus : undefined,
      value: selectedIndexes,
      "aria-describedby": utils.ariaDescribedByIds(id)
    }, Array.isArray(enumOptions) && enumOptions.map(function (option, i) {
      return /*#__PURE__*/React__default["default"].createElement(Radio__default["default"], {
        id: utils.optionId(id, i),
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
    var _rangeSpec = utils.rangeSpec(schema),
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
    return /*#__PURE__*/React__default["default"].createElement(Slider__default["default"], _extends({
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
      "aria-describedby": utils.ariaDescribedByIds(id)
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
      return onChange(utils.enumOptionsValueForIndex(nextValue, enumOptions, emptyValue));
    };
    var handleBlur = function handleBlur() {
      return onBlur(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
    };
    var handleFocus = function handleFocus() {
      return onFocus(id, utils.enumOptionsValueForIndex(value, enumOptions, emptyValue));
    };
    var filterOption = function filterOption(input, option) {
      if (option && isString__default["default"](option.label)) {
        // labels are strings in this context
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }
      return false;
    };
    var getPopupContainer = function getPopupContainer(node) {
      return node.parentNode;
    };
    var selectedIndexes = utils.enumOptionsIndexForValue(value, enumOptions, multiple);
    // Antd's typescript definitions do not contain the following props that are actually necessary and, if provided,
    // they are used, so hacking them in via by spreading `extraProps` on the component to avoid typescript errors
    var extraProps = {
      name: id
    };
    return /*#__PURE__*/React__default["default"].createElement(Select__default["default"], _extends({
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
      "aria-describedby": utils.ariaDescribedByIds(id)
    }), Array.isArray(enumOptions) && enumOptions.map(function (_ref2, index) {
      var optionValue = _ref2.value,
        optionLabel = _ref2.label;
      return /*#__PURE__*/React__default["default"].createElement(Select__default["default"].Option, {
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
    return /*#__PURE__*/React__default["default"].createElement(Input__default["default"].TextArea, _extends({
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
      "aria-describedby": utils.ariaDescribedByIds(id)
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
    return core.withTheme(generateTheme());
  }
  var Form = /*#__PURE__*/generateForm();

  exports.Form = Form;
  exports.Templates = index$1;
  exports.Theme = Theme;
  exports.Widgets = index;
  exports["default"] = Form;
  exports.generateForm = generateForm;
  exports.generateTemplates = generateTemplates;
  exports.generateTheme = generateTheme;
  exports.generateWidgets = generateWidgets;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=antd.umd.development.js.map
