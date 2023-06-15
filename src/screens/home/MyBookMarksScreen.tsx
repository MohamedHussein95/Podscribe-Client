import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ArticleDisplay from '../../components/ArticleDisplay';
import { Appbar } from 'react-native-paper';
import { Colors } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hp, wp } from '../../utils/Responsive_layout';

const MyBookMarksScreen = ({ route, navigation }) => {
	const { DATA } = route.params;
	const [articles, setArticles] = useState([]);
	const { bookMarks } = useSelector((state) => state.user);
	const [selectedEditIcon, setSelectedEditIcon] = useState('column');

	const sortedArticles = useMemo(() => {
		const copy = [...DATA];

		return copy.filter((b) => bookMarks.includes(b.id));
	}, [DATA]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setArticles(sortedArticles);
		}, 1000); // Delay for demonstration purposes, adjust as needed

		return () => clearTimeout(timer);
	}, [DATA]);
	return (
		<View style={styles.screen}>
			<Appbar.Header
				style={{
					backgroundColor: Colors.white,
					paddingHorizontal: 0,
				}}
			>
				<Appbar.BackAction onPress={() => navigation.pop()} />
				<Appbar.Content
					title={'My Bookmark'}
					color={Colors.black}
					style={{ marginHorizontal: 10 }}
					titleStyle={{ fontFamily: 'Bold', fontSize: 18 }}
				/>

				<Appbar.Action icon={'magnify'} size={30} />
			</Appbar.Header>
			<View style={styles.bodyContainer}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						width: '100%',
						height: hp(40),
					}}
				>
					<Text style={{ flex: 1, fontFamily: 'Bold', fontSize: wp(22) }}>
						{articles.length} Articles
					</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<TouchableOpacity
							style={{
								backgroundColor:
									selectedEditIcon === 'column'
										? Colors.primary900
										: 'transparent',
								padding: 4,
								borderRadius: 8,
							}}
							onPress={() => setSelectedEditIcon('column')}
						>
							<MaterialCommunityIcons
								name='format-align-left'
								size={20}
								color={
									selectedEditIcon === 'column'
										? Colors.white
										: Colors.black
								}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor:
									selectedEditIcon === 'row'
										? Colors.primary900
										: 'transparent',
								padding: 4,
								borderRadius: 8,
							}}
							onPress={() => setSelectedEditIcon('row')}
						>
							<MaterialCommunityIcons
								name='format-align-justify'
								size={20}
								color={
									selectedEditIcon === 'row'
										? Colors.white
										: Colors.black
								}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<ArticleDisplay title={undefined} DATA={articles} />
			</View>
		</View>
	);
};

export default MyBookMarksScreen;

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: Colors.white },
	bodyContainer: { marginHorizontal: wp(15), flex: 1 },
});
