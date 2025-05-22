setTimeout(() => {
     let configurationArray = ['config1', 'config2', 'config3'];
     let previousInt = 0;
     let randInt = Math.floor(Math.random() * 3);
     while(randInt === previousInt) {
          randInt = Math.floor(Math.random() * 3);
     }

     $("#wrapper").removeClass().addClass(configurationArray[randInt])
}, 3000);