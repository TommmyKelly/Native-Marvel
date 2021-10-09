import React from "react";
import { View, Image, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const HeroItem = ({ navigation, item }) => {
  const onPress = () => {
    navigation.navigate("Profile", { item });
  };
  return (
    <View>
      <Text>{item.name}</Text>
      <TouchableHighlight onPress={onPress}>
        <Image
          style={{ height: 200, width: 200, marginBottom: 5 }}
          source={{
            uri: `${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`,
          }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default HeroItem;
