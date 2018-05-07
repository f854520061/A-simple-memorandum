<template>
  <div>
      <div v-if="isShow" class="top_title">
        <img src="../assets/back.png" @click="onBack" />
          <span class="title_1">
              {{title}}
          </span>
          <!-- <span class="title_2">
              ——保存一个月以内添加的任务
          </span> -->
      </div>
      <div v-if="isShow" class="content">
        <ul>
          <li @click="onTab" v-for="t in todo_list" :key="t.id" :data-id="t.id">{{t.content}}
            <span v-if="!t.endTime">{{t.startTime}}</span>
            <span v-else>{{t.startTime+' — '+t.endTime}}</span>
          </li>
        </ul>
      </div>
      <router-view/>
  </div>
</template>

<script>
import Tool from "@/assets/JS/Tool.js";
export default {
  name: "Recently_add",
  data() {
    return {
      todo_list: [],
      title: "",
      isShow: true
    };
  },
  methods: {
    onTab(e) {
      var id = e.target.dataset.id
        ? e.target.dataset.id
        : e.target.offsetParent.dataset.id;
      var name = Tool.getKey("name");
      this.$router.push({
        path: "/my/Todo_list/Todo_detail",
        query: { name: name, id: id }
      });
    },
    onBack() {
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
    },
    get_recently_fin() {
      //获取最近完成的todo列表并返回
      var recently_fin_todo = [];
      if (localStorage.getItem("Finish_todo")) {
        var Finish_todo = localStorage.getItem("Finish_todo").split("|");
        for (var i = Finish_todo.length - 2, j = 0; i >= 0; i--, j++) {
          if (i <= Finish_todo.length - 12) {
            break;
          }
          var a = {};
          a.content = Finish_todo[i].split(">")[0];
          a.startTime = Finish_todo[i].split(">")[1];
          a.endTime = Finish_todo[i].split(">")[2];
          a.id = j;
          recently_fin_todo.push(a);
        }
      }
      return recently_fin_todo;
    },
    get_recently_del() {
      //获取最近删除的todo列表并返回
      var recently_del_todo = [];
      if (localStorage.getItem("Del_todo")) {
        var Del_todo = localStorage.getItem("Del_todo").split("|");
        for (var i = Del_todo.length - 2, j = 0; i >= 0; i--, j++) {
          if (i <= Del_todo.length - 12) {
            break;
          }
          var a = {};
          a.content = Del_todo[i].split(">")[0];
          a.startTime = Del_todo[i].split(">")[1];
          a.endTime = Del_todo[i].split(">")[2];
          a.id = j;
          recently_del_todo.push(a);
        }
      }
      return recently_del_todo;
    }
  },
  mounted() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (
      bIsIpad ||
      bIsIphoneOs ||
      bIsMidp ||
      bIsUc7 ||
      bIsUc ||
      bIsAndroid ||
      bIsCE ||
      bIsWM
    ) {
      document.addEventListener("plusready", function() {
        // 注册返回按键事件
        plus.key.addEventListener(
          "backbutton",
          function() {
            // 事件处理
            window.history.back();
          },
          false
        );
      });
    }
    switch (Tool.getKey("name")) {
      case "Agency_todo":
        this.todo_list = Tool.get_Agency_todo();
        this.title = "待办任务";
        break;
      case "Finish_todo":
        this.todo_list = Tool.get_Finish_todo();
        this.title = "已完成任务";
        break;
      case "recently_add":
        this.todo_list = this.get_recently_add();
        this.title = "最近添加任务";
        break;
      case "recently_fin":
        this.todo_list = this.get_recently_fin();
        this.title = "最近完成任务";
        break;
      case "recently_del":
        this.todo_list = this.get_recently_del();
        this.title = "最近删除任务";
        break;
      default:
        break;
    }
  },
  updated() {
    if (location.href.indexOf("/my/Todo_list/Todo_detail") >= 0) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top_title {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 10rem;
  background-color: orange;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.top_title > img {
  position: absolute;
  top: 0.8rem;
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
  position: absolute;
  top: 10rem;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content > ul > li > span {
  position: absolute;
  font-size: 0.4rem;
  right: 0.8rem;
  top: 1.2rem;
  color: #666;
}
</style>
