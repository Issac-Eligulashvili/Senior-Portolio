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



     
