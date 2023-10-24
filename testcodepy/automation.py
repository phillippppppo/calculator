import os
from dotenv import load_dotenv

load_dotenv()

from APICall import APIcalling
import fileWrite
import npmTestBatch
import fileRead
import fileWipe
import cleanText
import cleanJest

requestCounter = 0
maxRequest = 100
lastLine = ""
npmOutput = ""
successLine = "Please create another test!"
copy_file = os.getenv("COPY_TEST_FILE")
test_file = os.getenv("TEST_TEST_FILE")
openAITestOutput = ""

openAITestOutput = APIcalling(
    "Please create a test case for me, as described in the testdatastructure!", ""
)

fileWrite.fileWrite(
    copy_file, cleanText.cleanText(cleanText.cleanText(openAITestOutput))
)

while requestCounter <= maxRequest:
    npmOutput = npmTestBatch.run_batch_file()
    fileWrite.fileWrite("log.txt", cleanText.cleanText(openAITestOutput))
    if cleanJest.cleanJest(npmOutput):
        fileWrite.fileWrite("log.txt", cleanJest.cleanJest(npmOutput))
    for line in npmOutput.splitlines():
        lastLine = line

    if "Tests failed" in lastLine:
        fileWipe.wipeFile(copy_file)
        fileWrite.fileWrite(
            copy_file,
            fileRead.readFile(
                "C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/src/importInformation.txt"
            ),
        )
        openAITestOutput = APIcalling(lastLine, npmOutput)
        fileWrite.fileWrite(copy_file, cleanText.cleanText(openAITestOutput))
        requestCounter = requestCounter + 1

    if "Tests passed successfully" in lastLine:
        fileWrite.fileWrite(test_file, cleanText.cleanText(openAITestOutput))
        fileWipe.wipeFile(copy_file)
        fileWrite.fileWrite(
            copy_file,
            fileRead.readFile(
                "C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/src/importInformation.txt"
            ),
        )
        openAITestOutput = APIcalling(lastLine, successLine)
        fileWrite.fileWrite(copy_file, cleanText.cleanText(openAITestOutput))
        requestCounter = requestCounter + 1

    if requestCounter == maxRequest:
        fileWipe.wipeFile(copy_file)
