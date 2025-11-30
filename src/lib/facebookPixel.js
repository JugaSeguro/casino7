let initialized = false;
let currentId = null;

export function initFacebookPixel(pixelId, locale = 'en_US') {
  if (typeof window === 'undefined' || !pixelId) return;

  if (!window.fbq) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', `https://connect.facebook.net/${locale}/fbevents.js`);
  }

  if (window.__PIXEL_INIT_DONE && (currentId === pixelId || !currentId)) {
    initialized = true;
    currentId = pixelId;
    return;
  }
  if (!initialized || currentId !== pixelId) {
    window.fbq('init', pixelId);
    window.__PIXEL_INIT_DONE = true;
    initialized = true;
    currentId = pixelId;
  }
}

export function trackPageView(params) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView', params);
  }
}

export function trackEvent(name, params) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, params);
  }
}

export function trackCustomEvent(name, params) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, params);
  }
}

export function isFacebookPixelInitialized() {
  return initialized;
}
