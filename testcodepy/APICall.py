#to call the openaiAPI
import openai

#read the information of your files
import fileRead
#uses for fileRead for every file which ends on .js
import dirRead

#to provide your API from you .env
import os
from dotenv import load_dotenv

load_dotenv()

#define the API_Key
openai.api_key = os.getenv("API_KEY")

conversation = [{"role": "system", "content": "You are a Coder. Only answer in code please!"}]

conversation.append({"role": "user", "content": fileRead.readFile("C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/src/index.js")})

for dirFile in dirRead.dirRead("C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/src/logic"):
    conversation.append({"role": "user", "content": fileRead.readFile("C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/src/logic/" + dirFile)})

for dirFile in dirRead.dirRead("C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/src/component"):
    conversation.append({"role": "user", "content": fileRead.readFile("C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/src/component/" + dirFile)})

conversation.append({"role": "user", "content": fileRead.readFile("C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/testcodepy/testDataStructure.txt")})

def APIcalling(prompt, prompt2):

    if prompt2 == "":    

        conversation.append({"role": "user", "content": prompt})
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation
        )
        gpt_response_text = response.choices[0].message.content
    
        conversation.append({"role": "assistant", "content": gpt_response_text})

        return gpt_response_text


    else:

        conversation.append({"role": "user", "content": prompt})
        conversation.append({"role": "user", "content": prompt2})
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation
        )
        gpt_response_text = response.choices[0].message.content
    
        conversation.append({"role": "assistant", "content": gpt_response_text})

        
        return gpt_response_text

    
