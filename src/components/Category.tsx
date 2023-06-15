import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../utils/Responsive_layout';
import { Colors } from '../constants';

const Category = ({ item, style }) => {
	const { photo, topic, articles } = item;
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={{ ...styles.category, ...style }}
			activeOpacity={0.8}
			onPress={() => navigation.navigate('TopicDetailsScreen', { item })}
		>
			<View>
				<Image
					source={{ uri: photo }}
					resizeMode='cover'
					style={styles.image}
				/>

				<LinearGradient
					colors={[Colors.black, 'transparent']}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
					style={styles.gradient}
				/>

				<View style={styles.detailsContainer}>
					<Text
						style={styles.topic}
						numberOfLines={1}
						ellipsizeMode='tail'
					>
						{topic}
					</Text>
					<Text style={styles.articles}>
						{articles?.length || '0'} articles
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Category;

const styles = StyleSheet.create({
	category: {
		marginHorizontal: 10,
		width: wp(150),
		height: hp(100),
		overflow: 'hidden',
		borderRadius: 10,
	},
	image: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
	},
	gradient: {
		position: 'absolute',
		width: '100%',
		height: '80%',
		bottom: 0,
	},
	detailsContainer: {
		position: 'absolute',
		bottom: 8,
		left: 8,
		width: '65%',
	},
	topic: {
		fontFamily: 'SemiBold',
		color: Colors.white,
	},
	articles: {
		fontFamily: 'Regular',
		color: Colors.white,
		fontSize: wp(12),
	},
});
