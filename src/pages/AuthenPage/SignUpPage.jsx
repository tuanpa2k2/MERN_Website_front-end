import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { GoLock, GoUnlock } from "react-icons/go";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import * as message from "../../components/MessageComp/MessageComponent";

import "./AuthenPage.scss";

const SignUpPage = () => {
  const navigate = useNavigate();

  //--------------------
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  // ----- Xử lyd API form đăng kí
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.createUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      navigate("/sign-in");
    } else if (isError) {
      message.error();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const handleOnChangeEmail = (e) => {
    const emailed = e.target.value;
    setEmail(emailed);
  };
  const handleOnChangePassword = (e) => {
    const passworded = e.target.value;
    setPassword(passworded);
  };
  const handleOnChangeConfirmPassword = (e) => {
    const confirmPassworded = e.target.value;
    setConfirmPassword(confirmPassworded);
  };

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="wrapper-authenPage">
      <div className="box-auth">
        <form action="">
          <h2>Register Account</h2>
          <div className="input-box">
            <span className="icon">
              <CiMail />
            </span>
            <input type="email" placeholder="..." value={email} onChange={handleOnChangeEmail} />
            <label>Email</label>
            {data?.status === "Err-Empty-email" && <span className="message-err">{data?.message}</span>}
            {data?.status === "Err-Email" && <span className="message-err">{data?.message}</span>}
            {data?.status === "ERROR-EMAIL" && <span className="message-err">{data?.message}</span>}
          </div>

          <div className="input-box">
            <span className="icon" onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? <GoUnlock /> : <GoLock />}
            </span>
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="..."
              value={password}
              onChange={handleOnChangePassword}
              autoComplete="on"
            />
            <label htmlFor="">Password</label>
            {data?.status === "Err-Empty-password" && <span className="message-err">{data?.message}</span>}
          </div>

          <div className="input-box">
            <span className="icon" onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
              {isShowConfirmPassword ? <GoUnlock /> : <GoLock />}
            </span>
            <input
              type={isShowConfirmPassword ? "text" : "password"}
              placeholder="..."
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword}
              autoComplete="on"
            />
            <label htmlFor="">Confirm Password</label>
            {data?.status === "Err-Empty-confirmPassword" && <span className="message-err">{data?.message}</span>}
            {data?.status === "Err-Equal-password" && <span className="message-err">{data?.message}</span>}
          </div>

          <LoadingComponent isLoading={isLoading}>
            <div className="btn-submit" onClick={handleSignUp}>
              Register
            </div>
          </LoadingComponent>
          <div className="link">
            <span>You have a account?</span>
            <p onClick={() => navigate("/sign-in")}>Login Now</p>
          </div>
          <h5 onClick={() => navigate("/")}>back home</h5>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
