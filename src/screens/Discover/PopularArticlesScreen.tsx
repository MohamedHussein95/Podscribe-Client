import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants';
import { Appbar } from 'react-native-paper';
import Article from '../../components/Article';
import { wp } from '../../utils/Responsive_layout';

const PopularArticlesScreen = ({ route, navigation }) => {
	const DATA = route.params?.articles;
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
							No Articles!
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
