### Remove comments

/removeComments.php Just import or include them in functions.php

// Maybe:  
Additionally, if selected true/yes, include comments block under pages & posts. if no, the comments block under pages & posts don´t get requested

### Style login import

/wp/styleLoginpage/ // Build process steps:  
Võta main-theme värvid ja pipe logo ja selle sisu uude kasuta

-   see css fail muuda sass-iks, lisa (if stylelogin true, pipe it separately [just from saas-to-css and into the build folder, as a separate style-login file
-   Logo.  
    võtaks logo variablest logo ja tõstaks selle ümber styleLoginpage kausta ja rename-ks selle logo.svg|png-ks
-   lisa teemavärvid kuskil mujal, ühest kohast [-variables, primary theme color, vms \*/

*   list of variables used in this file, mille import tuleks automatiseerida:
*
*   background-color
*   logo image file location (ant filetype)
*   logo image height
*   button color
*   button-hover color
*
*   Add:
*   automatically import form stylings
*   automatically importbutton stylings \*/
