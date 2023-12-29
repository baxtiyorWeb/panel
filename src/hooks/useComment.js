import { useState } from "react";
import { set, ref } from "firebase/database";
import { realTimeDatabase } from "../setup/firebase/firebase";
import { uid } from "uid";

export const useComment = () => {
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const uiid = uid();

  async function messageUser(name) {
    setIsLoading(true);
    if (msg !== "") {
      await set(ref(realTimeDatabase, "users/" + uiid), {
        message: msg,
        user1: name
      });
    }
    setMsg("");
    setIsLoading(false);
  }

  return { setMsg, msg, messageUser, isLoading };
};
