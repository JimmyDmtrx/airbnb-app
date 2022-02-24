import { ActivityIndicator, SwiperFlatList, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RoomScreen = ({ route }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
      );
      setData(response.data);

      setIsLoading(false);
      console.log("data.photos===>", data);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <>
      <SafeAreaView>
        <View>
          <SwiperFlatList
            autoplay={false}
            autoplayDelay={2}
            autoplayLoop={false}
            index={2}
            showPagination
            data={data}
            renderItem={({ item }) => (
              <ImageBackground resizeMode="cover" source={{ uri: item.url }} />
            )}
          />
          <Text>{data.price} €</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RoomScreen;
