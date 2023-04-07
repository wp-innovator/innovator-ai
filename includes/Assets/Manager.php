<?php

namespace WpInnovator\InnovatorAi\Assets;

use WpInnovator\InnovatorAi\Helpers\Url;

/**
 * Asset Manager class.
 *
 * Responsible for managing all the assets (CSS, JS, Images, Locales).
 */
class Manager {

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {
        add_action( 'init', [ $this, 'register_all_scripts' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
    }

    /**
     * Register all scripts and styles.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function register_all_scripts() {
        $this->register_styles( $this->get_styles() );
        $this->register_scripts( $this->get_scripts() );
        $this->localize_script();
    }

    /**
     * Get all styles.
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function get_styles(): array {
        return [
            'innovator-ai-custom-css' => [
                'src'     => INNOVATOR_AI_ASSETS . '/css/style.css',
                'version' => INNOVATOR_AI_VERSION,
                'deps'    => [],
            ],
            'innovator-ai-css' => [
                'src'     => INNOVATOR_AI_BUILD . '/index.css',
                'version' => INNOVATOR_AI_VERSION,
                'deps'    => [],
            ],
        ];
    }

    /**
     * Get all scripts.
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function get_scripts(): array {
        $dependency = require_once INNOVATOR_AI_DIR . '/build/index.asset.php';

        return [
            'innovator-ai-app' => [
                'src'       => INNOVATOR_AI_BUILD . '/index.js',
                'version'   => $dependency['version'],
                'deps'      => $dependency['dependencies'],
                'in_footer' => true,
            ],
        ];
    }

    /**
     * Register styles.
     *
     * @since 1.0.0
     *
     * @param array $styles
     * @return void
     */
    public function register_styles( array $styles ): void {
        foreach ( $styles as $handle => $style ) {
            wp_register_style( $handle, $style['src'], $style['deps'], $style['version'] );
        }
    }

    /**
     * Register scripts.
     *
     * @since 1.0.0
     *
     * @param array $scripts
     * @return void
     */
    public function register_scripts( array $scripts ): void {
        foreach ( $scripts as $handle => $script ) {
            wp_register_script( $handle, $script['src'], $script['deps'], $script['version'], $script['in_footer'] );
        }
    }

    /**
     * Enqueue admin styles and scripts.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_admin_assets(): void {
        // Check if we are on the admin page and page=innovator-ai
        // or in post page
         if ( Url::is_innovator_ai_page() || Url::is_new_or_edit_post() ) {
             wp_enqueue_style( 'innovator-ai-css' );
             wp_enqueue_script( 'innovator-ai-app' );
         }
    }

    /**
     * Localize script for both frontend and backed.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function localize_script(): void {
        wp_enqueue_style( 'innovator-ai-custom-css' );
        wp_enqueue_script( 'innovatorAi', INNOVATOR_AI_ASSETS . '/js/main.js', filemtime( INNOVATOR_AI_DIR . '/assets/js/main.js' ), true );

        $settings = innovator_ai()->settings->get();
        wp_localize_script( 'innovatorAi',
            'innovatorAi',
            [
                'enableAi'             => $settings['enable_ai'],
                'apiKey'               => $settings['api_key'],
                'searchAppendPosition' => $settings['search_append_position'] ?? '',
                'searchAppendText'     => $settings['search_append_text'] ?? '',
                'urls'                 => [
                    'admin'     => admin_url(),
                    'adminPage' => admin_url( 'admin.php' ),
                    'newPost'   => admin_url( 'post-new.php' ),
                ],
                'images'               => [
                    'logoSm' => INNOVATOR_AI_ASSETS . '/images/logo-sm.png',
                    'logo'   => INNOVATOR_AI_ASSETS . '/images/logo.png',
                ]
            ]
        );
    }
}
