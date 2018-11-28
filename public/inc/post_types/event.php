<?php
//
// events post type related functions.
//
add_action( 'init', 'ci_create_cpt_event' );

if( !function_exists('ci_create_cpt_event') ):
function ci_create_cpt_event()
{
	$labels = array(
		'name'               => _x( 'Events', 'post type general name', 'ci_theme' ),
		'singular_name'      => _x( 'Event', 'post type singular name', 'ci_theme' ),
		'add_new'            => __( 'New Event', 'ci_theme' ),
		'add_new_item'       => __( 'Add New Event', 'ci_theme' ),
		'edit_item'          => __( 'Edit Event', 'ci_theme' ),
		'new_item'           => __( 'New Event', 'ci_theme' ),
		'view_item'          => __( 'View Event', 'ci_theme' ),
		'search_items'       => __( 'Search Events', 'ci_theme' ),
		'not_found'          => __( 'No Events found', 'ci_theme' ),
		'not_found_in_trash' => __( 'No Events found in the trash', 'ci_theme' ),
		'parent_item_colon'  => __( 'Parent Event:', 'ci_theme' )
	);

	$args = array(
		'labels'          => $labels,
		'singular_label'  => __( 'Event', 'ci_theme' ),
		'public'          => true,
		'show_ui'         => true,
		'capability_type' => 'post',
		'hierarchical'    => false,
		'has_archive'     => _x( 'events-archive', 'post type archive slug', 'ci_theme' ),
		'rewrite'         => array( 'slug' => _x( 'event', 'post type slug', 'ci_theme' ) ),
		'menu_position'   => 5,
		'supports'        => array( 'title', 'editor', 'thumbnail' ),
		'menu_icon'       => 'dashicons-calendar'
	);

	register_post_type( 'cpt_event' , $args );

}
endif;

add_action( 'load-post.php', 'ci_cpt_event_meta_boxes_setup' );
add_action( 'load-post-new.php', 'ci_cpt_event_meta_boxes_setup' );

if( !function_exists('ci_cpt_event_meta_boxes_setup') ):
function ci_cpt_event_meta_boxes_setup() {
	add_action( 'add_meta_boxes', 'ci_cpt_event_add_meta_boxes' );
	add_action( 'save_post', 'ci_cpt_event_save_meta', 10, 2 );
}
endif;

if( !function_exists('ci_cpt_event_add_meta_boxes') ):
function ci_cpt_event_add_meta_boxes() {
	add_meta_box( 'events-box', __( 'Events Settings', 'ci_theme' ), 'ci_cpt_event_score_meta_box', 'cpt_event', 'normal', 'high' );
}
endif;

if( !function_exists('ci_cpt_event_score_meta_box') ):
function ci_cpt_event_score_meta_box( $object, $box )
{
	ci_prepare_metabox('cpt_event');


	?><div class="ci-cf-wrap"><?php
		ci_metabox_open_tab( __('Details', 'ci_theme') );
			ci_metabox_input( 'ci_cpt_event_location', __( 'Event Location. For example: Ibiza, Spain', 'ci_theme' ) );
			ci_metabox_input( 'ci_cpt_event_venue', __( 'Event Venue. For example: Ushuaia', 'ci_theme' ) );
			ci_metabox_checkbox( 'ci_cpt_event_recurrent', 'enabled', __( 'Recurrent Event', 'ci_theme' ) );
			?><div id="event_recurrent"><?php
				ci_metabox_input( 'ci_cpt_event_recurrence', __( 'Event Recurrence (e.g. <b>Every TUE at 22:00</b>).', 'ci_theme' ) );
			?></div><?php
			?><div id="event_datetime"><?php
				ci_metabox_input( 'ci_cpt_event_date', __( 'Event Date. Use the Date Picker (Click inside the field).', 'ci_theme' ) );
				ci_metabox_input( 'ci_cpt_event_time', __( 'Event Time (e.g. <b>21:00</b>)', 'ci_theme' ) );
			?></div><?php
		ci_metabox_close_tab();


		ci_metabox_open_tab( __('Information', 'ci_theme') );
			ci_metabox_guide( array(
				__( 'You may include as many rows of information as you want. Press <em>Add Field</em> to add a new row. Press <em>Remove me</em> to delete a specific row. You can rearrange rows by drag and drop. You may leave empty the title or the description, but not both.', 'ci_theme' ),
				__( 'Allowed tags in description: a (href, class), span (class), i (class), b, em, strong. E.g.: <code>&lt;a href="#" class="btn">Button text&lt;/a></code>', 'ci_theme' ),
			), array( 'type' => 'p' ) );
			?>
			<fieldset class="ci-repeating-fields">
				<div class="inner">
					<?php
						$fields = get_post_meta( $object->ID, 'ci_cpt_event_fields', true );

						if ( ! empty( $fields ) ) {
							foreach ( $fields as $field ) {
								?>
								<div class="post-field">
									<label><?php _e( 'Title:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_event_fields_repeatable_title[]" value="<?php echo esc_attr( $field['title'] ); ?>" class="widefat" /></label>
									<label><?php _e( 'Description:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_event_fields_repeatable_description[]" value="<?php echo esc_attr( $field['description'] ); ?>" class="widefat" /></label>
									<p class="ci-repeating-remove-action"><a href="#" class="button ci-repeating-remove-field"><i class="dashicons dashicons-dismiss"></i><?php _e( 'Remove me', 'ci_theme' ); ?></a></p>
								</div>
								<?php
							}
						}
						?>
						<div class="post-field field-prototype" style="display: none;">
							<label><?php _e( 'Title:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_event_fields_repeatable_title[]" value="" class="widefat" /></label>
							<label><?php _e( 'Description:', 'ci_theme' ); ?> <input type="text" name="ci_cpt_event_fields_repeatable_description[]" value="" class="widefat" /></label>
							<p class="ci-repeating-remove-action"><a href="#" class="button ci-repeating-remove-field"><i class="dashicons dashicons-dismiss"></i><?php _e( 'Remove me', 'ci_theme' ); ?></a></p>
						</div>
				</div>
				<a href="#" class="ci-repeating-add-field button"><i class="dashicons dashicons-plus-alt"></i><?php _e('Add Field', 'ci_theme'); ?></a>
			</fieldset>
			<?php
		ci_metabox_close_tab();


		ci_metabox_open_tab( __('Status', 'ci_theme') );
			ci_metabox_guide( __( "In this section you can create two status buttons. The <em>Upcoming date</em> button will be the one displayed <strong>before</strong> the event's date, while the <em>Past date</em> button will be displayed <strong>after</strong> the event's date passes. This is useful so that you will not need to keep coming back editing the event, in situations like, providing a <em>Buy Tickets</em> button before the event and a <em>Watch Recorded</em> button afterwards. Leave a button's URL empty if you want it to be unclickable (e.g. when <strong>Canceled)</strong>.", 'ci_theme' ) );
			?><h4><?php _e( 'Upcoming date button', 'ci_theme' ); ?></h4><?php
			ci_metabox_input( 'ci_cpt_event_upcoming_button', __( 'Button text (e.g. <em>Buy now</em>, <em>Watch live</em>, etc):', 'ci_theme' ) );
			ci_metabox_input( 'ci_cpt_event_upcoming_url', __( 'Button URL:', 'ci_theme' ), array( 'esc_func' => 'esc_url' ) );
			?><h4><?php _e( 'Past date button', 'ci_theme' ); ?></h4><?php
			ci_metabox_input( 'ci_cpt_event_past_button', __( 'Button text (e.g. <em>Buy album</em>, <em>Watch recorded</em>, etc):', 'ci_theme' ) );
			ci_metabox_input( 'ci_cpt_event_past_url', __( 'Button URL:', 'ci_theme' ), array( 'esc_func' => 'esc_url' ) );
		ci_metabox_close_tab();


		ci_metabox_open_tab( __( 'Map', 'ci_theme' ) );
			ci_metabox_guide( __( 'Enter a place or address and press <em>Search place/address</em>. Alternatively, you can drag the marker to the desired position, or double click on the map to set a new location.', 'ci_theme' ) );
			?>
			<fieldset class="gllpLatlonPicker">
				<input type="text" class="gllpSearchField">
				<input type="button" class="button gllpSearchButton" value="<?php _e( 'Search place/address', 'ci_theme' ); ?>">
				<div class="gllpMap"><?php _e( 'Google Maps', 'ci_theme' ); ?></div>
				<input type="hidden" class="gllpZoom" value="8"/>
				<?php
					ci_metabox_input( 'ci_cpt_event_lat', __( 'Location Latitude.', 'ci_theme' ), array(
						'input_class' => 'widefat gllpLatitude',
						'default'     => '36'
					) );
					ci_metabox_input( 'ci_cpt_event_lon', __( 'Location Longitude.', 'ci_theme' ), array(
						'input_class' => 'widefat gllpLongitude',
						'default'     => '-120'
					) );
				?>
				<p><input type="button" class="button gllpUpdateButton" value="<?php esc_attr_e( 'Update map', 'ci_theme' ); ?>"></p>
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
			ci_metabox_dropdown('meta_placement', $options, __('Sidebar placement:', 'ci_theme'));
		ci_metabox_close_tab();
	?></div><?php

}
endif;

if( !function_exists('ci_cpt_event_save_meta') ):
function ci_cpt_event_save_meta( $post_id, $post ) {
	
	if ( !ci_can_save_meta( 'cpt_event' ) ) return;

	update_post_meta( $post_id, 'ci_cpt_event_recurrent', ci_sanitize_checkbox( $_POST['ci_cpt_event_recurrent'], 'enabled' ) );
	update_post_meta( $post_id, 'ci_cpt_event_recurrence', sanitize_text_field( $_POST['ci_cpt_event_recurrence'] ) );

	if ( ci_sanitize_checkbox( $_POST['ci_cpt_event_recurrent'], 'enabled' ) == 'enabled' ) {
		// Since it's a recurring event, we need to delete date and time information, so 
		// that it won't interfere with wp_query queries.
		delete_post_meta( $post_id, 'ci_cpt_event_date' );
		delete_post_meta( $post_id, 'ci_cpt_event_time' );
	} else {
		update_post_meta( $post_id, 'ci_cpt_event_date', sanitize_text_field( $_POST['ci_cpt_event_date'] ) );
		update_post_meta( $post_id, 'ci_cpt_event_time', sanitize_text_field( $_POST['ci_cpt_event_time'] ) );
	}

	update_post_meta( $post_id, 'ci_cpt_event_venue', sanitize_text_field( $_POST['ci_cpt_event_venue'] ) );
	update_post_meta( $post_id, 'ci_cpt_event_location', sanitize_text_field( $_POST['ci_cpt_event_location'] ) );

	update_post_meta( $post_id, 'ci_cpt_event_lon', sanitize_text_field( $_POST['ci_cpt_event_lon'] ) );
	update_post_meta( $post_id, 'ci_cpt_event_lat', sanitize_text_field( $_POST['ci_cpt_event_lat'] ) );

	update_post_meta( $post_id, 'ci_cpt_event_upcoming_button', sanitize_text_field( $_POST['ci_cpt_event_upcoming_button'] ) );
	update_post_meta( $post_id, 'ci_cpt_event_upcoming_url', esc_url_raw( $_POST['ci_cpt_event_upcoming_url'] ) );
	update_post_meta( $post_id, 'ci_cpt_event_past_button', sanitize_text_field( $_POST['ci_cpt_event_past_button'] ) );
	update_post_meta( $post_id, 'ci_cpt_event_past_url', esc_url_raw( $_POST['ci_cpt_event_past_url'] ) );

	update_post_meta( $post_id, 'ci_cpt_event_fields', ci_theme_sanitize_event_fields_repeating( $_POST ) );

	update_post_meta( $post_id, 'meta_placement', in_array( $_POST['meta_placement'], array('left', 'right') ) ? $_POST['meta_placement'] : '' );

}
endif;

//
// Event post type custom admin list
//
add_filter('manage_edit-cpt_event_columns', 'ci_cpt_event_edit_columns');
add_action('manage_posts_custom_column',  'ci_cpt_event_custom_columns');

if( !function_exists('ci_cpt_event_edit_columns') ):
function ci_cpt_event_edit_columns($columns)
{
	$new_columns = array(
		'cb'             => $columns['cb'],
		'title'          => __( 'Event Name', 'ci_theme' ),
		'event_location' => __( 'Event location', 'ci_theme' ),
		'event_date'     => __( 'Event Date', 'ci_theme' ),
		'date'           => $columns['date']
	);

	return $new_columns;
}
endif;

if( !function_exists('ci_cpt_event_custom_columns') ):
function ci_cpt_event_custom_columns($column)
{
	global $post;

	switch ( $column ) {
		case "event_location":
			echo get_post_meta( $post->ID, 'ci_cpt_event_location', true );
			break;
		case "event_date":
			echo get_post_meta( $post->ID, 'ci_cpt_event_date', true );
			break;

	}
}
endif;


if ( ! function_exists( 'ci_theme_sanitize_event_fields_repeating' ) ) :
function ci_theme_sanitize_event_fields_repeating( $POST_array ) {
	if ( empty( $POST_array ) || !is_array( $POST_array ) ) {
		return false;
	}

	$titles       = $POST_array['ci_cpt_event_fields_repeatable_title'];
	$descriptions = $POST_array['ci_cpt_event_fields_repeatable_description'];

	$count = max( count( $titles ), count( $descriptions ) );

	$new_fields = array();

	$records_count = 0;
	$allowed_html = array(
		'a'      => array(
			'href'  => array(),
			'class' => array(),
		),
		'span'   => array(
			'class' => array(),
		),
		'i'      => array(
			'class' => array(),
		),
		'b'      => array(),
		'em'     => array(),
		'strong' => array(),
	);

	for ( $i = 0; $i < $count; $i++ ) {
		if( empty( $titles[ $i ] ) && empty( $descriptions[ $i ] ) )
			continue;

		$new_fields[ $records_count ]['title']       = sanitize_text_field( $titles[ $i ] );
		$new_fields[ $records_count ]['description'] = wp_kses( $descriptions[ $i ], $allowed_html );
		$records_count++;
	}
	return $new_fields;
}
endif;


if( !function_exists('printable_event_cpt_datetime') ):
function printable_event_cpt_datetime()
{
	global $post;

	$recurrent  = get_post_meta( $post->ID, 'ci_cpt_event_recurrent', true ) == 'enabled' ? true : false;
	$recurrence = get_post_meta( $post->ID, 'ci_cpt_event_recurrence', true );
	$event_date = get_post_meta( $post->ID, 'ci_cpt_event_date', true );
	$event_time = get_post_meta( $post->ID, 'ci_cpt_event_time', true );

	if ( $recurrent ) {
		return $recurrence;
	} else {
		$dt = new DateTime();
		$dt->setDate( substr( $event_date, 0, 4 ), substr( $event_date, 5, 2 ), substr( $event_date, 8, 2 ) );
		$dt->setTime( substr( $event_time, 0, 2 ), substr( $event_time, 3, 2 ) );
		$datetime = date_i18n( get_option( 'date_format' ) . ' - ' . get_option( 'time_format' ), strtotime( $dt->format( 'F j Y, H:i' ) ) );

		return $datetime;
	}

}
endif;

if( !function_exists('attribute_event_cpt_datetime') ):
function attribute_event_cpt_datetime()
{
	global $post;

	$recurrent = get_post_meta($post->ID, 'ci_cpt_event_recurrent', true)=='enabled' ? true : false;
	$event_date = get_post_meta( $post->ID, 'ci_cpt_event_date', true );
	$event_time = get_post_meta( $post->ID, 'ci_cpt_event_time', true );

	if ( $recurrent ) {
		return '';
	} else {
		return $event_date . ' ' . $event_time;
	}

}
endif;

?>