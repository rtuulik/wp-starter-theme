## But why

This project exists to step-by-step automate most repetetive tasks and coding that happen when creating a theme or setting the new website up for the custoemer for the first time.  
After various blocks and menus have been added, you should be able to cut down time spent on a new website by at leat half.

# Build process

1. Download repo
2. "npm install" for all of your devDependency needs
3. ~~Go through settings.js and select your theme options, blocks & settings~~ (settings are work in process currently)
4. Run "gulp compileTheme"  
   Takes the latest underscores theme and combined with the ~~options you selected, creates you a theme which already includes all needed (native looking)blocks, responsive menus, cookie controls, colors, fonts, logos, speed and various optimizations~~ 2.5. Run "gulp addFunctions", temporary build step. Will be removed later.
5. Run "gulp" and start coding on the new base theme, already having most of what you need prebuilt
6. Write and adjust your theme as needed. And if you have to build something that is missing, add it to the project.
7. When you are done, run "gulp zip" and get your theme files nicelly zipped for uploading

---

## Things to improve next:

### Theme build process

-   Cache buster based on file hash(so that you will always have cahce busting enabled by default & build times are shorter if you don´t need to run the whole build every time you change the CSS file). Add separate watchers
-   "gulp zip" to zip up all completed theme files(and leaving unneeded dev files behind)
-   Rename theme slug, name, theme folder, script names, etc based on theme name variable during the inital theme compialtion(\_s github readme has good directions).  
    Kui theme files rename toimub, siis ära unusta ära asendada ka wp_dequeue_script( '\_s-navigation' ); scripti jupp mis läheb functions.phpsse. Muidu saab link 404
-   Move all optional settings to a separate gulp-buil-file. Oterwise the gulpfile can get quite long, messy and confusing
-   Take logo variable & primary colors, and output branded login screen (need to create a single place for all color variables and logo file)
-   set and import fonts globally, if enabled. otherwise use system font stack
-   some sort of grid system would be nice to be already included. Otherwise will ahve to include Bootstraps one again :´(
-   Don´t queue root/woocommerce.css file on the frontend. Don´t add wooCommerce if wooCommerce if wooCommerce hasn´t been set to true under settings.
-   eemalda kõik kommentaarid(ka PHP failidest), sinu build protsessi käigus
-   images, lisa samasugune in post gallery nagu medium asi mille sa tegid. Kehtib kõikide postitustes olevate piltidele. High effort, low reward enamike lehekülgede jaoks, aga kui töötab siis on kliendile muljetavaldav
-   7.1 sass Architecture
-   add \_normalize.scss to be added and imported automatically as a first css file? (can get it from bootstrap)

---

### Starter theme build with Piret.

Built on Elementor Hello theme(so that Piret can participate by styling)

-   Make it create an Elementor child theme(and manually add elementor to the WP/themes folder to act as a parent)
-   make various blocks addable to the child theme along with various other enhancements

## List of tasks and designs you can automate using this to save time

-   Cookie Control  
    With few presets, you can add fully GDPR compliant cookie control options.  
    Ühes kohas lihtsasti muudetav/valikuid muudetav ja deploy-itav cookiede GDPR-ile vastav valik. Ex. Lihtsalt lisa variables: cookie nimi, mis kategooria, kas sisse/väljalülitatav, juba sees või väljas, ja tekst selle kohta. Build ajal ehitab ise automaatselt.  
    Lisaks ka tõlkefailid
-   Google Analytics add. With a safeguard that it isn´t active when you are on local dev
-   favicon quick setup. Ühes kohas sisetad ühe faili ja siis genereerib ja lisab kõik vajaliku õigesse kohta ära
-   Several prebuilt responive menus with different designs
-   Automatic deployments from local build/Guthub.  
    https://css-tricks.com/continuous-deployments-for-wordpress-using-github-actions/

### List of theme options

-   wooCommerce included, yes/no
-   have comments vs. no comments (Will it help if you remove add comments block in PHP?)
-   woocommerce, add-to-basket animation?
-   multilanguage or not (lisab headerisse keelevaliku widget area ära)
-   mobile nav (alguses üks ja hiljem juba valik kolm erinevat animatsiooni ja avamsit)

### Gutenberg Blocks

-   Make them native looking when possible
-   Slider block (vt et oleks olemas touch support. ja valik kas fade-in või slide animatsioon)
-   contact form block
-   erinevad custom galerii blokid
-   Sa saad teha ACF custom blokid mis on ka Elementoris jm page builderites editavad!  
    https://gutenberghub.com/how-to-display-gutenberg-blocks-in-other-page-builders/ või vaata mõni teine juhend

### WooCommerce

-   product-archive view
    -   kui hover toote pildi peal, siis näitab järgmist pilti tootegaleriist
-   product-filter
    -   hea funktsionaalsus ja animatsioonid
    -   Toodete valiku filter. Tee joseph&Joseph stiilis järgi.Lihtne checkmark ja intuitiivne. Laseb lihtsalt teha multiple choice
-   category-view
    -   and filter
-   single-product
    -   Single product page template layout variandid paar tükki ette valmistatud
-   single-product gallery
    -   variatsioon tootegaleriist/lightboxist
    -   https://www.byroomaailm.ee/ fullscreen product gallery paistab väga kena. Lihtne ja ilus
    -   single-product page. Kui vajutad nooli vasakule-paremale, siis aktiivne pilt galeriis muutub
    -   võimalus panna videosid galerii fotode hulka (ja front-end näitab ilusasti
    -   on ilus akäivitusanimatsioon https://moomoo.ee/toode/rattajakk-riparo-hall/
-   ostukorv
    -   Ostukorvi haldus (toodete eemaldamine, koguste muutmine). Sujuvaks ja ilusaks
    -   Eelnevalt ette proovitud/integreeritud pakiautomaatide ja maksekeskuse asjade styling ja paigutamine. Eesmärgiks, et kui lisada, siis ei pea mingit stylingut vms enam tegema, kohe töötab
    -   Woocommerce ostukorvi lisada samasugune +/- toode nagu k-Rautal
    -   toote eemaldamine. Vaata kas sa saad lisada toote kustutamise ostukorvist AJAX call-iga, et ei peaks lehte refreshima, nagu default woo
    -   Toote lisamisel korvi, korvi liikumise animatsioon (sisse-välja lülitamine käib, et settings-variable failis paned kas include või mitte selle asja css ja js fail
-   product search page (enhanced ja autocomplete ja elasticsearch?)

#### Minor enhacements

-   POT Task: As the name suggests, this task will scan all your theme’s PHP files and generate a .pot (i.e. translation) file from gettext calls in the files. This is the most WordPress-centric of all the tasks we’re covering here.

#### Under consideration

-   rewrite theme header/footer/body classes according to BEM?

### Headless WP

-   Pane kirja oma sammud ja lahendused, et sul oleks kerge viis pakkuda klientidele ka headless/gatsby lahendust kui nad selleks soovi avaldavad.
-   mingi osa sellest saad juba autobuild peale viia(ex. default Woo jms)

# NON-CODE PROCESS

## Pakkumiste template pre-built

Ette valmistatud pakkumiste põhi, mille saab pärast vestlust ja kiiret mudimist kohe kliendile edasi saata. Oleks rohkem lahti selgitatud mis väärtust see kliendile annab ja kuidas me seda teema. Avatud suhtlus.

## LEPING

Mingi lihtsam ja selgem lepingu template, kus me kirjutame lahti mida me teeme ja mis kujul. Ja sammud ühest faasist teise. Ja kui palju ta muudatusi saab küsida ilma lisatasuta. Vaatab disaini üle, ütleb okei. Edaspidi on selle muudatused juba tasulised.  
Enne töö alustamist kolmandik-pool ettemaksu.  
Vahepunktidel võiks ka olla tasumised. Etkui see faas on läbi, siis klient maksab 20% vms.  
Lõppeesmärgiks oleks, et klient maksab kogu summa ära enne kui me teeme asjade ümberkolimise oma serverist kliendi omasse.

## KLIENDI SERVER/ DEPLOY KLIENDI SERVERISSE

Uuendame serveri uusima PHP versiooni peale vajadusel. Võtame backupid ja paneme tööle kui midagi läheb katki (kuna enamasti teeme naguinii uue versiooni, siis teame kindlalt, et uus versioon töötab korralikult)  
Uuendame kliendi WP versiooni kui vaja (checklist step, pane autoupdate peale WP-le. Kas WP settingutest või siis Zone/Veebimajutus enda seadetest)

## SSL (eriti oluline poodidele)

Lisame kliendi domeenile Let´s Encrypt SSL külge ja käime lehekülje ära, et konflikte ei tekiks.  
Our notes: Kus asuvad/mille all on HTTPS lisamine Zone/veebimajutus.  
Kus asub http pealt https peale ülesuunamine  
Check et kõik teema failid oleksid https peal, ja vajadusel muuta.  
Tulevikus, ka kuidas lisada Lets Encrypt manuaalselt, kui on host, kus ei ole automaatselt lisamist

### ETTE VALMISTATUD SISU

-   Tingimused (nt. Kaubandusliidu tüüptingimused)

### PAKIAUTOMAADID

Saame pakkuda kliendile kohe, lihtsalt ja kiirelt pakiautomaatide lisamist ja konfiguratsiooni.  
Eelnevalt ostetud pluginad (millised?). Seadete import.  
Checklist sammudest mida peab tegema, et lisada uus klient külge. Saame lihtsalt lahti võtta ja sammhaaval läbi käia. On selge, ja saab kiirelt ja järjest ära teha, ilma et midagi vahele jääks.  
Selgelt lahti kirjutatud sammud/asjad mida omanik peab tegema ja kus, et lepingut sõlmida (me oleme omaniku partner, ja eksperdid. Meie ülesanne on talle iga samm teha võimalikult mugavaks ja lihtsaks)  
Võid enda pakiautomaatide lahenduse siia sisse panna ja klientidele maha müüa by default

### MAKSEVÕIMALUSED

Info/tekst mida me saab kliendile näidata, mis näitab ära erinevate pankade tasud ja võimalused. Alternatiivid. Kliendil kergesti kogu info käes ja saab selgelt ja informeeritult otsuseid teha.  
Mis pluginad(e-abi, etc). Kuidas käib seadistamine(sammud). Mida on Kliendi pealt vaja ja mis samme ta ise peab tegema.  
Eesti pangalingid  
Krediitkaardid  
Stripe?  
(Hiljem) Otse pangalinkide/API vahendusel pankadesse(ilma maksekeskuse vm selliseta)  
Automaatne käibemaksu arvutamine ja lisamine EU piires  
Võimaluse korral ka mingil kujul automatiseeritud lihtsustatud käibemaksu deklaratsioone esitus eri riikidele (või vähemalt selged juhendid kliendile, mida ta peaks tegema ja kuidas. Me oleme eksperdid, me oleme one-stop-shop täislahendustega, me lihtsalt ei kirjuta koodi ja disaini, me nõustame kliente ja hästi)  
Pangalinkide generaator  
https://blog.zone.ee/pangalingid/
