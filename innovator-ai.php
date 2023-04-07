<?php

/**
 * Plugin Name:       Innovator AI
 * Description:       Your Virtual AI assistant to make your WordPress content automation journey smooth and beautiful using Open AI.
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Version:           1.2.0
 * Author:            Maniruzzaman Akash<manirujjamanakash@gmail.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       innovator-ai
 */

defined( 'ABSPATH' ) || exit;

/**
 * Innovator_Ai class.
 *
 * @class Innovator_Ai The class that holds the entire Innovator_Ai plugin
 */
final class Innovator_Ai {
    /**
     * Plugin version.
     *
     * @var string
     */
    const VERSION = '1.2.0';

    /**
     * Plugin slug.
     *
     * @var string
     *
     * @since 1.0.0
     */
    const SLUG = 'innovator-ai';

    /**
     * Holds various class instances.
     *
     * @var array
     *
     * @since 1.0.0
     */
    private array $container = [];

    /**
     * Constructor for the InnovatorAi class.
     *
     * Sets up all the appropriate hooks and actions within our plugin.
     *
     * @since 1.0.0
     */
    private function __construct() {
        require_once __DIR__ . '/vendor/autoload.php';

        $this->define_constants();

        register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );

        add_action( 'wp_loaded', [ $this, 'flush_rewrite_rules' ] );
        add_action( 'activated_plugin', [ $this, 'activation_redirect' ] );

        $this->init_plugin();
    }

    /**
     * Initializes the innovator_ai() class.
     *
     * Checks for an existing innovator_ai() instance
     * and if it doesn't find one, creates it.
     *
     * @since 1.0.0
     *
     * @return Innovator_Ai|bool
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new innovator_ai();
        }

        return $instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @since 1.0.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @since 1.0.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define the constants.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function define_constants(): void {
        define( 'INNOVATOR_AI_VERSION', self::VERSION );
        define( 'INNOVATOR_AI_SLUG', self::SLUG );
        define( 'INNOVATOR_AI_FILE', __FILE__ );
        define( 'INNOVATOR_AI_DIR', __DIR__ );
        define( 'INNOVATOR_AI_PATH', dirname( INNOVATOR_AI_FILE ) );
        define( 'INNOVATOR_AI_INCLUDES', INNOVATOR_AI_PATH . '/includes' );
        define( 'INNOVATOR_AI_TEMPLATE_PATH', INNOVATOR_AI_PATH . '/templates' );
        define( 'INNOVATOR_AI_URL', plugins_url( '', INNOVATOR_AI_FILE ) );
        define( 'INNOVATOR_AI_BUILD', INNOVATOR_AI_URL . '/build' );
        define( 'INNOVATOR_AI_ASSETS', INNOVATOR_AI_URL . '/assets' );
    }

    /**
     * Load the plugin after all plugins are loaded.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init_plugin(): void {
        $this->includes();
        $this->init_hooks();

        /**
         * Fires after the plugin is loaded.
         *
         * @since 1.0.0
         */
        do_action( 'innovator_ai_loaded' );
    }

    /**
     * Activating the plugin.
     *
     * @since 1.0.0
     *
     * @return void
     * @throws Exception
     */
    public function activate(): void {
        // Run the installer to create necessary migrations and seeders.
        $this->install();
    }

    /**
     * Placeholder for deactivation function.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function deactivate() {
        //
    }

    /**
     * Flush rewrite rules after plugin is activated.
     *
     * Nothing being added here yet.
     *
     * @since 1.0.0
     */
    public function flush_rewrite_rules() {
        // fix rewrite rules
    }

    /**
     * Run the installer to create necessary migrations and seeders.
     *
     * @since 1.0.0
     *
     * @return void
     * @throws Exception
     */
    private function install(): void {
        $installer = new \WpInnovator\InnovatorAi\Setup\Installer();
        $installer->run();
    }

    /**
     * Include the required classes.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function includes(): void {
	    // Common classes.
        $this->container['assets']   = new WpInnovator\InnovatorAi\Assets\Manager();
        $this->container['blocks']   = new WpInnovator\InnovatorAi\Blocks\Manager();
        $this->container['rest_api'] = new WpInnovator\InnovatorAi\REST\Api();
        $this->container['settings'] = new WpInnovator\InnovatorAi\Settings\Manager();

        // Admin classes.
        if ( $this->is_request( 'admin' ) ) {
            $this->container['admin_menu'] = new WpInnovator\InnovatorAi\Admin\Menu();
        }
    }

    /**
     * Redirect to innovator-ai settings page after plugin activation.
     *
     * @since 1.0.0
     *
     * @param $plugin
     * @return void
     */
    public function activation_redirect( $plugin ): void {
        if ( plugin_basename( __FILE__ ) === $plugin ) {
            wp_safe_redirect( admin_url( 'admin.php?page=innovator-ai#/settings' ) );
            exit();
        }
    }

    /**
     * Initialize the hooks.
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function init_hooks(): void {
        // Localize our plugin.
        add_action( 'init', [ $this, 'localization_setup' ] );

        // Add the plugin page links.
        add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), [ $this, 'plugin_action_links' ] );
    }

    /**
     * Initialize plugin for localization.
     *
     * @uses load_plugin_textdomain()
     * @uses wp_set_script_translations()
     *
     * @since 1.0.0
     *
     * @return void
     */
    public function localization_setup(): void {
        load_plugin_textdomain( 'innovator-ai', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

        if ( is_admin() ) {
            // Load wp-script translation for innovator-ai-app.
            wp_set_script_translations( 'innovator-ai-app', 'innovator-ai', plugin_dir_path( __FILE__ ) . 'languages/' );
        }
    }

    /**
     * What type of request is this.
     *
     * @since 1.0.0
     *
     * @param string $type admin, ajax, cron or frontend
     *
     * @return bool
     */
    private function is_request( string $type ): bool {
        switch ( $type ) {
            case 'admin':
                return is_admin();

            case 'ajax':
                return defined( 'DOING_AJAX' );

            case 'rest':
                return defined( 'REST_REQUEST' );

            case 'cron':
                return defined( 'DOING_CRON' );

            case 'frontend':
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }

        return false;
    }

    /**
     * Plugin action links.
     *
     * @param array $links
     *
     * @since 1.0.0
     *
     * @return array
     */
    public function plugin_action_links( $links ): array {
        $links[] = '<a href="' . admin_url( 'admin.php?page=innovator-ai#/settings' ) . '">' . __( 'Settings', 'innovator-ai' ) . '</a>';
        $links[] = '<a href="https://github.com/wp-innovator/innovator-ai/wiki" target="_blank">' . __( 'Documentation', 'innovator-ai' ) . '</a>';

        return $links;
    }
}

/**
 * Initialize the main plugin.
 *
 * @since 1.0.0
 *
 * @return Innovator_Ai|bool
 */
function innovator_ai() {
    return Innovator_Ai::init();
}

/*
 * Kick-off the plugin.
 *
 * @since 1.0.0
 */
innovator_ai();
