import { BASE_URL } from "./common/baseurl.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();
});

document.getElementById("login-button").addEventListener("click", (event) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result.user.email);
      const db = firebase.firestore();
      const users = db.collection("users");
      const query = users.where("email", "==", result.user.email);
      query.get().then((users) => {
        users.forEach((user) => {
          let data = user.data();
          let url = "";
          if (data.isHelper) {
            url = `${BASE_URL}/helper/helper-main.html?email=${encodeURIComponent(
              data.email
            )}`;
          } else {
            url = `${BASE_URL}/refugee/refugee-main.html?email=${encodeURIComponent(
              data.email
            )}`;
          }
          document.location.href = url;
        });
      });
    })
    .catch(console.log);
});
