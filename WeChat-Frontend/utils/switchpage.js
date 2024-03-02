export const tabAndRefresh = (url) => {
  wx.switchTab({
    url: url,
    success: () => {
      var page = getCurrentPages().pop();
      if (page == undefined || page == null) return;
      page.onLoad();
    },
    fail: (err) => {
      console.log(err);
    }
  })
}