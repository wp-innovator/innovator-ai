/**
 * Internal dependencies.
 */
import { ISettings } from '../../interfaces';

export const settingDefaultFormData = {
	enable_ai: 'yes',
	api_key: '',
	search_append_position: '',
	search_append_text: '',
};

export const settingDefaultState: ISettings = {
	loadingSettings: false,
	settingsSaving: false,
	form: {
		...settingDefaultFormData,
	},
};
