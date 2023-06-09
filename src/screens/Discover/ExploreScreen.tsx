import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants';
import { Appbar } from 'react-native-paper';
import { hp, wp } from '../../utils/Responsive_layout';
import Category from '../../components/Category';

const DATA = [
	{
		id: '1',
		topic: 'Travel',
		articles: ['2', '4'],
		photo: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: '2',
		topic: 'Health',
		articles: ['2', '4'],
		photo: 'https://images.pexels.com/photos/1390403/pexels-photo-1390403.jpeg?auto=compress&cs=tinysrgb&w=1600',
	},
	{
		id: '3',
		topic: 'Science & Techonology',
		articles: ['2', '4'],
		photo: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1600',
	},
	{
		id: '4',
		topic: 'Coding',
		articles: ['2', '4'],
		photo: 'https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=1600',
	},
];

const ExploreScreen = ({ navigation }) => {
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
				data={DATA}
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
