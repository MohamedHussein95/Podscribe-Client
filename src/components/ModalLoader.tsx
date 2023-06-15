import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import { Colors } from '../constants';
import { hp } from '../utils/Responsive_layout';

const ModalLoader = ({ modalVisible, onDismiss }) => {
	return (
		<Portal>
			<Modal
				visible={modalVisible}
				onDismiss={undefined}
				contentContainerStyle={styles.container}
			>
				<View style={styles.loaderContainer}>
					<ActivityIndicator size='small' color={Colors.white} />
				</View>
			</Modal>
		</Portal>
	);
};

export default memo(ModalLoader);

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	loaderContainer: {
		backgroundColor: Colors.primary900,
		padding: 30,
		borderRadius: 500,
	},
});
