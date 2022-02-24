import { View, Text } from "react-native";

const RoomScreen = ({ route }) => {
  console.log(props.route);
  return (
    <View>
      <Text>RoomScreen</Text>
      <Text>id = {route.params.id}</Text>
    </View>
  );
};

export default RoomScreen;
