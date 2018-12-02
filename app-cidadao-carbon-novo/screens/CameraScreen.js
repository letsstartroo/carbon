import React from "react";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Camera, Permissions, Location } from "expo";
import { Octicons, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import Textarea from "react-native-textarea";

import Dialog, {
  DialogContent,
  DialogButton,
  DialogTitle
} from "react-native-popup-dialog";

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#000",
      borderColor: 0,
      shadowRadius: 0,
      shadowColor: "transparent",
      shadowOffset: {
        height: 0
      },
      borderBottomWidth: 0
    },
    shadowColor: "transparent",

    headerTintColor: "#fff",
    style: {
      backgroundColor: "#fff",
      shadowColor: "transparent",
      shadowRadius: 0,
      shadowOffset: {
        height: 0
      }
    }
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    media: null,
    recording: false,
    loading: false,
    location: { latitude: 0, longitude: 0 }
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    this.setState({ loadingLocation: true });

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location.coords });

    this.timeout = setTimeout(() => this._getLocationAsync(), 20000);
  };

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  send = async () => {
    try {
      const formData = new FormData();
      const { media } = this.state;
      debugger;

      this.setState({
        loading: true,
        media: null
      });

      console.log(media);

      formData.append("anexo", {
        uri: media.file.uri, // your file path string
        name: `anexo.${media.type == "video" ? "mov" : "jpg"}`,
        type: `${media.type == "video" ? "video" : "image"}/${
          media.type == "video" ? "mov" : "jpeg"
        }`
      });

      let url = "/upload";

      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      var a = await this.enviarEvento(res.data.data);
      this.setState({
        loading: false
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.camera.resumePreview();
      this.setState({
        loading: false
      });
    }
  };

  enviarEvento(anexo) {
    return axios.post("/evento", {
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude,
      natureza_evento_id: this.props.navigation.getParam("natureza", 1),
      descricao: this.state.descricao,
      cpf: "04883733106",
      anexo
    });
  }

  takePic = async () => {
    if (this.camera) {
      this.setState({
        loading: true,
        descricao: null
      });
      let photo = await this.camera.takePictureAsync({ quality: 0.4 });
      this.camera.pausePreview();
      this.setState({
        media: {
          file: photo,
          type: "picture"
        }
      });
    }
  };

  record = async () => {
    this.setState({ recording: true, descricao: null });
    try {
      const mov = await this.camera.recordAsync();

      this.setState({
        media: {
          file: mov,
          type: "video"
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ recording: false });
    }
  };

  stopRecord = async () => {
    this.setState({ recording: false });
    this.camera.stopRecording();
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, height: 400 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            useCamera2Api
            ref={ref => {
              this.camera = ref;
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 16,
                top: 16
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              <Ionicons
                style={{ color: "white", fontSize: 44 }}
                name="ios-reverse-camera"
              />
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                paddingBottom: 32,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "flex-end",
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                disabled={this.state.recording}
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}
                onPress={this.takePic}
              >
                <View
                  style={{
                    borderColor: "white",
                    flexDirection: "row",
                    borderWidth: 3,
                    height: 64,
                    width: 64,
                    borderRadius: 32,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: "black",
                    shadowOpacity: 1.0
                  }}
                >
                  <Octicons
                    name="device-camera"
                    style={{
                      color: "white",
                      fontSize: 25,
                      top: 16
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center"
                }}
                onPress={this.state.recording ? this.stopRecord : this.record}
              >
                <View
                  style={{
                    borderColor: "white",
                    flexDirection: "row",
                    borderWidth: 3,
                    height: 64,
                    width: 64,
                    borderRadius: 32,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: "black",
                    shadowOpacity: 1.0
                  }}
                >
                  <Octicons
                    name={
                      this.state.recording
                        ? "primitive-square"
                        : "device-camera-video"
                    }
                    style={{
                      color: "white",
                      fontSize: 25,
                      top: 16
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Camera>

          <Dialog
            visible={!!this.state.media}
            dialogTitle={
              <DialogTitle
                title={`Enviar ${
                  this.state.media && this.state.media.type == "picture"
                    ? "Foto"
                    : "Video"
                }`}
              />
            }
            actions={[
              <DialogButton
                text="Cancelar"
                onPress={() => {
                  this.setState({ media: null });
                  this.camera.resumePreview();
                }}
              />,
              <DialogButton text="Enviar" onPress={this.send} />
            ]}
            onTouchOutside={() => {
              this.setState({ media: null });
              this.camera.resumePreview();
            }}
          >
            <DialogContent style={{ flexDirection: "column" }}>
              <View style={styles.card}>
                <View style={styles.image}>
                  <SimpleLineIcons
                    name={
                      this.state.media &&
                      (this.state.media.type == "picture" ? "picture" : "video")
                    }
                    style={{
                      fontSize: 36,
                      top: 6,
                      alignSelf: "center",
                      flex: 1
                    }}
                  />
                </View>
                <View style={[styles.text]}>
                  <Text> Foto </Text>
                </View>
              </View>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                defaultValue={this.state.descricao}
                onChangeText={descricao => this.setState({ descricao })}
                maxLength={120}
                placeholder={"Se quiser nós conte sobre o que está enviando 😃"}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />
            </DialogContent>
          </Dialog>
          {this.state.loading ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator
                color="white"
                style={styles.loading}
                size="large"
              />
            </View>
          ) : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    flexDirection: "row",
    justifyContent: "center",

    alignItems: "center",
    alignContent: "center"
  },
  loadingOverlay: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  loading: {
    alignSelf: "center"
  },
  text: {
    height: 50,
    flex: 3,
    backgroundColor: "white",
    alignSelf: "center",
    padding: 8,
    justifyContent: "center"
  },
  image: {
    flex: 1,
    width: 60,
    backgroundColor: "#eee",
    height: 50,
    marginTop: 16,
    marginBottom: 16,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  textareaContainer: {
    height: 180,
    width: "70%",
    minWidth: "70%",
    padding: 5,
    backgroundColor: "white"
  },
  textarea: {
    textAlignVertical: "top", // hack android
    height: 170,
    width: 260,
    fontSize: 14,
    color: "#333"
  }
});
