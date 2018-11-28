<?php
//
// Include all custom post types here (one custom post type per file)
//
add_action('after_setup_theme', 'ci_load_custom_post_type_files');
if( !function_exists('ci_load_custom_post_type_files') ):
function ci_load_custom_post_type_files() {
	$cpt_files = apply_filters('load_custom_post_type_files', array(
		'inc/post_types/post',
		'inc/post_types/page',
		'inc/post_types/slider',
		'inc/post_types/event',
		'inc/post_types/discography',
		'inc/post_types/video',
		'inc/post_types/gallery',
		'inc/post_types/artist'
	));
	foreach($cpt_files as $cpt_file) get_template_part($cpt_file);
}
endif;


add_action( 'init', 'ci_tax_create_taxonomies');
if( !function_exists('ci_tax_create_taxonomies') ):
function ci_tax_create_taxonomies() {
	//
	// Create all taxonomies here.
	//

	// Artists > Category
	$labels = array(
		'name'              => _x( 'Artist Categories', 'taxonomy general name', 'ci_theme' ),
		'singular_name'     => _x( 'Artist Category', 'taxonomy singular name', 'ci_theme' ),
		'search_items'      => __( 'Search Artist Categories', 'ci_theme' ),
		'all_items'         => __( 'All Artist Categories', 'ci_theme' ),
		'parent_item'       => __( 'Parent Artist Category', 'ci_theme' ),
		'parent_item_colon' => __( 'Parent Artist Category:', 'ci_theme' ),
		'edit_item'         => __( 'Edit Artist Category', 'ci_theme' ),
		'update_item'       => __( 'Update Artist Category', 'ci_theme' ),
		'add_new_item'      => __( 'Add New Artist Category', 'ci_theme' ),
		'new_item_name'     => __( 'New Artist Category Name', 'ci_theme' ),
		'menu_name'         => __( 'Categories', 'ci_theme' ),
		'view_item'         => __( 'View Artist Category', 'ci_theme' ),
		'popular_items'     => __( 'Popular Artist Categories', 'ci_theme' ),
	);
	register_taxonomy( 'artist-category', array( 'cpt_artist' ), array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => _x( 'artist-category', 'taxonomy slug', 'ci_theme' ) ),
	) );

	// Discography > Sections Taxonomy
	$labels = array(
		'name'              => _x( 'Discography Sections', 'taxonomy general name', 'ci_theme' ),
		'singular_name'     => _x( 'Discography Section', 'taxonomy singular name', 'ci_theme' ),
		'search_items'      => __( 'Search Discography Sections', 'ci_theme' ),
		'all_items'         => __( 'All Discography Sections', 'ci_theme' ),
		'parent_item'       => __( 'Parent Discography Section', 'ci_theme' ),
		'parent_item_colon' => __( 'Parent Discography Section:', 'ci_theme' ),
		'edit_item'         => __( 'Edit Discography Section', 'ci_theme' ),
		'update_item'       => __( 'Update Discography Section', 'ci_theme' ),
		'add_new_item'      => __( 'Add New Discography Section', 'ci_theme' ),
		'new_item_name'     => __( 'New Discography Section Name', 'ci_theme' ),
		'menu_name'         => __( 'Discography Sections', 'ci_theme' ),
		'view_item'         => __( 'View Discography Section', 'ci_theme' ),
		'popular_items'     => __( 'Popular Discography Sections', 'ci_theme' ),
	);
	register_taxonomy( 'section', array( 'cpt_discography' ), array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => _x( 'section', 'taxonomy slug', 'ci_theme' ) ),
	) );

	// Video > Category
	$labels = array(
		'name'              => _x( 'Video Categories', 'taxonomy general name', 'ci_theme' ),
		'singular_name'     => _x( 'Video Category', 'taxonomy singular name', 'ci_theme' ),
		'search_items'      => __( 'Search Video Categories', 'ci_theme' ),
		'all_items'         => __( 'All Video Categories', 'ci_theme' ),
		'parent_item'       => __( 'Parent Video Category', 'ci_theme' ),
		'parent_item_colon' => __( 'Parent Video Category:', 'ci_theme' ),
		'edit_item'         => __( 'Edit Video Category', 'ci_theme' ),
		'update_item'       => __( 'Update Video Category', 'ci_theme' ),
		'add_new_item'      => __( 'Add New Video Category', 'ci_theme' ),
		'new_item_name'     => __( 'New Video Category Name', 'ci_theme' ),
		'menu_name'         => __( 'Categories', 'ci_theme' ),
		'view_item'         => __( 'View Video Category', 'ci_theme' ),
		'popular_items'     => __( 'Popular Video Categories', 'ci_theme' ),
	);
	register_taxonomy( 'video-category', array( 'cpt_video' ), array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => _x( 'video-category', 'taxonomy slug', 'ci_theme' ) ),
	) );

	// Galleries > Category
	$labels = array(
		'name'              => _x( 'Gallery Categories', 'taxonomy general name', 'ci_theme' ),
		'singular_name'     => _x( 'Gallery Category', 'taxonomy singular name', 'ci_theme' ),
		'search_items'      => __( 'Search Gallery Categories', 'ci_theme' ),
		'all_items'         => __( 'All Gallery Categories', 'ci_theme' ),
		'parent_item'       => __( 'Parent Gallery Category', 'ci_theme' ),
		'parent_item_colon' => __( 'Parent Gallery Category:', 'ci_theme' ),
		'edit_item'         => __( 'Edit Gallery Category', 'ci_theme' ),
		'update_item'       => __( 'Update Gallery Category', 'ci_theme' ),
		'add_new_item'      => __( 'Add New Gallery Category', 'ci_theme' ),
		'new_item_name'     => __( 'New Gallery Category Name', 'ci_theme' ),
		'menu_name'         => __( 'Categories', 'ci_theme' ),
		'view_item'         => __( 'View Gallery Category', 'ci_theme' ),
		'popular_items'     => __( 'Popular Gallery Categories', 'ci_theme' ),
	);
	register_taxonomy( 'gallery-category', array( 'cpt_gallery' ), array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => _x( 'gallery-category', 'taxonomy slug', 'ci_theme' ) ),
	) );

	// Events > Category
	$labels = array(
		'name'              => _x( 'Event Categories', 'taxonomy general name', 'ci_theme' ),
		'singular_name'     => _x( 'Event Category', 'taxonomy singular name', 'ci_theme' ),
		'search_items'      => __( 'Search Event Categories', 'ci_theme' ),
		'all_items'         => __( 'All Event Categories', 'ci_theme' ),
		'parent_item'       => __( 'Parent Event Category', 'ci_theme' ),
		'parent_item_colon' => __( 'Parent Event Category:', 'ci_theme' ),
		'edit_item'         => __( 'Edit Event Category', 'ci_theme' ),
		'update_item'       => __( 'Update Event Category', 'ci_theme' ),
		'add_new_item'      => __( 'Add New Event Category', 'ci_theme' ),
		'new_item_name'     => __( 'New Event Category Name', 'ci_theme' ),
		'menu_name'         => __( 'Categories', 'ci_theme' ),
		'view_item'         => __( 'View Event Category', 'ci_theme' ),
		'popular_items'     => __( 'Popular Event Categories', 'ci_theme' ),
	);
	register_taxonomy( 'event-category', array( 'cpt_event' ), array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => _x( 'event-category', 'taxonomy slug', 'ci_theme' ) ),
	) );

	$labels = array(
		'name'              => _x( 'Slider Categories', 'taxonomy general name', 'ci_theme' ),
		'singular_name'     => _x( 'Slider Category', 'taxonomy singular name', 'ci_theme' ),
		'search_items'      => __( 'Search Slider Categories', 'ci_theme' ),
		'all_items'         => __( 'All Slider Categories', 'ci_theme' ),
		'parent_item'       => __( 'Parent Slider Category', 'ci_theme' ),
		'parent_item_colon' => __( 'Parent Slider Category:', 'ci_theme' ),
		'edit_item'         => __( 'Edit Slider Category', 'ci_theme' ),
		'update_item'       => __( 'Update Slider Category', 'ci_theme' ),
		'add_new_item'      => __( 'Add New Slider Category', 'ci_theme' ),
		'new_item_name'     => __( 'New Slider Category Name', 'ci_theme' ),
		'menu_name'         => __( 'Categories', 'ci_theme' ),
		'view_item'         => __( 'View Slider Category', 'ci_theme' ),
		'popular_items'     => __( 'Popular Slider Categories', 'ci_theme' ),
	);
	register_taxonomy( 'slider-category', array( 'cpt_slider' ), array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'show_admin_column' => true,
		'rewrite'           => array( 'slug' => _x( 'slider-category', 'taxonomy slug', 'ci_theme' ) ),
	) );

}
endif;

// add_action('admin_enqueue_scripts', 'ci_load_post_scripts');
// if( !function_exists('ci_load_post_scripts') ):
// function ci_load_post_scripts($hook)
// {
// 	//
// 	// Add here all scripts and styles, to load on all admin pages.
// 	//

// 	if(in_array($hook, array('post.php', 'post-new.php')) and in_array(get_post_type(), array('cpt_artist', 'cpt_gallery', 'cpt_video', 'cpt_discography', 'cpt_event', 'cpt_slider', 'post', 'page')) ) {
// 		//
// 		// Add here all scripts and styles, specific to post edit screens.
// 		//
// 		wp_enqueue_media();
// 		ci_enqueue_media_manager_scripts();

// 		wp_enqueue_script( 'jquery-gmaps-latlon-picker' );

// 		wp_enqueue_style( 'jquery-ui-style' );
// 		wp_enqueue_style( 'jquery-ui-timepicker' );

// 		ci_localize_datepicker();
// 		wp_enqueue_script( 'jquery-ui-slider' );
// 		wp_enqueue_script( 'jquery-ui-timepicker' );

// 		wp_enqueue_style( 'ci-post-edit-screens' );
// 		wp_enqueue_script( 'ci-post-edit-scripts' );

// 	}
// }
// endif;

add_filter('request', 'ci_feed_request');
if( !function_exists('ci_feed_request') ):
function ci_feed_request( $qv ) {
	if ( isset( $qv['feed'] ) && !isset( $qv['post_type'] ) ) {

		$qv['post_type']   = array();
		$qv['post_type']   = get_post_types( $args = array(
			'public'   => true,
			'_builtin' => false
		) );
		$qv['post_type'][] = 'post';
	}

	return $qv;
}
endif;
?>