import { View } from 'react-native';

import { SquareMovingColor } from './components/square-moving-color';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <SquareBouncing /> */}
      <SquareMovingColor />
    </View>
  );
};

export { App };
