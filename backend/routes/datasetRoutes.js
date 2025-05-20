import express from 'express';
import multer from 'multer';
import {
  getAllDatasets,
  getDatasetData,
  uploadDataset
} from '../controllers/datasetController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', getAllDatasets);
router.get('/:filename', getDatasetData);
router.post('/upload', upload.single('file'), uploadDataset);

export default router;
