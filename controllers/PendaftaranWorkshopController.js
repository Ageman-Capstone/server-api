const { PrismaClient, Prisma } = require('@prisma/client');
const slugify = require('slugify');
const prisma = new PrismaClient();
const {handlePrismaError} =  require("../validators/prismaValidator");

class PendaftaranWorkshopController {

  static async list(req, res) {
    const query = req.query;

    const result = await prisma.pendaftaran_workshop.findMany({
      where: {
        nama: {
          search: query.search?.split(' ').join(' | '),
        },
      },
      include: {
        workshop: {
          select: {
            nama_workshop: true,
            nama_sanggar: true,
            alamat: true,
            email: true,
            phone: true,
            nama_pemilik: true,
            deskripsi: true,
            photo: true,
          },
        },
      },
    })

    res.status(200).json(result);
  }

  static async show(req, res) {
    const id = parseInt(req.params.id);

    const result = await prisma.pendaftaran_workshop.findUnique({
      where: {
        id: id
      },
      include: {
        workshop: {
          select: {
            nama_workshop: true,
            nama_sanggar: true,
            alamat: true,
            email: true,
            phone: true,
            nama_pemilik: true,
            deskripsi: true,
            photo: true,
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
    const { workshopId, nama, phone, email,umur,jenis_kelamin} = req.body;
    try {
      const result = await prisma.pendaftaran_workshop.create({
        data: {
          workshopId:parseInt(workshopId),
          nama:nama,
          email:email,
          phone:phone,
          umur:umur,
          jenis_kelamin:jenis_kelamin,
        },
      });
      return res.status(201).json({result:"success", message:"Success Create Daftar Pendaftaran Workshop"});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async update(req, res){

    const { workshopId, nama, phone, email,umur,jenis_kelamin} = req.body;
    const id = req.params.id;

    try {
      const results = await prisma.pendaftaran_workshop.update({
        where: {
          id: parseInt(id),
        },
        data: {
          workshopId: parseInt(workshopId) ? parseInt(workshopId) : undefined,
          nama:nama ? nama : undefined,
          email:email ? email : undefined,
          phone:phone ? phone : undefined,
          umur:umur ? umur : undefined,
          jenis_kelamin:jenis_kelamin ? jenis_kelamin : undefined,
        },
      });

      return res.status(201).json({result:"success", message:"Success Update Data Pendaftaran Workshop"});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async destroy(req, res) {
    const id = req.params.id;

    try {
      await prisma.pendaftaran_workshop.delete({
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

module.exports = PendaftaranWorkshopController;