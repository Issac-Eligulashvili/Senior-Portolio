let previousInt = 0;
let hovering = false;
let active = false;
setInterval(() => {
     if (!hovering && !active) {
          let configurationArray = ['config1', 'config2', 'config3'];
     let randInt = Math.floor(Math.random() * 3);
     while(randInt === previousInt) {
          randInt = Math.floor(Math.random() * 3);
     }
     previousInt = randInt

     $("#wrapper").removeClass().addClass(configurationArray[randInt])
     }
}, 2000);

$(document).ready(function () {
     $("#wrapper").on("mouseenter", () => {
          hovering = true;
     })
     $("#wrapper").on("mouseleave", () => {
          hovering = false;
     })
     $(".shape").on("click", (event) => {
          const el = $(event.target)
     
          el.addClass("expanding")
          setTimeout(() => {
               $(".shape").toggleClass("inactive");
               if (el.data("moved")) {
                    el.css("transform",`translate(0,0)`);
                    el.data("moved", false)
               } else {
                    const offset = el.offset();
                    console.log(offset);
                    const dx = -offset.left;
                    const dy = -offset.top;
                    console.log(dy, dx);
                    el.css("transform", `translate(${dx}px, ${dy}px)`)
                    el.data("moved", true);
               }



               el.removeClass("inactive").toggleClass("active");
          }, 0)
          active = !active;
     })
});