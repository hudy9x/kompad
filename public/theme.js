(function() {
  const DEFAULT_THEME = `--common-text-color:  rgb(88 88 88);--common-semidark-text-color:  rgb(160 167 177);--common-dark-text-color:  rgb(107 114 128);--common-text-hover-color:  rgb(165 170 179);--common-bg-color:  rgb(255 255 255);--common-dark-bg-color:  rgb(255 255 255);--common-darker-bg-color:  rgb(227 227 227);--common-light-bg-color:  rgb(239 239 239);--common-border-hl-color:  rgb(253 227 124);--common-border-light-color:  rgb(231 231 231);--common-btn-bg-color:  rgb(255 255 255);--common-btn-bg-hover-color:  rgb(241 241 241);--common-btn-bg-active-color:  rgb(86 86 86);--common-primary-color:  rgb(234 179 8);--common-primary-hover-color:  rgb(253 224 71);--common-primary-text-color:  rgb(113 63 18);--common-border-color:  rgb(221 221 221);--sidebar-background-color:  rgb(249 249 249);--sidebar-text-color:  rgb(107 114 128);--sidebar-text-color-hover:  rgb(156 163 175);--sidebar-title-color:  rgb(74 74 74);--sidebar-user-setting-border-color:  rgb(225 225 225);--sidebar2-background-color:  rgb(255 255 255);--editor-text-color:  rgb(90 90 90);--editor-link-text-color:  rgb(213 184 93);--editor-quote-text-color:  rgb(234 179 8);--modal-bg-color:  rgb(255 255 255);--modal-footer-bg-color:  rgb(255 255 255);--setting-bg-color:  rgb(241 241 241)`;
  let theme = localStorage.getItem("THEME") || DEFAULT_THEME,
    css = `:root { ${theme} }`,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  head.appendChild(style);
  style.id = 'css-variable';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
})()

