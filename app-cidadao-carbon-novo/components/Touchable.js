import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform
} from "react-native";

export default function Touchable(props) {
  if (Platform.OS === "ios") {
    return <TouchableOpacity {...props} />;
  }
  return <TouchableNativeFeedback {...props} />;
}
