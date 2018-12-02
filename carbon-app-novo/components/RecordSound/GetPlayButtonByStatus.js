import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Icon } from "react-native-elements";
import colors from "../../assets/colors";
import Touchable from "../Touchable";

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    padding: 0,
    height: 48,
    width: 48,
    backgroundColor: colors.primaryCOlor,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flex: 1
  },
  container: {
    padding: 0,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: 48,
    width: 48
  },
  icon: {}
});

const ICON_SIZE = 30;

function ActionButton({ loading, onPress, icon }) {
  return (
    <Touchable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.button}>
          {!loading ? (
            <Ionicons
              backgroundColor="white"
              name={icon}
              size={35}
              color="white"
            />
          ) : (
            <ActivityIndicator color="white" />
          )}
        </View>
      </View>
    </Touchable>
  );
}

const GetPlayButtonByStatus = props => {
  if (props.recordStatus === "RECORDING") {
    return (
      <Button
        buttonStyle={styles.button}
        color="red"
        icon={
          <Icon type="font-awesome" name="ios-play" size={15} color="white" />
        }
      />
    );
  } else {
    if (
      props.playStatus === "BUFFERING" ||
      props.playStatus === "LOADING" ||
      props.playStatus === "NO_SOUND_FILE_AVAILABLE"
    ) {
      return <ActionButton loading icon="ios-play" size={15} color="white" />;
    } else if (props.playStatus === "PAUSED") {
      return (
        <ActionButton
          loading
          onPress={props.onPlayPress}
          icon="ios-play"
          size={15}
          color="white"
        />
      );
    } else if (props.playStatus === "STOPPED") {
      return (
        <ActionButton
          onPress={props.onPlayPress}
          icon="ios-play"
          size={15}
          color="white"
        />
      );
    } else if (props.playStatus === "PLAYING") {
      return (
        <ActionButton
          onPress={props.onPausePress}
          icon="md-square"
          size={15}
          color="white"
        />
      );
    } else if (props.playStatus === "ERROR") {
      return <ActionButton icon="md-warning" color="red" />;
    } else {
      console.warn(
        `GetPlayButtonByStatus: unknown playStatus ${props.playStatus}`
      );

      return <ActionButton icon="md-warning" color="orange" />;
    }
  }
};

export default GetPlayButtonByStatus;
