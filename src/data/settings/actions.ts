/**
 * Internal dependencies.
 */
import { IResponseGenerator, ISettingFormData } from '../../interfaces';
import * as Types from './types';
import { settingDefaultFormData } from './default-state';

const actions = {
	setFormData( form: ISettingFormData ) {
		return {
			type: Types.SET_SETTINGS_FORM_DATA,
			form,
		};
	},

	setLoadingSettings( loadingSettings: boolean ) {
		return {
			type: Types.SET_SETTINGS_LOADING,
			loadingSettings,
		};
	},

	setSavingSettings( settingsSaving: boolean ) {
		return {
			type: Types.SET_SETTINGS_SAVING,
			settingsSaving,
		};
	},

	*saveSettings( payload: ISettingFormData ) {
		yield actions.setSavingSettings( true );

		try {
			let response: IResponseGenerator = {};
			response = yield {
				type: Types.SAVE_SETTINGS,
				payload,
			};

			if ( response ) {
				yield actions.setFormData( { ...settingDefaultFormData } );
				yield actions.setSavingSettings( false );
			}
		} catch ( error ) {
			yield actions.setSavingSettings( false );
		}
	},

	fetchFromAPI( path: string ) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},

	fetchFromAPIUnparsed( path: string ) {
		return {
			type: 'FETCH_FROM_API_UNPARSED',
			path,
		};
	},
};

export default actions;
