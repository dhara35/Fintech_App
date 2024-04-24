import { defaultStyles } from "@/constants/Styles";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
const Page = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

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
      </View>
    </KeyboardAvoidingView>
  );
};
export default Page;
