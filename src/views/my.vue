<template>
  <div>
      <div class="top_header">
          <img src="../assets/more.png" alt="设置">
          <div class="head">
              <img src="../assets/head.png" alt="你的头像">
              <span class="name">XZW</span>
          </div>
      </div>
      <ul class="todo_list">
          <li>待办任务</li>
          <li>已完成任务</li>
          <li>已删除任务</li>
          <li>最近添加任务</li>
          <li>最近完成任务</li>
          <li>最近删除任务</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'my',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  beforeRouteLeave(to,from,next){
    next()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top_header{
    width: 100%;
    height: 20rem;
    background-color: orange;
    display: flex;
    flex-direction: column;
}
.top_header>img{
    width: 2rem;
    height: 1.5rem;
    position: absolute;
    right: 0.4rem;
    top:0.5rem;
}
.top_header>.head{
    display: flex;
    flex-direction: column;
    width: 5rem;
    height: 5rem;
    margin: auto;
}
.top_header>.head>img{
    width: 5rem;
    height: 5rem;
}
.top_header>.head>.name{
    text-align: center;
}
.todo_list{
    width: 100%;
    height: auto;
    list-style: none;
    overflow: hidden;
    cursor: pointer;
}
.todo_list>li{
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    padding:0 0.5rem; 
    background-color:#eee;
    border-bottom:1px solid #ccc; 
    color: #333;
    letter-spacing: 0.1rem;
}
</style>
