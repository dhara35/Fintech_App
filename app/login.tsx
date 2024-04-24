import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
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
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>

        <View style={styles.inputContainer}>
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
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            password !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignInPress}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <Link href="/reset" asChild>
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: "row",
                gap: 16,
                marginTop: 20,
                backgroundColor: "#fff",
              },
            ]}
          >
            <Text
              style={[defaultStyles.buttonText, { color: "#fff", padding: 15 }]}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href="/register" asChild>
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: "row",
                gap: 16,
                marginTop: 20,
                backgroundColor: "#fff",
              },
            ]}
          >
            <Text
              style={[defaultStyles.buttonText, { color: "#fff", padding: 15 }]}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    backgroundColor: Colors.dark,
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

export default Login;
