const porfile = (req, res , postgres) => {
    const { id } = req.params;
    let found = false;
    postgres
      .select("*")
      .from("users")
      .where({
        id: id,
      })
      .then((user) => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("error getting user");
        }
      })
      .catch((err) => res.status(404).json("not found"));
  }
module.exports={
    handleProfile:porfile
}