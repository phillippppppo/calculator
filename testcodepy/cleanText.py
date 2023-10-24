import re

def cleanText(text):
    if "```" in text:
        # Remove "javascript" and keep the code block
        cleaned_text = re.sub(r"```javascript", "```", text, 1)

        matches = re.search(r"```([\s\S]*?)```", cleaned_text)
        if matches:
            extracted_code = matches.group(1)
            return extracted_code
        else:
            return text
    else:
        return text
