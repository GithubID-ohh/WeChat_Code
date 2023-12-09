// index.js
// 获取应用实例
const app = getApp();
import mqtt from "../../utils/mqtt.min";
const MQTTADDRESS = "你的mqtt服务器地址"; //mqtt服务器地址
let client = null; //mqtt服务

Page({
  data: {
    //定义标题数据
    title:'ESP功率计小程序端开发',
    welcome:"欢迎回家",
    location:'四川省 南充市',
    temperature:15,

    isConnect:false,//连接状态
  },
  onLoad(){

  },
  connectMqtt(){
    let that = this;
        const options = {
          connectTimeout: 4000,
          address: this.data.address,//输入的地址
          port: this.data.port, //输入的端口号
          username: this.data.username,//输入的用户名
          password: this.data.password,//输入的密码
        };
    
        console.log("address是：", options.address);
        client = mqtt.connect(MQTTADDRESS, options); //连接
        client.on("connect", (e) => {
          console.log('连接成功');
        })
    
        client.on("reconnect", (error) => {
          console.log("正在重连：", error);
          wx.showToast({
            icon: "none",
            title: "正在重连",
          });
        });
        client.on("error", (error) => {
          console.log("连接失败：", error);
          wx.showToast({
            icon: "none",
            title: "mqtt连接失败",
          });
        });
    },
})
