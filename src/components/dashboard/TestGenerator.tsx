/**
 * External dependencies.
 */
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import settingStore from '../../data/settings';
import { ISettingFormData } from '../../interfaces';
import { ContentTextGenerator } from '../blocks/ContentTextGenerator';

export default function TestGenerator() {
	const settings: ISettingFormData = useSelect(
		( select ) => select( settingStore ).getSettings(),
		[]
	);

	return (
		<>
			{
				( settings.enable_ai === 'yes' || settings.api_key.length > 0 ) &&
				<div className="mt-5 bg-white shadow-md p-5">
					<h3 className="font-medium text-lg text-primary border-b border-b-slate-200 pb-5">
						{ __( 'Try demo', 'innovator-ai' ) }
					</h3>

					<div className="mt-0">
						<ContentTextGenerator defaultText={ '' } />
					</div>
				</div>
			}
		</>
	);
}
