# Version 1.1 – Barrierefreiheit: manuelle Abnahme

Stand: 21.10.2026. Grundlage: Demo 1.0, Commit f9b25d7. Dies ist ein ergänzender Prüfplan, **kein Nachweis einer bereits bestandenen Prüfung**. Es werden keine Nutzerdaten erfasst.

## Vorbereitung
- Lokal `index.html` aus dem Ordner `knowledge-command-center` öffnen.
- Prüfen in Chrome oder Edge unter Windows; zusätzlich mit Windows-Sprachausgabe/Narrator (`Strg + Windows + Eingabe`) oder NVDA.
- Auch mit 360 px schmalem Browserfenster prüfen.
- Ergebnisse je Fall als **Bestanden / Fehlgeschlagen / Nicht durchgeführt** mit Browser, Datum und kurzer Beobachtung dokumentieren.

## Abnahmekriterien

| ID | Prüfung | Erwartetes Ergebnis | Status |
| --- | --- | --- | --- |
| A11Y-01 | Nach Neuladen `Tab` drücken | „Zum Inhalt springen“ ist sichtbar, `Enter` setzt Fokus auf Hauptinhalt | Nicht durchgeführt |
| A11Y-02 | Nur mit `Tab` und `Shift+Tab` navigieren | Alle sichtbaren Links, Schaltflächen und Formulare erreichbar; Fokus gut sichtbar | Nicht durchgeführt |
| A11Y-03 | Wissenssuche bedienen | Feldname und Ergebnisanzahl werden verständlich vorgelesen; leere Trefferlage ist erkennbar | Nicht durchgeführt |
| A11Y-04 | Kategorienfilter ändern und zurücksetzen | Ausgewählte Kategorie, Filterzustand und Ergebnisanzahl sind nachvollziehbar | Nicht durchgeführt |
| A11Y-05 | Lexikonsuche | Begriffe und zugehörige Erklärungen werden in sinnvoller Reihenfolge vorgelesen | Nicht durchgeführt |
| A11Y-06 | Detaildialog mit `Enter` öffnen | Titel und Hinweis werden angesagt; Fokus liegt im Dialog | Nicht durchgeführt |
| A11Y-07 | Im Dialog `Tab` / `Shift+Tab` und `Escape` verwenden | Fokus verlässt den Dialog nicht; nach Schließen kehrt er zum Auslöser zurück | Nicht durchgeführt |
| A11Y-08 | Mobiles Menü per Tastatur öffnen, schließen und navigieren | Zustand des Menüs wird angesagt; `Escape` schließt; Navigation bleibt bedienbar | Nicht durchgeführt |
| A11Y-09 | Browser-Zoom auf 200 % und 400 % erhöhen | Funktionen bleiben erreichbar, Inhalte ohne Informationsverlust lesbar | Nicht durchgeführt |
| A11Y-10 | Screenreader prüft Seitentitel, Überschriften, Landmarks | Sechs Ansichten und aktive Navigation sind verständlich bezeichnet | Nicht durchgeführt |

## Dokumentation eines Befunds
- Prüf-ID und Status
- Browser, Version, Zoomstufe, Screenreader
- Erwartung und beobachtetes Verhalten
- Exakte Schritte zur Reproduktion
- Schweregrad und vorgeschlagene Korrektur
- Re-Test nach Korrektur mit Datum

## Qualitätssicherung und Grenzen
- Automatisierte Ergebnisse aus `testplan.md` nicht als vollständige Barrierefreiheitsabnahme ausgeben.
- Bei Fehlern zuerst einen reproduzierbaren Test schreiben; dann gezielt im Entwicklungsbranch ändern.
- Vor jedem Merge Tests erneut ausführen und den PR mit Prüfprotokoll versehen.
- Die bestehende `<dl>`-Struktur mit gruppierenden `<div>`-Elementen ist nach aktuellem HTML zulässig; keinen unnötigen Umbau allein deswegen vornehmen.
- Keine Live-Anbindung, Veröffentlichung oder Änderung von `main` ohne gesonderte Freigabe.
