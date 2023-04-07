/**
 * External dependencies
 */
import { useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Layout from '../components/layout/Layout';
import PageHeading from '../components/layout/PageHeading';
import SettingForm from '../components/settings/SettingForm';
import SettingSubmit from '../components/settings/SettingSubmit';

export default function SettingsPage() {
	const navigate = useNavigate();

	const backToDashboard = () => {
		navigate( '/' );
	};

	/**
	 * Get Page Content - Title and New Job button.
	 *
	 * @return JSX.Element
	 */
	const pageTitleContent = (
		<div className="">
			<div className="mr-3 mb-4">
				<button
					onClick={ backToDashboard }
					className="text-gray-dark border-none"
				>
					← { __( 'Back to dashboard', 'innovator-ai' ) }
				</button>
			</div>
			<div className="text-left">
				<PageHeading text={ __( 'Settings', 'innovator-ai' ) } />
			</div>
		</div>
	);

	/**
	 * Get Right Side Content - Create Job form data.
	 */
	const pageRightSideContent = (
		<div className="mt-7 fixed invisible md:visible md:top-28 right-10 z-50">
			<SettingSubmit />
		</div>
	);

	return (
		<Layout
			title={ pageTitleContent }
			slug="settings"
			hasRightSideContent={ true }
			rightSideContent={ pageRightSideContent }
		>
			<SettingForm />
		</Layout>
	);
}
