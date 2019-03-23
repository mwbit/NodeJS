const admin = require("./admin");

module.exports = app => {
  app.route("/signup").post(app.api.user.save);
  app.route("/signin").post(app.api.auth.signin);
  app.route("/validateToken").post(app.api.auth.validateToken);

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)
    .get(admin(app.api.user.get));

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.user.getById)
    .put(app.api.user.save);

  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.category.save))
    .get(app.api.category.get);

  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(admin(app.api.category.save))
    .delete(admin(app.api.category.remove));

  app
    .route("/articles")
    .all(app.config.passport.authenticate())
    .post(admin(app.api.article.save))
    .get(app.api.article.get);

  app
    .route("/articles/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(admin(app.api.article.save))
    .delete(admin(app.api.article.remove));
};
