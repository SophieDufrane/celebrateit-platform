import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Fetch next page of paginated data and merge with existing resource state
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce(
        (acc, cur) =>
          acc.some((accResult) => accResult.id === cur.id)
            ? acc
            : [...acc, cur],
        prevResource.results
      ),
    }));
  } catch (err) {
    // TODO: add user feedback or logging on fetch error
  }
};

// Store refresh token expiry timestamp in localStorage
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Check if refresh token timestamp exists to determine if token should be refreshed
export const shouldRefreshToken = () =>
  !!localStorage.getItem("refreshTokenTimestamp");

// Remove refresh token timestamp from localStorage on logout or token invalidation
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
