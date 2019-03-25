const bcrypt = require("bcrypt-nodejs");

module.exports = app => {
  const { exitsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body };

    if (req.params.id) user.id = req.params.id;

    try {
      exitsOrError(user.name, "Nome não informado.");
      exitsOrError(user.email, "Email não informado.");
      exitsOrError(user.password, "Senha não informada.");
      exitsOrError(user.confirmPassword, "Confirmação de senha não informada.");
      equalsOrError(
        user.password,
        user.confirmPassword,
        "Senhas não conferem."
      );
      const userFromDB = await app
        .db("users")
        .where({ email: user.email })
        .first();
      if (!user.id) {
        notExistsOrError(userFromDB, "Usuário já cadastrado.");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  const get = (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .then(users => res.json(users))
      .catch(err => res.status(500).send(error));
  };

  const getById = (req, res) => {
    const id = req.params.id;
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .where({ id })
      .first()
      .then(user => res.json(user))
      .catch(err => res.status(500).send(error));
  };

  return { save, get, getById };
};
