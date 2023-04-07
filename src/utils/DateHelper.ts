import { format, subDays, addDays } from 'date-fns';

export function getDefaultFormat() {
	return 'yyyy-MM-dd';
}

export function getCurrentDate( viewFormat: string = getDefaultFormat() ) {
	return format( new Date(), viewFormat );
}

export function getFormattedDate( date: Date, formation = getDefaultFormat() ) {
	try {
		date = new Date( date );
		return format( date, formation );
	} catch ( error ) {
		// Fix for any fall-back date format.
		if ( typeof date === 'object' ) {
			return '';
		}
		return date;
	}
}

export function getSubOrAddDaysDate(
	type: string,
	days: number,
	date = new Date(),
	viewFormat: string = getDefaultFormat()
): string {
	date = date === null ? new Date() : date;
	viewFormat = viewFormat === null ? getDefaultFormat() : viewFormat;

	if ( type === 'sub' ) {
		return format( subDays( date, days ), viewFormat );
	} else if ( type === 'add' ) {
		return format( addDays( date, days ), viewFormat );
	}

	return getCurrentDate();
}
