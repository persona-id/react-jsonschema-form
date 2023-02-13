import * as _rjsf_utils from '@rjsf/utils';
import { StrictRJSFSchema, RJSFSchema, FormContextType, ValidatorType } from '@rjsf/utils';
import Ajv, { Options, ErrorObject } from 'ajv';
import { FormatsPluginOptions } from 'ajv-formats';

/** The type describing how to customize the AJV6 validator
 */
interface CustomValidatorOptionsType {
    /** The list of additional meta schemas that the validator can access */
    additionalMetaSchemas?: ReadonlyArray<object>;
    /** The set of additional custom formats that the validator will support */
    customFormats?: {
        [k: string]: string | RegExp | ((data: string) => boolean);
    };
    /** The set of config overrides that will be passed to the AJV validator constructor on top of the defaults */
    ajvOptionsOverrides?: Options;
    /** The `ajv-format` options to use when adding formats to `ajv`; pass `false` to disable it */
    ajvFormatOptions?: FormatsPluginOptions | false;
    /** The AJV class to construct */
    AjvClass?: typeof Ajv;
}
/** The type describing a function that takes a list of Ajv `ErrorObject`s and localizes them
 */
type Localizer = (errors?: null | ErrorObject[]) => void;

/** Creates and returns a customized implementation of the `ValidatorType` with the given customization `options` if
 * provided.
 *
 * @param [options={}] - The `CustomValidatorOptionsType` options that are used to create the `ValidatorType` instance
 * @param [localizer] - If provided, is used to localize a list of Ajv `ErrorObject`s
 */
declare function customizeValidator<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(options?: CustomValidatorOptionsType, localizer?: Localizer): ValidatorType<T, S, F>;

declare const _default: _rjsf_utils.ValidatorType<any, _rjsf_utils.RJSFSchema, any>;

export { CustomValidatorOptionsType, Localizer, customizeValidator, _default as default };
