import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import { mediaDevices, RTCView } from 'react-native-webrtc';

import {
    RTCPeerConnection,
    RTCView,
    mediaDevices,
    RTCIceCandidate,
    RTCSessionDescription,
    MediaStream,
  } from "react-native-webrtc";

const WebRTC = () => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getStream = async () => {
      try {
        // Request permissions for audio and video
        const sourceInfos = await mediaDevices.enumerateDevices();
        const videoSourceId = sourceInfos.find(device => device.kind === 'videoinput' && device.facing === 'front');

        // Specify video constraints
        const constraints = {
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: 'user',
            optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
          },
        };

        // Get the stream
        const stream = await mediaDevices.getUserMedia(constraints);
        setStream(stream);
      } catch (e) {
        console.error(e);
      }
    };

    getStream();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {stream && <RTCView streamURL={stream.toURL()} style={styles.stream} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stream: {
    width: '100%',
    height: '100%',
  },
});

export default WebRTC;
