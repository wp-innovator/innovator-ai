<?php

namespace WpInnovator\InnovatorAi\Databases\Seeder;

use Exception;

/**
 * Database Seeder class.
 *
 * It'll seed all the seeders.
 */
class Manager {

    /**
     * Run the database seeders.
     *
     * @since 1.0.0
     *
     * @return void
     * @throws Exception
     */
    public function run() {
        $seeder_classes = [
            \WpInnovator\InnovatorAi\Databases\Seeder\SettingsSeeder::class,
        ];

        foreach ( $seeder_classes as $seeder_class ) {
            $seeder = new $seeder_class();
            $seeder->run();
        }
    }
}
