<template>
  <div>
      <div class="detail_top_title">
          <img src="../assets/back.png" @click="onBack" />
          <span>{{hint}}</span>
      </div>
      <div class="detail_container">
          <textarea @click="judge" class="detail_todo_content" :value="todo_detail.content"/>
      </div>
      <div class="detail_bottom_tool">
          <div>
              <img src="../assets/del.png" />
          </div>
          <div>
              <img src="../assets/fini.png" />
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "todo_detail",
  data() {
    return {
      todo_detail: {},
      id: 0,
      hint:''
    };
  },
  mounted() {
       var textarea=document.getElementsByTagName('textarea')[0];
        textarea.addEventListener('focus',()=>{
            this.hint='编辑'
        },false)
        textarea.addEventListener('blur',()=>{
            this.hint='查看'
        },false)
    function getKey(name) {
      var reg = new RegExp("(^|&|\\?)" + name + "=([^&|\\?]*)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
    switch (getKey("name")) {
      case "recently_del":
        this.id = getKey("id");
        var a = this.get_del();
        this.todo_detail = a[a.length - 1 - this.id];
        break;
      default:
        break;
    }
  },
  methods: {
    judge(){
    },
    onBack() {
      this.$router.back(-1);
    },
    get_del() {
      //获取最近删除的todo列表并返回
      var del_todo = [];
      if (localStorage.getItem("Del_todo")) {
        var Del_todo = localStorage.getItem("Del_todo").split("|");
        for (var i = 0, j = 0; i <= Del_todo.length - 2; i++, j++) {
          var a = {};
          a.content = Del_todo[i].split(">")[0];
          a.startTime = Del_todo[i].split(">")[1];
          a.endTime = Del_todo[i].split(">")[2];
          a.id = j;
          del_todo.push(a);
        }
      }
      return del_todo;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail_top_title {
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  background-color: bisque;
}
.detail_top_title > img {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 2rem;
  height: 2rem;
}
.detail_top_title > span {
  margin: auto;
}
.detail_container {
  position: absolute;
  width: 100%;
  top: 3rem;
  bottom: 3rem;
  background-color: beige;
  overflow-x: hidden;
  overflow-y: scroll;
}
.detail_todo_content {
  box-sizing: border-box;
  width: 100%;
  border: 0;
  background-color: beige;
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-family: sans-serif;
}
.detail_todo_content:focus {
  outline: none;
}
.detail_bottom_tool {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0;
  background-color: beige;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  box-sizing: border-box;
}
.detail_bottom_tool > div > img {
  width: 2rem;
  height: 2rem;
}
</style>
