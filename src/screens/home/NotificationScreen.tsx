import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SceneMap } from 'react-native-tab-view';
import TabViewExample from '../../components/TopTap';
import { Colors } from '../../constants';
import { hp, wp } from '../../utils/Responsive_layout';
import GeneralNotificationScreen from './GeneralNotificationScreen';
import SystemNotificationsScreen from './SystemNotificationsScreen';

const renderScene = SceneMap({
	first: GeneralNotificationScreen,
	second: SystemNotificationsScreen,
});

const NotificationScreen = ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<Appbar.Header
				style={{
					backgroundColor: Colors.white,
					paddingHorizontal: 10,
				}}
			>
				<Appbar.BackAction onPress={() => navigation.pop()} />
				<Appbar.Content
					title={'Notification'}
					color={Colors.black}
					style={{ marginHorizontal: 10 }}
					titleStyle={{ fontFamily: 'Bold', fontSize: 18 }}
				/>

				<Appbar.Action icon={'cog-outline'} size={30} />
			</Appbar.Header>
			<View style={styles.bodyContainer}>
				<TabViewExample
					scene={renderScene}
					firstScreen={'General'}
					secondScreen={'System'}
				/>
			</View>
		</View>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: Colors.white },
	bodyContainer: { marginHorizontal: 15, flex: 1 },
});
