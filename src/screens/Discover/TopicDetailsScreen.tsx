import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Article from '../../components/Article';
import Category from '../../components/Category';
import { Colors } from '../../constants';
import { useGetArticleByTopicMutation } from '../../store/articleApiSlice';
import { hp, wp } from '../../utils/Responsive_layout';

const TopicDetailsScreen = ({ route, navigation }) => {
	const { item } = route.params;

	const [Articles, setArticles] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [sort, setSort] = useState('recent');

	const [getArticles] = useGetArticleByTopicMutation();

	const sortArticles = () => {
		try {
			if (sort === 'recent') {
				const sortedArticles = [...Articles];
				sortedArticles.sort((a, b) => {
					// Convert publicationTime to Date objects for comparison
					const dateA = new Date(a.publicationTime);
					const dateB = new Date(b.publicationTime);

					// Compare the dates
					if (dateA > dateB) {
						return -1; // a comes before b
					} else if (dateB < dateA) {
						return 1;
					} else {
						return 0; // no change in order
					}
				});

				setArticles(sortedArticles);
			} else if (sort === 'popular') {
				const sortedArticles = [...Articles];
				sortedArticles.sort((a, b) => {
					if (a.reads.length > b.reads.length) {
						return -1;
					}
				});

				setArticles(sortedArticles);
			}
		} catch (error) {
			console.error(error);

			Toast.show({
				type: 'error',
				text1: `${error?.data?.message || error?.error || error}`,
				position: 'top',
			});
		}
	};

	useEffect(() => {
		sortArticles();
	}, [sort]);
	const getArticlesByTopic = async () => {
		try {
			setRefreshing(true);
			const tid = item.id;
			const articles = await getArticles(tid).unwrap();
			const sortedArticles = [...articles];
			sortedArticles.sort((a, b) => {
				// Convert publicationTime to Date objects for comparison
				const dateA = new Date(a.publicationTime);
				const dateB = new Date(b.publicationTime);

				// Compare the dates
				if (dateA > dateB) {
					return -1; // a comes before b
				} else if (dateB < dateA) {
					return 1;
				} else {
					return 0; // no change in order
				}
			});
			setArticles(sortedArticles);
			setRefreshing(false);
		} catch (error) {
			setRefreshing(false);
			console.error(error);

			Toast.show({
				type: 'error',
				text1: `${error?.data?.message || error?.error || error}`,
				position: 'top',
			});
		}
	};
	useEffect(() => {
		getArticlesByTopic();
	}, []);

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
						alignSelf: 'center',
					}}
				/>
				<View style={styles.header}>
					<Text style={{ fontFamily: 'Bold', fontSize: 20, flex: 1 }}>
						Sort by
					</Text>
					<TouchableOpacity
						style={styles.sort}
						onPress={() => {
							if (sort === 'recent') {
								setSort('popular');
							} else {
								setSort('recent');
							}
						}}
					>
						{sort === 'recent' ? (
							<>
								<Text style={styles.sortText}>Most Popular</Text>
								<MaterialCommunityIcons
									name='sort'
									size={20}
									color={Colors.primary900}
								/>
							</>
						) : (
							<>
								<Text style={styles.sortText}>Most Recent</Text>
								<MaterialCommunityIcons
									name='sort'
									size={20}
									color={Colors.primary900}
								/>
							</>
						)}
					</TouchableOpacity>
				</View>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={getArticlesByTopic}
							colors={[Colors.primary900]}
						/>
					}
					data={Articles}
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
								No articles for this topic!
							</Text>
						</View>
					}
				/>
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
		marginHorizontal: 10,
		marginVertical: 15,
	},
	sort: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	sortText: {
		fontFamily: 'Bold',
		fontSize: wp(15),
		color: Colors.primary900,
	},
});
