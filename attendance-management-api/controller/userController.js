const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.getAlluser = async (req, res, next) => {
  try {
    const [user, _] = await User.findAll();
    res.status(200).json({ count: user.length, user });

  } catch (error) {
    next(error);
  }
};

exports.regitster = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    if (!(username && email && password)) {
      await res.status(400).send("All input is required");
    }

    let [checkemail, _] = await User.findByUsernameOrEmail(username, email);

    if (checkemail != 'undefined') {
      if (checkemail.length != 0) {
        return res.status(409).send("Email or Username Already Exist. Please change email");
      }
    }

    // //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);
    let user = new User(username, email, encryptedPassword);


    user = await user.save();
    res.status(201).json({ message: "User created" });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.changepassword = async (req, res, next) => {
  try {
    let { email, old_password, new_password } = req.body;

    if (!(email && old_password && new_password)) {
      await res.status(400).send("All input is required");
    }

    let [checkemail, _] = await User.findByUsernameOrEmail(email, email);

    if (checkemail != 'undefined') {
      if (checkemail.length == 0) {
        return res.status(409).send("Email or Username not found");
      }
    }

    bcrypt.compare(old_password, checkemail[0].password, async (err, isMatch) => {
      if (err) {
        console.log(err);
      } else if (isMatch) {
        let encryptedPassword = await bcrypt.hash(new_password, 10);
        await User.change_password(email, encryptedPassword);
        res.status(201).json({ message: "Change password success", status: 'success' });
      } else {
        console.log("error password wrong step2");
        console.log('Passwords do not match!');
        res.status(201).json({ status: 'notmatch' });
      }
    });


  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.update_user = async (req, res, next) => {
  try {
    let user_id = req.params.id;
    let { username, email } = req.body;
    if (!(username && email)) {
      await res.status(400).send("All input is required");
    }

    let [checkemail, _] = await User.findByUsernameOrEmail(username, email);

    if (checkemail.length > 1) {
      return res.status(409).send("Email or Username Already Exist. Please change email");
    }

    let user = new User(username, email, '');
    user = await user.editUser(user_id);
    res.status(201).json({ message: "User updated" });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletUserById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await User.DeletebyId(id);

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //if error login check database password set text not varchar
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    var username = email;

    let [user, _] = await User.findByUsernameOrEmail(username, email);

    const comparepassword = await bcrypt.compare(password, user[0].password);
    if (user.length > 0 && comparepassword) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "8h" }
      );
      // user
      res.status(200).json({ user: user, token: token });
    } else {
      res.status(400).send("Invalid Credentials");
    }

  } catch (error) {
    next(error);
  }
};


