import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { Colors } from '../constants';
import { DEVICE_HEIGHT, DEVICE_WIDTH, wp } from '../utils/Responsive_layout';
import { Chip } from 'react-native-paper';
import { useGetTopicsMutation } from '../store/topicApiSlice';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../store/userSlice';

const SelectTopic = ({ onPress }) => {
	const [selectedtopics, setSelectedtopics] = useState([]);
	const [topics, setTopics] = useState([]);
	const [getAllTopics] = useGetTopicsMutation({});
	const dispatch = useDispatch();
	useEffect(() => {
		const getTopics = async () => {
			const data = await getAllTopics({}).unwrap();

			setTopics(Object.values(data));
		};
		getTopics();
	}, []);

	const handleChipPress = (chip) => {
		if (selectedtopics.includes(chip)) {
			setSelectedtopics(selectedtopics.filter((c) => c !== chip));
		} else {
			setSelectedtopics([...selectedtopics, chip]);
		}
	};
	const handleNext = () => {
		try {
			dispatch(updateUserInfo({ topics: selectedtopics }));
			onPress();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<View style={styles.screen}>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<View>
					<Text style={styles.titleText}>
						Select your topic of interest 💌
					</Text>
				</View>
				<View style={{ marginBottom: 35 }}>
					<Text style={styles.subTitleText}>
						Select topic of interest fir better recommendations or you can
						skip it
					</Text>
				</View>

				<FlatList
					data={topics}
					numColumns={2}
					pagingEnabled
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<Chip
							onPress={() => handleChipPress(item)}
							key={item}
							selected={selectedtopics.includes(item)}
							selectedColor={Colors.white}
							style={{
								backgroundColor: selectedtopics.includes(item)
									? Colors.primary900
									: Colors.white,
								borderWidth: 2,
								borderColor: Colors.primary900,
								borderRadius: 30,
								margin: 5,
								padding: 10,
							}}
							textStyle={{
								fontFamily: 'Bold',
								fontSize: wp(17),
								color: selectedtopics.includes(item)
									? Colors.white
									: Colors.primary900,
							}}
							compact
						>
							{item}
						</Chip>
					)}
					style={{
						flex: 1,
					}}
					contentContainerStyle={{}}
				/>
			</ScrollView>
			<View style={styles.footer}>
				<TouchableOpacity
					style={{ ...styles.button, backgroundColor: Colors.primary100 }}
					activeOpacity={0.8}
					onPress={onPress}
				>
					<Text style={{ color: Colors.primary900, fontFamily: 'Bold' }}>
						Skip
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						...styles.button,
						backgroundColor:
							selectedtopics.length <= 0
								? Colors.disabled
								: Colors.primary900,
					}}
					activeOpacity={0.8}
					onPress={handleNext}
					disabled={selectedtopics.length <= 0}
				>
					<Text style={{ color: Colors.white, fontFamily: 'Bold' }}>
						Continue
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default memo(SelectTopic);

const styles = StyleSheet.create({
	screen: {
		width: DEVICE_WIDTH,
		marginTop: 20,
		paddingHorizontal: wp(15),
	},
	titleText: {
		fontSize: wp(34),
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'left',
		marginBottom: 15,
	},
	subTitleText: {
		fontSize: wp(17),
		fontFamily: 'Regular',
		color: Colors.black,
		textAlign: 'left',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		alignSelf: 'center',
		width: DEVICE_WIDTH,
		backgroundColor: 'transparent',
		gap: 15,
	},
	button: {
		width: wp(150),
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		marginVertical: 10,
	},
});
