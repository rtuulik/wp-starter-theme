/*
*
*/

const wpSettings = {

	createChildTheme: false,	



	noComments = true,	// hide all comments from admin  
	styleLoginPage = true,	// styles login page based on new logo, and main theme colors
	redirectAttachmentPages: true, // redirect attachment pages to parent post


	createChildTheme: false,	
	includeWooCommerce = false
	// Add Custom Editor Color Palette
};

const wpBlocks = {
	slider = false,	// simple and easy JS based slider. First, use ACF to enter content, later try to strive for native looking block. +slider should be touch usable.
	contactForm = false,
	contactFormPakiautomaadid: false,	// võtab nimekirjast Omniva, DPD, Smartpost pakiautomaadid ja paneb juba wcf7 sobivasse vormi
}

const wooCommerce = {
	productFilter = false,
	addProductsToCartAnimation = false,
	productGalery = false,	// product gallery view and zoom
	singleProductTemplate = 0,	// mitu erinevat layout-i valikus ette valmistatud
}

const wpFilePaths = {
	logo: "dist/img/logo.svg", 
}


/*
* To Do:
* - Test & verify that redirect-attachmnet-pages works correctly (tõstsin lihtsalt plugina pealt ümber php faili)
* - Strip PHP failide aslgusest <?php kui sa need lihtsalt functions.php-sse enqueued. (samas äkki parem lihtsalt /include-da function.php-sse?)
-  käi kõik functions.php-sse minevad koodijupid üle, ja vaata et oleks reigo-xxx nimedel ees. Unified standard, ja väldib ninmekonflikte
*
*/

