import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { Colors } from '../constants';
export default function TabViewExample({
	scene,
	firstScreen,
	secondScreen,
	tabHeader,
	thirdScreen,
	fourthScreen,
	fifthScreen,
}) {
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);
	const [routes, setRoutes] = useState([
		{ key: 'first', title: firstScreen },
		{ key: 'second', title: secondScreen },
	]);

	useEffect(() => {
		if (thirdScreen && fourthScreen && fifthScreen) {
			const updatedRoutes = [
				...routes,
				{ key: 'third', title: '' },
				{ key: 'fourth', title: '' },
				{ key: 'fifth', title: '' },
			];
			setRoutes(updatedRoutes);
		}
	}, []);

	return (
		<TabView
			renderTabBar={(props) => (
				<>
					{tabHeader && (
						<TabBar
							{...props}
							tabStyle={{
								backgroundColor: Colors.white,
								marginBottom: 5,
								elevation: 0,
							}}
							labelStyle={{
								fontFamily: 'Medium',
								textTransform: 'none',
								fontSize: 15,
							}}
							indicatorStyle={{
								backgroundColor: Colors.primary900,
								height: 4,
							}}
							activeColor={Colors.primary900}
							inactiveColor={Colors.greyScale400}
							indicatorContainerStyle={{
								backgroundColor: Colors.white,
							}}
						/>
					)}
				</>
			)}
			navigationState={{ index, routes }}
			renderScene={scene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			tabBarPosition='top'
		/>
	);
}
