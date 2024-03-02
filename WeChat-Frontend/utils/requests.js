import {showError} from '@/utils/messages';
import {tabAndRefresh} from '@/utils/switchpage';
const request = (options) => {
  return new Promise((resolve, reject) => {
    return wx.request({
      url: options.url,
      method: options.method,
      data: options.data,
      header: options.header,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject(Error(res.data.message));
        }
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

const get = (url, data) => {
  return request({
    url: url,
    method: 'GET',
    data: data,
  })
}

const post = (url, data) => {
  return request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
  }).catch(err => {
    wx.hideLoading();
    console.error('请求失败', err);
    showError('网络请求失败');
  })
}

const postWithCookie = (url, data, store) => {
  let header = {
    'content-type': 'application/x-www-form-urlencoded',
    "cookie": store.data.authentication,
  }
  return request({
    url: url,
    method: 'POST',
    data: data,
    header: header,
  }).catch(err => {
    wx.hideLoading();
    console.error('请求失败', err);
    showError('网络请求失败');
  })
}

export const getStorage = (options) => {
  return new Promise((resolve, reject) => {
    return wx.getStorage({
      key: options.key, // 指定要获取的数据的 key
      encrypt: options.encrypt,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

export const getKey = () => {
  return getStorage({
    key: 'key',
    encrypt: true,
  }).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
    showError('未登录状态')
  })
}



export const update = (data) => {
  let url = 'https://zzyan.com/updata';
  return post(url, data).then(res => {
    //成功后跳转到index页面
    wx.hideLoading();
    console.log(res)
    tabAndRefresh('/pages/index/index')
  })
}

export const signin = (data, orderInfo) => {
  let url = 'https://zzyan.com/signin';
  return post(url, data).then(res => {
    wx.hideLoading();
      // 请求成功时的处理逻辑
      // console.log('请求成功', res.data);
      orderInfo.week = 1;
      orderInfo.authentication = res.cookies[0]
      wx.setStorage({
          key: "key",
          data: orderInfo,
          encrypt: true,
      })

      // 登陆成功后返回首页, 并刷新页面
      tabAndRefresh('/pages/index/index')
  })
}

export const getweekcoure = (data, weekreq, store) => {
  let url = `https://zzyan.com/getweekcoure/${weekreq}`;
  return postWithCookie(url, data, store).then(res => {
    console.log(res)
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
      return netlist;
  }).catch(err => {
    wx.hideLoading();
    console.log(err);
    // wx.clearStorage()
    return err;
  })

}

export const getOtherCourse = (data, store) => {
  let url = 'https://zzyan.com/getweekcoure/0';
  return postWithCookie(url, data, store).then(res => {
    // 成功获取到数据
    console.log(res.data)
    var netlist = new Array();
    if (res.data != null) {
        res.data.forEach((item) => {
            netlist.push({
                CourseContent: item.CourseContent,
                TeacherName: item.TeacherName,
                BeginWeek: item.BeginWeek,
                EndWeek: item.EndWeek,
            })
        })
    }
    return netlist;
  })
}

// wx.request({
//   // url: 'http://127.0.0.1:8080/getweekcoure/0' ,
//   url: 'https://zzyan.com/getweekcoure/0',
//   method: 'POST',
//   header: {
//       'content-type': 'application/x-www-form-urlencoded',
//       "cookie": res.data.authentication,
//   },
//   data: {
//       username: res.data.user,
//       password: res.data.password,
//       studentType: res.data.radio,
//   },
//   success: (res) => {
//       console.log(res)
//       if (res.statusCode == 200) {
//           // 成功获取到数据
//           console.log(res.data)
//           var netlist = new Array();
//           if (res.data != null) {
//               res.data.forEach((item) => {
//                   netlist.push({
//                       CourseContent: item.CourseContent,
//                       TeacherName: item.TeacherName,
//                       BeginWeek: item.BeginWeek,
//                       EndWeek: item.EndWeek,
//                   })
//               })
//           }
//           this.setData({
//               OtherCourses: netlist
//           })
//       }
//   },
// })


// 有时间和地点的课程
// wx.request({
//   // url: 'http://127.0.0.1:8080/getweekcoure/' + weekreq,
//   url: 'https://zzyan.com/getweekcoure/' + weekreq,
//   method: 'POST',
//   header: {
//       'content-type': 'application/x-www-form-urlencoded',
//       "cookie": res.data.authentication,
//   },
//   data: {
//       username: res.data.user,
//       password: res.data.password,
//       studentType: res.data.radio,
//   },
//   success: (res) => {
//       console.log(res)
//       if (res.statusCode == 200) {
//           // 成功获取到数据
//           // console.log("网络获取到的data: " + res.data);
//           var netlist = new Array();
//           if (res.data != null) {
//               res.data.forEach((item) => {
//                   netlist.push({
//                       xqj: item.WeekDay,
//                       skjc: item.NumberOfLessons,
//                       skcd: item.NumberOfLessonsLength,
//                       kcmc: item.CourseContent,
//                       CourseLocation: item.CourseLocation,
//                       teacher: item.TeacherName,
//                   })
//               })
//           }
//           this.setData({
//               selectedTypeIndex: weekreq - 1,
//               wlist: netlist
//           })
//       } else {
//           wx.showToast({
//               title: "试试清除缓存后重新登陆" + res.data.error,
//               icon: 'none',
//               duration: 1800
//           })
//       }
//       wx.hideLoading();
//   },
//   fail: (res) => {
//       wx.hideLoading();
//       wx.showToast({
//           title: "网络请求失败",
//           icon: 'none',
//           duration: 1800
//       })
//   },
// });
