# Starter theme build with Piret.

Step-by-step, will automate most repetetive tasks and coding when setting up a new website or store for the client.  
Built on Elementor Hello theme(so that Piret can participate by styling)

# Build process

1. Choose your child theme parts, blocks & settings in your /build/ folder gulpfile
2. run gulp build
3. gulp creates a child theme based on selected options, creating suitable blocks, css files, colors, logo image, functions.php settings, and a new gulpfile.js
4. Child theme already has all wp blocks created/imported, sass files ready, js files ready to concat/minify
5. cd to new folder
6. Run new gulpfile, "gulp". It will build styles and output a new child theme with everything running in order

## List of tasks and designs you can automate using this

### Finished tasks and their commands

### Unfin automations

#### Gulp

-   Gulp combine, concat and minify sass files
-   combine and minify JS files
-   add that cahce buster to your gulp(link is hash of file contents)

#### Theme styling

-   Take logo & primary colors, and output branded login screen
-   set and import fonts globally
-   takes theme name input and creates a child theme automatically (name, slug, theme image is logo)

#### WooCommerce

-   Filter products
-   variatsioon tootegaleriist/lightboxist
