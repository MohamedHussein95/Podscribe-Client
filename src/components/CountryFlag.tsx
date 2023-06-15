import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { Colors } from '../constants';
import { Avatar } from 'react-native-paper';
import { wp } from '../utils/Responsive_layout';

type props = {
	item: Object;
	country: string;
	setCountry: (s: string) => string;
};

const CountryFlag = ({ item, country, setCountry }: props) => {
	return (
		<View>
			<TouchableOpacity
				style={{
					...styles.container,
					borderColor:
						country === item.country
							? Colors.primary900
							: Colors.greyScale200,
					borderWidth: country === item.country ? 2 : 1,
				}}
				onPress={() => {
					if (country === item.country) {
						return setCountry(null);
					}
					setCountry(item.country);
				}}
			>
				<View>
					<Avatar.Image
						source={{ uri: item.flag }}
						size={40}
						style={{ borderRadius: 8, overflow: 'hidden' }}
					/>
				</View>
				<Text style={{ ...styles.countryText, color: Colors.greyScale400 }}>
					{item.id}
				</Text>
				<Text style={styles.countryText}>{item.country}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default memo(CountryFlag);

const styles = StyleSheet.create({
	container: {
		width: wp(350),
		overflow: 'hidden',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		gap: 10,
		borderRadius: 10,
		marginVertical: 5,
	},
	countryText: {
		fontSize: wp(18),
		fontFamily: 'Bold',
		color: Colors.black,
	},
});
