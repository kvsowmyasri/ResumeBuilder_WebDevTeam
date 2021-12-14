const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const app = express();

const pdfTemplate = require("./documents");

const options = {
  height: "70cm",
  width: "50cm",
  timeout: "6000",
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST route for PDF generation....
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), options).toFile("Resume.pdf", (err) => {
    if (err) {
      console.log(err);
      res.send(Promise.reject());
    } else res.send(Promise.resolve());
  });
});

// GET route -> send generated PDF to client...
app.get("/fetch-pdf", (req, res) => {
  const file = `${__dirname}/Resume.pdf`;
  res.download(file);
});

const request = require("request");

// Get Token for Skill Suggestion
app.get("/token", function (req, res) {
  request.post(
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: `https://auth.emsicloud.com/connect/token`,
      form: {
        grant_type: "client_credentials",
        client_id: "gt3urc7jhw43j81b",
        client_secret: "y83KG4I4",
        scope: "emsi_open",
      },
    },
    function (err, resp, json) {
      const result = JSON.parse(json);
      console.log(result.access_token);
      res.cookie("token", result.access_token, { expire: new Date() + 9999 });
      return res.send({
        access_token: result.access_token,
        expires_on: result.expires_in,
      });
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
