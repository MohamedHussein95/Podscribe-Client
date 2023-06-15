import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
	Image,
	RefreshControl,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import CardDisplay from '../../components/CardDisplay';
import CategoryDisplay from '../../components/CategoryDisplay';
import Input from '../../components/Input';
import WriterDisplay from '../../components/WriterDisplay';
import { Colors } from '../../constants';
import { useGetArticlesMutation } from '../../store/articleApiSlice';
import { useGetUsersMutation } from '../../store/userApiSlice';
import { hp, wp } from '../../utils/Responsive_layout';
import { useSelector } from 'react-redux';

const DiscoverScreen = ({ navigation }) => {
	const [searchText, setSearchText] = useState('');
	const [focused, setFocused] = useState(false);
	const [articles, setArticles] = useState([]);
	const [users, setUsers] = useState([]);
	const [getUsers] = useGetUsersMutation();
	const [loading, setLoading] = useState(false);
	const [getArticles] = useGetArticlesMutation({});

	const { authInfo } = useSelector((state) => state.auth);

	const getAllArticles = async () => {
		try {
			setLoading(true);
			const userId = authInfo.uid;
			const articles = await getArticles(userId).unwrap();
			const users = await getUsers({}).unwrap();
			setArticles(articles);
			setUsers(users);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			Toast.show({
				type: 'error',
				text1: `${error?.data?.message || error?.error || error.message}`,
				position: 'top',
			});
		}
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			getAllArticles();
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<View style={styles.screen}>
			<ScrollView
				style={{ flex: 1 }}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={getAllArticles}
					/>
				}
				showsVerticalScrollIndicator={false}
			>
				<Appbar.Header style={{ backgroundColor: Colors.white }}>
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
					iconRight={undefined}
					color={undefined}
					touched={undefined}
					errors={undefined}
					onPressIconRight={undefined}
					onPressIconLeft={undefined}
				/>
				<CardDisplay
					title={'Most Popular'}
					DATA={articles}
					loading={loading}
				/>
				<CategoryDisplay
					title={'Explore by Topics'}
					onPress={() => navigation.navigate('ExploreScreen')}
					loading={loading}
				/>
				<WriterDisplay
					title={'Top Writers'}
					onPress={() => navigation.navigate('WritersScreen')}
					DATA={users}
					loading={loading}
				/>
				<CardDisplay
					title={'Our Recommendations'}
					onPress={() => navigation.navigate('RecommendationsScreen')}
					DATA={articles}
					loading={loading}
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
