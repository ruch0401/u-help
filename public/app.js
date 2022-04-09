document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();
});

function login() {
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
          data = user.data();
          if (data.isHelper) {
              url = `http://localhost:5002/helper-main.html?email=${encodeURIComponent(data.email)}`
          } else {
              url = `http://localhost:5002/refugee-main.html?email=${encodeURIComponent(data.email)}`
          }
          document.location.href = url;
        });
      });
    })
    .catch(console.log);
}