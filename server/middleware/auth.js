import jwt from 'jsonwebtoken';

// Wants to like a post.
// Click the like button ==> auth middleware (next) ==> like controller...

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;    // True if token.length is below 500. If equal to or greater than 500, it is a Google Auth.

    let decodedData;

    if(token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');  // 'test' is the secret, has to be the same as what we used in controllers/user.js.

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();     // Says to do something after running this code. Thus, the name 'middleware'.

  } catch (error) {
    console.log(error);
  }
}

export default auth;