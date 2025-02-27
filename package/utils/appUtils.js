// eslint-disable-next-line import/no-unresolved
import { native_copyToClipboard } from "@wrappid/native";
// eslint-disable-next-line import/no-unresolved
import { WrappidData } from "@wrappid/styles";
import moment from "moment";

import { REFRESH_TOKEN_API } from "../config/api";
import { HTTP } from "../config/constants";
import { globalAccessToken, globalRefreshToken, globalTokenRequestTimeStamp, globalTokenRequested } from "../CoreRoutes";
import {
  LOGOUT_SUCCESS,
  SESSION_EXPIRED,
  TOKEN_REFRESH_SUCCESS
} from "../store/types/authTypes";
import {
  TOKEN_REJUVINATED,
  TOKEN_REQUESTED
} from "../store/types/pendingRequestTypes";

// -- const AUTH_STORE = "persist:auth";

export const getUUID = () => {
  let date = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (param) {
      let result = (date + Math.random() * 16) % 16 | 0;

      date = Math.floor(date / 16);
      return (param === "x" ? result : (result & 0x3) | 0x8).toString(16);
    }
  );

  return uuid;
  // return window.self.crypto.randomUUID();
};

export const getTimestamp = () => {
  return new Date().getTime();
};

export async function reloadToken(
  // eslint-disable-next-line etc/no-commented-out-code
  // refreshToken,
  // accessToken,
  // tokenRequested,
  // tokenRequestTimeStamp,
  dispatch
) {
  let diff = moment().diff(globalTokenRequestTimeStamp, "seconds");

  // -- console.log("__tokenRequested__", tokenRequested, diff);
  if (!globalTokenRequested || diff > 60) {
    const backendUrl = WrappidData?.config?.backendUrl;

    dispatch({ type: TOKEN_REQUESTED });
    fetch(backendUrl + REFRESH_TOKEN_API, {
      body   : JSON.stringify({ refreshToken: globalRefreshToken }),
      headers: {
        Authorization : "Bearer " + globalAccessToken,
        "Content-Type": "application/json",
      },
      method: HTTP.POST,
    })
      .then((tokenResponse) => {
        tokenResponse
          .json()
          .then((tokenResponseParsed) => {
            // -- console.log("-----REJUVINATE IN RELOAD TOKEN--------");
            if (tokenResponse.status === 200) {
              dispatch({
                payload: { accessToken: tokenResponseParsed?.accessToken },
                type   : TOKEN_REFRESH_SUCCESS,
              });
              dispatch({ type: TOKEN_REJUVINATED });
            } else if (
              tokenResponse.status === 401 ||
              tokenResponse.status === 403
            ) {
              dispatch({ type: SESSION_EXPIRED });
            } else if (tokenResponse.status === 500) {
              dispatch({ type: LOGOUT_SUCCESS });
            }
          })
          .catch((/* err */) => {
            // -- console.error("Error in toke response parse", err);
            dispatch({ type: SESSION_EXPIRED });
          });
      })
      .catch(async (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          dispatch({ type: SESSION_EXPIRED });
        }
      });
  }
}

export async function copyToClipboard(text) {
  return await native_copyToClipboard(text);
}