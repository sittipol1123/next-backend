import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface Props {
  isLoggedIn: boolean;
}

const Islogin = ({ isLoggedIn }: Props) => {
  const router = useRouter();

  if (!isLoggedIn) {
    // Redirect to login page if user is not authenticated
    router.push('/login');
    return null;
  }

  // Render the protected content
//   return (
//     <div>
//       <h1>Welcome, user!</h1>
//       <p>This content is protected and can only be accessed by authenticated users.</p>
//     </div>
//   );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // Check if user is authenticated
  const isLoggedIn = checkIfUserIsLoggedIn(context.req);

  // If not authenticated, redirect to login page
  if (!isLoggedIn) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // If authenticated, render the page
  return {
    props: {
      isLoggedIn,
    },
  };
};

function checkIfUserIsLoggedIn(req: any) {
  // Check if user is authenticated
  // Here you can use any method to check if the user is authenticated, like checking if a cookie is set or if there's a JWT token in the request headers
  return true; // return true if user is authenticated, false otherwise
}

export default Islogin;
