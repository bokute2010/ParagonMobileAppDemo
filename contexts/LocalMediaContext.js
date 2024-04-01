import React, { createContext, useState, useEffect } from 'react';
// import { getDevices, getCamera, getMic } from '../util/mediaDevices.js';
import { useLocalMedia } from '../hooks/useLocalMedia.js';

export const LocalMediaContext = createContext({
    audioDevices: [],
    videoDevices: [],
    currentVideoDevice: undefined,
    currentAudioDevice: undefined,
    updateLocalAudio: undefined,
    updateLocalVideo: undefined,
   
});

export default function LocalMediaProvider({ children }) {
    const [audioDevices, setAudioDevices] = useState([]);
    const [videoDevices, setVideoDevices] = useState([]);
    const { localAudio, localVideo, setLocalAudio, setLocalVideo } = useLocalMedia();

    useEffect(() => {
        const setDevices = async () => {
            // const { videoDevices, audioDevices } = await getDevices();
            setLocalAudio();
            setLocalVideo();
            // setAudioDevices(
            //     audioDevices.map((device) => {
            //         return { label: device.label, value: device.deviceId };
            //     })
            // );
            // setVideoDevices(
            //     videoDevices.map((device) => {
            //         return { label: device.label, value: device.deviceId };
            //     })
            // );
        };

        setDevices();
    }, []);

    const state = {
        audioDevices,
        videoDevices,
        currentAudioDevice: localAudio,
        currentVideoDevice: localVideo,
        updateLocalAudio: setLocalAudio,
        updateLocalVideo: setLocalVideo,
    };

    return <LocalMediaContext.Provider value={state}>{children}</LocalMediaContext.Provider>;
}
