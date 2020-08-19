<template>
  <div class="container">
    <!-- banner -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      style="height:2.6rem;margin-top:0.05rem;"
    >
      <van-swipe-item v-for="(item,index) in banners" :key="index">
        <a :href="item.url?item.url:'javascript:;'">
          <img style="width:100%;height:100%;" :src="item.imageUrl" alt />
        </a>
      </van-swipe-item>
    </van-swipe>
    <!-- 推荐歌单 -->
    <div class="song_lists">
      <p class="cata">
        <span class="title">推荐歌单</span>
        <span class="more">更多>></span>
      </p>
      <!-- 列表 -->
      <div class="list_box">
        <div class="lists" v-for="(item,index) in songLists" :key="index">
          <img style="width:2.4rem;height:2.4rem;" :src="item.picUrl" alt />
          <p class="song_tips">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      songLists: [],
    };
  },
  mounted() {},
  created() {
    this.getBanner();
    this.getRecommandMusic();
  },
  methods: {
    //   banner
    async getBanner() {
      const { data: res } = await this.$http.get("/banner");
      this.banners = res.banners;
    },
    // 获取推荐歌单
    async getRecommandMusic() {
      const { data: res } = await this.$http.get("/personalized", {
        params: {
          limit: 9,
        },
      });
      if (res.code == 200) {
        this.songLists = res.result;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

p {
  margin: 0;
}
.cata {
  width: 100%;
  height: 0.5rem;
  border-left: 0.05rem solid #8991f7;
  line-height: 0.5rem;
  margin: 0.1rem 0;
  display: flex;
  justify-content: space-between;
}
.title {
  font-weight: bold;
  font-size: 0.28rem;
  margin-left: 0.1rem;
}
.more {
  font-size: 0.12rem;
  margin-right: 0.1rem;
  color: gray;
}
.list_box {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.lists {
  width: 2.4rem;
  height: auto;
  text-align: left;
  float: left;
  margin-right: 0.1rem;
}
.song_tips {
  width: 100%;
  height: auto;
  color: gray;
  margin-bottom: 0.1rem;
  font-size: 0.12rem;
  /* 设置文本只显示两行，溢出的使用...代替 */
  /* 超出文本设置为... */
  display: -webkit-box;
  /* 转换为盒子模型 */
  -webkit-line-clamp: 2;
  /* 设置文本为2行 */
  overflow: hidden;
  /* 超出隐藏 */
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  /* 从顶部向底部垂直布置子元素 */
}
</style>