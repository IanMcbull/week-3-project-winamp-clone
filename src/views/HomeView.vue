<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div class="md:w-[750px] border-2 border-black md:h-80 md:p-2 p-4 bg-gray">
      <TheNavigationBar />
      <div
        id="player-ui"
        class="bg-blackBg mt-4 flex flex-col md:flex-row items-center justify-between"
      >
        <!--Left Side-->
        <div class="flex flex-col w-full justify-between md:w-1/4 pl-3">
          <p class="text-skyBlue text-6xl font-techMono text-center">{{ duration }}</p>
          <div class="w-full md:w-[185px] h-16 relative">
            <audio hidden ref="foo" preload="auto" id="audio-player">
              <source src="../assets/audio/bites.mp3" type="audio/mpeg" />
            </audio>
            <av-bars
              caps-color="#a7c8d5"
              :bar-color="'rgb(128,143,146)'"
              :caps-height="4"
              ref-link="foo"
              :brick-height="brickHeight"
              :bar-width="10"
              :bar-space="6"
              :canv-height="canvaHeight"
              :canv-width="190" 
              style="text-align: center;"
            ></av-bars>
          </div>
        </div>
        <!--Right side-->
        <div class="flex flex-col">
          <div class="flex flex-col mr-2">
            <div class="overflow-x-hidden">
              <p class="text-skyBlue text-3xl font-techMono self-end animate-paragraph">
              Another One Bites The Dust -Queen
            </p>
            </div>
            <div class="flex space-x-4 self-end items-center">
              <i class="fa-solid fa-play text-skyBlue changePlayIcon"></i>
              <p class="text-skyBlue font-techMono">
                192<span class="text-gray">KBPS</span>
              </p>
              <p class="text-skyBlue font-techMono">
                44<span class="text-gray">Khz</span>
              </p>

              <p>
                <i class="fa-solid fa-infinity text-skyBlue"></i>
                <span class="text-gray">STEREO</span>
              </p>
            </div>
          </div>
          <div
            class="rounded-lt-md w-full md:w-[320px] h-14 self-end bg-gray flex items-center space-x-4 px-2 mt-2"
          >
            <button
              class="flex items-center px-2 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
              @click="mute"
            >
              <i class="fa-solid fa-volume-high text-greyDark text-l muteIcon"></i>
            </button>
              <vue-slider v-model="volumeValue" :min="0" :max="200" style="width: 100%;" @change="changeVolume" @dragging="changeVolume"></vue-slider>            
          </div>
        </div>
      </div>
      <div class="mt-3 p-2">
        <vue-slider v-model="audioValue" :max="100" tooltip="none" @dragging="changePosition" @change="changePosition"></vue-slider>
      </div>
      <!--Controls-->
      <div class="flex justify-between mt-3">
        <!--Controls-->
        <div class="flex">
          <button
            class="flex items-center px-4 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
          >
            <i class="fa-solid fa-backward-fast text-greyDark text-xl"></i>
          </button>
          <button
            class="flex items-center px-4 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
            @click="playAudio"
          >
            <i class="fa-solid fa-play text-greyDark text-xl"></i>
          </button>
          <button
            class="flex items-center px-4 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
            @click="pauseAudio"
          >
            <i class="fa-solid fa-pause text-greyDark text-xl"></i>
          </button>
          <button
            class="flex items-center px-4 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
            @click="stopAudio"
          >
            <i class="fa-solid fa-stop text-greyDark text-xl"></i>
          </button>
          <button
            class="flex items-center px-4 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
          >
            <i class="fa-solid fa-forward-fast text-greyDark text-xl"></i>
          </button>
        </div>
        <!--Playback Controls-->
        <div class="flex space-x-4">
          <button
            class="flex items-center px-4 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
          >
          <i class="fa-solid fa-eject text-greyDark text-xl"></i>
          </button>
          <div class="flex">
            <button
            class="flex items-center px-4 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
          >
          <i class="fa-solid fa-person-walking-arrow-loop-left text-greyDark text-xl"></i>
          </button>
          <button
            class="flex items-center px-4 py-2 h-10 bg-gradient-to-b from-silverBtns to-grey rounded-md border-2 border-gray"
          @click="loop">
          <i class="fa-solid fa-arrow-rotate-left text-greyDark text-xl loopBtn"></i>
          </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheNavigationBar from "../components/TheNavigationBar.vue";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
const getAudio = () => {
  const audio = document.getElementById("audio-player") as HTMLAudioElement;
  const duration = audio.duration;
  return {
    audio,
    duration,
  };
};
document.addEventListener("DOMContentLoaded", getAudio);
export default defineComponent({
  components: { TheNavigationBar,VueSlider },
  setup() {
    return {
      getAudio,
    };
  },
  mounted(){
   this.findTrack()
  },
  data() {
    return {
      duration: "00:00",
      brickHeight: 4,
      canvaHeight: 64,
      slider: 0,
      audioValue:0,
      volumeValue:5,
      trackName:'',
      tracks:[{title:'Another One Bites The Bites',
artist:'Queen',id:1,slug:'bites'},{title:'Say you, Say me',artist:'Lionel Richie',id:2,slug:'say'},{title:'Never Gonna Give You Up', artist:'R.Astley',id:3,slug:'slug'}]
    };
  },
  methods: {
    playAudio() {
      this.getAudio().audio.play();
      const changeicon = document.querySelector('.changePlayIcon') as HTMLElement;
      changeicon.classList.remove('fa-play');
      changeicon.classList.add('fa-pause');
      document.querySelector('.animate-paragraph')?.classList.add('move')
      this.getAudio().audio.addEventListener("timeupdate", () => {
      this.audioValue = this.getAudio().audio.currentTime / this.getAudio().audio.duration * 100  
      this.duration = this.convertTime(this.getAudio().audio.currentTime) 
      });
    },
    findTrack(index:number=0){
       

},  
    pauseAudio() {
      this.getAudio().audio.pause();
      const changeicon = document.querySelector('.changePlayIcon') as HTMLElement;
      changeicon.classList.remove('fa-pause');
      changeicon.classList.add('fa-play');
    },
    stopAudio() {
      this.getAudio().audio.pause();
      document.querySelector('.animate-paragraph')?.classList.remove('move')
      const changeicon = document.querySelector('.changePlayIcon') as HTMLElement;
      changeicon.classList.contains('fa-pause') ? changeicon.classList.replace('fa-pause','fa-play'):'';
      this.getAudio().audio.currentTime = 0;
    },
    loop(){
      this.getAudio().audio.loop ? this.getAudio().audio.loop = false : this.getAudio().audio.loop = true;
      const loopBtn = document.querySelector('.loopBtn') as HTMLElement;
      this.getAudio().audio.loop ? loopBtn.classList.replace('text-greyDark','text-green-400') : loopBtn.classList.replace('text-green-400','text-greyDark')
    },

    //Convert audio current time from seconds to min:sec display
    convertTime(seconds: number) {
      const format = (val) => `0${Math.floor(val)}`.slice(-2);
      let hours = seconds / 3600;
      let minutes = (seconds % 3600) / 60;
      return [minutes, seconds % 60].map(format).join(":");
    },
   changePosition(value: number) {
      this.getAudio().audio.currentTime = value / 100 * this.getAudio().duration;
    },
    changeVolume(value: number) {
      this.getAudio().audio.volume = value / 100;
    },
    mute(){
      const muteBtn = document.querySelector('.muteIcon') as HTMLElement;
      this.getAudio().audio.muted ? this.getAudio().audio.muted = false : this.getAudio().audio.muted = true;
      this.getAudio().audio.muted ? muteBtn.classList.replace('text-greyDark','text-red-400') : 
  
      muteBtn.classList.replace('text-red-400','text-greyDark')
    }   
  }
});
</script>


<style>
  .move{
    animation: reverse move 15s infinite linear; 
  }
  @keyframes move {
    0% {
      transform: translateX(-100%);
    }
    100%{
    transform: translateX(100%);
    }       
  }
</style>