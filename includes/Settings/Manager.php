<?php

namespace WpInnovator\InnovatorAi\Settings;

use WpInnovator\InnovatorAi\Traits\InputSanitizer;
use WP_Error;

class Manager {

	use InputSanitizer;

    /**
     * Get settings.
     *
     * @since 1.0.0
     *
     * @return array|object|null
     */
    public function get() {
        return get_option( Setting::SETTING_META_KEY, $this->get_default_settings() );
    }

    /**
     * Create settings.
     *
     * @since 1.0.0
     *
     * @param array $data
     *
     * @return int|WP_Error $id
     */
    public function create( array $data ): ?array {
        // Prepare setting data for database-insertion.
	    $settings_data = $this->prepare_for_database( $data );

        // Create setting now.
	    $updated = update_option( Setting::SETTING_META_KEY, $settings_data, true );

        if ( ! $updated ) {
            return new WP_Error( 'innovator_ai_settings_save_failed', __( 'Failed to update settings', 'innovator-ai' ) );
        }

        /**
         * Fires after settings has been saved.
         *
         * @since 1.0.0
         *
         * @param array $settings_data
         */
        do_action( 'innovator_ai_settings_saved', $settings_data );

        return $this->get();
    }

	/**
	 * @return string[]
	 */
	public function get_default_settings(): array {
		return [
			'enable_ai' => 'no',
			'api_key'   => '',
			'search_append_position'   => '',
			'search_append_text'   => '',
		];
	}

	private function prepare_for_database( array $data ): array {
		$data = wp_parse_args( $data, $this->get_default_settings() );

		return [
			'enable_ai' => $this->sanitize( $data['enable_ai'], 'text' ),
			'api_key' => $this->sanitize( $data['api_key'], 'text' ),
			'search_append_position' => $this->sanitize( $data['search_append_position'], 'text' ),
			'search_append_text' => $this->sanitize( $data['search_append_text'], 'text' ),
		];
	}
}
