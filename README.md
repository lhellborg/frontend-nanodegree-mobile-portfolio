#Website Performance Optimization portfolio project

##Description of the website
The website (index.html) is optimized for mobile devices with pageSpeed. 

###Critical rendering path
The critical rendering path, CRP, has been optimized as far as possible with _inlining_ all `critical CSS` and _asynchronous_ running of the `analytics js scripts` and a _media query_ for `print css`. I _reduced_ the size of the **images** with both a `grunt script` and **pageSpeeds recommendations** as well as minifying the `HTML code and CSS and js files. 
I experimented with the styling in the HTML elements for the upper half of the page to render even faster and to reduce the number of nodes to go through for the styles. 
####Analyze of critical rendering path 
- The **number of critical resuorces** is only one
- The **total critical Kb** for index.HTML is 4 kb and for the 5 images it will be (19+10+28+12+2) = 71 Kb. 
- **Number of roundtrips**? since there is no CSS or js file to get it depends on how fast the images can be downloaded. 

The `pageSpeed` optimization _score_ for index.html, 
with Cams personalized site and run from `gitHubs.io` page was _95/100_ and with my personlized page using _ngrok_ i received a _91/100_. 

##How to download and build
The files in the `dist` folder are minified and ready to use.

From the `src` code
- download `package.json`, `Gruntfile.js` and the `src` folder and put in a _directory_ of your choice on your computer
- direct yourself to _the directory_ that you choosed in the terminal and run `npm install`. This will create a file `node-modules` in your directory with the files you need to run `grunt`.
- run `grunt`, which will _minify_ all of the **HTML, css and js** files and put them in a directory called `dist` in the correct folders. It will also copy the images to their correct destinations.
- open `index.html` from the `dist` file in your favorite browser

##Optimizations for pizza.html site 
In animations like scrolling and resizing it is important that the frames per second is 60 or higher which means that each frame will have only 16 ms or less to run, aim for 10ms. 
In the `views/js/main.js` there were two major flaws causing forced reflow and a lot of time to resize pizza and scrolling.

###views/js/main.js
A very cool tool to log the time taken for different functions by timing API, made it very helpful to see the improvements of the code changes.
####Resize pizzas
#####First test  
Time to resize pizzas: 46946.21000000001ms
#####After changes 
Time to resize pizzas: 0.569999999992433ms

**start code**

The function determineDx will be removed
```
  function determineDx (elem, size) {
    var oldWidth = elem.offsetWidth;
    var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldSize = oldWidth / windowWidth;
```
This part will be changed to percentages
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
The function changePizzaSizes looping over both a layout check and a style event causing forced synchronous layout. Since we change the size of the pizzas to a percentage of their width all lines except the styling can be removed from this function. Besides we have the DRY rule so all the randomPizzaContainers will be collected in a variable.
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

The new width of the pizzas will be in percentages
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

####Scrolling
#####First test 
Average time to generate last 10 frames: 28.51249999999959ms
#####After change 
Average time to generate last 10 frames: 0.22399999999997816ms

**start code**

In this for loop a layout check is called from the scrollTop before the style is set of the pizzas causing a forced synchronous layout and all that extra time when scrolling
```
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```

The total number of moving pizzas was set to 200 but that will be calculated based on the window size

**code change**

The variable `scrollTop` gets the number of pixels from the top of the body, since this is measured in layout phase it has been taken out from the `for loop` to prevent forced synchronous layout and speed up the scrolling

Select all items that should move with a getElementsByClassName call since it is faster than querySelector.

`var items = document.getElementsByClassName('mover');`

The length of the array items to be used in the for loop to not have to calculate the length every time in the loop.

`var itemLength = items.length;`

Get the number of pixels from the top of the body, since this is measured in layout phase it has been taken out from the for loop to prevent forced synchronous layout and speed up the scolling.

`var scrollTop = document.body.scrollTop;`

Declaring the phase variable (var phase;) outside the loop will prevent it from being created every time the loop is executed.
```
  var phase;

  for (var i = 0; i < itemLength; i++) {
    phase = Math.sin((scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```


To get the total number of pizzzas to fill up the screen, the number of rows and columns needed, is calculated.
A column and a row is equal to 256 px each.

The variable `cols` calculate the number of columns based on the `document.body` which fill up the screen of the window divided by s. Since the whole width of the body is visualized in a screen, with a different pixelsize than the device width, I wanted to calculate the number of columns based on the body since the pizzas are attached to this element.

The variable `rows` calculate the number of rows based on the available height of the `window.screen/s`. Since the whole body of the height is not shown at the same time, the columns are calculated on the window height instead of the body height.

The total number of pizzas is then `cols*rows`, this will for most mobile devices be less than 24 pizzas

`var s = 256;`

`Math.ceil()` rounded upwards to the nearest integer to fill the screen with pizzas
```
var cols = Math.ceil(document.body.clientWidth/s);
var rows = Math.ceil(window.screen.availHeight/s);
var totalPizzas = cols*rows;
```
  
Declaring the elem variable `var elem;` outside the loop will prevent it from being created every time the loop is executed.

Change the call to `getElementById` since it is faster than `querySelecctor` and move it to a variable outside of the loop
```
var elem;
var movingPizzas1 = document.getElementById("movingPizzas1");

  for (var i = 0; i < totalPizzas; i++) {
    elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    movingPizzas1.appendChild(elem);
  }
  updatePositions();
});
```
#####Other code changes
QuerySelector has been replaced with the appropriate getElementsByID or getElementsByClassName for faster API call

The array length as been calculated in a seperate variable when called in a for loop so the iteration over the array does not have to be done in a loop.
`var itemLength = items.length;`
`var allPizzasLength = allPizzas.length;`

Variables declared within a loop that makes a DOM call has been removed from within the loop and put outside to reduce the number of DOM calls.
`var elem;`
`var pizzaSize = document.getElementById("pizzaSize").innerHTML`
`var pizzasDiv = document.getElementById("randomPizzas");`
`var pizzaSize = document.getElementById("pizzaSize").innerHTML;`


###views/css/style.css
To increase a sites performance we can hardware-accelerate graphics-intensive CSS features by offloading them to the GPU (Graphics Processing Unit) for better rendering performance in the browser. This can be triggered by including the `transform: translateZ(0);` declaration. 
Other styles that can do the same trick are:
  `perspective: 1000;`
  `backface-visibility: hidden;`
  `transform: translate3d(0,0,0);`

-Since the performance was for mobiles I increased the size of the buttons to `min-height = 48px` to be able to touch only one.

###Other
-The image of the pizzaplace was too large at first (>2Mb) so that had to be reduced. I managed to get it down to 2 Kb which is alright on small devices but kind of corny on larger devices.




