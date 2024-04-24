import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

import { defaultStyles } from "@/constants/Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ExploreHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top, backgroundColor: Colors.background }}>
      <View
        style={[
          styles.container,
          {
            height: 60,
            gap: 10,
            paddingHorizontal: 20,
            backgroundColor: "transparent",
          },
        ]}
      >
        <View style={styles.Section}>
          <Ionicons name={"bar-chart"} size={30} color={Colors.blue} />
          <Text style={defaultStyles.titleHeader}>Explore Stocks</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  Section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default ExploreHeader;
