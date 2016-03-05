#Website Performance Optimization portfolio project

##Description of the website
The website (index.html) is optimized for mobile devices with pageSpeed. 

###Critical rendering path
The critical rendering path, CRP, has been optimized as far as possible with _inlining_ all critical CSS and _asynchronous_ running of the analytics js scripts and a _media query_ for print css. I _reduced_ the size of the images with both a grunt script and pageSpeeds recommendations as well as the HTML code and CSS and js files. 
I experimented with the styling in the HTML elements for the upper half of the page to render even faster and to reduce the number of nodes to go through for the styles. 
####Analyze of critical rendering path 
- The number of critical resuorces is only one
- The total critical Kb for index.HTML is 4 kb and for the 5 images it will be (19+10+28+12+2) = 71 Kb. 
- Number of roundtrips? since there is no CSS or js file to get it depends on how fast the images can be downloaded. 

The pageSpeed optimization score for index.html with Cams personalized site and run from `gitHubs.io` page was 95/100 and with my personlized page using _ngrok_ i received a 91/100. 

##How to download and build
The files in the `dist` folder are minified and ready to use.

From the `src` code
- download `package.json`, `Gruntfile.js` and the `src` folder and put in a _directory_ of your choice on your computer
- go to _that directory_ in the terminal and run `npm install` 
- run `grunt`, which will _minify_ all of the **HTML, css and js** files and put them in a directory called `dist` in the correct folders. it will also copy the images to their correct destinations.
- open `index.html` from the `dist` file in your favorite browser

##Optimizations for pizza.html site 
In animations like scrolling and resizing it is important that the frames per second is 60 or higher which means that each frame will have only 16 ms or less to run, aim for 10ms. 
In the views/js/main.js there were two major flaws causing forced reflow and a lot of time to resize pizza and scrolling.

A very cool tool to log the time taken for different functions, made it very helpful to see the improvements of the code changes.
####resize pizzas
#####First test  
Time to resize pizzas: 46946.21000000001ms
#####After changes 
Time to resize pizzas: 0.569999999992433ms

**start code**
The function determineDx is removed
```
  function determineDx (elem, size) {
    var oldWidth = elem.offsetWidth;
    var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldSize = oldWidth / windowWidth;
```
This part is changed to percentages
```   
    function sizeSwitcher (size) {
      switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    }
```

    `var newSize = sizeSwitcher(size);`


there are no dx anymore so these 2 rows will be removed
```
    var dx = (newSize - oldSize) * windowWidth;
    return dx;
  }
```
The function changePizzaSizes looping over both a layout check and a style event causing forced synchronous layout. Since we change the size of the pizzas to a percentage of their width all lines except the styling can be removed from this function
```
  function changePizzaSizes(size) {
    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
    }
  }

  changePizzaSizes(size);
```

Taking out the layout calculation from the `for loop` where the style sets, is the key and the cause of the forced reflow.

**code change**
  Changes the input value from the slider to a percent width that will be returned and used as new width of the pizzas
  ```
  function sizeSwitcher (size) {
    switch(size) {
      case "1":
        return "25%";
      case "2":
        return "33%";
      case "3":
        return "50%";
      default:
        console.log("bug in sizeSwitcher");
    }
  }
  ```

The new width of the pizzas
  `var newWidth = sizeSwitcher(size);`

Selecting all pizzas
  `var allPizzas = document.querySelectorAll(".randomPizzaContainer");`

Iterates through pizza elements on the page and changes their widths to the new width that is returned by the sizeSwitcher function as a percentage of the width
```
  function changePizzaSizes(size) {
    for (var i = 0; i < allPizzas.length; i++) {
      allPizzas[i].style.width = newWidth;
    }
  }
```

####scrolling
#####First test 
Average time to generate last 10 frames: 28.51249999999959ms
#####After change 
Average time to generate last 10 frames: 0.8574999999998909ms

**start code**
In this for loop a layout check is called from the scrollTop before the style is set of the pizzas causing a forced synchronous layout and all that extra time when scrolling
```
  var items = document.querySelectorAll('.mover');
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
``
**code change**
The variable `scrollTop` gets the number of pixels from the top of the body, since this is measured in layout phase it has been taken out from the `for loop` to prevent forced synchronous layout and speed up the scolling

  `var scrollTop = document.body.scrollTop`

```
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((scrollTop/ 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```

-Since the performance was for mobiles I increased the size of the buttons to `min-height = 48px` to be able to touch only one.

-The image of the pizzaplace was too large at first (>2Mb) so that had to be reduced. I managed to get it down to 2 Kb which is alright on small devices but kind of corny on larger devices.




