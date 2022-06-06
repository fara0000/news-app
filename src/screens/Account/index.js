import React, { useEffect, useState } from "react";
import {View,Text,ScrollView,Image,TouchableOpacity,Switch,StatusBar} from "react-native";
import { useDispatch, connect } from "react-redux";
import { useNavigation, useTheme } from "@react-navigation/native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/dist/Ionicons";
import PropTypes from "prop-types";
import { showSnackbar } from "../../Utils/Snackbar";
import ImagePicker from "react-native-image-crop-picker";
import * as authActions from "../../redux/Actions/authActions";

const Account = ({ ...props }) => {

  const { colors: { card, text, primary, background }, dark } = useTheme();
  const { isloggedIn, updateAppTheme, appTheme } = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    dark ? setIsEnabled(true) : setIsEnabled(false);
    StatusBar.setBackgroundColor(dark ? background : primary);
  }, [appTheme]);

  const toggleSwitch = () => {
    updateAppTheme(!isEnabled);
  };

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    navigation.replace("Login");
    showSnackbar("Successfully logged out.");
  };

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log(image);
    });
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30, flex: 1 }}>
      <View style={[styles().main_container]}>
        <View style={styles(card, text, primary, dark).profile_section}>
          <View style={styles().image_circle_container}>
            <View
              style={styles().image_container}
            >
              <Image style={{ height: 80, width: 80, alignSelf: "center", borderRadius: 40,}}
                source={require("../../assets/user.png")}
              />
              <Icon style={{alignSelf: "center",top: -28,left: -20,
                }}
                name="create"
                size={20}
                color={dark ? text : primary}
                onPress={handleChoosePhoto}
              />
            </View>

            <Text style={[styles(card, text).user_name_text]}>
              {isloggedIn ? "Ajit Pradhan" : "......."}
            </Text>

            {isloggedIn ? (
              <TouchableOpacity
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  backgroundColor: "#eeeeee",
                  marginTop: 20,
                  height: 40,
                  borderRadius: 10,
                  justifyContent: "center",
                  elevation: 2,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 16,
                    color: primary,
                  }}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={styles(card, text, primary, dark).login_btn_container}
              >
                <Text
                  style={styles(card, text, primary, dark).login_btn_text}
                >
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={styles().option_container}
          >
            <View
              style={styles().inner_op_container}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon name={dark ? "moon" : "moon-outline"} size={20} color={dark ? text : primary} />
                <Text style={styles(card, text, primary, dark).inner_op_text} >
                  Dark Mode
                </Text>
              </View>
              <View style={{}}>
                <Switch
                  trackColor={{ false: "#767577", true: "#fff" }}
                  thumbColor={isEnabled ? primary : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </View>


          <View
            style={styles().option_container}
          >
            <TouchableOpacity style={styles().inner_op_container}>
              <View style={{ flexDirection: "row", }}
              >
                <Icon name="information-circle" size={20} color={dark ? text : primary} />
                <Text style={styles(card, text, primary, dark).inner_op_text}>
                  About
                </Text>
              </View>
              <View style={{}}>
                <Icon name="chevron-forward" size={20} color={dark ? text : primary} />
                {/* <Icon name="chevron-forward" size={20} color={primary} /> */}
              </View>
            </TouchableOpacity>
          </View>
          {isloggedIn && (
            <TouchableOpacity style={styles(card, text, primary, dark).login_btn_container} onPress={logout} >
              <Text style={styles().login_btn_text}>
                Logout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

Account.propTypes = {
  fetchNewsByRelated: PropTypes.func,
  user: PropTypes.object.isRequired,
  isloggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isloggedIn: state.auth.isloggedIn,
    appTheme: state.auth.appTheme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateAppTheme: (isEnabled) =>
    dispatch(authActions.updateAppTheme(isEnabled)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
