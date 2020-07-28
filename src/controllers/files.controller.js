import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const rootPath = path.join(__dirname, `../uploads`);

		if (!fs.existsSync(rootPath)) {
			fs.mkdirSync(rootPath, (err) => {
				if (err) return cb('No se pudo crear el directorio');
			});
		}

		cb(null, rootPath);
	},
	filename: (req, file, cb) => {
		cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname).toLocaleLowerCase()}`);
	}
});

const upload = multer({
	storage,
	limits: { fileSize: 1000000 },
	fileFilter: (req, file, cb) => {
		const filetypes = /jpg|jpeg|png/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname));
		if (mimetype && extname) {
			return cb(null, true);
		}
		cb('Error: solo se admiten archivos jpg, jpeg o png');
	}
}).single('image');

module.exports = {
	upload
};
