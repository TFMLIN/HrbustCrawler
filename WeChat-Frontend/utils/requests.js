const request = (options) => {
  return new Promise((resolve, reject) => {
    return wx.request({
      url: options.url,
      method: options.method,
      data: options.data,
      success: (res) => {
        resolve(res);
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
  })
}