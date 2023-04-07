/**
 * Internal dependencies.
 */
import actions from './actions';
import {
	settingsEndpoint,
} from './endpoint';

const resolvers = {
	*getSettings() {
		yield actions.setLoadingSettings( true );
		const path = `${ settingsEndpoint }`;

		// @ts-ignore
		const response = yield actions.fetchFromAPI( path );
		yield actions.setFormData( response );

		return actions.setLoadingSettings( false );
	},
};

export default resolvers;
