import {getDecodedUrlParams} from "../common/decode.js";
import { BASE_URL } from "../common/baseurl.js";


document
    .getElementById("refugee-house-help")
    .addEventListener("click", (event) => {
        let currentParams = getDecodedUrlParams(document.location.href);
        currentParams.helpType = 'house';
        let queryParams = '';
        for (const [key, value] of Object.entries(currentParams)) {
            queryParams += `${key}=${value}&`
        }
        let finalQP = '';
        if (queryParams.slice(-1) === '&') {
            finalQP = queryParams.substring(0, queryParams.length - 1);
        }
        console.log(finalQP)
        let url = `${BASE_URL}/refugee/refugee-listing.html?${finalQP}`;
        document.location.href = url;
    });