const fs = require("fs");
const filePath = "./config/auth.json";

exports.getAuthJson = async (req, res, next) => {

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
};

exports.updateAuthJson = async (req, res, next) => {
  const newValue = req.body.value;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading file");
    } else {

      //check if format correct 
           
      fs.writeFile(filePath, JSON.stringify(newValue), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error writing file");
        } else {
          res.send("Data updated");
        }
      });

    }
  });
};
