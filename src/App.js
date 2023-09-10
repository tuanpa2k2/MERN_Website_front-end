import React, { Fragment, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import DefaultComponent from "./components/DefaultComp/DefaultComponent.jsx";
import { isJsonString } from "./until";
import * as UserService from "./services/UserService";
import { resetUser, updateUser } from "./redux/slides/userSlide";
import LoadingComponent from "./components/LoadingComp/LoadingComponent";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem("access_token");
    let decoded = {};

    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }

    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();

      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodedRefreshToken = jwt_decode(refreshToken);

      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["token"] = `Bearer ${data?.access_token}`;

          console.log("object", data);
        } else {
          dispatch(resetUser());
        }
      }

      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }));
  };

  return (
    <div>
      <Router>
        <LoadingComponent isLoading={isLoading}>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </LoadingComponent>
      </Router>
    </div>
  );
}

export default App;
