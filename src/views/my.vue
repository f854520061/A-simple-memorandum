<template>
  <div>
      <div class="All_content" v-show="isShow">
        <div class="top_header">
            <img src="../assets/more.png" alt="设置">
            <div class="head">
                <img src="../assets/head.png" alt="你的头像">
                <span class="name">XZW</span>
            </div>
        </div>
        <ul class="todo_list">
            <li data-id='1' @click="onSkip">待办任务</li>
            <li data-id='2' @click="onSkip">已完成任务</li>
            <!-- <li data-id='3'>已删除任务</li> -->
            <li data-id='4' @click="onSkip">最近添加任务</li>
            <li data-id='5' @click="onSkip">最近完成任务</li>
            <li data-id='6' @click="onSkip">最近删除任务</li>
        </ul>
      </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      isShow: false
    };
  },
  mounted() {
    this.isShow = true;
  },
  updated() {
    if (location.href.indexOf("/my/Todo_list") >= 0) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  methods: {
    onSkip(e) {
      switch (e.target.dataset.id) {
        case "1":
          this.$router.push({
            path: "/my/Todo_list",
            query: { name: "Agency_todo" }
          });
          break;
        case "2":
          this.$router.push({
            path: "/my/Todo_list",
            query: { name: "Finish_todo" }
          });
          break;
        case "4":
          this.$router.push({
            path: "/my/Todo_list",
            query: { name: "recently_add" }
          });
          break;
        case "5":
          this.$router.push({
            path: "/my/Todo_list",
            query: { name: "recently_fin" }
          });
          break;
        case "6":
          this.$router.push({
            path: "/my/Todo_list",
            query: { name: "recently_del" }
          });
          break;
        default:
          break;
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.All_content {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 3.5rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.All_content::-webkit-scrollbar {
  width: 0rem;
  height: 1rem;
}

.All_content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.All_content::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.top_header {
  width: 100%;
  height: 20rem;
  background-color: orange;
  display: flex;
  flex-direction: column;
}
.top_header > img {
  width: 2rem;
  height: 1.5rem;
  position: absolute;
  right: 0.4rem;
  top: 0.5rem;
}
.top_header > .head {
  display: flex;
  flex-direction: column;
  width: 5rem;
  height: 5rem;
  margin: auto;
}
.top_header > .head > img {
  width: 5rem;
  height: 5rem;
}
.top_header > .head > .name {
  text-align: center;
}
.todo_list {
  width: 100%;
  height: auto;
  list-style: none;
  overflow: hidden;
}
.todo_list > li {
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 0.5rem;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  color: #333;
  letter-spacing: 0.1rem;
}
</style>
