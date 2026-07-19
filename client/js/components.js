(function () {
  function getSchool() { var s = window.db ? JSON.parse(JSON.stringify(window.db.getSchoolInfo())) : {}; if (s.logoUrl) s.logoUrl = encodeURI(s.logoUrl); return s; }
  function getSettings() { return window.db ? window.db.getSiteSettings() : {}; }
  function resolveSocial(site, key) { return (site.socialLinks && site.socialLinks[key]) || '#'; }

  window.showToast = function(message, type) {
    type = type || "success";
    var c = document.getElementById("toast-container");
    if (!c) { c = document.createElement("div"); c.id = "toast-container"; document.body.appendChild(c); }
    var t = document.createElement("div");
    var cls = "bg-primary text-white border-0 shadow-lg", icon = '<i class="fa-solid fa-circle-info me-2"></i>';
    if (type === "success") { cls = "bg-success text-white border-0 shadow-lg"; icon = '<i class="fa-solid fa-circle-check me-2"></i>'; }
    else if (type === "error") { cls = "bg-danger text-white border-0 shadow-lg"; icon = '<i class="fa-solid fa-circle-exclamation me-2"></i>'; }
    else if (type === "warning") { cls = "bg-warning text-dark border-0 shadow-lg"; icon = '<i class="fa-solid fa-triangle-exclamation me-2"></i>'; }
    t.className = "toast show custom-toast align-items-center " + cls + " p-3 mb-2";
    t.innerHTML = '<div class="d-flex justify-content-between align-items-center"><div class="toast-body d-flex align-items-center p-0">' + icon + '<span>' + message + '</span></div><button type="button" class="btn-close btn-close-white ms-auto" onclick="this.closest(\'.toast\').remove()"></button></div>';
    c.appendChild(t);
    setTimeout(function() { t.style.opacity = "0"; t.style.transform = "translateX(50px)"; setTimeout(function() { t.remove(); }, 400); }, 4500);
  };

  function formatDateShort(dateString) {
    if (!dateString) return '';
    var date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  function loadAnnouncementsPanel() {
    // Announcements panel removed - notifications shown in scrolling bar only
  }

  window.toggleAnnouncementsPanel = function() {
    // Panel removed - no action needed
  };

  window.updateAnnouncementCount = function(count) {
    // Counter removed - no action needed
  };

  function renderHeader() {
    var header = document.querySelector("header.site-header");
    if (!header) return;
    header.className = "site-header";
    header.setAttribute("role", "banner");
    var school = getSchool();
    var site = getSettings();
    var user = window.db ? window.db.getCurrentUser() : null;
    var path = window.location.pathname.split("/").pop() || "index.html";
    var isActive = function(p) { return path === p ? ' class="active"' : ''; };
    var anns = window.db && window.db.getPublishedAnnouncements ? window.db.getPublishedAnnouncements() : [];
    var annItems = anns.length ? anns.sort(function(a,b){ var p={urgent:0,important:1,normal:2}; return (p[a.priority]||2)-(p[b.priority]||2); }).slice(0, 10) : [];
    var hasUrgent = annItems.some(function(a){ return a.priority === 'urgent'; });
    function tickerIcon(a) {
      if (a.priority === 'urgent') return '<i class="fa-solid fa-circle-exclamation me-1" style="color:#fde68a"></i>';
      if (a.priority === 'important') return '<i class="fa-solid fa-star me-1" style="color:#fde68a"></i>';
      return '<i class="fa-solid fa-bullhorn me-1"></i>';
    }
    var tickerHTML = annItems.length ? annItems.map(function(a){ return '<span>' + tickerIcon(a) + a.title + '</span>'; }).join('') + annItems.map(function(a){ return '<span>' + tickerIcon(a) + a.title + '</span>'; }).join('') : '<span>Welcome to ' + school.name + '</span>';

    var socialHTML = ['facebook','twitter','instagram','linkedin','youtube'].map(function(k){
      var icon = k === 'twitter' ? 'fa-x-twitter' : k === 'youtube' ? 'fa-youtube' : 'fa-' + k;
      return '<a href="' + resolveSocial(site, k) + '" aria-label="' + k + '" target="_blank" rel="noopener"><i class="fa-brands ' + icon + '" aria-hidden="true"></i></a>';
    }).join('');

    var loginDropdown = user ? '' :
      '<div class="nca-login-wrap dropdown">' +
        '<button class="nca-login-btn" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true" aria-label="Sign in as Administrator, Teacher, or Student"><i class="fa-solid fa-lock" aria-hidden="true"></i><span>Login</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>' +
        '<ul class="dropdown-menu dropdown-menu-end nca-login-dropdown">' +
          '<li><a class="dropdown-item" href="login.html?role=admin"><i class="fa-solid fa-shield-halved"></i> Administrator</a></li>' +
          '<li><a class="dropdown-item" href="login.html?role=teacher"><i class="fa-solid fa-chalkboard-user"></i> Teacher</a></li>' +
          '<li><a class="dropdown-item" href="login.html?role=student"><i class="fa-solid fa-user-graduate"></i> Student</a></li>' +
        '</ul>' +
      '</div>';

    var userSection = user ?
      '<div class="dropdown nca-user-dropdown">' +
        '<button class="nca-user-btn" data-bs-toggle="dropdown"><img src="' + (user.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=1e3a8a&color=fff') + '" alt="' + user.name + '" class="nca-user-avatar"><span class="nca-user-name">' + user.name + '</span><i class="fa-solid fa-chevron-down"></i></button>' +
        '<ul class="dropdown-menu dropdown-menu-end">' +
          '<li><a class="dropdown-item" href="' + (user.role === 'admin' ? 'admin-dashboard.html' : user.role === 'teacher' ? 'teacher-dashboard.html' : 'student-dashboard.html') + '"><i class="fa-solid fa-gauge"></i> Dashboard</a></li>' +
          '<li><hr class="dropdown-divider"></li>' +
          '<li><a class="dropdown-item text-danger" href="#" onclick="try{window.db.logout()}catch(e){}window.location.reload()"><i class="fa-solid fa-right-from-bracket"></i> Sign Out</a></li>' +
        '</ul>' +
      '</div>' : loginDropdown;

    header.innerHTML =
      '<div class="nca-topbar" id="nca-topbar">' +
         '<div class="container"><div class="nca-topbar-inner">' +
           '<div class="nca-topbar-left">' +
             '<span class="nca-topbar-item"><i class="fa-solid fa-phone"></i>' + (school.phone || '+250 791 684 429') + '</span>' +
             '<span class="nca-topbar-sep"></span>' +
             '<span class="nca-topbar-item"><i class="fa-solid fa-envelope"></i>' + (school.email || 'info@school.rw') + '</span>' +
             '<span class="nca-topbar-sep d-none d-md-inline"></span>' +
             '<span class="nca-topbar-item d-none d-md-inline"><i class="fa-solid fa-location-dot"></i>' + (school.address || 'Kigali, Rwanda') + '</span>' +
             '<span class="nca-topbar-sep d-none d-lg-inline"></span>' +
             '<span class="nca-topbar-item d-none d-lg-inline"><i class="fa-solid fa-clock"></i>' + (site.officeHours || school.officeHours || 'Mon-Fri 7:30AM-5PM') + '</span>' +
             '<div class="nca-notify-wrap d-none d-xl-inline">' +
               '<button class="nca-notify-trigger" id="ncaNotifyTrigger" aria-label="Notifications" aria-haspopup="true" aria-expanded="false">' +
                 '<i class="fa-solid fa-bell"></i>' +
                 '<span class="nca-notify-badge" id="ncaNotifyBadge">0</span>' +
               '</button>' +
               '<div class="nca-notify-dropdown" id="ncaNotifyDropdown">' +
                 '<div class="nca-notify-header"><h6><i class="fa-solid fa-bell me-2"></i>Notifications</h6><button class="nca-notify-mark-read" id="ncaMarkAllRead" title="Mark all as read"><i class="fa-solid fa-check-double"></i></button></div>' +
                 '<div class="nca-notify-list" id="ncaNotifyList"></div>' +
                 '<div class="nca-notify-footer"><a href="announcements.html">View all announcements</a></div>' +
               '</div>' +
             '</div>' +
           '</div>' +
           '<div class="nca-topbar-right">' +
             '<div class="nca-topbar-socials">' + socialHTML + '</div>' +
           '</div>' +
         '</div></div>' +
       '</div>' +
       '<nav class="nca-navbar" id="ncaMainNav" role="navigation" aria-label="Primary navigation">' +
         '<div class="container">' +
            '<a class="nca-brand" href="index.html">' +
              (school.logoUrl ? '<div class="nca-logo-wrap"><img src="' + school.logoUrl + '" alt="' + school.name + '" class="nca-logo"></div>' : '<div class="nca-brand-icon"><i class="fa-solid fa-graduation-cap"></i></div>') +
              '<div class="nca-brand-text"><span class="nca-brand-name">' + (school.shortName || 'HON-ACADEMY') + '</span><span class="nca-brand-sub">' + (school.motto || 'Excellence in Education') + '</span></div>' +
            '</a>' +
           '<button class="nca-hamburger" id="ncaHamburger" aria-label="Menu"><span></span><span></span><span></span></button>' +
           '<div class="nca-nav-collapse" id="ncaNavCollapse">' +
             '<ul class="nca-nav-list">' +
               '<li><a href="index.html"' + isActive('index.html') + '>Home</a></li>' +
                '<li class="nca-drop"><a href="#" class="nca-drop-toggle" role="button" tabindex="0">About <i class="fa-solid fa-chevron-down"></i></a><ul class="nca-submenu"><li><a href="about.html"' + (path === 'about.html' ? ' class="active"' : '') + '>About Us</a></li><li><a href="about-developer.html">About Developer</a></li><li><a href="teachers.html"' + (path === 'teachers.html' ? ' class="active"' : '') + '>Our Teachers</a></li></ul></li>' +
               '<li><a href="admissions.html"' + isActive('admissions.html') + '>Admissions</a></li>' +
               '<li class="nca-drop"><a href="#" class="nca-drop-toggle" role="button" tabindex="0">Academics <i class="fa-solid fa-chevron-down"></i></a><ul class="nca-submenu"><li><a href="subjects.html"' + (path === 'subjects.html' ? ' class="active"' : '') + '>Subjects</a></li><li><a href="digital-library.html"' + (path === 'digital-library.html' ? ' class="active"' : '') + '>Digital Library</a></li><li><a href="courses.html"' + (path === 'courses.html' ? ' class="active"' : '') + '>Courses</a></li><li><a href="marks.html"' + (path === 'marks.html' ? ' class="active"' : '') + '>Academic Marks</a></li><li><a href="lesson-plan-generator.html"' + (path === 'lesson-plan-generator.html' ? ' class="active"' : '') + '><i class="fa-solid fa-magic-wand-sparkles me-1"></i>21st Century Lesson Plan Generator</a></li></ul></li>' +
               '<li class="nca-drop"><a href="#" class="nca-drop-toggle" role="button" tabindex="0">News & Events <i class="fa-solid fa-chevron-down"></i></a><ul class="nca-submenu"><li><a href="announcements.html"' + (path === 'announcements.html' ? ' class="active"' : '') + '>Announcements</a></li><li><a href="news-events.html"' + (path === 'news-events.html' ? ' class="active"' : '') + '>All News & Events</a></li></ul></li>' +
               '<li><a href="gallery.html"' + isActive('gallery.html') + '>Gallery</a></li>' +
               '<li><a href="public-resources.html"' + isActive('public-resources.html') + '>Downloads</a></li>' +
               '<li><a href="contact.html"' + isActive('contact.html') + '>Contact</a></li>' +
             '</ul>' +
             '<div class="nca-nav-right">' +
               userSection +
             '</div>' +
           '</div>' +
         '</div>' +
        '</nav>' +
        '<div class="nca-announcement-bar' + (hasUrgent ? ' urgent-mode' : '') + '" id="ncaTickerBar">' +
          '<div class="container"><div class="nca-announcement-inner">' +
            '<span class="nca-ann-label"><i class="fa-solid fa-bell"></i> Notifications</span>' +
            '<div class="nca-ticker-wrap"><div class="nca-ticker">' + tickerHTML + '</div></div>' +
          '</div></div>' +
        '</div>';

    // ─── Navigation: Mobile HAMBURGER ─────────────────────────
    var ncaHamburger = document.getElementById('ncaHamburger');
    var ncaNavCollapse = document.getElementById('ncaNavCollapse');
    ncaHamburger.addEventListener('click', function() {
      ncaNavCollapse.classList.toggle('open');
      this.classList.toggle('open');
      if (!this.classList.contains('open')) {
        document.querySelectorAll('.nca-drop.show').forEach(function(d) { d.classList.remove('show'); });
      }
    });

    // ─── Navigation: Submenu toggle (click + keyboard + hover) ─
    document.querySelectorAll('.nca-drop-toggle').forEach(function(toggle) {
      var parent = toggle.closest('.nca-drop');
      toggle.setAttribute('aria-haspopup', 'true');
      if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');

      // Click: works on all devices (touch, mouse)
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        // Close sibling open dropdowns
        var siblings = parent.parentElement.querySelectorAll('.nca-drop.show');
        siblings.forEach(function(s) { if (s !== parent) { s.classList.remove('show'); var t = s.querySelector('.nca-drop-toggle'); if (t) t.setAttribute('aria-expanded', 'false'); } });
        var opening = !parent.classList.contains('show');
        parent.classList.toggle('show', opening);
        toggle.setAttribute('aria-expanded', opening);
      });

      // Hover: desktop only
      if (window.innerWidth > 992) {
        parent.addEventListener('mouseenter', function() { this.classList.add('show'); toggle.setAttribute('aria-expanded', 'true'); });
        parent.addEventListener('mouseleave', function() { this.classList.remove('show'); toggle.setAttribute('aria-expanded', 'false'); });
      }

      // Keyboard: toggle / close
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          parent.classList.remove('show'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus();
        }
        if (e.key === 'ArrowDown' && parent.classList.contains('show')) {
          e.preventDefault();
          var fl = parent.querySelector('.nca-submenu a');
          if (fl) fl.focus();
        }
      });
    });

    // Keyboard: navigate submenu items with arrow keys
    document.querySelectorAll('.nca-submenu').forEach(function(sm) {
      sm.addEventListener('keydown', function(e) {
        var items = this.querySelectorAll('a');
        var focused = this.querySelector('a:focus');
        if (!focused) return;
        var idx = Array.prototype.indexOf.call(items, focused);
        if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
        if (e.key === 'Escape') {
          var drop = this.closest('.nca-drop');
          var t = drop.querySelector('.nca-drop-toggle');
          drop.classList.remove('show'); t.setAttribute('aria-expanded', 'false'); t.focus();
        }
      });
    });

    // Close dropdown when clicking/tabbing outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nca-drop')) {
        document.querySelectorAll('.nca-drop.show').forEach(function(d) {
          d.classList.remove('show');
          var t = d.querySelector('.nca-drop-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nca-nav-list a').forEach(function(a) {
      a.addEventListener('click', function() {
        ncaNavCollapse.classList.remove('open');
        ncaHamburger.classList.remove('open');
      });
    });

    var lastScroll = 0;
    window.addEventListener('scroll', function() {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      var topbar = document.getElementById('nca-topbar');
      var navbar = document.querySelector('.nca-navbar');
      if (st > 60) {
        navbar.classList.add('nca-navbar-scrolled');
      } else {
        navbar.classList.remove('nca-navbar-scrolled');
      }
      if (st > 150) {
        if (st > lastScroll + 5) {
          if (topbar) topbar.style.marginTop = '-34px';
        } else if (st < lastScroll - 5) {
          if (topbar) topbar.style.marginTop = '0';
        }
      } else {
        if (topbar) topbar.style.marginTop = '0';
      }
      lastScroll = st;
    });

    // ─── Notification Panel ─────────────────────────────────────
    var notifyTrigger = document.getElementById('ncaNotifyTrigger');
    var notifyDropdown = document.getElementById('ncaNotifyDropdown');
    var notifyBadge = document.getElementById('ncaNotifyBadge');
    var notifyList = document.getElementById('ncaNotifyList');
    var markAllBtn = document.getElementById('ncaMarkAllRead');

    function priorityIcon(p) {
      if (p === 'urgent') return '<i class="fa-solid fa-circle-exclamation nca-notif-priority urgent"></i>';
      if (p === 'important') return '<i class="fa-solid fa-star nca-notif-priority important"></i>';
      return '<i class="fa-solid fa-circle-info nca-notif-priority normal"></i>';
    }
    function timeAgo(dateStr) {
      var diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
      if (diff < 60) return 'Just now';
      if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
      if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
      return Math.floor(diff / 86400) + 'd ago';
    }
    function renderNotifications() {
      var user = window.db ? window.db.getCurrentUser() : null;
      var anns = user && window.db.getNotifications ? window.db.getNotifications(user) : [];
      var count = user && window.db.getUnreadCount ? window.db.getUnreadCount(user) : 0;
      if (notifyBadge) {
        notifyBadge.textContent = count > 99 ? '99+' : count;
        notifyBadge.style.display = count > 0 ? 'flex' : 'none';
      }
      if (!notifyList) return;
      if (anns.length === 0) {
        notifyList.innerHTML = '<div class="nca-notif-empty"><i class="fa-solid fa-bell-slash"></i><span>No notifications</span></div>';
        return;
      }
      notifyList.innerHTML = anns.slice(0, 15).map(function(a) {
        var readCls = a.isRead ? '' : ' nca-notif-unread';
        var newCls = a.isNew ? ' nca-notif-new' : '';
        var pinHtml = a.pinned ? '<span class="nca-notif-pin"><i class="fa-solid fa-thumbtack"></i></span>' : '';
        return '<div class="nca-notif-item' + readCls + newCls + '" data-id="' + a.id + '" onclick="window.handleNotifClick(' + a.id + ')">' +
          '<div class="nca-notif-icon">' + priorityIcon(a.priority) + '</div>' +
          '<div class="nca-notif-body">' +
            '<div class="nca-notif-title">' + a.title + pinHtml + '</div>' +
            '<div class="nca-notif-meta"><span class="nca-notif-cat">' + (a.category || 'General') + '</span><span class="nca-notif-time">' + timeAgo(a.createdAt) + '</span></div>' +
          '</div>' +
          (a.isRead ? '' : '<div class="nca-notif-dot"></div>') +
        '</div>';
      }).join('');
    }

    window.handleNotifClick = function(annId) {
      var user = window.db ? window.db.getCurrentUser() : null;
      if (user && window.db.markAsRead) window.db.markAsRead(annId, user);
      renderNotifications();
      window.location.href = 'announcements.html?id=' + annId;
    };

    if (notifyTrigger) {
      notifyTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        var isOpen = notifyDropdown.classList.contains('nca-notify-open');
        notifyDropdown.classList.toggle('nca-notify-open');
        notifyTrigger.setAttribute('aria-expanded', !isOpen);
        if (!isOpen) renderNotifications();
      });
    }
    if (markAllBtn) {
      markAllBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        var user = window.db ? window.db.getCurrentUser() : null;
        if (user && window.db.markAllAsRead) window.db.markAllAsRead(user);
        renderNotifications();
        window.showToast('All notifications marked as read', 'success');
      });
    }
    document.addEventListener('click', function(e) {
      if (notifyDropdown && !notifyDropdown.contains(e.target) && notifyTrigger && !notifyTrigger.contains(e.target)) {
        notifyDropdown.classList.remove('nca-notify-open');
        if (notifyTrigger) notifyTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    renderNotifications();
    if (window.db && window.db.onAnnouncementChange) {
      window.db.onAnnouncementChange(function() { renderNotifications(); });
    }
    window.addEventListener('announcement_change', function() { renderNotifications(); });
    window.addEventListener('notification_read', function() { renderNotifications(); });
  }

  function renderFooter() {
    var footer = document.querySelector("footer.site-footer");
    if (!footer) return;
    footer.className = "site-footer";
    footer.setAttribute("role", "contentinfo");
    var school = getSchool();
    var site = getSettings();
    var partners = window.db ? window.db.getPartners() : [];
    var socialHTML = ['github','twitter','linkedin','youtube','facebook','instagram'].map(function(k){
      var icon = k === 'twitter' ? 'fa-x-twitter' : k === 'youtube' ? 'fa-youtube' : 'fa-' + k;
      return '<a href="' + resolveSocial(site, k) + '" aria-label="' + k + '" target="_blank" rel="noopener"><i class="fa-brands ' + icon + '" aria-hidden="true"></i></a>';
    }).join('');
    var partnerHTML = partners.length ? partners.map(function(p){ return '<span>' + p.name + '</span>'; }).join('<span class="nca-fpartner-sep">|</span>') : '';

    footer.innerHTML =
      '<footer class="nca-footer">' +
        '<div class="container">' +
          '<div class="nca-footer-grid">' +
            '<div class="nca-fcol">' +
              '<div class="nca-fbrand">' +
                (school.logoUrl ? '<div class="nca-flogo-wrap"><img src="' + school.logoUrl + '" alt="' + school.name + '" class="nca-flogo"></div>' : '<div class="nca-fbrand-icon"><i class="fa-solid fa-graduation-cap"></i></div>') +
                '<div class="nca-fbrand-info"><h4>' + (school.shortName || 'HON-ACADEMY') + '</h4><span class="nca-fbrand-motto">' + (school.motto || '') + '</span></div>' +
              '</div>' +
              '<p class="nca-fdesc">' + (school.footerTagline || school.aboutIntro || 'Preparing learners today for tomorrow\'s opportunities through quality education, technology, and character development.') + '</p>' +
              '<div class="nca-fsocial">' + socialHTML + '</div>' +
            '</div>' +
            '<div class="nca-fcol"><h5>Quick Links</h5><ul>' +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="about.html">About Us</a></li>' +
              '<li><a href="admissions.html">Admissions</a></li>' +
              '<li><a href="subjects.html">Academics</a></li>' +
              '<li><a href="news-events.html">News & Events</a></li>' +
              '<li><a href="gallery.html">Gallery</a></li>' +
              '<li><a href="public-resources.html">Downloads</a></li>' +
              '<li><a href="contact.html">Contact Us</a></li>' +
            '</ul></div>' +
            '<div class="nca-fcol"><h5>Academic Levels</h5><ul>' +
              '<li><a href="subjects.html"><i class="fa-solid fa-school-flag"></i> Primary (P1\u2013P6)</a></li>' +
              '<li><a href="subjects.html"><i class="fa-solid fa-building"></i> Lower Secondary (S1\u2013S3)</a></li>' +
              '<li><a href="subjects.html"><i class="fa-solid fa-graduation-cap"></i> Upper Secondary (S4\u2013S6)</a></li>' +
              '<li><a href="subjects.html"><i class="fa-solid fa-wrench"></i> TVET Programmes</a></li>' +
              '<li><a href="digital-library.html"><i class="fa-solid fa-book"></i> Digital Library</a></li>' +
            '</ul></div>' +
            '<div class="nca-fcol"><h5>Contact</h5><ul class="nca-fcontact">' +
              '<li><i class="fa-solid fa-location-dot"></i><span>' + (school.address || 'KG 7 Avenue, Kigali, Rwanda') + '</span></li>' +
              '<li><i class="fa-solid fa-phone"></i><span>' + (school.phone || '+250 791 684 429') + '</span></li>' +
              '<li><i class="fa-solid fa-envelope"></i><span>' + (school.email || 'info@hon-academy.rw') + '</span></li>' +
              '<li><i class="fa-solid fa-clock"></i><span>' + (site.officeHours || school.officeHours || 'Mon-Fri 8AM-5PM') + '</span></li>' +
            '</ul></div>' +
          '</div>' +
          (partnerHTML ? '<div class="nca-fpartners"><span>Our Partners:</span>' + partnerHTML + '</div>' : '') +
          '<div class="nca-fnewsletter">' +
            '<div class="nca-fnewsletter-inner">' +
              '<div><i class="fa-solid fa-paper-plane"></i><span>' + (school.newsletterDescription || 'Subscribe to receive school news and announcements.') + '</span></div>' +
              '<div class="nca-fnewsletter-form">' +
                '<input type="email" id="ncaNewsletterInput" placeholder="Your email address..." class="nca-fnewsletter-input">' +
                '<button class="nca-fnewsletter-btn" onclick="subscribeNewsletter()">Subscribe</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="nca-fbottom">' +
          '<div class="container"><div class="nca-fbottom-inner">' +
            '<p>' + (school.copyrightText || '\u00a9 ' + new Date().getFullYear() + ' ' + (school.shortName || 'HON-ACADEMY') + '. All Rights Reserved.') + '</p>' +
            '<p class="small opacity-75 mb-0 fst-italic">' + (school.motto || '') + '</p>' +
            '<div class="nca-fbottom-links">' +
              '<a href="#">Privacy Policy</a><span>|</span>' +
              '<a href="#">Terms & Conditions</a>' +
            '</div>' +
          '</div></div>' +
        '</div>' +
      '</footer>';
  }

  window.subscribeNewsletter = function() {
    var inp = document.getElementById('ncaNewsletterInput');
    if (!inp || !inp.value || !inp.value.includes('@')) {
      window.showToast('Please enter a valid email address.', 'error');
      return;
    }
    window.showToast('Thank you for subscribing!', 'success');
  };

  function loadAccessibility() {
    try {
      if (window.__honA11yLoaded) return;
      var s = document.createElement("script");
      s.src = "js/accessibility.js";
      s.defer = true;
      document.body.appendChild(s);
    } catch (e) {}
  }

  function updateNavBrandIcons() {
    try {
      var school = getSchool();
      if (school && school.logoUrl) {
        document.querySelectorAll(".nav-brand-icon, .nca-brand-icon").forEach(function(el) {
          el.innerHTML = '<img src="' + school.logoUrl + '" alt="' + (school.name || 'Hon Academy') + '" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">';
          el.style.background = 'none';
          el.style.boxShadow = 'none';
          el.style.padding = '0';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.overflow = 'hidden';
        });
        document.querySelectorAll(".nca-fbrand-icon").forEach(function(el) {
          el.innerHTML = '<img src="' + school.logoUrl + '" alt="' + (school.name || 'Hon Academy') + '" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">';
          el.style.background = 'none';
          el.style.boxShadow = 'none';
          el.style.padding = '0';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.overflow = 'hidden';
        });
      }
    } catch (e) {}
  }

  function setFavicon() {
    try {
      var school = getSchool();
      if (!school || !school.logoUrl) return;
      var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/jpeg';
      link.rel = 'icon';
      link.href = school.logoUrl;
      document.head.appendChild(link);
      var apple = document.querySelector("link[rel*='apple-touch-icon']") || document.createElement('link');
      apple.rel = 'apple-touch-icon';
      apple.href = school.logoUrl;
      document.head.appendChild(apple);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function() {
    renderHeader();
    renderFooter();
    renderRoleSwitcherFAB();
    loadAccessibility();
    updateNavBrandIcons();
    setFavicon();
  });
  window.addEventListener("auth_change", function() {
    renderHeader();
    renderFooter();
    renderRoleSwitcherFAB();
    updateNavBrandIcons();
  });

  window.renderDashboardSidebar = function(activeNav) {
    var sidebar = document.getElementById("dashboard-sidebar");
    if (!sidebar) return;
    var user = window.db ? window.db.getCurrentUser() : null;
    if (!user) { window.location.href = "index.html"; return; }
    var items = [];
    if (user.role === "student") {
      items = [
        { name:"Dashboard", icon:"fa-gauge", href:"student-dashboard.html", id:"home" },
        { name:"My Classes", icon:"fa-chalkboard-user", href:"student-dashboard.html?tab=classes", id:"classes" },
        { name:"Resources", icon:"fa-folder-open", href:"resources-management.html", id:"resources" },
        { name:"Assignments", icon:"fa-clipboard-check", href:"student-dashboard.html?tab=assignments", id:"assignments" },
        { name:"Exams", icon:"fa-file-signature", href:"student-dashboard.html?tab=exams", id:"exams" },
        { name:"Grades", icon:"fa-chart-line", href:"marks.html", id:"marks" },
        { name:"Timetable", icon:"fa-calendar-day", href:"student-dashboard.html?tab=timetable", id:"timetable" },
        { name:"Attendance", icon:"fa-user-check", href:"student-dashboard.html?tab=attendance", id:"attendance" }
      ];
    } else if (user.role === "teacher") {
      items = [
        { name:"Dashboard", icon:"fa-gauge", href:"teacher-dashboard.html", id:"home" },
        { name:"Students", icon:"fa-users-rectangle", href:"students-management.html", id:"students" },
        { name:"Resources", icon:"fa-folder-open", href:"resources-management.html", id:"resources" },
        { name:"Assignments", icon:"fa-pen-clip", href:"teacher-dashboard.html?tab=assignments", id:"assignments" },
        { name:"Exams", icon:"fa-file-circle-check", href:"teacher-dashboard.html?tab=exams", id:"exams" },
        { name:"Gradebook", icon:"fa-square-poll-vertical", href:"marks.html", id:"marks" },
        { name:"Attendance", icon:"fa-clipboard-user", href:"teacher-dashboard.html?tab=attendance", id:"attendance" },
        { name:"Lessons", icon:"fa-calendar-days", href:"teacher-dashboard.html?tab=lessons", id:"lessons" }
      ];
    } else if (user.role === "admin") {
      items = [
        { name:"Dashboard", icon:"fa-gauge", href:"admin-dashboard.html", id:"home" },
        { name:"Users", icon:"fa-users-gear", href:"admin-dashboard.html?tab=users", id:"users" },
        { name:"Students", icon:"fa-graduation-cap", href:"students-management.html", id:"students" },
        { name:"Subjects", icon:"fa-book-bookmark", href:"admin-dashboard.html?tab=subjects", id:"subjects" },
        { name:"Resources", icon:"fa-folder-open", href:"resources-management.html", id:"resources" },
        { name:"CMS Content", icon:"fa-pen-to-square", href:"cms-admin.html", id:"cms" },
        { name:"Documents", icon:"fa-file", href:"documents-management.html", id:"documents" },
        { name:"Exams", icon:"fa-file-shield", href:"admin-dashboard.html?tab=exams", id:"exams" },
        { name:"Reports", icon:"fa-chart-pie", href:"admin-dashboard.html?tab=reports", id:"reports" },
        { name:"Settings", icon:"fa-gears", href:"admin-dashboard.html?tab=settings", id:"settings" }
      ];
    }
    sidebar.innerHTML =
      '<div class="d-flex align-items-center gap-3 pb-3 mb-3 border-bottom">' +
        '<img src="' + user.avatarUrl + '" alt="' + user.name + '" class="rounded-circle border" style="width:42px;height:42px;object-fit:cover;">' +
        '<div><h6 class="mb-0 text-dark fw-bold" style="font-size:14px;">' + user.name + '</h6>' +
        '<span class="badge bg-primary text-capitalize" style="font-size:10px;">' + user.role + '</span></div>' +
      '</div>' +
      '<div class="nav nav-pills flex-column gap-1">' +
        items.map(function(item) {
          var act = activeNav === item.id ? 'active' : '';
          return '<a href="' + item.href + '" class="nav-link py-2 px-3 d-flex align-items-center gap-2 small fw-semibold rounded ' + act + '" tabindex="0"><i class="fa-solid ' + item.icon + '" style="width:18px;text-align:center;"></i><span>' + item.name + '</span></a>';
        }).join('') +
      '</div>' +
      '<div class="mt-4 pt-3 border-bottom"><a href="index.html" class="nav-link text-muted small d-flex align-items-center gap-2 py-2 px-3 rounded" tabindex="0"><i class="fa-solid fa-arrow-left" style="width:18px;text-align:center;"></i><span>Landing Page</span></a></div>';

    // Mobile toggle: ensure toggle button and overlay exist
    var toggleBtn = document.getElementById("dashSidebarToggle");
    if (!toggleBtn) {
      toggleBtn = document.createElement("button");
      toggleBtn.id = "dashSidebarToggle";
      toggleBtn.className = "dashboard-sidebar-toggle";
      toggleBtn.setAttribute("aria-label", "Toggle sidebar");
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      sidebar.parentNode.insertBefore(toggleBtn, sidebar.nextSibling);
    }
    var overlay = document.getElementById("dashSidebarOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "dashSidebarOverlay";
      overlay.className = "dashboard-sidebar-overlay";
      sidebar.parentNode.insertBefore(overlay, toggleBtn.nextSibling);
    }

    function closeSidebar() { sidebar.classList.remove("open"); overlay.classList.remove("open"); toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'; toggleBtn.setAttribute("aria-expanded", "false"); }
    function toggleSidebar() {
      var opening = !sidebar.classList.contains("open");
      sidebar.classList.toggle("open", opening);
      overlay.classList.toggle("open", opening);
      toggleBtn.innerHTML = opening ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      toggleBtn.setAttribute("aria-expanded", opening);
      if (opening) { var f = sidebar.querySelector(".nav-link:not(.text-muted)"); if (f) setTimeout(function() { f.focus(); }, 100); }
    }

    toggleBtn.onclick = toggleSidebar;
    toggleBtn.onkeydown = function(e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSidebar(); } };
    overlay.onclick = closeSidebar;
    overlay.onkeydown = function(e) { if (e.key === "Escape") closeSidebar(); };
    document.addEventListener("keydown", function(e) { if (e.key === "Escape" && sidebar.classList.contains("open")) closeSidebar(); });

    // Close sidebar on nav link click (mobile)
    sidebar.querySelectorAll(".nav-link").forEach(function(link) {
      link.addEventListener("click", function() { if (window.innerWidth <= 768) closeSidebar(); });
    });

    toggleBtn.style.display = window.innerWidth <= 768 ? "flex" : "none";
  };

  window.openLoginModal = function() { window.location.href = "login.html"; };
  window.closeLoginModal = function() {};

  window.selectMockUser = function(id) {
    var user = window.db.getUser(id);
    if (user) {
      window.db.setCurrentUser(user);
      window.showToast("Welcome back, " + user.name + "!", "success");
      setTimeout(function() {
        if (user.role === "student") window.location.href = "student-dashboard.html";
        else if (user.role === "teacher") window.location.href = "teacher-dashboard.html";
        else if (user.role === "admin") window.location.href = "admin-dashboard.html";
        else window.location.href = "index.html";
      }, 550);
    }
  };

  function renderRoleSwitcherFAB() {
    if (!window.db) return;
    var container = document.getElementById("role-switcher-fab");
    if (!container) { container = document.createElement("div"); container.id = "role-switcher-fab"; container.className = "role-switcher-fab"; document.body.appendChild(container); }
    var user = window.db.getCurrentUser();
    var role = user ? user.role : "Guest";
    var cls = role === "admin" ? "btn-purple" : role === "teacher" ? "btn-warning text-dark" : role === "student" ? "btn-primary" : "btn-secondary";
    container.innerHTML =
      '<div class="dropdown dropup">' +
        '<button class="btn ' + cls + ' shadow-lg d-flex align-items-center gap-2 py-2 px-3 small border-0" style="border-radius:20px;" data-bs-toggle="dropdown"><i class="fa-solid fa-user-lock"></i><span class="text-uppercase small fw-bold">' + role + '</span></button>' +
        '<ul class="dropdown-menu shadow-lg border-0 rounded-3 mb-2" style="font-size:13px;">' +
          '<li class="px-3 py-1 border-bottom"><span class="small text-muted fw-bold text-uppercase">Testing Role</span></li>' +
          '<li><button class="dropdown-item py-2" onclick="selectMockUser(1)"><span class="badge bg-primary d-inline-block me-2" style="width:8px;height:8px;border-radius:50%;padding:0;"></span> Student</button></li>' +
          '<li><button class="dropdown-item py-2" onclick="selectMockUser(2)"><span class="badge bg-warning d-inline-block me-2" style="width:8px;height:8px;border-radius:50%;padding:0;"></span> Teacher</button></li>' +
          '<li><button class="dropdown-item py-2" onclick="selectMockUser(3)"><span class="badge bg-purple d-inline-block me-2" style="width:8px;height:8px;border-radius:50%;padding:0;"></span> Admin</button></li>' +
          '<li><hr class="dropdown-divider"></li>' +
          '<li><button class="dropdown-item py-2 text-danger" onclick="try{window.db.logout()}catch(e){}window.location.href=\'index.html\'"> Sign Out</button></li>' +
        '</ul>' +
      '</div>';
  }

  var style = document.createElement("style");
  style.textContent = '.btn-purple{background-color:#8b5cf6!important;color:#fff!important}.btn-purple:hover{background-color:#7c3aed!important}';
  document.head.appendChild(style);
})();
