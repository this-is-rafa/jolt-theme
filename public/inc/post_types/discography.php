<?php
//
// discography post type related functions.
//
add_action( 'init', 'ci_create_cpt_discography' );

if( !function_exists('ci_create_cpt_discography') ):
function ci_create_cpt_discography()
{
	$labels = array(
		'name'               => _x( 'Discography', 'post type general name', 'ci_theme' ),
		'singular_name'      => _x( 'Discography Item', 'post type singular name', 'ci_theme' ),
		'menu_name'          => _x( 'Discography', 'admin menu', 'ci_theme' ),
		'name_admin_bar'     => _x( 'Discography Item', 'add new on admin bar', 'ci_theme' ),
		'add_new'            => __( 'Add New', 'ci_theme' ),
		'add_new_item'       => __( 'Add New Discography Item', 'ci_theme' ),
		'edit_item'          => __( 'Edit Discography Item', 'ci_theme' ),
		'new_item'           => __( 'New Discography Item', 'ci_theme' ),
		'view_item'          => __( 'View Discography Item', 'ci_theme' ),
		'search_items'       => __( 'Search Discography Items', 'ci_theme' ),
		'not_found'          => __( 'No Discography Items found', 'ci_theme' ),
		'not_found_in_trash' => __( 'No Discography Items found in the trash', 'ci_theme' ),
		'parent_item_colon'  => __( 'Parent Discography Item:', 'ci_theme' )
	);

	$args = array(
		'labels'          => $labels,
		'singular_label'  => __( 'Discography Item', 'ci_theme' ),
		'public'          => true,
		'show_ui'         => true,
		'capability_type' => 'post',
		'hierarchical'    => false,
		'has_archive'     => _x( 'discography-archive', 'post type archive slug', 'ci_theme' ),
		'rewrite'         => array( 'slug' => _x( 'discography', 'post type slug', 'ci_theme' ) ),
		'menu_position'   => 5,
		'supports'        => array( 'title', 'editor', 'thumbnail' ),
		'menu_icon'       => 'dashicons-format-audio'
	);

	register_post_type( 'cpt_discography' , $args );

}
endif;

add_action( 'load-post.php', 'ci_discography_meta_boxes_setup' );
add_action( 'load-post-new.php', 'ci_discography_meta_boxes_setup' );

if( !function_exists('ci_discography_meta_boxes_setup') ):
function ci_discography_meta_boxes_setup() {
	add_action( 'add_meta_boxes', 'ci_discography_add_meta_boxes' );
	add_action( 'save_post', 'ci_discography_save_meta', 10, 2 );
}
endif;

if( !function_exists('ci_discography_add_meta_boxes') ):
function ci_discography_add_meta_boxes() {
	add_meta_box( 'discography-box', __( 'Discography Settings', 'ci_theme' ), 'ci_discography_score_meta_box', 'cpt_discography', 'normal', 'high' );
}
endif;

if( !function_exists('ci_discography_score_meta_box') ):
function ci_discography_score_meta_box( $object, $box ) {
	ci_prepare_metabox('cpt_discography');

	?><div class="ci-cf-wrap"><?php
		ci_metabox_open_tab( __( 'Details', 'ci_theme' ) );
			ci_metabox_input( 'ci_cpt_discography_date', __( 'Release Date.', 'ci_theme' ) );
			ci_metabox_input( 'ci_cpt_discography_label', __( 'Record Label.', 'ci_theme' ) );
			ci_metabox_input( 'ci_cpt_discography_cat_no', __( 'Catalog Number.', 'ci_theme' ) );
		ci_metabox_close_tab();

		ci_metabox_open_tab( __( 'Information', 'ci_theme' ) );
			ci_metabox_guide( array(
				__( 'You may include as many rows of information as you want. Press <em>Add Field</em> to add a new row. Press <em>Remove me</em> to delete a specific row. You can rearrange rows by drag and drop. You may leave empty the title or the description, but not both.', 'ci_theme' ),
				__( 'Allowed tags in description: a (href, class), span (class), i (class), b, em, strong. E.g.: <code>&lt;a href="#" class="btn">Button text&lt;/a></code>', 'ci_theme' ),
			) );
			?>
			<fieldset class="ci-repeating-fields">
				<div class="inner">
					<?php
						$fields = get_post_meta( $object->ID, 'ci_cpt_discography_fields', true );

						if ( ! empty( $fields ) ) {
							foreach ( $fields as $field ) {
								?>
								<div class="post-field">
									<p>
										<label><?php _e( 'Title:', 'ci_theme' ); ?>
											<input type="text" name="ci_cpt_discography_fields_repeatable_title[]" value="<?php echo esc_attr( $field['title'] ); ?>" class="widefat" />
										</label>
									</p>
									<p>
										<label><?php _e( 'Description:', 'ci_theme' ); ?>
											<input type="text" name="ci_cpt_discography_fields_repeatable_description[]" value="<?php echo esc_attr( $field['description'] ); ?>" class="widefat" />
										</label>
									</p>
									<p class="ci-repeating-remove-action"><a href="#" class="button ci-repeating-remove-field"><i class="dashicons dashicons-dismiss"></i><?php _e( 'Remove me', 'ci_theme' ); ?></a></p>
								</div>
								<?php
							}
						}
						?>
						<div class="post-field field-prototype" style="display: none;">
							<p>
								<label><?php _e( 'Title:', 'ci_theme' ); ?>
									<input type="text" name="ci_cpt_discography_fields_repeatable_title[]" value="" class="widefat" />
								</label>
							</p>
							<p>
								<label><?php _e( 'Description:', 'ci_theme' ); ?>
									<input type="text" name="ci_cpt_discography_fields_repeatable_description[]" value="" class="widefat" />
								</label>
							</p>
							<p class="ci-repeating-remove-action"><a href="#" class="button ci-repeating-remove-field"><i class="dashicons dashicons-dismiss"></i><?php _e( 'Remove me', 'ci_theme' ); ?></a></p>
						</div>
				</div>
				<a href="#" class="ci-repeating-add-field button"><i class="dashicons dashicons-plus-alt"></i><?php _e('Add Field', 'ci_theme'); ?></a>
			</fieldset>
			<?php
		ci_metabox_close_tab();


		ci_metabox_open_tab( __( 'Tracks', 'ci_theme' ) );
			ci_metabox_guide( __( 'You may add the tracks of your release, along with related information such as a Download URL, Buy URL and lyrics. Press the <em>Add Track</em> button to add a new track, and individually the <em>Remove me</em> button to delete a track. You can also use a SoundCloud URL in place of the Play URL.', 'ci_theme' ) );
			?>
			<div id="ci_repeating_tracks" class="ci-repeating-fields">
				<a href="#" class="ci-repeating-add-field button"><i class="dashicons dashicons-plus-alt"></i><?php _e('Add Track', 'ci_theme'); ?></a>
				<table class="tracks inner">
					<thead>
					 <tr>
						 <th class="tracks-no"><?php _e( '#', 'ci_theme' ); ?></th>
						 <th><?php _e( 'Title', 'ci_theme' ); ?></th>
						 <th><?php _e( 'Subtitle', 'ci_theme' ); ?></th>
						 <th><?php _e( 'Buy URL', 'ci_theme' ); ?></th>
						 <th><?php _e( 'Play URL', 'ci_theme' ); ?></th>
						 <th><?php _e( 'Download URL', 'ci_theme' ); ?></th>
						 <th class="tracks-action"></th>
					 </tr>
					</thead>
						<?php
							$fields = get_post_meta($object->ID, 'ci_cpt_discography_tracks', true);

							if ( ! empty( $fields ) ) {
								$i = 0;
								foreach ( $fields as $field ) {
									$i++;
									?>
									<tbody class="track-group post-field">
										<tr>
											<td class="tracks-no" rowspan="2"><span class="dashicons dashicons-sort"></span><?php _ex('#', 'track number', 'ci_theme'); ?><span class="track-num"><?php echo $i; ?></span></td>
											<td class="tracks-field"><input type="text" name="ci_cpt_discography_tracks_repeatable_title[]" placeholder="<?php _e('Title', 'ci_theme'); ?>" value="<?php echo esc_attr($field['title']); ?>" /></td>
											<td class="tracks-field"><input type="text" name="ci_cpt_discography_tracks_repeatable_artist[]" placeholder="<?php _e('Artist', 'ci_theme'); ?>" value="<?php echo esc_attr($field['artist']); ?>" /></td>
											<td class="tracks-field"><input type="text" name="ci_cpt_discography_tracks_repeatable_buy_url[]" placeholder="<?php _e('Buy URL', 'ci_theme'); ?>" value="<?php echo esc_url($field['buy_url']); ?>" /></td>
											<td class="tracks-field"><div class="wp-media-buttons"><input type="text" name="ci_cpt_discography_tracks_repeatable_play_url[]" placeholder="<?php _e('Play URL', 'ci_theme'); ?>" value="<?php echo esc_url($field['play_url']); ?>" class="uploaded with-button" /><a href="#" class="ci-upload ci-upload-track button add_media"><span class="wp-media-buttons-icon"></span></a></div></td>
											<td class="tracks-field"><input type="text" name="ci_cpt_discography_tracks_repeatable_download_url[]" placeholder="<?php _e('Download URL', 'ci_theme'); ?>" value="<?php echo esc_url($field['download_url']); ?>" /></td>
											<td class="tracks-action"><a href="#" class="ci-repeating-remove-field"><span class="dashicons dashicons-no"></span></a></td>
										</tr>
										<tr>
											<td class="tracks-field" colspan="6"><textarea placeholder="<?php _e('Song Lyrics', 'ci_theme'); ?>" name="ci_cpt_discography_tracks_repeatable_lyrics[]"><?php echo esc_textarea($field['lyrics']); ?></textarea></td>
										</tr>
									</tbody>
									<?php
								}
							}
						?>
						<tbody class="track-group post-field field-prototype" style="display: none;">
							<tr>
								<td class="tracks-no" rowspan="2"><span class="dashicons dashicons-sort"></span><?php _ex('#', 'track number', 'ci_theme'); ?><span class="track-num"></span></td>
								<td class="tracks-field"><input type="text" name="ci_cpt_discography_tracks_repeatable_title[]" placeholder="<?php _e('Title', 'ci_theme'); ?>" value="" /></td>
								<td class="tracks-field"><input type="text" name="ci_cpt_discography_tracks_repeatable_artist[]" placeholder="<?php _e('Artist', 'ci_theme'); ?>" value="" /></td>
								<td class="tracks-field"><input type="text" name="ci_cpt_discography_tracks_repeatable_buy_url[]" placeholder="<?php _e('Buy URL', 'ci_theme'); ?>" value="" /></td>
								<td class="tracks-field"><div class="wp-media-buttons"><input type="text" name="ci_cpt_discography_tracks_repeatable_play_url[]" placeholder="<?php _e('Play URL', 'ci_theme'); ?>" value="" class="uploaded with-button" /><a href="#" class="ci-upload ci-upload-track button add_media"><span class="wp-media-buttons-icon"></span></a></div></td>
								<td class="tracks-field"><input type="text" name="ci_cpt_discography_tracks_repeatable_download_url[]" placeholder="<?php _e('Download URL', 'ci_theme'); ?>" value="" /></td>
								<td class="tracks-action"><a href="#" class="ci-repeating-remove-field"><span class="dashicons dashicons-no"></span></a></td>
							</tr>
							<tr>
								<td class="tracks-field" colspan="6"><textarea placeholder="<?php _e('Song Lyrics', 'ci_theme'); ?>" name="ci_cpt_discography_tracks_repeatable_lyrics[]"></textarea></td>
							</tr>
						</tbody>
				</table>
				<a href="#" class="ci-repeating-add-field button"><i class="dashicons dashicons-plus-alt"></i><?php _e('Add Track', 'ci_theme'); ?></a>
			</div>
			<?php
			ci_metabox_guide( array(
				__( 'Your tracks will be displayed on top of your content. If you want to show them in another place in the content, you can use the <code>[tracklisting]</code> shortcode at the desired position.', 'ci_theme' ),
				__( 'The <code>[tracklisting]</code> shortcode, by default will display the tracks of the current discography item. You may also display the track listing of any discography item in any other post/page or widget (that supports shortcodes) by passing the <code>ID</code> or <code>slug</code> parameter to the shortcode. E.g. <code>[tracklisting id="25"]</code> or <code>[tracklisting slug="the-division-bell"]</code>', 'ci_theme' ),
				__( 'You can also selectively display tracks, by passing their track number (counting from 1), separated by a comma, like this <code>[tracklisting tracks="2,5,8"]</code> and can limit the total number of tracks displayed like <code>[tracklisting limit="3"]</code>', 'ci_theme' ),
				__( 'Of course, you can mix and match the parameters, so the following is totally valid: <code>[tracklisting slug="the-division-bell" tracks="2,5,8" limit="2"]</code>', 'ci_theme' ),
				__( "You may also add a SoundCloud track by copying the track's URL (the one given by it's <em>Share</em> button) and pasting it into the Play URL field.", 'ci_theme' ),
			) );
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

	?></div><!-- /ci-cf-wrap --><?php

}
endif;

if( !function_exists('ci_discography_save_meta') ):
function ci_discography_save_meta( $post_id, $post ) {
	
	if ( !ci_can_save_meta('cpt_discography') ) return;

	update_post_meta( $post_id, 'ci_cpt_discography_date', sanitize_text_field( $_POST['ci_cpt_discography_date'] ) );
	update_post_meta( $post_id, 'ci_cpt_discography_label', sanitize_text_field( $_POST['ci_cpt_discography_label'] ) );
	update_post_meta( $post_id, 'ci_cpt_discography_cat_no', sanitize_text_field( $_POST['ci_cpt_discography_cat_no'] ) );

	update_post_meta( $post_id, 'ci_cpt_discography_fields', ci_theme_sanitize_discography_fields_repeating( $_POST ) );
	update_post_meta( $post_id, 'ci_cpt_discography_tracks', ci_theme_sanitize_discography_tracks_repeating( $_POST ) );

	update_post_meta( $post_id, 'meta_placement', in_array( $_POST['meta_placement'], array('left', 'right') ) ? $_POST['meta_placement'] : '' );
}
endif;

if ( ! function_exists( 'ci_theme_sanitize_discography_fields_repeating' ) ) :
function ci_theme_sanitize_discography_fields_repeating( $POST_array ) {
	if ( empty( $POST_array ) || !is_array( $POST_array ) ) {
		return false;
	}

	$titles       = $POST_array['ci_cpt_discography_fields_repeatable_title'];
	$descriptions = $POST_array['ci_cpt_discography_fields_repeatable_description'];

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

if ( ! function_exists( 'ci_theme_sanitize_discography_tracks_repeating' ) ) :
function ci_theme_sanitize_discography_tracks_repeating( $POST_array ) {
	if ( empty( $POST_array ) || !is_array( $POST_array ) ) {
		return array();
	}

	$titles        = $POST_array['ci_cpt_discography_tracks_repeatable_title'];
	$artists       = $POST_array['ci_cpt_discography_tracks_repeatable_artist'];
	$buy_urls      = $POST_array['ci_cpt_discography_tracks_repeatable_buy_url'];
	$download_urls = $POST_array['ci_cpt_discography_tracks_repeatable_download_url'];
	$play_urls     = $POST_array['ci_cpt_discography_tracks_repeatable_play_url'];
	$lyrics        = $POST_array['ci_cpt_discography_tracks_repeatable_lyrics'];

	$count = max(
		count( $titles ),
		count( $artists ),
		count( $buy_urls ),
		count( $download_urls ),
		count( $play_urls ),
		count( $lyrics )
	);

	$new_fields = array();

	$records_count = 0;

	for ( $i = 0; $i < $count; $i++ ) {
		if ( empty( $titles[$i] )
			&& empty( $artists[$i] )
			&& empty( $buy_urls[$i] )
			&& empty( $download_urls[$i] )
			&& empty( $play_urls[$i] )
			&& empty( $lyrics[$i] )
		) {
			continue;
		}

		$new_fields[ $records_count ]['title']        = sanitize_text_field( $titles[ $i ] );
		$new_fields[ $records_count ]['artist']       = sanitize_text_field( $artists[ $i ] );
		$new_fields[ $records_count ]['buy_url']      = esc_url_raw( $buy_urls[ $i ] );
		$new_fields[ $records_count ]['download_url'] = esc_url_raw( $download_urls[ $i ] );
		$new_fields[ $records_count ]['play_url']     = esc_url_raw( $play_urls[ $i ] );
		$new_fields[ $records_count ]['lyrics']       = wp_kses_post( $lyrics[ $i ] );

		$records_count++;
	}
	return $new_fields;
}
endif;
