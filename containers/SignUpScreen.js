import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { navigate, useNavigation } from "@react-navigation/core";
import axios from "axios";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("jim.dmtrx@live.fr");
  const [username, setUsername] = useState("jimjim");
  const [description, setDescription] = useState("description");
  const [password, setPassword] = useState("bibi");
  const [verifyPassword, setverifyPassword] = useState("bibi");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      if (email && username && password && verifyPassword && description) {
        if (password === verifyPassword) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          // console.log(response.data);
          setToken(response.data.token);
        } else {
          setErrorMessage("Les 2 MDP ne sont pas identiques !");
        }
      } else {
        setErrorMessage("Remplir tous les champs !");
      }
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);

      if (
        error.response.data.error === "This username already has an account." ||
        error.response.data.error === "This email already has an account."
      ) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <View>
          <View>
            <View style={styles.logo}>
              <Image
                style={styles.logoimg}
                source={require("../assets/logo.png")}
              />
            </View>
            <View style={styles.emailholder}>
              <TextInput
                value={email}
                placeholder="email"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.emailholder}>
              <TextInput
                value={username}
                placeholder="username"
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.emailholder}>
              <TextInput
                value={description}
                placeholder="description"
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={styles.passwordholder}>
              <TextInput
                value={password}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.passwordholder}>
              <TextInput
                value={verifyPassword}
                placeholder="confirn pssword"
                onChangeText={(text) => setverifyPassword(text)}
                secureTextEntry={true}
              />
            </View>
            <Text style={{ color: "red", marginTop: 5 }}>{errorMessage}</Text>
            <Button
              title="Sign up"
              onPress={async () => {
                const userToken = "secret-token";
                setToken(userToken);
              }}
              onPress={handlePress}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text>Already have an account ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // logo
  logo: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,
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
