<?php
  $title = is_front_page() ? get_bloginfo('name') : get_the_title() . ' | ' . get_bloginfo('name');
  $title = html_entity_decode($title, ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta property="og:title" content="<?php echo $title; ?>" />
    <meta name="twitter:title" content="<?php echo $title; ?>" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="<?php echo $title; ?>" />
    <?php if ( is_front_page() ) : ?>
      <meta property="og:description" content="<?php bloginfo('description'); ?>">
      <meta property="og:image" content="<?php bloginfo('template_url') ?>/screenshot.png" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:url" content="<?php bloginfo('url') ?>" />
      <meta name="description" content="<?php bloginfo('description'); ?>">
      <meta name="keywords" content="online radio, miami, local, eclectic, rock, house, indie, internet radio, world, music, vinyl, jolt, electronic, techno, dancehall, ambient, disco, hip hop, rap, independent">
    <?php else : 
      $post_id = get_queried_object_id();
      $post = get_post($post_id);
      $content = jolt_truncate( htmlspecialchars( wp_strip_all_tags($post->post_content) ) );
      $thumbnail_url = get_the_post_thumbnail_url($post_id, 'large');
      $permalink = get_permalink($post);
      $width = '700';
      $height = '700';

      if ( get_field('banner_image', $post_id) ) : 
        $banner_image = get_field('banner_image', $post_id);
        $width = $banner_image['sizes']['show-banner-width'];
        $height = $banner_image['sizes']['show-banner-height'];
        $thumbnail_url = $banner_image['sizes']['show-banner']; 
      endif;
    ?>
      <meta property="og:url" content=<?php echo $permalink ?> />
      <meta property="og:image" content="<?php echo $thumbnail_url ?>" />
      <meta property="og:image:width" content="<?php echo $width ?>" />
      <meta property="og:image:height" content="<?php echo $height ?>" />
      <meta property="og:description" content="<?php echo $content ?>">
      <meta property="twitter:description" content="<?php echo $content ?>">
      <meta name="twitter:image" content="<?php echo $thumbnail_url ?>" />
      <meta name="description" content="<?php echo $content ?>">
      <meta name="keywords" content="online radio, miami, local, eclectic, rock, house, indie, internet radio, world, music, vinyl, jolt, electronic, techno, dancehall, ambient, disco, hip hop, rap, independent">
    <?php endif; //is_front_page ?>
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@joltradio" />
    <link rel="manifest" href="<?php bloginfo('template_url') ?>/manifest.json">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_url') ?>/images/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php bloginfo('template_url') ?>/images/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php bloginfo('template_url') ?>/images/favicons/favicon-16x16.png">
    <link rel="manifest" href="<?php bloginfo('template_url') ?>/images/favicons/site.webmanifest">
    <link rel="mask-icon" href="<?php bloginfo('template_url') ?>/images/favicons/safari-pinned-tab.svg" color="#333333">
    <link rel="shortcut icon" href="<?php bloginfo('template_url') ?>/images/favicons/favicon.ico">
    <meta name="msapplication-TileColor" content="#fff41d">
    <meta name="msapplication-config" content="<?php bloginfo('template_url') ?>/images/favicons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">

    <title><?php echo $title; ?></title>
    <!-- style>body{background-color: #111; color: #111;}a{color:#111}</style -->
    <?php wp_head(); ?>
  </head>
  <body>
    <svg xmlns="https://www.w3.org/2000/svg" style="display:none">
      <symbol id="icon-play" viewBox="0 0 50 50">
        <path display="inline" d="M40.768,23.268L11.232,6.215c-0.619-0.357-1.381-0.357-2,0c-0.619,0.357-1,1.018-1,1.732v34.105
        c0,0.715,0.381,1.375,1,1.732c0.31,0.179,0.655,0.268,1,0.268s0.69-0.089,1-0.268l29.536-17.053c0.619-0.357,1-1.018,1-1.732
        S41.387,23.625,40.768,23.268z"/>
      </symbol>
      <symbol id="icon-pause" viewBox="0 0 50 50">
        <path display="inline" d="M16.559,5.92c-2.272,0-4.121,1.849-4.121,4.121v29.917c0,2.272,1.849,4.121,4.121,4.121
        s4.121-1.849,4.121-4.121V10.042C20.68,7.769,18.831,5.92,16.559,5.92z"/>
        <path display="inline" d="M33.191,5.92c-2.272,0-4.121,1.849-4.121,4.121v29.917c0,2.272,1.849,4.121,4.121,4.121
        s4.121-1.849,4.121-4.121V10.042C37.312,7.769,35.464,5.92,33.191,5.92z"/>
      </symbol>
      <symbol id="icon-stop" viewBox="0 0 50 50">
        <path d="M45,41.444C45,43.408,43.408,45,41.444,45H8.556C6.592,45,5,43.408,5,41.444V8.556C5,6.592,6.592,5,8.556,5h32.889 C43.408,5,45,6.592,45,8.556V41.444z"/>
      </symbol>
      <symbol id="icon-volume" viewBox="0 0 17 16">
          <polygon points="-0.016,5.368 2.599,5.368 6.522,1.424 6.522,14.568 2.599,10.625 -0.016,10.625 -0.016,7.997 "/>
          <path d="M15.676,7.997c0-2.7-0.933-5.179-2.49-7.122l0.982-0.878c1.76,2.177,2.815,4.963,2.815,8c0,3.038-1.056,5.822-2.815,8
            l-0.982-0.878C14.744,13.175,15.676,10.698,15.676,7.997z"/>
          <path d="M13.061,7.997c0-2.021-0.698-3.88-1.867-5.343l0.979-0.875c1.374,1.696,2.197,3.86,2.197,6.217s-0.823,4.521-2.195,6.218
            l-0.98-0.875C12.363,11.876,13.061,10.02,13.061,7.997z"/>
          <path d="M10.446,7.997c0-1.34-0.498-2.555-1.307-3.441V4.491l0.974-0.873c1.018,1.136,1.641,2.679,1.641,4.378
            s-0.623,3.242-1.641,4.377l-0.974-0.873v-0.063C9.948,10.551,10.446,9.336,10.446,7.997z"/>
      </symbol>
      <symbol id="icon-volume-off" viewBox="0 0 17 16">
        <polygon points="-0.016,5.368 2.599,5.368 6.522,1.424 6.522,14.568 2.599,10.625 -0.016,10.625 -0.016,7.997 "/>
        <rect x="7.18" y="7.367" transform="matrix(0.7071 0.7071 -0.7071 0.7071 8.4758 -4.7284)" width="5.53" height="1"/>
        <rect x="9.446" y="5.102" transform="matrix(0.7071 0.7071 -0.7071 0.7071 8.4761 -4.7283)" width="1" height="5.53"/>
      </symbol>
      <symbol id="icon-fb" viewBox="0 0 50 50">
        <path d="M35.319,17.691H27.4v-4.873c0-1.346,1.09-2.437,2.437-2.437h4.873V3.073h-6.091c-5.382,0-9.746,4.364-9.746,9.746v4.873H14 V25h4.873v21.928H27.4V25h6.092L35.319,17.691z"/>
      </symbol>
      <symbol id="icon-ig" viewBox="0 0 50 50">
        <path d="M33.527,3.072H16.473c-7.4,0-13.4,5.999-13.4,13.4v17.055c0,7.4,6,13.4,13.4,13.4h17.055c7.4,0,13.4-6,13.4-13.4V16.473 C46.928,9.071,40.928,3.072,33.527,3.072z M43.273,33.527c-0.006,5.38-4.366,9.74-9.746,9.746H16.473 c-5.38-0.006-9.741-4.366-9.746-9.746V16.473c0.005-5.38,4.366-9.74,9.746-9.746h17.055c5.38,0.006,9.74,4.366,9.746,9.746V33.527z"/>
        <path d="M25,14.036c-6.055,0-10.964,4.909-10.964,10.964c0,6.056,4.909,10.965,10.964,10.965c6.056,0,10.965-4.909,10.965-10.965 C35.965,18.945,31.056,14.036,25,14.036z M25,32.309c-4.035,0-7.309-3.273-7.309-7.309c0-4.037,3.274-7.309,7.309-7.309 s7.309,3.272,7.309,7.309C32.305,29.035,29.035,32.305,25,32.309z"/>
        <circle cx="36.451" cy="13.548" r="2.437"/>
      </symbol>
      <symbol id="icon-bolt" viewBox="0 0 50 50">
        <path d="M13.768,0.52c2.578-0.068,9.877-0.063,16.5,1.888c0.622,0.184,1.121,0.61,1.433,1.174c1.312,2.328,4.651,8.897,4.858,15.233
          c0.01,0.22-0.217,0.395-0.437,0.344l-2.407-0.6c-0.258-0.045-0.484,0.192-0.416,0.431c0.506,1.783,1.849,7.611,0.7,14.68
          c-0.03,0.246-0.307,0.383-0.527,0.247l-1.742-1.123c-0.232-0.128-0.527,0.039-0.52,0.317c0.118,2.501,0.231,11.439-4.515,16.277
          c-0.24,0.25-0.661,0.053-0.573-0.294c0.651-3.303,2.132-13.726-3.373-22.643c-0.147-0.268,0.07-0.602,0.371-0.523l2.704,0.701
          c0.229,0.065,0.445-0.125,0.413-0.35c-0.182-1.674-1.155-7.435-6.58-13.992c-0.172-0.249-0.011-0.605,0.306-0.56l3.112,0.398
          c0.268,0.039,0.479-0.253,0.352-0.491c-0.759-1.441-3.265-5.58-9.85-10.509C13.33,0.948,13.434,0.508,13.768,0.52"/>
      </symbol>
      <symbol id="icon-search" viewBox="0 0 50 50">
        <path d="M46.894,40.976l-11.52-11.521c1.644-2.686,2.642-5.814,2.642-9.197c0-9.806-7.955-17.758-17.758-17.758
	      c-9.805,0-17.758,7.953-17.758,17.758c0,9.803,7.953,17.758,17.758,17.758c3.383,0,6.511-0.998,9.196-2.636l11.521,11.515
	      c0.81,0.809,2.15,0.803,2.96,0l2.959-2.961C47.703,43.126,47.703,41.785,46.894,40.976z M20.257,32.097
	      c-6.538,0-11.839-5.301-11.839-11.838c0-6.538,5.301-11.839,11.839-11.839c6.538,0,11.838,5.301,11.838,11.839
	      C32.096,26.796,26.795,32.097,20.257,32.097z"/>
      </symbol>
      <symbol id="icon-x" viewBox="0 0 50 50">
        <path d="M29.545,25L46.559,7.987c1.255-1.255,1.255-3.29,0-4.545c-1.256-1.256-3.29-1.256-4.546,0L25,20.455L7.987,3.442
        c-1.255-1.256-3.29-1.256-4.545,0c-1.256,1.255-1.256,3.29,0,4.545L20.455,25L3.442,42.013c-1.256,1.256-1.256,3.29,0,4.546
        c0.627,0.628,1.45,0.941,2.272,0.941s1.645-0.313,2.272-0.941L25,29.545l17.013,17.014c0.628,0.628,1.45,0.941,2.273,0.941
        c0.822,0,1.645-0.313,2.272-0.941c1.255-1.256,1.255-3.29,0-4.546L29.545,25z"/>
      </symbol>
    </svg>
    <div id="root" class="root">
      <div class="load-overlay load-overlay--active"></div>
      <noscript>
        <div class="ns-content">
          <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
          <h1><?php the_title(); ?></h1>
          <?php the_content(); endwhile; endif; ?>

          <audio
            id="ns-player"
            className="ns-content__audio-player"
            preload="metadata"
            src="https://streamer.radio.co/sd8ab6b5aa/listen"
          >
            Your browser can't play this. Try
            <a href="https://www.getfirefox.com">Firefox browser</a>.
          </audio>
          <a href="https://streamer.radio.co/sd8ab6b5aa/listen">Direct link to audio stream</a></div>
        </div>
      </noscript>
      
    </div>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-3 offset-md-1">
            <h5 class="footer__title">Jolt Radio</h5>
            <p class="footer__text">
              <?php the_field('about', 'option') ?>
            </p>
          </div>
          <div class="col-md-3 offset-md-1">
            <h5 id="contact" class="footer__title">Contact</h5>
            <p class="footer__text">
              General Inquiries<br>
              <a class="footer__link" href="mailto:<?php the_field('general_email', 'option') ?>"><?php the_field('general_email', 'option') ?></a>
            </p>
            <p class="footer__text">
              Address<br>
              <?php the_field('address', 'option') ?>
            </p>
          </div>
          <div class="col-md-2">
            <h5 class="footer__title">Apps</h5>
            <p class="footer__text">
              <?php if (get_field('ios_url', 'option') ) : ?>
                <a class="footer__link" href="<?php the_field('ios_url', 'option') ?>" target="_blank" rel="nofollow noreferer">iOS</a><br>
              <?php endif; ?>
              <?php if (get_field('android_url', 'option') ) : ?>
                <a class="footer__link" href="<?php the_field('android_url', 'option') ?>" target="_blank" rel="nofollow noreferer">Android</a><br>
              <?php endif; ?>
            </p>
          </div>
          <div class="col-md-2">
            <h5 class="footer__title">Follow Us</h5>
            <p class="footer__text">
              <?php if (get_field('ig_url', 'option') ) : ?>
                <a class="footer__link" href="<?php the_field('ig_url', 'option') ?>" target="_blank" rel="nofollow noreferer">Instagram</a><br>
              <?php endif; ?>
              <?php if (get_field('fb_url', 'option') ) : ?>
                <a class="footer__link" href="<?php the_field('fb_url', 'option') ?>" target="_blank" rel="nofollow noreferer">Facebook</a><br>
              <?php endif; ?>
              <?php if (get_field('mix_url', 'option') ) : ?>
                <a class="footer__link" href="<?php the_field('mix_url', 'option') ?>" target="_blank" rel="nofollow noreferer">Mixcloud</a><br>
              <?php endif; ?>
              <?php if (get_field('tw_url', 'option') ) : ?>
                <a class="footer__link" href="<?php the_field('tw_url', 'option') ?>" target="_blank" rel="nofollow noreferer">Twitter</a><br>
              <?php endif; ?>
            </p>
          </div>
        </div>
      </div>
    </footer>
    <?php wp_footer(); ?>
  </body>
</html>
