const app = Vue.createApp({
     data() {
          return {
               projects: []
          }
     },
     mounted() {
          $.getJSON("./projects.json", (data, textStatus, jqXHR) => {
                    console.log(data);
                    this.projects = data;
               }
          );
          $(document).ready(function () {
               let previousInt = 0;
               let hovering = false;
               let active = false;
               let currentSlideIndex = 0;
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
               $("#app").on("mouseenter", "#wrapper", () => {
                    hovering = true;
               })
               $("#app").on("mouseenter", "#wrapper", () => {
                    hovering = false;
               })
               $("#app").on("click", ".shape", function() {
                    console.log("clicked");
                    const el = $(this)
                    if (!el.hasClass("active")) {
                         $(".shape").addClass("inactive");
                         const offset = el.offset();
                         const dx = -offset.left;
                         const dy = -offset.top;
                         $(".navContainer").addClass("hide");
                         el.css("transform", `translate(${dx}px, ${dy}px)`)
                         el.data("moved", true);
                         el.removeClass("inactive").addClass("active");
                         active = !active;
                    }
               })
               $("#app").on("click", ".goBackBtn", function(event) {
                    event.stopPropagation();
                    console.log(currentSlideIndex);
                    if (currentSlideIndex <= 0) {
                         const el = $(this).parents().eq(0);
                         $(".shape").removeClass("inactive");
                         el.css("transform",`translate(0,0)`);
                         $(".navContainer").removeClass("hide");
                         el.data("moved", false)
                         el.removeClass("active");
                         active = !active;
                    } else {
                         const el = $(this).nextAll().eq(1);
                         const prev = el.children().eq(currentSlideIndex - 1);
                         const transform = el.css("transform");
                         const values = transform.match(/matrix\(([^)]+)\)/)[1].split(', ');
                         const offset = prev.offset(); 
                         const dx = values[4] - offset.left;
                         el.css("transform", `translate(${dx}px, 0px)`);
                         currentSlideIndex--;
                    }
               });
               $("#app").on("click", ".goFwdBtn", function(event) {
                    event.stopPropagation();
                    const el = $(this).next().eq(0);
                    const next = el.children().eq(currentSlideIndex + 1);
                    const transform = el.css("transform");
                    const values = transform === "none" ? [0, 0,0,0,0,0] : transform.match(/matrix\(([^)]+)\)/)[1].split(', ');
                    const offset = next.offset();
                    const dx = values[4] - offset.left;
                    el.css("transform", `translate(${dx}px, 0px)`);
                    currentSlideIndex++;
               })
               $("#app").on("click", ".slide-header-close", function(event) {
                    event.stopPropagation();
                    const el = $(this).parents().eq(3);
                    const slide_container = $(this).parents().eq(2);
                    slide_container.animate({"opacity": 0}, 500, function() {
                         console.log(el);
                         $(".shape").removeClass("inactive");
                         el.css("transform",`translate(0,0)`);
                         $(".navContainer").removeClass("hide");
                         el.data("moved", false)
                         el.removeClass("active");
                         active = !active;
                         currentSlideIndex = 0;
                         slide_container.css("transform", `translate(0,0)`);
                         setTimeout(() => {
                              slide_container.css("opacity", 1)
                         }, 1250);
                    });
               })
          
          });
     },
     computed: {
          
     },
     methods: {
          
     },
     watch: {
          projects(newValue) {
               console.log(newValue);
          }
     },
}).mount("#app");