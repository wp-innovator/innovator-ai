<?php

namespace WpInnovator\InnovatorAi\Abstracts;

/**
 * Abstract class to handle the seeder classes.
 *
 * @since 1.0.0
 */
abstract class DBSeeder {

    /**
     * Run the seeders of the database.
     *
     * @since 1.0.0
     *
     * @return void
     */
    abstract public function run();
}
