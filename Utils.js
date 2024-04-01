import {mediaDevices} from 'react-native-webrtc';
export default class Utils {
  static async getStream() {
    let isFront = true;

    const sourceInfos = await mediaDevices.enumerateDevices();
    // console.log(sourceInfos);
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (isFront ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    let mediaConstraints = {
      audio: false,
      video: {
        frameRate: 30,
        facingMode: 'user',
      },
    };

    const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);
    // console.log("mediaStreamAudio: ", mediaStream);
    if (typeof mediaStream != 'boolean') return mediaStream;
    return null;
  }
  static async getStreamAudio() {
    try {
      const sourceInfos = await mediaDevices.enumerateDevices();
      // console.log(sourceInfos);
      let audioSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (sourceInfo.kind == 'audioinput') {
          audioSourceId = sourceInfo.deviceId;
        }
      }
      console.log('audioSourceId: ', audioSourceId);
      let mediaConstraints = {
        audio: true,
        video: {
          frameRate: 30,
          facingMode: 'user',
        },
      };

      const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);
      let videoTrack = await mediaStream.getVideoTracks();
      videoTrack.enabled = false;
      console.log('mediaStreamAudio: ', videoTrack);
      if (typeof mediaStream != 'boolean') return mediaStream;
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
