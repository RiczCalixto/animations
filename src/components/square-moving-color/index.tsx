import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const squareSize = 120;

export const SquareMovingColor = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const prevPosition = useSharedValue({ x: 0, y: 0 });
  const isDragging = useSharedValue(false);

  const rotate = useDerivedValue(() => {
    if (isDragging.value) {
      return withTiming(45);
    }
    return withTiming(0);
  }, []);

  const scale = useDerivedValue(() => {
    if (isDragging.value) {
      return withTiming(1.2);
    }
    return withTiming(1);
  }, []);

  const color = useDerivedValue(() => {
    if (isDragging.value) {
      return withTiming('#00a6ff');
    }
    const isWhiteSpace = translateY.value < 0;
    const isBlackSpace = translateY.value > 0;
    if (isBlackSpace) {
      return withTiming('white');
    }
    if (isWhiteSpace) {
      return withTiming('black');
    }
    return withTiming('#00a6ff');
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
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

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isDragging.value = true;
      prevPosition.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate(e => {
      translateX.value = e.translationX + prevPosition.value.x;
      translateY.value = e.translationY + prevPosition.value.y;
    })
    .onFinalize(() => {
      isDragging.value = false;
    });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.square, rStyle]} />
      </GestureDetector>
      <View style={styles.background} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: squareSize,
    width: squareSize,
    borderRadius: 30,
    borderCurve: 'continuous',
  },
  background: {
    position: 'absolute',
    top: '50%',
    left: 0,
    height: '50%',
    width: '100%',
    backgroundColor: 'black',
    zIndex: -1,
  },
});
