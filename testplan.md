# Testplan und Prüfstand – Demo-Version 1.0

Stand: 20.10.2026. Gestaltung und Grundstruktur sind freigegeben. Suche, Filter und Detailansichten sind umgesetzt. Die automatisierte lokale Browserprüfung ist bestanden. Eine ergänzende manuelle Tastatur- und Screenreader-Prüfung bleibt offen.

## Prüfpunkte

| Prüfung | Erwartung |
| --- | --- |
| Start | `index.html` lässt sich direkt lokal öffnen. |
| Navigation | Alle sechs Bereiche sind erreichbar; Titel und aktive Markierung wechseln mit. |
| Browser-Verlauf | Zurück/Vorwärts stellt die jeweils vorherige Ansicht wieder her. |
| Dashboard | 10 Wissenseinträge, 3 Agenten, 3 Workflows, 3 Projekte; drei zuletzt bearbeitete Einträge. |
| Mobil | Bei 360 und 768 Pixel Breite ist das Menü ein-/ausklappbar, ohne horizontales Scrollen. |
| Desktop | Bei 1440 Pixel Breite steht die Navigation links; Inhalte bleiben lesbar. |
| Tastatur | Sprunglink, Navigation und Kacheln erreichbar; Fokus sichtbar; Escape schließt das mobile Menü. |
| Demo-Hinweise | Demo-Modus durchgehend sichtbar; Agenten und Workflows als Simulation markiert. |
| Netzwerk | Keine externen Anfragen, Schriftarten, Bibliotheken oder Tracking-Aufrufe. |
| Daten | Ausschließlich erfundene Inhalte, keine Schlüssel oder personenbezogenen Daten. |
| Fehler | Keine unbehandelten JavaScript-Fehler beim Wechsel zwischen Ansichten. |
| Wissenssuche | „GUTE PROMPTS“ findet einen Eintrag; „Reflexion“ findet den Eintrag zur Wissensrunde. |
| Kombinierter Filter | „Prompts“ mit Kategorie „Automatisierung“ zeigt keine Ergebnisse; diese Kategorie ohne Suchtext zeigt zwei Einträge. |
| Leere Ergebnisse | „zzzzzz“ zeigt einen verständlichen Hinweis und die Ergebnisanzahl null. |
| Zurücksetzen | Suchtext und Kategorie werden geleert; alle zehn Wissenseinträge erscheinen wieder. |
| Lexikon | Alphabetische Reihenfolge; „SCHNITTSTELLE“ findet den Begriff API; Zurücksetzen zeigt elf Begriffe. |
| Details | Wissens-, Agenten-, Workflow- und Projektkarten sowie letzte Wissenseinträge öffnen passende Details. |
| Dialog im Browser | Hintergrund ist gesperrt; Tab bleibt im Dialog; Escape und „Schließen“ schließen ihn; Fokus kehrt zur auslösenden Schaltfläche zurück. |
| Bereichswechsel | Suchwerte bleiben erhalten; bei einem Ansichtswechsel wird ein gegebenenfalls offener Dialog geschlossen. |

## Prüfstand

Statische Prüfung der aktuellen Version:

- Alle drei JavaScript-Dateien erfolgreich auf Syntax geprüft.
- Alle vier lokalen CSS-/JavaScript-Verweise aus der HTML-Datei vorhanden.
- Demo-Daten und Datenzugriff in einer isolierten JavaScript-Umgebung ausgeführt: 10 Wissenseinträge, 3 Agenten, 3 Workflows, 11 Lexikonbegriffe und 3 Projekte.
- Alle sechs Ansichten in der HTML-Struktur vorhanden.
- Alle 32 HTML-IDs eindeutig; alle 24 direkt verwendeten Elementverweise aus `app.js` vorhanden.
- Ausführbarer Quelltext ohne externe HTTP-Adressen, Netzwerkanfragen, Browser-Speicherung oder `innerHTML`.
- Git-Status zeigt ausschließlich den neuen Unterordner; bestehende Projektdateien wurden nicht verändert.

## Isolierte Funktionsprüfung

Alle drei Skripte einschließlich `app.js` wurden in einer isolierten JavaScript-Umgebung mit vereinfachten DOM-Testdoubles ausgeführt. Testdoubles sind Ersatzobjekte für Browser-Elemente. Sie prüfen die Anwendungslogik, ersetzen aber keinen echten Browser.

15 Prüfgruppen bestanden:

1. Initiale Darstellung aller Sammlungen und Dashboard-Anzahlen.
2. Automatisches Befüllen der Kategorienauswahl.
3. Titelsuche mit Großschreibung und äußeren Leerzeichen.
4. Suche über Schlagwörter.
5. Kombination mehrerer Suchwörter.
6. Kombination von Suche und Kategorienfilter.
7. Unbekannter Suchtext einschließlich HTML-Zeichen erzeugt ein leeres Ergebnis.
8. Zurücksetzen von Suche und Kategorie einschließlich Fokusaufruf.
9. Alphabetische Lexikonreihenfolge, Suche in Erklärungen, Leerzustand und Zurücksetzen.
10. Detailinhalt, Öffnen, Schließen und Fokusaufruf in allen fünf Kartenbereichen.
11. Sechs Ansichten einschließlich Überschrift, Sichtbarkeitszustand und aktiver Navigation.
12. Unbekannte Hash-Routen einschließlich `__proto__` fallen auf das Dashboard zurück.
13. Menüstatus und Escape-Ereignis zum Schließen der mobilen Navigation.
14. Ansichtswechsel schließt einen offenen Dialog.
15. Sprunglink verändert die aktive Ansicht nicht.

## Lokale Browserprüfung – bestanden

Durchgeführt mit den installierten Browsern Microsoft Edge 155.0.4283.62 und Google Chrome 155.0.8059.80 im Headless-Modus, also ohne sichtbares Browserfenster. Es wurde keine Browser-Erweiterung oder zusätzliche Bibliothek installiert.

| Browser | Tatsächliche CSS-Breite | Bestandene Prüfgruppen | Fehlgeschlagen | Erfasste JavaScript-Fehler |
| --- | --- | --- | --- | --- |
| Edge | 360 px | 13 | 0 | 0 |
| Edge | 768 px | 13 | 0 | 0 |
| Edge | 1440 px | 13 | 0 | 0 |
| Chrome | 360 px | 13 | 0 | 0 |
| Chrome | 768 px | 13 | 0 | 0 |
| Chrome | 1440 px | 13 | 0 | 0 |

**Ergebnis: 78 erfolgreiche Prüfgruppen.** Keine Fehler in der Anwendung festgestellt; produktive HTML-, CSS- und JavaScript-Dateien blieben bei dieser Abnahme unverändert.

### Methode und Grenzen

Der Test erzeugt eine lokale HTML-Testkopie mit zusätzlichen Prüfroutinen. Sie lädt die unveränderten CSS- und JavaScript-Dateien der Anwendung über `file://`. Ein eingebetteter Browserbereich (iframe) legt die tatsächliche CSS-Breite fest; diese wird im Bericht überprüft. Das ist erforderlich, weil die Windows-Browserfenster selbst eine Mindestbreite erzwingen. Es handelt sich um Desktop-Browser mit schmalem Viewport, nicht um Tests auf echten Mobilgeräten.

Die Prüfungen interagieren über die DOM-Schnittstelle der echten Browser. Sie prüfen natives `showModal()`, Anfangsfokus, die gesperrte Fokussierung des Hintergrunds, Schließen und Fokus-Rückgabe. Vor einem programmatisch ausgelösten Klick wird die Schaltfläche fokussiert, wie bei einer echten Mausbedienung. Echte Tab-/Escape-Tastatureingaben werden dadurch nicht ersetzt. Die Escape-Prüfung der mobilen Navigation verwendet ein synthetisches Ereignis.

Die Textkontrastprüfung berechnet die Farben sichtbarer Textknoten und ihrer Hintergrundflächen: mindestens 4,5:1 für normalen Text und 3:1 für große Schrift. Sie prüft alle sechs Ansichten, jedoch keine vollständige Barrierefreiheitskonformität, keine Platzhalter, keine Pseudoelemente und nicht jeden Dialogzustand. Die Dashboard-Screenshots wurden bei allen drei Breiten visuell betrachtet: Navigation, Texte und Kacheln sind lesbar; kein sichtbarer horizontaler Überlauf. Unterhalb des Screenshot-Ausschnitts liegende Inhalte wurden nicht vollständig visuell begutachtet.

Die Anwendungsressourcen enthalten keine HTTP-/HTTPS-Anfragen. Diese Aussage bezieht sich auf die Seite, nicht auf mögliche Hintergrunddienste der installierten Browser. Fehler werden über `error` und `unhandledrejection` gesammelt; eine vollständige manuelle Konsolenprüfung erfolgte nicht.

### Die 13 Prüfgruppen pro Browser und Breite

1. Lokaler Start und Dashboard-Zahlen.
2. Alle sechs Ansichten mit aktiver Navigation und Seitentitel.
3. Browser-Verlauf zurück und vorwärts.
4. Titel- und Schlagwortsuche.
5. Kombinierte Filter, Leerzustand und Zurücksetzen.
6. Erhalten der Suche beim Ansichtswechsel.
7. Lexikonsuche, alphabetische Sortierung und Zurücksetzen.
8. Native Detaildialoge in fünf Bereichen, Inhalt, Fokus und modaler Hintergrund.
9. Schließen eines Dialogs beim Ansichtswechsel.
10. Mobile Navigation und ihr Escape-Ereignis beziehungsweise Desktop-Sichtbarkeit.
11. Kein horizontaler Überlauf in sechs Ansichten und in den geprüften Dialogen.
12. Sichtbarer Demo-Hinweis und keine externen Seitenressourcen.
13. Berechnete Textkontraste aller sechs Ansichten.

### Berichte und Wiederholung

- Testlogik: [tests/browser-check.js](tests/browser-check.js)
- Windows-Teststarter: [tests/run-browser-check.ps1](tests/run-browser-check.ps1)
- JSON-Berichte und Dashboard-Screenshots: `tests/artifacts/edge-360.*`, `edge-768.*`, `edge-1440.*` sowie entsprechend `chrome-*`.
- Beispiel-Screenshots: [Smartphone-Breite](tests/artifacts/chrome-360.png), [Tablet-Breite](tests/artifacts/chrome-768.png), [Desktop-Breite](tests/artifacts/chrome-1440.png).

Die erzeugten Artefakte sind über `tests/.gitignore` von der Versionsverwaltung ausgeschlossen. Das Skript verwendet jeweils ein neues Browserprofil im temporären Windows-Verzeichnis und verändert das normale Browserprofil nicht.

Wiederholung aus dem Projektstamm bei erlaubter PowerShell-Skriptausführung:

```powershell
.\tests\run-browser-check.ps1 -Matrix
```

Windows blockiert hier standardmäßig Skripte. Für diese Abnahme wurde nach Werkzeugfreigabe PowerShell mit `-NoProfile -ExecutionPolicy Bypass` gestartet. Im eigenständigen Repository lautet der Aufruf `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\run-browser-check.ps1 -Matrix`. Die Einstellung gilt nur für den gestarteten Prozess; die Systemrichtlinie wurde nicht geändert.

## Manuelle Restprüfung – noch offen

Ein interaktiv steuerbarer Browser ist in dieser Sitzung nicht verbunden. Für die vollständige Bedienungsabnahme sind diese Schritte direkt in [index.html](index.html) nötig:

1. Seite neu laden und ausschließlich mit Tab bedienen. Der Sprunglink muss sichtbar werden und mit Enter zum Hauptinhalt führen. Anschließend Navigation, Suchfelder und Detail-Schaltflächen erreichen; Fokus muss jederzeit sichtbar bleiben.
2. Einen Detaildialog mit Enter öffnen. Mit Tab und Umschalt+Tab durchlaufen: Fokus bleibt im Dialog. Escape drücken: Dialog schließt und der Fokus steht wieder auf „Details ansehen“. Zusätzlich Schließen per Schaltfläche prüfen.
3. In einem schmalen Fenster das Menü per Tastatur öffnen und mit Escape schließen. Danach einen Bereich auswählen und prüfen, dass das Menü wieder geschlossen ist.
4. Mit einem Screenreader prüfen: Bereichsnamen, Feldbeschriftungen, Ergebnisanzahlen und Dialogtitel werden verständlich angesagt.

Diese Schritte sind ausdrücklich nicht als bestanden markiert. Fachliche Endabnahme und Freigabe durch den Nutzer bleiben ausstehend.

Es wurden keine Live-Dienste verbunden und keine Veröffentlichung vorgenommen.
