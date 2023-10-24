def wipeFile(fileName):
    # Öffne eine Datei mit "read"-Berechtigung und return den Inhalt der Datei

    open(fileName, "w").close()