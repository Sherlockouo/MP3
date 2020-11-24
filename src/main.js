import Vue from 'vue'
import App from './App.vue'
import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Router from 'vue-router'
import Axios from 'axios';
import Vuex from  'vuex'

Vue.use(Router)
Vue.use(Ant)
Vue.use(Axios)
Vue.use(Vuex)
Vue.config.productionTip = false
const store = new Vuex.Store({
  state:{
    audioUrl:"",
    //是否显示播放列表
    showMusicList: false,
    //是否暂停
    showPause: false,
    // 当前播放的音乐id
    music: 0,
    //top list
    topMusicList: [],
    // searches one
    searchMusicList:[],
    //播放list
    musicToPlayList:[],
    isPlaying: false,
    isTopList: true,
  },
  getters:{
    topMusicList: state=>{
      return state.topMusicList
    }
  },
  mutations:{
    changeIsTopList(state,isTopList){
      state.isTopList=isTopList
    },
    changeShowPause(state,showPause){
      state.showPaus=showPause
    },
    changeShowMusicList(state,showMusicList){
      state.showMusicList=showMusicList
    },
    changeIsPlaying(state,isPlaying){
      state.isPlaying = isPlaying
    },
    setMusicId(state,id){
      state.music=id
    },
    setTopMusicList(state,musiclist){
      state.topMusicList = musiclist
    },
    setSearchMusicList(state,musiclist){
      state.searchMusicList = musiclist
    },
    setMusicToPlay(state,toPlay){
      state.musicToPlayList=toPlay
    },
    setAudioUrl(state,url){
      state.audioUrl=url
    }
  }
})

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
