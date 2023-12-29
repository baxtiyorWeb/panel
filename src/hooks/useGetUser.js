import { useNavigate } from "react-router-dom";
import { auth } from "../setup/firebase/firebase.jsx";
import { useEffect, useState } from "react";

export const useGetUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    setLoading(true);
    if (user) {
    } else {
      // No user is signed in.
    }
    setLoading(false);
  }, [user, loading]);
  return { navigate, user, loading };
};
