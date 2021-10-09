import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacityComponent,
} from "react-native";
import { API_KEY, HASH, TS } from "@env";
import axios from "axios";
import HeroItem from "../components/HeroItem";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function App({ navigation }) {
  const [state, setState] = useState([]);

  const getData = () => {
    const config = {
      method: "get",
      url: `https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}&hash=${HASH}&ts=${TS}`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        setState(response.data.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Marvel</Text>

      <FlatList
        data={state}
        renderItem={({ item }) => (
          <HeroItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.name}
      />

      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
