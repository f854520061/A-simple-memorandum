<template>
  <div>
      <div class="detail_top_title">
          <img src="../assets/back.png" @click="onBack" />
          <span>{{isEdit?"编辑":"查看"}}</span>
      </div>
      <div class="detail_container">
          <textarea class="detail_todo_content" :value="todo_detail.content"/>
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
import Tool from '@/assets/JS/Tool.js';
export default {
  name: "todo_detail",
  data() {
    return {
      todo_list:[],
      todo_type:'',
      todo_detail: {},
      id: 0,
      isEdit: false
    };
  },
  mounted() {
    var textarea = document.getElementsByTagName("textarea")[0];
    textarea.addEventListener(
      "focus",
      () => {
        this.isEdit = true;
      },
      false
    );
    textarea.addEventListener(
      "blur",
      () => {
        this.isEdit = false;
      },
      false
    );
    var that=this;
    Tool.setEventListener(textarea,'all',that.right_scroll,that.left_scroll);
    var pre_id=Tool.getKey("id");
    switch (Tool.getKey("name")) {
      case "recently_del":
        this.todo_type='Del_todo';
        var a = Tool.get_del_todo();
        this.id = a.length - 1 - pre_id;
        this.todo_detail = a[this.id];
        this.todo_list=a;
        break;
      case "Agency_todo":
        this.todo_type='Agency_todo';
        var a = Tool.get_Agency_todo();
        this.id = pre_id;
        this.todo_detail = a[this.id];
        this.todo_list=a;
        break;
      case "Finish_todo":
        this.todo_type='Finish_todo';
        var a = Tool.get_Finish_todo();
        this.id = pre_id;
        this.todo_detail = a[this.id];
        this.todo_list=a;
        break;
      case "recently_add":
        this.todo_type='Agency_todo';
        var a = Tool.get_Agency_todo();
        this.id = a.length - 1 - pre_id;
        this.todo_detail = a[this.id];
        this.todo_list=a;
        break;
      case "recently_fin":
        this.todo_type='Finish_todo';
        var a = Tool.get_Finish_todo();
        this.id = a.length - 1 - pre_id;
        this.todo_detail = a[this.id];
        this.todo_list=a;
        break;
      default:
        break;
    }
  },
  methods: {
    right_scroll(e){
      var t = document.getElementsByTagName("textarea")[0];
      this.todo_detail.content=t.value;
      var d = new Date();
      var startTime =
        d.getFullYear() +
        "-" +
        (parseInt(d.getMonth()) + 1) +
        "-" +
        d.getDate() +
        " " +
        Tool.formatTime(d.getHours()) +
        ":" +
        Tool.formatTime(d.getMinutes()) +
        ":" +
        Tool.formatTime(d.getSeconds());
      this.todo_detail.startTime=startTime;
      this.todo_list[this.id]=this.todo_detail;
      var s=this.formatTodo(this.todo_list);
      localStorage.setItem(this.todo_type,s);
      t.blur();
    },
    left_scroll(){
      var t = document.getElementsByTagName("textarea")[0];
      t.blur();
    },
    onBack() {
      this.$router.back(-1);
    },
    formatTodo(arr){
      var str='';
      for(var i=0;i<=arr.length-1;i++){
        str+=arr[i].content+'>'+arr[i].startTime+(arr[i].endTime?('>'+arr[i].endTime):'')+'|';
      }
      return str;
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
.detail_top_title > div {
  position: absolute;
  width: 2rem;
  height: 1.3rem;
  color: coral;
  top: 0.85rem;
  z-index: 9;
}
.detail_top_title > .detail_cancel {
  left: 0.6rem;
}
.detail_top_title > .detail_finish {
  right: 0.6rem;
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
