<template>
  <div id="#app">
    <keep-alive>
      <router-view/>
    </keep-alive>
      <div class="footer_info" v-show="isShow">
        <div class="todo" @click="onSkip" data-type="todo">
          <img src="./assets/todo.png"/>
          <span>备忘录</span>
        </div>
        <div class="my" @click="onSkip" data-type="my">
          <img src="./assets/my.png"/>
          <span>我的</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isShow:true,
    };
  },
  mounted() {
    this.$router.push('/');
  },
  updated(){
    if(location.href.indexOf('/my/Todo_list')>=0){
      this.isShow=false;
    }else{
      this.isShow=true;
    }
  },
  methods: {
    onSkip(e) {
      //路由跳转
      var type = "";
      if (e.target.className == "") {
        type = e.target.parentNode.dataset.type;
      } else {
        type = e.target.dataset.type;
      }
      switch (type) {
        case "todo":
          this.$router.push({ path: "/" });
          // location.reload();
          break;

        case "my":
          this.$router.push({ path: "/my" });
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style>
* {
  user-select: none;
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.footer_info {
  user-select: none;
  position: fixed;
  width: 100%;
  height: 3.5rem;
  bottom: 0;
  background-color: darkorange;
  display: flex;
  text-align: center;
  width: 100%;
  text-decoration: none;
}
.footer_info > div {
  width: 50%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding-top: 0.4rem;
  color: #fff;
}
.footer_info > div > img {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto;
}
</style>
