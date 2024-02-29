//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        type: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
        selectedTypeIndex: 0,
        wlist: [
            { "xqj": 1, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 1, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 3, "skjc": 4, "skcd": 1, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 3, "skjc": 8, "skcd": 1, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 3, "skjc": 5, "skcd": 2, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 4, "skjc": 2, "skcd": 3, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 4, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 5, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 6, "skjc": 3, "skcd": 2, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
            { "xqj": 7, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301", "CourseLocation": "教A-301", "teacher": "张三" },
        ]
    },
    identy: function (e, ...args) {
        wx.getStorage({
            key: 'key', // 指定要获取的数据的 key
            encrypt: true,
            success: (res) => {
                wx.showLoading({
                    title: '请求中...',
                })
                var weekreq
                if (args.length > 0) {
                    weekreq = args[0]
                }
                else {
                    weekreq = parseInt(e.detail.value, 10) + 1
                }
                console.log("weekreq : " + weekreq)
                // console.log(res.data.authentication)
                wx.request({
                    // url: 'http://127.0.0.1:8080/getweekcoure/' + weekreq,
                    url: 'https://zzyan.com/getweekcoure/' + weekreq,
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        "cookie": res.data.authentication,
                    },
                    data: {
                        username: res.data.user,
                        password: res.data.password,
                        studentType: res.data.radio,
                    },
                    success: (res) => {
                        console.log(res)
                        if (res.statusCode == 200) {
                            // 成功获取到数据
                            // console.log("网络获取到的data: " + res.data);
                            var netlist = new Array();
                            if (res.data != null) {
                                res.data.forEach((item) => {
                                    netlist.push({
                                        xqj: item.WeekDay,
                                        skjc: item.NumberOfLessons,
                                        skcd: item.NumberOfLessonsLength,
                                        kcmc: item.CourseContent,
                                        CourseLocation: item.CourseLocation,
                                        teacher: item.TeacherName,
                                    })
                                })
                            }
                            this.setData({
                                selectedTypeIndex: weekreq - 1,
                                wlist: netlist
                            })
                        } else {
                            wx.showToast({
                                title: "试试清除缓存后重新登陆" + res.data.error,
                                icon: 'none',
                                duration: 1800
                            })
                        }
                        wx.hideLoading();
                    },
                    fail: (res) => {
                        wx.hideLoading();
                        wx.showToast({
                            title: "网络请求失败",
                            icon: 'none',
                            duration: 1800
                        })
                    },
                })
            },
            fail: () => {
                // 未找到对应的 key 或获取失败
                console.log('获取数据失败');
                wx.showToast({
                    title: '请先登陆...',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },
    getCustomWeek(date, startDay) {
        // Copy date so don't modify original
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        // Adjust date to the specified start day of the week
        var diff = date.getDay() - startDay;
        if (diff < 0) {
            diff += 7;
        }
        date.setDate(date.getDate() - diff);
        // Get first day of year
        var yearStart = new Date(date.getFullYear(), 0, 1);
        // Calculate full weeks
        var weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
        return weekNo;
    },

    picker(e) {
        wx.vibrateShort();
        this.identy(e);
    },
    handlePickerTap: function () {
        // 触发震动
        wx.vibrateShort();
    },
    onLoad: function (e) {
        console.log('onLoad')

        var StartData = new Date(2024, 1, 7) //2月6日
        var currentDate = new Date();
        var gapday = parseInt((currentDate - StartData) / 86400000)
        var week = parseInt(gapday / 7)

        this.identy(e, week + 1);
    }
})
