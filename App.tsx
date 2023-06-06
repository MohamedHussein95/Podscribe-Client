import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider as PaperProvider } from 'react-native-paper';
import { Fonts } from './src/constants';
import { useCallback } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/store/store';
import store from './src/store/store';
import AppNavigator from './src/navigation/AppNavigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = useFonts(Fonts);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<PaperProvider children={undefined}>
					<AppNavigator onReady={onLayoutRootView} />
				</PaperProvider>
			</PersistGate>
		</Provider>
	);
}
