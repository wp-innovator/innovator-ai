<?php

namespace WpInnovator\InnovatorAi\Setup;

use WpInnovator\InnovatorAi\Common\Keys;
use Exception;

/**
 * Class Installer.
 *
 * Install necessary database tables and options for the plugin.
 */
class Installer {

    /**
     * Run the installer.
     *
     * @since 1.0.0
     *
     * @return void
     * @throws Exception
     */
    public function run(): void {
        // Update the installed version.
        $this->add_version();

        // Run the database seeders.
        $seeder = new \WpInnovator\InnovatorAi\Databases\Seeder\Manager();
        $seeder->run();
    }

    /**
     * Add time and version on DB.
     *
     * @since 1.0.0
     * @since 0.4.1 Fixed #11 - Version Naming.
     *
     * @return void
     */
    public function add_version(): void {
        $installed = get_option( Keys::INNOVATOR_AI_INSTALLED );

        if ( ! $installed ) {
            update_option( Keys::INNOVATOR_AI_INSTALLED, time() );
        }

        update_option( Keys::INNOVATOR_AI_VERSION, INNOVATOR_AI_VERSION );
    }
}
