import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import HeroProfile from "./screens/HeroProfile";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "red",
              shadowColor: "transparent", // this covers iOS
              elevation: 0,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name='Profile'
          component={HeroProfile}
          options={({ route }) => ({
            title: route.params.item.name,
            headerStyle: {
              backgroundColor: "red",
              shadowColor: "transparent", // this covers iOS
              elevation: 0,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
