const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config(); // Asegúrate de tener dotenv para manejar la API_SECRET de forma segura

cloudinary.config({
  cloud_name: 'dpnbylgwq',
  api_key: '156198499549574',
  api_secret: process.env.CLOUDINARY_API_SECRET, // Usa .env para seguridad
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'equipos_basket',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
