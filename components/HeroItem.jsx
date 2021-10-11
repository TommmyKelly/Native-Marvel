import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const HeroItem = ({ navigation, item }) => {
  const onPress = () => {
    navigation.navigate("Profile", { item });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.name}</Text>
      <View
        style={{
          width: "100%",
        }}
      >
        <TouchableHighlight
          onPress={onPress}
          style={{
            width: "100%",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: Dimensions.get("window").width - 10,
              height: 300,
              marginBottom: 5,
            }}
            resizeMode='stretch'
            source={{
              uri: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`,
            }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default HeroItem;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
