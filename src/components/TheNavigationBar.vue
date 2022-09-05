<template>
  <nav class="flex space-x-4 items-center text-white">
    <img src="@/assets/winamp_logo.jpg" alt="logo" class="w-12 rounded-md"/>
    <p class="font-techMono text-xl">WINAMP</p>
    <div class="flex space-x-6 font-techMono">
    <router-link to="file">File</router-link>
    <router-link to="file">Play</router-link>
    <router-link to="file">Options</router-link>
    <router-link to="file">View</router-link>
    </div>
  </nav> 
</template>

