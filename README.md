HTML5-Packer
============
Pack your HTML5-Apps into a single HTML file.  
**Example:** [normal](http://elias-schuett.de/git/HTML5-Packer/demo/index.html) | [packed](http://elias-schuett.de/git/HTML5-Packer/demo/demo.packed.html)  

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
				cwd: "app",      // default: ./
				dest: "app.html" // default: %pkg.name%.packed.html
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
Internal requests are being redirected automatically to the memory.  
**See [XMLHttpRequest.js](https://github.com/elias94xx/HTML5-Packer/blob/master/tasks/lib/XMLHttpRequest.js)**

##Will browsers be able to cache my App?

Yes but there are some disadvantages. A single change in one of your files will force the browser to load the entire HTML document again, since there are no internal requests anymore.

##Dependencies

Thanks a bunch to the following node modules:

* [grunt](https://github.com/gruntjs/grunt)
* [clean-css](https://github.com/GoalSmashers/clean-css)
* [uglify-js](https://github.com/mishoo/UglifyJS)