import { ActivityIndicator, Text, View, Button } from "react-native";
import { navigate, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileScreen({ userId }) {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log("route", userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <View>
      <Text>{userId}</Text>
      {/* <Button
        title="Update"
        onPress={() => {
          navigation.navigate("Settings");
        }}
      /> */}
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
