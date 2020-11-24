<template>
    <div id="playbar">
        <div class="music-page">
            <!--            <a-icon type="LoadingOutlined"></a-icon>-->
            <div class="music-pic">
                <img src="http://p3.music.126.net/VhpShGnWbKkvQARP6QziTg==/109951165248863759.jpg" alt="">
            </div>
            <div class="lyric">
                <span>wuhuhuu</span>
            </div>
        </div>
        <div class="control">
            <div class="left">
                <a-icon type="caret-left" theme="filled"/>
            </div>
            <div class="pause-play" @click="ppclick">
                <div class="paly" v-show="this.showPause">
                    <a-icon type="play-circle"/>
                </div>
                <div class="pause" v-show="!this.showPause">
                    <a-icon type="pause-circle"/>
                </div>
            </div>
            <div class="right">
                <a-icon type="caret-right" theme="filled"/>
            </div>
            <div class="pg">
                <div id="music-progress-bar">
                    <div id="bar"></div>
                </div>
                <div class="time">
                    {{this.currentTime|format}}/{{this.audio.duration|format}}
                </div>
            </div>
            <div class="volume">

            </div>
            <div class="list" @click="showList">
                <!--                <MenuOutlined />-->
                <!--                <MenuUnfoldOutlined />-->
                <a-icon type="bars"/>
            </div>
        </div>

    </div>
</template>

<script>
    import {getSingleMusic} from "@/api/song";
    import {format} from "@/utils/util";

    export default {
        name: "PlayBar",
        filters: {
            format
        },
        computed: {
            // currentTime:{
            //     get:function () {
            //         return this.audio.currentTime
            //     },
            //     set:function (value) {
            //         // this.currentTime = value
            //     }
            // },
            music: {
                get: function () {
                    return this.$store.state.music
                },
                set: function (value) {
                    this.$store.commit('setMusicId', {value})
                }

            },
            musicAudio: {
                get: function () {
                    return this.$store.state.audio
                },
                set: function (url) {
                    this.$store.state.commit('setAudio', {url})
                }
            },
            musicData: {
                get: function () {
                    return this.musicData
                },
                set: function (val) {
                    this.musicData = val
                }
            }
        },
        data() {
            return {
                //是否显示播放列表
                showMusicList: false,
                //是否暂停
                showPause: true,
                percent: 0,
                musicList: [],
                imgUrl: "",
                volumePercent: 0,
                audio: new Audio(),
                currentTime: 0,
            }
        },
        methods: {
            volumeIncrease() {
                let percent = this.percent + 10;
                if (percent > 100) {
                    percent = 100;
                }
                this.percent = percent;
            },
            volumeDecline() {
                let percent = this.percent - 10;
                if (percent < 0) {
                    percent = 0;
                }
                this.percent = percent;
            },
            // 没有用commit 可能有点小问题
            ppclick: function () {
                // this.percent=this.percent+10
                // for test
                // this.currentTime = this.audio.currentTime
                // console.log(this.currentTime)
                if (this.showPause == false) {
                    this.audio.pause()
                    this.showPause = !this.$store.state.showPause
                    this.$store.state.showPause = this.showPause
                } else {
                    this.audio.play();
                    this.showPause = !this.$store.state.showPause
                    this.$store.state.showPause = this.showPause
                }
                // console.log(this.$store.state.showPause = this.showPause);

            },
            showList: function () {
                // request for list
                this.showmusicList = !this.$store.state.showmusicList
                this.$store.state.showmusicList = this.showmusicList
            }
        },
        created: function () {
            //for test
            // this.percent++
            // 创建Audio
            getSingleMusic(1496812174).then(url => {
                console.log("c", url.data[0].url)
                let u = url.data[0].url
                this.audio.src = u
                this.$store.commit('setAudioUrl', {u})
                this.audio.play();
                this.currentTime = this.audio.currentTime
                console.log("shit", this.currentTime)
            })

            this.audio.addEventListener('timeupdate',(event)=>{
                // console.log(this.currentTime)
                this.currentTime = this.audio.currentTime
                this.percent = (this.currentTime/this.audio.duration).toFixed(4)*100
                console.log("percent",this.percent)
            })

        },
        watch: {
            music(newMusic, oldMusic) {
                if (newMusic == oldMusic) {
                    return;
                }
                this.audio.src = this.$store.state.audioUrl.u
                // console.log("music", this.$store.state.audioUrl.u)
                this.audio.play()
                // this.audio=this.$store.state.audio
            },
            currentTime(newT){
                // working
                // console.log(newT)
            },
            percent(newp) {
                if (newp < 100) {
                    let pro = document.getElementById("music-progress-bar")
                    let total = pro.offsetWidth
                    let piece = total / 100
                    // console.log("piece",total)
                    let bar = document.getElementById("bar")
                    // this.percent=this.percent+5
                    // console.log(""+newp+"px")
                    newp = newp * piece
                    bar.style.width = newp + "px"
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    #playbar {
        line-height: 0;
        /*display: flex;*/
        /*height: 108px;*/
        position: fixed;
        background: #ade936;
        width: 100%;
        justify-content: center;
        bottom: 0;
    }

    .control {
        width: 100%;
        height: 36px;
        display: flex;
        /*left: 0;*/
        justify-content: left;
        bottom: 0;
        /*overflow: hidden;*/
        /*background: darksalmon;*/
    }

    .left {
        left: 0;
    }

    .left, .pause-play, .right, .list {
        font-size: 36px;
    }

    .music-page {
        display: flex;
        height: 80px;
        align-items: center;
        justify-content: center;
        text-justify: newspaper;
        /*background: #e94434;*/
    }

    .music-pic {
        display: flex;
        height: 100%;
    }

    .music-pic img {
        object-fit: cover;
        position: fixed;
        left: 0;
        height: 80px;
        width: 100px;
        left: 0;
    }

    .pg {
        display: flex;
        width: 100%;
        align-items: center;
    }

    .volume {
        display: flex;
    }

    .list {
        display: flex;
        width: 36px;
        height: 36px;
        /*background: darksalmon;*/
    }

    #music-progress-bar {
        background-color: #ddd;
        height: 2px;
        width: 90%;
        position: relative;
    }

    #bar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: red;
        width: 10%;
        transition: all .2s ease;
    }

    .time {
        font-size: 16px;
        padding-left: 10px;
    }
</style>
