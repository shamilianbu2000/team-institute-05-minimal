(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  }
  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); btn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) setMenu(false);
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 1180) setMenu(false); });

  // scroll-spy: highlight the nav link of the section in view (desktop bar + mobile sheet)
  var links = [].slice.call(menu.querySelectorAll('a[href^="#"]'));
  var pairs = links.map(function (a) { return { a: a, s: document.getElementById(a.getAttribute('href').slice(1)) }; }).filter(function (p) { return p.s; });
  var navEl = document.querySelector('.nav');
  function spy() {
    var y = window.scrollY + (navEl ? navEl.offsetHeight : 64) + 40, cur = pairs[0];
    pairs.forEach(function (p) { if (p.s.getBoundingClientRect().top + window.scrollY <= y) cur = p; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = pairs[pairs.length - 1];
    pairs.forEach(function (p) {
      var on = p === cur; p.a.classList.toggle('active', on);
      if (on) p.a.setAttribute('aria-current', 'true'); else p.a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', spy, { passive: true }); window.addEventListener('resize', spy); spy();

  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }
})();
