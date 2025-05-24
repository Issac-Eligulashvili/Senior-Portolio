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
     $("#wrapper").on("mouseenter", () => {
          hovering = true;
     })
     $("#wrapper").on("mouseleave", () => {
          hovering = false;
     })
     $(".shape").on("click", function() {
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
     $(".goBackBtn").on("click", function(event) {
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
               const prev = el.children(currentSlideIndex - 1);
               const transform = el.css("transform");
               const values = transform.match(/matrix\(([^)]+)\)/)[1].split(', ');
               const offset = prev.offset();
               const dx = -values[4] + offset.left;
               el.css("transform", `translate(${dx}px, 0px)`);
               currentSlideIndex--;
          }
     });
     $(".goFwdBtn").on("click", function(event) {
          event.stopPropagation();
          const el = $(this).next().eq(0);
          const next = el.children().eq(currentSlideIndex + 1);
          const offset = next.offset();
          const dx = -offset.left
          el.css("transform", `translate(${dx}px, 0px)`);
          currentSlideIndex++;
     })

});