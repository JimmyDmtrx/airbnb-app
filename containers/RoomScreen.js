import { ActivityIndicator, Text, View } from "react-native";
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";

const RoomScreen = () => {
  const { params } = useRoute();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //   console.log(props.route);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
      );
      setData(response.data);
      // console.log("response.data===>", response.data);
      setIsLoading(false);
      // console.log("data.photos===>", data);
    };
    console.log("data===>", params);
    fetchData();
  }, []);
  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <View>
      <Text>RoomScreen</Text>
      <Text>id = {route.params.id}</Text>
    </View>
  );
};

export default RoomScreen;
