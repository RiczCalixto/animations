import { View } from 'react-native';

import { SquareBouncing } from './components/square-bouncing';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <SquareBouncing />
    </View>
  );
};

export { App };
