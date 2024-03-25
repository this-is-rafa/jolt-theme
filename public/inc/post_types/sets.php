<?php
//
// sets post type related functions.
//
add_action( 'init', 'ci_create_cpt_sets' );

if( !function_exists('ci_create_cpt_sets') ):
function ci_create_cpt_sets()
{
	$labels = array(
		'name'               => _x( 'Featured Sets', 'post type general name', 'ci_theme' ),
		'singular_name'      => _x( 'Featured Set', 'post type singular name', 'ci_theme' ),
		'add_new'            => __( 'Add New', 'ci_theme' ),
		'add_new_item'       => __( 'Add New set', 'ci_theme' ),
		'edit_item'          => __( 'Edit set', 'ci_theme' ),
		'new_item'           => __( 'New set', 'ci_theme' ),
		'view_item'          => __( 'View sets', 'ci_theme' ),
		'search_items'       => __( 'Search sets', 'ci_theme' ),
		'not_found'          => __( 'No sets found', 'ci_theme' ),
		'not_found_in_trash' => __( 'No sets found in the trash', 'ci_theme' ),
		'parent_item_colon'  => __( 'Parent sets:', 'ci_theme' )
	);

	$args = array(
		'labels'          => $labels,
		'singular_label'  => __( 'sets', 'ci_theme' ),
		'public'          => true,
		'show_ui'         => true,
		'capability_type' => 'post',
		'hierarchical'    => false,
		'has_archive'     => _x( 'sets-archive', 'post type archive slug', 'ci_theme' ),
		'rewrite'         => array( 'slug' => _x( 'sets', 'post type slug', 'ci_theme' ) ),
		'menu_position'   => 5,
		'supports'        => array( 'title', 'editor', 'thumbnail' ),
    'menu_icon'       => 'dashicons-admin-users',
    'show_in_rest'    => true,
    'rest_base'       => 'sets',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'taxonomies'      => array('sets-category')
	);

	register_post_type( 'cpt_sets' , $args );

}
endif;

if (false) :
if ( !function_exists( 'ci_cpt_sets_meta_box' ) ):
function ci_cpt_sets_meta_box( $object, $box ) {
	ci_prepare_metabox( 'cpt_sets' );


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
						$fields = get_post_meta( $object->ID, 'ci_cpt_sets_fields', true );

						if ( ! empty( $fields ) ) {
							foreach ( $fields as $field ) {
								?>
								<div class="post-field">
									<label><?php _e( 'Title:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_sets_fields_repeatable_title[]" value="<?php echo esc_attr( $field['title'] ); ?>" class="widefat" /></label>
									<label><?php _e( 'Description:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_sets_fields_repeatable_description[]" value="<?php echo esc_attr( $field['description'] ); ?>" class="widefat" /></label>
									<p class="ci-repeating-remove-action"><a href="#" class="button ci-repeating-remove-field"><i class="dashicons dashicons-dismiss"></i><?php _e( 'Remove me', 'ci_theme' ); ?></a></p>
								</div>
								<?php
							}
						}
					?>
					<div class="post-field field-prototype" style="display: none;">
						<label><?php _e( 'Title:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_sets_fields_repeatable_title[]" value="" class="widefat" /></label>
						<label><?php _e( 'Description:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_sets_fields_repeatable_description[]" value="" class="widefat" /></label>
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
endif;
?>