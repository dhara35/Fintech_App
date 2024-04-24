import {
  Platform,
  TextInput,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive?.({ session: result?.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Forgot your Password!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your Email. We will send you a confirmation code there
        </Text>

        <View style={styles.inputContainer}>
          <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

          {!successfulCreation && (
            <>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={Colors.gray}
                value={emailAddress}
                onChangeText={setEmailAddress}
              />

              <TouchableOpacity
                style={[
                  defaultStyles.pillButton,
                  emailAddress !== "" ? styles.enabled : styles.disabled,
                  { marginBottom: 20 },
                ]}
                onPress={onRequestReset}
              >
                <Text style={defaultStyles.buttonText}>Send Reset Email</Text>
              </TouchableOpacity>
            </>
          )}

          {successfulCreation && (
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
                  code !== "" ? styles.enabled : styles.disabled,
                  { marginBottom: 20 },
                ]}
                onPress={onReset}
              >
                <Text style={defaultStyles.buttonText}>Set new Password</Text>
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
  enabled: {
    backgroundColor: Colors.blue,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default PwReset;
