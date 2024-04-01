/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useRef, useEffect, useContext} from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import WebRTC from './components/WebRTC.js';
import Video from './components/Video';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';
import GettingCall from './components/GettingCall';
import Utils from './Utils.js';
import StageProvider from './contexts/StageContext.js';
import LocalMediaProvider from './contexts/LocalMediaContext.js';
import useStage from './hooks/useStage.js';
import {StageContext} from './contexts/StageContext.js';
const token = "eyJhbGciOiJLTVMiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MTE5OTg2NTQsImlhdCI6MTcxMTk1NTQ1NCwianRpIjoiMUZBR3RwZE9GQzhzIiwicmVzb3VyY2UiOiJhcm46YXdzOml2czphcC1zb3V0aC0xOjU5MDE4MzkyNzkzNzpzdGFnZS9jY2NJOEMzZUZ0Z0ciLCJ0b3BpYyI6ImNjY0k4QzNlRnRnRyIsImV2ZW50c191cmwiOiJ3c3M6Ly9nbG9iYWwuZWV2ZWUuZXZlbnRzLmxpdmUtdmlkZW8ubmV0Iiwid2hpcF91cmwiOiJodHRwczovLzA5YTU1NDM5MjU0NS5nbG9iYWwtYm0ud2hpcC5saXZlLXZpZGVvLm5ldCIsInVzZXJfaWQiOiIxIiwiY2FwYWJpbGl0aWVzIjp7ImFsbG93X3B1Ymxpc2giOnRydWV9LCJ2ZXJzaW9uIjoiMC4wIn0.MGUCMQDXfJscW9jQvdyf6DfL0uvBa1m7_zTRrcgMhcWP88roosOGg7EMq7h5LBFZKfeJq8UCMBuFRK4Vzz2zJlgMJpBCcZbElB9scC9sN41KTl8dLBkpOOaiFdGkNx98QHOhziOkwg"
function Root() {
  const {joinStage} = useContext(StageContext);
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [gettingCall, setGettingCall] = useState(false);
  const pc = useRef();
  const connecting = useRef(false);

  const setupWebrtc = async () => {
    //Get the audio and video stream for the call
    const stream = await Utils.getStream();
    if (stream) {
      setLocalStream(stream);
    }
  };
  const create = async () => {
    console.log('Calling');
    // setupWebrtc();
    joinStage(token)
    
  };
  const join = async () => {};
  const hangUp = async () => {
    setLocalStream(null);
  };

  if (gettingCall) {
    return <GettingCall handUp={hangUp} join={join} />;
  }

  //Displays local stream on calling
  //Displays both local and remote stream once call is connected

  if (localStream) {
    return (
      <Video
        handUp={hangUp}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    );
  }

  // Displays the call button
  return (
    <View style={styles.container}>
      <Button title="Call" onPress={create} />
    </View>
  );
}

function App() {
  return (
    <LocalMediaProvider>
      <StageProvider>
        <Root />
      </StageProvider>
    </LocalMediaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center'
  },
});

export default App;
