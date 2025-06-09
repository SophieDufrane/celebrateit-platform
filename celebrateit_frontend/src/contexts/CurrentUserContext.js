import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// Contexts
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider component
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
      // TODO: add user feedback on error
    } finally {
      setCurrentUserLoaded(true);
    }
  };

  // PATCH 5: Soft-ping user endpoint every 5 minutes
  useEffect(() => {
    handleMount();
    const interval = setInterval(() => {
      axiosRes
        .get("/dj-rest-auth/user/")
        .then(({ data }) => {
          setCurrentUser(data);
        })
        .catch(() => {});
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // PATCHES 1–10: Token attachment, refresh logic, auto-logout, cleanup
  useEffect(() => {
    // PATCH 1: Attach access token if logged in
    axiosReq.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");

        // PATCH 10: Prevent ghost token usage if user is logged out
        if (token && currentUser) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          delete config.headers["Authorization"];
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // PATCH 2: Attempt token refresh if needed
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

            // PATCH 7: Rehydrate user context only if missing
            if (!currentUser) {
              const { data: userData } = await axiosRes.get(
                "/dj-rest-auth/user/"
              );
              setCurrentUser(userData);
            }
          } catch (err) {
            // PATCH 3: Token refresh failed — logout user
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

    // PATCH 4 + 6: Intercept 401s → refresh token → rehydrate → retry
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

            const { data: userData } = await axiosRes.get(
              "/dj-rest-auth/user/"
            );
            setCurrentUser(userData);

            // Retry original request
            return axiosReq(err.config);
          } catch (err) {
            // PATCH 3 (continued): Force logout on token failure
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
        return Promise.reject(err);
      }
    );

    // PATCH 9: Cleanup interceptors on unmount
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
