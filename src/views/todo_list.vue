<template>
  <div>
      <div class="top_title">
        <img src="../assets/back.png" @click="onBack" />
          <span class="title_1">
              最近添加的任务
          </span>
          <span class="title_2">
              ——保存一个月以内添加的任务
          </span>
      </div>
      <div class="content">
        <ul>
          <li v-for="t in recently_add_list" :key="t.id">{{t.content}}
            <span>{{t.startTime}}</span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "Recently_add",
  data() {
    return {
      recently_add_list:this.get_recently_add()
    };
  },
  methods:{
    onBack(){
      this.$router.back(-1);
    },
    get_recently_add() {
      //获取最近添加的todo列表并返回
      var recently_add_todo = [];
      if (localStorage.getItem("Agency_todo")) {
        var Agency_todo = localStorage.getItem("Agency_todo").split("|");
        for (var i = Agency_todo.length - 2, j = 0; i >= 0; i--, j++) {
          if (i <= Agency_todo.length - 12) {
            break;
          }
          var a = {};
          a.content = Agency_todo[i].split(">")[0];
          a.startTime = Agency_todo[i].split(">")[1];
          a.id = j;
          recently_add_todo.push(a);
        }
      }
      return recently_add_todo;
    }
  },
  mounted() {
  },
  updated(){
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top_title {
  position:fixed;
  top:0;
  z-index: 10;
  width: 100%;
  height: 10rem;
  background-color: orange;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.top_title>img{
  position: absolute;
  top:0.8rem;
  left: 0.8rem;
  width: 2rem;
  height: 2rem;
}
.top_title > .title_1 {
  font-size: 1.5rem;
  margin-top: 2rem;
}
.top_title > .title_2 {
  font-size: 0.7rem;
  margin-top: -2rem;
  margin-left: 7rem;
}
.content {
  position:absolute;
  top:10rem;
  bottom: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.content > ul {
  width: 100%;
  list-style: none;
}
.content > ul > li {
  position: relative;
  width: 100;
  height: 3.5rem;
  background-color: beige;
  border-bottom: 1px solid #ccc;
  font-size: 1.5rem;
  padding-left: 0.8rem;
  line-height: 3.5rem;
}
.content > ul > li > span {
  position: absolute;
  font-size: 0.4rem;
  right: 0.8rem;
  top: 1.2rem;
  color: #666
}
</style>
