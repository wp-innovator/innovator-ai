/**
 * External dependencies
 */
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import App from './App';
import './data/store';
import './utils/block-toolbar';

// Import the stylesheet for the plugin.
import './style/tailwind.css';
import './style/main.scss';

// Render the App component into the DOM
const InnovatorAiElement = document.getElementById( 'innovator-ai' );

if ( InnovatorAiElement ) {
	render( <App />, InnovatorAiElement );
}
