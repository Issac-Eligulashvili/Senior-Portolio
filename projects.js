const app = Vue.createApp({
     data() {
          return {
               projects: []
          }
     },
     mounted() {
          $.getJSON("./projects.json", (data, textStatus, jqXHR) => {
                    this.projects = data;
               }
          );
     },
     computed: {
          
     },
     methods: {
          
     },
     watch: {
     },
}).mount("#app");

$(document).ready(function () {
     let previousInt = 0;
     let hovering = false;
     let active = false;
     let currentSlideIndex = 0;
     let initialHeight = window.innerHeight;
     let initialWidth = window.innerWidth;
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
     }, 3000);
     $("#app").on("mouseenter", "#wrapper", () => {
          hovering = true;
     })
     $("#app").on("mouseleave", "#wrapper", () => {
          hovering = false;
          console.log(hovering);
     })
     $("#app").on("click", ".shape", function() {
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
               console.log(active);
               active = !active;
          }
     })
     $("#app").on("click", ".goBackBtn", function(event) {
          event.stopPropagation();
          if (currentSlideIndex <= 0) {
               const el = $(this).parents().eq(0);
               $(".shape").removeClass("inactive");
               el.css("transform",`translate(0,0)`);
               $(".navContainer").removeClass("hide");
               el.data("moved", false)
               el.removeClass("active");
               active = !active;
          } else {
               const el = $(this).nextAll().eq(2);
               console.log(el);
               const prev = el.children().eq(currentSlideIndex - 1);
               const transform = el.css("transform");
               const values = transform.match(/matrix\(([^)]+)\)/)[1].split(', ');
               const offset = prev.offset(); 
               const dx = values[4] - offset.left;

               if (currentSlideIndex > 1) {
                    const header = $(".slide-header");
                    const hTransform = header.css("transform");
                    const hValues = hTransform.match(/matrix\(([^)]+)\)/)[1].split(', ');
                    header.css("transform", `translate(${parseFloat(hValues[4]) + offset.left}px, 0px)`)
               }

               el.css("transform", `translate(${dx}px, 0px)`);
               currentSlideIndex--;
          }
     });
     $("#app").on("click", ".goFwdBtn", function(event) {
          event.stopPropagation();
          const el = $(this).siblings().eq(2);
          const next = el.children().eq(currentSlideIndex + 1);
          const transform = el.css("transform");
          const values = transform === "none" ? [0,0,0,0,0,0] : transform.match(/matrix\(([^)]+)\)/)[1].split(', ');
          const offset = next.offset();
          console.log(offset);
          const dx = values[4] - offset.left;

          if (currentSlideIndex > 0) {
               const header = $(".slide-header");
               const hTransform = header.css("transform");
               const hValues = hTransform.match(/matrix\(([^)]+)\)/)[1].split(', ');
               header.css("transform", `translate(${parseFloat(hValues[4]) + offset.left}px, 0px)`)
          }

          el.css("transform", `translate(${dx}px, 0px)`);
          currentSlideIndex++;
     })
     $("#app").on("click", ".slide-header-close", function(event) {
          event.stopPropagation();
          const el = $(this).parents().eq(0);
          const slide_container = $(this).siblings().eq(2);
          slide_container.animate({"opacity": 0}, 500, function() {
               $(".shape").removeClass("inactive");
               el.css("transform",`translate(0,0)`);
               $(".navContainer").removeClass("hide");
               el.data("moved", false)
               el.removeClass("active");
               active = !active;
               currentSlideIndex = 0;
               slide_container.css("transform", `translate(0,0)`);
               $(".slide-header").css("transform", "translate(0,0)")
               setTimeout(() => {
                    slide_container.css("opacity", 1)
               }, 1250);
          });
     })
     $(window).resize(function () { 
          const sValues = $(".shape.active").css("transform").match(/matrix\(([^)]+)\)/)[1].split(', ');
          const contValues = $(".shape.active").children().eq(3).css("transform") === "none" ? [0,0,0,0,0,0] : $(".shape.active").children().eq(3).css("transform").match(/matrix\(([^)]+)\)/)[1].split(', ');
          const dx = window.innerWidth - initialWidth;
          const dy = window.innerHeight - initialHeight;
          $(".shape.active").css("transform", `translate(${sValues[4]-dx}px, ${sValues[5]}px)`);
          console.log(sValues[4]-dx);
          initialWidth = window.innerWidth;
          initialHeihgt = window.innerHeight;
     });

});