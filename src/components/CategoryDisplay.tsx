import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants';
import Category from './Category';
import { useGetTopicsMutation } from '../store/topicApiSlice';

const CategoryDisplay = ({ title, onPress }) => {
	const [topics, setTopics] = useState([]);
	const [getAllTopics] = useGetTopicsMutation({});

	useEffect(() => {
		const getTopics = async () => {
			const data = await getAllTopics({}).unwrap();

			setTopics(data);
		};
		getTopics();
	}, []);
	return (
		<View style={styles.display}>
			<View style={styles.header}>
				<Text style={{ fontFamily: 'Bold', fontSize: 20, flex: 1 }}>
					{title}
				</Text>
				<MaterialCommunityIcons
					name='arrow-right-thin'
					size={30}
					color={Colors.primary900}
					onPress={onPress}
				/>
			</View>
			<FlatList
				data={topics}
				horizontal
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<Category item={item} style={undefined} />
				)}
				initialNumToRender={5}
			/>
		</View>
	);
};

export default CategoryDisplay;

const styles = StyleSheet.create({
	display: {
		marginVertical: 5,
	},
	header: {
		flexDirection: 'row',
		marginHorizontal: 10,
		marginVertical: 5,
	},
});
