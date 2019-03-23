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
      exitsOrError(article.content, "Conteúdo não informado.");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (article.id) {
      app
        .db("articles")
        .update(article)
        .where({ id: article.id })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    } else {
      app
        .db("articles")
        .insert(article)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err));
    }
  };

  const remove = (re, res) => {
      try{
          const rowsDeleted = await app.db("articles")
          .where({id: req.params.id}).del()
          notExistsOrError(rowsDeleted,"Artigo não encontrado.")
          res.status(204).send()
      }catch(msg){
          res.status(500).send(msg)
      }
  }


};
