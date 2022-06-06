import {
  UPDATE_USER_LOGIN,
  UPDATE_USER_ACCESS_TOKEN,
  UPDATE_ONBOARDING_STATUS,
  UPDATE_APP_THEME,
} from "../Constants";

const initialState = {
  user: {},
  isloggedIn: false,
  accessToken: "",
  onboardingStatus: false,
  appTheme: false,
};

const authReducer = (state = initialState, action) => {
  const {
    type,
    user,
    isloggedIn = false,
    accessToken = "",
    status,
    theme,
  } = action;

  switch (type) {
    case UPDATE_USER_LOGIN: {
      return { ...state, user, isloggedIn: isloggedIn };
    }

    case UPDATE_USER_ACCESS_TOKEN:
      return { ...state, accessToken: accessToken };

    case UPDATE_ONBOARDING_STATUS:
      return { ...state, onboardingStatus: status };

    case UPDATE_APP_THEME:
      return { ...state, appTheme: theme };
  }

  return state;
};

export default authReducer;
