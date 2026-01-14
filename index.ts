import { registerRootComponent } from "expo";

import App from "./src/App";
import TrackPlayer, { Event, State } from "react-native-track-player";

export const PlaybackService = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemotePlayPause, async () => {
    const { state } = await TrackPlayer.getPlaybackState();
    if (state !== State.Playing) {
      TrackPlayer.play();
      return;
    }
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, (event) =>
    TrackPlayer.seekTo(event.position)
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
