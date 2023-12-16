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
        navigate(uid ? this : "login");
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
            "div-block dark:bg-[#353C48] dark:border dark:border-[#3b4452] w-full h-[80vh] flex justify-center items-center"
          }
        >
          <Form
            className={
              "w-[50%] h-[50vh] shadow-md  flex justify-center items-center flex-col dark:bg-[#3B4452]  p-5"
            }
          >
            <div className={"flex flex-col"}>
              <span className={"text-lg text-[#ccc] ]"}>Enter your Email</span>
              <Input
                type={"email"}
                placeholder={"type email ..."}
                style={{
                  width: "500px",
                }}
                rootClassName={
                  "dark:text-[#ccc] placeholder:text-[#ccc] placeholder:opacity-[0.3]"
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
                  "text-lg text-[#ccc] placeholder:text-[#ccc] placeholder:opacity-[0.3]"
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
                  "w-[500px] dark:bg-[#353C48] p-3 mb-5 text-lg text-[#ccc] placeholder:text-[#ccc] placeholder:opacity-[0.3] cursor-pointer"
                }
              >
                <option value="...">...</option>
                <option value="I'm a teacher">I{"'"}m a teacher</option>
                <option value="I'm a students">I{"'"}m a students</option>
              </select>
            </div>
            <Button
              className={
                "dark:bg-[#353C48]  w-[130px] h-[50px] dark:text-[#ccc] placeholder:text-[#ccc] placeholder:opacity-[0.3]"
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
