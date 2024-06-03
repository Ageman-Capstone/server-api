const { PrismaClient, Prisma, status } = require('@prisma/client');
const slugify = require('slugify');
const prisma = new PrismaClient();
const {handlePrismaError} =  require("../validators/prismaValidator");

class WorkshopController {

  static async list(req, res) {
    const query = req.query;

    const result = await prisma.workshop.findMany({
      where: {
        nama_workshop: {
          search: query.search?.split(' ').join(' | '),
        },
      },
      include: {
        paket: {
          select: {
            nama_paket: true,
            price: true,
          },
        },
        users: {
          select: {
            email: true,
            fullname: true,
          },
        },
      },
    })

    res.status(200).json(result);
  }

  static async show(req, res) {
    const id = parseInt(req.params.id);

    const result = await prisma.workshop.findUnique({
      where: {
        id: id
      },
      include: {
        paket: {
          select: {
            nama_paket: true,
            price: true,
          },
        },
        users: {
          select: {
            email: true,
            fullname: true,
          },
        },
      },
    })


    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  }

  static async create(req, res){
    // console.log('ada');
    const { paketId, userId, nama_workshop, nama_sanggar,alamat,email,phone,nama_pemilik,deskripsi,url_gambar,price,bukti_pembayaran } = req.body;
    try {
      const result = await prisma.workshop.create({
        data: {
          paketId:parseInt(paketId),
          userId:parseInt(userId),
          nama_workshop:nama_workshop,
          nama_sanggar:nama_sanggar,
          alamat:alamat,
          email:email,
          phone:phone,
          nama_pemilik:nama_pemilik,
          deskripsi:deskripsi,
          photo:url_gambar, //gambar  workshop
          price:parseInt(price),
          status:"pending",
          bukti_pembayaran:bukti_pembayaran
        },
      });
      return res.status(201).json({result:"success", message:"Success Create Data Workshop"});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async update(req, res){

    const { paketId, userId, nama_workshop, nama_sanggar,alamat,email,phone,nama_pemilik,deskripsi,url_gambar,price,bukti_pembayaran,status } = req.body;
    const id = req.params.id;

    try {
      const results = await prisma.workshop.update({
        where: {
          id: parseInt(id),
        },
        data: {
          paketId:parseInt(paketId) ? parseInt(paketId) : undefined,
          userId: parseInt(userId) ? parseInt(userId) : undefined,
          nama_workshop:nama_workshop ? nama_workshop: undefined ,
          nama_sanggar:nama_sanggar ? nama_sanggar: undefined ,
          alamat:alamat ? alamat: undefined ,
          email:email ? email: undefined ,
          phone:phone ? phone: undefined ,
          nama_pemilik:nama_pemilik ? nama_pemilik: undefined ,
          deskripsi:deskripsi ? deskripsi: undefined ,
          photo:url_gambar ? url_gambar: undefined , //gambar  workshop
          price: price ? parseInt(price): undefined ,
          status: status ? status : undefined,
          bukti_pembayaran:bukti_pembayaran ?  bukti_pembayaran  :  undefined
        },
      });

      return res.status(201).json({result:"success", message:"Success Update Data Workshop"});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async destroy(req, res) {
    const id = req.params.id;

    try {
      await prisma.workshop.delete({
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

module.exports = WorkshopController;