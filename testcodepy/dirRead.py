import os

def dirRead(dirPath):
    # Erstelle eine leere Liste, um die ausgewählten Dateien zu speichern
    js_files = []

    # Durchlaufe alle Elemente im Verzeichnis
    for item in os.listdir(dirPath):
        # Prüfe, ob es sich um eine Datei handelt und ob die Datei auf ".js" endet
        if os.path.isfile(os.path.join(dirPath, item)) and item.endswith(".js"):
            js_files.append(item)

    # Gib die Liste der ausgewählten Dateien zurück
    return js_files
