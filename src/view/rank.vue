<template>
  <div class="container">
    <!-- 歌手榜 -->
    <div class="inner" @click="goSingerList()">
      <img :src="rankList.artistToplist.coverUrl" alt />
      <div>
        <p class="title">{{rankList.artistToplist.name}}</p>
        <p class="update">{{rankList.artistToplist.updateFrequency}}</p>
      </div>
    </div>
    <!-- 其他全部排行榜 -->
    <div
      class="inner"
      v-for="item in rankList.list"
      :key="item.id"
      @click="goMusicListDetail(item.id)"
    >
      <img :src="item.coverImgUrl" alt />
      <div>
        <p class="title">{{item.name}}</p>
        <p class="update">{{item.updateFrequency}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rankList: {
        artistToplist: {},
        list: [],
      },
    };
  },
  created() {
    this.getRankList();
  },
  methods: {
    // 获取所有的榜单类型
    async getRankList() {
      const { data: res } = await this.$http.get("/toplist");
      if (res.code == 200) {
        this.rankList = res;
      }
    },
    //进入榜单详情
    goMusicListDetail(id) {
      // 存储所点击歌单的id,获取歌单详情页面数据
      window.sessionStorage.setItem("songListsId", id);
      window.sessionStorage.setItem("MusicListType", "rank");

      // 点击进入歌单详情页
      this.$router.push("/songListsDetail");
    },
    // 歌手榜详情
    goSingerList() {
      window.sessionStorage.setItem("MusicListType", "singer");
      this.$router.push("/songListsDetail");
    },
  },
};
</script>

<style>
p {
  margin: 0;
}
.inner {
  width: 100%;
  height: auto;
  display: flex;
  padding: 0.2rem 0.3rem;
  /* background-color: #e6e6e6; */
  border-bottom: 1px solid rgba(187, 180, 180, 0.205);
  text-align: left;
}
img {
  width: 1rem;
  height: 1rem;
  margin-right: 0.2rem;
  border-radius: 0.05rem;
}
.title {
  font-size: 0.2rem;
  font-weight: bold;
  margin: 0.1rem 0 0.1rem 0;
}
.update {
  font-size: 0.12rem;
  color: #666;
}
</style>