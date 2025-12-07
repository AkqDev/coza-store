document.addEventListener('DOMContentLoaded', () => {

  // ===== HERO BUTTON SCROLL =====
  const heroBtn = document.querySelector('.text button');
  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const productSection = document.querySelector('main');
      if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===== NAVBAR SMOOTH SCROLL (header + sidebar) =====
  function enableSmoothScroll() {
    const links = document.querySelectorAll('.scroll-link');
    links.forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // close sidebar if open
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
          }
        }
      });
    });
  }

  // ===== Banner card click =====
  const bannerCards = document.querySelectorAll('section .card');
  bannerCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      alert(`You clicked Banner Card ${index + 1}`);
    });
  });

  // ===== PRODUCT ICONS (LIKE/HEART) =====
  function activateProductIcons(root = document) {
    const productIcons = root.querySelectorAll('.product-card i');
    productIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        icon.classList.toggle('active');
        icon.style.color = icon.classList.contains('active') ? 'red' : '#999';
      });
    });
  }
  activateProductIcons();

  // ===== LOAD MORE PRODUCTS =====
  const loadMoreBtn = document.querySelector('.button button');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const main = document.querySelector('main');
      if (main) {
        // Create and append two new product cards
        for (let i = 0; i < 2; i++) {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = `
            <img src="https://via.placeholder.com/600x400" alt="New Product">
            <h3>New Product ${i + 1}<span><i class="fa-regular fa-heart"></i></span></h3>
            <p>$99</p>
          `;
          main.appendChild(card);
        }
        // Rebind interactions for new elements
        activateProductIcons(main);
        addHoverZoom(main);
        // Update reveal list
        updateRevealElements();
      }
    });
  }

  // ===== NEWSLETTER SUBSCRIBE =====
  const newsletterBtn = document.querySelector('.footer-child button');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const emailInput = document.querySelector('.footer-child input');
      if (emailInput && emailInput.value.trim() !== '') {
        alert(`Thanks for subscribing with: ${emailInput.value}`);
        emailInput.value = ''; 
      } else {
        alert('Please enter your email!');
      }
    });
  }

  // ===== REVEAL ELEMENTS ON SCROLL =====
  let revealElements = [];
  function updateRevealElements() {
    revealElements = Array.from(document.querySelectorAll('.product-card, section .card'));
  }
  updateRevealElements();

  window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        el.style.transition = 'all 0.6s ease';
      }
    });
  });

  // ===== STICKY HEADER =====
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // ===== BACK TO TOP BUTTON (FA ICON, Rounded) =====
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  backToTopBtn.style.position = 'fixed';
  backToTopBtn.style.bottom = '30px';
  backToTopBtn.style.right = '30px';
  backToTopBtn.style.width = '50px';
  backToTopBtn.style.height = '50px';
  backToTopBtn.style.borderRadius = '50%';
  backToTopBtn.style.border = 'none';
  backToTopBtn.style.cursor = 'pointer';
  backToTopBtn.style.fontSize = '1.5rem';
  backToTopBtn.style.display = 'none';
  backToTopBtn.style.backgroundColor = '#f0f0f0';
  backToTopBtn.style.color = '#000';
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
  });

  // ===== SIMPLE PRODUCT FILTER =====
  const filterLinks = document.querySelectorAll('.filter-link');
  filterLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const category = link.textContent.toLowerCase();
      const products = document.querySelectorAll('.product-card');
      products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        if (category === 'all products' || title.includes(category)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });

  // ===== HEADER ICONS (Search, Cart, Heart + Dark/Light) =====
  const headerIcons = header.querySelector('.icons');
  // Ensure theme icon exists and is last
  if (!headerIcons.querySelector('.theme-toggle')) {
    const themeIconEl = document.createElement('i');
    themeIconEl.className = 'fa-solid fa-moon theme-toggle';
    themeIconEl.style.marginLeft = '20px';
    themeIconEl.style.cursor = 'pointer';
    headerIcons.appendChild(themeIconEl);
  }

  // ===== DARK/LIGHT MODE =====
  const themeIcon = document.querySelectorAll('.theme-toggle'); // both header and sidebar
  function applyDarkModeStyles(isDark) {
    const heroTextElements = document.querySelectorAll('.text h1, .text p, .text button');
    const overlayHeadings = document.querySelectorAll('section .overlay h2, section .overlay p');

    themeIcon.forEach(icon => {
      icon.className = isDark ? 'fa-solid fa-sun theme-toggle' : 'fa-solid fa-moon theme-toggle';
      icon.style.color = isDark ? 'white' : 'black';
    });

    document.body.style.backgroundColor = isDark ? '#1b1b1b' : '#fff';
    document.body.style.color = isDark ? '#f0f0f0' : '#333';

    document.querySelectorAll('a, button, .product-card h3, .product-card p').forEach(el => {
      el.style.color = isDark ? '#f0f0f0' : '#333';
    });

    heroTextElements.forEach(el => el.style.color = isDark ? '#f0f0f0' : (el.tagName === 'BUTTON' ? '#000' : '#111'));
    overlayHeadings.forEach(el => el.style.color = isDark ? '#f0f0f0' : '#111');

    backToTopBtn.style.backgroundColor = isDark ? '#333' : '#f0f0f0';
    backToTopBtn.style.color = isDark ? '#fff' : '#000';
  }

  themeIcon.forEach(icon => {
    icon.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode');
      applyDarkModeStyles(isDark);
    });
  });

  // ===== HOVER ZOOM ANIMATION =====
  function addHoverZoom(root = document) {
    const productCards = root.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'all 0.3s ease';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
      });
    });
  }
  addHoverZoom();

  // ===== MOBILE SIDEBAR =====
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menu-btn');
  const closeSidebarBtn = document.querySelector('.close-sidebar');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebar.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  // Close sidebar when clicking outside
  sidebar.addEventListener('click', (e) => {
    if (e.target === sidebar) {
      sidebar.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  // Enable smooth scroll for all menu links
  enableSmoothScroll();

});  correct and give me a full code 