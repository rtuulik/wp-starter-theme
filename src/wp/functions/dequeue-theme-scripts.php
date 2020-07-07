<?php

function reigo_dequeue_theme_scripts(){
//	wp_dequeue_script( '_s-navigation' );	// remove link to /js/navigation.js in functions.php
	wp_dequeue_style( '_s-style' );
}
add_action( 'wp_enqueue_scripts', 'reigo_dequeue_theme_scripts', 100 );

function reigo_enqueue_theme_scripts(){
	wp_enqueue_script( 'main.min.js', get_template_directory_uri() . '/dist/js/main.min.js', array(), null, true );	// concatinated and minified main.min.js
	wp_enqueue_style( 'main.min.css', get_template_directory_uri() . '/dist/css/main.min.css', array(), null, 'all');
}
add_action( 'wp_enqueue_scripts', 'reigo_enqueue_theme_scripts', 100 );
