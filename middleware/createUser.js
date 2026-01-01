const check = async (req, res, next) => {
  const userBody = req.body;
  if (
    req.body &&
    userBody.username &&
    userBody.password &&
    typeof userBody.username === 'string' &&
    typeof userBody.password === 'string'
  ) {
    next();
  } else {
    res.status(401).send('Login error');
  }
};
export default check;
