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
              <li>1</li>
              <li>1</li>
              <li>我奥斯卡里堆满了我妈克里斯没处理完我哦爱死你了库存立刻马上没得嘛</li>
              <li>更多 ></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "todo",
  data() {
    return {
      recently_add_todo: this.get_recently_add(),
      recently_fin_todo: this.get_recently_fin(),
      a_li: 0,
      f_li: 0,
      d_li: 0,
      li: 0
    };
  },
  mounted() {
    var input = document.getElementsByTagName("input")[0];
    var li = document.getElementsByTagName("li");

    for (var i = 0; i < li.length; i++) {
      let todo = li[i];
      this.setEventListener(li[i], () => {
        switch (todo.dataset.type) {
          case "recently_add":
            var todo_list = this.get_Agency_todo();
            var todo_id = todo_list.length - 1 - todo.dataset.id; //需要编辑的todo id
            this.completeTodo(todo_list, todo_id);
            break;
          default:
            break;
        }
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
      this.setEventListener(input, () => {
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
              this.formatTime(d.getHours()) +
              ":" +
              this.formatTime(d.getMinutes()) +
              ":" +
              this.formatTime(d.getSeconds()); //设置新增代办todo开始时间
            var nowTodo = Input_Dom.value + ">" + nowTime; //用>做分隔，格式为：todo>开始时间
            this.addTodo(nowTodo);
            reslove(nowTodo);
          }).then(value => {
            Input_Dom.value = "";
          });
        }
      });
    } else {
    }
  },
  beforeUpdate() {
    var li = document.getElementsByTagName("li");
    var a_li = document.getElementsByTagName("ul")[0].children; //添加列表
    var f_li = document.getElementsByTagName("ul")[1].children; //完成列表
    var d_li = document.getElementsByTagName("ul")[2].children; //删除列表
    this.li = li.length;
    this.a_li = a_li.length;
    this.f_li = f_li.length;
    this.d_li = d_li.length;
  },
  updated() {
    var li = document.getElementsByTagName("li");
    var len = li.length - this.li;
    if (len > 0) {
      //增加了li元素，需要重新添加滑动监听
      var a_li = document.getElementsByTagName("ul")[0].children;
      var f_li = document.getElementsByTagName("ul")[1].children;
      var d_li = document.getElementsByTagName("ul")[2].children;
      if (this.a_li != 4) {
        let todo = a_li[this.a_li - 1];
        //重新添加滑动监听
        this.setEventListener(todo, () => {
          switch (todo.dataset.type) {
            case "recently_add":
              var todo_list = this.get_Agency_todo();
              var todo_id = todo_list.length - 1 - todo.dataset.id; //需要编辑的todo id
              this.completeTodo(todo_list, todo_id);
              break;
            default:
              break;
          }
        });
      }
    }
  },
  methods: {
    formatTime(time) {
      //时间格式化
      if (time < 10) {
        return "0" + time;
      }
      return "" + time;
    },
    setEventListener(dom, callback) {
      //为指定元素添加监听
      function GetSlideDirection(startX, startY, endX, endY) {
        var dy = startY - endY;
        var dx = endX - startX;
        var result = 0;
        //如果滑动距离太短
        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
          return result;
        }
        var angle = GetSlideAngle(dx, dy);
        if (angle >= -45 && angle < 45) {
          result = 4;
        } else if (angle >= 45 && angle < 135) {
          result = 1;
        } else if (angle >= -135 && angle < -45) {
          result = 2;
        } else if (
          (angle >= 135 && angle <= 180) ||
          (angle >= -180 && angle < -135)
        ) {
          result = 3;
        }
        return result;
      }
      function GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
      }
      //为指定Dom元素添加监听事件
      var startX, startY;
      dom.addEventListener(
        "touchstart",
        ev => {
          // ev.preventDefault();
          startX = ev.touches[0].pageX;
          startY = ev.touches[0].pageY;
        },
        false
      );
      dom.addEventListener(
        "touchend",
        ev => {
          // ev.preventDefault();
          var endX, endY;
          endX = ev.changedTouches[0].pageX;
          endY = ev.changedTouches[0].pageY;
          var direction = GetSlideDirection(startX, startY, endX, endY);
          //返回角度
          //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
          //滑动处理
          //判断客户端为PC还是移动端
          switch (direction) {
            case 0:
              break;
            case 1:
              // console.log("向上");
              break;
            case 2:
              // console.log("向下");
              break;
            case 3:
              // console.log("向左");
              break;
            case 4:
              callback();
              break;
            default:
          }
        },
        false
      );
    },
    launch(e) {
      let height =
        this.GetCurrentStyle(e.target.parentNode.lastChild, "height") == "0px"
          ? "10rem"
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
    get_Agency_todo() {
      //获取所有的代办事件，这里获取到的代办事件是按正常顺序获取的
      var Agency_todo_list = [];
      if (localStorage.getItem("Agency_todo")) {
        var Agency_todo = localStorage.getItem("Agency_todo").split("|");
        for (var i = 0, j = 0; i <= Agency_todo.length - 2; i++, j++) {
          var b = {};
          b.content = Agency_todo[i].split(">")[0];
          b.startTime = Agency_todo[i].split(">")[1];
          b.id = j;
          Agency_todo_list.push(b);
        }
      }
      return Agency_todo_list;
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
    addTodo(todo) {
      //添加代办todo
      var oldTodo =
        localStorage.getItem("Agency_todo") == null
          ? ""
          : localStorage.getItem("Agency_todo");
      localStorage.setItem("Agency_todo", oldTodo + todo + "|");
      this.recently_add_todo = this.get_recently_add();
    },
    completeTodo(todo_list, todo_id) {
      //完成待办todo
      var fin_todo =
        todo_list[todo_id].content + ">" + todo_list[todo_id].startTime;
      var d = new Date();
      var endTime =
        d.getFullYear() +
        "-" +
        (parseInt(d.getMonth()) + 1) +
        "-" +
        d.getDate() +
        " " +
        this.formatTime(d.getHours()) +
        ":" +
        this.formatTime(d.getMinutes()) +
        ":" +
        this.formatTime(d.getSeconds());
      fin_todo += ">" + endTime + "|"; //格式：todo + startTime + endTime
      var recently_fin = localStorage.getItem("Finish_todo");
      if (recently_fin) {
        recently_fin += fin_todo;
      } else {
        recently_fin = fin_todo;
      }
      localStorage.setItem("Finish_todo", recently_fin);
      this.recently_fin_todo = this.get_recently_fin();
      todo_list.splice(todo_id, 1);
      var str = "";
      for (var m = 0; m < todo_list.length; m++) {
        str += todo_list[m].content + ">" + todo_list[m].startTime + "|";
      }
      localStorage.setItem("Agency_todo", str);
      this.recently_add_todo = this.get_recently_add();
    }
  },
  computed: {}
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
  height: 10rem;
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
