import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const uploadFile = async (image, fileName, directory) => {
	return new Promise((resolve, reject) => {
		fetch(image)
			.then((response) => response.blob())
			.then((blob) => {
				const storageRef = ref(storage, `${directory}/${fileName}`);
				const uploadTask = uploadBytesResumable(storageRef, blob);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						// Observe state change events such as progress, pause, and resume
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload progress:', progress);
					},
					(error) => {
						console.error('Upload error:', error);
						reject(error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref)
							.then((downloadURL) => {
								console.log('Download URL:', downloadURL);
								resolve(downloadURL);
							})
							.catch((error) => {
								console.error('Error getting download URL:', error);
								reject(error);
							});
					}
				);
			})
			.catch((error) => {
				console.error('Fetch error:', error);
				reject(error);
			});
	});
};
