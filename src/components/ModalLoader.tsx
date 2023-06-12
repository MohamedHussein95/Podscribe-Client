import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import { Colors } from '../constants';
import { hp } from '../utils/Responsive_layout';

const ModalLoader = ({ modalVisible, onDismiss }) => {
	return (
		<Portal>
			<Modal
				visible={modalVisible}
				onDismiss={onDismiss}
				contentContainerStyle={styles.containerStyle}
			>
				<View
					style={{
						backgroundColor: Colors.primary900,
						padding: 30,
						borderRadius: 500,
					}}
				>
					<ActivityIndicator size={'small'} color={Colors.white} />
				</View>
			</Modal>
		</Portal>
	);
};

export default memo(ModalLoader);

const styles = StyleSheet.create({
	modalTitle: {
		fontSize: 24,
		fontFamily: 'Bold',
		textAlign: 'center',
		color: Colors.primary500,
	},

	containerStyle: {
		backgroundColor: Colors.white,
		padding: 20,
		height: hp(80),
		width: '20%',
		alignSelf: 'center',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 0,
	},
});
