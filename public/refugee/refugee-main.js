import {addToExistingQueryParams, getDecodedUrlParams} from "../common/decode.js";
import {BASE_URL} from "../common/baseurl.js";


document
    .getElementById("refugee-house-help")
    .addEventListener("click", (event) => {
        document.location.href = `${BASE_URL}/refugee/refugee-listing.html?helpType=house`;
    });

$('#request-help').click(() => {
    const url = getDecodedUrlParams($(location).attr("href"));
    console.log(url);
    document.location.href = (`${BASE_URL}/refugee/request-help-form.html?email=${url.email}`);
})