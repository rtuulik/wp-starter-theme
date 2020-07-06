<?php
//If you're using this in your functions.php file, remove the opening <?php

//Replace style-login.css with the name of your custom CSS file
function reigo_custom_login_stylesheet() {
	wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/src/wp/style-login-page/style-login.css' );
}
//This loads the function above on the login page
add_action( 'login_enqueue_scripts', 'reigo_custom_login_stylesheet' );



// changing the logo link from wordpress.org to your site
function reigo_login_url() {  return home_url(); }
add_filter( 'login_headerurl', 'reigo_login_url' );
// if you're on a Network/MultiSite you might need network_home_url() instead

// changing the alt text on the logo to show your site name
function reigo_login_title() { return get_option( 'blogname' ); }
add_filter( 'login_headertitle', 'reigo_login_title' );
