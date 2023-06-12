import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { Colors } from '../../constants';
import { hp, wp } from '../../utils/Responsive_layout';
import CardDisplay from '../../components/CardDisplay';
import { ImageBackground } from 'react-native';
import { useGetArticlesMutation } from '../../store/articleApiSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native-gesture-handler';

const HomeScreen = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);

	const [getArticles] = useGetArticlesMutation({});

	const { authInfo } = useSelector((state) => state.auth);

	const getAllArticles = async () => {
		try {
			setLoading(true);
			const userId = authInfo.uid;
			const articles = await getArticles(userId).unwrap();
			setArticles(articles);
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
		getAllArticles();
	}, []);
	return (
		<View style={styles.screen}>
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
				<Appbar.Action icon={'bell-outline'} size={25} />
				<Appbar.Action icon={'bookmark-minus-outline'} size={25} />
			</Appbar.Header>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={{ paddingBottom: 10 }}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={getAllArticles}
					/>
				}
			>
				<ImageBackground
					source={require('../../../assets/images/readMore.png')}
					style={styles.introCard}
				>
					<Text style={styles.introText}>
						Learn how to become great writer right now!
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<TouchableOpacity style={styles.readMore}>
							<Text style={styles.readMoreText}>Read more</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
				<CardDisplay
					title={'Recent Articles'}
					onPress={undefined}
					DATA={articles}
					loading={loading}
				/>
				<CardDisplay
					title={'Your Articles'}
					onPress={undefined}
					DATA={articles}
					loading={loading}
				/>
				<CardDisplay
					title={'On Your Bookmark'}
					onPress={undefined}
					DATA={articles}
					loading={loading}
				/>
			</ScrollView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	introCard: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: Colors.primary900,
		width: wp(370),
		padding: 15,
		alignSelf: 'center',
		marginVertical: 15,
		borderRadius: 20,
		elevation: 2,
	},
	readMore: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white,
		padding: 10,
		marginVertical: 10,
		borderRadius: 20,
		elevation: 2,
	},
	introText: {
		fontFamily: 'Bold',
		fontSize: wp(20),
		color: Colors.white,
		lineHeight: 30,
		textAlign: 'left',
	},
	readMoreText: {
		fontFamily: 'SemiBold',
		fontSize: wp(17),
		color: Colors.primary900,
	},
});
