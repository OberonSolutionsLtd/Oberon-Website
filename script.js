(function () {
  'use strict';

  var EMAIL = 'info@oberon.co.nz';
  var GMAIL_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + EMAIL;
  var MAILTO_URL = 'mailto:' + EMAIL;

  /* ---------- Email choice modal ---------- */
  var modal = document.getElementById('mailModal');

  if (modal) {
    var openModal = function () {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    };

    var closeModal = function () {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    };

    document.querySelectorAll('[data-mailto]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    modal.querySelectorAll('[data-mail-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });

    var gmailBtn = modal.querySelector('[data-mail-gmail]');
    if (gmailBtn) {
      gmailBtn.addEventListener('click', function () {
        window.open(GMAIL_URL, '_blank', 'noopener');
        closeModal();
      });
    }

    var defaultBtn = modal.querySelector('[data-mail-default]');
    if (defaultBtn) {
      defaultBtn.addEventListener('click', function () {
        window.location.href = MAILTO_URL;
        closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ---------- Occasional background image ---------- */
  // Add more paths here as you get more images to rotate through.
  var BACKGROUND_IMAGES = [
    'images/oberon-titania.jpg'
  ];

  // 1 in 22 page loads, roughly the middle of the 1-in-20 to 1-in-25 range requested.
  var BACKGROUND_IMAGE_CHANCE = 1 / 22;

  // The choice (image or none) is made once per browser tab session, then
  // remembered via sessionStorage so it stays the same as they move between
  // pages. sessionStorage clears itself automatically when the tab/browser
  // is closed, so the next visit gets a fresh roll.
  var STORAGE_KEY = 'oberonBackgroundChoice';
  var chosenImage = null;
  var stored = sessionStorage.getItem(STORAGE_KEY);

  if (stored !== null) {
    chosenImage = stored === 'none' ? null : stored;
  } else {
    if (BACKGROUND_IMAGES.length && Math.random() < BACKGROUND_IMAGE_CHANCE) {
      chosenImage = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
    }
    sessionStorage.setItem(STORAGE_KEY, chosenImage === null ? 'none' : chosenImage);
  }

  if (chosenImage) {
    // Slightly darker overlay on the About page, since there's body copy
    // to read there rather than just a wordmark and short nav labels.
    var overlayOpacity = document.body.classList.contains('page-about') ? 0.4 : 0.16;
    document.body.style.backgroundImage =
      'linear-gradient(rgba(0,0,0,' + overlayOpacity + '), rgba(0,0,0,' + overlayOpacity + ')), url("' + chosenImage + '")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
  }
})();
