<?php
//
// artists post type related functions.
//
add_action( 'init', 'ci_create_cpt_artist' );

if( !function_exists('ci_create_cpt_artist') ):
function ci_create_cpt_artist()
{
	$labels = array(
		'name'               => _x( 'Artists', 'post type general name', 'ci_theme' ),
		'singular_name'      => _x( 'Artist', 'post type singular name', 'ci_theme' ),
		'add_new'            => __( 'Add New', 'ci_theme' ),
		'add_new_item'       => __( 'Add New Artist', 'ci_theme' ),
		'edit_item'          => __( 'Edit Artist', 'ci_theme' ),
		'new_item'           => __( 'New Artist', 'ci_theme' ),
		'view_item'          => __( 'View Artist', 'ci_theme' ),
		'search_items'       => __( 'Search Artists', 'ci_theme' ),
		'not_found'          => __( 'No Artists found', 'ci_theme' ),
		'not_found_in_trash' => __( 'No Artists found in the trash', 'ci_theme' ),
		'parent_item_colon'  => __( 'Parent Artist:', 'ci_theme' )
	);

	$args = array(
		'labels'          => $labels,
		'singular_label'  => __( 'Artist', 'ci_theme' ),
		'public'          => true,
		'show_ui'         => true,
		'capability_type' => 'post',
		'hierarchical'    => false,
		'has_archive'     => _x( 'artists-archive', 'post type archive slug', 'ci_theme' ),
		'rewrite'         => array( 'slug' => _x( 'artist', 'post type slug', 'ci_theme' ) ),
		'menu_position'   => 5,
		'supports'        => array( 'title', 'editor', 'thumbnail' ),
    'menu_icon'       => 'dashicons-admin-users',
    'show_in_rest'    => true,
    'rest_base'       => 'artists',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'taxonomies'      => array('artist-category')
	);

	register_post_type( 'cpt_artist' , $args );

}
endif;

// add_action( 'load-post.php', 'ci_cpt_artist_meta_boxes_setup' );
// add_action( 'load-post-new.php', 'ci_cpt_artist_meta_boxes_setup' );

// if ( !function_exists( 'ci_cpt_artist_meta_boxes_setup' ) ):
// function ci_cpt_artist_meta_boxes_setup() {
// 	add_action( 'add_meta_boxes', 'ci_cpt_artist_add_meta_boxes' );
// 	add_action( 'save_post', 'ci_cpt_artist_save_meta', 10, 2 );
// }
// endif;

// if ( !function_exists( 'ci_cpt_artist_add_meta_boxes' ) ):
// function ci_cpt_artist_add_meta_boxes() {
// 	add_meta_box( 'artist-box', __( 'Artist Settings', 'ci_theme' ), 'ci_cpt_artist_meta_box', 'cpt_artist', 'normal', 'high' );
// }
// endif;

if (false) :
if ( !function_exists( 'ci_cpt_artist_meta_box' ) ):
function ci_cpt_artist_meta_box( $object, $box ) {
	ci_prepare_metabox( 'cpt_artist' );


	?><div class="ci-cf-wrap"><?php
		ci_metabox_open_tab( __('Information', 'ci_theme') );
			ci_metabox_guide( array(
				__( 'You may include as many rows of information as you want. Press <em>Add Field</em> to add a new row. Press <em>Remove me</em> to delete a specific row. You can rearrange rows by drag and drop. You may leave empty the title or the description, but not both.', 'ci_theme' ),
				__( 'Allowed tags in description: a (href, class), span (class), i (class), b, em, strong. E.g.: <code>&lt;a href="#" class="btn">Button text&lt;/a></code>', 'ci_theme' ),
			), array( 'type' => 'p' ) );
			?>
			<fieldset class="ci-repeating-fields">
				<div class="inner">
					<?php
						$fields = get_post_meta( $object->ID, 'ci_cpt_artist_fields', true );

						if ( ! empty( $fields ) ) {
							foreach ( $fields as $field ) {
								?>
								<div class="post-field">
									<label><?php _e( 'Title:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_artist_fields_repeatable_title[]" value="<?php echo esc_attr( $field['title'] ); ?>" class="widefat" /></label>
									<label><?php _e( 'Description:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_artist_fields_repeatable_description[]" value="<?php echo esc_attr( $field['description'] ); ?>" class="widefat" /></label>
									<p class="ci-repeating-remove-action"><a href="#" class="button ci-repeating-remove-field"><i class="dashicons dashicons-dismiss"></i><?php _e( 'Remove me', 'ci_theme' ); ?></a></p>
								</div>
								<?php
							}
						}
					?>
					<div class="post-field field-prototype" style="display: none;">
						<label><?php _e( 'Title:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_artist_fields_repeatable_title[]" value="" class="widefat" /></label>
						<label><?php _e( 'Description:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_artist_fields_repeatable_description[]" value="" class="widefat" /></label>
						<p class="ci-repeating-remove-action"><a href="#" class="button ci-repeating-remove-field"><i class="dashicons dashicons-dismiss"></i><?php _e( 'Remove me', 'ci_theme' ); ?></a></p>
					</div>
				</div>
				<a href="#" class="ci-repeating-add-field button"><i class="dashicons dashicons-plus-alt"></i><?php _e( 'Add Field', 'ci_theme' ); ?></a>
			</fieldset>
			<?php
		ci_metabox_close_tab();


		ci_metabox_open_tab( __( 'Sidebar', 'ci_theme' ) );
			ci_metabox_guide( __( "You can change the placement of the informational sidebar of this post, to be either always on the left or always on the right. If you leave it empty, it will follow the global <strong>Site layout</strong> option, which can be changed from the Theme's settings panel.", 'ci_theme' ) );
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
endif; //false!
// if ( !function_exists( 'ci_cpt_artist_save_meta' ) ):
// function ci_cpt_artist_save_meta( $post_id, $post ) {
	
// 	if ( !ci_can_save_meta('cpt_artist') ) return;

// 	update_post_meta( $post_id, 'ci_cpt_artist_fields', ci_theme_sanitize_artist_fields_repeating( $_POST ) );

// 	update_post_meta( $post_id, 'meta_placement', in_array( $_POST['meta_placement'], array('left', 'right') ) ? $_POST['meta_placement'] : '' );

// }
// endif;


// if ( ! function_exists( 'ci_theme_sanitize_artist_fields_repeating' ) ) :
// function ci_theme_sanitize_artist_fields_repeating( $POST_array ) {
// 	if ( empty( $POST_array ) || !is_array( $POST_array ) ) {
// 		return false;
// 	}

// 	$titles       = $POST_array['ci_cpt_artist_fields_repeatable_title'];
// 	$descriptions = $POST_array['ci_cpt_artist_fields_repeatable_description'];

// 	$count = max( count( $titles ), count( $descriptions ) );

// 	$new_fields = array();

// 	$records_count = 0;
// 	$allowed_html = array(
// 		'a'      => array(
// 			'href'  => array(),
// 			'class' => array(),
// 		),
// 		'span'   => array(
// 			'class' => array(),
// 		),
// 		'i'      => array(
// 			'class' => array(),
// 		),
// 		'b'      => array(),
// 		'em'     => array(),
// 		'strong' => array(),
// 	);

// 	for ( $i = 0; $i < $count; $i++ ) {
// 		if( empty( $titles[ $i ] ) && empty( $descriptions[ $i ] ) )
// 			continue;

// 		$new_fields[ $records_count ]['title']       = sanitize_text_field( $titles[ $i ] );
// 		$new_fields[ $records_count ]['description'] = wp_kses( $descriptions[ $i ], $allowed_html );
// 		$records_count++;
// 	}
// 	return $new_fields;
// }
// endif;
?>