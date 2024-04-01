import React from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';

interface Props {
  handUp: () => void;
  join: () => void;
}

export default function GettingCall(props: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/caller.jpg')}
        style={styles.image}
      />

      <View style={styles.bContainer}>
        <Button title="Join" onPress={props.join} />
        <Button title="HangUp" onPress={props.join} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bContainer: {
    flexDirection: 'row',
    gap: 30,
    bottom: 30
  }
});
