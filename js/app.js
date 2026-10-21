(function () {
  'use strict';
  var data = window.SecondBrainData.load();
  var pages = {
    dashboard: ['Dashboard', 'Dein Wissen, deine Ideen und deine nächsten Schritte. An einem Ort.', 'ÜBERSICHT'],
    wissen: ['Wissensdatenbank', 'Gedanken festhalten. Themen verbinden. Wissen wiederfinden.', 'WISSEN'],
    agenten: ['KI-Agenten', 'Digitale Helfer für klar umrissene Aufgaben. Als Demo vorgestellt.', 'HELFER'],
    workflows: ['Workflows', 'Vom ersten Gedanken zum geordneten Ablauf.', 'ABLÄUFE'],
    lexikon: ['KI-Lexikon', 'Technische Begriffe verstehen, Schritt für Schritt.', 'BEGRIFFE'],
    portfolio: ['KI-Portfolio', 'Ein Raum für Ideen, Experimente und mögliche Projekte.', 'PROJEKTE']
  };
  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function badge(text) { return element('span', 'tag', text); }
  var dialog = document.getElementById('detail-dialog');
  var dialogOpener;
  function showDetail(title, fields, opener) {
    dialogOpener = opener;
    document.getElementById('detail-title').textContent = title;
    var body = document.getElementById('detail-body');
    body.replaceChildren();
    var list = element('dl', 'detail-fields');
    fields.forEach(function (field) {
      var group = element('div');
      group.append(element('dt', '', field[0]), element('dd', '', field[1]));
      list.append(group);
    });
    body.append(list);
    dialog.showModal();
  }
  document.getElementById('detail-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () { if (dialogOpener && dialogOpener.isConnected) dialogOpener.focus(); });
  function addDetailButton(parent, title, fields) {
    var button = element('button', 'detail-button', 'Details ansehen ↗');
    button.type = 'button';
    button.setAttribute('aria-label', 'Details ansehen: ' + title);
    button.addEventListener('click', function () { showDetail(title, fields, button); });
    parent.append(button);
  }
  function knowledgeFields(item) {
    return [['Beschreibung', item.description], ['Kategorie', item.category], ['Schlagwörter', item.tags.join(', ')], ['Demo-Änderungsdatum', item.updated.split('-').reverse().join('.')], ['Herkunft', 'Erfundener Beispielinhalt für dieses Knowledge Command Center.']];
  }
  function card(parentId, icon, label, title, description, tags) {
    var article = element('article', 'content-card');
    var symbol = element('span', 'card-icon', icon);
    symbol.setAttribute('aria-hidden', 'true');
    article.append(symbol, element('p', 'eyebrow', label), element('h2', '', title), element('p', '', description));
    if (tags && tags.length) {
      var meta = element('div', 'card-meta');
      tags.forEach(function (tag) { meta.append(badge(tag)); });
      article.append(meta);
    }
    document.getElementById(parentId).append(article);
    return article;
  }
  [
    ['Wissenseinträge', data.knowledge.length, '▤', 'Erfundene Wissenskarten', 'wissen'],
    ['KI-Agenten', data.agents.length, '✳', 'Als Beispiel vorgestellt', 'agenten'],
    ['Workflows', data.workflows.length, '⇄', 'Simulierte Abläufe', 'workflows'],
    ['Portfolio-Projekte', data.projects.length, '▧', 'Fiktive Projektideen', 'portfolio']
  ].forEach(function (metric) {
    var link = element('a', 'metric');
    link.href = '#' + metric[4];
    var top = element('div', 'metric-top');
    var symbol = element('span', '', metric[2]);
    symbol.setAttribute('aria-hidden', 'true');
    top.append(element('span', '', metric[0]), symbol);
    link.append(top, element('strong', '', String(metric[1])), element('small', '', metric[3]));
    document.getElementById('metrics').append(link);
  });
  data.knowledge.slice().sort(function (a,b) { return b.updated.localeCompare(a.updated); }).slice(0,3).forEach(function (item) {
    var row = element('article', 'recent-item');
    var icon = element('span', 'recent-icon', '▤');
    icon.setAttribute('aria-hidden', 'true');
    var copy = element('div');
    var date = item.updated.split('-').reverse().join('.');
    copy.append(element('h3', '', item.title), element('p', '', item.category + ' · Demo-Stand ' + date));
    row.append(icon, copy, badge('Demo'));
    addDetailButton(copy, item.title, knowledgeFields(item));
    document.getElementById('recent-list').append(row);
  });
  function normalize(text) { return text.normalize('NFKC').toLocaleLowerCase('de-DE').trim(); }
  var knowledgeSearch = document.getElementById('knowledge-search');
  var knowledgeCategory = document.getElementById('knowledge-category');
  Array.from(new Set(data.knowledge.map(function (item) { return item.category; }))).sort(function (a,b) { return a.localeCompare(b,'de'); }).forEach(function (category) {
    var option = element('option', '', category);
    option.value = category;
    knowledgeCategory.append(option);
  });
  function renderKnowledge(query, category) {
    var terms = normalize(query).split(/\s+/).filter(Boolean);
    var items = data.knowledge.filter(function (item) {
      var text = normalize([item.title, item.description, item.category].concat(item.tags).join(' '));
      return (!category || item.category === category) && terms.every(function (term) { return text.includes(term); });
    });
    document.getElementById('knowledge-list').replaceChildren();
    items.forEach(function (item) {
      var article = card('knowledge-list', '▤', item.category, item.title, item.description, item.tags);
      addDetailButton(article, item.title, knowledgeFields(item));
    });
    document.getElementById('knowledge-count').textContent = items.length + ' von ' + data.knowledge.length + ' Wissenseinträgen';
    document.getElementById('knowledge-empty').hidden = items.length !== 0;
  }
  function updateKnowledge() { renderKnowledge(knowledgeSearch.value, knowledgeCategory.value); }
  knowledgeSearch.addEventListener('input', updateKnowledge);
  knowledgeCategory.addEventListener('change', updateKnowledge);
  document.getElementById('knowledge-controls').addEventListener('submit', function (event) { event.preventDefault(); updateKnowledge(); });
  document.getElementById('knowledge-controls').addEventListener('reset', function (event) {
    event.preventDefault();
    knowledgeSearch.value = ''; knowledgeCategory.value = '';
    updateKnowledge(); knowledgeSearch.focus();
  });
  updateKnowledge();
  data.agents.forEach(function (item) {
    var article = card('agent-list', item.icon, 'DEMO-AGENT', item.title, item.description);
    article.append(element('p', 'eyebrow', 'EINGABE'), element('p', '', item.input), element('p', 'eyebrow', 'BEISPIELAUSGABE'), element('p', '', item.output));
    var meta = element('div', 'card-meta');
    meta.append(badge('Simulation · nicht ausführbar'));
    article.append(meta);
    addDetailButton(article, item.title, [['Aufgabe', item.description], ['Beispiel-Eingabe', item.input], ['Erwartete Beispielausgabe', item.output], ['Status', 'Simulation. Kein KI-Modell verbunden und keine Ausführung möglich.']]);
  });
  data.workflows.forEach(function (item) {
    var article = card('workflow-list', '⇄', 'DEMO-WORKFLOW', item.title, item.description);
    var steps = element('ol', 'workflow-steps');
    item.steps.forEach(function (step) { steps.append(element('li', '', step)); });
    article.append(steps, badge('Simuliert · nicht verbunden'));
    addDetailButton(article, item.title, [['Ziel', item.description], ['Arbeitsschritte', item.steps.map(function (step,index) { return (index + 1) + '. ' + step; }).join('\n')], ['Status', 'Simulierter Ablauf. Es werden keine Daten übertragen oder gespeichert.']]);
  });
  var glossarySearch = document.getElementById('glossary-search');
  function renderGlossary() {
    var terms = normalize(glossarySearch.value).split(/\s+/).filter(Boolean);
    var items = data.glossary.filter(function (item) {
      var text = normalize(item.term + ' ' + item.definition);
      return terms.every(function (term) { return text.includes(term); });
    }).sort(function (a,b) { return a.term.localeCompare(b.term,'de'); });
    var list = document.getElementById('glossary-list');
    list.replaceChildren();
    items.forEach(function (item) {
      var entry = element('div', 'glossary-entry');
      entry.append(element('dt', '', item.term), element('dd', '', item.definition));
      list.append(entry);
    });
    list.hidden = items.length === 0;
    document.getElementById('glossary-empty').hidden = items.length !== 0;
    document.getElementById('glossary-count').textContent = items.length + ' von ' + data.glossary.length + ' Begriffen';
  }
  glossarySearch.addEventListener('input', renderGlossary);
  document.getElementById('glossary-controls').addEventListener('submit', function (event) { event.preventDefault(); renderGlossary(); });
  document.getElementById('glossary-controls').addEventListener('reset', function (event) {
    event.preventDefault(); glossarySearch.value = ''; renderGlossary(); glossarySearch.focus();
  });
  renderGlossary();
  data.projects.forEach(function (item) {
    var article = card('portfolio-list', item.icon, 'FIKTIVES DEMO-PROJEKT', item.title, item.description, item.tools);
    article.append(element('p', 'eyebrow', 'MÖGLICHES ERGEBNIS'), element('p', '', item.result));
    addDetailButton(article, item.title, [['Projektziel', item.description], ['Vorgesehene Werkzeuge', item.tools.join(', ')], ['Fiktives Ergebnis', item.result], ['Projektstatus', 'Erfundenes Demo-Projekt. Kein reales Kundenvorhaben und keine gemessenen Ergebnisse.']]);
  });
  var toggle = document.querySelector('.menu-toggle');
  var navigation = document.getElementById('navigation');
  function closeMenu() {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menü öffnen';
  }
  toggle.addEventListener('click', function () {
    var open = navigation.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Menü schließen' : 'Menü öffnen';
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
  });
  function showPage(moveFocus) {
    if (dialog.open) dialog.close();
    var id = location.hash.slice(1);
    // Der Sprunglink muss das Hauptfeld erreichen, ohne die Ansicht zu wechseln.
    if (id === 'main') return;
    if (!Object.prototype.hasOwnProperty.call(pages,id)) id = 'dashboard';
    document.querySelectorAll('.view').forEach(function (view) { view.hidden = view.id !== id; });
    navigation.querySelectorAll('a').forEach(function (link) {
      if (link.hash === '#' + id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.getElementById('page-title').textContent = pages[id][0];
    document.getElementById('page-description').textContent = pages[id][1];
    document.getElementById('breadcrumb').textContent = pages[id][2];
    document.title = pages[id][0] + ' · KI Second Brain';
    closeMenu();
    if (moveFocus) { document.getElementById('main').focus(); window.scrollTo(0,0); }
  }
  window.addEventListener('hashchange', function () { showPage(true); });
  showPage(false);
})();
