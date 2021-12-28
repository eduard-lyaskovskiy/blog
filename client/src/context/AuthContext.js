import React from 'react';

export const AuthContext = React.createContext({
    token: '', 
    login: () => {}, 
    logout: () => {}, 
    userId: '', 
    isAuthenticated: false
});
