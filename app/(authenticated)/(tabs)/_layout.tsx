import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import TitleHeader from "@/components/TitleHeader";
import CustomHeader from "@/components/CustomHeader";
import { View } from "react-native";
import ExploreHeader from "@/components/ExploreHeader";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.Active,
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: Colors.primary2,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="registered" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="credit-card" size={size} color={color} />
          ),
          header: () => <TitleHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Explore Stock",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="credit-card" size={size} color={color} />
          ),
          header: () => <ExploreHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="bitcoin" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      {/* <Tabs.Screen
        name="lifestyle"
        options={{
          title: "Lifestyle",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="th" size={size} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
};
export default Layout;
