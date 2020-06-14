import React, { useEffect, FC, ReactElement, ReactType, } from "react";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import { useAuth0 } from "../../context/authContext";

type IPrivateRoute = RouteComponentProps & {
  component: ReactType,
  path: string,
  rest?: [],
  history?: object
}

const PrivateRoute: FC<IPrivateRoute> = ({ component: Component, path, ...rest }): ReactElement => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = (props: any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default withRouter(PrivateRoute);
