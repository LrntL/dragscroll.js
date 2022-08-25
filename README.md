# dragscroll.js
Resurrection for this very useful drag scroll plugin from YuTingtao.
Original repo: https://github.com/YuTingtao/dragscroll.js

**I dont' know how to use GitHub and I am not going to maintain this plugin.**
**It helped me a lot, so I just want it to exist to help others.**

Another jQuery based drag to scroll plugin which allows users to move content in a scrollable area horizontally or vertically using mouse drag (desktop) or touch swipe events (mobile).

## How to use it:

**1. Add your long content to a scrollable container. In this example, we're going to apply a panning functionality to an image.**

```
<div class="drag-box">

  <!-- draggable content -->
  <div class="drag">
    <img src="https://source.unsplash.com/KZc9h88nwpM/1600x900">
  </div>
  
</div>
```

**2. Load the JavaScript file jquery.dragscroll.min.js after loading jQuery library.**

```
<script src="https://code.jquery.com/jquery-1.12.4.min.js" 
        integrity="sha384-nvAa0+6Qg9clwYCGGPpDQLVpLNn0fRaROjHqs13t4Ggj3Ez50XnGQqc/r8MhnRDZ" 
        crossorigin="anonymous"></script>
<script src="./jquery.dragScroll.js"></script>
```

**3. Attach the plugin to the draggable content and done.**

```
$(function(){
  $('.drag').dragscroll();
});
```

**4. Limit the direction of scrolling: horizontal or vertical. Default: both.**

```
$('.drag').drag<a href="https://www.jqueryscript.net/tags.php?/Scroll/">Scroll</a>({
  direction: 'scrollLeft'
});

$('.drag').dragscroll({
  direction: 'scrollTop'
});
```

**5. Trigger functions on start/end/move.**

```
$('.drag').dragScroll({
  onStart: function($this) {
    console.log($this);
  },
  onMove: function($this) {
    console.log($this);
  },
  onEnd: function($this) {
    console.log($this);
  }
});
```
