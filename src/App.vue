<template>
  <div id="app">
    <router-view />

    <!-- 底部播放条 -->
    <div class="play_bar">
      <div>
        <img style src="./assets/logo.png" alt />
        <span class="song_name">cloud music</span>
      </div>
      <van-icon :name="pause_icon" @click="playBtn" />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      pause_icon: "pause-circle-o",
      // play_icon: "play-circle-o",
      playIndex: 0,
    };
  },
  methods: {
    // 点击按钮
    playBtn() {
      this.playIndex += 1;
      console.log();
      if (this.playIndex % 2 == 0) {
        this.pause_icon = "play-circle-o";
      } else {
        this.pause_icon = "pause-circle-o";
      }
    },
  },
};
</script>

<style>
#app {
  width: 7.5rem;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  /* margin-top: 60px; */
  font-size: 24px;
}
.van-tabs--line .van-tabs__wrap {
  height: 0.8rem;
}
.van-tab {
  font-size: 0.28rem;
}
.van-tab__text--ellipsis {
  overflow: unset;
}
.play_bar {
  width: 100%;
  height: 1rem;
  font-size: 0.4rem;
  line-height: 1rem;
  border-top: 1px solid #eee;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
}
.play_bar img {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.25rem;
  vertical-align: middle;
}
.van-icon {
  vertical-align: middle;
  margin-right: 0.25rem;
  font-size: 0.7rem;
  margin-top: 0.2rem;
}
</style>
