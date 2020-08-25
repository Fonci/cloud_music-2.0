<template>
  <div class="container">
    <div class="singerRank" v-if="musicListType=='singer'">
      <div class="singer_title">云音乐歌手榜</div>
      <van-tabs v-model="activeTab" animated @click="getName">
        <van-tab
          v-for="(item,index) in singerType"
          :title="item.area"
          :key="index"
          :name="item.type"
        >
          <div
            class="singer_list"
            v-for="(item,index) in singerList"
            :key="item.id"
            @click="goSingerMusic(item.id)"
          >
            <!-- 排序 -->
            <div class="singer_order">
              <div
                style="font-size:.18rem;font-weight:bold;margin-top:.25rem;margin-bottom:0.08rem;"
              >{{index+1}}</div>
              <div
                class="up_down"
                style="color:red;"
                v-if="(index+1)>item.lastRank"
              >+{{(index+1)-item.lastRank}}</div>
              <div
                class="up_down"
                style="color:green;"
                v-if="(index+1)<=item.lastRank"
              >-{{item.lastRank-(index+1)}}</div>
            </div>
            <!-- 歌手照片 -->
            <img
              style="width:2rem;height:1.8rem;margin-left:0.3rem;border-radius:5px;"
              :src="item.picUrl"
              alt
            />
            <!-- 歌手姓名 -->
            <div style="margin-left:20px;text-align:left;">
              <p class="singer_name">
                {{item.name}}
                <span v-if="item.trans">{{item.trans}}</span>
              </p>
              <p class="follow_people">热度：{{(item.score/10000).toFixed(2)}}万</p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="rank" v-if="musicListType=='rank'">
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
          <p class="tags" v-if="playlist.tags.length">
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
            @click="goListen(song.id)"
          >
            <template #right-icon>
              <van-icon
                name="play-circle-o"
                size="4rem;"
                style="line-height:1rem;font-size:0.4rem;"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
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
      singerList: [],
      singerUpdateTime: "",
      activeTab: "1",
      singerType: [
        {
          type: "1",
          area: "华语",
        },
        {
          type: "2",
          area: "欧美",
        },
        {
          type: "3",
          area: "韩国",
        },
        {
          type: "4",
          area: "日本",
        },
      ],
    };
  },
  created() {
    // 获得歌单id,获取歌单详情所有歌曲数据
    this.songListsId = window.sessionStorage.getItem("songListsId");
    this.musicListType = window.sessionStorage.getItem("MusicListType"); //榜单类型

    if (this.musicListType == "rank") {
      this.getMusicList(this.songListsId);
    } else {
      this.getSingerList(this.activeTab);
    }
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
    // 去音乐播放页
    goListen(id) {
      if (id != 0) {
        this.$router.push("/listen");
        // 播放歌曲的id 传给播放页面
        window.sessionStorage.setItem("musicId", id);
      }
    },
    // 查询歌手榜
    async getSingerList(type) {
      const { data: res } = await this.$http.get("/toplist/artist", {
        params: {
          type: type,
        },
      });
      if (res.code == 200) {
        this.singerList = res.list.artists;
        this.singerUpdateTime = res.list.updateTime;
      }
    },
    // 点击切换tabs
    getName(name, title) {
      this.getSingerList(name);
    },
    // 进入歌手所有歌曲详情
    goSingerMusic(id) {
      window.sessionStorage.setItem("singerId", id);
      this.$router.push("/singerAllMusic");
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
  margin: 0.3rem auto;
  color: #666;
  font-size: 0.26rem;
  text-align: left;
}
.tags {
  margin: 0.2rem 0;
}
.tags span {
  padding: 0.05rem 0.15rem;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
}
.text {
  white-space: pre-wrap;
  /* white-space: pre; */
}
.divider {
  font-size: 0.2rem;
  padding: 0.15rem 0 0.15rem 0.2rem;
  color: #666;
  text-align: left;
  background-color: #eeeff0;
}
/* 歌手榜 */
.singer_title {
  background-color: #8991f7;
  color: white;
  font-size: 0.3rem;
  padding: 0.26rem 0;
}
.singer_list {
  width: 100%;
  height: 2rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-around;
}
</style>