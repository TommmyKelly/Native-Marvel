import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

const HeroProfile = () => {
  const route = useRoute();
  const { item } = route.params;
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.text}>{item.name}</Text>
        <Image
          style={{ height: 400, width: "80%", marginBottom: 5 }}
          source={{
            uri: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`,
          }}
        />

        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ScrollView>
  );
};

export default HeroProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    width: "80%",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
