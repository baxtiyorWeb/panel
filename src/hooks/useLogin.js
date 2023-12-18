import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../setup/firebase/firebase.jsx";
import { useNavigate, useHref } from "react-router-dom";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const href = useHref();
  console.log(href);
  const signUp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            navigate(uid !== "/login");
            setEmail("");
            setPassword("");

            // ...
          } else {
            // User is signed out
            // ...
          }
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage, " :", "bunday ");
        // ..
      });
  };
  return { error, setError, setEmail, setPassword, email, password, signUp };
};
