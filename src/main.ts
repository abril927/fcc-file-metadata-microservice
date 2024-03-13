import * as dotenv from 'dotenv';
dotenv.config();

import { default as express, Express } from 'express';
import { default as cors } from 'cors';

import { default as path } from 'path';

let app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

import { default as multer } from 'multer';
const upload = multer({ dest: path.join(__dirname, '../data/uploads') });

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {	
	return res.json({ 
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Ready, listening on port ' + (process.env.PORT || 3000));
});