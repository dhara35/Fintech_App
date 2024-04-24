import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";

const Profile = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName!);
      setLastName(user.lastName!);
    }
  }, [user]);

  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName,
        lastName,
      });
      alert("User updated successfully");
      console.log("User updated successfully");
    } catch (e) {
      console.log("Error updating user:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>
        Hey! {user?.firstName} {user?.lastName}!
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
      />
      <Button onPress={onSaveUser} title="Update account" color={"#00b899"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    backgroundColor: Colors.dark,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 10,
    color: Colors.azure,
    textAlign: "center",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default Profile;
