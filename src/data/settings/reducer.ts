/**
 * Internal dependencies.
 */
import * as Types from './types';
import { settingDefaultState } from './default-state';

const reducer = ( state = settingDefaultState, action: any ) => {
	switch ( action.type ) {
		case Types.GET_SETTINGS_DETAIL:
			return {
				...state,
				form: action.form,
			};

		case Types.SET_SETTINGS_LOADING:
			return {
				...state,
				loadingSettings: action.loadingSettings,
			};

		case Types.SET_SETTINGS_FORM_DATA:
			return {
				...state,
				form: action.form,
			};

		case Types.SET_SETTINGS_SAVING:
			return {
				...state,
				settingsSaving: action.settingsSaving,
			};
	}

	return state;
};

export default reducer;
