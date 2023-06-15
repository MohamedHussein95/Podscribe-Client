import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

export const signInUser = async (email: string, password: string) => {
	let res;
	try {
		res = await signInWithEmailAndPassword(auth, email, password);

		return res.user;
	} catch (error: any) {
		console.log(error.code);

		const errId = error.code;
		let message = 'something went wrong!';
		if (
			errId === 'auth/user-not-found' ||
			errId === 'auth/invalid-email' ||
			errId === 'auth/wrong-password'
		) {
			message = 'Inavlid Credentials!';
		}

		throw new Error(message);
	}
};

export const signOutUser = async () => {
	try {
		await signOutUser(auth);
	} catch (err: any) {
		return { error: err.code };
	}
};
