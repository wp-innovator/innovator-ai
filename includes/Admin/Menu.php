<?php

namespace WpInnovator\InnovatorAi\Admin;

/**
 * Admin Menu class.
 *
 * Responsible for managing admin menus.
 */
class Menu {

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {
        add_action( 'admin_menu', [ $this, 'init_menu' ] );
    }

    /**
     * Init Menu.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init_menu(): void {
        global $submenu;

        $slug          = INNOVATOR_AI_SLUG;
        $menu_position = 50;
        $capability    = 'manage_options';
        $logo_icon     = INNOVATOR_AI_ASSETS . '/images/logo-icon.png';

        add_menu_page( esc_attr__( 'Innovator AI', 'innovator-ai' ), esc_attr__( 'Innovator AI', 'innovator-ai' ), $capability, $slug, [ $this, 'plugin_page' ], $logo_icon, $menu_position );

        if ( current_user_can( $capability ) ) {
            $submenu[ $slug ][] = [ esc_attr__( 'Dashboard', 'innovator-ai' ), $capability, 'admin.php?page=' . $slug . '#/' ]; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
            $submenu[ $slug ][] = [ esc_attr__( 'Settings', 'innovator-ai' ), $capability, 'admin.php?page=' . $slug . '#/settings' ]; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
        }
    }

    /**
     * Render the plugin page.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function plugin_page(): void {
        require_once INNOVATOR_AI_TEMPLATE_PATH . '/app.php';
    }
}
