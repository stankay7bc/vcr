/* Player Component */

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
<style>
main {
  position:relative;
  height:180px;
  width:180px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:1.5em;
  color:#4b4949;
  background-color:#cfd2dd;
  overflow:hidden;
}
img {
  position:absolute;
  left:0;
}
</style>
<main>
  <img src="https://docs.google.com/drawings/d/e/2PACX-1vQ8ms_-LjUiBscTtQ4FauJkP1RN68u1jUBclhxvkAm5XjW-tquKWUlejeSos8pYd6lu_2NEQs1Nj2ye/pub?w=360&amp;h=180">
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
    
    this.controls_ui = shadow.querySelector("img");
    this.audio = shadow.querySelector("audio");
    this.audio.src = this.getAttribute('src');
    
    this.clickHandler();
    this.addEventListener("click",this.clickHandler);
  }
  
  nextState() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  setUI() {
    if(this.audio.paused) {
      this.controls_ui.style.removeProperty('transform');
    } else {
      this.controls_ui.style
        .setProperty('transform','translateX(-50%)');
    }
  }
  
  clickHandler() {
    this.nextState();
    this.setUI();
  }
}

customElements.define('player-controls',PlayButton);
