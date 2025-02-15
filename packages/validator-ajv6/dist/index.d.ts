import * as _rjsf_utils from '@rjsf/utils';
import { StrictRJSFSchema, RJSFSchema, FormContextType, ValidatorType } from '@rjsf/utils';
import { Options } from 'ajv';

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
}

/** Creates and returns a customized implementation of the `ValidatorType` with the given customization `options` if
 * provided.
 *
 * @param [options={}] - The `CustomValidatorOptionsType` options that are used to create the `ValidatorType` instance
 * @deprecated in favor of the `@rjsf/validator-ajv8
 */
declare function customizeValidator<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(options?: CustomValidatorOptionsType): ValidatorType<T, S, F>;

/** @deprecated in favor of the `@rjsf/validator-ajv8
 */
declare const _default: _rjsf_utils.ValidatorType<any, _rjsf_utils.RJSFSchema, any>;

export { CustomValidatorOptionsType, customizeValidator, _default as default };
