<?php 
require_once 'inc/post_types.php';
	
add_theme_support( 'post-thumbnails' );
add_action( 'after_setup_theme', 'jolt_theme_setup' );
function jolt_theme_setup() {
    add_image_size( 'card', 352, 198, true );
    add_image_size( 'show-banner', 1120, 630, true );
}

function jolt_scripts() {
  wp_enqueue_script( 'jolt-script', get_stylesheet_directory_uri() . '/dist/app.js' , array(), '1.0', true );

  $url = trailingslashit( home_url() );
  $path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

  wp_scripts()->add_data( 'jolt-script', 'data', sprintf( 'var JoltSettings = %s;', wp_json_encode( array(
        'title' => get_bloginfo( 'name', 'display' ),
        'path' => $path,
        'URL' => array(
            'api' => esc_url_raw( get_rest_url( null, '/wp/v2' ) ),
            'root' => esc_url_raw( $url ),
            'template' => esc_url_raw( get_stylesheet_directory_uri() )
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

  // register_rest_field( 'cpt_artist',
  // 'category_names',
  //   array(
  //       'get_callback'    => 'jolt_get_category_names',
  //       'update_callback' => null,
  //       'schema'          => null,
  //   )
  // );
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