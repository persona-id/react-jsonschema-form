import { ComponentType } from 'react';
import { FormProps, ThemeProps } from '@rjsf/core';
import { StrictRJSFSchema, RJSFSchema, FormContextType, TemplatesType, RegistryWidgetsType } from '@rjsf/utils';

declare function generateForm<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(): ComponentType<FormProps<T, S, F>>;
declare const _default$3: ComponentType<FormProps<any, RJSFSchema, any>>;

declare function generateTemplates<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(): Partial<TemplatesType<T, S, F>>;
declare const _default$2: Partial<TemplatesType<any, RJSFSchema, any>>;

declare function generateTheme<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(): ThemeProps<T, S, F>;
declare const _default$1: ThemeProps<any, RJSFSchema, any>;

declare function generateWidgets<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(): RegistryWidgetsType<T, S, F>;
declare const _default: RegistryWidgetsType<any, RJSFSchema, any>;

export { _default$3 as Form, _default$2 as Templates, _default$1 as Theme, _default as Widgets, _default$3 as default, generateForm, generateTemplates, generateTheme, generateWidgets };
