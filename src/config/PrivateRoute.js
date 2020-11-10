import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !user ? <Redirect to={'/login'} /> : <RouteComponent {...routeProps} />
      }
    />
  );
};

export default PrivateRoute;
