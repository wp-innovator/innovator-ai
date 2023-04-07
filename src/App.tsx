/**
 * External dependencies
 */
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Header from './components/layout/Header';
import routes from './routes';
import settingStore from './data/settings';

const App = () => {
	useSelect(
		( select ) => select( settingStore ).getSettings(),
		[]
	);

	return (
		<HashRouter>
			<div>
				<Header />
				<hr className="wp-header-end" />
				<Routes>
					{ routes.map( ( route, index ) => (
						<Route
							key={ index }
							path={ route.path }
							element={ <route.element /> }
						/>
					) ) }
				</Routes>
			</div>
		</HashRouter>
	);
};

export default App;
