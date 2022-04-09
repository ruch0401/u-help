import {addToExistingQueryParams, getDecodedUrlParams} from "../common/decode.js";
import {BASE_URL} from "../common/baseurl.js";


document
    .getElementById("refugee-house-help")
    .addEventListener("click", (event) => {
        document.location.href = `${BASE_URL}/refugee/refugee-listing.html?helpType=house`;
    });

$('#fill-profile').click(() => {
    const url = getDecodedUrlParams($(location).attr("href"));
    console.log(url);
    document.location.href = (`${BASE_URL}/common/profile.html?email=${url.email}`);
})