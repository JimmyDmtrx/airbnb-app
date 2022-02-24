import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import Stars from "../components/Stars";
import axios from "axios";

export default function HomeScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <View>
      <ActivityIndicator size="large" color="##F8585C" />
    </View>
  ) : (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                props.navigation.navigate("Room", {
                  id: item._id,
                });
              }}
            >
              <View>
                <ImageBackground
                  source={item.photos[0]}
                  resizeMode="cover"
                  style={styles.itemImg}
                >
                  <Text style={styles.priceTag}>{item.price}€</Text>
                </ImageBackground>

                <View style={styles.imgUserContain}>
                  <View style={styles.textView}>
                    <Text>{item.title}</Text>
                    <View style={styles.stars}>
                      <Stars rating={item.ratingValue}></Stars>
                    </View>
                  </View>
                  <View style={styles.imgUserView}>
                    <Image
                      source={{ uri: item.user.account.photo.url }}
                      style={styles.imgUser}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  stars: { flexDirection: "row" },
  itemImg: { height: 180, padding: 5 },
  priceTag: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "black",
    color: "white",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  imgUser: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  imgUserContain: {
    borderWidth: 1,
    borderColor: "blue",
    flexDirection: "row",
    height: 75,
  },
  imgUserView: {
    flex: 2,
  },
  textView: { flex: 3 },
});
