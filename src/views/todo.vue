<template>
  <div>
      <div class="top_title">
        欢迎使用Vue备忘录系统
      </div>
      <div class="container">
        <input 
          type="text" 
          class="entry_text"
          placeholder="输入完成后，右滑添加任务"
          maxlength="30"
        />
        <div class="recently_todo_list">
           <div class="recently_add">
            <img src="../assets/add.png"/>
            <span @click="launch">最近添加</span>
            <ul>
              <li v-for="t in recently_add_todo" :key="t.id" :data-id="t.id" data-type="recently_add">{{t.content}}</li>
              <router-link to="/my/Todo_list?name=recently_add">
              <li>更多 ></li>
              </router-link>
            </ul>
          </div>
          <div class="recently_finish">
            <img src="../assets/fini.png"/>
            <span @click="launch">最近完成</span>
            <ul>
               <li v-for="t in recently_fin_todo" :key="t.id" :data-id="t.id" data-type="recently_fin">{{t.content}}</li>
               <router-link to="/my/Todo_list?name=recently_fin">
              <li>更多 ></li>
               </router-link>
            </ul>
          </div>
          <div class="recently_del">
            <img src="../assets/del.png"/>
            <span @click="launch">最近删除</span>
            <ul>
              <li v-for="t in recently_del_todo" :key="t.id" :data-id="t.id" data-type="recently_del">{{t.content}}</li>
              <router-link to="/my/Todo_list?name=recently_del">
              <li>更多 ></li>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Tool from '@/assets/JS/Tool.js';
export default {
  name: "todo",
  data() {
    return {
      recently_add_todo: this.get_recently_add(),
      recently_fin_todo: this.get_recently_fin(),
      recently_del_todo: this.get_recently_del(),
      a_li: 0,
      f_li: 0,
      d_li: 0
    };
  },
  mounted() {
    var input = document.getElementsByTagName("input")[0];
    var li = document.getElementsByTagName("li");

    for (var i = 0; i < li.length; i++) {
      let todo = li[i];
      Tool.setEventListener(li[i], 'all',() => {
        switch (todo.dataset.type) {
          case "recently_add":
            var todo_list = Tool.get_Agency_todo();
            var todo_id = todo_list.length - 1 - todo.dataset.id; //需要编辑的todo id
            Tool.complateTodo(todo_list, todo_id,this);
            break;
          case "recently_fin":
            var todo_list = Tool.get_Finish_todo();
            var todo_id = todo_list.length - 1 - todo.dataset.id;
            Tool.delTodo(todo_list, todo_id,this);
            break;
          default:
            break;
        }
      },()=>{

      });
    }

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
      //移动端
      Tool.setEventListener(input,'all', () => {
        var Input_Dom = document.getElementsByClassName("entry_text")[0];
        if (Input_Dom.value) {
          //判断Input是否有值
          new Promise((reslove, reject) => {
            var d = new Date();
            var nowTime =
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
              Tool.formatTime(d.getSeconds()); //设置新增代办todo开始时间
            var nowTodo = Input_Dom.value + ">" + nowTime; //用>做分隔，格式为：todo>开始时间
            this.addTodo(nowTodo);
            reslove(nowTodo);
          }).then(value => {
            Input_Dom.value = "";
          });
        }
      },()=>[

      ]);
    } else {
    }
  },
  beforeUpdate() {
    var a_li = document.getElementsByTagName("ul")[0].children; //添加列表
    var f_li = document.getElementsByTagName("ul")[1].children; //完成列表
    var d_li = document.getElementsByTagName("ul")[2].children; //删除列表
    this.a_li = a_li.length;
    this.f_li = f_li.length;
    this.d_li = d_li.length;
  },
  updated() {
    var a=document.getElementsByTagName("ul")[0];
    var f=document.getElementsByTagName("ul")[1];
    var d=document.getElementsByTagName("ul")[2];
    var a_li =a.children;
    var f_li =f.children;
    var d_li =d.children;
    /*
    实时计算高度
    */
    let a_height =
        this.GetCurrentStyle(a, "height") == "0px"
          ? "0px"
          : (a.children.length*2.5+'rem');
    a.style.height = a_height;

    let f_height =
        this.GetCurrentStyle(f, "height") == "0px"
          ? "0px"
          : (f.children.length*2.5+'rem');
    f.style.height = f_height;

    let d_height =
        this.GetCurrentStyle(d, "height") == "0px"
          ? "0px"
          : (d.children.length*2.5+'rem');
    d.style.height = d_height;
    if (this.a_li != 4) {
      let todo = a_li[this.a_li - 1];
      //重新添加滑动监听
      if (todo) {
        Tool.setEventListener(todo,'all', () => {
          switch (todo.dataset.type) {
            case "recently_add":
              var todo_list = Tool.get_Agency_todo();
              var todo_id = todo_list.length - 1 - todo.dataset.id; //需要编辑的todo id
              Tool.complateTodo(todo_list, todo_id,this);
              break;
            default:
              break;
          }
        },()=>[

        ]);
      }
    }
    if (this.f_li != 4) {
      let todo = f_li[this.f_li - 1];
      if (todo) {
        Tool.setEventListener(todo, 'all',() => {
          switch (todo.dataset.type) {
            case "recently_fin":
              var todo_list = Tool.get_Finish_todo();
              var todo_id = todo_list.length - 1 - todo.dataset.id; //需要编辑的todo id
              Tool.delTodo(todo_list, todo_id,this);
              break;
            default:
              break;
          }
        },()=>{

        });
      }
    }
  },
  methods: {
    launch(e) {
      var h=e.target.parentNode.lastChild.children.length*2.5+'rem';
      let height =
        this.GetCurrentStyle(e.target.parentNode.lastChild, "height") == "0px"
          ? h
          : "0px";
      e.target.parentNode.lastChild.style.height = height;
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
    },
    get_recently_add() {
      //获取最近添加的todo列表并返回，注意：不是全部的todo列表，只有三条数据
      var recently_add_todo = [];
      if (localStorage.getItem("Agency_todo")) {
        var Agency_todo = localStorage.getItem("Agency_todo").split("|");
        for (var i = Agency_todo.length - 2, j = 0; i >= 0; i--, j++) {
          if (i <= Agency_todo.length - 5) {
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
      //获取最近完成的todo列表并返回，注意：不是全部的todo列表，只有三条数据
      var recently_fin_todo = [];
      if (localStorage.getItem("Finish_todo")) {
        var Finish_todo = localStorage.getItem("Finish_todo").split("|");
        for (var i = Finish_todo.length - 2, j = 0; i >= 0; i--, j++) {
          if (i <= Finish_todo.length - 5) {
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
          if (i <= Del_todo.length - 5) {
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
    },
    addTodo(todo) {
      //添加代办todo
      var oldTodo =
        localStorage.getItem("Agency_todo") == null
          ? ""
          : localStorage.getItem("Agency_todo");
      localStorage.setItem("Agency_todo", oldTodo + todo + "|");
      this.recently_add_todo = this.get_recently_add();
    },
  },
  computed: {},
  activated(){
    this.recently_add_todo=this.get_recently_add();
    this.recently_fin_todo=this.get_recently_fin();
    this.recently_del_todo=this.get_recently_del();
  }
};
</script>

<style>
.top_title {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  width: 100%;
  height: 5rem;
  background-color: orange;
  color: #eee;
  line-height: 5rem;
  letter-spacing: 0.2rem;
  text-align: center;
}
.container {
  user-select: none;
  position: absolute;
  top: 5rem;
  bottom: 3.5rem;
  width: 100%;
  background-color: wheat;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

.container::-webkit-scrollbar {
  width: 0rem;
  height: 1rem;
}

.container::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 1080px) {
  .recently_todo_list > div {
    margin-bottom: 1rem;
  }
  .top_title {
    font-size: 1.3rem;
  }
  .entry_text {
    margin-top: 3.5rem;
    margin-bottom: 2rem;
    width: 65%;
    height: 2.5rem;
    font-size: 0.8rem !important;
  }
  .recently_todo_list > div > img {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.2rem;
  }
  .recently_todo_list > div > span {
    font-size: 0.8rem;
    line-height: 2.5rem;
    padding: 0.2rem;
  }
  .recently_todo_list > div > ul {
    margin-top: 0.7rem;
    top: 2.9rem;
  }

  .recently_todo_list > div > ul li {
    font-size: 0.9rem;
  }
}

@media (min-width: 1080px) {
  .recently_todo_list > div {
    margin-bottom: 2rem;
  }
  .top_title {
    font-size: 1.5rem;
  }
  .entry_text {
    margin-top: 5rem;
    margin-bottom: 3rem;
    width: 50%;
    height: 3rem;
    font-size: 1.5rem;
  }
  .recently_todo_list > div > img {
    width: 3.5rem;
    height: 3.5rem;
    padding: 0.6rem;
  }
  .recently_todo_list > div > span {
    font-size: 1.2rem;
    line-height: 3.5rem;
    padding: 0.6rem;
  }
  .recently_todo_list > div > ul li {
    font-size: 1rem;
  }
}

.entry_text {
  border: 1px solid #999;
  background-color: rgb(245, 222, 210);
  text-align: center;
}

.entry_text:focus {
  background-color: rgb(245, 222, 250);
}

.recently_todo_list {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.recently_todo_list > div {
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  justify-content: center;
}
.recently_todo_list > div > ul {
  opacity: 1;
  display: block;
  width: 100%;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  height: 0;
}

.recently_todo_list > div > ul a {
  text-decoration: none;
}

.recently_todo_list > div > ul li {
  width: 100%;
  height: 1.5rem;
  margin-bottom: 0.5rem;
  color: #666;
  background-color: darkorange;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0.2rem;
  line-height: 1.9rem;
  color: #fff;
}
</style>
