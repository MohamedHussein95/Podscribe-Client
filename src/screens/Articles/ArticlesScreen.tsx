import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { Colors } from '../../constants';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { hp, wp } from '../../utils/Responsive_layout';
import TabViewExample from '../../components/TopTap';
import { SceneMap } from 'react-native-tab-view';
import DraftsScreen from './DraftsScreen';
import PublishedArticlesScreen from './PublishedArticlesScreen';

const renderScene = SceneMap({
	first: DraftsScreen,
	second: PublishedArticlesScreen,
});

const ArticlesScreen = () => {
	return (
		<View style={styles.screen}>
			<Appbar.Header
				style={{
					backgroundColor: Colors.white,
					paddingHorizontal: 10,
				}}
			>
				<Image
					source={require('../../../assets/images/logo.png')}
					style={{ width: wp(30), height: hp(30) }}
				/>
				<Appbar.Content
					title={'My Articles'}
					color={Colors.black}
					style={{ marginHorizontal: 10 }}
					titleStyle={{ fontFamily: 'Bold', fontSize: 18 }}
				/>
				<AntDesign
					name='search1'
					size={24}
					color={Colors.black}
					style={{ marginHorizontal: 10 }}
				/>
				<Ionicons
					name='ellipsis-horizontal-circle-outline'
					size={30}
					color={Colors.black}
				/>
			</Appbar.Header>
			<View style={styles.bodyContainer}>
				<TabViewExample
					scene={renderScene}
					firstScreen={'Drafts'}
					secondScreen={'Published'}
					tabHeader={true}
				/>
			</View>
		</View>
	);
};

export default ArticlesScreen;

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: Colors.white },
	bodyContainer: { marginHorizontal: 15, flex: 1 },
});
