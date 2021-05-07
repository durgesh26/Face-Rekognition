const express = require('express');
const app = express();
const port = 8001;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const axios = require('axios').default;

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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());




app.listen(port, () => {
	console.log('Example app listening at http://localhost:'+port);
})
