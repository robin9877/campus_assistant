var requests = require('requests.js');
var util = require('util.js');
class DB{
  constructor(self){
    this.that = self;
  }
  //读取所有课程
  get_all_courses(){
    var data = wx.getStorageSync('timetable');
    this.that.setData({
      courses:data
    })
  }
  //选取该周课程
  get_timetable(){
    var data = wx.getStorageSync('timetable');
    if(!data){
      requests = require('requests.js');
      requests.load();
      requests.get_courses(this.that);
    }
    var week = this.get_week();
    console.log('获取第'+week+'周的课表')
    var weeks;
    var courses = [];
    for(var key in data){
      weeks = data[key].weeks
      for(var i in weeks)
        if(weeks[i] == week){
          courses.push(data[key])
        }
    }
    console.log(courses);
    this.that.setData({
      courses: courses,
      week: week
    })
  }
  //设置课表缓存
  set_storage(data){
    console.log('设置缓存');
    wx.setStorageSync('timetable', data)
  }
  //设置当前周
  set_week(week){
    wx.setStorageSync('week', week);
    console.log(this.weekOfYear());
    wx.setStorageSync('weekOfYear', this.weekOfYear());
  }
  //获取当前周
  get_week(){
    var data = wx.getStorageSync('week');
    var day = wx.getStorageSync('day');
    var yesterday = wx.getStorageSync('yesterday');
    if (!data) {
      data = 1;
      this.set_week(1);
    }
    if(wx.getStorageSync('weekOfYear')<this.weekOfYear()){
      data += 1;
      this.set_week(data);
    }
    return data;
  }
  add_courses(value){
    var data = wx.getStorageSync('timetable');
    console.log(data);
    if(!data)
      data = [];
    data.push(value);
    this.set_storage(data);
  }
  load_dormitory(){
    var multiIndex = this.get_dormitory();
    var dormitory_array = [[],[],[]];
    for (let i = 1; i < 26; i++) {
      dormitory_array[0].push(i+'');
    }
    dormitory_array[1] = ['01','02','03','04','05','06'];
    for (let i = 1; i <= 26; i++) {
      if(i>9)
        dormitory_array[2][i - 1] = multiIndex[1]+1+''+i;
      else
        dormitory_array[2][i - 1] = multiIndex[1] + 1 + '' + 0 + i;                              
    }
    this.that.setData({
      multiIndex: multiIndex,
      dormitory_array: dormitory_array
    })
  }
  set_dormitory(value){
    wx.setStorage({
      key: 'dormitory',
      data: value,
    });
    wx.setStorage({
      key: 'dormitory',
      data: value,
    });
  }
  get_dormitory(){
    var value = wx.getStorageSync('dormitory');
    if(value)
      return value.multiIndex;
    else
      return [0,0,0];
  }
  weekOfYear(){
    var date = new Date();
    var week_year = util.weekOfYear(date.getFullYear(),date.getMonth()+1,date.getDate());
    return week_year;
  }
}
export{DB}