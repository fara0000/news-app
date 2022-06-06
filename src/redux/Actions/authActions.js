import {
  UPDATE_USER_LOGIN,
  UPDATE_USER_ACCESS_TOKEN,
  UPDATE_ONBOARDING_STATUS,
  UPDATE_APP_THEME,
} from "../Constants";

export const updateUserLogin = (user, isloggedIn) => {
  return {
    type: UPDATE_USER_LOGIN,
    user,
    isloggedIn,
  };
};

export const updateUserAccessToken = (accessToken) => {
  return {
    type: UPDATE_USER_ACCESS_TOKEN,
    accessToken,
  };
};

export const updateOnboarding = (status) => {
  return {
    type: UPDATE_ONBOARDING_STATUS,
    status: status,
  };
};

export const updateAppTheme = (theme) => {
  return {
    type: UPDATE_APP_THEME,
    theme: theme,
  };
};
