/**
 * External dependencies.
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import SettingCard from './SettingCard';
import SettingSubmit from './SettingSubmit';
import { IInputResponse, Input } from '../inputs/Input';
import type { ISettingFormData } from '../../interfaces';
import settingStore from '../../data/settings';
import { searchPrefixPositions, selectOptions } from '../../utils/Select2Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function SettingForm() {
	const dispatch = useDispatch();

	const form: ISettingFormData = useSelect(
		( select ) => select( settingStore ).getSettings(),
		[]
	);

	const loadingSettings: boolean = useSelect(
		( select ) => select( settingStore ).getLoadingSettings(),
		[]
	);

	const onChange = ( input: IInputResponse ) => {
		dispatch( settingStore ).setFormData( {
			...form,
			[ input.name ]: typeof input.value === 'object' ? input.value?.value : input.value,
		} );
	};

	return (
		<form className="mt-10">
			{ loadingSettings ? (
				<SettingCard>
					<div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
					<div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
					<div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
				</SettingCard>
			) : (
				<>
					<SettingCard className="setting-general-info">
						<div className="max-w-[400px]">
							<Input
								type="select"
								label={ __( 'Enable AI', 'innovator-ai' ) }
								id="enable_ai"
								value={ form.enable_ai }
								options={ selectOptions }
								onChange={ onChange }
								isSearchable={ false }
							/>
						</div>

						{
							form.enable_ai === 'yes' &&
							<div>
								<Input
									type="text"
									label={ __( 'Open AI API Key', 'innovator-ai' ) }
									id="api_key"
									placeholder={ __(
										'Enter Open AI API Key, eg: sk-xxxx',
										'innovator-ai'
									) }
									value={ form.api_key }
									onChange={ onChange }
								/>
								<p className="mt-1 text-slate-500">
									<FontAwesomeIcon icon={ faInfoCircle } /> &nbsp;
									{ __( 'Get your API key from ', 'innovator-ai' ) }
									<a href="https://beta.openai.com/account/api-keys" target="_blank" className="text-blue-600" rel="noreferrer">
										https://beta.openai.com/account/api-keys
									</a>
								</p>
							</div>
						}
					</SettingCard>

					<SettingCard className="setting-general-info">
						<div className="max-w-[400px]">
							<Input
								type="select"
								label={ __( 'Search append position (If needs)', 'innovator-ai' ) }
								id="search_append_position"
								value={ form.search_append_position }
								options={ searchPrefixPositions }
								onChange={ onChange }
								isSearchable={ false }
							/>
							<p className="mt-1 text-slate-500">
								<FontAwesomeIcon icon={ faInfoCircle } /> &nbsp;
								{ __( 'Only if you want to append more text on every search query ', 'innovator-ai' ) }
							</p>
						</div>

						{
							form.search_append_position !== undefined &&
							form.search_append_position !== '' &&
							<div>
								<Input
									type="textarea"
									label={ __( 'Search append text', 'innovator-ai' ) }
									id="search_append_text"
									placeholder={ __(
										'Enter appended search texts, eg: Write a unique plagiarism free content.',
										'innovator-ai'
									) }
									value={ form.search_append_text }
									onChange={ onChange }
								/>
							</div>
						}
					</SettingCard>

					<div className="flex justify-end md:hidden">
						<SettingSubmit />
					</div>
				</>
			) }
		</form>
	);
}
