import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants';

import { useSelector } from 'react-redux';
import { hp, wp } from '../../utils/Responsive_layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Article from '../../components/Article';

const MyArticlesScreen = () => {
	const { published } = useSelector((state) => state.articles);
	const { drafts } = useSelector((state) => state.articles);
	const [myArticles, setMyArticles] = useState([...published, ...drafts]);
	const [selectedEditIcon, setSelectedEditIcon] = useState('column');
	return (
		<View style={styles.screen}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					width: '100%',
					height: hp(40),
				}}
			>
				<Text style={{ flex: 1, fontFamily: 'Bold', fontSize: wp(22) }}>
					{published?.length} articles
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
								selectedEditIcon === 'row' ? Colors.white : Colors.black
							}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<FlatList
				data={myArticles}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <Article item={item} />}
				contentContainerStyle={{
					justifyContent: 'center',
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
							You have no articles yet!
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default MyArticlesScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		marginTop: hp(15),
		backgroundColor: Colors.white,
	},
});
