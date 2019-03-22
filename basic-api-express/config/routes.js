module.exports = app => {
  app.route("/signup").post(app.api.user.save);
  app.route("/signin").post(app.api.auth.signin);
  app.route("/validateToken").post(app.api.auth.validateToken);

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)
    .get(app.api.user.get);

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.user.getById)
    .put(app.api.user.save);

  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .post(app.api.category.save)
    .get(app.api.category.get);

  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(app.api.category.save)
    .delete(app.api.category.remove);
};
