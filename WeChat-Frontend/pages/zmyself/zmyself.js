// pages/zmyself/zmyself.js
import {update, getKey} from '@/utils/requests'
import {showError, loading} from '@/utils/messages'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        buttonhidden: true,
        user: " ",
        studentType: " ",
    },

    // 跳转到登录页面
    getUserProfile: function () {
        wx.vibrateShort();
        wx.navigateTo({
            url: '/pages/zhuce/zhuce',
        })
    },

    // 拉取课程
    pullAllCoure: function () {
      wx.vibrateShort();
      getKey().then(res => {
        console.log(res);
        // 成功获取到数据
        loading('拉取中')
        this.pullFunc(res);
      }).catch(err => {
        console.log(err);
        showError('请检查是否登录')
      })
    },

    // 调用拉取课表的api
    pullFunc(res) {
      let data = {
        username: res.data.user,
        password: res.data.password,
        studentType: res.data.radio
      }
      update(data)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      getKey().then(res => {
        // 成功获取到数据
        console.log(res);
                
        var studentTypeTemp
        studentTypeTemp = res.data.radio === "1" ? '本科生' : '研究生';

        this.setData({
            buttonhidden: false,
            user: res.data.user,
            studentType: studentTypeTemp,
        })
      })
    },
})