<?php 
require_once 'inc/post_types.php';

// Remove WP emoji stuff
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
	
add_theme_support( 'post-thumbnails' );
add_action( 'after_setup_theme', 'jolt_theme_setup' );
function jolt_theme_setup() {
    add_image_size( 'card', 352, 198, true );
    add_image_size( 'show-banner', 1120, 630, true );
}

if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}

function jolt_scripts() {
  wp_enqueue_script( 'jolt-script', get_stylesheet_directory_uri() . '/dist/app.js' , array(), '1.0', true );

  $url = trailingslashit( home_url() );
  $path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

  $ig_url = $fb_url = $android_url = $ios_url = $mix_url = '#';

  if ( get_field('ios_url', 'option') ) $ios_url = get_field('ios_url', 'option');
  if ( get_field('android_url', 'option') ) $android_url = get_field('android_url', 'option');
  if ( get_field('mix_url', 'option') ) $mix_url = get_field('mix_url', 'option');
  if ( get_field('ig_url', 'option') ) $ig_url = get_field('ig_url', 'option');
  if ( get_field('fb_url', 'option') ) $fb_url = get_field('fb_url', 'option');

  wp_scripts()->add_data( 'jolt-script', 'data', sprintf( 'var JoltSettings = %s;', wp_json_encode( array(
        'title' => get_bloginfo( 'name', 'display' ),
        'path' => $path,
        'URL' => array(
            'api' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
            'acf' => esc_url_raw( get_rest_url( null, '/acf/v3' ) ),
            'root' => esc_url_raw( $url ),
            'template' => esc_url_raw( get_stylesheet_directory_uri() ),
            'iosApp' => esc_url_raw( $ios_url ),
            'androidApp' => esc_url_raw( $android_url ),
            'mixcloud' => esc_url_raw( $mix_url ),
            'ig' => esc_url_raw( $ig_url ),
            'fb' => esc_url_raw( $fb_url )
          )
        ) 
      ) 
    ) 
  );
}

add_action( 'wp_enqueue_scripts', 'jolt_scripts' );

function jolt_register_fields() {
  // Add Featured Image
  register_rest_field( ['post', 'cpt_artist'],
      'featured_image_srcset',
      array(
          'get_callback'      => 'jolt_get_image_srcset',
          'update_callback'   => null,
          'schema'            => null
      )
  );
}
add_action( 'rest_api_init', 'jolt_register_fields' );

function jolt_get_image_srcset( $object, $field_name, $request ) {
  if($object[ 'featured_media' ] == 0) {
      return $object[ 'featured_media' ];
  }
  $feat_img_array = wp_get_attachment_image_srcset( $object[ 'featured_media' ], 'full', true );
  return $feat_img_array;
}

function jolt_get_category_names( $object, $field_name, $request ) {
  $formatted_categories = array();
  //$categories = get_the_terms( $object['id'], 'artist-category' );
  $categories = get_taxonomies( array('artist-category') );

  foreach ($categories as $category) {
    $formatted_categories[] = array( 
      'id' => $category->term_id,
      'slug' => $category->slug
    );
  }

  return $formatted_categories;
}

function jolt_truncate($text, $chars = 300) {
  if (strlen($text) <= $chars) {
      return $text;
  }
  $text = $text." ";
  $text = substr($text,0,$chars);
  $text = substr($text,0,strrpos($text,' '));
  $text = $text."...";
  return $text;
}