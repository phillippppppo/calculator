import re

def cleanJest(text):
    match = re.search(r'FAIL src/copy\.test\.js(.*?)Test Suites:', text, re.DOTALL)

    if match:
        extracted_content = match.group(1)
    else:
        return text