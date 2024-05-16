class AuthController {
  static async login(req, res) {
   return res.status(201).send("oke masuk");
  }
}

module.exports = AuthController;