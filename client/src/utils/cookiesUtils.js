export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : 0;
};

export const setCookie = (name, value, options) => {
  const Opts = {
    path: '/',
    ...options,
  };
  if (!Opts.secure) delete Opts.secure;

  if (Opts.expires instanceof Date) {
    Opts.expires = Opts.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}`;

  for (const optionKey in Opts) {
    if (Object.prototype.hasOwnProperty.call(Opts, optionKey)) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = Opts[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};
