<?php 
require_once 'inc/post_types.php';

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
          ),
        ) 
      ) 
    ) 
  );
}

add_action( 'wp_enqueue_scripts', 'jolt_scripts');
?>