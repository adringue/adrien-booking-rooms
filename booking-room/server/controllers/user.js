const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose');
const config = require('../config');
const jwt = require('jsonwebtoken');


exports.auth = function (req, res) {
  const {
    email,
    password
  } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      errors: MongooseHelpers.normalizeErrors(err.errors)
    });
  }
  User.findOne({
    email: email
  }, function (err, result) {
    if (err) {
      return res.status(422).send({
        errors: MongooseHelpers.normalizeErrors(err.errors)
      });
    }
    if (!result) {

      const token = res.status(422).send({
        errors: [{
          title: 'Invalid User!',
          detail: 'User does not exist'
        }]
      });
      return res.json(token);
    }
    if (result.hasSamePassword(password)) {
      // return JWT token to the user
      const jwtSign = jwt.sign({
        userId: result._id,
        username: result.username
      }, config.SECRET, {
        expiresIn: '3h'
      });

      console.log(jwtSign);
      return res.json(jwtSign);
    } else {
      return res.status(422).send({
        errors: [{
          title: 'IWrong data!',
          detail: 'wrong email or password'
        }]
      });
    }
  });
};
exports.register = function (req, res) {
  const {
    username,
    email,
    password,
    passwordConfirmation
  } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      errors: [{
        title: 'Data missing!',
        detail: 'Provide email and password'
      }]
    });
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [{
        title: 'Invalid password!',
        detail: "password doesn't match confirmation password! "
      }]
    });
  }
  User.findOne({
    email: email
  }, function (err, result) {
    if (err) {
      return res.status(422).send({
        errors: MongooseHelpers.normalizeErrors(err.errors)
      });
    }
    if (result) {
      return res.status(422).send({
        errors: [{
          title: 'Invalid email!',
          detail: "User with this email already exist!"
        }]
      });
    }
    const user = new User({
      username,
      email,
      password
    });
    user.save(function (err) {
      if (err) {
        return res.status(422).send({
          errors: MongooseHelpers.normalizeErrors(err.errors)
        });
      }
      return res.json({
        'registered': 'true'
      });
    })
  })
};
exports.authMiddleware = function (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, function (err, user) {
      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(err.errors)
        });
      }
      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    })
  } else {
    return notAuthorized(res);
  }

}

function parseToken(token) {
  // token format here is "Bearer tokenitself", we need to split this string to get tokenitself
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(response) {
  response.status(401).send({
    errors: [{
      title: 'Not authorized!',
      detail: "you need to login to get access!"
    }]
  });
}
