// flashMiddleware.js

const flashMiddleware = (req, res, next) => {
  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  res.locals.warningMessage = req.flash("warning");
  res.locals.infoMessage = req.flash("info");
  next();
};

module.exports = flashMiddleware;
