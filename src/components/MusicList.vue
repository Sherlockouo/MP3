<template>
    <div id="musiclist">
        <div class="list">
            <a-list item-layout="horizontal" :data-source="this.musicList">
                <a-list-item slot="renderItem" slot-scope="item" >
                    <a-list-item-meta  @click="play(item.id)">
                        <a slot="title">{{item.name}}</a>
                        <a slot="description">{{item.artists[0].name}}</a>
                        <a-avatar slot="avatar" :src="item.album.picUrl" />
                    </a-list-item-meta>
                    <div>{{(item.duration / 1000)|format}}</div>
                </a-list-item>
            </a-list>
        </div>
    </div>
</template>

<script>
    import {getTopSongs,getSingleMusic} from "@/api/song";

    import {format} from "@/utils/util";

    export default {
        name: "MusicList",
        computed:{
            musicList: {
                get: function () {
                    return this.$store.state.musicList
                },
                set: function (value) {
                    this.$store.commit('setMusicList', {value})
                }
            },
        },
        data(){
            return {
                // musicList:[]
            }
        },
        methods:{
            play(index){
                // console.log(this.musicList[index])
                console.log(index)
                this.$store.commit('setMusicId',{index})
                this.$store.state.isPlaying = true
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
            musicList: function(newls,oldls) {
                this.musicList=this.$store.state.musicList
                console.log("list",this.musicList)
            }
        },
        filters:{
            format
        },
        created:function () {
           getTopSongs(0).then(songs=>{
               // console.log(songs.data)
               this.$store.state.musicList=songs.data
               // console.log(this.$store.getters.musicList)
               this.musicList = this.$store.getters.musicList
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
