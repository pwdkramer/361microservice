# 361microservice

HOW TO REQUEST DATA:

1 - Create new object in database - send a POST to http://localhost:8080/createLevel with a body containing a JSON object containing {"uuid": "<id here>", "image64": "<image-base-64-png-string here>"}

2 - Read level from database - send a GET to http://localhost:8080/readLevel with a body containing a JSON object containing {"uuid": "<id here"}

3 - Update level in database - send a POST to http://localhost:8080/updateLevel with a body containing a JSON object containing {"uuid": "<id here>", "image64": "<image-base-64-png-string here>"}

4 - Delete level in database - send a POST to http://localhost:8080/deleteLevel with a body containing a JSON object containing {"uuid": "<id here"}


HOW TO RECEIVE DATA:

Create, Update, and Delete will return strings containing a confirmation or error message.
Read will return a string containing an error message if failed, or a string containing the image-base-64-png-string if successful.


![image](https://user-images.githubusercontent.com/10999477/218932289-26ddc0e2-ee59-456e-95eb-f24877287208.png)
