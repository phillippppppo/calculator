def fileWrite(fileName, input):

    with open(fileName, 'a', encoding='utf-8') as file:
        file.write(input)
        file.close()