// import { Pressable, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import {
// 	AntDesign,
// 	Ionicons,
// 	MaterialCommunityIcons,
// } from '@expo/vector-icons';
// import { DEVICE_WIDTH } from '../utils/Responsive_layout';
// import { Colors } from '../constants';

// const TabBar = ({ state, descriptors, navigation }: any) => {
// 	return (
// 		<View style={styles.mainContainer}>
// 			{state.routes.map((route: any, index: number) => {
// 				const focused = state.index === index;
// 				let iconName;
// 				if (route.name === 'HomeScreen') {
// 					iconName = focused ? 'home' : 'home-outline';
// 					return (
// 						<Ionicons
// 							key={index}
// 							name={iconName}
// 							size={25}
// 							color={Colors.primary900}
// 						/>
// 					);
// 				}
// 				const { options } = descriptors[route.key];
// 				const label =
// 					options.tabBarLabel !== undefined
// 						? options.tabBarLabel
// 						: options.title !== undefined
// 						? options.title
// 						: route.name;

// 				const onPress = () => {
// 					const event = navigation.emit({
// 						type: 'tabPress',
// 						target: route.key,
// 					});

// 					if (!focused && !event.defaultPrevented) {
// 						navigation.navigate(route.name);
// 					}
// 				};

// 				return (
// 					<View key={index} style={styles.mainItemContainer}>
// 						<Pressable onPress={onPress}>
// 							<View
// 								style={{
// 									justifyContent: 'center',
// 									alignItems: 'center',
// 								}}
// 							>
// 								<Text>{label}</Text>
// 							</View>
// 						</Pressable>
// 					</View>
// 				);
// 			})}
// 		</View>
// 	);
// };

// export default TabBar;

// const styles = StyleSheet.create({
// 	mainContainer: {
// 		flexDirection: 'row',
// 		position: 'absolute',
// 		bottom: 0,
// 		backgroundColor: Colors.white,
// 	},
// 	mainItemContainer: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// });
