const { PrismaClient, Prisma } = require('@prisma/client');
const slugify = require('slugify');
const prisma = new PrismaClient();
const {handlePrismaError} =  require("../validators/prismaValidator");

class TariController {

  static async list(req, res) {
    const query = req.query;

    const result = await prisma.tari.findMany({
      where: {
        nama_tari: {
          search: query.search?.split(' ').join(' | '),
        },
        asal_tari: query.asalTari,
      },
    })

    res.status(200).json(result);
  }

  static async show(req, res) {
    const slug = req.params.slug;

    const result = await prisma.tari.findUnique({
      where: {
        slug: slug
      },
    })


    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  }

  static async create(req, res){
    const { nama_tari, asal_tari, url_gambar,deskripsi,url_video } = req.body;
    try {
      const result = await prisma.tari.create({
        data: {
          nama_tari: nama_tari,
          asal_tari: asal_tari, 
          deskripsi: deskripsi,
          url_gambar:url_gambar ,
          url_video:url_video,
          slug:`${slugify(nama_tari, { lower: true })}`
        },
      });
      return res.status(201).json({result:"success", message:"Success Create Data Tari"});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async update(req, res){

    const { nama_tari, asal_tari, url_gambar,deskripsi,url_video } = req.body;
    const id = req.params.id;

    try {
      const results = await prisma.tari.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nama_tari: nama_tari ? nama_tari: undefined ,
          asal_tari: asal_tari ? asal_tari: undefined , 
          deskripsi: deskripsi ? deskripsi: undefined ,
          url_gambar:url_gambar ? url_gambar: undefined ,
          url_video:url_video ? url_video: undefined ,
          slug: nama_tari  ? `${slugify(nama_tari, { lower: true })}` : undefined 
        },
      });

      return res.status(201).json({result:"success", message:"Success Update Data Tari"});
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaError(res, error);
      }
    }
  }

  static async destroy(req, res) {
    const id = req.params.id;

    try {
      await prisma.tari.delete({
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

module.exports = TariController;