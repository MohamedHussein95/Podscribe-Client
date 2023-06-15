import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { memo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import ModalLoader from "../../components/ModalLoader";
import ProgressBarHeader from "../../components/ProgressBarHeader";
import RememberMe from "../../components/RememberMe";
import SetupInput from "../../components/SetupInput";
import { Colors } from "../../constants";
import { setUserInfo } from "../../store/authSlice";
import { RootState } from "../../store/store";
import { useCreateUserMutation } from "../../store/userApiSlice";
import { updateUserInfo } from "../../store/userSlice";
import { wp } from "../../utils/Responsive_layout";

const registerValidationSchema = yup.object().shape({
  userName: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("This field is required"),
});

const CreateAccountScreen = ({ navigation }: any) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [checked, setChecked] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createUser] = useCreateUserMutation();
  const dispatch = useDispatch();

  const handleSignUp = async (
    email: string,
    password: string,
    userName: string
  ) => {
    try {
      setModalVisible(true);

      const credentials = await createUser({
        email,
        password,
        phoneNumber: userInfo.phoneNumber,
      }).unwrap();

      dispatch(setUserInfo(credentials));
      dispatch(updateUserInfo({ userName }));
      setModalVisible(false);
      navigation.replace("SelectCountryScreen");
    } catch (error) {
      setModalVisible(false);
      console.log(error);
      Toast.show({
        type: "error",
        text1: `${error?.data?.message || error?.error || error}`,
        position: "top",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBarHeader num={1} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={{ flex: 1 }}
      >
        <Text style={styles.titleText}>Create an account 🔐</Text>

        <Text style={styles.subTitleText}>
          Enter your username, email, and password. In case you forget your
          password, navigate to the forgot password screen.
        </Text>

        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerValidationSchema}
          onSubmit={(values) =>
            handleSignUp(values.email, values.password, values.userName)
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <SetupInput
                name="Username"
                placeholder="Username"
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                value={values.userName}
                autoCapitalize="none"
                autoCorrect={true}
                keyboardType="default"
              />
              {errors.userName && touched.userName && (
                <Text style={styles.errorText}>{errors.userName}</Text>
              )}

              <SetupInput
                name="Email"
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <SetupInput
                name="Password"
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={showPassword ? false : true}
                icon={showPassword ? "eye" : "eye-off"}
                onPress={() => setShowPassword((prev) => !prev)}
                IconPack={Ionicons}
                color={Colors.primary900}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <SetupInput
                name="ConfirmPassword"
                placeholder="Confirm Password"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={showPassword ? false : true}
                icon={showPassword ? "eye" : "eye-off"}
                onPress={() => setShowPassword((prev) => !prev)}
                IconPack={Ionicons}
                color={Colors.primary900}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <RememberMe
                checked={checked}
                onPress={() => setChecked(!checked)}
              />

              <TouchableOpacity
                style={[styles.button, !isValid && styles.disabledButton]}
                activeOpacity={0.8}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
      <ModalLoader
        modalVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

export default memo(CreateAccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    paddingHorizontal: wp(15),
  },
  titleText: {
    fontSize: wp(34),
    fontFamily: "Bold",
    color: Colors.black,
    textAlign: "left",
    marginBottom: 15,
  },
  subTitleText: {
    fontSize: wp(17),
    fontFamily: "Regular",
    color: Colors.black,
    textAlign: "left",
    marginBottom: 15,
  },
  inputTitle: {
    fontSize: wp(15),
    fontFamily: "Bold",
    color: Colors.black,
    textAlign: "left",
    marginBottom: 5,
  },
  errorText: {
    fontSize: wp(12),
    fontFamily: "Regular",
    color: Colors.error,
    marginBottom: 10,
  },
  button: {
    width: wp(300),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: Colors.primary900,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "Bold",
    fontSize: wp(16),
  },
  disabledButton: {
    backgroundColor: Colors.disabled,
  },
});
