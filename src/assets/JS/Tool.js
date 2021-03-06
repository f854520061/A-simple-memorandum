const Tool = {
    show_confirm(str, cancel_callback, ok_callback) {
        //弹窗事件
        //同时只会弹出一个框
        if (!document.getElementsByClassName('confirm')[0]) {
            var confirm = document.createElement('div');//提示框
            var info = document.createElement('p');//提示信息
            var oper_div = document.createElement('div');//操作框样式
            var cancel_div = document.createElement('div');//取消按钮
            var ok_div = document.createElement('div');//确认按钮
            var body = document.getElementsByTagName('body')[0];
            /*
            提示信息样式
            */
            info.innerHTML = str;
            info.style.textAlign = 'center';
            info.style.letterSpacing = "0.2rem";
            info.style.marginBottom = '5vh';

            /*
            操作框样式
            */
            oper_div.style.display = 'flex';
            oper_div.style.justifyContent = 'space-around';
            oper_div.style.width = '100%';

            /*
            取消按钮样式
            */
            cancel_div.style.width = '15vw';
            cancel_div.style.height = "5vh";
            cancel_div.innerHTML = '取消';
            cancel_div.style.backgroundColor = '#eee';
            cancel_div.style.textAlign = 'center';
            cancel_div.style.lineHeight = '5vh';

            /*
            确认按钮样式
            */
            ok_div.style.width = '15vw';
            ok_div.style.height = "5vh";
            ok_div.innerHTML = '确认';
            ok_div.style.backgroundColor = '#9ACD32';
            ok_div.style.color = '#fff';
            ok_div.style.textAlign = 'center';
            ok_div.style.lineHeight = '5vh';

            cancel_div.onclick = function () {
                cancel_callback();
                body.removeChild(document.getElementsByClassName('confirm')[0]);
            }

            ok_div.onclick = function () {
                ok_callback();
                body.removeChild(document.getElementsByClassName('confirm')[0]);
            }



            /*
            提示框样式
            */
            confirm.style.width = '70vw';
            confirm.style.height = 'auto';
            confirm.style.backgroundColor = '#ccc';
            confirm.style.position = 'absolute';
            confirm.style.top = '40vh';
            confirm.style.left = '15vw';
            confirm.style.padding = '1.5rem';
            confirm.style.boxSizing = 'border-box';
            confirm.className = 'confirm';
            oper_div.appendChild(cancel_div);
            oper_div.appendChild(ok_div);
            confirm.appendChild(info);
            confirm.appendChild(oper_div);
            body.appendChild(confirm);
        }
    },
    del_confirm() {
        if (document.getElementsByClassName('confirm')[0]) {
            var body = document.getElementsByTagName('body')[0];
            body.removeChild(document.getElementsByClassName('confirm')[0]);
        }
    },
    formatTodo(arr) {
        //将数组转化为存储数据字符串
        var str = "";
        if (arr.length) {
            for (var i = 0; i <= arr.length - 1; i++) {
                str +=
                    (arr[i].content ? (arr[i].content + ">") : "") +
                    (arr[i].startTime ? arr[i].startTime : "") +
                    (arr[i].endTime ? (">" + arr[i].endTime) : "") +
                    "|";
            }
        }
        return str;
    },
    formatTime(time) {
        //时间格式化
        if (time < 10) {
            return "0" + time;
        }
        return "" + time;
    },
    getKey(name) {
        //获取URL上的参数
        var reg = new RegExp("(^|&|\\?)" + name + "=([^&|\\?]*)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    get_Agency_todo() {
        //获取所有的代办事件，这里获取到的代办事件是按正常顺序获取的
        var Agency_todo_list = [];
        if (localStorage.getItem("Agency_todo")) {
            var Agency_todo = localStorage.getItem("Agency_todo").split("|");
            for (var i = 0, j = 0; i <= Agency_todo.length - 2; i++ , j++) {
                var b = {};
                b.content = Agency_todo[i].split(">")[0];
                b.startTime = Agency_todo[i].split(">")[1];
                b.id = j;
                Agency_todo_list.push(b);
            }
        }
        return Agency_todo_list;
    },
    get_Finish_todo() {
        var recently_fin_todo = [];
        if (localStorage.getItem("Finish_todo")) {
            var Finish_todo = localStorage.getItem("Finish_todo").split("|");
            for (var i = 0, j = 0; i <= Finish_todo.length - 2; i++ , j++) {
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
    get_del_todo() {
        //获取最近删除的todo列表并返回
        var del_todo = [];
        if (localStorage.getItem("Del_todo")) {
            var Del_todo = localStorage.getItem("Del_todo").split("|");
            for (var i = 0, j = 0; i <= Del_todo.length - 2; i++ , j++) {
                var a = {};
                a.content = Del_todo[i].split(">")[0];
                a.startTime = Del_todo[i].split(">")[1];
                a.endTime = Del_todo[i].split(">")[2];
                a.id = j;
                del_todo.push(a);
            }
        }
        return del_todo;
    },
    complateTodo(todo_list, todo_id, self) {
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
            Tool.formatTime(d.getHours()) +
            ":" +
            Tool.formatTime(d.getMinutes()) +
            ":" +
            Tool.formatTime(d.getSeconds());
        fin_todo += ">" + endTime + "|"; //格式：todo + startTime + endTime
        var recently_fin = localStorage.getItem("Finish_todo");
        if (recently_fin) {
            recently_fin += fin_todo;
        } else {
            recently_fin = fin_todo;
        }
        localStorage.setItem("Finish_todo", recently_fin);
        todo_list.splice(todo_id, 1);
        var str = "";
        for (var m = 0; m < todo_list.length; m++) {
            str += todo_list[m].content + ">" + todo_list[m].startTime + "|";
        }
        localStorage.setItem("Agency_todo", str);
        self.recently_fin_todo = self.get_recently_fin();
        self.recently_add_todo = self.get_recently_add();
    },
    delTodo(todo_list, todo_id, self) {
        //删除todo
        var del_todo =
            todo_list[todo_id].content +
            ">" +
            todo_list[todo_id].startTime +
            ">" +
            (todo_list[todo_id].endTime ? todo_list[todo_id].endTime : "") +
            "|";
        var recently_del = localStorage.getItem("Del_todo");
        if (recently_del) {
            recently_del += del_todo;
        } else {
            recently_del = del_todo;
        }
        var arr = recently_del.split('>');
        if (arr.length > 11) {
            var d = recently_del.substring(0, recently_del.indexOf('|') + 1);
            recently_del = recently_del.replace(d, '');
        }
        localStorage.setItem("Del_todo", recently_del);
        todo_list.splice(todo_id, 1);
        var str = "";
        for (var m = 0; m < todo_list.length; m++) {
            str +=
                todo_list[m].content +
                ">" +
                todo_list[m].startTime +
                ">" +
                todo_list[m].endTime +
                "|";
        }
        localStorage.setItem("Finish_todo", str);
        self.recently_del_todo = self.get_recently_del();
        self.recently_fin_todo = self.get_recently_fin();
    },
    setEventListener(dom, type, right_callback, left_callback) {
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
                        left_callback();
                        // console.log("向左");
                        break;
                    case 4:
                        right_callback();
                        break;
                    default:
                }
            },
            false
        );
    },
}
module.exports = Tool;