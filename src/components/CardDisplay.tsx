import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo, useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../constants';
import Card from './Card';
import { CardLayout } from './Skeleton';
import { wp } from '../utils/Responsive_layout';
import { useNavigation } from '@react-navigation/native';

const CardDisplay = ({ title, onPress, DATA, loading }) => {
	const { authInfo } = useSelector((state) => state.auth);
	const [articles, setArticles] = useState([]);
	const { bookMarks } = useSelector((state) => state.user);
	const navigation = useNavigation();
	const sortedArticles = useMemo(() => {
		const copy = [...DATA];
		if (title === TITLE_MOST_POPULAR) {
			return copy.sort((a, b) => b.reads.length - a.reads.length);
		} else if (title === TITLE_RECENT_ARTICLES) {
			return copy.sort(
				(a, b) => new Date(b.publicationTime) - new Date(a.publicationTime)
			);
		} else if (title === TITLE_YOUR_ARTICLES) {
			return copy.filter((article) => article.user.id === authInfo.uid);
		} else if (title === TITLE_ON_YOUR_BOOKMARK) {
			return copy.filter((b) => bookMarks.includes(b.id));
		} else {
			return copy;
		}
	}, [DATA, title, authInfo]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setArticles(sortedArticles);
		}, 1000); // Delay for demonstration purposes, adjust as needed

		return () => clearTimeout(timer);
	}, [sortedArticles]);
	const handlePress = () => {
		if (title === TITLE_MOST_POPULAR) {
			navigation.navigate('PopularArticlesScreen', { articles });
		}
	};

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
					onPress={handlePress}
				/>
			</View>
			{loading ? (
				<ActivityIndicator size={'small'} color={Colors.primary900} />
			) : (
				<FlatList
					data={articles}
					horizontal
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <Card item={item} />}
					ListEmptyComponent={
						<View
							style={{
								marginVertical: 5,
								flex: 1,
								alignSelf: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								marginLeft: 50,
							}}
						>
							<Text
								style={{
									fontFamily: 'Regular',
									fontSize: wp(15),
									color: Colors.greyScale400,
								}}
							>
								{title === TITLE_MOST_POPULAR && (
									<Text>No Popular Articles</Text>
								)}
								{title === TITLE_RECENT_ARTICLES && (
									<Text>No Recent Articles</Text>
								)}
								{title === TITLE_YOUR_ARTICLES && (
									<Text>You Have No Articles</Text>
								)}
								{title === TITLE_ON_YOUR_BOOKMARK && (
									<Text>You Have No BookMarks</Text>
								)}
							</Text>
						</View>
					}
				/>
			)}
		</View>
	);
};

export default memo(CardDisplay);

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

// Constants for title comparison
const TITLE_MOST_POPULAR = 'Most Popular';
const TITLE_RECENT_ARTICLES = 'Recent Articles';
const TITLE_YOUR_ARTICLES = 'Your Articles';
const TITLE_ON_YOUR_BOOKMARK = 'On Your Bookmark';
