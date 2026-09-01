from requests import Response
import requests

user_message="Hi How are you??"

request_message={"message":user_message}

url="http://localhost:5678/webhook/fcff6a4d-b6b3-4385-9e1e-e88db4e08bf5"

response=requests.post(url,json=request_message)

print(response.status_code)

print(response.json()[0]["output"])