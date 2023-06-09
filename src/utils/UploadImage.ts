import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export const pickGalleryAsync = async () => {
	await checkMediaPermission();
	let result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images, //filter to only images
		allowsEditing: true,
		aspect: [1, 1], //images should be square
		quality: 1,
		base64: true,
	});

	if (!result.canceled) {
		return result.assets[0].uri;
	} else {
		alert('You did not select any image.');
	}
};
export const pickCameraAsync = async () => {
	const { status } = await ImagePicker.requestCameraPermissionsAsync();

	if (status !== 'granted') {
		alert("You've refused to allow this app to access your camera!");
		return;
	}

	let result = await ImagePicker.launchCameraAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
	});
	if (!result.canceled) {
		return result.assets[0].uri;
	} else {
		alert('You did not select any image.');
	}
};

export const checkMediaPermission = async () => {
	if (Platform.OS !== 'web') {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			return Promise.reject('We need permission to access your photos');
		}
	}
	return Promise.resolve();
};
