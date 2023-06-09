import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
	FlatList,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { Colors } from '../../constants';
import { DEVICE_HEIGHT, DEVICE_WIDTH, wp } from '../../utils/Responsive_layout';
import { NavigationProp } from '@react-navigation/native';

const SLIDES = [
	{
		title: 'Listen to captivating podcasts anytime, anywhere!',
		subtitle: 'Explore a world of audio content at your fingertips',
		img: require('../../../assets/images/Knowledge-bro.png'),
	},
	{
		title: 'Read interesting articles and stay informed!',
		subtitle:
			'Dive into a wide range of articles covering various topics and interests',
		img: require('../../../assets/images/Blogging-bro.png'),
	},
	{
		title: 'Discover, learn, and stay connected with podcasts and articles!',
		subtitle:
			'Engage with content that enriches your knowledge and sparks curiosity',
		img: require('../../../assets/images/Online-pana.png'),
	},
];

const OnboardingScreen = ({ navigation }) => {
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const flatlistRef = useRef<FlatList>(null);

	type FlatlistItem = {
		title: string;
		subtitle: string;
		img: number;
	};
	const updateCurrentSlideIndex = (event) => {
		const currentIndex = Math.round(
			event.nativeEvent.contentOffset.x / DEVICE_WIDTH
		);
		setCurrentSlideIndex(currentIndex);
	};
	const goToNextSlide = () => {
		const nextSlideIndex = currentSlideIndex + 1;
		if (nextSlideIndex < SLIDES.length) {
			flatlistRef.current.scrollToOffset({
				offset: nextSlideIndex * DEVICE_WIDTH,
			});
			setCurrentSlideIndex(nextSlideIndex);
		} else if (currentSlideIndex === SLIDES.length - 1) {
			navigation.replace('LetYouInScreen');
		}
	};
	const skip = () => {
		flatlistRef.current.scrollToEnd();
		setCurrentSlideIndex(SLIDES.length - 1);
	};

	const _renderItem = (item: FlatlistItem, index: number) => {
		return (
			<View style={styles.container}>
				<View>
					<Image source={item.img} style={styles.imageStyle} />
					<LinearGradient
						colors={['white', 'transparent']}
						start={{ x: 0, y: 1 }}
						end={{ x: 0, y: 0 }}
						style={{
							position: 'absolute',
							width: '100%',
							height: '70%',
							bottom: 0,
						}}
					/>
				</View>

				<View>
					<Text style={styles.titleText}>{item.title}</Text>
				</View>
				<View
					style={{
						width: wp(350),
						alignSelf: 'center',
					}}
				>
					<Text style={styles.subTitleText}>{item.subtitle}</Text>
				</View>
			</View>
		);
	};
	const Footer = () => {
		return (
			<View>
				<View style={styles.indicatorContainer}>
					{SLIDES.map((_, index) => (
						<LinearGradient
							key={index}
							colors={
								currentSlideIndex === index
									? [Colors.primary100, Colors.primary900]
									: [Colors.greyScale600, Colors.greyScale600]
							}
							start={{ x: 0, y: 0 }}
							end={{ x: 0.8, y: 0 }}
							style={[
								styles.indicator,
								currentSlideIndex === index && styles.activeIndicator,
							]}
						/>
					))}
				</View>
				<Divider />
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 20,
					}}
				>
					{currentSlideIndex === SLIDES.length - 1 ? (
						<TouchableOpacity
							style={styles.button}
							activeOpacity={0.8}
							onPress={goToNextSlide}
						>
							<Text style={{ color: Colors.white, fontFamily: 'Bold' }}>
								Let's Get Started
							</Text>
						</TouchableOpacity>
					) : (
						<>
							<TouchableOpacity
								style={{
									...styles.button,
									...{ backgroundColor: Colors.primary100 },
								}}
								activeOpacity={0.8}
								onPress={skip}
							>
								<Text
									style={{
										color: Colors.primary900,
										fontFamily: 'Bold',
									}}
								>
									Skip
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.button}
								activeOpacity={0.8}
								onPress={goToNextSlide}
							>
								<Text
									style={{ color: Colors.white, fontFamily: 'Bold' }}
								>
									Next
								</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
			</View>
		);
	};

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<StatusBar barStyle={'light-content'} backgroundColor={Colors.white} />
			<FlatList
				ref={flatlistRef}
				bounces={false}
				data={SLIDES}
				horizontal
				pagingEnabled
				onMomentumScrollEnd={updateCurrentSlideIndex}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item, index }) => _renderItem(item, index)}
				getItemLayout={(data, index) => ({
					length: DEVICE_WIDTH,
					offset: DEVICE_WIDTH * index,
					index,
				})}
			/>
			<Footer />
		</View>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		width: DEVICE_WIDTH,
		backgroundColor: Colors.white,
		justifyContent: 'center',
	},

	imageStyle: {
		height: DEVICE_HEIGHT / 2,
		width: DEVICE_WIDTH - wp(20),
		resizeMode: 'contain',
		alignSelf: 'center',
		marginBottom: 20,
	},
	titleText: {
		fontSize: wp(22),
		fontFamily: 'Bold',
		color: Colors.black,
		textAlign: 'center',
		marginBottom: 15,
		marginHorizontal: wp(20),
	},
	subTitleText: {
		fontSize: wp(15),
		fontFamily: 'Regular',
		color: Colors.black,
		textAlign: 'center',
		marginHorizontal: wp(20),
	},
	indicatorContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 130,
		left: 0,
		right: 0,
		marginTop: 20,
	},
	indicator: {
		height: 7,
		width: 7,
		marginHorizontal: 3,
		borderRadius: 50,
	},
	activeIndicator: {
		width: 30,
		borderRadius: 50,
	},
	footerContainer: {
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: Colors.primary900,
		width: wp(160),
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		padding: 15,
		marginTop: 20,
	},
});
