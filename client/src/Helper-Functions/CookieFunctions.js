export const getAccessTokenFromCookie = () => {
  if (!document.cookie) return;
  let match = document.cookie.match(
    new RegExp("(^| )" + "access_token" + "=([^;]+)")
  );
  if (match) return match[2];
};

export const getCookieByName = (name) => {
  let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
};

export default getAccessTokenFromCookie;
