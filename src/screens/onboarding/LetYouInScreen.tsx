import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants';
import SocialContainer from '../../components/SocialContainer';
import { DEVICE_WIDTH, hp, wp } from '../../utils/Responsive_layout';
import { Divider } from 'react-native-paper';

const LetYouInScreen = ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<View>
				<Image
					source={require('../../../assets/images/Hello-rafiki.png')}
					style={{ width: wp(300), height: hp(300) }}
					resizeMode='cover'
				/>
			</View>
			<View>
				<Text style={{ fontFamily: 'Bold', fontSize: wp(34) }}>
					Let's you in
				</Text>
			</View>
			<SocialContainer
				title={'Continue With Google'}
				logo={
					'https://companieslogo.com/img/orig/GOOG-0ed88f7c.png?t=1633218227'
				}
			/>
			<SocialContainer
				title={'Continue With Facebook'}
				logo={
					'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/480px-Facebook_f_logo_%282021%29.svg.png'
				}
			/>
			<SocialContainer
				title={'Continue With Apple'}
				logo={
					'https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-logo-icons-31.png'
				}
			/>
			<View
				style={{
					flexDirection: 'row',
					gap: 5,
					width: '80%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Divider
					style={{
						backgroundColor: Colors.greyScale300,
						height: 1,
						width: '50%',
					}}
				/>
				<Text
					style={{
						color: Colors.greyScale600,
						fontFamily: 'Regular',
					}}
				>
					Or
				</Text>
				<Divider
					style={{
						backgroundColor: Colors.greyScale300,
						height: 1,
						width: '50%',
					}}
				/>
			</View>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('SignInScreen')}
			>
				<Text style={{ color: Colors.white, fontFamily: 'Bold' }}>
					Sign in with password
				</Text>
			</TouchableOpacity>
			<View style={styles.footer}>
				<Text
					style={{
						color: Colors.black,
						fontFamily: 'Medium',
						fontSize: wp(15),
					}}
				>
					don't have an account?
				</Text>
				<Text
					style={{
						color: Colors.primary900,
						fontFamily: 'Bold',
						fontSize: wp(15),
					}}
					onPress={() => navigation.navigate('CreateAccountScreen')}
				>
					Sign up
				</Text>
			</View>
		</View>
	);
};

export default LetYouInScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
		alignItems: 'center',
	},
	button: {
		backgroundColor: Colors.primary900,
		width: DEVICE_WIDTH / 1.05,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		padding: 15,
		marginTop: 20,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		position: 'absolute',
		bottom: 15,
	},
});
