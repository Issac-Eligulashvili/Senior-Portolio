const app = Vue.createApp({
     data() {
          return {
               projects: [
                    {image: null, link: ""},
                    {image: null, link: ""},
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



document.addEventListener("mousemove", (e) =>{
     const blob = document.getElementById("feintCursorFollow");
     blob.animate({
          top: `${e.clientY - (blob.offsetHeight / 2)}px`,
          left: `${e.clientX - (blob.offsetWidth / 2)}px`
     }, {duration: 1000, fill: "forwards"})
})

  let sections = document.querySelectorAll(".section");
  let isScrolling = false;

  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;

    isScrolling = true;
    const direction = e.deltaY > 0 ? 1 : -1;

    let scrollPos = window.scrollY;
    let currentIndex = Array.from(sections).findIndex(
      (section) => section.offsetTop === scrollPos
    );

    let nextIndex = Math.min(
      sections.length - 1,
      Math.max(0, currentIndex + direction)
    );

    window.scrollTo({
      top: sections[nextIndex].offsetTop,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrolling = false;
    }, 1000); // adjust duration here (in ms)
  });
