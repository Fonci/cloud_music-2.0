<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
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
</style>
