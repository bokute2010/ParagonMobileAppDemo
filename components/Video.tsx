import {Button, StyleSheet, View} from 'react-native';
import {MediaStream, RTCView} from 'react-native-webrtc';

interface Props {
  handUp: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

function ButtonContainer(props: Props) {
  return (
    <View style={styles.bContainer}>
      <Button title="End Call" onPress={props.handUp} />
    </View>
  );
}

export default function Video(props: Props) {
  //On call we will just display the local stream
  if (props.localStream && !props.remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={props.localStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
        <ButtonContainer handUp={props.handUp} />
      </View>
    );
  }

  //Once the call is connected we will display
  //local Stream on top of remote Stream
  if (props.localStream && props.remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={props.remoteStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
        <RTCView
          streamURL={props.localStream.toURL()}
          objectFit="cover"
          style={styles.videoLocal}
        />
        <ButtonContainer handUp={props.handUp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bContainer: {
    flexDirection: 'row',
    bottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10
  }
});
