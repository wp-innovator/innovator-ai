/**
 * Internal dependencies.
 */
import {ISettings} from "../../interfaces";

export const settingDefaultFormData = {
    enable_ai: 'yes',
    api_key: '',
};

export const settingDefaultState: ISettings = {
    loadingSettings: false,
    settingsSaving: false,
    form: {
        ...settingDefaultFormData,
    }
};
