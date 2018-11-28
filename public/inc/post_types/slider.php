<?php
//
// slider post type related functions.
//
add_action( 'init', 'ci_create_cpt_slider' );

if( !function_exists('ci_create_cpt_slider') ):
function ci_create_cpt_slider() {
	$labels = array(
		'name'               => _x( 'Slideshow', 'post type general name', 'ci_theme' ),
		'singular_name'      => _x( 'Slide', 'post type singular name', 'ci_theme' ),
		'add_new'            => __( 'Add New', 'ci_theme' ),
		'add_new_item'       => __( 'Add New Slide', 'ci_theme' ),
		'edit_item'          => __( 'Edit Slide', 'ci_theme' ),
		'new_item'           => __( 'New Slide', 'ci_theme' ),
		'view_item'          => __( 'View Slide', 'ci_theme' ),
		'search_items'       => __( 'Search Slides', 'ci_theme' ),
		'not_found'          => __( 'No Slides found', 'ci_theme' ),
		'not_found_in_trash' => __( 'No Slides found in the trash', 'ci_theme' ),
		'parent_item_colon'  => __( 'Parent Slide:', 'ci_theme' )
	);

	$args = array(
		'labels'          => $labels,
		'singular_label'  => __( 'Slide', 'ci_theme' ),
		'public'          => false,
		'show_ui'         => true,
		'capability_type' => 'post',
		'hierarchical'    => false,
		'has_archive'     => false,
		'rewrite'         => array( 'slug' => _x( 'slider', 'post type slug', 'ci_theme' ) ),
		'menu_position'   => 4,
		'supports'        => array( 'title', 'thumbnail' ),
		'menu_icon'       => 'dashicons-image-flip-horizontal'
	);

	register_post_type( 'cpt_slider' , $args );

}
endif;

add_action( 'load-post.php', 'ci_slider_meta_boxes_setup' );
add_action( 'load-post-new.php', 'ci_slider_meta_boxes_setup' );

if ( !function_exists( 'ci_slider_meta_boxes_setup' ) ):
function ci_slider_meta_boxes_setup() {
	add_action( 'add_meta_boxes', 'ci_slider_add_meta_boxes' );
	add_action( 'save_post', 'ci_slider_save_meta', 10, 2 );
}
endif;

if ( !function_exists( 'ci_slider_add_meta_boxes' ) ):
function ci_slider_add_meta_boxes() {
	add_meta_box( 'slider-box', __( 'Slide Settings', 'ci_theme' ), 'ci_slider_score_meta_box', 'cpt_slider', 'normal', 'high' );
}
endif;

if ( !function_exists( 'ci_slider_score_meta_box' ) ):
function ci_slider_score_meta_box( $object, $box ) {
	ci_prepare_metabox( 'cpt_slider' );

	?><div class="ci-cf-wrap"><?php
		ci_metabox_open_tab(false);
			ci_metabox_input( 'ci_cpt_slider_url', __( 'Slide URL. If someone clicks on this slide, this is the link that they will be visiting. If you leave it empty, linking for this slide will be disabled.', 'ci_theme' ), array( 'esc_func' => 'esc_url' ) );
			ci_metabox_input( 'ci_cpt_slider_text', __( 'Slide text (appears below the title)', 'ci_theme' ) );
			ci_metabox_guide( sprintf( __( 'In the following box, you can simply enter the URL of a supported website\'s video. It needs to start with <code>http://</code> or <code>https://</code> (E.g. <code>%1$s</code>). A list of supported websites can be <a href="%2$s">found here</a>. When a video is shown, no text appears in the slide (e.g. title, content, button).', 'ci_theme' ), 'http://www.youtube.com/watch?v=4Z9WVZddH9w', 'http://codex.wordpress.org/Embeds#Okay.2C_So_What_Sites_Can_I_Embed_From.3F' ) );
			ci_metabox_input( 'ci_cpt_slider_video_url', __( 'Video URL:', 'ci_theme' ) );
		ci_metabox_close_tab();
	?></div><?php
}
endif;

if ( !function_exists( 'ci_slider_save_meta' ) ):
function ci_slider_save_meta( $post_id, $post ) {
	
	if ( !ci_can_save_meta('cpt_slider') ) return;

	update_post_meta( $post_id, 'ci_cpt_slider_url', esc_url_raw( $_POST['ci_cpt_slider_url'] ) );
	update_post_meta( $post_id, 'ci_cpt_slider_text', sanitize_text_field( $_POST['ci_cpt_slider_text'] ) );
	update_post_meta( $post_id, 'ci_cpt_slider_video_url', esc_url_raw( $_POST['ci_cpt_slider_video_url'] ) );
}
endif;

?>