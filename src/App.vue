<template>
  <div id="#app">
      <router-view/>
      <div class="footer_info">
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
    return {};
  },
  methods: {
    launch(e) {
      let height =
        this.GetCurrentStyle(e.target.parentNode.lastChild, "height") == "0px"
          ? "10rem"
          : "0px";
      e.target.parentNode.lastChild.style.height = height;
    },
    onSkip(e) {//路由跳转
      var type = "";
      if (e.target.className == "") {
        type = e.target.parentNode.dataset.type;
      } else {
        type = e.target.dataset.type;
      }
      if (
        (location.pathname == "/" && type == "todo") ||
        (location.pathname == "/my" && type == "my")
      ) {//防止重复渲染页面
      } else {
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
      }
    },
    GetCurrentStyle(obj, prop) {
      //拿取CSS中的样式
      var propprop;
      if (obj.currentStyle) {
        return obj.currentStyle[prop];
      } else if (window.getComputedStyle) {
        propprop = prop.replace(/([A-Z])/g, "-$1");
        propprop = prop.toLowerCase();
        return document.defaultView.getComputedStyle(obj, null)[prop];
      }
      return null;
    }
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
  cursor: pointer;
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
