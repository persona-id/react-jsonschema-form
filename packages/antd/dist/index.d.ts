import { ComponentType } from 'react';
import { StrictRJSFSchema, RJSFSchema, FormContextType, TemplatesType, RegistryWidgetsType } from '@rjsf/utils';
import { ThemeProps, FormProps } from '@rjsf/core';

declare function generateTemplates<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(): Partial<TemplatesType<T, S, F>>;
declare const _default$1: Partial<TemplatesType<any, RJSFSchema, any>>;

declare function generateWidgets<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(): RegistryWidgetsType<T, S, F>;
declare const _default: RegistryWidgetsType<any, RJSFSchema, any>;

declare function generateTheme<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(): ThemeProps<T, S, F>;
declare const Theme: ThemeProps<any, RJSFSchema, any>;
declare function generateForm<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(): ComponentType<FormProps<T, S, F>>;
declare const Form: ComponentType<FormProps<any, RJSFSchema, any>>;

export { Form, _default$1 as Templates, Theme, _default as Widgets, Form as default, generateForm, generateTemplates, generateTheme, generateWidgets };
