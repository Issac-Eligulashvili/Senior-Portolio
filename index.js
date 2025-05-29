const app = Vue.createApp({
     data() {
          return {
               projects: [
                    {image: "img/wdpp.png", link: ""},
                    {image: "img/sellmycar.png", link: ""},
                    {image: null, link: ""}
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

