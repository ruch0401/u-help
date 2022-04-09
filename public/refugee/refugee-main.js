import {addToExistingQueryParams} from "../common/decode.js";
import {BASE_URL} from "../common/baseurl.js";


document
    .getElementById("refugee-house-help")
    .addEventListener("click", (event) => {
        document.location.href = `${BASE_URL}/refugee/refugee-listing.html?helpType=house`;
    });