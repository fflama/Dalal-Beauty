// Dalal Beauty Salon — shared behaviour
(function(){
  function setLang(lang, persist){
    document.body.classList.remove('lang-en','lang-ar');
    document.body.classList.add('lang-'+lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('.langtoggle button').forEach(function(b){
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    if(persist !== false){ localStorage.setItem('dalal-lang', lang); }
  }

  var saved = localStorage.getItem('dalal-lang') || 'ar';
  setLang(saved, false);

  document.addEventListener('click', function(e){
    var btn = e.target.closest('[data-lang]');
    if(btn){ setLang(btn.dataset.lang); }
    var burger = e.target.closest('.hamburger');
    if(burger){
      document.querySelector('.navlinks').classList.toggle('open-mobile');
    }
  });

  // scroll reveal
  var items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && items.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:.15});
    items.forEach(function(el){ io.observe(el); });
  } else {
    items.forEach(function(el){ el.classList.add('in'); });
  }
})();
