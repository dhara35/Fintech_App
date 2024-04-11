import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Colors from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import WidgetList from "@/components/SortableList/WidgetList";

import { defaultStyles } from "@/constants/Styles";
import colors from "native-base/lib/typescript/theme/base/colors";
const Page = () => {
  const headerHeight = useHeaderHeight();
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            source={require("@/assets/images/federal-bank.png")}
            style={styles.image1}
            resizeMode="contain"
          />
          <Image
            source={require("@/assets/images/Fi.png")}
            style={styles.image2}
          />
        </View>

        <Text style={styles.cardNumber}>4231 **** **** 1623</Text>
        <View style={styles.row}>
          <Text style={styles.cvv}>CVV</Text>
          <Text style={styles.cvvCode}>***</Text>
          <Text style={styles.expiry}>EXPIRY</Text>
          <Text style={styles.expiryCode}>**/**</Text>
          <Image
            source={require("@/assets/images/visa.png")}
            style={styles.image3}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text style={defaultStyles.sectionHeader}>Details</Text>
      <WidgetList />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 170,
    margin: 30,
    borderRadius: 10,
    alignItems: "flex-start",
    backgroundColor: Colors.card,
    paddingTop: 10,
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 80,
  },
  image1: {
    position: "absolute",
    width: 100,
    height: 50,
    aspectRatio: 8,
    top: -5,
    left: 0,
  },
  image2: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 0,
    right: -270,
  },
  image3: {
    position: "absolute",
    width: 50,
    height: 30,
    aspectRatio: 0,
    top: 110,
    left: 210,
  },
  cvv: {
    position: "absolute",
    fontWeight: "400",
    color: Colors.azure,
    fontSize: 10,
    top: 110,
  },
  expiry: {
    position: "absolute",
    fontWeight: "400",
    color: Colors.azure,
    fontSize: 10,
    top: 110,
    left: 35,
  },

  cvvCode: {
    position: "absolute",
    fontWeight: "400",
    color: Colors.azure,
    fontSize: 10,
    top: 120,
  },
  expiryCode: {
    position: "absolute",
    fontWeight: "400",
    color: Colors.azure,
    fontSize: 10,
    top: 120,
    left: 35,
  },
  cardNumber: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "800",
    color: Colors.azure,
    top: 80,
    left: 70,
  },
});
export default Page;
