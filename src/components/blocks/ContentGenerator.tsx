/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import Modal from '../modal/Modal';
import { ContentTextGenerator } from './ContentTextGenerator';

export const ContentGenerator = ( {
	defaultText = '',
	openPreviewModal,
	setOpenPreviewModal,
	onContentGenerated = () => {
	},
} ) => {
	return (
		<Modal
			title={ __( 'Generate AI content', 'innovator-ai' ) }
			open={ openPreviewModal }
			setOpen={ setOpenPreviewModal }
			size="large"
		>
			<ContentTextGenerator onContentGenerated={ onContentGenerated } defaultText={ defaultText } />
		</Modal>
	);
};
