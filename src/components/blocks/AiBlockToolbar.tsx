/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { toggleFormat } from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */

import { icon } from '../../blocks/text-generator/icon';
import { ContentGenerator } from './ContentGenerator';

export const AiBlockToolbar = ( { isActive, onChange, value } ) => {
	const [ openPreviewModal, setOpenPreviewModal ] = useState( false );

	const onContentGenerated = ( content: string ) => {
		const oldValueText = value.text;
		value.text = `${ oldValueText } ${ content }`;

		for ( let i = 0; i < value.text.length; i++ ) {
			value.formats.push( undefined );
			value.replacements.push( undefined );
		}

		onChange(
			toggleFormat( value, {
				type: 'innovator-ai/generator-button',
			} )
		);
	};

	return (
		<>
			<RichTextToolbarButton
				icon={ icon }
				title={ __( 'AI content', 'innovator-ai' ) }
				onClick={ () => {
					setOpenPreviewModal( true );
				} }
				className={ 'mx-2' }
				isActive={ isActive }
			/>

			<ContentGenerator
				defaultText={ value.text }
				openPreviewModal={ openPreviewModal }
				setOpenPreviewModal={ setOpenPreviewModal }
				onContentGenerated={ onContentGenerated }
			/>
		</>
	);
};
