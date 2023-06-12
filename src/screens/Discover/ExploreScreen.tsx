import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants';
import { Appbar } from 'react-native-paper';
import { hp, wp } from '../../utils/Responsive_layout';
import Category from '../../components/Category';
import { useGetTopicsMutation } from '../../store/topicApiSlice';
import { useDispatch } from 'react-redux';

const ExploreScreen = ({ navigation }) => {
	const [topics, setTopics] = useState({});
	const [getAllTopics] = useGetTopicsMutation([]);
	//console.log(topics);

	const dispatch = useDispatch();

	useEffect(() => {
		const getTopics = async () => {
			const data = await getAllTopics({}).unwrap();

			setTopics(data);
		};
		getTopics();
	}, []);
	return (
		<View style={styles.screen}>
			<Appbar.Header style={{ paddingHorizontal: 0 }}>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 5,
					}}
				>
					<Appbar.BackAction onPress={() => navigation.pop()} />
					<Appbar.Content
						title='Explore by Topics'
						titleStyle={{ fontFamily: 'Bold' }}
					/>
				</View>

				<Appbar.Action icon={'magnify'} size={25} />
			</Appbar.Header>
			<FlatList
				numColumns={2}
				data={topics}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<Category
						item={item}
						style={{
							width: wp(180),
							height: hp(150),
							marginHorizontal: 5,
						}}
					/>
				)}
				contentContainerStyle={{
					alignItems: 'center',
					gap: 10,
					paddingBottom: 10,
				}}
				style={{ flex: 1 }}
				ListEmptyComponent={
					<View style={{ marginTop: 50, alignItems: 'center' }}>
						<Text
							style={{
								fontFamily: 'Bold',
								fontSize: wp(20),
								color: Colors.greyScale400,
							}}
						>
							No New Articles!
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default ExploreScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
	},
});
