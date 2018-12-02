import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Header, Avatar } from "react-native-elements";
import colors from "../assets/colors";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <>
        <Header
          backgroundColor={colors.primaryCOlor}
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={{
            text: "Configurações",
            style: { color: "#fff" }
          }}
        />
        <ScrollView style={styles.container}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
          <View style={styles.profile}>
            <Avatar
              large
              rounded
              title="PM"
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />

            <Text style={{ fontSize: 30, paddingLeft: 16 }}>
              {" "}
              Soldado Silva
            </Text>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  profile: {
    padding: 8,
    paddingLeft: 24,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center"
  }
});
