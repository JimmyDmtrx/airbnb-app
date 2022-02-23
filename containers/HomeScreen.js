import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import Stars from "../components/Stars";
import axios from "axios";

export default function HomeScreen() {
  const Tab = createBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return isLoading ? (
    <View>
      <Text>chargement</Text>
      <ActivityIndicator size="large" color="##F8585C" />
    </View>
  ) : (
    <>
      <View style={styles.containHome}>
        <Text>Welcome home!</Text>
        <View style={styles.containOffer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <View style={styles.containCarou}>
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
              );
            }}
          />
        </View>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  stars: { flexDirection: "row" },
  // containHome: { borderWidth: 2, borderColor: "red" },
  // containOffer: { borderWidth: 2, borderColor: "chartreuse" },
  containCarou: { height: 200, marginTop: 60 },
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
