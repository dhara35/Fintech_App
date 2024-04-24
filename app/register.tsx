import {
  Platform,
  TextInput,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your Email. We will send you a confirmation code there
        </Text>

        <View style={styles.inputContainer}>
          <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />

          {!pendingVerification && (
            <>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={Colors.gray}
                value={emailAddress}
                onChangeText={setEmailAddress}
              />
              <TextInput
                style={[styles.input]}
                placeholder="password"
                placeholderTextColor={Colors.gray}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={[
                  defaultStyles.pillButton,
                  password !== "" ? styles.enabled : styles.disabled,
                  { marginBottom: 20 },
                ]}
                onPress={onSignUpPress}
              >
                <Text style={defaultStyles.buttonText}>Sign up</Text>
              </TouchableOpacity>
            </>
          )}

          {pendingVerification && (
            <>
              <View>
                <TextInput
                  style={[styles.input]}
                  value={code}
                  placeholderTextColor={Colors.gray}
                  secureTextEntry
                  placeholder="Verification-Code"
                  onChangeText={setCode}
                />
              </View>

              <TouchableOpacity
                style={[
                  defaultStyles.pillButton,
                  code !== "" ? styles.enabled : styles.disabled,
                  { marginBottom: 20 },
                ]}
                onPress={onPressVerify}
              >
                <Text style={defaultStyles.buttonText}>Verify Email</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginVertical: 40,
    flexDirection: "column",
    gap: 10,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
  enabled: {
    backgroundColor: Colors.blue,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Register;
