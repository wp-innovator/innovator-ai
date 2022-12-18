<?php

namespace WpInnovator\InnovatorAi\Abstracts;

/**
 * Database migration class.
 *
 * Abstract class to handle database migration classes.
 */
abstract class DBMigrator {

	/**
	 * Migrate the database table.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 * */
	abstract public static function migrate();
}
