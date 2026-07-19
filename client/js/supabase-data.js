// ════════════════════════════════════════════════════════════════
// Supabase Data Layer — NCA School E-Learning Platform
// Bridges localStorage (data.js) with Supabase backend
// Load AFTER supabase-config.js and data.js
// ════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  var client = window.supabaseClient;
  if (!client) {
    console.warn('[SupabaseData] No client available — using localStorage only.');
    return;
  }

  // ─── Table name mapping: localStorage key → Supabase table ───
  var TABLE_MAP = {
    db_users:              'users',
    db_announcements:      'announcements',
    db_announcement_likes: 'announcement_likes',
    db_announcement_comments: 'announcement_comments',
    db_gallery:            'gallery',
    db_courses:            'courses',
    db_subjects:           'subjects',
    db_lessons:            'lessons',
    db_resources:          'resources',
    db_assignments:        'assignments',
    db_assessment_types:   'assessment_types',
    db_assessment_results: 'assessment_results',
    db_attendance:         'attendance',
    db_marks:              'marks',
    db_books:              'books',
    db_notification_read:  'notification_reads',
    cms_school_info:       'cms_school_info',
    cms_site_settings:     'cms_site_settings',
    cms_pages:             'cms_pages',
    cms_news:              'cms_news'
  };

  // ─── Cache: keep data in memory to avoid repeated Supabase calls ───
  var dataCache = {};
  var syncInProgress = {};

  // ─── Load all data from Supabase into cache + localStorage ───
  function loadAllFromSupabase(callback) {
    var tables = Object.keys(TABLE_MAP);
    var loaded = 0;
    var total = tables.length;

    tables.forEach(function(localKey) {
      var table = TABLE_MAP[localKey];
      client.from(table).select('*').then(function(res) {
        if (res.error) {
          console.warn('[SupabaseData] Error loading ' + table + ':', res.error.message);
        } else if (res.data && res.data.length > 0) {
          dataCache[localKey] = res.data;
          // Also write to localStorage as fallback
          try { localStorage.setItem(localKey, JSON.stringify(res.data)); } catch(e) {}
        }
        loaded++;
        if (loaded >= total && callback) callback();
      });
    });
  }

  // ─── Sync a single localStorage key to Supabase ───
  function syncToSupabase(localKey, data) {
    var table = TABLE_MAP[localKey];
    if (!table || syncInProgress[localKey]) return;

    syncInProgress[localKey] = true;
    dataCache[localKey] = data;

    if (!Array.isArray(data)) {
      // Single object (e.g., cms_school_info)
      client.from(table).upsert(data, { onConflict: 'id' }).then(function(res) {
        syncInProgress[localKey] = false;
        if (res.error) console.warn('[SupabaseData] Error syncing ' + table + ':', res.error.message);
      });
      return;
    }

    // Array: delete all and re-insert (simple approach)
    // For production, use proper diff-based sync
    client.from(table).delete().neq('id', 0).then(function(delRes) {
      if (delRes.error) {
        syncInProgress[localKey] = false;
        console.warn('[SupabaseData] Error clearing ' + table + ':', delRes.error.message);
        return;
      }
      if (data.length === 0) { syncInProgress[localKey] = false; return; }
      client.from(table).insert(data).then(function(insRes) {
        syncInProgress[localKey] = false;
        if (insRes.error) console.warn('[SupabaseData] Error inserting ' + table + ':', insRes.error.message);
      });
    });
  }

  // ─── Override window.db.save to sync to Supabase ───
  var originalDb = window.db;
  if (originalDb) {
    var originalSave = originalDb._supabaseSave;
    if (!originalSave) {
      // Wrap the save function in data.js if accessible
      // data.js uses a local `save()` function, not exposed on window.db
      // We intercept localStorage.setItem instead
    }
  }

  // ─── Intercept localStorage.setItem to sync to Supabase ───
  var originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.call(localStorage, key, value);
    // If this key maps to a Supabase table, sync it
    if (TABLE_MAP[key]) {
      try {
        var parsed = JSON.parse(value);
        syncToSupabase(key, parsed);
      } catch(e) {}
    }
  };

  // ─── Also intercept getOrInit-like reads: on init, prefer Supabase data ───
  // Monkey-patch the first `getOrInit` call to check Supabase first
  var originalGetItem = localStorage.getItem;
  var supabaseLoaded = false;
  localStorage.getItem = function(key) {
    // If we have cached Supabase data, return it
    if (dataCache[key] !== undefined) {
      return JSON.stringify(dataCache[key]);
    }
    return originalGetItem.call(localStorage, key);
  };

  // ─── Initial load from Supabase ───
  loadAllFromSupabase(function() {
    supabaseLoaded = true;
    console.log('[SupabaseData] Initial sync complete from Supabase.');

    // Dispatch event so the app can refresh
    try {
      var evt = new Event('supabase_data_ready');
      window.dispatchEvent(evt);
    } catch(e) {}

    // Also trigger a storage-like event for components to re-render
    try {
      var re = new Event('supabase_sync');
      window.dispatchEvent(re);
    } catch(e) {}
  });

  // ─── Expose helpers ───
  window.supabaseData = {
    isReady: function() { return supabaseLoaded; },
    forceSync: function(localKey) {
      var raw = originalGetItem.call(localStorage, localKey);
      if (raw) {
        try { syncToSupabase(localKey, JSON.parse(raw)); } catch(e) {}
      }
    },
    syncAll: function() {
      var keys = Object.keys(TABLE_MAP);
      keys.forEach(function(k) {
        var raw = originalGetItem.call(localStorage, k);
        if (raw) {
          try { syncToSupabase(k, JSON.parse(raw)); } catch(e) {}
        }
      });
    },
    reloadFromSupabase: function(callback) {
      loadAllFromSupabase(callback);
    }
  };

  console.log('[SupabaseData] Layer initialized. Syncing ' + Object.keys(TABLE_MAP).length + ' tables.');
})();
