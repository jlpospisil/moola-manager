import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';
import App from './src/components/App';

// TODO: remove this once the issue is resolved
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

AppRegistry.registerComponent(appName, () => App);
