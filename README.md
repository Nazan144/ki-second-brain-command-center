# KI Second Brain – Knowledge Command Center

Lokale Demo-Version 1.0. Ausschließlich erfundene Demo-Daten. Automatisierte lokale Browserprüfung in Edge und Chrome bei 360, 768 und 1440 Pixel Breite bestanden. Manuelle Tastatur- und Screenreader-Prüfung stehen noch aus; siehe [Testprotokoll](testplan.md).

## Start

`index.html` im Browser öffnen. Es sind keine Installation, kein Server und keine Zugangsdaten erforderlich. Die JavaScript-Dateien werden als klassische lokale Skripte geladen, damit der Entwurf auch über `file://` funktioniert.

## Repository

Eigenständiges Repository: https://github.com/Nazan144/ki-second-brain-command-center

Für Git-Befehle diesen Ordner `knowledge-command-center` als Arbeitsverzeichnis verwenden. Er besitzt eine eigene Git-Historie. Die darüberliegende Radwerk-Arbeitskopie ist ein separates Repository; bei Arbeiten darin deshalb immer das richtige Arbeitsverzeichnis prüfen. Generierte Browser-Testartefakte bleiben ausgeschlossen.

## Umfang dieser Freigaberunde

- Sechs Ansichten mit Navigation, Dashboard und Beispielinhalten.
- Helle Gestaltung in Grün und neutralen Farben; einklappbare mobile Navigation.
- Zehn Wissenseinträge, drei Agenten, drei Workflows, elf Lexikonbegriffe und drei Portfolio-Projekte.
- Dashboard-Zahlen werden aus den Demo-Daten abgeleitet.
- Wissenssuche über Titel, Beschreibung, Kategorien und Schlagwörter; kombinierbar mit Kategorienfilter.
- Lexikonsuche über Begriffe und Erklärungen; alphabetische Sortierung.
- Ergebnisanzahl, Hinweise bei leeren Ergebnissen und Schaltflächen zum Zurücksetzen.
- Detailansichten für Wissenseinträge, Agenten, Workflows und Portfolio-Projekte sowie die letzten Wissenseinträge im Dashboard.
- Keine Speicherung eigener Eingaben, keine KI-Ausführung, keine Notion-/n8n-Verbindung und keine Veröffentlichung.

## Dateien

- `index.html`: Struktur und Ansichten.
- `css/styles.css`: Gestaltung und Anpassung an Bildschirmgrößen.
- `js/demo-data.js`: erfundene Inhalte.
- `js/data-service.js`: zentraler Zugriff auf lokale Demo-Daten.
- `js/app.js`: Darstellung und Navigation; Textinhalte werden über `textContent` eingesetzt.
- `tests/`: lokale Browserprüfungen; generierte Berichte und Screenshots in `tests/artifacts/` werden nicht versioniert.

## Bedienung

Die Suche reagiert während der Eingabe. Mehrere durch Leerzeichen getrennte Suchwörter müssen alle im Eintrag vorkommen; Groß-/Kleinschreibung spielt keine Rolle. Wissenssuche und Kategorie wirken zusammen. „Zurücksetzen“ leert das jeweilige Suchfeld und den zugehörigen Filter. Beim Wechsel zwischen Bereichen bleiben die Suchwerte bis zum Neuladen erhalten.

„Details ansehen“ öffnet einen modalen Dialog: Der Hintergrund ist währenddessen nicht bedienbar. Mit „Schließen“ oder Escape wird er geschlossen; der Tastaturfokus kehrt zur auslösenden Schaltfläche zurück. Dafür werden die nativen Dialogfunktionen aktueller Browser verwendet.

## Spätere Anbindung

Vorgesehen: Browser mit Anmeldung → geschützter Server-Zugang → authentifizierter n8n-Aufruf → ausdrücklich freigegebene Notion-Datenbank. Zunächst nur lesender Zugriff auf eine Demo-Datenbank. Zugangsschlüssel bleiben ausschließlich serverseitig. Ein statischer Schlüssel im Browser ist kein geeigneter Zugriffsschutz.

Die Umsetzung dieser Anbindung und jede Veröffentlichung benötigen eine eigene Freigabe. Vorhandene Dateien des Radwerk-Projekts werden nicht als Datenquelle verwendet.
