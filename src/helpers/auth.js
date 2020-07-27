import jwt from 'jsonwebtoken';
const helpers = {};

helpers.isAuthenticated = async (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) return res.status(400).json({ ok: false, errors: [ { msg: 'Token no proveído.' } ] });

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) return res.status(400).json({ errors: [ { msg: 'Token inválido.' } ] });
		req.decoded = decoded;
		next();
	});
};

module.exports = helpers;
