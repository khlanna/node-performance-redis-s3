const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");
const requireLogin = require("../middlewares/requireLogin");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: "us-west-2",
});

module.exports = (app) => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    const params = {
      Bucket: "my-blog-bucket",
      ContentType: "image/jpeg",
      Key: key,
    };
    s3.getSignedUrl("putObject", params, (err, url) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.send({ url, key });
    });
  });
};
