import fs from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

type ValidMimeType = 'image/png' | 'image/jpg' | 'image/jpeg' | 'image/webp';

const validMimeTypes: ValidMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
];

export const saveImageToStorage = {
  storage: diskStorage({
    destination: 'src/uploads/images',
    filename(req, file, callback) {
      const fileExtension: string = file.originalname.split('.')[1];
      const fileName: string = uuidv4() + '.' + fileExtension;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes: ValidMimeType[] = validMimeTypes;
    allowedMimeTypes.includes(file.mimetype)
      ? callback(null, true)
      : callback(null, false);
  },
};

export const saveDocumentToStorage = {
  storage: diskStorage({
    destination: 'src/uploads/pdf',
    filename(req, file, callback) {
      const fileExtension: string = file.originalname.split('.')[1];
      const fileName: string = uuidv4() + '.' + fileExtension;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['application/pdf'];
    allowedMimeTypes.includes(file.mimetype)
      ? callback(null, true)
      : callback(null, false);
  },
};

export const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlinkSync(fullFilePath);
  } catch (error) {
    console.error(error);
  }
};
