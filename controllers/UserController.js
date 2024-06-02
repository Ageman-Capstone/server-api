const { PrismaClient, Prisma } = require('@prisma/client');
const { generateHash } = require('../helpers/bcrypt');
const { handlePrismaError } = require('../validators/prismaValidator');

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

  static async update(req, res, next)
  {
    const { email, password, fullname,url_gambar} = req.body;
    const id = req.params.id;
    let passwordHash = undefined;
    if(password){
      passwordHash = generateHash(password);
    }

    try {
      const results = await prisma.users.update({
        where: {
          id: parseInt(id),
        },
        data: {
          email: email,
          password: password ? passwordHash  : undefined, 
          fullname: fullname,
          photo: req.file ? url_gambar :  undefined,
        },
      });

      const user = await prisma.users.findUnique({
        where: { id: parseInt(id), },
      });

      return res.status(201).json({result:"success", message:"Success Update Data User", data: user});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async destroy(req, res,next){
    try {
      await prisma.users.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json({ message: 'Delete success' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;