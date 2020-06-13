import { createContext, useContext } from 'react';

export const Auth0Context = createContext<any | undefined>(undefined);
export const useAuth0 = () => useContext(Auth0Context);