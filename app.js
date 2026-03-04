

  (function() {

    /* NAVBAR */
    var navbar   = document.getElementById('navbar');
    var navLinks = document.querySelectorAll('.nav-links a');
    var sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
      if (window.scrollY > 30) { navbar.classList.add('scrolled'); }
      else { navbar.classList.remove('scrolled'); }

      var cur = '';
      sections.forEach(function(s) {
        if (window.scrollY >= s.offsetTop - 160) { cur = s.id; }
      });
      navLinks.forEach(function(a) {
        if (a.getAttribute('href') === '#' + cur) { a.classList.add('active'); }
        else { a.classList.remove('active'); }
      });

      var btt = document.getElementById('btt');
      if (window.scrollY > 500) { btt.classList.add('show'); }
      else { btt.classList.remove('show'); }
    });

    /* MOBILE NAV */
    var ham  = document.getElementById('hamburger');
    var mNav = document.getElementById('mobileNav');

    ham.addEventListener('click', function() {
      ham.classList.toggle('open');
      mNav.classList.toggle('open');
    });

    window.closeMob = function() {
      ham.classList.remove('open');
      mNav.classList.remove('open');
    };

    /* SCROLL REVEAL */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); }
        });
      }, { threshold: 0.08 });
      revealEls.forEach(function(el) { obs.observe(el); });
    } else {
      revealEls.forEach(function(el) { el.classList.add('visible'); });
    }

    /* TERMINAL LINES */
    var tLines = document.querySelectorAll('.t-line');
    tLines.forEach(function(line, i) {
      if (line.classList.contains('show')) return;
      setTimeout(function() { line.classList.add('show'); }, 600 + i * 380);
    });

    /* BACK TO TOP */
    document.getElementById('btt').addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* CONTACT FORM */
    var form    = document.getElementById('contactForm');
    var nameEl  = document.getElementById('fname');
    var mailEl  = document.getElementById('femail');
    var msgEl   = document.getElementById('fmsg');
    var success = document.getElementById('formSuccess');

    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    function setErr(el, id, show) {
      if (show) { el.classList.add('err'); document.getElementById(id).classList.add('show'); }
      else { el.classList.remove('err'); document.getElementById(id).classList.remove('show'); }
    }

    [nameEl, mailEl, msgEl].forEach(function(el) {
      el.addEventListener('input', function() {
        el.classList.remove('err');
        document.querySelectorAll('.ferr').forEach(function(e) { e.classList.remove('show'); });
      });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var ok = true;
      if (!nameEl.value.trim())          { setErr(nameEl,  'fname-err',  true); ok = false; }
      if (!isEmail(mailEl.value.trim())) { setErr(mailEl,  'femail-err', true); ok = false; }
      if (msgEl.value.trim().length < 10){ setErr(msgEl,   'fmsg-err',   true); ok = false; }
      if (ok) {
        success.classList.add('show');
        form.reset();
        setTimeout(function() { success.classList.remove('show'); }, 5000);
      }
    });

  })();