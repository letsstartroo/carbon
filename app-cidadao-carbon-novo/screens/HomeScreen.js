import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Header } from "react-native-elements";

import Touchable from "../components/Touchable";
import Colors from "../constants/Colors";
import CameraExample from "../components/Camera";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={Colors.primaryCOlor}
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={{
            text: "Fiscal Cidadão",
            style: { color: "#fff" }
          }}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.tileSetContainer}>
            <Touchable onPress={() => this.props.navigation.navigate("Camera")}>
              <View style={[styles.tileButton, styles.greenBackground]}>
                <Text style={styles.tileAccent}>Acidente </Text>
              </View>
            </Touchable>
          </View>

          <View style={styles.tileSetContainer}>
            <Touchable onPress={() => this.props.navigation.navigate("Camera")}>
              <View style={[styles.tileButton, styles.greenBackground]}>
                <Text style={styles.tileAccent}>Melhorias na Via </Text>
              </View>
            </Touchable>
          </View>

          <View style={styles.tileSetContainer}>
            <Touchable onPress={() => this.props.navigation.navigate("Camera")}>
              <View style={[styles.tileButton, styles.greenBackground]}>
                <Text style={styles.tileAccent}>Irregularidades </Text>
              </View>
            </Touchable>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  contentContainer: {
    paddingTop: 30
  },
  orangeBackground: {
    backgroundColor: Colors.warningColor
  },
  greenBackground: {
    backgroundColor: Colors.successColor
  },
  tileSetContainer: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 8
  },
  tileButton: {
    margin: 0,
    alignSelf: Platform.OS == "ios" ? "stretch" : "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Colors.primaryCOlor,
    height: 100,
    minWidth: Platform.OS == "ios" ? "60%" : 120,
    margin: Platform.OS == "ios" ? 0 : 10,

    flex: 1
  },
  tileTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 14
  },
  tileAccent: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  }
});
