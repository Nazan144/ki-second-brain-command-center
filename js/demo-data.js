/* Ausschließlich erfundene Demo-Inhalte. Keine Zugangsdaten oder externen Aufrufe. */
window.SecondBrainDemo = {
  knowledge: [
    {title:'Gute Prompts brauchen Kontext',category:'Prompting',description:'Ein klarer Auftrag, etwas Hintergrund und ein gewünschtes Ausgabeformat helfen beim Formulieren.',tags:['Grundlagen','Prompts'],updated:'2026-10-20'},
    {title:'Von der Notiz zur Wissenskarte',category:'Wissensmanagement',description:'Eine Beispielstruktur, um lose Gedanken in kurze, wiederverwendbare Wissenseinträge zu verwandeln.',tags:['Notizen','Struktur'],updated:'2026-10-19'},
    {title:'Der Weg einer Idee durch n8n',category:'Automatisierung',description:'Ein fiktiver Ablauf von einer neuen Idee bis zur sortierten Ablage in einer Datenbank.',tags:['n8n','Abläufe'],updated:'2026-10-18'},
    {title:'Quellen bewusst festhalten',category:'Wissensmanagement',description:'Zu jedem Eintrag gehören ein nachvollziehbarer Ursprung und ein kurzer eigener Gedanke.',tags:['Quellen'],updated:'2026-10-17'},
    {title:'KI-Ergebnisse kritisch prüfen',category:'KI-Grundlagen',description:'Aussagen mit geeigneten Quellen abgleichen und Unsicherheiten sichtbar festhalten.',tags:['Qualität'],updated:'2026-10-16'},
    {title:'Eine Aufgabe für einen Agenten',category:'KI-Grundlagen',description:'Eine eng beschriebene Aufgabe macht Ein- und Ausgaben leichter überprüfbar.',tags:['Agenten'],updated:'2026-10-15'},
    {title:'Wissen mit Schlagwörtern ordnen',category:'Wissensmanagement',description:'Wenige klare Schlagwörter verbinden Inhalte über einzelne Kategorien hinweg.',tags:['Struktur'],updated:'2026-10-14'},
    {title:'Automationen klein beginnen',category:'Automatisierung',description:'Ein überschaubarer Ablauf mit Demo-Eingaben bildet den Anfang eines Workflow-Entwurfs.',tags:['Workflows'],updated:'2026-10-13'},
    {title:'Projektideen sichtbar machen',category:'Projekte',description:'Ziel, nächste Schritte und ein fiktives Ergebnis machen eine Idee greifbar.',tags:['Portfolio'],updated:'2026-10-12'},
    {title:'Eine wöchentliche Wissensrunde',category:'Wissensmanagement',description:'Neue Einträge durchsehen, doppelte Gedanken verbinden und offene Fragen sammeln.',tags:['Reflexion'],updated:'2026-10-11'}
  ],
  agents:[
    {title:'Wissenskurator',description:'Ordnet kurze Notizen passenden Themen zu.',input:'Eine erfundene Notiz',output:'Kategorie und Schlagwörter',icon:'▤'},
    {title:'Ideenpartner',description:'Entwickelt aus einem Thema mögliche Projektansätze.',input:'Ein fiktives Themenfeld',output:'Drei mögliche Projektideen',icon:'✳'},
    {title:'Begriffserklärer',description:'Erklärt technische Begriffe in einfacher Sprache.',input:'Ein Begriff aus dem KI-Lexikon',output:'Erklärung mit einem kurzen Beispiel',icon:'Aa'}
  ],
  workflows:[
    {title:'Notizen in Wissen verwandeln',description:'Ein möglicher Weg von einem Gedanken zu einem geordneten Eintrag.',steps:['Demo-Notiz erfassen','Thema zuordnen','Wissenskarte vorbereiten']},
    {title:'Eine Wissensübersicht vorbereiten',description:'Ein Beispiel für eine regelmäßige Zusammenstellung neuer Inhalte.',steps:['Demo-Einträge sammeln','Nach Themen gruppieren','Übersicht entwerfen']},
    {title:'Projektideen strukturieren',description:'Ein fiktiver Ablauf, der aus einer Idee eine Projektbeschreibung macht.',steps:['Demo-Idee auswählen','Ziel formulieren','Portfolio-Entwurf vorbereiten']}
  ],
  glossary:[
    {term:'Agent',definition:'Ein digitaler Helfer, der für eine bestimmte Aufgabe Werkzeuge und gegebenenfalls ein KI-Modell nutzt.'},
    {term:'API',definition:'Eine technische Schnittstelle, über die Programme nach festgelegten Regeln miteinander Daten austauschen.'},
    {term:'Automatisierung',definition:'Ein Ablauf, bei dem ein Programm festgelegte Arbeitsschritte übernimmt.'},
    {term:'Demo-Daten',definition:'Erfundene Beispieldaten, mit denen sich Funktionen ohne echte Informationen zeigen lassen.'},
    {term:'HTML',definition:'Die Auszeichnungssprache, die Inhalte einer Webseite strukturiert, etwa Überschriften und Absätze.'},
    {term:'n8n',definition:'Ein Werkzeug zum Verbinden von Diensten und zum Zusammenstellen automatisierter Abläufe.'},
    {term:'Notion',definition:'Ein Werkzeug, in dem sich unter anderem Notizen, Seiten und Datenbanken organisieren lassen.'},
    {term:'Prompt',definition:'Die Eingabe an ein KI-Modell: zum Beispiel eine Frage, eine Aufgabe und hilfreicher Hintergrund.'},
    {term:'Sprachmodell',definition:'Ein KI-Modell, das anhand gelernter Muster Text verarbeitet und erzeugt. Seine Aussagen können Fehler enthalten.'},
    {term:'Webhook',definition:'Eine Server-Adresse, an die ein Programm eine Anfrage schickt, um einen Ablauf anzustoßen oder Daten zu übermitteln.'},
    {term:'Workflow',definition:'Eine festgelegte Abfolge von Arbeitsschritten, zum Beispiel Erfassen, Prüfen und Ablegen.'}
  ],
  projects:[
    {title:'Ein kleines Wissensarchiv',description:'Fiktives Ziel: Notizen schneller wiederfinden.',tools:['HTML','CSS','JavaScript'],result:'Beispielergebnis: eine geordnete Sammlung mit Themenkarten.',icon:'▤'},
    {title:'Der Ideenkompass',description:'Fiktives Ziel: aus einem Thema erste Projektansätze entwickeln.',tools:['Prompt-Entwurf','Wissensstruktur'],result:'Beispielergebnis: drei strukturierte Ideenskizzen.',icon:'✳'},
    {title:'Wissenspost der Woche',description:'Fiktives Ziel: neue Wissenseinträge übersichtlich zusammenstellen.',tools:['n8n-Konzept','Notion-Konzept'],result:'Beispielergebnis: der Entwurf einer wöchentlichen Übersicht.',icon:'⇄'}
  ]
};
