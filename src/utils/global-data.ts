import { __ } from '@wordpress/i18n';

/**
 * Get global data.
 *
 * @param {string} key
 *
 * @return {Object | string} Global settings related data.
 */
export const getGlobalData = ( key: string = '' ) => {
	const data =
        typeof window?.cart_pulse === 'undefined' ? {} : window?.cart_pulse;

	if ( typeof data === 'undefined' ) {
		return data;
	}

	if ( ! key.length ) {
		return data;
	}

	return data[ key ];
};

/**
 * Check if PRO is enabled or Not.
 *
 * @return {boolean}
 */
export const hasPro = !! getGlobalData( 'hasPro' );

/**
 * Get email frequency units.
 *
 * @return {Array}
 */
export const emailFrequencyUnits = [
	{
		label: __( 'Minute', 'innovator-ai' ),
		value: 'minute',
	},
	{
		label: __( 'Hour', 'innovator-ai' ),
		value: 'hour',
	},
	{
		label: __( 'Day', 'innovator-ai' ),
		value: 'day',
	},
];

/**
 * Default block content.
 */
export const defaultBlockContent = `<!-- wp:paragraph --><p>Start your Email template</p><!-- /wp:paragraph -->`;
