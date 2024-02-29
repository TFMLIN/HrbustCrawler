// pages/zhuce/zhuce.js
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
        wx.request({
            //   url: 'http://127.0.0.1:8080/signin',
            url: 'https://zzyan.com/signin',
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                username: orderInfo.user,
                password: orderInfo.password,
                studentType: orderInfo.radio,
            },
            success: function (res) {
                wx.hideLoading();
                // 请求成功时的处理逻辑
                // console.log('请求成功', res.data);
                if (res.data.status == "error") {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 1800
                    })
                } else if (res.data.status == "success") {
                    console.log("登陆成功");
                    console.log('请求成功', res);
                    orderInfo.week = 1;
                    orderInfo.authentication = res.cookies[0]
                    wx.setStorage({
                        key: "key",
                        data: orderInfo,
                        encrypt: true,
                    })

                    // 登陆成功后返回上一页, 并刷新页面
                    wx.navigateBack({
                        delta: 1,
                        success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                        }
                        
                    })
                    // 跳转后刷新页面
                    // wx.switchTab({
                    //     url: '/pages/zmyself/zmyself',
                    //     success: function(){
                    //         wx.showToast({
                    //           title: '登陆成功',
                    //           icon: 'success',
                    //           duration: 2000
                    //         })
                    //       }
                    //   })
                }
            },
            fail: function (err) {
                wx.hideLoading();
                // 请求失败时的处理逻辑
                console.error('请求失败', err);
                wx.showToast({
                    title: "网络请求失败",
                    icon: 'none',
                    duration: 1800
                })
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})