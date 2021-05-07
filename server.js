
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const app = express();
const port = 8001;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const axios = require('axios').default;
const uuid = require('uuid').v4;

//code to initialize aws S3 bucket with the access key and secret key
const s3 = new AWS.S3({
	accessKeyId: "AKIAQ4QSFQVEFTNEHKTZ",
	secretAccessKey: "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"
})

// code to store the file in memory storage using multer
const storage = multer.memoryStorage({
	destination: function(req,file,callback){
		callback(null,'')
	}
});

//code to upload single image file using multer
const upload = multer({storage}).single('image');


//code to initialize options for the Swagger UI
const options = {
	swaggerDefinition: {
		info: {
			title : 'Face Rekognition API',
			version: '1.0.0',
			description: 'Test Face Rekognition API to detect face from the image and analysis image',
		},
		host: '167.99.230.251:3000',
		basePath:'/',
	},
	apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);

//code to display Swagger UI on the endpoint /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());



//code to upload image to s3 bucket with the endpoint bucket
app.post('/upload',upload, (req,res) => {

	let myFile = req.file.originalname.split(".");
	const fileType = myFile[myFile.length -1];

	const params = {
		Bucket: "facerekognition01",
		Key: `${uuid()}.${fileType}`,
		Body: req.file.buffer 
	}
	//code to upload image to s3 bucket
	s3.upload(params, (err,data) => {
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(data);
		}
	})
});

//code to detect face from the image on the endpoint /detect
app.get('/detect', (req,res) => {
	console.log(req.file.originalname)
	var params = {
        Bucket: "facerekognition01",
        MaxKeys: 1000
    }

	s3.listObjects(params, function(err,data) {
		if(err){
			res.status(500).send(err);
		}else{
			
			res.status(200).send(data);
		}
	})

});


//code to listen the api at the predefined port
app.listen(port, () => {
	console.log('Example app listening at http://localhost:'+port);
})
