const app = Vue.createApp({
     data() {
          return {
               
          }
     },
     methods: {
          
     },
}).mount("#app");



document.addEventListener("mousemove", (e) =>{
     const blob = document.getElementById("feintCursorFollow");
     blob.animate({
          top: `${e.clientY - (blob.offsetHeight / 2)}px`,
          left: `${e.clientX - (blob.offsetWidth / 2)}px`
     }, {duration: 1000, fill: "forwards"})
})