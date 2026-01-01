import connectToMongoDB from '../connection/mongodbConnect.js';

const mongodb = await connectToMongoDB(
  process.env.URI_MONGODB,
  process.env.DB_NAME_MONGODB
);

const checkUser = async (req, res, next) => {
  const userHeaders = req.headers;
  const user = await mongodb.collection('users').findOne({
    username: userHeaders.username,
    password: userHeaders.password,
  });
  if (user !== null) {
    next();
  } else res.status(401).send('user not found');
};
export default checkUser;
