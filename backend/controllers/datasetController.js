import Dataset from '../models/Dataset.js';
import fs from 'fs';
import csv from 'csv-parser';

export const getAllDatasets = async (req, res) => {
  const datasets = await Dataset.find();
  res.json(datasets);
};

export const getDatasetData = (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
};

export const uploadDataset = async (req, res) => {
  const { originalname, filename } = req.file;

  const dataset = new Dataset({ name: originalname, filename });
  await dataset.save();

  res.json({ message: 'Dataset uploaded successfully', dataset });
};
