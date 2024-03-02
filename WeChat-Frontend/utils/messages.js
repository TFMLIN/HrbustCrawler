export const showTost = (options) => {
  wx.showToast({
    title: options.title,
    icon: options.icon,
    duration: options.duration,
  })
}

export const showError = (title) => {
  showTost({
    title: title,
    icon: 'error',
    duration: 1800,
  })
}

export const loading = (title) => {
  wx.showLoading({
    title: title,
  })
}