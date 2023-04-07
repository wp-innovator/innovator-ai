/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import { ISettingFormData } from '../../interfaces';
import settingStore from '../../data/settings';
import Button from '../button/Button';

export default function ApiKeyNotConfiguredNotice() {
	const navigate = useNavigate();
	const settings: ISettingFormData = useSelect(
		( select ) => select( settingStore ).getSettings(),
		[]
	);

	return (
		<>
			{
				( settings.enable_ai !== 'yes' || settings.api_key.length === 0 )
					? <div className="mt-5 bg-white shadow-md p-5 max-w-[600px]">
						<h3 className="font-medium text-lg">
							{ __( 'Open AI API key is not configured properly.', 'innovator-ai' ) }
						</h3>
						<p>
							{ __( 'To get your automatic AI content generation tool, you must have to activate your Open AI API key and enable the settings.', 'innovator-ai' ) }
						</p>
						<p>
							<Button
								type="default"
								buttonCustomClass={ 'bg-gradient-to-r from-gradient-from to-gradient-to !border-0 mt-4' }
								textClassName={ 'text-white' } text={ __( 'Go to settings', 'innovator-ai' ) }
								onClick={ () => navigate( '/settings' ) }
								icon={ faCog }
								iconPosition={ 'left' }
								iconCustomClass={ 'text-white' }
							/>
						</p>
					</div>
					: <div className="flex flex-col md:flex-row flex-1">
						<div
							className="md:basis-[50%] mt-5 bg-white shadow-md p-5 flex flex-col justify-center justify-items-center">
							<h3 className="font-medium text-lg text-success">
								{ __( 'AI configuration is successful.', 'innovator-ai' ) }
							</h3>
							<p className="pb-6">
								{ __( 'You can now use your Automatic AI content generation tool.', 'innovator-ai' ) }
							</p>
						</div>
						<div className="md:basis-[50%] mt-5 bg-white shadow-md p-5 md:ml-4">
							<h3 className="font-medium text-lg text-success">
								{ __( 'New content', 'innovator-ai' ) }
							</h3>
							<div className="mt-2">
								{ __( 'Create New post and use our automated AI generated content features.', 'innovator-ai' ) }
							</div>
							<div className="mt-4">
								<a
									href={ innovatorAi.urls.newPost }
									className={ 'px-5 py-3 text-white hover:text-white hover:opacity-75 rounded-md bg-gradient-to-r from-gradient-from to-gradient-to !border-0' }
								>
									<FontAwesomeIcon icon={ faPlusCircle } />
                                    &nbsp;&nbsp;
									{ __( 'Add new post', 'innovator-ai' ) }
								</a>
							</div>
						</div>
					</div>
			}
		</>
	);
}
