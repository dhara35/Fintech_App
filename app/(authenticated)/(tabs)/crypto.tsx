import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { defaultStyles } from "@/constants/Styles";
import { Currency } from "@/interfaces/crypto";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const headerHeight = useHeaderHeight();

  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      return await fetch("/api/listings").then((res) => res.json());
    },
  });

  const ids = currencies.data?.map((currency: any) => currency.id).join(",");

  const { data } = useQuery({
    queryKey: ["info", ids],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${ids}`).then((res) =>
        res.json()
      );
      return info;
    },
    enabled: !!ids,
  });

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <Text style={defaultStyles.sectionHeader}>Latest crypto</Text>
      <View style={styles.block}>
        {currencies.data?.map((currency: Currency) => (
          <View
            key={currency.id}
            style={{ flexDirection: "row", gap: 14, alignItems: "center" }}
          >
            <Image
              source={{ uri: data?.[currency.id]?.logo }}
              style={styles.logo}
            />
            <View style={{ flex: 1, gap: 10 }}>
              <Text style={{ fontWeight: "600", color: Colors.dark }}>
                {currency.name}
              </Text>
              <Text
                style={{
                  color: Colors.gray,
                }}
              >
                {currency.symbol}
              </Text>
            </View>
            <View style={{ gap: 10, alignItems: "flex-end" }}>
              <Text>{currency.quote.EUR?.price.toFixed(2)} ₹</Text>
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <Ionicons
                  name={
                    currency.quote.EUR.percent_change_1h > 0
                      ? "caret-up"
                      : "caret-down"
                  }
                  size={16}
                  color={
                    currency.quote.EUR.percent_change_1h > 0 ? "green" : "red"
                  }
                />
                <Text
                  style={{
                    color:
                      currency.quote.EUR.percent_change_1h > 0
                        ? "green"
                        : "red",
                  }}
                >
                  {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  block: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
});
export default Page;
