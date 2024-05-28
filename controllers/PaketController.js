const { PrismaClient, Prisma } = require('@prisma/client');
const slugify = require('slugify');
const prisma = new PrismaClient();
const {handlePrismaError} =  require("../validators/prismaValidator");

class PaketController {

  static async list(req, res) {
    const query = req.query;

    const result = await prisma.paket.findMany({
      where: {
        paket: {
          search: query.search?.split(' ').join(' | '),
        },
      },
    })

    res.status(200).json(result);
  }

  static async show(req, res) {
    const id = parseInt(req.params.id);

    const result = await prisma.paket.findUnique({
      where: {
        id: id
      },
    })


    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  }

  static async create(req, res){
    const { nama_paket, price} = req.body;
    try {
      const result = await prisma.paket.create({
        data: {
          nama_paket: nama_paket,
          price: parseInt(price), 
        },
      });
      return res.status(201).json({result:"success", message:"Success Create Data Paket"});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async update(req, res){

    const { nama_paket, price} = req.body;
    const id = req.params.id;

    try {
      const results = await prisma.paket.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nama_paket: nama_paket,
          price: parseInt(price), 
        },
      });

      return res.status(201).json({result:"success", message:"Success Update Data Paket"});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async destroy(req, res) {
    const id = req.params.id;

    try {
      await prisma.paket.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json({result:"success",message: 'Delete success' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

}

module.exports = PaketController;