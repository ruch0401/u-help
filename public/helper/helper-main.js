import { getDecodedUrlParams } from "../common/decode.js";

document.getElementById("test").addEventListener("click", (event) => {
  let url = document.location.href;
  let decodedUrlParams = getDecodedUrlParams(url);
  console.log(decodedUrlParams);
  document.getElementById("temp").innerHTML = JSON.stringify(decodedUrlParams);
});
