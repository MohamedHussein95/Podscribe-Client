import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { Colors } from '../../constants';
import Category from '../../components/Category';
import { hp, wp } from '../../utils/Responsive_layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ArticleDisplay from '../../components/ArticleDisplay';
import { useGetArticleByTopicMutation } from '../../store/articleApiSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Article from '../../components/Article';

const TopicDetailsScreen = ({ route, navigation }) => {
	const { item } = route.params;
	const [Articles, setArticles] = useState([]);
	const [getArticles] = useGetArticleByTopicMutation();
	useEffect(() => {
		const getArticlesByTopic = async () => {
			try {
				const tid = item.id;
				const articles = await getArticles(tid).unwrap();

				setArticles(articles);
			} catch (error) {
				Toast.show({
					type: 'error',
					text1: `${error || error?.data?.message || error?.error}`,
					position: 'top',
				});
			}
		};
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
					<MaterialCommunityIcons
						name='arrow-right-thin'
						size={30}
						color={Colors.primary900}
					/>
				</View>
				<FlatList
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
								You have no published articles yet!
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
		marginVertical: 20,
	},
});
