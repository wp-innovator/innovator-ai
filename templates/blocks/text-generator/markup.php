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
    <?php echo get_block_wrapper_attributes(); // phpcs:ignore ?>
    style="background-color: <?php echo $bg_color; ?>; padding: <?php echo $padding['top']; ?> <?php echo $padding['right']; ?> <?php echo $padding['bottom']; ?> <?php echo $padding['left']; ?>; "
>
	<h2 class="wp-block-innovator-ai-title">
		<?php echo wp_kses_post( $attributes['title'] ); ?>
	</h2>
    <div class="wp-block-innovator-ai-description">
        <?php echo wp_kses_post( $attributes['description'] ); ?>
    </div>
</div>
