import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import Card from './Card';
import { Colors } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Article from './Article';
import { wp } from '../utils/Responsive_layout';

const ArticleDisplay = ({ title, DATA }) => {
	return (
		<View style={styles.display}>
			<View style={styles.header}>
				<Text style={{ fontFamily: 'Bold', fontSize: 20, flex: 1 }}>
					{title}
				</Text>
				<MaterialCommunityIcons
					name='arrow-right-thin'
					size={30}
					color={Colors.primary900}
				/>
			</View>
			<FlatList
				data={DATA}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <Article item={item} />}
				contentContainerStyle={{
					justifyContent: 'center',
					paddingHorizontal: 10,
				}}
				style={{ flex: 1 }}
				ListEmptyComponent={
					<View style={{ marginTop: 50, alignItems: 'center' }}>
						<Text
							style={{
								fontFamily: 'Bold',
								fontSize: wp(20),
								color: Colors.greyScale400,
							}}
						>
							No New Articles!
						</Text>
					</View>
				}
			/>
		</View>
	);
};

export default ArticleDisplay;

const styles = StyleSheet.create({
	display: {
		marginVertical: 5,
	},
	header: {
		flexDirection: 'row',
		marginHorizontal: 10,
		marginVertical: 5,
	},
});
