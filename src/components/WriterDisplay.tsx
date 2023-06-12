import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo, useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Colors } from '../constants';
import { wp } from '../utils/Responsive_layout';
import Writer from './Writer';

const WriterDisplay = ({ title, DATA, loading }) => {
	const [topWriters, setTopWriters] = useState([]);
	//console.log(topWriters);

	const sortedWriters = useMemo(() => {
		const copy = [...DATA];
		return copy.sort((a, b) => {
			const aPublishedArticles =
				a?.publishedArticles?.filter(Boolean)?.length || 0;
			const bPublishedArticles =
				b?.publishedArticles?.filter(Boolean)?.length || 0;

			// Sort in descending order based on the number of published articles
			return bPublishedArticles - aPublishedArticles;
		});
	}, [DATA]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTopWriters(sortedWriters);
		}, 1000);

		return () => clearTimeout(timer);
	}, [sortedWriters]);
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
				/>
			</View>
			{loading ? (
				<ActivityIndicator size={'small'} color={Colors.primary900} />
			) : (
				<FlatList
					data={topWriters}
					horizontal
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <Writer item={item} />}
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingHorizontal: wp(15) }}
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
								No Writers Found!
							</Text>
						</View>
					}
				/>
			)}
		</View>
	);
};

export default memo(WriterDisplay);

const styles = StyleSheet.create({
	display: {},
	header: {
		flexDirection: 'row',
		marginHorizontal: 10,
		marginVertical: 5,
	},
});
