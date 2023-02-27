// withAuth.tsx
import { NextComponentType, NextPageContext } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  user?: {
    email: string;
    // add more properties as needed
  };
}

export const withAuth = (Component: NextComponentType<NextPageContext, Props, Props>) => {
  const AuthenticatedComponent = (props: Props) => {
    useEffect(() => {
      const authenticate = async () => {
        try {
          const token = Cookies.get('token');
          if (!token) {
            throw new Error('No token found');
          }
          const decodedToken = await verifyIdToken(token);
          const user = {
            email: decodedToken.email!,
            // add more properties as needed
          };
          props.user = user;
        } catch (err) {
          Router.push('/login');
        }
      };
      authenticate();
    }, []);

    if (!props.user) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.getInitialProps = async (ctx: NextPageContext) => {
    let props = { user: null };
    if (Component.getInitialProps) {
      props = await Component.getInitialProps(ctx);
    }
    return props;
  };

  return AuthenticatedComponent;
};
