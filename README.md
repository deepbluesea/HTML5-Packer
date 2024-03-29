HTML5-Packer
============
Pack your HTML5-Apps into a single HTML file.  
**Example:** [normal](http://apps.elias.media/HTML5-Packer/demo/index.html) | [packed](http://apps.elias.media/HTML5-Packer/demo/index.packed.html)  

Please note that I'm new to node/grunt plugin development so some things might not be optimal.

##Installation

Requires node and grunt to be installed.  
`npm install html5-packer --save-dev`


##Usage

Example config (Gruntfile.json):

```js
module.exports = function(grunt) {

	grunt.initConfig({
		HTML5_Packer: {
			app: {
				cwd:   "app/",           // default: ./
				index: "app.html",       // default: index.html
				dest:  "app.packed.html" // default: index.packed.html
			}
		}
	});

	grunt.loadNpmTasks("HTML5_Packer");
	grunt.registerTask("default", ["HTML5_Packer"]);
};
```

To pack your app, simply run `grunt` or `grunt HTML5_Packer`.  
Note that your folder must contain a **index.html** file. I will add more options in the future.

##What happens to my AJAX requests?

You don't have to change anything in your code.  
Internal requests are being redirected automatically to the encrypted data.  
**See [router.js](https://github.com/elias-schuett/HTML5-Packer/blob/master/tasks/lib/router.js)**

##What happens to links inside attributes?

Currently those links aren't being replaced by the compiler but by JavaScript at runtime from the encrypted data. This behaviour was chosen because elements with links could be included multiple times and for each of them a large base64 string would have to be inserted, which would unnecessarily increase the final file size.  

The currently supported elements are:

* \<img\>
* \<video\>
* \<audio\>
* \<source\>

##Will browsers be able to cache my App?

Yes but there are some disadvantages. A single change in one of your files will force the browser to load the entire HTML document again, since there are no internal requests anymore.

##Dependencies

Thanks a bunch to the following node modules:

* [grunt](https://github.com/gruntjs/grunt)
* [clean-css](https://github.com/GoalSmashers/clean-css)
* [uglify-js](https://github.com/mishoo/UglifyJS)

## Credits

* **demo/audio/a_moment_of_reflection-enrico_altavilla.ogg**  
Quiet Reflection | Enrico Altavilla  
http://www.freesoundtrackmusic.com/music_listing_enricoaltavilla.html

* **demo/video/BigBuckBunny_320x180.ogg**  
Blender Foundation | www.blender.org  
http://www.bigbuckbunny.org/index.php/download/
