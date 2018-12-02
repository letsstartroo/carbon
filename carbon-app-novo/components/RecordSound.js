import React from "react";
import Recorder from "./RecordSound/Recorder";
import { Audio } from "expo";

export const audioMode = {
  allowsRecordingIOS: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentModeIOS: true,
  playsInSilentLockedModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  playThroughEarpieceAndroid: true
};

export default function RecordSound({ text, onComplete }) {
  return (
    <Recorder
      style={{ flex: 1 }}
      onComplete={onComplete}
      maxDurationMillis={150000}
      audioMode={audioMode}
      text={text}
      completeButtonText={"Finished"}
      showDebug={true}
    />
  );
}

// import React from "react";
// import Expo, { Asset, Audio, FileSystem, Font, Permissions } from "expo";
// import { View, Slider, Text, TouchableHighlight } from "react-native";

// export default class RecordSound extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       haveRecordingPermissions: false,
//       isLoading: false,
//       isPlaybackAllowed: false,
//       muted: false,
//       soundPosition: null,
//       soundDuration: null,
//       recordingDuration: null,
//       shouldPlay: false,
//       isPlaying: false,
//       isRecording: false,
//       fontLoaded: false,
//       shouldCorrectPitch: true,
//       volume: 1.0,
//       rate: 1.0
//     };
//     this.sound = null;
//     this.recordingSettings = JSON.parse(
//       JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)
//     );
//   }

//   componentDidMount() {
//     this._askForPermissions();
//   }

//   _onStopPressed = () => {
//     if (this.sound != null) {
//       this.sound.stopAsync();
//     }
//   };

//   _onRecordPressed = () => {
//     if (this.state.isRecording) {
//       this._stopRecordingAndEnablePlayback();
//     } else {
//       this._stopPlaybackAndBeginRecording();
//     }
//   };
//   async _stopPlaybackAndBeginRecording() {
//     this.setState({
//       isLoading: true
//     });
//     if (this.sound !== null) {
//       await this.sound.unloadAsync();
//       this.sound.setOnPlaybackStatusUpdate(null);
//       this.sound = null;
//     }
//     await Audio.setAudioModeAsync({
//       allowsRecordingIOS: true,
//       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//       playsInSilentModeIOS: true,
//       shouldDuckAndroid: true,
//       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
//     });
//     if (this.recording !== null) {
//       this.recording.setOnRecordingStatusUpdate(null);
//       this.recording = null;
//     }

//     const recording = new Audio.Recording();
//     await recording.prepareToRecordAsync(this.recordingSettings);
//     recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

//     this.recording = recording;
//     await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
//     this.setState({
//       isLoading: false
//     });
//   }

//   async _stopRecordingAndEnablePlayback() {
//     this.setState({
//       isLoading: true
//     });
//     try {
//       await this.recording.stopAndUnloadAsync();
//     } catch (error) {
//       // Do nothing -- we are already unloaded.
//     }
//     const info = await FileSystem.getInfoAsync(this.recording.getURI());
//     console.log(`FILE INFO: ${JSON.stringify(info)}`);
//     await Audio.setAudioModeAsync({
//       allowsRecordingIOS: false,
//       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//       playsInSilentModeIOS: true,
//       playsInSilentLockedModeIOS: true,
//       shouldDuckAndroid: true,
//       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
//     });
//     const { sound, status } = await this.recording.createNewLoadedSound(
//       {
//         isLooping: true,
//         isMuted: this.state.muted,
//         volume: this.state.volume,
//         rate: this.state.rate,
//         shouldCorrectPitch: this.state.shouldCorrectPitch
//       },
//       this._updateScreenForSoundStatus
//     );
//     this.sound = sound;
//     this.setState({
//       isLoading: false
//     });
//   }

//   _askForPermissions = async () => {
//     const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
//     this.setState({
//       haveRecordingPermissions: response.status === "granted"
//     });
//   };

//   _getMMSSFromMillis(millis) {
//     const totalSeconds = millis / 1000;
//     const seconds = Math.floor(totalSeconds % 60);
//     const minutes = Math.floor(totalSeconds / 60);

//     const padWithZero = number => {
//       const string = number.toString();
//       if (number < 10) {
//         return "0" + string;
//       }
//       return string;
//     };
//     return padWithZero(minutes) + ":" + padWithZero(seconds);
//   }

//   _getSeekSliderPosition() {
//     if (
//       this.sound != null &&
//       this.state.soundPosition != null &&
//       this.state.soundDuration != null
//     ) {
//       return this.state.soundPosition / this.state.soundDuration;
//     }
//     return 0;
//   }

//   _getPlaybackTimestamp() {
//     if (
//       this.sound != null &&
//       this.state.soundPosition != null &&
//       this.state.soundDuration != null
//     ) {
//       return `${this._getMMSSFromMillis(
//         this.state.soundPosition
//       )} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
//     }
//     return "";
//   }
//   _onSeekSliderValueChange = value => {
//     if (this.sound != null && !this.isSeeking) {
//       this.isSeeking = true;
//       this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
//       this.sound.pauseAsync();
//     }
//   };

//   _onSeekSliderSlidingComplete = async value => {
//     if (this.sound != null) {
//       this.isSeeking = false;
//       const seekPosition = value * this.state.soundDuration;
//       if (this.shouldPlayAtEndOfSeek) {
//         this.sound.playFromPositionAsync(seekPosition);
//       } else {
//         this.sound.setPositionAsync(seekPosition);
//       }
//     }
//   };

//   render() {
//     return (
//       <View>
//         <TouchableHighlight
//           onPress={this._onRecordPressed}
//           disabled={this.state.isLoading}
//         >
//           <Text> Gravar {this.state.isRecording ? "LIVE" : ""}</Text>
//         </TouchableHighlight>
//         {this.state.isRecording ? (
//           <TouchableHighlight
//             onPress={this._onRecordPressed}
//             disabled={this.state.isLoading}
//           >
//             <Text> Gravar </Text>
//           </TouchableHighlight>
//         ) : null}
//         <Slider
//           value={this._getSeekSliderPosition()}
//           onValueChange={this._onSeekSliderValueChange}
//           onSlidingComplete={this._onSeekSliderSlidingComplete}
//           //   disabled={!this.state.isPlaybackAllowed || this.state.isLoading}
//         />
//         <Text>{this._getPlaybackTimestamp()}</Text>
//       </View>
//     );
//   }
// }
