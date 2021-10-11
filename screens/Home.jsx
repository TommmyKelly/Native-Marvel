import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import { API_KEY, HASH, TS } from "@env";
import axios from "axios";
import HeroItem from "../components/HeroItem";
import { useDebounce } from "../Hooks/useDebounce";

export default function App({ navigation }) {
  const flatListRef = useRef();
  const [state, setState] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 1000);

  const searchStartsWith = () => {
    const config = {
      method: "get",
      url: `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${inputValue}&apikey=${API_KEY}&hash=${HASH}&ts=${TS}`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        setState(response.data.data.results);
        setState((state) => {
          state.length > 0 && Keyboard.dismiss();
          return state;
        });
        setLoading(false);
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    const config = {
      method: "get",
      url: `https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}&hash=${HASH}&ts=${TS}`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        setState(response.data.data.results);
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStartsWith(debouncedSearchTerm);
      setLoading(true);
    } else {
      getData();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Marvel</Text>

      <TextInput
        style={{
          width: "60%",
          borderWidth: 1,
          padding: 5,
          marginBottom: 10,
          borderRadius: 5,

          backgroundColor: "white",
        }}
        placeholder='Search...'
        autoFocus={true}
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
      />

      {loading ? (
        <Image source={require("../assets/loading.gif")} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          style={{ width: "80%" }}
          data={state}
          renderItem={({ item }) => (
            <HeroItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.name}
        />
      )}

      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
});
