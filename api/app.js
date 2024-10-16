import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|pdf/;
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedExtensions.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          allowedExtensions
      )
    );
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.get("/paginaUpload", (req, res) => {
  prisma.file.findMany().then((files) => {
    res.send(files);
  });
});

app.get("/paginaUpload/:file", (req, res) => {
  const file = req.params.file;
  res.sendFile(path.join(__dirname, "/uploads", file));
});

app.post("/paginaUpload", uploads.array("files"), async (req, res) => {
  try {
    const files = req.files;
    const filePromises = files.map((file) => {
      return prisma.file.create({
        data: {
          nume_fisier: file.originalname,
          marime_fisier: file.size,
        },
      });
    });
    await Promise.all(filePromises);
    res.status(201).send("Files uploaded and saved to database");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading files");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
