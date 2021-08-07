<template>
  <div id="app">
    <router-view/>
    <div class="yuan"></div>
    <div class="yuan2"></div>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: linear-gradient(180deg, #33BEF8 0%, #0145EB 100%);
  font-family: ABeeZee;
  font-size: 15px;
  line-height: 22px;
}

#app {
  max-width: 500px;
  margin: 0 auto;
}
.yuan{
  position: fixed;
  top: -191px;
  right: -50%;
  width: 382px;
  height: 382px;
  border-radius: 50%;
  background: #fff;
  opacity: .2;
  z-index: -100;
}
.yuan2{
  position: fixed;
  bottom: -191px;
  left: -50%;
  width: 382px;
  height: 382px;
  border-radius: 50%;
  background: #fff;
  opacity: .2;
  z-index: -100;
  transition: all 2s;
}
</style>
