const guardRouter = (req, res, next) => {
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }
  next();
};

module.exports = guardRouter;
