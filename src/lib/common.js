export const saveUser = user => {
  if (typeof localStorage === 'undefined') return null;
  localStorage.setItem('user', JSON.stringify(user));
};

export const loadUser = () => {
  if (typeof localStorage === 'undefined') return null;
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    const parsed = JSON.parse(user);
    return parsed;
  } catch (e) {
    return null;
  }
};

export const clearUser = () => {
  if (typeof localStorage === 'undefined') return null;
  localStorage.removeItem('user');
};

export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

export const getScrollBottom = () => {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};
