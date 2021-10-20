
const express = require('express'); // expreess library to create server
const AWS = require('aws-sdk'); // AWS library to get AWS package 
const multer = require('multer'); // multer middleware use for handling multipart/form-data
const app = express();
const port = 3000;
const swaggerJsdoc = require('swagger-jsdoc'); // swagger library for Swagger ui
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const uuid = require('uuid').v4; // uuid library to genrate random unique indentifier generator

var filetype = ["png","jpg","jpeg"];

//code to config AWS with the access key and secret key
AWS.config.update({
    accessKeyId: 'AKIAQ4QSFQVEFTNEHKTZ',
    secretAccessKey: '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',
    region: 'us-east-2'
});

//code to initialize AWS S3 bucket with version of the S3 bucket
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

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
			version: '1.0.2',
			name: 'Durgesh',
			description: 'Test Face Rekognition API to detect face from the image and analysis image',
		},
		host: 'localhost:3000',
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

 /**
 * @swagger
 * /upload:
 *     post:
 *       description: upload image file for face detection and analysis
 *       operationId: "uploadFile"
 *       consumes:
 *          - "multipart/form-data"
 *       produces:
 *          - application/json
 *       parameters:
 *          - name: "image"
 *            in: "formData"
 *            description: "file name of image"
 *            required: true
 *            type: "file"
 *       responses:
 *          200:
 *            description: image uploaded succesfully
 */

//code to upload image to s3 bucket with the endpoint bucket
app.post('/upload',upload, (req,res) => {


	let myFile = req.file.originalname.split(".");
	var fileType = myFile[myFile.length -1].toLowerCase();
	
	console.log(fileType);
	let isFileType = false;
	for(var i =0 ; i < filetype.length; i++){
		if(fileType === filetype[i]){
			console.log("isFiletype is true");
			const params = {
				Bucket: "facerekognition01",
				Key: `${uuid()}.${fileType}`, //generate random image name using uuid
				Body: req.file.buffer 
			}
			//code to upload image to s3 bucket
			s3.upload(params, (err,data) => {
				if(err){
					res.status(500).send(err);
				}else{
					res.status(200).json({"key" : data.Key});
				
				}
			});
			isFileType = true;
		}
	}
	if(!isFileType){
		res.status(500).json({message: "please upload the image with file type: jpeg, png, jpg"});
	}
	
});



 /**
 * @swagger
 * /detect:
 *     get:
 *       description: return face analysis data of the face detected from the image provided
 *       produces:
 *          - application/json
 *       parameters:
 *        - name: key
 *          in: query
 *          desciption: agent_code
 *          required: true
 *          type: string
 *       responses:
 *          200:
 *              description: orders table display
 */


//code to detect face from the image on the endpoint /detect
app.get('/detect', (req,res) => {
	console.log("key params:" + req.query.key);
	let photo_key = req.query.key;
	if(!photo_key){
		res.status(400).json({
			"error" :{
				"message" : "Key is required to detect face" 
			}
		});
	}
	console.log("download: " + photo_key);
	var params = {
        Bucket: "facerekognition01",
        MaxKeys: 1000
    }

	// get list of object of the image store in the s3 bucket
	s3.listObjects(params, function(err,data) {
		if(err){
			res.status(500).send(err);
		}else{
			let isPresent = false;
			for(var i=0;i<data.Contents.length;i++){
				console.log("both data at a time:  "+data.Contents[i].Key + " " + photo_key);
				if(photo_key === data.Contents[i].Key){
					console.log("inside if: " + data.Contents[i].Key);
					var name = data.Contents[i].Key;
					//create paramter to pass for the detectFace function
					var para = {
						Image: {
							S3Object: {
								Bucket: "facerekognition01",
								Name: name
							}
						},
						Attributes: [
							"ALL"
						]
					}
					//code to initialize AWS rekognition api
					const rekognition = new AWS.Rekognition();
					
					//call detectFace from the AWS Rekognition
					rekognition.detectFaces(para, function (err, response) {
						if (err) {
							console.log(err, err.stack);
							res.json("error"); // an error occurred
						} else {
							res.json(response);
						}
					});
					isPresent = true;
				}
			}
			
			if(!isPresent){
				res.json({message : "Upload image is not found in AWS s3 bucket"});
			}
		
		}
	})

});


//code to listen the api at the predefined port
app.listen(port, () => {
	console.log('Example app listening at http://104.131.184.70:'+port);
})
