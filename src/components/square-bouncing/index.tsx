import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const squareSize = 120;
const maxTranslationAmount = 100;

export const SquareBouncing = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  }, []);

  const handleTranslate = () => {
    const tX = Math.random() * maxTranslationAmount * 2 - maxTranslationAmount;
    const tY = Math.random() * maxTranslationAmount * 2 - maxTranslationAmount;

    translateX.value = withSpring(tX);
    translateY.value = withSpring(tY);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.square, rStyle]}
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          rotate.value = withTiming(rotate.value + 90);
        }}
      />
      <TouchableOpacity onPress={handleTranslate} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 64,
    width: 64,
    backgroundColor: '#111',
    borderRadius: 32,
    position: 'absolute',
    bottom: 48,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: squareSize,
    width: squareSize,
    backgroundColor: '#00a6ff',
    borderRadius: 30,
    borderCurve: 'continuous',
  },
});
