
import React, { FC, ReactElement, useState, useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import defaultRedirectCallBack from '../utils/defualtRedirect';
import { Auth0Context } from '../context/authContext';

interface IProvider {
  children: ReactElement
  onRedirectCallback: Function
  domain: string
  client_id: string
  redirect_uri?: string
}

const Auth0Provider: FC<IProvider> = ({
  children,
  onRedirectCallback = defaultRedirectCallBack,
  domain,
  client_id,
  redirect_uri
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean | null>();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // initialize auth0 and create client
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client({ redirect_uri, domain, client_id });
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=") &&
        window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  // function to handle redirection
  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        handleRedirectCallback,
        getIdTokenClaims: (...props: []) => auth0Client.getIdTokenClaims(...props),
        loginWithRedirect: (...props: []) => auth0Client.loginWithRedirect(...props),
        getTokenSilently: (...props: []) => auth0Client.getTokenSilently(...props),
        getTokenWithPopup: (...props: []) => auth0Client.getTokenWithPopup(...props),
        logout: (...props: []) => auth0Client.logout(...props)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;