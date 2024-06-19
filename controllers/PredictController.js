const { PrismaClient, Prisma } = require('@prisma/client');
const slugify = require('slugify');
const prisma = new PrismaClient();
const {handlePrismaError} =  require("../validators/prismaValidator");
const tfjs = require('@tensorflow/tfjs-node');

class PredictController {

  static async predict(req, res) {
    const img = req.file.buffer;
    if(req.file.size > 1000000){
      return res.status(413).send(
        {
          "status": "fail",
          "message": "Payload content length greater than maximum allowed: 1000000"
       });
    }

    try {
      const modelUrl = "https://storage.googleapis.com/ageman_bucket_1/models/model.json";
      const model = await tfjs.loadGraphModel(modelUrl);
      const tensor = tfjs.node
        .decodeJpeg(img)
        .resizeNearestNeighbor([150, 150])
        .expandDims()
        .toFloat()
        .div(tfjs.scalar(255.0));

      const predictions = model.predict(tensor);

      const classes = ['Baris','Barong','Condong',"Janger",'Kecak','Pendet_Penyambutan','Rejang_Sari'];
    
      const classResult = predictions.argMax(1).dataSync()[0];
      const score = predictions.dataSync();
      const confidenceScore = Math.max(...score) * 100; // Mengubah confidence score ke persen
      const label = classes[classResult];
     
      const data = {
        "result": label,
        "confidenceScore": confidenceScore,
      }

      // await simpanData.simpanPredict(id, data);

      return res.status(201).send(
        { 
          status: 'success',
          message: 'Model is predicted successfully',
          data
        });

    } catch (error) {
      return res.status(400).send(
        {
          "status": "fail",
          "message": "Terjadi kesalahan dalam melakukan prediksi"
        }
      );
    }
    
  }

}

module.exports = PredictController;
