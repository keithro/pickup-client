import React,  {useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

// STATES AND HANDLER FUNCTIONS CONTEXT WILL PROVIDE
export const AuthContextProvider = (props) => {
  const savedToken = localStorage.getItem('pu-token')
  const [token, setToken] = useState(savedToken);

  // converts token value to True or False:
  // We could probably also just check if there is a token...
  const isLoggedIn = !!token;

  // HANDLER FUNCTIONS
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('pu-token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('pu-token');
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
