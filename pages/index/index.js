// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
   data: {
     inputValue:'',
     todos:[
     {name:"今天",status:true},
     {name:"有没有",status:false},
     {name:"事情",status:false},
     {name:"今天有没有事情",status:true},
     ],
     leftCount: 2,
     allchecked:false
   },

  // 获取输入的任务
  inputChangeHandle:function(e){

    this.setData({
      inputValue:e.detail.value
    })
  },

  addTodoHandle:function(){
   if(! this.data.inputValue) return;
   var todos = this.data.todos
   todos.push({
    name:this.data.inputValue,
    status:false
  })
   this.setData({
    todos:todos,
    inputValue:'',
    leftCount:this.data.leftCount + 1
  })
 },


  // 点击每一项切换完成状态
  toggleToDoHangle:function(e){
   var item =  this.data.todos[e.currentTarget.dataset.index] 
   item.status = !item.status
   var leftCount = this.data.leftCount + (item.status ? -1 : 1)
   this.setData({
    todos:this.data.todos,
    leftCount:leftCount })
 },
  //删除单项
  removeHandle:function(e){
   var todos =this.data.todos;
   var index= e.currentTarget.dataset.index
   var leftCount = this.data.leftCount + (todos[index].status ? 0 : -1)
   todos.splice(index,1)
   this.setData({
    todos:todos,
    leftCount:leftCount
  })
 },
  //切换所有的状态
  toggleAllHangle:function(){
   this.data.allchecked = ! this.data.allchecked
   var todos =this.data.todos
   todos.forEach( (item)=>{
    item.status = this.data.allchecked
  })
   this.setData({ todos : todos,leftCount: this.data.allchecked ? 0 : this.data.todos.length})
 },
// 删除已完成的任务
removeAllHandle:function(){
  var todos =this.data.todos.filter(item => !item.status )
  this.setData({
    todos:todos        
  })
},

onLoad:function(options){


  wx.request({
    url:'https://locally.uieee.com/slides',
    header:{
      'Content-Type':'json'  
    },
    success:function(res){
      console.log(res)
    }
  })
}


})