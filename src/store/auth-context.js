import React,  {useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

// STATES AND HANDLER FUNCTIONS CONTEXT WILL PROVIDE
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  // converts token value to True or False:
  // We could probably also just check if there is a token...
  const isLoggedIn = !!token;
  // TODO: DELETE - FOR TESTING ONLY
  // const isLoggedIn = true;

  // HANDLER FUNCTIONS
  const loginHandler = (token) => {
    setToken(token)
  };

  const logoutHandler = () => {
    setToken(null);
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
