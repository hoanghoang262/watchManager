const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

export default isAdmin;
