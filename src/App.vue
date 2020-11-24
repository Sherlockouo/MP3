<template>
  <div id="app">

    <nav-bar></nav-bar>
    <music-list></music-list>
    <play-bar></play-bar>


  </div>
</template>

<script>
import PlayBar from "@/components/PlayBar";
import NavBar from "@/components/NavBar";
import MusicList from "@/components/MusicList";
export default {
  name: 'App',
  components: {
    PlayBar,NavBar,MusicList
  }
}
</script>

<style>

  body,html{
    line-height: 0;
    padding: 0;
    margin: 0;
  }
</style>
