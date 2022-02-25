import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Stars from "../components/Stars";
const { width } = Dimensions.get("window");

const RoomScreen = ({ route }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);

        setIsLoading(false);
        // console.log("data===>", data.location);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView>
      <View>
        <View>
          <View style={{ height: 200 }}>
            <SwiperFlatList
              autoplay={false}
              autoplayDelay={2}
              autoplayLoop={false}
              index={0}
              showPagination
              data={data.photos}
              renderItem={({ item }) => (
                <ImageBackground
                  style={styles.imgFlatList}
                  resizeMode="cover"
                  source={{ uri: item.url }}
                />
              )}
            />
            <Text style={styles.priceTag}>{data.price} €</Text>
          </View>

          <View>
            <Text numberOfLines={1}>{data.title}</Text>
            <View style={styles.infoAccount}>
              <View>
                <View style={styles.reviews}>
                  <Stars rating={data.ratingValue} />
                  <Text>{data.reviews} reviews</Text>
                </View>
              </View>

              <Image
                style={styles.userPic}
                source={{
                  uri: data.user.account.photo.url,
                }}
                resizeMode="cover"
              />
              <Image />
            </View>
          </View>
          <View style={styles.descripRoom}>
            <Text>{data.description}</Text>
          </View>
        </View>
      </View>
      <MapView
        style={styles.mapBlock}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  descripRoom: {
    margin: 10,
  },
  infoAccount: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    marginTop: 10,
    margin: 10,
  },
  userPic: {
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 30,
    right: 10,
  },
  mapBlock: { height: 250, width: "100%" },
  imgFlatList: { width, justifyContent: "center" },
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
  reviews: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default RoomScreen;
