import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserNotificationsMutation } from '../../store/userApiSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import GenNotication from '../../components/GenNotication';
import { Colors } from '../../constants';
import { wp } from '../../utils/Responsive_layout';

const GeneralNotificationScreen = () => {
	const [notifications, setnotifications] = useState([]);
	const [loading, setLoading] = useState(false);

	const { authInfo } = useSelector((state) => state.auth);
	const [getNotifications] = useGetUserNotificationsMutation({});
	const getUserNotifications = async () => {
		try {
			setLoading(true);
			const userId = authInfo.uid;
			const data = await getNotifications(userId).unwrap();
			setnotifications(data);
			console.log(data);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			Toast.show({
				type: 'error',
				text1: `${error?.data?.message || error?.error || error.message}`,
				position: 'top',
			});
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			getUserNotifications();
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, []);
	return (
		<View style={styles.screen}>
			{loading ? (
				<ActivityIndicator size={'small'} color={Colors.primary900} />
			) : (
				<FlatList
					data={notifications}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => <GenNotication item={item} />}
					ListEmptyComponent={
						<View
							style={{
								marginVertical: 5,
								flex: 1,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								marginLeft: 50,
							}}
						>
							<Text
								style={{
									fontFamily: 'Regular',
									fontSize: wp(15),
									color: Colors.greyScale400,
								}}
							>
								You have No notifications!
							</Text>
						</View>
					}
				/>
			)}
		</View>
	);
};

export default GeneralNotificationScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
	},
});
