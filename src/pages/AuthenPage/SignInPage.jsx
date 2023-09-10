import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { GoLock, GoUnlock } from "react-icons/go";
import { useDispatch } from "react-redux";

import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slides/userSlide";
import * as UserService from "../../services/UserService";
import * as message from "../../components/MessageComp/MessageComponent";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";

import "./AuthenPage.scss";

const SignInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);

  // ----- Xử ly API form đăng nhap
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation; // lấy data từ mutation

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        // cái state này là state `pathname`, nó nằm ở 'btn-thêm vào giỏ hàng trong ProductDetailComp'
        message.success("Đăng nhập thành công.");
        navigate(location?.state);
      } else {
        message.success("Đăng nhập thành công.");
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(data?.refresh_token));

      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);

        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);

    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }));
  };

  const handleOnChangeEmail = (e) => {
    const emailed = e.target.value;
    setEmail(emailed);
  };
  const handleOnChangePassword = (e) => {
    const passworded = e.target.value;
    setPassword(passworded);
  };

  const handleSignin = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className="wrapper-authenPage">
      <div className="box-auth">
        <form action="">
          <h2>Login Account</h2>
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
            {data?.status === "ERROR-PASSWORD" && <span className="message-err">{data?.message}</span>}
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <p>Forgot password?</p>
          </div>
          <LoadingComponent isLoading={isLoading}>
            <div className="btn-submit" onClick={handleSignin}>
              Login
            </div>
          </LoadingComponent>
          <div className="link">
            <span>Don't you have an account?</span>
            <p onClick={() => navigate("/sign-up")}>Register Now</p>
          </div>
          <h5 onClick={() => navigate("/")}>Back Home</h5>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
