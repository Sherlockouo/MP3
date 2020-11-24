<template>
    <div class="navbar">
        <div class="left">
<!--            <a-icon type="bars" />-->
            <a-icon type="user" />
        </div>
        <div class="mid">
            <a-input-search
                    placeholder="输入音乐名称 或者 歌手"
                    enter-button="Search"
                    size="large"
                    @search="onSearch"
            />
        </div>
        <div class="right">
<!--            <a-icon type="bars" />-->
            <a-icon type="more" />
        </div>
    </div>
</template>

<script>
    import {getSearchSongs} from '@/api/song'
    export default {
        name: "NavBar",
        data(){
            return {

            }
        },
        methods:{
            onSearch(value){
                getSearchSongs(value).then(songs=>{

                    let ls =songs.result.songs
                    this.$store.state.searchMusicList=ls
                    this.$store.state.isTopList = false
                    console.log('new list',this.$store.state.searchMusicList)
                })
            }
        }
    }
</script>

<style scoped>
    .navbar{
        line-height: 0;
        display: flex;
        justify-content: center;
        height: 36px;
        /*background: darksalmon;*/
        top:0;
    }
    .left{
        /*overflow: hidden;*/
        height: 36px;
        width: 36px;
        position: fixed;
        left: 0;
    }

    .mid{
        position: fixed;
        top: 0;
        height: 36px;
        width: 100%;
        padding-left: 36px;
        padding-right: 36px;
    }
    .right{
        /*overflow: hidden;*/
        height: 100%;
        position: fixed;
        right: 0;
    }

    .left,.right{
        margin: 0;
        padding: 0;
        font-size: 36px;
    }


</style>
