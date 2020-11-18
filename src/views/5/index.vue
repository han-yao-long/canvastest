<template>
  <div>
    <el-button @click="gets">默认按钮</el-button>
    <div class="box">
      <div class="box-1"></div>
      <transition name="fade">
        <div v-show="ishow" class="box-friend"></div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ishow: false,
    };
  },
  methods: {
    gets() {
      this.ishow = !this.ishow;
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  position: absolute;
  left: 100px;
  .box-1 {
    position: absolute;
    left: -100PX;
    top: 0;
    width: 100px;
    height: 100PX;
    background: green;
    z-index: 2;
  }
  .box-friend {
    width: 500px;
    height: 600px;
    background: red;
    position: absolute;
    top: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  z-index: 1;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-500px);
}
</style>