/* Player Component */

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
<style>
 .circle {
  /*outline:1px dashed blue;*/
  /*border:1px dashed blue;*/
  border-radius:50%;
  position:absolute;
}
:host {
  width:312px;
  height:312px;
}
main {
  position:relative;
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
}
#player {
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  z-index:1;
  background-color:#062456
}
#jenre {
  width:60%;
  height:60%;
  z-index:2;
  background-image: url("https://cdn1.iconfinder.com/data/icons/musical-instruments-line-art/128/violin-bow-play-ol-512.png");
  background-size: 65%;
  background-repeat: no-repeat;
  background-position: center;
  background-color:#f9f9f9
}
#play-light {
  /*outline:2px solid red;*/
  position:absolute;
  background-image: url("https://docs.google.com/drawings/d/e/2PACX-1vQ8ms_-LjUiBscTtQ4FauJkP1RN68u1jUBclhxvkAm5XjW-tquKWUlejeSos8pYd6lu_2NEQs1Nj2ye/pub?w=360&h=180");
  background-size: 200%;
  background-repeat: no-repeat;
  width:30%;
  height:30%;
  bottom:0;
}
</style>
<main>
  <section id="player" class="circle">
    <section id="play-light" class=""></section>
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
    this.audio.addEventListener("pause",event=>{
      this.setUI();
    });
    this.audio.addEventListener("play",event=>{
      this.setUI();
    });
  }
  
  nextState() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  setUI() {
    if(this.audio.paused) {
      this.switch_ui.style
        .setProperty("background-position","left");
    } else {
      this.switch_ui.style
        .setProperty("background-position","right");
    }
  }
  
  clickHandler(event) {
    if(event.path[0].id=='player'||
       event.path[0].id=='play-light') {
      this.nextState();
    }
  }
}

customElements.define('player-controls',PlayButton);
