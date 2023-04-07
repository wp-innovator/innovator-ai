
/**
 * External dependencies.
 */
import { registerFormatType } from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { AiBlockToolbar } from '../components/blocks/AiBlockToolbar';

registerFormatType(
	'innovator-ai/generator-button', {
		title: __( 'Innovator AI Content Generator', 'innovator-ai' ),
		tagName: 'b',
		className: null,
		edit: AiBlockToolbar,
	}
);
