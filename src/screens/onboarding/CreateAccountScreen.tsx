import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, ProgressBar } from 'react-native-paper';
import CreateAccountForm from '../../components/CreateAccountForm';
import DiscoverPeople from '../../components/DiscoverPeople';
import ProfileSetupForm from '../../components/ProfileSetupForm';
import SelectCountry from '../../components/SelectCountry';
import SelectTopic from '../../components/SelectTopic';
import { Colors } from '../../constants';
import { DEVICE_WIDTH, hp, wp } from '../../utils/Responsive_layout';

const CreateAccountScreen = ({ navigation }) => {
	const [progress, setProgress] = useState(0.2);
	const flatlistRef = useRef<FlatList>(null);
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	const updateCurrentSlideIndex = (event) => {
		const currentIndex = Math.round(
			event.nativeEvent.contentOffset.x / DEVICE_WIDTH
		);
		setCurrentSlideIndex(currentIndex);
	};

	const goToNextSlide = () => {
		const nextSlideIndex = currentSlideIndex + 1;
		if (nextSlideIndex < COMPONENTS.length) {
			flatlistRef.current.scrollToOffset({
				offset: nextSlideIndex * DEVICE_WIDTH,
			});
			setCurrentSlideIndex(nextSlideIndex);
			setProgress((prev) => prev + 0.2);
		}
	};
	const goBack = () => {
		const previousSlideIndex = currentSlideIndex - 1;
		if (previousSlideIndex >= 0) {
			flatlistRef.current.scrollToOffset({
				offset: previousSlideIndex * DEVICE_WIDTH,
			});
			setCurrentSlideIndex(previousSlideIndex);
			setProgress((prev) => prev - 0.2); // Decrease the progress
		} else if (currentSlideIndex === 0) {
			navigation.pop();
		}
	};
	const COMPONENTS = [
		{
			id: 'createAccount',
			component: <CreateAccountForm onPress={goToNextSlide} />,
		},
		{
			id: 'SelectCountry',
			component: <SelectCountry onPress={goToNextSlide} />,
		},
		{
			id: 'SetupProfile',
			component: <ProfileSetupForm onPress={goToNextSlide} />,
		},

		{
			id: 'SelectTopic',
			component: <SelectTopic onPress={goToNextSlide} />,
		},
		{
			id: 'DiscoverPeople',
			component: <DiscoverPeople />,
		},
	];

	return (
		<View style={styles.screen}>
			<Appbar.Header style={styles.header}>
				<Appbar.BackAction
					style={{
						margin: 0,
						padding: 0,
					}}
					size={25}
					onPress={goBack}
				/>
				<ProgressBar
					progress={progress}
					color={Colors.primary900}
					style={{
						height: hp(15),
						width: wp(250),
						marginHorizontal: 20,
						borderRadius: 30,
					}}
				/>
			</Appbar.Header>

			<FlatList
				ref={flatlistRef}
				bounces={false}
				data={COMPONENTS}
				horizontal
				pagingEnabled
				onMomentumScrollEnd={updateCurrentSlideIndex}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => item.component}
				contentContainerStyle={{
					justifyContent: 'center',
				}}
				scrollEnabled={false} // Disable swipe gestures
				style={{ flex: 1 }}
			/>
		</View>
	);
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	header: {
		margin: 0,
		paddingHorizontal: wp(5),
		justifyContent: 'flex-start',
		backgroundColor: Colors.white,
	},
});
