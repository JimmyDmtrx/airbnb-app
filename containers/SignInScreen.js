import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      <View>
        <View>
          <View style={styles.logo}>
            <Image
              style={styles.logoimg}
              source={require("../assets/logo.png")}
            />
          </View>
          <View style={styles.emailholder}>
            <TextInput placeholder="email" />
          </View>
          <View style={styles.passwordholder}>
            <TextInput placeholder="Password" secureTextEntry={true} />
          </View>

          <View>
            <Button
              title="Sign in"
              onPress={async () => {
                const userToken = "secret-token";
                setToken(userToken);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  // logo
  logo: {
    justifyContent: "center",
    alignItems: "center",
    height: 320,
  },
  logoimg: {
    height: 200,
    width: 200,
  },

  // INPUT NAME

  emailholder: {
    height: 75,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "red",
    borderWidth: 1,
  },
  passwordholder: {
    height: 75,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "red",
    borderWidth: 1,
  },
});
