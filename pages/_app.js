import {AuthContextProvider} from '../context/AuthContext'
import '../styles/globals.css'
import ProtectedRoute from "../components/security/ProtectedRoute";
import CONSTANTS from "../utils/constants";
import {useRouter} from "next/router";

const {ROUTES} = CONSTANTS;

const noAuthRequired = [ROUTES.LOGIN];

function MyApp({Component, pageProps}) {

  const router = useRouter();

  return (
    <AuthContextProvider>
      {
        noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute><Component {...pageProps} /></ProtectedRoute>
        )
      }
    </AuthContextProvider>
  );
}

export default MyApp
