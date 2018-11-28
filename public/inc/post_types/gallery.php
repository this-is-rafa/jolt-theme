<?php
//
// Galleries post type related functions.
//
add_action( 'init', 'ci_create_cpt_gallery' );

if( !function_exists('ci_create_cpt_gallery') ):
function ci_create_cpt_gallery() {
	$labels = array(
		'name'               => _x( 'Galleries', 'post type general name', 'ci_theme' ),
		'singular_name'      => _x( 'Gallery', 'post type singular name', 'ci_theme' ),
		'add_new'            => __( 'Add New', 'ci_theme' ),
		'add_new_item'       => __( 'Add New Gallery', 'ci_theme' ),
		'edit_item'          => __( 'Edit Gallery', 'ci_theme' ),
		'new_item'           => __( 'New Gallery', 'ci_theme' ),
		'view_item'          => __( 'View Gallery', 'ci_theme' ),
		'search_items'       => __( 'Search Galleries', 'ci_theme' ),
		'not_found'          => __( 'No Galleries found', 'ci_theme' ),
		'not_found_in_trash' => __( 'No Galleries found in the trash', 'ci_theme' ),
		'parent_item_colon'  => __( 'Parent Gallery:', 'ci_theme' )
	);

	$args = array(
		'labels'          => $labels,
		'singular_label'  => __( 'Gallery', 'ci_theme' ),
		'public'          => true,
		'show_ui'         => true,
		'capability_type' => 'post',
		'hierarchical'    => false,
		'has_archive'     => _x( 'galleries-archive', 'post type archive slug', 'ci_theme' ),
		'rewrite'         => array( 'slug' => _x( 'gallery', 'post type slug', 'ci_theme' ) ),
		'menu_position'   => 5,
		'supports'        => array( 'title', 'editor', 'thumbnail' ),
		'menu_icon'       => 'dashicons-format-gallery'
	);

	register_post_type( 'cpt_gallery' , $args );

}
endif;

add_action( 'load-post.php', 'ci_cpt_galleries_meta_boxes_setup' );
add_action( 'load-post-new.php', 'ci_cpt_galleries_meta_boxes_setup' );

if( !function_exists('ci_cpt_galleries_meta_boxes_setup') ):
function ci_cpt_galleries_meta_boxes_setup() {
	add_action( 'add_meta_boxes', 'ci_cpt_galleries_add_meta_boxes' );
	add_action( 'save_post', 'ci_cpt_galleries_save_meta', 10, 2 );
}
endif;

if( !function_exists('ci_cpt_galleries_add_meta_boxes') ):
function ci_cpt_galleries_add_meta_boxes() {
	add_meta_box( 'galleries-box', __( 'Gallery Settings', 'ci_theme' ), 'ci_cpt_galleries_score_meta_box', 'cpt_gallery', 'normal', 'high' );
}
endif;

if( !function_exists('ci_cpt_galleries_score_meta_box') ):
function ci_cpt_galleries_score_meta_box( $object, $box ) {
	ci_prepare_metabox('cpt_gallery');


	?><div class="ci-cf-wrap"><?php
		ci_metabox_open_tab( false );
			ci_metabox_input( 'ci_cpt_gallery_location', __( 'Photo gallery Location. For example: Ibiza, Spain', 'ci_theme' ) );
			ci_metabox_checkbox( 'ci_cpt_gallery_caption', 'on', __( 'Enable image captions', 'ci_theme' ) );
			ci_metabox_guide( __( 'You can create a featured gallery by pressing the "Add Images" button below. You should also set a featured image that will be used as this Gallery\'s cover.', 'ci_theme' ) );
			ci_metabox_gallery();
			$options = array();
			for ( $i = 1; $i <= 4; $i ++ ) {
				$options[ $i ] = sprintf( _n( '1 Column', '%s Columns', $i, 'ci_theme' ), $i );
			}
			ci_metabox_dropdown( 'ci_cpt_gallery_cols', $options, __( 'Number of columns to display this gallery in:', 'ci_theme' ), array( 'default' => 'col-md-4' ) );
			ci_metabox_checkbox( 'ci_cpt_gallery_masonry', 'on', __( 'Masonry effect (not applicable to 1 column layout).', 'ci_theme' ) );
		ci_metabox_close_tab();
	?></div><?php
}
endif;

if( !function_exists('ci_cpt_galleries_save_meta') ):
function ci_cpt_galleries_save_meta( $post_id, $post ) {
	
	if ( !ci_can_save_meta('cpt_gallery') ) return;

	update_post_meta( $post->ID, 'ci_cpt_gallery_location', sanitize_text_field( $_POST['ci_cpt_gallery_location'] ) );
	update_post_meta( $post->ID, 'ci_cpt_gallery_caption', ci_sanitize_checkbox( $_POST['ci_cpt_gallery_caption'] ) );
	update_post_meta( $post->ID, 'ci_cpt_gallery_cols', absint( $_POST['ci_cpt_gallery_cols'] ) );
	update_post_meta( $post->ID, 'ci_cpt_gallery_masonry', ci_sanitize_checkbox( $_POST['ci_cpt_gallery_masonry'] ) );

	ci_metabox_gallery_save($_POST);
}
endif;
