# Build process

1. Download repo
2. npm install
3. "gulp compileTheme"  
   Will take latest undescores theme and move files around for the most convinient development
4. "gulp addFunctions"  
   temporarily have to give two commands to build theme
5. "gulp"  
   Will compile sass/js/font/img files
6. Build your theme..

# DATED:

## Starter theme build with Piret.

Step-by-step, will automate most repetetive tasks and coding when setting up a new website or store for the client.  
Built on Elementor Hello theme(so that Piret can participate by styling)

# Build process

1. Choose your child theme parts, blocks & settings in your /build/ folder gulpfile
2. run gulp build
3. gulp creates a child theme based on selected options, creating suitable blocks, css files, colors, logo image, functions.php settings, and a new gulpfile.js
4. Child theme already has all wp blocks created/imported, sass files ready, js files ready to concat/minify
5. cd to new folder
6. Run new gulpfile, "gulp". It will build styles and output a new child theme with everything running in order

// Folders:

7. BuildChildTheme  
   // Contains all parts, you choose options and run "gulp build", outputs result to /dev/ folder. Run only once.
8. Dev/actual child theme code.  
   // This is where you edit your css & JS and make edits to templates where needed.  
   run "gulp" to get all the sass to concat&minified, etc  
   Outputs final, uploadable theme parts to the /build/ folder
9. Final Build folder. Just copy and upload contents  
   // local dev server takes their theme files from here. There are no changes made here  
   Just upload contents from this folder to live server if you want to update

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
