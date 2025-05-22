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
          $(event.target).toggleClass("active");
          active = !active;
     })
});