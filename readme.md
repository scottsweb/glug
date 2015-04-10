![Glug Logo](http://cloud.scott.ee/images/glug.png)

# Glug

* Status: ✔ Active
* Contributors: [@scottsweb](http://twitter.com/scottsweb)
* Description: A starting point for front end projects.
* Author: [Scott Evans](http://scott.ee)
* Author URI: [http://scott.ee](http://scott.ee)
* License: GNU General Public License v2.0
* License URI: [http://www.gnu.org/licenses/gpl-2.0.html](http://www.gnu.org/licenses/gpl-2.0.html)

## About

A starting point for front end projects based on Gulp. It is a young project and will be improved quickly. Glug currently features:

* [Browsersync](http://www.browsersync.io/)
* [SCSS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html) compiling
* Source Maps
* Image compression
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Parker](https://github.com/katiefenn/parker)
* Experimenting with [Bower](http://bower.io/)
* and more coming soon!

## Installation & Setup

Download or checkout this repository to your local machine. Browse to the downloaded directory in your terminal app and run: `sudo npm install` (you will need to have [node and npm](https://nodejs.org/download/) on your system).

Customise the settings at the top of `gulpfile.js` to your requirements. You can then run the following tasks:

```
gulp
```

Which watches your SCSS and images folders for changes. May also start a local Browsersync instance and static server if the settings are setup that way


```
gulp checkcss
```

If the project is a static one with HTML assets, the HTML and CSS are compared to see if any selectors can be removed from your styles.

```
gulp sync
```

To copy changes made to your `package.json` to other manifest files (e.g. `bower.json`).
