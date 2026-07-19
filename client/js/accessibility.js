(function () {
  "use strict";
  if (window.__honA11yLoaded) return;
  window.__honA11yLoaded = true;

  /* ==================================================================
     Hon Academy — Accessibility & Inclusivity Engine v2
     WCAG 2.2 AA / UDL / Screen-reader / Keyboard / TTS / Visual
     ================================================================== */

  var CSS_HREF = "css/accessibility.css";
  var STORAGE_KEY = "honA11yPrefs";

  var DEFAULTS = {
    theme: "light", contrast: "normal", scale: "1",
    spacing: "normal", letterSpacing: "normal",
    dyslexia: false, reading: false, tts: false,
    lang: "en", focus: "normal",
    colorblind: "none", largeBtn: false,
    reduceMotion: false, cursor: "normal",
    ttsSpeed: 1, ttsVoice: ""
  };

  /* ---- Kinyarwanda translation (safe, exact-match) ---- */
  var DICT = {
    "Home":"Ahabanza","About":"Ibyerekeye","About Us":"Ibyacu","About Developer":"Iby'Umukoresha",
    "Our Teachers":"Abarimu Bacu","Admissions":"Kwiyandikisha","Academics":"Amasomo",
    "Subjects":"Amasomo","Digital Library":"Isomero rya Interineti","Courses":"Amasomo",
    "Academic Marks":"Amanota","News & Events":"Amahigwe n'Ibirori","Announcements":"Amatangazo",
    "All News & Events":"Amahigwe n'Ibirori Byose","Gallery":"Ishusho","Downloads":"Ibihari",
    "Contact":"Twandikire","Dashboard":"Dashibodi","Sign Out":"Gusohoka","Logout":"Gusohoka",
    "Login":"Kwinjira","Administrator":"Umulamu","Teacher":"Uwarimu","Student":"Umwishyizi",
    "Settings":"Igenamiterere","Profile":"Umwirondoro","Save":"Kubika","Cancel":"Guhagarika",
    "Reset":"Gusubiza","Submit":"Ohereza","Search":"Shakisha","Close":"Ufunga","Menu":"Imenyuryo",
    "Accessibility":"Ubushobozi","Dark":"Muzingi","Light":"Urumuri",
    "High Contrast":"Umwanya Munini","Normal":"Bisanzwe","Wide":"Binini",
    "English":"Icyongereza","Kinyarwanda":"Ikinyarwanda","Language":"Ururimi",
    "Small":"Ntoya","Medium":"Hagati","Large":"Nini","Extra Large":"Nini Cyane","Huge":"Bihambaye",
    "Read Aloud":"Soma Ku ijwi","Read This Page":"Soma Uyu Mwanya",
    "Your preferences are saved":"Ibyo wahisemo birabitswe",
    "Accessibility & Inclusivity":"Ubushobozi n'Ubufatanye",
    "Appearance helps low-vision users":"Imiterere ifasha abana n'amaso",
    "Color Blind Mode":"Uburyo bw'Amabara",
    "None":"Nta na kimwe","Deuteranopia":"Deuteranopia","Protanopia":"Protanopia","Tritanopia":"Tritanopia",
    "Large Buttons":"Buto Nini","Reduced Animations":"Gukuraho Ibikorwa",
    "Letter Spacing":"Umwanya W'Inyuguti","Normal":"Bisanzwe","Wide":"Binini","Wider":"Birushije",
    "Normal Cursor":"Nzira Nzima","Large Cursor":"Nzira Nini",
    "Stop":"Hagarika","Pause":"Simba","Resume":"Komeza","Playing...":"Kuri ijwi...",
    "Speed":"Umuvudwi","Voice":"Ijwi"
  };

  /* ---- Helpers ---- */
  function loadArr(k, fb) { try { var d = localStorage.getItem(k); return d ? JSON.parse(d) : (fb||[]).slice(); } catch(e) { return (fb||[]).slice(); } }
  function saveArr(k, a) { try { localStorage.setItem(k, JSON.stringify(a)); } catch(e) {} }

  /* ---- Grade calc (kept for report context) ---- */
  var GRADE_BOUNDARIES = [
    { min:85, max:100, grade:"A", remark:"Excellent" },
    { min:70, max:84,  grade:"B", remark:"Very Good" },
    { min:55, max:69,  grade:"C", remark:"Good" },
    { min:40, max:54,  grade:"D", remark:"Satisfactory" },
    { min:0,  max:39,  grade:"F", remark:"Needs Improvement" }
  ];
  function calculateGrade(score, max, bounds) {
    var pct = max > 0 ? (score/max)*100 : 0;
    var b = (bounds || GRADE_BOUNDARIES);
    for (var i = 0; i < b.length; i++) { if (pct >= b[i].min && pct <= b[i].max) return { percentage: Math.round(pct), grade: b[i].grade, remark: b[i].remark }; }
    return { percentage: Math.round(pct), grade: "F", remark: "Needs Improvement" };
  }

  /* ---- Prefs ---- */
  var prefs = {};
  function loadPrefs() {
    var p = {};
    try { p = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(e) {}
    prefs = Object.assign({}, DEFAULTS, p);
    try {
      if (window.db && typeof window.db.getCurrentUser === "function") {
        var u = window.db.getCurrentUser();
        if (u && u.a11yPrefs) prefs = Object.assign({}, prefs, u.a11yPrefs);
      }
    } catch(e) {}
  }
  function savePrefs() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch(e) {}
    try {
      if (window.db && typeof window.db.getCurrentUser === "function" && typeof window.db.updateUser === "function") {
        var u = window.db.getCurrentUser();
        if (u && u.id) window.db.updateUser(u.id, { a11yPrefs: prefs });
      }
    } catch(e) {}
  }

  /* ---- Apply prefs to <html> ---- */
  function applyPrefs() {
    var h = document.documentElement;
    h.setAttribute("data-a11y-theme", prefs.theme);
    h.setAttribute("data-a11y-contrast", prefs.contrast);
    h.setAttribute("data-a11y-scale", prefs.scale);
    h.setAttribute("data-a11y-spacing", prefs.spacing);
    h.setAttribute("data-a11y-letter", prefs.letterSpacing);
    h.setAttribute("data-a11y-dyslexia", prefs.dyslexia ? "true" : "false");
    h.setAttribute("data-a11y-reading", prefs.reading ? "true" : "false");
    h.setAttribute("data-a11y-tts", prefs.tts ? "true" : "false");
    h.setAttribute("data-a11y-focus", prefs.focus);
    h.setAttribute("data-a11y-colorblind", prefs.colorblind);
    h.setAttribute("data-a11y-large-btn", prefs.largeBtn ? "true" : "false");
    h.setAttribute("data-a11y-reduce-motion", prefs.reduceMotion ? "true" : "false");
    h.setAttribute("data-a11y-cursor", prefs.cursor);
    h.setAttribute("lang", prefs.lang === "kin" ? "rw" : "en");
    applyLanguage(prefs.lang);
  }

  /* ---- Language ---- */
  function translateEl(el) {
    if (el.children.length > 0) return;
    var t = (el.textContent || "").trim();
    if (DICT[t]) {
      if (!el.dataset.a11yOrig) el.dataset.a11yOrig = t;
      el.textContent = DICT[t];
    }
  }
  function translateMatches() {
    if (prefs.lang === "kin") {
      document.querySelectorAll("nav a, .nca-nav-list a, .dropdown-item, .nav-link, header a, .site-header a, .portal-sidebar-main a, th, button, .btn").forEach(translateEl);
      document.querySelectorAll(".a11y-t").forEach(function(el) {
        var t = (el.textContent || "").trim();
        if (DICT[t]) { if (!el.dataset.a11yOrig) el.dataset.a11yOrig = t; el.textContent = DICT[t]; }
      });
    } else {
      document.querySelectorAll("[data-a11y-orig]").forEach(function(el) {
        el.textContent = el.dataset.a11yOrig;
        delete el.dataset.a11yOrig;
      });
    }
  }
  function applyLanguage(lang) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", translateMatches, { once: true });
    else translateMatches();
  }

  /* ================================================================
     TTS ENGINE — Play / Pause / Resume / Stop / Speed / Voice
     ================================================================ */
  var synth = window.speechSynthesis || null;
  var ttsState = { speaking: false, paused: false, current: null, utterance: null };

  function getVoices() {
    if (!synth) return [];
    var v = synth.getVoices();
    return v.filter(function(x) { return x.lang.startsWith("en") || x.lang.startsWith("rw"); });
  }
  function speak(text, opts) {
    if (!synth || !text) return;
    synth.cancel();
    opts = opts || {};
    var u = new SpeechSynthesisUtterance(text);
    u.lang = prefs.lang === "kin" ? "rw-RW" : "en-US";
    u.rate = prefs.ttsSpeed || 1;
    if (prefs.ttsVoice) {
      var allVoices = synth.getVoices();
      var match = allVoices.filter(function(v) { return v.name === prefs.ttsVoice; })[0];
      if (match) u.voice = match;
    }
    u.onend = function() { ttsState.speaking = false; ttsState.paused = false; updateTTSBar(); };
    u.onerror = function() { ttsState.speaking = false; ttsState.paused = false; updateTTSBar(); };
    ttsState.utterance = u;
    ttsState.speaking = true;
    ttsState.paused = false;
    synth.speak(u);
    updateTTSBar();
  }
  function pauseTTS() {
    if (synth && ttsState.speaking) { synth.pause(); ttsState.paused = true; updateTTSBar(); }
  }
  function resumeTTS() {
    if (synth && ttsState.paused) { synth.resume(); ttsState.paused = false; updateTTSBar(); }
  }
  function stopTTS() {
    if (synth) synth.cancel();
    ttsState.speaking = false; ttsState.paused = false;
    document.querySelectorAll(".a11y-tts-speaking").forEach(function(n) { n.classList.remove("a11y-tts-speaking"); });
    updateTTSBar();
  }
  function readMain() {
    var main = document.querySelector("main") || document.querySelector(".portal-main") || document.body;
    var blocks = main.querySelectorAll("h1,h2,h3,h4,p,li,label,th,td");
    var txt = [];
    blocks.forEach(function(b) {
      var t = (b.textContent || "").replace(/\s+/g, " ").trim();
      if (t && b.offsetParent !== null && t.length > 3) txt.push(t);
    });
    speak(txt.slice(0, 150).join(". "));
  }
  function speakElement(node) {
    if (!synth || !node) return;
    document.querySelectorAll(".a11y-tts-speaking").forEach(function(n) { n.classList.remove("a11y-tts-speaking"); });
    node.classList.add("a11y-tts-speaking");
    speak((node.textContent || "").replace(/\s+/g, " ").trim());
    setTimeout(function() { node.classList.remove("a11y-tts-speaking"); }, 3000);
  }
  function updateTTSBar() {
    var bar = document.getElementById("a11y-tts-bar");
    if (!bar) return;
    var playBtn = bar.querySelector(".a11y-tts-play");
    var pauseBtn = bar.querySelector(".a11y-tts-pause");
    var stopBtn = bar.querySelector(".a11y-tts-stop");
    if (playBtn) playBtn.classList.toggle("a11y-tts-active", !ttsState.speaking);
    if (pauseBtn) pauseBtn.classList.toggle("a11y-tts-active", ttsState.speaking && !ttsState.paused);
    if (stopBtn) stopBtn.classList.toggle("a11y-tts-active", ttsState.speaking);
    var txt = bar.querySelector(".a11y-tts-text");
    if (txt) txt.textContent = ttsState.speaking ? (ttsState.paused ? "Paused" : "Reading...") : "Ready";
  }
  function attachTTSClicks() {
    if (!synth) return;
    var main = document.querySelector("main") || document.querySelector(".portal-main");
    if (!main || main.dataset.a11yTtsBound) return;
    main.dataset.a11yTtsBound = "1";
    main.classList.add("a11y-tts-zone");
    main.addEventListener("click", function(e) {
      if (!prefs.tts) return;
      var node = e.target.closest("p,h1,h2,h3,h4,li,td,th,label");
      if (node) { e.preventDefault(); speakElement(node); }
    });
  }

  /* ================================================================
     VISUAL NOTIFICATION SYSTEM
     ================================================================ */
  function showA11yToast(msg, type) {
    type = type || "info";
    var container = document.getElementById("a11y-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "a11y-toast-container";
      container.setAttribute("aria-live", "polite");
      container.setAttribute("role", "status");
      document.body.appendChild(container);
    }
    var icons = { success: "\u2713", error: "\u2717", warning: "\u26A0", info: "\u2139" };
    var toast = document.createElement("div");
    toast.className = "a11y-toast a11y-toast-" + type;
    toast.innerHTML = '<span class="a11y-toast-icon">' + (icons[type] || icons.info) + '</span>' +
      '<span class="a11y-toast-msg">' + msg + '</span>' +
      '<button class="a11y-toast-close" aria-label="Dismiss">&times;</button>';
    toast.querySelector(".a11y-toast-close").addEventListener("click", function() { toast.remove(); });
    container.appendChild(toast);
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 6000);
  }
  // Hook existing showToast
  function hookShowToast() {
    if (window.__a11yToastHooked) return;
    var orig = window.showToast;
    if (typeof orig !== "function") return;
    window.__a11yToastHooked = true;
    window.showToast = function(msg, type) {
      showA11yToast(typeof msg === "string" ? msg.replace(/<[^>]*>/g, "") : "", type);
      return orig.apply(window, arguments);
    };
  }

  /* ================================================================
     ARIA / STRUCTURAL ENHANCEMENTS
     ================================================================ */
  function enhanceA11y() {
    // Skip target
    var main = document.querySelector("main") || document.querySelector(".portal-main") ||
               document.querySelector(".container.my-5") || document.body;
    if (main !== document.body && !main.id) {
      main.setAttribute("id", "main-content");
      main.setAttribute("tabindex", "-1");
    }
    // Label nav landmarks
    document.querySelectorAll("nav.nca-navbar, .portal-sidebar-main, .portal-sidebar-sub, #ncaMainNav").forEach(function(n) {
      if (!n.getAttribute("aria-label")) n.setAttribute("aria-label", "Primary navigation");
      if (n.tagName === "NAV" && !n.getAttribute("role")) n.setAttribute("role", "navigation");
    });
    // Banner + contentinfo landmarks
    var hdr = document.querySelector("header.site-header");
    if (hdr && !hdr.getAttribute("role")) hdr.setAttribute("role", "banner");
    var ftr = document.querySelector("footer.site-footer");
    if (ftr && !ftr.getAttribute("role")) ftr.setAttribute("role", "contentinfo");
    // Main landmark
    if (main !== document.body && main.tagName !== "MAIN" && !main.getAttribute("role")) {
      main.setAttribute("role", "main");
    }
    // Icon-only buttons: give accessible names
    document.querySelectorAll("button, a").forEach(function(el) {
      var hasText = (el.textContent || "").trim().length > 0;
      var hasImgAlt = el.querySelector("img[alt]");
      var named = el.getAttribute("aria-label") || el.getAttribute("title");
      if (!hasText && !hasImgAlt && !named) {
        var ico = el.querySelector("i[class*='fa-'], span[class*='fa-']");
        var cls = ico ? ico.className : "";
        var guess = cls.replace(/fa[a-z-]*/g, "").replace(/solid|regular|light|brands/g, "").trim();
        el.setAttribute("aria-label", guess || "Action");
      }
      if (el.tagName === "A" && el.getAttribute("href") === "#" && !el.getAttribute("role")) {
        el.setAttribute("role", "button");
      }
    });
    // Tables: add scope to th
    document.querySelectorAll("table").forEach(function(t) {
      if (!t.getAttribute("role")) t.setAttribute("role", "table");
      t.querySelectorAll("thead th").forEach(function(th) {
        if (!th.getAttribute("scope")) th.setAttribute("scope", "col");
      });
    });
    // Forms: link labels to inputs
    document.querySelectorAll("label").forEach(function(lbl) {
      var forId = lbl.getAttribute("for");
      if (!forId) {
        var inp = lbl.querySelector("input, select, textarea");
        if (inp && !inp.id) { inp.id = "a11y-" + Math.random().toString(36).slice(2, 8); lbl.setAttribute("for", inp.id); }
        else if (inp) lbl.setAttribute("for", inp.id);
      }
    });
    // Required fields: add aria-required
    document.querySelectorAll("input[required], select[required], textarea[required]").forEach(function(inp) {
      if (!inp.getAttribute("aria-required")) inp.setAttribute("aria-required", "true");
      var lbl = inp.closest("label") || document.querySelector('label[for="' + inp.id + '"]');
      if (lbl && !lbl.classList.contains("a11y-required")) lbl.classList.add("a11y-required");
    });
    // Live region for toasts
    if (!document.getElementById("a11y-live")) {
      var live = document.createElement("div");
      live.id = "a11y-live";
      live.className = "a11y-visually-hidden";
      live.setAttribute("aria-live", "polite");
      live.setAttribute("role", "status");
      document.body.appendChild(live);
    }
    hookShowToast();
    if (prefs.tts) attachTTSClicks();
  }

  /* ================================================================
     UI: Skip link, FAB, TTS bar, Settings panel
     ================================================================ */
  function injectCSS() {
    if (document.getElementById("a11y-css")) return;
    var l = document.createElement("link");
    l.id = "a11y-css"; l.rel = "stylesheet"; l.href = CSS_HREF;
    document.head.appendChild(l);
  }

  function buildUI() {
    if (document.getElementById("a11y-skip")) return;

    // Skip link
    var skip = document.createElement("a");
    skip.id = "a11y-skip"; skip.className = "a11y-skip";
    skip.href = "#main-content"; skip.textContent = "Skip to main content";
    document.body.appendChild(skip);

    // FAB
    var fab = document.createElement("button");
    fab.id = "a11y-fab"; fab.className = "a11y-fab"; fab.type = "button";
    fab.setAttribute("aria-haspopup", "dialog");
    fab.setAttribute("aria-controls", "a11y-panel");
    fab.setAttribute("aria-label", "Open accessibility settings");
    fab.innerHTML = '<span class="a11y-fab-ico" aria-hidden="true">\u267F</span><span>Accessibility</span>';
    document.body.appendChild(fab);

    // TTS bar
    var ttsBar = document.createElement("div");
    ttsBar.id = "a11y-tts-bar"; ttsBar.className = "a11y-tts-bar";
    ttsBar.setAttribute("role", "region");
    ttsBar.setAttribute("aria-label", "Text-to-speech controls");
    ttsBar.innerHTML =
      '<button class="a11y-tts-play" aria-label="Play" title="Play">\u25B6</button>' +
      '<button class="a11y-tts-pause" aria-label="Pause" title="Pause">\u23F8</button>' +
      '<button class="a11y-tts-stop" aria-label="Stop" title="Stop">\u23F9</button>' +
      '<div class="a11y-tts-progress"><div class="a11y-tts-progress-fill"></div></div>' +
      '<span class="a11y-tts-text">Ready</span>';
    document.body.appendChild(ttsBar);

    ttsBar.querySelector(".a11y-tts-play").addEventListener("click", function() {
      if (ttsState.paused) resumeTTS(); else if (!ttsState.speaking) readMain();
    });
    ttsBar.querySelector(".a11y-tts-pause").addEventListener("click", function() {
      if (ttsState.speaking && !ttsState.paused) pauseTTS(); else if (ttsState.paused) resumeTTS();
    });
    ttsBar.querySelector(".a11y-tts-stop").addEventListener("click", stopTTS);

    // Overlay
    var overlay = document.createElement("div");
    overlay.id = "a11y-overlay"; overlay.className = "a11y-overlay";
    overlay.setAttribute("tabindex", "-1");
    document.body.appendChild(overlay);

    // Settings Panel
    var panel = document.createElement("div");
    panel.id = "a11y-panel"; panel.className = "a11y-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "a11y-title");
    panel.innerHTML = buildPanelHTML();
    document.body.appendChild(panel);

    // Wire all controls
    wireControls(panel, fab, overlay);
    syncControls();
  }

  function buildPanelHTML() {
    return '<div class="a11y-panel-head">' +
      '<h2 id="a11y-title"><span aria-hidden="true">\u267F</span><span class="a11y-t">Accessibility & Inclusivity</span></h2>' +
      '<button class="a11y-panel-close" id="a11y-close" type="button" aria-label="Close settings"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
    '</div>' +
    '<div class="a11y-panel-body">' +

      // VISION
      '<div class="a11y-group">' +
        '<h3 class="a11y-t">Vision</h3>' +
        '<p class="a11y-hint a11y-t">Appearance helps low-vision users</p>' +
        '<div class="a11y-row" style="margin-top:8px">' +
          optBtn("theme","light","\u2600","Light") + optBtn("theme","dark","\u263E","Dark") +
        '</div>' +
        '<div class="a11y-row" style="margin-top:8px">' +
          optBtn("contrast","normal","\u25D0","Normal") + optBtn("contrast","high","\u25D1","High Contrast") +
        '</div>' +
      '</div>' +

      // TEXT SIZE
      '<div class="a11y-group">' +
        '<h3 class="a11y-t">Text Size</h3>' +
        '<div class="a11y-row">' +
          optBtn("scale","1","A","100%") + optBtn("scale","1.1","A","110%") +
          optBtn("scale","1.2","A","120%") + optBtn("scale","1.3","A","130%") +
          optBtn("scale","1.5","A","150%") + optBtn("scale","2","A","200%") +
        '</div>' +
      '</div>' +

      // SPACING
      '<div class="a11y-group">' +
        '<h3 class="a11y-t">Spacing</h3>' +
        '<div class="a11y-row">' +
          optBtn("spacing","normal","\u2261","Line Normal") +
          optBtn("spacing","wide","\u2261","Line Wide") +
        '</div>' +
        '<div class="a11y-row" style="margin-top:6px">' +
          optBtn("letterSpacing","normal","Ab","Letter Normal") +
          optBtn("letterSpacing","wide","Ab","Letter Wide") +
          optBtn("letterSpacing","wider","Ab","Letter Wider") +
        '</div>' +
      '</div>' +

      // READING
      '<div class="a11y-group">' +
        '<h3 class="a11y-t">Reading</h3>' +
        '<div class="a11y-row">' +
          toggleBtn("dyslexia","\uD83C\uDD70","Dyslexia Font") +
          toggleBtn("reading","\uD83D\uDCD6","Reading Mode") +
        '</div>' +
      '</div>' +

      // COLOR BLIND
      '<div class="a11y-group">' +
        '<h3 class="a11y-t">Color Blind Mode</h3>' +
        '<p class="a11y-hint">Color-blind-friendly palettes</p>' +
        '<div class="a11y-row" style="margin-top:6px">' +
          optBtn("colorblind","none","\u26AA","None") +
          optBtn("colorblind","deuteranopia","\uD83D\uDD35","Deuteranopia") +
          optBtn("colorblind","protanopia","\uD83D\uDFE3","Protanopia") +
          optBtn("colorblind","tritanopia","\uD83D\uDFE1","Tritanopia") +
        '</div>' +
      '</div>' +

      // TTS
      '<div class="a11y-group">' +
        '<h3 class="a11y-t">Text-to-Speech</h3>' +
        '<div class="a11y-row">' +
          toggleBtn("tts","\uD83D\uDD0A","Read Aloud") +
        '</div>' +
        '<div id="a11y-tts-options" style="' + (prefs.tts ? '' : 'display:none') + ';margin-top:8px">' +
          '<label class="a11y-hint">Speed</label>' +
          '<input type="range" class="a11y-range" id="a11y-tts-speed" min="0.5" max="2" step="0.25" value="' + (prefs.ttsSpeed||1) + '">' +
          '<div style="display:flex;justify-content:space-between;font-size:11px;color:#94a3b8"><span>0.5x</span><span id="a11y-speed-val">' + (prefs.ttsSpeed||1) + 'x</span><span>2x</span></div>' +
          '<label class="a11y-hint" style="margin-top:8px">Voice</label>' +
          '<select class="a11y-select" id="a11y-tts-voice"><option value="">Default</option></select>' +
          '<button class="a11y-btn a11y-btn-primary" id="a11y-readpage" type="button" style="width:100%;margin-top:10px">' +
            '<span class="a11y-t">Read This Page</span></button>' +
        '</div>' +
      '</div>' +

      // BUTTONS & CURSOR
      '<div class="a11y-group">' +
        '<h3>Interaction</h3>' +
        '<div class="a11y-row">' +
          toggleBtn("largeBtn","\uD83D\uDD18","Large Buttons") +
          toggleBtn("reduceMotion","\u23F8","Reduce Animations") +
        '</div>' +
        '<div class="a11y-row" style="margin-top:6px">' +
          optBtn("cursor","normal","\u27A1","Normal Cursor") +
          optBtn("cursor","large","\uD83D\uDDB1","Large Cursor") +
        '</div>' +
      '</div>' +

      // LANGUAGE
      '<div class="a11y-group">' +
        '<h3 class="a11y-t">Language</h3>' +
        '<div class="a11y-row">' +
          optBtn("lang","en","EN","English") +
          optBtn("lang","kin","KI","Kinyarwanda") +
        '</div>' +
      '</div>' +

      '<div class="a11y-saved" id="a11y-saved" aria-live="polite"></div>' +
      '<div class="a11y-actions">' +
        '<button class="a11y-btn a11y-btn-primary" id="a11y-save" type="button"><span class="a11y-t">Save</span></button>' +
        '<button class="a11y-btn a11y-btn-ghost" id="a11y-reset" type="button"><span class="a11y-t">Reset</span></button>' +
      '</div>' +
    '</div>' +
    '<div class="a11y-foot">WCAG 2.2 AA \u00B7 Universal Design for Learning \u00B7 Preferences saved to account</div>';
  }

  function optBtn(key, val, ico, label) {
    return '<button class="a11y-opt" type="button" data-a11y-type="opt" data-a11y-key="' + key +
      '" data-a11y-val="' + val + '" aria-pressed="false">' +
      '<span class="a11y-opt-ico" aria-hidden="true">' + ico + '</span>' +
      '<span class="a11y-t">' + label + '</span></button>';
  }
  function toggleBtn(key, ico, label) {
    return '<button class="a11y-opt" type="button" data-a11y-type="toggle" data-a11y-key="' + key +
      '" aria-pressed="false">' +
      '<span class="a11y-opt-ico" aria-hidden="true">' + ico + '</span>' +
      '<span class="a11y-t">' + label + '</span></button>';
  }

  function wireControls(panel, fab, overlay) {
    // Option/toggle buttons
    panel.querySelectorAll("[data-a11y-key]").forEach(function(b) {
      b.addEventListener("click", function() {
        var key = b.getAttribute("data-a11y-key");
        var val = b.getAttribute("data-a11y-val");
        var type = b.getAttribute("data-a11y-type");
        if (type === "toggle") prefs[key] = !prefs[key];
        else prefs[key] = val;
        // Show/hide TTS options
        if (key === "tts") {
          var opts = document.getElementById("a11y-tts-options");
          if (opts) opts.style.display = prefs.tts ? "" : "none";
          if (prefs.tts) { updateTTSBar(); document.getElementById("a11y-tts-bar").classList.add("open"); }
          else { document.getElementById("a11y-tts-bar").classList.remove("open"); stopTTS(); }
        }
        syncControls();
        applyPrefs();
      });
    });
    // TTS speed slider
    var speedSlider = document.getElementById("a11y-tts-speed");
    if (speedSlider) speedSlider.addEventListener("input", function() {
      prefs.ttsSpeed = parseFloat(this.value);
      document.getElementById("a11y-speed-val").textContent = this.value + "x";
    });
    // TTS voice selector
    var voiceSelect = document.getElementById("a11y-tts-voice");
    if (voiceSelect && synth) {
      function populateVoices() {
        var voices = synth.getVoices();
        voiceSelect.innerHTML = '<option value="">Default</option>';
        voices.forEach(function(v) {
          if (v.lang.startsWith("en") || v.lang.startsWith("rw")) {
            var opt = document.createElement("option");
            opt.value = v.name; opt.textContent = v.name + " (" + v.lang + ")";
            if (v.name === prefs.ttsVoice) opt.selected = true;
            voiceSelect.appendChild(opt);
          }
        });
      }
      populateVoices();
      if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = populateVoices;
      voiceSelect.addEventListener("change", function() { prefs.ttsVoice = this.value; });
    }
    // Read This Page
    var readBtn = document.getElementById("a11y-readpage");
    if (readBtn) readBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      if (!synth) { showA11yToast("Text-to-speech is not supported in this browser.", "error"); return; }
      readMain();
    });
    // FAB + close
    fab.addEventListener("click", openPanel);
    document.getElementById("a11y-close").addEventListener("click", closePanel);
    overlay.addEventListener("click", closePanel);
    // Save
    document.getElementById("a11y-save").addEventListener("click", function() {
      savePrefs();
      var s = document.getElementById("a11y-saved");
      s.textContent = "Your preferences are saved";
      showA11yToast("Accessibility preferences saved to your account.", "success");
      setTimeout(function() { s.textContent = ""; }, 2500);
    });
    // Reset
    document.getElementById("a11y-reset").addEventListener("click", function() {
      prefs = Object.assign({}, DEFAULTS);
      savePrefs();
      syncControls();
      applyPrefs();
      showA11yToast("Accessibility settings reset to defaults.", "info");
    });
    // Escape + focus trap
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
      if (e.key === "Tab" && panel.classList.contains("open")) trapFocus(e, panel);
    });
    // TTS bar visibility on load
    if (prefs.tts) {
      var bar = document.getElementById("a11y-tts-bar");
      if (bar) bar.classList.add("open");
    }
  }

  function syncControls() {
    document.querySelectorAll("[data-a11y-key]").forEach(function(b) {
      var key = b.getAttribute("data-a11y-key");
      var val = b.getAttribute("data-a11y-val");
      var type = b.getAttribute("data-a11y-type");
      if (type === "toggle") b.setAttribute("aria-pressed", prefs[key] ? "true" : "false");
      else b.setAttribute("aria-pressed", String(prefs[key]) === String(val) ? "true" : "false");
    });
  }

  function openPanel() {
    document.getElementById("a11y-panel").classList.add("open");
    document.getElementById("a11y-overlay").classList.add("open");
    var c = document.getElementById("a11y-close");
    if (c) c.focus();
  }
  function closePanel() {
    document.getElementById("a11y-panel").classList.remove("open");
    document.getElementById("a11y-overlay").classList.remove("open");
    var f = document.getElementById("a11y-fab");
    if (f) f.focus();
  }
  function trapFocus(e, container) {
    var f = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ================================================================
     KEYBOARD SHORTCUTS
     ================================================================ */
  function initKeyboardShortcuts() {
    document.addEventListener("keydown", function(e) {
      // Alt+A = toggle accessibility panel
      if (e.altKey && e.key === "a") {
        e.preventDefault();
        var panel = document.getElementById("a11y-panel");
        if (panel && panel.classList.contains("open")) closePanel();
        else openPanel();
      }
      // Alt+R = read page
      if (e.altKey && e.key === "r" && prefs.tts) {
        e.preventDefault();
        if (ttsState.speaking) stopTTS();
        else readMain();
      }
      // Alt+S = stop TTS
      if (e.altKey && e.key === "s" && prefs.tts) {
        e.preventDefault();
        stopTTS();
      }
    });
  }

  /* ================================================================
     INIT
     ================================================================ */
  function init() {
    injectCSS();
    buildUI();
    enhanceA11y();
    applyPrefs();
    initKeyboardShortcuts();
    if (prefs.tts) {
      var bar = document.getElementById("a11y-tts-bar");
      if (bar) bar.classList.add("open");
      attachTTSClicks();
    }
    window.addEventListener("load", function() {
      enhanceA11y();
      if (prefs.tts) attachTTSClicks();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.__honA11yInit = init;
})();
