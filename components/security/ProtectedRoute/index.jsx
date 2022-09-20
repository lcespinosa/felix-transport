import {useEffect} from "react";
import {useAuth} from "../../../context/AuthContext";
import {useRouter} from "next/router";
import CONSTANTS from "../../../utils/constants";
import permissions from "../permissions.json";

const {ROUTES} = CONSTANTS;

export default function ProtectedRoute({children}) {
  const {user, logout} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(ROUTES.LOGIN);
    } else {
      const canAccess = permissions.users
        .find((u) => u.email === user.email)?.canAccess
        .filter((url) => url === '*' || url === router.pathname)
        .length > 0;
      if (!canAccess) {
        logout();
        router.push(ROUTES.LOGIN);
      }
    }
  }, [router, user]);

  return <>
    {user ? children : null}
  </>
}
