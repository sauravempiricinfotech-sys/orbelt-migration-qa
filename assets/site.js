document.addEventListener('DOMContentLoaded', function () {
  var h = document.documentElement;
  var cx = h.getAttribute('data-cx') || 'self';
  var hl = h.getAttribute('data-hl') || 'full';
  var set = (h.getAttribute('data-hlset') || 'en,de,fr,x-default').split(',');
  var p = location.pathname, origin = location.origin, val = origin + p;
  if (cx === 'parent') val = origin + p.replace(/[^/]+$/, '');
  if (cx === 'staging') val = 'https://staging.orbelt.dev' + p.replace(/^.*\/new\//, '/new/');
  if (cx === 'legacy') val = 'https://www.orbelt-legacy.com' + p.replace(/^.*\/new\//, '/');
  var link = document.querySelector('link[rel="canonical"]');
  if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
  link.setAttribute('href', val);
  if (cx === 'dup') {
    var extra = document.createElement('link');
    extra.setAttribute('rel', 'canonical');
    extra.setAttribute('href', origin + p.replace(/[^/]+$/, ''));
    document.head.appendChild(extra);
  }
  if (hl.indexOf('inject-') === 0) {
    set.forEach(function (lang) {
      var a = document.createElement('link');
      a.setAttribute('rel', 'alternate'); a.setAttribute('hreflang', lang);
      a.setAttribute('href', origin + p);
      document.head.appendChild(a);
    });
  }
});
