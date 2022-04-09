export function getDecodedUrlParams(url) {
  let params = url.split("?")[1].split("&");
  let data = {};
  let tmp;

  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = decodeURIComponent(tmp[1]);
  }

  return data;
}


export function addToExistingQueryParams(url, key, value) {
  let currentParams = getDecodedUrlParams(url);
  currentParams[key] = value;
  let queryParams = '';
  for (const [k, v] of Object.entries(currentParams)) {
    queryParams += `${k}=${v}&`
  }
  let finalQP = '';
  if (queryParams.slice(-1) === '&') {
    finalQP = queryParams.substring(0, queryParams.length - 1);
  }
  return finalQP;
}

