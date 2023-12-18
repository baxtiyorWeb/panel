import Container from "./shared/Container.jsx";
import { Button, Form, Input } from "antd";
import { useLogin } from "../hooks/useLogin.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../setup/firebase/firebase.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const login = useLogin();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigate(uid !== "login");
      } else {
        // ...
      }
    });
  }, []);

  return (
    <>
      <Container>
        <h1 className="text text-center text-red-500">{login.error}</h1>
        <div
          className={
            "div-block flex h-[80vh] w-full items-center justify-center dark:border dark:border-[#3b4452] dark:bg-[#353C48]"
          }
        >
          <Form
            className={
              "flex h-[50vh] w-[50%]  flex-col items-center justify-center p-5 shadow-md  dark:bg-[#3B4452]"
            }
          >
            <div className={"flex flex-col"}>
              <span className={"] text-lg text-[#ccc]"}>Enter your Email</span>
              <input
                type={"email"}
                placeholder={"type email ..."}
                style={{
                  width: "500px",
                }}
                className={
                  "placeholder:text-[#ccc] placeholder:opacity-[0.3]  dark:bg-transparent dark:text-[#ccc]"
                }
                onChange={(e) => login.setEmail(e.target.value)}
                value={login.email}
              />
            </div>
            <div className={"flex  flex-col"}>
              <span className={"text-lg text-[#ccc]"}>Enter your password</span>
              <Input
                type={"password"}
                placeholder={"type password ..."}
                style={{
                  width: "500px",
                }}
                className={
                  "text-lg text-[#ccc] placeholder:text-[#ccc] placeholder:opacity-[0.3] dark:bg-transparent"
                }
                onChange={(e) => login.setPassword(e.target.value)}
                value={login.password}
              />
            </div>
            <div className={"flex  flex-col"}>
              <span className={"text-lg text-[#ccc]"}>Enter your job</span>
              <select
                name=""
                id=""
                className={
                  "mb-5 w-[500px] cursor-pointer p-3 text-lg text-[#ccc] placeholder:text-[#ccc] placeholder:opacity-[0.3] dark:bg-[#353C48]"
                }
              >
                <option value="...">...</option>
                <option value="I'm a teacher">I{"'"}m a teacher</option>
                <option value="I'm a students">I{"'"}m a students</option>
              </select>
            </div>
            <Button
              className={
                "h-[50px]  w-[130px] placeholder:text-[#ccc] placeholder:opacity-[0.3] dark:bg-[#353C48] dark:text-[#ccc]"
              }
              onClick={login.signUp}
            >
              send
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
