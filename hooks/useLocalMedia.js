import {useState} from 'react';

import Utils from '../Utils.js';
import  {LocalStageStream, StreamType} from "amazon-ivs-web-broadcast";

export function useLocalMedia() {
  const [localVideo, setLocalVideo] = useState(undefined);
  const [localAudio, setLocalAudio] = useState(undefined);

  async function setLocalVideoFromId(id) {
    const stream = await Utils.getStream();
    const videoTrack = stream.getVideoTracks()[0];

    // const videoTrack = await getCamera(id);
    createLocalStream(videoTrack);
  }

  async function setLocalAudioFromId(id) {
    const stream = await Utils.getStreamAudio();
    console.log("getStreamAudio ", stream);
    // const audioTrack = stream.getAudioTracks();
    // const audioTrack = await getMic(id);
    createLocalStream(stream);
  }

  function createLocalStream(track) {
    if (!track) {
      console.warn('tried to set local media with a null track');
      return;
    }

    // console.log("track ", track);
    // console.log("LocalStageStream ", LocalStageStream);
    const stream = new LocalStageStream(track, {simulcast: {enabled: true}});
    // console.log("stream ", stream);
    console.log("streamType ", stream.streamType === StreamType.VIDEO);
    if (stream.streamType === StreamType.VIDEO) {
      setLocalVideo(stream);
    } else {
      setLocalAudio(stream);
    }
  }

  return {
    localAudio,
    localVideo,
  
    setLocalAudio: setLocalAudioFromId,
    setLocalVideo: setLocalVideoFromId,
  };
}
