export function getDecodedUrlParams(url) {
  var params = url.split("?")[1].split("&");
  var data = {};
  var tmp;

  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = decodeURIComponent(tmp[1]);
  }

  return data;
}
