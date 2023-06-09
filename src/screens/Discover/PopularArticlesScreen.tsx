import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants';
import { Appbar } from 'react-native-paper';
import Article from '../../components/Article';
import { wp } from '../../utils/Responsive_layout';

const DATA = [
	{
		id: '1',
		coverImage:
			'https://images.pexels.com/photos/3221849/pexels-photo-3221849.png?auto=compress&cs=tinysrgb&w=600&lazy=load',
		title: '10 Tips for Boosting Your productivity',
		user: {
			avatar:
				'https://images.pexels.com/photos/3221849/pexels-photo-3221849.png?auto=compress&cs=tinysrgb&w=600&lazy=load',
			fullName: 'Howard sadasdasdsadsadsaad',
			userName: '@howard',
		},
		publicationTime: new Date().toISOString(),
	},
	{
		id: '2',
		coverImage:
			'https://images.pexels.com/photos/2102063/pexels-photo-2102063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		title: 'Why Travel is the Best Investment You could ever Do',
		user: {
			avatar:
				'https://images.pexels.com/photos/2102063/pexels-photo-2102063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			fullName: 'Bella',
			userName: '@bella',
		},
		publicationTime: new Date().toISOString(),
	},
	{
		id: '3',
		coverImage:
			'https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?auto=compress&cs=tinysrgb&w=1600',
		title: 'Organize your thoughts and achieve this',
		user: {
			avatar:
				'https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?auto=compress&cs=tinysrgb&w=1600',
			fullName: 'John',
			userName: '@john',
		},
		publicationTime: new Date().toISOString(),
	},
];

const PopularArticlesScreen = ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<Appbar.Header>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 10,
						marginLeft: 5,
					}}
				>
					<Appbar.BackAction onPress={() => navigation.pop()} />
					<Appbar.Content
						title='Most Popular'
						titleStyle={{ fontFamily: 'Bold' }}
					/>
				</View>

				<Appbar.Action icon={'magnify'} size={25} />
			</Appbar.Header>
			<FlatList
				data={DATA}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <Article item={item} />}
				contentContainerStyle={{
					justifyContent: 'center',
					paddingHorizontal: 10,
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

export default PopularArticlesScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
	},
});
