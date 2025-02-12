(function() {
    "use strict";
  
    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  
    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);
  
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
  
    });
  
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  
    let scrollTop = document.querySelector('.scroll-top');
  
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  
  
    let whatsapp = document.querySelector('#whatsapp');
  
    function toggleWhatsapp() {
    if (whatsapp) {
      window.scrollY > 100 ? whatsapp.classList.add('active') : whatsapp.classList.remove('active');
    }
  }
  
  window.addEventListener('scroll', toggleWhatsapp);
  
  
    function aosInit() {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', aosInit);
  
  
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );
  
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
  
    window.addEventListener("load", initSwiper);
  
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
  
      let initIsotope;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });
  
      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
  
    });
  
  })();
  
  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: { lat: -23.565596, lng: -46.645534 },
      mapTypeId: "roadmap",
    });
  
    const saopauloCoords = [
      { lat: -23.430648, lng: -46.565958 },
      { lat: -23.458272, lng: -46.576154 },
      { lat: -23.483265, lng: -46.788796 },
      { lat: -23.396172, lng: -46.949352 },
      { lat: -23.525792, lng: -46.894219 },
      { lat: -23.740807, lng: -46.595526 },
      { lat: -23.408742, lng: -46.374859 },
    ];
  
    const saopaulo = new google.maps.Polygon({
      paths: saopauloCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });
  
    saopaulo.setMap(map);
  }
  
  window.initMap = initMap;
  
  const carousel = document.querySelector('#carouselExampleIndicators');
  
    let startX, endX;
  
    carousel.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });
  
    carousel.addEventListener('touchmove', function(e) {
      endX = e.touches[0].clientX;
    });
  
    carousel.addEventListener('touchend', function() {
      const threshold = 50; 
  
      if (startX - endX > threshold) {
        carousel.querySelector('.carousel-control-next').click();
      } else if (endX - startX > threshold) {
        carousel.querySelector('.carousel-control-prev').click();
      }
    });
  
    document.addEventListener("DOMContentLoaded", function () {
      const darkModeToggle = document.getElementById("dark-mode-toggle");
  
      if (!darkModeToggle) {
          console.error("Erro: O botão de modo escuro não foi encontrado no HTML!");
          return;
      }
  
      console.log("Botão de Modo Escuro encontrado!");
  
      const body = document.body;
  
      if (localStorage.getItem("dark-mode") === "enabled") {
          body.classList.add("dark-mode");
      }
  
      darkModeToggle.addEventListener("click", function () {
          body.classList.toggle("dark-mode");
  
          if (body.classList.contains("dark-mode")) {
              localStorage.setItem("dark-mode", "enabled");
          } else {
              localStorage.setItem("dark-mode", "disabled");
          }
      });
  
      console.log("Script de modo escuro carregado com sucesso!");
  });
  
  