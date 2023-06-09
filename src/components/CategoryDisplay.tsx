import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import Card from './Card';
import { Colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Category from './Category';
import { useNavigation } from '@react-navigation/native';

const DATA = [
	{
		id: '1',
		photo: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		topic: 'Travel',
		articles: ['2', '4'],
	},
	{
		id: '2',
		photo: 'https://images.pexels.com/photos/1390403/pexels-photo-1390403.jpeg?auto=compress&cs=tinysrgb&w=1600',
		topic: 'Health',
		articles: ['2', '4'],
	},
	{
		id: '3',
		photo: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1600',
		topic: 'Science & Techonology',
		articles: ['2', '4'],
	},
	{
		id: '4',
		photo: 'https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1600',
		topic: 'Coding',
		articles: ['2', '4'],
	},
];

const CategoryDisplay = ({ title, onPress }) => {
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
				data={DATA}
				horizontal
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => <Category item={item} />}
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
