module.exports = app => {
  const { exitsOrError, notExistsOrError } = app.api.validation;

  const save = (req, res) => {
    const article = { ...req.body };

    if (req.params.id) article.id = req.params.id;

    try {
      exitsOrError(article.name, "Artigo não informado.");
      exitsOrError(article.description, "Descrição não informada.");
      exitsOrError(article.categoryId, "Categoria não informada.");
      exitsOrError(article.userId, "Usuário não informado.");
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };
};
