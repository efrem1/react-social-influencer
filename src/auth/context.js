import React from "react";

export const AuthContext = React.createContext({
  tokens: {},
  user: {},
  setUser: () => {},
  setTokens: () => {},
});
