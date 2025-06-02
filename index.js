const app = Vue.createApp({
     data() {
          return {
               projects: [
                    {image: "img/wdpp.png", link: "https://www.mrhsteched.com/pages/MRHS_WDPP/index.html"},
                    {image: "img/sellmycar.png", link: "https://sellmycar-com.onrender.com     "},
                    {image: "img/trunkortreat.png", link: "https://issac-eligulashvili.github.io/Trunk-or-Treat/"}
               ]
          }
     },
     methods: {
          updateElements() {
               this.$forceUpdate(); // Forces Vue to recompute the computed property
          },
     },
     mounted() {
          window.addEventListener("resize", this.updateElements);

          const gsap = window.gsap;
          const ScrollTrigger = window.ScrollTrigger;

          gsap.registerPlugin(ScrollTrigger);
          gsap.utils.toArray([".delay-1", ".delay-2"]).forEach(el => {
               gsap.to(el, {
                         x: "-100%",
                         scrollTrigger: {
                         trigger: ".firstSection",
                         start: "top top",
                         end: "bottom top",
                         scrub: true,

                    }
               });
          })
          
          $('.image').on('mousemove', function (e) {
               const $this = $(this);
               const offset = $this.offset();
               const width = $this.outerWidth();
               const height = $this.outerHeight();
         
               // Get percentage from center, then invert it
               const x = 50 + ((e.pageX - offset.left - width / 2) / width) * 30;
               const y = 50 + ((e.pageY - offset.top - height / 2) / height) * 30;
         
               $this.css({
                 'background-position': `${x}% ${y}%`,
                 'background-size': "120%"
               });
          });
           
          $('.image').on('mouseleave', function () {
               $(this).css({
                 'background-position': 'center',
                 'background-size': '100%',
               });
          });
          $("#contact").on("click", () => {
               $("#email").toggleClass("show");
          })

     },    
     beforeUnmount() {
          window.removeEventListener("resize", this.updateElements);
     },
     computed: {
          nameArray() {
               const maxHeight = window.innerHeight - 208;
               const count = Math.floor(maxHeight / 137);
               const arr = [];
               for (let i = 0; i < count; i++) {
                    arr.push("ISSAC ELIGULASHVILI");
               }
               return arr;
          },
          containerHeight() {
               const regHeight = this.nameArray.length * 192;
               return regHeight - 30*this.nameArray.length;
          }
     }
}).mount("#app");

function moveBlob(e) {
     const blob = document.getElementById("feintCursorFollow");
     blob.animate({
          top: `${e.clientY - (blob.offsetHeight / 2)}px`,
          left: `${e.clientX - (blob.offsetWidth / 2)}px`
     }, {duration: 1000, fill: "forwards"})
}

$(".firstSection").on("mousemove", moveBlob);


