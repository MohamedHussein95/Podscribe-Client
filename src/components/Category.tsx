import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { hp, wp } from '../utils/Responsive_layout';
import { Colors } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

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
					style={{
						width: '100%',
						height: '100%',
						backgroundColor: 'yellow',
						justifyContent: 'flex-end',
						alignItems: 'flex-start',
					}}
				/>

				<LinearGradient
					colors={[Colors.black, 'transparent']}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
					style={{
						position: 'absolute',
						width: '100%',
						height: '80%',
						bottom: 0,
					}}
				/>
				<View
					style={{
						position: 'absolute',
						bottom: 8,
						left: 8,
						width: '65%',
					}}
				>
					<Text
						style={styles.topic}
						numberOfLines={1}
						ellipsizeMode='tail'
					>
						{topic}
					</Text>
					<Text
						style={styles.articles}
						numberOfLines={1}
						ellipsizeMode='tail'
					>
						{articles?.length} articles
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
