import React from "react";
import axios from "axios";
import { Header } from "react-native-elements";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import colors from "../assets/colors";
import Touchable from "../components/Touchable";
import RecordSound from "../components/RecordSound";

export default class OcorrenciaScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={colors.primaryCOlor}
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={{
            text: "CARBON",
            style: { color: "#fff" }
          }}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.tileSetContainer}>
            <Touchable
              onPress={() => this.props.navigation.navigate("CriarOcorrencia")}
            >
              <View style={[styles.tileButton, styles.greenBackground]}>
                <Text style={styles.tileTitle}>Acidente</Text>
                <Text style={styles.tileAccent}>sem Vitimas </Text>
              </View>
            </Touchable>
            <Touchable
              onPress={() =>
                this.props.navigation.navigate("CriarOcorrencia", {
                  temVitimas: true
                })
              }
            >
              <View style={[styles.tileButton, styles.orangeBackground]}>
                <Text style={styles.tileTitle}>Acidente</Text>
                <Text style={styles.tileAccent}>com Vitimas </Text>
              </View>
            </Touchable>
          </View>
        </ScrollView>

        {/* <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View> */}
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
    backgroundColor: colors.warningColor
  },
  greenBackground: {
    backgroundColor: colors.successColor
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
    backgroundColor: colors.primaryCOlor,
    height: 120,
    minWidth: Platform.OS == "ios" ? "40%" : 100,
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
