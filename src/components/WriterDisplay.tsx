import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import Card from './Card';
import { Colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Category from './Category';
import Writer from './Writer';

const WriterDisplay = ({ title }) => {
	const DATA = [
		{
			id: '1',
			photo: 'https://images.pexels.com/photos/7578749/pexels-photo-7578749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			name: 'Ronald',
		},
		{
			id: '2',
			photo: 'https://images.pexels.com/photos/9414411/pexels-photo-9414411.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
			name: 'Theresa',
		},
		{
			id: '3',
			photo: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1600',
			name: 'Natasya',
		},
		{
			id: '4',
			photo: 'https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			name: 'Alfred',
		},
	];
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
				/>
			</View>
			<FlatList
				data={DATA}
				horizontal
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => <Writer item={item} />}
			/>
		</View>
	);
};

export default WriterDisplay;

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
