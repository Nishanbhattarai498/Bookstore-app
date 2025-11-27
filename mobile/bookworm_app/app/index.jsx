import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import React from "react";


export default function Index() {
  return (
    <View
      style={
         styles.container
      }
    >
      <Text style={styles.title}>Hello</Text>
      <Link href="/(auth)/signUp">SignUp</Link>
      <Link href="/(auth)">Login </Link>
    </View>
  );
}
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
}); 