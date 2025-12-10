/**
 * Cassino Online 777 Brasil - Main JavaScript
 * Version: 1.0
 * Date: December 2025
 */

(function() {
  'use strict';

  // ============================================
  // DOM Ready
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initFAQ();
    initSmoothScroll();
    initLazyLoading();
    initAffiliateLinks();
    initScrollAnimations();
  });

  // ============================================
  // Header Scroll Effect
  // ============================================
  function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      const scrollY = window.scrollY;

      // Add/remove scrolled class
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Hide/show header on scroll (optional)
      // if (scrollY > lastScrollY && scrollY > 200) {
      //   header.style.transform = 'translateY(-100%)';
      // } else {
      //   header.style.transform = 'translateY(0)';
      // }

      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  // ============================================
  // Mobile Menu
  // ============================================
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', function() {
      const isOpen = mobileNav.classList.contains('open');

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    function openMobileMenu() {
      mobileNav.classList.add('open');
      menuToggle.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      mobileNav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }
  }

  // ============================================
  // FAQ Accordion
  // ============================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');

        // Close all other items (optional - for accordion behavior)
        // faqItems.forEach(function(otherItem) {
        //   if (otherItem !== item) {
        //     otherItem.classList.remove('open');
        //   }
        // });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('open');
          question.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without scrolling
        history.pushState(null, null, href);
      });
    });
  }

  // ============================================
  // Lazy Loading Images
  // ============================================
  function initLazyLoading() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(function(img) {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
    } else {
      // Fallback to Intersection Observer
      const lazyImages = document.querySelectorAll('img[data-src]');

      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
              }
              img.removeAttribute('data-src');
              img.removeAttribute('data-srcset');
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        lazyImages.forEach(function(img) {
          imageObserver.observe(img);
        });
      } else {
        // Fallback for older browsers
        lazyImages.forEach(function(img) {
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
        });
      }
    }
  }

  // ============================================
  // Affiliate Link Tracking
  // ============================================
  function initAffiliateLinks() {
    const affiliateLinks = document.querySelectorAll('a[href*="betjjj999.com"]');

    affiliateLinks.forEach(function(link) {
      // Add noopener for security
      link.setAttribute('rel', 'noopener noreferrer sponsored');
      link.setAttribute('target', '_blank');

      // Track clicks (you can customize this)
      link.addEventListener('click', function(e) {
        // Optional: Send to analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'affiliate_click', {
            'event_category': 'Affiliate',
            'event_label': this.textContent.trim(),
            'transport_type': 'beacon'
          });
        }

        // Optional: Log to console for debugging
        console.log('Affiliate link clicked:', this.href);
      });
    });
  }

  // ============================================
  // Scroll Animations
  // ============================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length) return;

    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animation = element.dataset.animate || 'fade-in';
            const delay = element.dataset.animateDelay || 0;

            setTimeout(function() {
              element.classList.add('animate-' + animation);
              element.classList.add('animated');
            }, parseInt(delay));

            animationObserver.unobserve(element);
          }
        });
      }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      });

      animatedElements.forEach(function(element) {
        element.style.opacity = '0';
        animationObserver.observe(element);
      });
    } else {
      // Fallback: just show all elements
      animatedElements.forEach(function(element) {
        element.style.opacity = '1';
      });
    }
  }

  // ============================================
  // Utility Functions
  // ============================================

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = function() {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // Format currency (BRL)
  window.formatCurrency = function(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Copy to clipboard
  window.copyToClipboard = function(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve();
    } catch (err) {
      document.body.removeChild(textarea);
      return Promise.reject(err);
    }
  };

})();

// ============================================
// Schema.org Structured Data Helper
// ============================================
function addFAQSchema(faqData) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(function(item) {
      return {
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      };
    })
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// ============================================
// Service Worker Registration (PWA)
// ============================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('SW registered: ', registration);
      })
      .catch(function(registrationError) {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
