# Wie ist der Flow?
- User ruft Seite auf (index.html)
  - Dort meldet er sich automatisch an lokalem WS-Server an
  - Dort meldet er sich automatisch an Backend WS-Server an
    - hier im Beispiel erhält er eine ID zurück, die im Browser gespeichert wird
      - hier im Beispiel passiert das im RAM, es kann auch in cookies, localStorage etc. gesetzt werden
- User klickt auf Button mit Aufschrift "Scan" und kontaktiert den lokalen WS-Server mit entsprechendem Event ('scan') und seiner ID, die er zuvor vom BE WS-Server erhalten hat
- lokaler WS-Server führt den Scan durch und schickt das Bild nebst ID von anfragendem Client an BE via Post-Request
- Backend nimmt den Request an, prüft das Bild und schickt über die bestehende WS-Verbindung eine Nachricht an den Client
- Client nimmt Nachricht an zeigt z.B. gerade gescanntes Bild an

# Anderer Weg
- lokaler WS-Server schickt Bild zurück an Client
- User bearbeitet Bild (drehen, zuschneiden) im FE und schickt Bild via Post-Request an Backend
- Backend prüft bei jedem Post-Request das eingehende Bild und und ob alle Bedingungen für das gerade zu scannende Dokument erfüllt sind (z.B. sind alle Seiten vorhanden, etc.)
- hier ist kein WS-Server im Backend notwendig, da die relevanten Prüfschritte im Rahmen des Post-Requests erfüllt werden können