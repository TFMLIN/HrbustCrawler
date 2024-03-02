// pages/zhuce/zhuce.js
import {signin} from '@/utils/requests';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [
            { value: '1', name: '本科生', checked: 'true' },
            { value: '2', name: '研究生' },
        ]
    },

    // 研究生, 本科生单选框
    radioChange(e) {
        wx.vibrateShort()
        console.log('radio发生change事件，携带value值为：', e.detail.value)

        const items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
            items[i].checked = items[i].value === e.detail.value
        }

        this.setData({
            items
        })
    },

    // 表单提交
    submit: function (e) {
        wx.vibrateShort()
        var orderInfo = e.detail.value
        if (String(orderInfo.password).length < 6 || String(orderInfo.user).length < 6 || !(orderInfo.radio)){
            wx.showToast({
                title: '请检查表单是否填写正确',
                icon: 'none',
                duration: 1800
            })
            return
        }
        wx.showLoading({
            title: '请求中...',
        })
        signin({
          username: orderInfo.user,
          password: orderInfo.password,
          studentType: orderInfo.radio,
        }, orderInfo)
    },
})