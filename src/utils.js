export const isWebkit =
    /\b(iPad|iPhone|iPod)\b/.test(navigator.userAgent) &&
    /WebKit/.test(navigator.userAgent) &&
    !/Edge/.test(navigator.userAgent) &&
    !window.MSStream;
