// ════════════════════════════════════════════════════════════════
// Supabase Data Layer — NCA School E-Learning Platform
// Bridges localStorage (data.js) with Supabase backend
// Manages ALL users through Supabase Auth + users table
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

  // ─── Cache ───
  var dataCache = {};
  var syncInProgress = {};

  // ─── Utility: map a localStorage user to Supabase users table format ───
  function mapUserToRow(u) {
    return {
      id: u.id,
      name: u.name || u.full_name || '',
      email: u.email || '',
      password: u.password || '',
      role: u.role || 'student',
      avatarUrl: u.avatarUrl || u.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60',
      classId: u.classId || u.class_id || null,
      subjectIds: JSON.stringify(u.subjectIds || []),
      assignedSubjectIds: JSON.stringify(u.assignedSubjectIds || []),
      assignedClassIds: JSON.stringify(u.assignedClassIds || []),
      enrolledSubjectIds: JSON.stringify(u.enrolledSubjectIds || []),
      studentId: u.studentId || u.student_id || null,
      phone: u.phone || null,
      subjectSpecialty: u.subjectSpecialty || u.subject_specialty || null,
      supabase_uid: u.supabase_uid || null,
      isActive: u.isActive !== undefined ? u.isActive : true
    };
  }

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
          try { localStorage.setItem(localKey, JSON.stringify(res.data)); } catch(e) {}
        }
        loaded++;
        if (loaded >= total && callback) callback();
      });
    });
  }

  // ─── Sync data to Supabase ───
  function syncToSupabase(localKey, data) {
    var table = TABLE_MAP[localKey];
    if (!table || syncInProgress[localKey]) return;

    syncInProgress[localKey] = true;
    dataCache[localKey] = data;

    if (!Array.isArray(data)) {
      client.from(table).upsert(data, { onConflict: 'id' }).then(function(res) {
        syncInProgress[localKey] = false;
        if (res.error) console.warn('[SupabaseData] Error syncing ' + table + ':', res.error.message);
      });
      return;
    }

    client.from(table).delete().neq('id', 0).then(function(delRes) {
      if (delRes.error) { syncInProgress[localKey] = false; console.warn('[SupabaseData] Error clearing ' + table + ':', delRes.error.message); return; }
      if (data.length === 0) { syncInProgress[localKey] = false; return; }
      client.from(table).insert(data).then(function(insRes) {
        syncInProgress[localKey] = false;
        if (insRes.error) console.warn('[SupabaseData] Error inserting ' + table + ':', insRes.error.message);
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // USER MANAGEMENT — Override window.db user functions
  // ════════════════════════════════════════════════════════════════

  var db = window.db;
  if (!db) return;

  // Save original login for fallback
  var _origLogin = db.login;

  // ─── Login: use Supabase Auth ───
  db.login = async function(email, password) {
    try {
      var res = await client.auth.signInWithPassword({ email: email, password: password });
      if (res.error) return { error: res.error.message };

      // Fetch profile from users table
      var uid = res.data.user.id;
      var profileRes = await client.from('users').select('*').eq('supabase_uid', uid).maybeSingle();
      var profile = profileRes.data;

      if (profile) {
        // Update supabase_uid if not set
        if (!profile.supabase_uid) {
          await client.from('users').update({ supabase_uid: uid }).eq('id', profile.id);
        }
        localStorage.setItem('current_user', JSON.stringify(profile));
        db._currentUser = profile;
        return { user: profile };
      }

      // Profile not found — create from local seed
      var localUsers = db.getUsers();
      var match = localUsers.find(function(u) { return u.email && u.email.toLowerCase() === email.toLowerCase(); });
      if (match) {
        var row = mapUserToRow(match);
        row.supabase_uid = uid;
        await client.from('users').upsert(row, { onConflict: 'id' });
        localStorage.setItem('current_user', JSON.stringify(match));
        db._currentUser = match;
        return { user: match };
      }

      return { error: 'No profile found. Contact administrator.' };
    } catch(e) {
      return { error: e.message };
    }
  };

  // ─── Logout: sign out from Supabase + clear local session ───
  var _origLogout = db.logout;
  db.logout = function() {
    client.auth.signOut();
    localStorage.removeItem('current_user');
    db._currentUser = null;
    if (_origLogout) _origLogout();
  };

  // ─── Get current user: prefer Supabase session ───
  db.getCurrentUser = function() {
    if (db._currentUser) return db._currentUser;
    var raw = localStorage.getItem('current_user');
    if (raw) {
      try { db._currentUser = JSON.parse(raw); return db._currentUser; } catch(e) {}
    }
    return null;
  };

  // ─── Set current user: persist to localStorage ───
  db.setCurrentUser = function(user) {
    db._currentUser = user;
    localStorage.setItem('current_user', JSON.stringify(user));
  };

  // ─── Get all users: from Supabase ───
  var _origGetUsers = db.getUsers;
  db.getUsers = function() {
    // Try Supabase cache first
    if (dataCache['db_users']) return dataCache['db_users'];
    // Fall back to localStorage
    return _origGetUsers ? _origGetUsers() : [];
  };

  // ─── Create user: insert into Supabase users table ───
  var _origCreateUser = db.createUser;
  db.createUser = function(userData) {
    var localUsers = db.getUsers();
    var newId = localUsers.length > 0 ? Math.max.apply(Math, localUsers.map(function(u) { return u.id; })) + 1 : 1;
    var newUser = {
      id: newId,
      name: userData.name || userData.full_name || '',
      email: userData.email || '',
      password: userData.password || '',
      role: userData.role || 'student',
      avatarUrl: userData.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60',
      classId: userData.classId || null,
      subjectIds: userData.subjectIds || [],
      assignedSubjectIds: userData.assignedSubjectIds || [],
      assignedClassIds: userData.assignedClassIds || [],
      enrolledSubjectIds: userData.enrolledSubjectIds || [],
      studentId: userData.studentId || null,
      phone: userData.phone || null,
      subjectSpecialty: userData.subjectSpecialty || null,
      supabase_uid: null,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    localUsers.push(newUser);
    localStorage.setItem('db_users', JSON.stringify(localUsers));
    dataCache['db_users'] = localUsers;
    // Sync to Supabase
    client.from('users').insert(mapUserToRow(newUser)).then(function(res) {
      if (res.error) console.warn('[SupabaseData] Error creating user:', res.error.message);
    });
    return newUser;
  };

  // ─── Update user: patch in Supabase users table ───
  var _origUpdateUser = db.updateUser;
  db.updateUser = function(id, updates) {
    var localUsers = db.getUsers();
    var idx = -1;
    for (var i = 0; i < localUsers.length; i++) { if (localUsers[i].id === Number(id)) { idx = i; break; } }
    if (idx === -1) return null;
    var updated = Object.assign({}, localUsers[idx], updates);
    localUsers[idx] = updated;
    localStorage.setItem('db_users', JSON.stringify(localUsers));
    dataCache['db_users'] = localUsers;
    // Patch in Supabase
    var row = mapUserToRow(updated);
    delete row.password; // never sync passwords to public table
    client.from('users').update(row).eq('id', Number(id)).then(function(res) {
      if (res.error) console.warn('[SupabaseData] Error updating user:', res.error.message);
    });
    return updated;
  };

  // ─── Delete user ───
  if (!db.deleteUser) {
    db.deleteUser = function(id) {
      var localUsers = db.getUsers().filter(function(u) { return u.id !== Number(id); });
      localStorage.setItem('db_users', JSON.stringify(localUsers));
      dataCache['db_users'] = localUsers;
      client.from('users').delete().eq('id', Number(id)).then(function(res) {
        if (res.error) console.warn('[SupabaseData] Error deleting user:', res.error.message);
      });
    };
  }

  // ─── Seed users into Supabase if table is empty ───
  function seedUsersToSupabase() {
    var localUsers = db.getUsers();
    if (!localUsers || localUsers.length === 0) return;
    client.from('users').select('id').limit(1).then(function(check) {
      if (check.error || !check.data || check.data.length === 0) {
        var rows = localUsers.map(mapUserToRow);
        client.from('users').insert(rows).then(function(res) {
          if (res.error) console.warn('[SupabaseData] Error seeding users:', res.error.message);
          else console.log('[SupabaseData] Seeded ' + rows.length + ' users to Supabase.');
        });
      }
    });
  }

  // ─── Listen for Supabase auth state changes ───
  client.auth.onAuthStateChange(function(event, session) {
    if (event === 'SIGNED_OUT') {
      localStorage.removeItem('current_user');
      db._currentUser = null;
      window.dispatchEvent(new Event('auth_change'));
    }
    if (event === 'SIGNED_IN' && session) {
      // Refresh local user from Supabase
      client.from('users').select('*').eq('supabase_uid', session.user.id).maybeSingle().then(function(res) {
        if (res.data) {
          localStorage.setItem('current_user', JSON.stringify(res.data));
          db._currentUser = res.data;
        }
        window.dispatchEvent(new Event('auth_change'));
      });
    }
  });

  // ════════════════════════════════════════════════════════════════
  // DATA SYNC LAYER (unchanged)
  // ════════════════════════════════════════════════════════════════

  // ─── Intercept localStorage.setItem to sync to Supabase ───
  var originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.call(localStorage, key, value);
    if (TABLE_MAP[key] && key !== 'db_users') { // users handled separately above
      try {
        var parsed = JSON.parse(value);
        syncToSupabase(key, parsed);
      } catch(e) {}
    }
  };

  var originalGetItem = localStorage.getItem;
  var supabaseLoaded = false;
  localStorage.getItem = function(key) {
    if (dataCache[key] !== undefined) return JSON.stringify(dataCache[key]);
    return originalGetItem.call(localStorage, key);
  };

  // ─── Initial load from Supabase ───
  loadAllFromSupabase(function() {
    supabaseLoaded = true;
    console.log('[SupabaseData] Initial sync complete from Supabase.');
    seedUsersToSupabase();
    try { window.dispatchEvent(new Event('supabase_data_ready')); } catch(e) {}
    try { window.dispatchEvent(new Event('supabase_sync')); } catch(e) {}
  });

  // ─── Expose helpers ───
  window.supabaseData = {
    isReady: function() { return supabaseLoaded; },
    forceSync: function(localKey) {
      var raw = originalGetItem.call(localStorage, localKey);
      if (raw) { try { syncToSupabase(localKey, JSON.parse(raw)); } catch(e) {} }
    },
    syncAll: function() {
      Object.keys(TABLE_MAP).forEach(function(k) {
        if (k === 'db_users') return; // users synced via createUser/updateUser
        var raw = originalGetItem.call(localStorage, k);
        if (raw) { try { syncToSupabase(k, JSON.parse(raw)); } catch(e) {} }
      });
    },
    reloadFromSupabase: function(callback) { loadAllFromSupabase(callback); },
    getClient: function() { return client; }
  };

  // ─── Auth helpers ───
  window.supabaseAuth = {
    signUp: async function(email, password, userData) {
      var authRes = await client.auth.signUp({ email: email, password: password });
      if (authRes.error) return { error: authRes.error.message };
      var newUser = db.createUser(Object.assign({ email: email, password: password }, userData || {}));
      if (authRes.data.user) {
        await client.from('users').update({ supabase_uid: authRes.data.user.id }).eq('id', newUser.id);
      }
      return { user: newUser, authUser: authRes.data.user };
    },
    getSession: async function() {
      var res = await client.auth.getSession();
      return res.data.session;
    }
  };

  console.log('[SupabaseData] Layer initialized. Users managed via Supabase Auth.');
})();
