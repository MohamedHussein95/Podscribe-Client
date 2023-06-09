import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import Card from './Card';
import { Colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardDisplay = ({ title, onPress }) => {
	const DATA = [
		{
			id: '1',
			photo: 'https://images.pexels.com/photos/3221849/pexels-photo-3221849.png?auto=compress&cs=tinysrgb&w=600&lazy=load',
			title: '10 Tips for Boosting Your productivity',
			user: {
				avatar:
					'https://images.pexels.com/photos/3221849/pexels-photo-3221849.png?auto=compress&cs=tinysrgb&w=600&lazy=load',
				fullName: 'Howard sadasdasdsadsadsaad',
				userName: '@howard',
			},
			postedAt: new Date().toISOString(),
		},
		{
			id: '2',
			photo: 'https://images.pexels.com/photos/2102063/pexels-photo-2102063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			title: 'Why Travel is the Best Investment You could ever Do',
			user: {
				avatar:
					'https://images.pexels.com/photos/2102063/pexels-photo-2102063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
				fullName: 'Bella',
				userName: '@bella',
			},
			postedAt: new Date().toISOString(),
		},
		{
			id: '3',
			photo: 'https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?auto=compress&cs=tinysrgb&w=1600',
			title: 'Organize your thoughts and achieve this',
			user: {
				avatar:
					'https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?auto=compress&cs=tinysrgb&w=1600',
				fullName: 'John',
				userName: '@john',
			},
			postedAt: new Date().toISOString(),
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
					onPress={onPress}
				/>
			</View>
			<FlatList
				data={DATA}
				horizontal
				keyExtractor={(item) => item.id}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => <Card item={item} />}
			/>
		</View>
	);
};

export default CardDisplay;

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
