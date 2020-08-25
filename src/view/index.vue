<template>
  <div class="container">
    <!-- header -->
    <nav-menu></nav-menu>
    <!-- 滑动 tabs -->

    <van-tabs v-model="activeName" title-active-color="#8991f7" color="#8991f7" line-height="3px">
      <van-tab title="推荐" class="recommend_tab">
        <recommend></recommend>
      </van-tab>
      <van-tab title="排行榜">
        <rank></rank>
      </van-tab>
      <van-tab title="搜索">
        <search></search>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import navMenu from "../components/navMenu";
import recommend from "../view/recommend";
import rank from "../view/rank";
import search from "../view/search";
export default {
  components: {
    navMenu,
    recommend,
    rank,
    search,
  },
  data() {
    return {
      activeName: 0,
      checked: true,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
</style>