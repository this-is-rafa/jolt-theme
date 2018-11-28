<?php
//
// Page listing template meta box
//

add_action('admin_init', 'ci_add_post_meta');
add_action('save_post', 'ci_update_post_meta');

if( !function_exists('ci_add_post_meta') ):
function ci_add_post_meta()
{
	add_meta_box("ci_post_meta", __('Post layout', 'ci_theme'), "ci_add_post_meta_box", "post", "normal", "high");
}
endif;

if( !function_exists('ci_update_post_meta') ):
function ci_update_post_meta($post_id)
{
	if ( !ci_can_save_meta('post') ) return;

	update_post_meta( $post_id, 'meta_placement', in_array( $_POST['meta_placement'], array('left', 'right') ) ? $_POST['meta_placement'] : '' );

}
endif;

if( !function_exists('ci_add_post_meta_box') ):
function ci_add_post_meta_box( $object, $box ) {
	ci_prepare_metabox('post');

	?><div class="ci-cf-wrap"><?php
		ci_metabox_open_tab( false );
			ci_metabox_guide( __( "You can change the placement of the sidebar for this post, to be either always on the left or always on the right. If you leave it empty, it will follow the global <strong>Site layout</strong> option, which can be changed from the Theme's settings panel.", 'ci_theme' ) );
			$options = array(
				''      => '&nbsp',
				'left'  => __( 'Always left', 'ci_theme' ),
				'right' => __( 'Always right', 'ci_theme' ),
			);
			ci_metabox_dropdown( 'meta_placement', $options, __( 'Sidebar placement:', 'ci_theme' ) );
		ci_metabox_close_tab();
	?></div><?php

}
endif;

?>