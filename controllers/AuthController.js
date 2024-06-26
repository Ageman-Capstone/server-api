const { PrismaClient, Prisma } = require('@prisma/client');
const { decodeHash, generateHash } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { handlePrismaError } = require('../validators/prismaValidator');
const prisma = new PrismaClient();

class AuthController {

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await prisma.users.findUnique({
        where: { email },
      });

      if (user) {
        const isPasswordValid = decodeHash(password, user.password);

        if (isPasswordValid) {
          return res.status(200).json({
            user: {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              photo: user.photo,
              role: user.role,
            },
            token: generateToken({
              id: user.id,
              fullname: user.fullname,
              email: user.email,
              role: user.role,
            }),
          });
        } else {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        return res.status(404).json({ message: 'User not registered' });
      }
    } catch (error) {
      handlePrismaError(res, error);
    }
  }


  static async register(req, res) {
    const { email, fullname, password } = req.body;
    
    const passwordHash = generateHash(password);

    try {
      const result = await prisma.users.create({
        data: {
          email: email,
          fullname: fullname,
          password: passwordHash,
          photo: '',
        },
      });
      const { password, ...user } = result;
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }

  }

  static async logout(req, res) {
    const authorization = req.headers.authorization;

    if (authorization !== '') {
      req.headers.authorization = undefined;
      return res.status(401).json({ message: 'Logged Out' });
    }
  }

}

module.exports = AuthController;