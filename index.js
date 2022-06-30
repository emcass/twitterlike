const f_app = require("firebase/app");
const f_auth = require("firebase/auth");

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

///////////////////////////////////////////////////
///////////////////////////////////////////////////
// FIREBASE
///////////////////////////////////////////////////
///////////////////////////////////////////////////

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTbqEkVn649XQ2LKItu_CB-tPtGf8lyEE",
  authDomain: "jtb-twitter.firebaseapp.com",
  projectId: "jtb-twitter",
  storageBucket: "jtb-twitter.appspot.com",
  messagingSenderId: "749905417581",
  appId: "1:749905417581:web:117a3f35c0d6b519a13664",
  measurementId: "G-91K902RQG5",
};

// Initialize Firebase
const firebaseapp = f_app.initializeApp(firebaseConfig);

const auth = f_auth.getAuth(firebaseapp);

let loggedIn = auth != null;

app.get("/", function (req, res) {
  if (loggedIn) {
    res.render("home", {});
  } else {
    res.redirect("/signup");
  }
});

app.get("/profile", function (req, res) {
  if (loggedIn) {
    res.render("profile", {});
  } else {
    res.redirect("/signup");
  }
});

app.get("/signup", function (req, res) {
  if (loggedIn) {
    res.redirect("/");
  } else {
    res.render("signup", {});
  }
});

app.get("/login", function (req, res) {
  if (loggedIn) {
    res.redirect("/");
  } else {
    res.render("login", {});
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);

  await f_auth
    .createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(function (user) {
      console.log("User created successfully");
      loggedIn = true;
      res.redirect("/");
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("login", async (req, res) => {
  await f_auth
    .signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(function (user) {
      console.log("User signed in successfully");
      loggedIn = true;
      res.redirect("/");
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
