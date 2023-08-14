const image=(req, res , postgres) => {
    const { id } = req.body;
    postgres("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entres) => {
        if (entres.length) {
          res.json(entres[0].entries);
        } else {
          res.status(400).json("nothing here");
        }
      })
      .catch((err) => res.status(404).json("nothing here"));
  }
  module.exports={
    handleImage:image
  }