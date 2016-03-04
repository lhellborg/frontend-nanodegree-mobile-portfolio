## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>



Time to generate pizzas on load: 11.640000000000008ms
main.js:468 Time to resize pizzas: 46946.21000000001ms
main.js:496 Average time to generate last 10 frames: 28.51249999999959ms
main.js:496 Average time to generate last 10 frames: 23.757500000000437ms
main.js:496 Average time to generate last 10 frames: 21.522500000000583ms
main.js:496 Average time to generate last 10 frames: 22.95099999999802ms
main.js:496 Average time to generate last 10 frames: 24.48649999999907ms
main.js:496 Average time to generate last 10 frames: 24.50249999999869ms
main.js:496 Average time to generate last 10 frames: 21.161000000003696ms
main.js:468 Time to resize pizzas: 0.569999999992433ms
main.js:468 Time to resize pizzas: 0.5049999999973807ms
main.js:468 Time to resize pizzas: 0.555000000000291ms
main.js:468 Time to resize pizzas: 0.5500000000029104ms
main.js:468 Time to resize pizzas: 0.5849999999918509ms
main.js:468 Time to resize pizzas: 0.5050000000046566ms
main.js:496 Average time to generate last 10 frames: 23.877500000006695ms
main.js:496 Average time to generate last 10 frames: 24.992499999987196ms
main.js:496 Average time to generate last 10 frames: 24.178999999994993ms
main.js:496 Average time to generate last 10 frames: 22.491499999989173ms
main.js:496 Average time to generate last 10 frames: 23.526499999998485ms
main.js:496 Average time to generate last 10 frames: 22.010000000006404ms
main.js:496 Average time to generate last 10 frames: 21.57250000000058ms
main.js:496 Average time to generate last 10 frames: 20.923499999998604ms
main.js:496 Average time to generate last 10 frames: 23.134499999988474ms
main.js:496 Average time to generate last 10 frames: 22.13399999999674ms
main.js:496 Average time to generate last 10 frames: 22.020999999999184ms
main.js:496 Average time to generate last 10 frames: 19.90900000000547ms
main.js:496 Average time to generate last 10 frames: 41.39950000001117ms
main.js:496 Average time to generate last 10 frames: 42.3395000000135ms
main.js:496 Average time to generate last 10 frames: 43.020499999995806ms
main.js:496 Average time to generate last 10 frames: 43.89749999999767ms
