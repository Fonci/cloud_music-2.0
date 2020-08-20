<template>
  <div class="container">
    <!-- 歌单信息 -->
    <div class="info">
      <!-- 图片部分-->
      <div class="pic_box">
        <div class="bg" :style="{'background-image':'url('+playlist.coverImgUrl+')'}"></div>
        <img class="pic" :src="playlist.coverImgUrl" alt />
        <div class="pic_info">
          <p class="intro">{{playlist.name}}</p>
          <div>
            <img class="avatar" :src="playlist.creator.avatarUrl" alt />
            <span>{{playlist.creator.nickname}}</span>
          </div>
        </div>
      </div>
      <!-- 信息部分 -->
      <div class="song_info">
        <p class="tags">
          标签：
          <span
            style="margin-right:0.1rem;"
            v-for="(tag,index) in playlist.tags"
            :key="index"
          >{{tag}}</span>
        </p>
        <p class="text">简介：{{playlist.description}}</p>
      </div>
    </div>
    <p class="divider">歌曲列表</p>
    <!-- 歌曲列表 -->
    <div class="song_lists">
      <van-cell-group>
        <van-cell
          use-label-slot
          label-class="singer_label"
          style="height:1rem;font-size:0.32rem;text-align:left;line-height:0.5rem;"
          v-for="(song,index) in songs"
          :key="index"
          :title="song.name+(song.alia[0]?'('+song.alia[0]+')':'')"
          :label="song.ar[0].name"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="4rem;" style="line-height:1rem;font-size:0.4rem;" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songListsId: "",
      showMore: true,
      playlist: {
        creator: {},
        tags: {},
        description: "",
      },
      ids: "",
      songs: {},
    };
  },
  created() {
    this.songListsId = window.sessionStorage.getItem("songListsId");
    this.getMusicList(this.songListsId);
  },
  methods: {
    // 获取歌单详情数据信息
    async getMusicList(id) {
      const { data: res } = await this.$http.get("/playlist/detail", {
        params: {
          id: id,
        },
      });
      if (res.code == 200) {
        this.playlist = res.playlist;
        let trackIds = res.playlist.trackIds;
        let arr = [];
        trackIds.forEach((k, v) => {
          arr.push(k.id);
        });
        this.ids = arr.join(",");
        this.getMusic();
      }
    },
    // 获取歌曲列表
    async getMusic() {
      if (this.ids) {
        const { data: res } = await this.$http.get("/song/detail", {
          params: {
            ids: this.ids,
          },
        });
        if (res.code == 200) {
          this.songs = res.songs;
          // 正在播放的列表中的所有音乐id 用于切歌
          let arr = [];
          for (var i in res.songs) {
            arr.push(res.songs[i].id);
          }
          window.sessionStorage.setItem("playingSongs", arr);
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
}
.pic_box {
  width: 100%;
  height: 2.5rem;
  padding: 1rem 0;
  display: flex;
  justify-content: space-around;
  position: relative;
  overflow: hidden;
}
.bg {
  border: 1px solid green;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-position: left;
  -webkit-filter: blur(20px);
  filter: blur(20px);
  -webkit-transform: scale(1.5);
  -ms-transform: scale(1.5);
  transform: scale(1.5);
  z-index: -1;
}

.pic {
  width: 2.5rem;
  height: 2.5rem;
}
.pic_info {
  width: 55%;
  height: 2.5rem;
  text-align: left;
}
.intro {
  color: white;
  font-size: 0.34rem;
  margin: 0;
}
.avatar {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  vertical-align: bottom;
}
.avatar + span {
  font-size: 0.17rem;
  color: hsla(0, 0%, 100%, 0.7);
}
.song_info {
  width: 96%;
  height: auto;
  margin: 0 auto;
  color: #666;
  font-size: 0.26rem;
  text-align: left;
}

.tags span {
  padding: 0.05rem 0.15rem;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
}
.text {
  white-space: pre-wrap;
}
.divider {
  font-size: 0.2rem;
  padding: 0.15rem 0 0.15rem 0.2rem;
  color: #666;
  text-align: left;
  background-color: #eeeff0;
}
</style>