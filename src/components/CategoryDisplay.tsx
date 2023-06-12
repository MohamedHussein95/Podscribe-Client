import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Colors } from '../constants';
import Category from './Category';
import { useGetTopicsMutation } from '../store/topicApiSlice';
import { wp } from '../utils/Responsive_layout';
import { useSelector } from 'react-redux';

const CategoryDisplay = ({ title, onPress, loading }) => {
	const [topics, setTopics] = useState([]);
	const [getAllTopics] = useGetTopicsMutation({});
	const { authInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		const getTopics = async () => {
			const userId = authInfo.uid;
			const data = await getAllTopics(userId).unwrap();

			setTopics(data);
		};
		getTopics();
	}, []);
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
					onPress={onPress}
				/>
			</View>
			{loading ? (
				<ActivityIndicator size={'small'} color={Colors.primary900} />
			) : (
				<FlatList
					data={topics}
					horizontal
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => (
						<Category item={item} style={undefined} />
					)}
					initialNumToRender={5}
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
								No Topics Found!
							</Text>
						</View>
					}
				/>
			)}
		</View>
	);
};

export default CategoryDisplay;

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
