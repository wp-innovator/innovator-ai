<?php
/**
 * AI Text Generator Block.
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */
$bg_color = $attributes['bgColor'];
$padding = $attributes['padding'];
?>
<div
    <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
    style="background-color: <?php echo esc_attr( $bg_color ); ?>; padding: <?php echo esc_attr( $padding['top'] ); ?> <?php echo esc_attr( $padding['right'] ); ?> <?php echo esc_attr( $padding['bottom'] ); ?> <?php echo esc_attr( $padding['left'] ); ?>; "
>
	<h2 class="wp-block-innovator-ai-title">
		<?php echo wp_kses_post( $attributes['title'] ); ?>
	</h2>
    <div class="wp-block-innovator-ai-description">
        <?php echo wp_kses_post( $attributes['description'] ); ?>
    </div>
</div>
