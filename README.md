# Face Detection API

Face Detection API use AWS Face-Rekognition API to detect face from the image. You just provides the image with face and it will give you details analysis of the face detected. It gives the analysis such as where the face is located in image, Age-range, Gender, Emotions, Eyeglasses, and many more such details.

## Table of contents
* [AWS Face-Rekognition API description](#aws-face-rekognition-api-description)
* [Installation](#installation)
* [Input type](#input-type)
* [How to use API](#how-to-use-api)


## AWS Face-Rekognition API description
- AWS Face-Rekognition API uses image to detect object, text, people, scenes, activity from the image and video provided. These can be done using two way, either you can upload image to the AWS s3 storage or you can use Non-storage option.
- Type of analysis provide by AWS Face-Rekognition API are Labels, Face, Custom labels, Text detection, Face search, Celebrities match and many more.
- In these application we are using the Face analysis option and image is choose from the local machine and is then store in s3 bucket to use to detect and face and get the analysis face detected.

## Installation
- To run this project you have to install postman  
```
https://www.postman.com/downloads/
```

## Input type
- To run this project you have to provide the image file as an input. Image file with the extention .jpeg, .jpg, .png is acceptable. If you provide any other input type such as .txt, .docx , .ppt is not acceptable and will throw error.

## How to use API
- You have two ways in order to excess Face Detection API:
1. You can directly copy and paste the url below to the new search tab
```
http://104.131.184.70:3000/docs
```
- Swagger UI will open once you visit the above URL as shown below
-   
