/* Wird ausschließlich von der generierten lokalen Prüfseite geladen. */
(async function () {
  'use strict';
  var results = [];
  var $ = function (id) { return document.getElementById(id); };
  function assert(condition, message) { if (!condition) throw new Error(message); }
  // Virtuelle Headless-Zeit garantiert keine requestAnimationFrame-Ereignisse.
  function nextFrame() { return new Promise(function (resolve) { setTimeout(resolve,40); }); }
  async function waitFor(condition) {
    for (var i=0; i<80; i++) { if (condition()) return; await new Promise(function (r) { setTimeout(r,25); }); }
    throw new Error('Zeitlimit beim Warten auf Browserzustand');
  }
  async function check(name, action) {
    try { await action(); results.push({name:name, passed:true}); }
    catch (error) { results.push({name:name, passed:false, error:error.message}); }
  }
  async function route(id) { location.hash = id; await waitFor(function () { return !$(id).hidden; }); await nextFrame(); }
  function input(id,value) { $(id).value=value; $(id).dispatchEvent(new Event('input',{bubbles:true})); }
  function reset(id) { $(id).reset(); }
  function visibleCount(id) { return $(id).children.length; }
  var externalRequests=[];
  await check('Lokaler Start und Dashboard',function () {
    assert(location.protocol==='file:','Kein file://-Start');
    assert(!$('dashboard').hidden,'Dashboard fehlt');
    assert(visibleCount('knowledge-list')===10,'Wissenseinträge fehlen');
    assert(visibleCount('glossary-list')===11,'Lexikonbegriffe fehlen');
    assert(Array.from($('metrics').querySelectorAll('strong')).map(function(n){return n.textContent;}).join(',')==='10,3,3,3','Dashboard-Zahlen falsch');
  });
  await check('Sechs Ansichten mit aktiver Navigation',async function () {
    for (var id of ['wissen','agenten','workflows','lexikon','portfolio','dashboard']) {
      await route(id);
      assert(document.querySelectorAll('.view:not([hidden])').length===1,'Mehrere Ansichten sichtbar');
      assert(document.querySelector('nav [aria-current="page"]').hash==='#'+id,'Aktiver Navigationspunkt falsch');
      assert(document.title.startsWith($('page-title').textContent),'Seitentitel falsch');
    }
  });
  await check('Browser-Verlauf zurück und vorwärts',async function () {
    await route('wissen'); await route('lexikon');
    history.back(); await waitFor(function(){return !$('wissen').hidden;});
    history.forward(); await waitFor(function(){return !$('lexikon').hidden;});
  });
  await check('Suche nach Titel und Schlagwort',async function () {
    await route('wissen'); input('knowledge-search','  GUTE PROMPTS  ');
    assert(visibleCount('knowledge-list')===1,'Titelsuche falsch');
    input('knowledge-search','Reflexion');
    assert(visibleCount('knowledge-list')===1 && $('knowledge-list').textContent.includes('Wissensrunde'),'Schlagwortsuche falsch');
  });
  await check('Kombinierter Filter, Leerzustand und Zurücksetzen',function () {
    input('knowledge-search','Prompts'); $('knowledge-category').value='Automatisierung';
    $('knowledge-category').dispatchEvent(new Event('change',{bubbles:true}));
    assert(visibleCount('knowledge-list')===0 && !$('knowledge-empty').hidden,'Leerzustand fehlt');
    input('knowledge-search',''); assert(visibleCount('knowledge-list')===2,'Kategorienfilter falsch');
    input('knowledge-search','zzzzzz'); assert($('knowledge-count').textContent.startsWith('0 '),'Ergebnisanzahl falsch');
    reset('knowledge-controls');
    assert(visibleCount('knowledge-list')===10 && $('knowledge-category').value==='' && $('knowledge-empty').hidden,'Reset falsch');
    assert(document.activeElement===$('knowledge-search'),'Reset-Fokus fehlt');
  });
  await check('Suchtext bleibt beim Ansichtswechsel erhalten',async function () {
    input('knowledge-search','Prompts');await route('portfolio');await route('wissen');
    assert($('knowledge-search').value==='Prompts' && visibleCount('knowledge-list')===1,'Suche geht verloren');
    reset('knowledge-controls');
  });
  await check('Lexikon: Erklärung durchsuchen, leeres Ergebnis und Reset',async function () {
    await route('lexikon'); input('glossary-search','SCHNITTSTELLE');
    assert(visibleCount('glossary-list')===1 && $('glossary-list').textContent.includes('API'),'Lexikonsuche falsch');
    input('glossary-search','zzzzzz'); assert($('glossary-list').hidden && !$('glossary-empty').hidden,'Lexikon-Leerzustand falsch');
    reset('glossary-controls'); assert(visibleCount('glossary-list')===11,'Lexikon-Reset falsch');
    var terms=Array.from($('glossary-list').querySelectorAll('dt')).map(function(n){return n.textContent;});
    assert(terms.join('|')===terms.slice().sort(function(a,b){return a.localeCompare(b,'de');}).join('|'),'Lexikon nicht alphabetisch');
  });
  await check('Native Detaildialoge: Inhalt, Fokus, modaler Hintergrund und Schließen',async function () {
    for (var pair of [['wissen','knowledge-list'],['agenten','agent-list'],['workflows','workflow-list'],['portfolio','portfolio-list'],['dashboard','recent-list']]) {
      await route(pair[0]); var button=$(pair[1]).querySelector('button');button.focus();button.click();
      assert($('detail-dialog').open && $('detail-dialog').matches(':modal'),'Dialog nicht modal');
      assert($('detail-title').textContent.length>0 && $('detail-body').textContent.length>0,'Detailinhalt fehlt');
      assert(document.activeElement===$('detail-close'),'Anfangsfokus falsch');
      $('main').focus(); assert($('detail-dialog').contains(document.activeElement),'Hintergrund nimmt Fokus an');
      $('detail-close').click();assert(!$('detail-dialog').open,'Dialog schließt nicht');
      await nextFrame();assert(document.activeElement===button,'Fokus kehrt nicht zurück: '+pair[1]);
    }
  });
  await check('Dialog schließt beim Ansichtswechsel',async function () {
    await route('wissen');$('knowledge-list').querySelector('button').click();await route('agenten');
    assert(!$('detail-dialog').open,'Dialog bleibt offen');
  });
  await check('Mobile Navigation und Escape-Ereignis',async function () {
    if (innerWidth>800) { assert(getComputedStyle(document.querySelector('.menu-toggle')).display==='none','Desktop-Menüknopf sichtbar');return; }
    var toggle=document.querySelector('.menu-toggle');toggle.click();
    assert(toggle.getAttribute('aria-expanded')==='true' && getComputedStyle($('navigation')).display!=='none','Mobiles Menü öffnet nicht');
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
    assert(toggle.getAttribute('aria-expanded')==='false' && document.activeElement===toggle,'Mobiles Menü schließt nicht');
    toggle.click();await route('wissen');assert(toggle.getAttribute('aria-expanded')==='false','Menü bleibt nach Navigation offen');
  });
  await check('Kein horizontaler Überlauf in sechs Ansichten',async function () {
    for (var id of ['dashboard','wissen','agenten','workflows','lexikon','portfolio']) {
      await route(id); assert(document.documentElement.scrollWidth<=innerWidth+1,id+': Überlauf '+document.documentElement.scrollWidth+' > '+innerWidth);
      if(id!=='lexikon') { var button=$(id).querySelector('.detail-button');if(button){button.click();assert($('detail-dialog').scrollWidth<=$('detail-dialog').clientWidth+1,'Dialog hat Überlauf');$('detail-close').click();} }
    }
  });
  await check('Demo-Hinweis sichtbar und keine externen Ressourcen',function () {
    var label=document.querySelector('.demo-label');assert(label.getBoundingClientRect().width>0,'Demo-Hinweis unsichtbar');
    externalRequests=performance.getEntriesByType('resource').filter(function(r){return /^https?:/i.test(r.name);}).map(function(r){return r.name;});
    assert(externalRequests.length===0,'Externe Ressourcen: '+externalRequests.join(', '));
  });
  await check('Textkontraste in allen sechs Ansichten',async function () {
    function rgba(value) { var parts=value.match(/[\d.]+/g).map(Number);return [parts[0],parts[1],parts[2],parts.length>3?parts[3]:1]; }
    function background(node) {
      var color=rgba(getComputedStyle(node).backgroundColor);
      if(color[3]===1)return color;
      var below=node.parentElement?background(node.parentElement):[255,255,255,1];
      return color.slice(0,3).map(function(channel,i){return channel*color[3]+below[i]*(1-color[3]);}).concat(1);
    }
    function luminance(color) {return color.slice(0,3).map(function(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}).reduce(function(sum,c,i){return sum+c*[0.2126,0.7152,0.0722][i];},0);}
    var failures=[];
    for(var id of ['dashboard','wissen','agenten','workflows','lexikon','portfolio']) {
      await route(id);
      var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      while(walker.nextNode()) {
        var text=walker.currentNode;var parent=text.parentElement;
        if(!text.textContent.trim()||!parent||parent.closest('[hidden],[aria-hidden="true"],script,style')||!parent.getClientRects().length)continue;
        var style=getComputedStyle(parent);if(style.visibility==='hidden')continue;
        var foreground=rgba(style.color),bg=background(parent);
        var first=luminance(foreground),second=luminance(bg);
        var ratio=(Math.max(first,second)+0.05)/(Math.min(first,second)+0.05);
        var large=parseFloat(style.fontSize)>=24||(parseFloat(style.fontSize)>=18.66&&parseInt(style.fontWeight,10)>=700);
        if(ratio<(large?3:4.5))failures.push(id+': '+text.textContent.trim().slice(0,45)+' ('+ratio.toFixed(2)+':1)');
      }
    }
    assert(!failures.length,failures.slice(0,8).join('; '));
  });
  await route('dashboard');
  var output=document.createElement('pre'); output.id='browser-test-results';output.hidden=true;
  output.textContent=JSON.stringify({userAgent:navigator.userAgent,viewport:{width:innerWidth,height:innerHeight,devicePixelRatio:devicePixelRatio},results:results,errors:window.__reviewErrors||[],externalRequests:externalRequests,manualPending:['Echte Tab- und Escape-Eingaben im nativen Dialog','Sichtprüfung der Screenshots und vollständige Screenreader-Prüfung']});
  document.body.append(output);
  if (window.parent !== window) window.parent.postMessage({type:'second-brain-review',report:JSON.parse(output.textContent)},'*');
})();
