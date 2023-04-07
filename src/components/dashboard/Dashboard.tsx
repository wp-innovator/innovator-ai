/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import ApiKeyNotConfiguredNotice from './ApiKeyNotConfigured';
import TestGenerator from './TestGenerator';

const Dashboard = () => {
	return (
		<div className="dashboard mx-8">
			<ApiKeyNotConfiguredNotice />
			<TestGenerator />
		</div>
	);
};

export default Dashboard;
