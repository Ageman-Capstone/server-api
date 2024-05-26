const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

class UserController {

  static async show(req, res) {
    const email = req.params.email;

    const result = await prisma.users.findUnique({
      where: {
        email: email
      },
    })


    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }

  }

}

module.exports = UserController;