import { createContext, useContext, useEffect, useState, useRef } from "react";
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

  // PATCH 8: Track interceptor IDs so we can eject them on cleanup
  const requestInterceptorRef = useRef(null);
  const responseInterceptorRef = useRef(null);

  // PATCH 0: Initial fetch of current user
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
    } finally {
      setCurrentUserLoaded(true);
    }
  };

  useEffect(() => {
    handleMount();
    // PATCH 5: Soft-ping the user endpoint every 5 minutes to rehydrate state
    const interval = setInterval(() => {
      axiosRes
        .get("/dj-rest-auth/user/")
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch(() => {});
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval); // clean up
  }, []);

  useEffect(() => {
    // PATCH 1: Attach access token to all axiosReq requests
    axiosReq.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          delete config.headers["Authorization"]; // clean header if no token
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // PATCH 2: Refresh token before protected requests if timestamp exists
    requestInterceptorRef.current = axiosReq.interceptors.request.use(
      async (config) => {
        const isRefreshing = config._isRefreshing;
        if (!localStorage.getItem("refresh_token")) {
          return config;
        }
        if (shouldRefreshToken() && !isRefreshing) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            localStorage.setItem("access_token", data.access);
            axiosReq.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.access}`;

            // PATCH 7: Skip rehydration if already loaded to avoid repeat loops
            if (!currentUser) {
              const { data: userData } = await axiosRes.get(
                "/dj-rest-auth/user/"
              );
              setCurrentUser(userData);
            }
          } catch (err) {
            // PATCH 3: Refresh token failed during request — force logout
            setCurrentUser((prevUser) => {
              if (prevUser) history.push("/signin");
              return null;
            });
            removeTokenTimestamp();
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return config;
          }
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // PATCH 4 + 6: On response 401, try to refresh and rehydrate user context
    responseInterceptorRef.current = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            localStorage.setItem("access_token", data.access);
            axiosReq.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.access}`;
            err.config.headers = {
              ...err.config.headers,
              Authorization: `Bearer ${data.access}`,
            };

            // PATCH 6: Rehydrate user before retrying the failed request
            const { data: userData } = await axiosRes.get(
              "/dj-rest-auth/user/"
            );
            setCurrentUser(userData);

            // Retry original request
            return axiosReq(err.config);
          } catch (err) {
            // PATCH 3 (continued): Refresh failed on response — force logout
            console.warn("TOKEN REFRESH FAILED — Forcing logout.");
            setCurrentUser((prevUser) => {
              if (prevUser) history.push("/signin");
              return null;
            });
            removeTokenTimestamp();
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return Promise.reject(err);
          }
        }
        return Promise.reject(err); // other non-401 errors (e.g., 403, 500)
      }
    );
    // PATCH 9: Eject interceptors on cleanup to avoid duplicate setups
    return () => {
      if (requestInterceptorRef.current !== null) {
        axiosReq.interceptors.request.eject(requestInterceptorRef.current);
      }
      if (responseInterceptorRef.current !== null) {
        axiosRes.interceptors.response.eject(responseInterceptorRef.current);
      }
    };
  }, [history, currentUser]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, currentUserLoaded }}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}
