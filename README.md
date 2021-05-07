# Face Detection API

Face Detection API use AWS Face-Rekognition API to detect face from the image. You just provides the image with face and it will give you details analysis of the face detected. It gives the analysis such as where the face is located in image, Age-range, Gender, Emotions, Eyeglasses, and many more such details.

## Table of contents
* [AWS Face-Rekognition API description](#aws-face-rekognition-api-description)
* [Installation](#installation)


## AWS Face-Rekognition API description
- AWS Face-Rekognition API uses image to detect object, text, people, scenes, activity from the image and video provided. These can be done using two way, either you can upload image to the AWS s3 storage or you can use Non-storage option.
- Type of analysis provide by AWS Face-Rekognition API are Labels, Face, Custom labels, Text detection, Face search, Celebrities match and many more.
- In these application we are using the Face analysis option and image is choose from the local machine and is then store in s3 bucket to use to detect and face and get the analysis face detected.

## Installation
- To run this project you have to install postman  
```
https://www.postman.com/downloads/
```
