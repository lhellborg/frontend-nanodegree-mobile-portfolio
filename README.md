#Website Performance Optimization portfolio project

##Description of the website
The front website (index.html) is optimized for mobile devices with pageSpeed. 

###Critical rendering path
The critical rendering path, CRP, has been optimized as far as possible with inlining all critical CSS and asynchronous running of the analytics js scripts and a media query for print css. I minified the images with both a grunt script and pageSpeeds recommendations as well as the HTML code and CSS and js files. 
I experimented with the styling in the HTML elements for the upper half of the page to render even faster and to reduce the number of nodes to go through. 
####Analyze of critical rendering path 
-The number of critical resuorces is only one
-The total critical Kb for index.HTML is 4 kb and for the 5 images it will be (19+10+28+12+8) = 77 Kb. 
-Number of roundtrips? since there is no CSS or js file to to get it depends on how fast the images can be downloaded. 

##How to download and build
The files in the dist folder are minified and ready to use.

From the src code
-download package.json, Gruntfile.js and the src folder and put in a directory on your computer
-go to that directory in the terminal and run npm install 
-run grunt, which will minify all of the HTML, css and js files and put them in a directory called dist in the correct folders. it will also copy the images to their correct destinations
-run index.html from the dist file in your favorite browser

##Optimizations in pizza.html site 
