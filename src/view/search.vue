<template>
  <div class="container">
    <!-- <van-search v-model="searchValue" placeholder="请输入搜索关键词" style="font-size:0.3rem" /> -->
    <input class="search_input" type="text" placeholder="请输入搜索关键词" v-model="searchValue" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
    };
  },
};
</script>

<style>
.search_input {
  width: 90%;
  height: 0.6rem;
  border-radius: 0.05rem;
  border-color: #eee;
  font-size: 0.2rem;
}
</style>