import subprocess

def run_batch_file():
    p = subprocess.Popen(['C:/Users/Phillipp Schröder/Desktop/BA/aitestgeneration/calculator/calculator/npmtest.bat'], stdout=subprocess.PIPE)
    try:
        output = p.communicate()[0]
    except Exception as e:
        print(f"An error occurred: {str(e)}")

    # Try decoding the output with different encodings until we find one that works
    encodings = ['utf-8', 'cp1252', 'latin1']
    for encoding in encodings:
        try:
            output = output.decode(encoding)
            return output  # Return the decoded output
        except UnicodeDecodeError:
            pass

