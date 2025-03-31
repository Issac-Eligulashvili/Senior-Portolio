const app = Vue.createApp({
     data() {
          return {
               
          }
     },
     methods: {
          updateElements() {
               this.$forceUpdate(); // Forces Vue to recompute the computed property
          }
     },
     mounted() {
          window.addEventListener("resize", this.updateElements);
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



document.addEventListener("mousemove", (e) =>{
     const blob = document.getElementById("feintCursorFollow");
     blob.animate({
          top: `${e.clientY - (blob.offsetHeight / 2)}px`,
          left: `${e.clientX - (blob.offsetWidth / 2)}px`
     }, {duration: 1000, fill: "forwards"})
})