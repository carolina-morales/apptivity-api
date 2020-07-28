import { Router } from 'express';

import { upload } from '../controllers/files.controller';

const router = Router();

router.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(200).json({ ok: false, errros: [ { msg: err } ] });
		} else {
			res.status(200).json({ ok: true, msg: 'Imagen subida', file: req.file });
		}
	});
});

module.exports = router;
