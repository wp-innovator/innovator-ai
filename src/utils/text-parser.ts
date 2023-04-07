/**
 * External dependencies
 */
import parse from 'html-react-parser';

export function parseHtml( html: string ) {
	return parse( html );
}
