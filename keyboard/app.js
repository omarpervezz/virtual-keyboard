const keboard = {
    elements:{
        main:null,
        keysContainer:null,
        key:[]
    },
  eventHandler: {
      oninput:null,
      onclose:null
  },

  properties:{
      value: "",
      capsLock:false
  },

  init(){
     //create element
     this.elements.main = document.createElement('div');
     this.elements.keysContainer = document.createElement('div');

     //add some class into it
     this.elements.main.classList.add('keyboard', '1keyboard--hidden');
     this.elements.keysContainer.classList.add('keyboard__keys');
     this.elements.keysContainer.appendChild(this._createKeys());

     //add to the dom
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main)

    

  },

  _createKeys(){
       const fragmentOf = document.createDocumentFragment();
       const keyLayer = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
       ];
    
       //create a html for an icon
       const createIconHTML = (icon_name) =>{
           return `<i class="material-icons">${icon_name}</i>`
       };
       keyLayer.forEach(key =>{
        const keyElements = document.createElement('button');
        const insertLineBreak  = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;


          //Add attributes classes
    //  keyElements.setAttributes('type', 'button');
     keyElements.classList.add('keyboard__key');

        //switch statement for different button
        switch(key){
            case "backspace" :
                keyElements.classList.add('keyboard__key--extra-wide');
                keyElements.innerHTML = createIconHTML('backspace');
                keyElements.addEventListener('click', () =>{
                    this.properties.value = this.properties.value.substring(0, this.properties.value.length -1)
                });
                this._triggerEvent('oninput');
             break; 
             case "caps" : 
             keyElements.classList.add('keyboard__key--extra-wide', 'keyboard__key--activatable');
             keyElements.innerHTML = createIconHTML('keyboard_capslock');
             keyElements.addEventListener('click', () =>{
                 this._toggleCapsLock();
                 keyElements.classList.toggle('keyboard__key--active', this.properties.capsLock)
             });
            break;
            case "enter" :
                keyElements.classList.add('keyboard__key--wide');
                keyElements.innerHTML = createIconHTML('keyboard_return');
                keyElements.addEventListener('click', ()=>{
                    this.properties.value = this.properties.value + '\n';
                    this._triggerEvent('oninput');
                });
            break;
            case "space" :
                keyElements.classList.add('keyboard__key--extra-wide');
                keyElements.innerHTML = createIconHTML('space_bar');
                keyElements.addEventListener('click', () =>{
                    this.properties.value = ' ';
                    this._triggerEvent('oninput')
                });
            break;
            case "done" :
                keyElements.classList.add('keyboard__key--wide', 'keyboard__key--dark');
                keyElements.innerHTML = createIconHTML('check_circle');

                keyElements.addEventListener('click', ()=>{
                    // this.close();
                     this._triggerEvent('onclose')
                });

                default:
                    keyElements.textContent = key.toLocaleLowerCase();
                    keyElements.addEventListener('click', () =>{
                         this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                         this._triggerEvent('oninput');
                    });

                    fragmentOf.appendChild(keyElements);
                    if(insertLineBreak){
                        fragmentOf.appendChild(document.createElement('br'))
                    }
        }

    });
    

    return fragmentOf;

  },
   
  _triggerEvent(handlerName){
      console.log("Event Triggered! Event name" + handlerName) 
  },
  _toggleCapsLock(){
      console.log('capslock toggle!')
  },
  open(initialValue, oninput, oniclose){

  },
  close(){
      
  }

}

window.addEventListener('load', function(){
    keboard.init()
});