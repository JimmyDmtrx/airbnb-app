import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const AroundMe = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const coords = [
    { latitude: 48.850869, longitude: 2.378946 },
    { latitude: 48.834672, longitude: 2.320606 },
    { latitude: 48.871938, longitude: 2.330379 },
  ];

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
        } else {
          alert("permission not allowed");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getPermission();
  }, []);
  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <Text>Location !</Text>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        style={styles.map}
        showsUserLocation={true}
      >
        {coords.map((item, index) => {
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 500,
    width: "100%",
  },
});
export default AroundMe;
