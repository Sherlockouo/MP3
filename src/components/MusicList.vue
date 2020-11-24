<template>
    <div id="musiclist">
        <div class="list">
            <a-list item-layout="horizontal" v-show="isTopList" :data-source="this.topMusicList">
                <a-list-item slot="renderItem" slot-scope="item" >
                    <a-list-item-meta  @click="play(item.id)">
                        <a slot="title">{{item.name}}</a>
                        <a slot="description">{{item.artists[0].name}}</a>
                        <a-avatar slot="avatar" :src="item.album.picUrl" />
                    </a-list-item-meta>
                    <div>{{(item.duration / 1000)|format}}</div>
                </a-list-item>
            </a-list>
            <a-list item-layout="horizontal" v-show="!isTopList" :data-source="this.searchMusicList">
                <a-list-item slot="renderItem" slot-scope="item" >
                    <a-list-item-meta  @click="play(item.id)">
                        <a slot="title">{{item.name}}</a>
                        <a slot="description">{{item.artists[0].name}}</a>
                        <a-avatar slot="avatar"  :src="item.album.picId|formatUrl" />
                    </a-list-item-meta>
                    <div>{{(item.duration / 1000)|format}}</div>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script>

    import {getTopSongs,getSingleMusic} from "@/api/song";

    import {format,formatUrl} from "@/utils/util";

    export default {
        name: "MusicList",
        computed:{
            topMusicList: {
                get: function () {
                    return this.$store.state.topMusicList
                },
                set: function (value) {
                    this.$store.commit('setTopMusicList', {value})
                }
            },
            searchMusicList: {
                get: function () {
                    return this.$store.state.searchMusicList
                },
                set: function (value) {
                    this.$store.commit('setSearchMusicList', {value})
                }
            },
            isTopList: {
                get: function () {
                    return this.$store.state.isTopList
                },
                set: function (value) {
                    this.$store.commit('changeIsTopList', {value})
                }

            },
        },
        data(){
            return {
            }
        },
        methods:{
            play(index){
                // console.log(this.musicList[index])
                console.log(index)
                this.$store.commit('setMusicId',{index})
                this.$store.state.showPause = false
                getSingleMusic(index).then(url=>{
                    // console.log(url)
                    let u = url.data[0].url;
                    console.log("musiclist",u)
                    this.$store.commit('setAudioUrl',{u})
                })
                if(this.$store.getters.musicToPlayList!=this.musicList){
                    this.$store.commit('setMusicToPlay',this.musicList)
                }
            }
        },
        watch:{
            // eslint-disable-next-line no-unused-vars
            topMusicList: function(newls,oldls) {
                this.topmusicList=this.$store.state.topMusicList
                console.log("list",this.musicList[0].album.picUrl)
            },
            searchMusicList: function (newls) {
                // this.searchMusicList=this.$store.state.searchMusicList
                console.log("search",this.$store.state.searchMusicList)
            },
            isTopList: function() {

            }
        },
        filters:{
            format,formatUrl
        },
        created:function () {
           getTopSongs(0).then(songs=>{
               // console.log(songs.data)
               this.$store.state.topMusicList=songs.data
               // console.log(this.$store.getters.musicList)
               this.musicList = this.$store.getters.topMusicList
               // console.log(this.musicList)
           })
       }
    }
</script>

<style scoped>
    #musiclist{
        line-height: 0;
        display: flex;
        height: 100%;
        width: 100%;

    }
    .list{
        width: 100%;
    }
</style>
