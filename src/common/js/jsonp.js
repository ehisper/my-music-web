import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((reslove, reject) => {
    originJSONP(url, option, (err, data)) => {
      if (!err) {
        reslove(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url= ''
  for(var k in data) {
    let value = data[i] !==undefined? data[k] : ''
    url += `&${k}=${encodeUrIComponent(value)}`
  }
  return url? url.substring(1) : ''
}