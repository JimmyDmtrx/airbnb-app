import { useRoute } from "@react-navigation/core";
import { Text, View, Button } from "react-native";
import { navigate, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log("route", id);
  return (
    <View>
      <Text>user id </Text>
      <Button
        title="Update"
        onPress={() => {
          navigation.navigate("Settings");
        }}
      />
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
