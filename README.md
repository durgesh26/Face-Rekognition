# Face Detection API

Face Detection API use AWS Face-Rekognition API to detect face from the image. You just provides the image with face and it will give you details analysis of the face detected. It gives the analysis such as where the face is located in image, Age-range, Gender, Emotions, Eyeglasses, and many more such details.

## Table of contents
* [AWS Face-Rekognition API description](#aws-face-rekognition-api-description)
* [Installation](#installation)
* [Input type](#input-type)
* [How to use API](#how-to-use-api)
* [Terms and Conditions](#terms-and-conditions)


## AWS Face-Rekognition API description
- AWS Face-Rekognition API uses image to detect object, text, people, scenes, activity from the image and video provided. These can be done using two way, either you can upload image to the AWS s3 storage or you can use Non-storage option.
- Type of analysis provide by AWS Face-Rekognition API are Labels, Face, Custom labels, Text detection, Face search, Celebrities match and many more.
- In these application we are using the Face analysis option. Image is choose from the local machine and is then store in s3 bucket to use to detect face and get the analysis face detected.
- In order to detect face from the image "detectFaces" function from the AWS Face-Rekognition API is used. It will take input parameter as bucket name of the AWS S3 bucket and image name store in the bucket.

## Installation
- To run this project you have to install postman  
```
https://www.postman.com/downloads/
```

## Input type
- To run this project you have to provide the image file as an input. Image file with the extention .jpeg, .jpg, .png is acceptable. If you provide any other input type such as .txt, .docx , .ppt is not acceptable and will throw error.

## How to use API
#### You have two ways in order to excess Face Detection API:
---
1. You can directly copy and paste the url below to the new search tab
```
http://104.131.184.70:3000/docs
```
- Swagger UI will open once you visit the above URL. You will find two button one with "POST /update" and another with the "GET /detect".
- You first have to click on the post button. When click it will show you the "try it out" button, by click on that you are now ready to upload image file.
- Now select the image file with extension .jpeg, .jpg, or .png from your local machine and hit Execute button.
- If you have upload image with the above given extension response is generated in the response body as shown below.
```
3142c13e-c06e-474c-8522-ab48f59bc9eb.png
```
- Note: Every time you upload image random image name is generated as shown above.
- If you provide image with any other extension error response is generated as shown below.
```
{
  "message": "please upload the image with file type: jpeg, png, jpg"
}
```
- Copy the randomly generated image name from the response body.
- Now click on the "GET /detect" button.
- click on the "Try it Out" button and then paste the image name in the input field with the "Key" label and hit on Execute button.
- You will find the response in json format in the response body. These response is the analysis of the face detected from the image uploaded by the user. Respose is shown below
```
{
  "FaceDetails": [
    {
      "BoundingBox": {
        "Width": 0.42683255672454834,
        "Height": 0.8336866497993469,
        "Left": 0.29032161831855774,
        "Top": 0.09717020392417908
      },
      "AgeRange": {
        "Low": 21,
        "High": 33
      },
      "Smile": {
        "Value": false,
        "Confidence": 98.56151580810547
      },
      "Eyeglasses": {
        "Value": false,
        "Confidence": 98.90487670898438
      },
      "Sunglasses": {
        "Value": false,
        "Confidence": 99.600341796875
      },
      "Gender": {
        "Value": "Male",
        "Confidence": 99.3250961303711
      },
      "Beard": {
        "Value": true,
        "Confidence": 88.88880920410156
      },
      "Mustache": {
        "Value": false,
        "Confidence": 73.39533233642578
      },
      "EyesOpen": {
        "Value": true,
        "Confidence": 96.98289489746094
      },
      "MouthOpen": {
        "Value": false,
        "Confidence": 97.51068115234375
      }
}
```
- If you provide any other thing in the input field and hit Execute it will provide you with an error response as below.
```
{
  "message": "Upload is not found in aws s3 bucket"
}
```
- Note: It will show you this error because it will check for the key in AWS S3 bucket where your image is store.

---
2. You can use postman to run API. For that you have to install and open postman in your local machine.
- Click on the + for the new tab and change GET from the POST from the dropdown and copy and paste the below url.
```
http://104.131.184.70:3000/upload
```
- Click on "Body" and select the form-data, then enter the key and value. Enter key as "image" and for value when you hover over the key field you will fint "Text" dropdown click on it and select "File". Then on the value file "Select Files" will display. Click on that and select image file from your local machine and Click on "Send". And random image name is genreated in response.
- Now again click on the + to open the new tab. This time make sure it is "GET" and copy and paste the url given below.
```
http://104.131.184.70:3000/detect
```
- After that click on the params and enter the KEY and VALUE in the field. For KEY enter "key" and for the VALUE copy the respose of the randomly generated image name when you upload the image and paste to the VALUE field. And Click on "Send". And response is generated base on the image is uploaded.
- Note: If you provide the wrong value in the VALUE field error is genreated.

- ==>Thus, you can use any methods to get the face analysis of the image you upload both will show you the same response.

## Terms and Conditions
- When you upload your image to the server, youe image is saved in AWS S3 bucket for the face detection from the image. If you agree with it then only you use this api.


