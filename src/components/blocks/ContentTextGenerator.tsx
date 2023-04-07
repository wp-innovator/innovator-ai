/**
 * External dependencies.
 */
import { useState } from '@wordpress/element';
import ReactHtmlParser from 'react-html-parser';
import Swal from 'sweetalert2';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import Button from '../button/Button';
import { Input } from '../inputs/Input';
import { defaultConfigTextGenerator, openai, getAppendedSearchString } from '../../utils/open-ai.config';
import { copyToClipboard } from '../../utils/copy-to-clipboard';

export function ContentTextGenerator( {
	defaultText = '',
	onContentGenerated = ( articleContent ) => { },
} ) {
	const [ contentFrom, setContentFrom ] = useState( defaultText );
	const [ generatedContent, setGeneratedContent ] = useState( '' );
	const [ generating, setGenerating ] = useState( false );
	const [ html, setHtml ] = useState( '' );

	const generateContent = async ( e: any ) => {
		e.preventDefault();
		if ( contentFrom.length === 0 ) {
			Swal.fire( {
				title: __( 'Error', 'innovator-ai' ),
				text: __( 'Please give a content hint', 'innovator-ai' ),
				icon: 'error',
				toast: true,
				position: 'bottom',
				showConfirmButton: false,
				timer: 5000,
			} );
			return;
		}

		setGenerating( true );
		await openai.createCompletion( {
			prompt: getAppendedSearchString( contentFrom ),
			...defaultConfigTextGenerator,
		} ).then( ( res: any ) => {
			const generatedArticle = res.data.choices[ 0 ]?.text;

			if ( generatedArticle !== undefined && generatedArticle.length ) {
				setHtml( generatedArticle.replace( /(?:\r\n|\r|\n)/g, '<br>' ) );
				setGeneratedContent( generatedArticle );
				setContentFrom( '' );
				copyToClipboard( generatedArticle );
				Swal.fire( {
					title: __( 'Content generated', 'innovator-ai' ),
					text: __( 'Text copied to clipboard.', 'innovator-ai' ),
					icon: 'success',
					toast: true,
					position: 'bottom',
					showConfirmButton: false,
					timer: 4000,
				} );
				// onContentGenerated(generatedArticle);
			}

			setGenerating( false );
		} ).catch( ( error: any ) => {
			Swal.fire( {
				title: __( 'Error', 'innovator-ai' ),
				text: error?.response?.data?.error?.message ?? error,
				icon: 'error',
				toast: true,
				position: 'bottom',
				showConfirmButton: false,
				timer: 5000,
			} );
			setGenerating( false );
		} );
	};

	return (
		<div className="p-3 pb-28">
			<form onSubmit={ generateContent }>
				<Input
					label={ __( 'Content hint', 'innovator-ai' ) }
					value={ contentFrom }
					className={ 'mb-2' }
					placeholder={ __( 'Enter content hint', 'innovator-ai' ) }
					onChange={ ( { name, value } ) => setContentFrom( value ) }
				/>
				<Button
					type="default"
					isSubmitButton={ true }
					disabled={ generating }
					buttonCustomClass={ 'bg-gradient-to-r from-gradient-from to-gradient-to !border-0 hover:opacity-75' }
					textClassName={ 'text-white' }
					text={ generating ? __( 'Generating…', 'innovator-ai' ) : __( 'Generate AI Content →', 'innovator-ai' ) }
				/>
			</form>

			{
				generatedContent.length > 0 &&
				<div className={ 'mt-4' }>
					<h3 className={ 'font-bold text-xl mb-2' }>
						{ __( 'Generated Content', 'innovator-ai' ) }
                        &nbsp;
						<span className={ 'text-error-dark text-sm font-normal' }>
							{ __( 'Content is already copied to your clipboard', 'innovator-ai' ) }
						</span>
					</h3>
					<div className={ 'bg-slate-100 p-5' }>
						{ ReactHtmlParser( html ) }
					</div>
				</div>
			}
		</div>
	);
}
