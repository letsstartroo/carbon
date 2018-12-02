import React from "react";
import { Button, Icon } from "react-native-elements";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    justifyContent: "center"
  },
  container: {
    padding: 0
  }
});

const ICON_SIZE = 30;

function ActionButton({ loading, onPress, icon }) {
  return (
    <Touchable onPress={onPress}>
      <View>
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

const GetRecordButtonByStatus = props => {
  if (props.playStatus === "PLAYING") {
    return <ActionButton icon="ios-mic" />;
  } else {
    if (props.recordStatus === "RECORDING") {
      return (
        <ActionButton onPress={props.onStopRecordingPress} icon="md-square" />
      );
    }
    if (props.playStatus === "BUFFERING" || props.playStatus === "LOADING") {
      return <ActionButton loading icon="ios-mic" />;
    } else if (
      props.recordStatus === "NOT_RECORDING" ||
      props.recordStatus === "NOT_STARTED" ||
      props.recordStatus === "RECORDING_COMPLETE"
    ) {
      return (
        <ActionButton onPress={props.onStartRecordingPress} icon="ios-mic" />
      );
    } else if (props.recordStatus === "ERROR") {
      return <ActionButton icon="md-warning" color="red" />;
    } else {
      console.warn(
        `GetRecordButtonByStatus: unknown recordStatus ${props.recordStatus}`
      );

      return <ActionButton icon="md-warning" color="orange" />;
    }
  }
};

export default GetRecordButtonByStatus;
