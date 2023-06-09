import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { Colors } from '../../constants';
import Category from '../../components/Category';
import { hp, wp } from '../../utils/Responsive_layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ArticleDisplay from '../../components/ArticleDisplay';

const TopicDetailsScreen = ({ route, navigation }) => {
	const { item } = route.params;

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
						title={item.topic}
						titleStyle={{ fontFamily: 'Bold' }}
					/>
				</View>

				<Appbar.Action icon={'magnify'} size={25} />
			</Appbar.Header>
			<View style={{ paddingHorizontal: 15, flex: 1 }}>
				<Category
					item={item}
					style={{
						width: wp(350),
						height: hp(150),
						marginHorizontal: 5,
					}}
				/>
				<ArticleDisplay title={'Sort by'} />
			</View>
		</View>
	);
};

export default TopicDetailsScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	header: {
		flexDirection: 'row',

		marginVertical: 20,
	},
});
