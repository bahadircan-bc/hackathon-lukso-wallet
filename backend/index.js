const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = 3000;

const allowedOrigins = ["localhost"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/redirect', (req, res) => {
  console.log(req.query.username)
  res.send(`<script>window.opener.postMessage('${
    req.query.username
  }', 'http://localhost:5173/signup_bahadir'); setTimeout(()=>{window.close()}, 5000);</script > `)
});

const redirect_uri =
  "https://4f73-212-2-212-152.ngrok-free.app/instagram/redirect/";
const client_id = "733675091956540";
const client_secret = "657242dc75c6b23bcd5d18e48839e13a";
const scope = "user_profile";
const response_type = "code";

app.get("/api/auth", (req, res) => {
  res.redirect(
    `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`
  );
});

app.get("/instagram/redirect", async (req, res) => {
  let access_token = "";
  let user_id = "";

  const postData = new URLSearchParams();
  postData.append("client_id", client_id);
  postData.append("client_secret", client_secret);
  postData.append("grant_type", "authorization_code");
  postData.append("redirect_uri", redirect_uri);
  postData.append("code", req.query.code);
  // console.log(req.params.code)
  // console.log('req: ', req)
  // console.log('req.params: ', req.quey)
  // console.log('req.params.code: ', req.params.code)
  axios
    .post("https://api.instagram.com/oauth/access_token", postData)
    .then((response) => {
      // console.log(response);
      // console.log(response.data.access_token);
      access_token = response.data.access_token;
      console.log("access_token: ", access_token);
      // console.log(response.data.user_id);
      user_id = response.data.user_id;
      console.log("user_id: ", user_id);

      axios
        .get(
          `https://graph.instagram.com/${user_id}?fields=username&access_token=${access_token}`
        )
        .then((response) => {
          // console.log(response);
          console.log("username: ", response.data.username);
          res.redirect('/redirect?username=' + response.data.username)
          // res.send(
          //   "You have been verified. This page is going to close in 5 seconds. <script>window.postMessage(`hello`, `http://localhost:5173/signup_bahadir`); setTimeout(()=>{window.close()}, 5000);</script > "
          // );
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    })
    .catch((error) => {
      console.log(error);
    });

  //fields=id,username&access_token={access-token}'
});

app.get("/login", (req, res) => {
  res.send("Login Page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// https://4f73-212-2-212-152.ngrok-free.app/?code=AQBy-aF-3dfrLZfUMAQ0JAVCUSRmko66hJoF11XtfrNeJ_LjY0Ss_JhYvjAjjX2WqAIZzFXXOgTy2s2QHQpH8BRBV7kiXHvZWfJ7Wptl0czt-SBFPGtqUBVbGDws-4n-WRm-xzfaIToG042gLCRmGyI0PL3DGfP8FaYkHY_oZiDFovNqeb6_w2h3_I0jk85Q-cp06fPKeDk_8-6g3B3lVLZlzPgvp9KzLMsJI2okgKrEcg#_

// https://l.instagram.com/?u=https%3A%2F%2F4f73-212-2-212-152.ngrok-free.app%2Finstagram%2Fredirect%2F%3Fcode%3DAQDLxLq_DI41PXziQRA5jFsPTeQ8MkMbb7avrILJmNiYpoiAG2fSegj23yrIhcbJ2_2C5tHO8aXOXi9kbDJXzREW70qoBWnjo8Mi_8Z8rYB5JYpeoj7ASqXE9ZRJj4KMMct2xm5NXmeM0kwrNcy3zIhbixKUVQIXJ1RRe_a1JJTImlmvtYSUNbScyjDWonYQw3doQQmDmkvFRerVkGp3KUWvANrcr43sTzPj0SoOl4mQ0A%23_&e=AT3rRoUC3i7v-EY9NqjpoDXY2RV6Zj-HVQ6jCJMm0zPtRMm6SNIpWat7aV-HCmYp4VKTCLr3D0JLXOTkNNRY5uv87_YwqmbOnmOdgg
