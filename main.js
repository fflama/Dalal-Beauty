// Dalal Beauty — luxury spa interactions
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* sticky nav shrink -------------------------------------------------- */
  var nav = document.querySelector('.nav');
  function onScroll(){
    if(window.scrollY > 60){ nav.classList.add('scrolled'); }
    else{ nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* mobile menu ----------------------------------------------------------- */
  var burger = document.querySelector('.nav-burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if(burger && mobileMenu){
    burger.addEventListener('click', function(){
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* reveal on scroll ---------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold:.12 });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  /* gentle parallax for hero + experience section ------------------------------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if(parallaxEls.length && !reduceMotion){
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      parallaxEls.forEach(function(el){
        var speed = parseFloat(el.dataset.parallax) || .15;
        el.style.transform = 'translateY(' + (y * speed) + 'px)';
      });
    }, { passive:true });
  }

  /* gallery lightbox -------------------------------------------------------------- */
  var lightbox = document.querySelector('.lightbox');
  var lightboxInner = lightbox ? lightbox.querySelector('.lightbox-inner') : null;
  document.querySelectorAll('.mitem').forEach(function(item){
    item.addEventListener('click', function(){
      if(!lightbox) return;
      lightboxInner.innerHTML = item.querySelector('.ph').outerHTML;
      lightbox.classList.add('open');
    });
  });
  if(lightbox){
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox || e.target.closest('.lightbox-close')){
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ lightbox.classList.remove('open'); }
    });
  }

  /* newsletter (visual only, no backend) --------------------------------------------- */
  var newsletterForm = document.querySelector('.newsletter-form');
  if(newsletterForm){
    newsletterForm.addEventListener('submit', function(e){
      e.preventDefault();
      var input = newsletterForm.querySelector('input');
      var msg = document.querySelector('.newsletter-msg');
      if(input.value.trim()){
        msg.textContent = 'Thank you — you are on the list.';
        input.value = '';
      } else {
        msg.textContent = 'Please enter a valid email.';
      }
    });
  }

  /* smooth-scroll for in-page nav links ------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(id.length > 1){
        var target = document.querySelector(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block:'start' });
        }
      }
    });
  });
})();
