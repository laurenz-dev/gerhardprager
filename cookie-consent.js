/*
 * GDPR Cookie Consent Banner
 * ----------------------------
 * Add the following HTML right after the skip-to-content link (or after <body> if none):
 *
 * <!-- Cookie Consent Banner -->
 * <div id="cookie-banner" class="cookie-banner" role="dialog" aria-label="Cookie-Einstellungen" style="display:none;">
 *   <div class="cookie-banner__inner">
 *     <p class="cookie-banner__text">Diese Website verwendet Cookies und Analysetools, um Ihnen die bestmögliche Nutzungserfahrung zu bieten. Weitere Informationen finden Sie in unserer <a href="/datenschutz.html">Datenschutzerklärung</a>.</p>
 *     <div class="cookie-banner__actions">
 *       <button id="cookie-reject" class="cookie-banner__btn cookie-banner__btn--reject">Ablehnen</button>
 *       <button id="cookie-accept" class="cookie-banner__btn cookie-banner__btn--accept">Akzeptieren</button>
 *     </div>
 *   </div>
 * </div>
 *
 * Then include this script before </body>:
 * <script src="cookie-consent.js"></script>
 *
 * For subdirectories (en/, ar/, ru/), use relative paths:
 * <script src="../cookie-consent.js"></script>
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'cookie_consent';
  var GA_ID = 'G-DBFZ01602M';

  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  var consent = localStorage.getItem(STORAGE_KEY);

  if (consent === 'accepted') {
    loadAnalytics();
  } else if (!consent) {
    banner.style.display = '';
  }
  // If consent === 'rejected', do nothing — banner stays hidden, no analytics.

  document.getElementById('cookie-accept').addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    banner.style.display = 'none';
    loadAnalytics();
  });

  document.getElementById('cookie-reject').addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    banner.style.display = 'none';
  });

  function loadAnalytics() {
    if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);

    trackPhoneClicks();
  }

  // === CONVERSION-TRACKING: Anruf-Klicks ===
  // Erfasst jeden Klick auf einen tel:-Link als GA4-Event "anruf_klick".
  // Laeuft nur nach Zustimmung (wird aus loadAnalytics aufgerufen).
  function trackPhoneClicks() {
    var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function (link) {
      if (link.dataset.callTracked) return; // doppelte Listener vermeiden
      link.dataset.callTracked = '1';
      link.addEventListener('click', function () {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'anruf_klick', {
            'event_category': 'Conversion',
            'event_label': link.getAttribute('href'),
            'page_path': window.location.pathname
          });
        }
      });
    });
  }
})();
