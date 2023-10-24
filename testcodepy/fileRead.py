def readFile(fileName):
    # Öffne eine Datei mit "read"-Berechtigung und return den Inhalt der Datei

    file = open(fileName, "r")
    return file.read()



