<template>
  <div class="container">
    <!-- header -->
    <nav-menu></nav-menu>
    <!-- 滑动 tabs -->

    <van-tabs color="#8991f7" line-height="3px">
      <van-tab title="推荐">
        <recommend></recommend>
      </van-tab>
      <van-tab title="排行榜">排行榜</van-tab>
      <van-tab title="搜索">搜索</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import navMenu from "../components/navMenu";
import recommend from "../view/recommend";
export default {
  components: {
    navMenu,
    recommend,
  },
  data() {
    return {
      activeName: "1",
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