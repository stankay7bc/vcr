/* Player Component */

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
<style>
 .circle {
  /*outline:1px dashed blue;*/
  border:1px dashed blue;
  border-radius:50%;
  position:absolute;
}
.on {
  background-color:green;
}
.off {
  background-color:red;
}
main {
  position:relative;
  width:312px;
  height:312px;
  display:flex;
  justify-content:center;
}
#player {
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  z-index:1;
}
#jenre {
  width:60%;
  height:60%;
  z-index:2;
}
#play-light {
  position:absolute;
  bottom:10%;
  /*
  width:40%;
  height:20%;
  bottom:2%;
  */
}
.triangle {
  position:absolute;
  width:0;
  height:0;
  border-top:1.25em solid transparent;
  border-bottom:1.5em solid transparent;
  border-left:2.5em solid #313199;
}
.rectangle {
  width:2.5em;
  height:2.5em;
  background-color:#313199;
}
</style>
<main>
  <section id="player" class="circle">
    <section id="play-light" class="triangle"></section>
  </section>
  <section id="jenre" class="circle"></section>
  <audio name="media"></audio>
</main>`;

class PlayButton extends HTMLElement {

  static get observedAttributes() {
    return ['src'];
  }

  attributeChangedCallback(name,oldVal,newVal) {
    if(name=='src') {
      this.reloadAudio(newVal); 
      this.setUI();
    }
  }

  reloadAudio(source) {
    this.audio.src = source;
    this.audio.load();
  }

  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(TEMPLATE.content.cloneNode(true));
    
    this.controls_ui = shadow.querySelector("#player");
    this.switch_ui = shadow.querySelector("#play-light");
    this.audio = shadow.querySelector("audio");
    this.audio.src = this.getAttribute('src');
    
    this.addEventListener("click",this.clickHandler);
  }
  
  nextState() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  setUI() {
    if(this.audio.paused) {
      this.switch_ui.setAttribute("class","triangle");
    } else {
      this.switch_ui.setAttribute("class","rectangle");
    }
  }
  
  clickHandler(event) {
    if(event.path[0].id=='player'||
       event.path[0].id=='play-light') {
      this.nextState();
      this.setUI();
    }
  }
}

customElements.define('player-controls',PlayButton);
