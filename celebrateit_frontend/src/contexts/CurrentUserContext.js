import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);

  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
      console.log("CurrentUserProvider: user loaded", data); // DEBUG
    } catch (err) {
      console.log("CurrentUserProvider: no user authenticated"); // DEBUG
    } finally {
      setCurrentUserLoaded(true); // mark auth check complete
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        console.log("axios response error:", err.response?.status); // DEBUG
        if (err.response?.status === 401) {
          console.log(
            new Date().toLocaleTimeString(),
            "Token expired, refreshing..."
          ); // DEBUG
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            console.log("Token refresh succeeded"); // DEBUG
          } catch (err) {
            console.log("Token refresh failed"); // DEBUG
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, currentUserLoaded }}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}
