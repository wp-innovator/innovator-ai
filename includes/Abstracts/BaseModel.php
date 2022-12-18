<?php

namespace WpInnovator\InnovatorAi\Abstracts;

use WpInnovator\InnovatorAi\Traits\InputSanitizer;
use WpInnovator\InnovatorAi\Traits\Queryable;

/**
 * Base model class.
 *
 * @since 1.0.0
 */
abstract class BaseModel {

    use Queryable;
    use InputSanitizer;

    /**
     * @var $db
     */
    private $db;

    /**
     * Table name.
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $table;

    /**
     * Primary key column of the table.
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $primary_key = 'id';

    /**
     * Created at column of the table.
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $created_at_key = 'created_at';

    /**
     * Updated at column of the table.
     *
     * @since 1.0.0
     *
     * @var string
     */
    protected $updated_at_key = 'updated_at';

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {
        global $wpdb;

        $this->db    = $wpdb;
        $this->table = $wpdb->prefix . $this->table;
    }

    /**
     * Convert item dataset to array.
     *
     * @since 1.0.0
     *
     * @param object $item
     *
     * @return array
     */
    abstract public static function to_array( object $item ): array;
}
