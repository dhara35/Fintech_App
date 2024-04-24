import Colors from "@/constants/Colors";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { RAZERPAY_KEY_ID, RAZERPAY_KEY_SECRET } from "@env";
import { useUser } from "@clerk/clerk-expo";
import RazorpayCheckout from "react-native-razorpay";

const ShareDetails = ({ company }) => {
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  let razorpayKeyId = RAZERPAY_KEY_ID;
  let razorpayKeySecret = RAZERPAY_KEY_SECRET;
  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const handleQuantityChange = (text) => {
    if (text === "") {
      setQuantity("");
      setTotalAmount(0);
    } else {
      const value = parseInt(text);
      setQuantity(value);
      setTotalAmount(value * company.pricePerShare);
    }
  };

  const currency = "INR";
  const handlePayment = () => {

     var options = {
        description: `Payment successful for ${quantity} ${company.name} shares. Total amount: ₹${totalAmount}`,
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: currency,
        key: razorpayKeyId,
        amount: totalAmount*100,
        name: 'test order',
        order_id: "", //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
        prefill: {
          email: 'xyz@gmail.com',
          contact: '9999999999',
          name: 'User 1'
        },
        theme: { color: '#F37254' }
      }
  
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
        .catch((error) => {
          // handle failure
          console.log(error)
          alert(`Error: ${error.code} | ${error.description}`);
        })
      console.log(
      `Payment successful for ${quantity} ${company.name} shares. Total amount: ₹${totalAmount}`
    );
    }

  return (
    <View style={[styles.container, { backgroundColor: Colors.primary2 }]}>
      <Text style={styles.heading}>{company.name} Share Details</Text>
      <Text style={styles.text}>Price per Share: ₹{company.pricePerShare}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter quantity"
        value={quantity !== "" ? quantity.toString() : ""}
        onChangeText={handleQuantityChange}
      />

      {totalAmount > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.text}>Total Amount: ₹{totalAmount}</Text>
          <Button
            title="Make Payment"
            onPress={handlePayment}
            color="#00b899"
          />
        </View>
      )}
    </View>
  );
};

const companies = [
  { name: "Reliance", pricePerShare: 200 },
  { name: "Google", pricePerShare: 1500 },
  { name: "Apple", pricePerShare: 250 },
];

const App = () => {
  const headerHeight = useHeaderHeight();
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: 60,
      }}
    >
      {companies.map((company, index) => (
        <ShareDetails key={index} company={company} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: Colors.background,
    paddingVertical: 20,
  },
  container: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 40,
    padding: 20,
    margin: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "azure",
  },
  text: {
    color: "azure",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "azure",
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default App;
