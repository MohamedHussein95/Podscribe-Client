import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import { hp, wp } from '../../utils/Responsive_layout';
import { Colors } from '../../constants';
import Input from '../../components/Input';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CardDisplay from '../../components/CardDisplay';
import CategoryDisplay from '../../components/CategoryDisplay';
import WriterDisplay from '../../components/WriterDisplay';
import ArticleDisplay from '../../components/ArticleDisplay';

const DiscoverScreen = ({ navigation }) => {
	const [searchText, setSearchText] = useState('');
	const [focused, setFocused] = useState(false);
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
					<Image
						source={require('../../../assets/images/logo.png')}
						style={{ width: wp(30), height: hp(30) }}
					/>
					<Appbar.Content
						title='Podscribe'
						titleStyle={{ fontFamily: 'Bold', fontSize: 18 }}
					/>
				</View>

				<Appbar.Action
					icon={'dots-horizontal-circle-outline'}
					size={30}
					color={Colors.black}
				/>
			</Appbar.Header>
			<ScrollView style={{ flex: 1 }}>
				<Input
					placeholder={'Search for articles or writer'}
					onChangeText={setSearchText}
					onBlur={() => setFocused(false)}
					active={focused}
					onFocus={() => setFocused(true)}
					value={searchText}
					keyboardType='default'
					IconPack={MaterialCommunityIcons}
					icon='magnify'
					containerStyle={styles.inputContainer}
				/>
				<CardDisplay
					title={'Most Popular'}
					onPress={() => navigation.navigate('PopularArticlesScreen')}
				/>
				<CategoryDisplay
					title={'Explore by Topics'}
					onPress={() => navigation.navigate('ExploreScreen')}
				/>
				<WriterDisplay
					title={'Top Writers'}
					onPress={() => navigation.navigate('WritersScreen')}
				/>
				<CardDisplay
					title={'Our Recommendations'}
					onPress={() => navigation.navigate('RecommendationsScreen')}
				/>
				{/* <ArticleDisplay title={'New Articles'} /> */}
			</ScrollView>
		</View>
	);
};

export default DiscoverScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	inputContainer: {
		width: wp(370),
		alignSelf: 'center',
	},
});
