export const LOGING = 'LOG_IN';
export const LOGOUT = 'LOG_OUT';

export const login = (token) => ({
  type: LOGING,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});
