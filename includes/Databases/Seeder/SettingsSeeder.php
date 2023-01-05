<?php

namespace WpInnovator\InnovatorAi\Databases\Seeder;

use WpInnovator\InnovatorAi\Abstracts\DBSeeder;
use WpInnovator\InnovatorAi\Common\Keys;
use WpInnovator\InnovatorAi\Settings\Setting;

/**
 * Settings Seeder class.
 *
 * Seed the initial settings.
 */
class SettingsSeeder extends DBSeeder {

    /**
     * Run Settings seeder.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function run() {
        // Check if there is already a seeder runs for this plugin.
        $already_seeded = (bool) get_option( Keys::SETTING_SEEDER_RAN, false );
        if ( $already_seeded ) {
            return;
        }

        // Generate settings.
        update_option(
            Setting::SETTING_META_KEY, [
				'enable_ai' => 'no',
				'api_key'   => '',
			], true
        );

        // Update that seeder already runs.
        update_option( Keys::SETTING_SEEDER_RAN, true );
    }
}
