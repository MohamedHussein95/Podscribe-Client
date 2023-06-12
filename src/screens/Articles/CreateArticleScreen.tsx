import {
	FlatList,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants';
import { hp, wp } from '../../utils/Responsive_layout';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Divider, Modal, Portal } from 'react-native-paper';
import { useGetTopicsMutation } from '../../store/topicApiSlice';
import {
	usePublishArticleMutation,
	useSaveArticleMutation,
} from '../../store/articleApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { pickCameraAsync, pickGalleryAsync } from '../../utils/UploadImage';
import { uploadFile } from '../../utils/fileUpload';
import { addToDrafts, addToPublishedArticles } from '../../store/articleSlice';
import moment from 'moment';

const CreateArticleScreen = ({ navigation }) => {
	const { authInfo } = useSelector((state) => state.auth);
	const { userInfo } = useSelector((state) => state.user);
	const [title, setTitle] = useState('');
	const [article, setArticle] = useState('');
	const [topics, setTopics] = useState([]);
	const [coverImage, setCoverImage] = useState('');
	const [publishTime, setPublishTime] = useState(
		moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
	);
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [topicsModalVisible, setTopicsModalVisible] = useState(false);
	const [commentsAllowed, setCommentsAllowed] = useState(true);
	const [commentsModalVisible, setCommentsModalVisible] = useState(false);
	const [imageModalOpen, setImageModalOpen] = useState(false);
	const [selectedEditIcon, setSelectedEditIcon] = useState('');
	const [imageLoading, setImageLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const articleInputRef = useRef();
	const [getAllTopics] = useGetTopicsMutation({});
	const [publishArticle] = usePublishArticleMutation({});
	const [saveArticle] = useSaveArticleMutation({});

	const dispatch = useDispatch();
	useEffect(() => {
		const getTopics = async () => {
			const userId = authInfo.uid;
			const data = await getAllTopics(userId).unwrap();

			setTopics(data);
		};
		getTopics();
	}, []);

	useEffect(() => {
		if (selectedEditIcon === 'alignLeft') {
			articleInputRef.current.textAlign = 'left';
		} else if (selectedEditIcon === 'alignRight') {
			articleInputRef.current.textAlign = 'right';
		} else if (selectedEditIcon === 'center') {
			articleInputRef.current.textAlign = 'center';
		}
	}, [selectedEditIcon]);

	const handlePublishArticle = async () => {
		try {
			if (title === '' || article === '') return;
			const body = {
				user: {
					id: authInfo.uid,
					avatar: authInfo.photoURL,
					fullName: authInfo.displayName,
					userName: userInfo.userName,
				},
				coverImage,
				title,
				article,
				topics: selectedTopics,
				publicationTime: publishTime,
				commentsAllowed,
				reads: [authInfo.uid],
			};
			await publishArticle({ body, uid: authInfo.uid });
			dispatch(addToPublishedArticles({ body }));
			setTitle('');
			setCoverImage('');
			setArticle('');
		} catch (error) {
			console.log(error);
		}
	};
	const handleSaveArticle = async () => {
		try {
			if (title === '' || article === '') return;
			const body = {
				coverImage,
				title,
				article,
				topics: selectedTopics,
				publicationTime: publishTime,
				commentsAllowed,
			};
			await saveArticle({ body, uid: authInfo.uid });
			dispatch(addToDrafts({ body }));
			setTitle('');
			setCoverImage('');
			setArticle('');
		} catch (error) {
			console.log(error);
		}
	};
	const handleSelectImage = async () => {
		setImageModalOpen(true);
	};
	const handleCameraSelect = async () => {
		try {
			setImageModalOpen(false);
			const image = await pickCameraAsync();
			if (!image) return;

			await handleImageSelect(image);
		} catch (error) {
			console.log(error);
		}
	};
	const handleGallerySelect = async () => {
		try {
			setImageModalOpen(false);
			const image = await pickGalleryAsync();
			if (!image) return;

			await handleImageSelect(image);
		} catch (error) {
			console.log(error);
		}
	};
	const handleImageSelect = async (imgUrl: string) => {
		try {
			setImageLoading(true);
			const url = await uploadFile(imgUrl, authInfo.uid, 'articles');
			setCoverImage(url);
			setImageLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSelectTopic = (id) => {
		if (selectedTopics.includes(id)) {
			setSelectedTopics(selectedTopics.filter((c) => c !== id));
		} else {
			setSelectedTopics([...selectedTopics, id]);
		}
	};
	return (
		<View style={styles.screen}>
			<StatusBar style='dark' />
			<View style={styles.header}>
				<View
					style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
				>
					<MaterialCommunityIcons
						name='close'
						size={30}
						Color={Colors.black}
						style={{ fontFamily: 'Bold', marginRight: 5 }}
					/>
					<Text style={{ fontFamily: 'Bold', fontSize: wp(20) }}>
						Create...
					</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity onPress={handleSaveArticle}>
						<View style={styles.button}>
							<Text
								style={{
									color: Colors.white,
									fontFamily: 'SemiBold',
									fontSize: wp(15),
								}}
							>
								Save
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={handlePublishArticle}>
						<View
							style={{
								...styles.button,
								backgroundColor: Colors.white,
								borderColor: Colors.primary900,
								borderWidth: 2,
							}}
						>
							<Text
								style={{
									color: Colors.primary900,
									fontFamily: 'SemiBold',
									fontSize: wp(15),
								}}
							>
								Publish
							</Text>
						</View>
					</TouchableOpacity>

					<MaterialCommunityIcons
						name='dots-horizontal-circle-outline'
						size={30}
						Color={Colors.black}
					/>
				</View>
			</View>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<TouchableOpacity activeOpacity={0.8} onPress={handleSelectImage}>
					<View style={styles.imageContainer}>
						{coverImage && !imageLoading && (
							<Image
								source={{ uri: coverImage }}
								resizeMode='cover'
								style={{ width: '100%', height: '100%' }}
							/>
						)}
						{!imageLoading && !coverImage && (
							<>
								<MaterialCommunityIcons
									name='image-area'
									size={50}
									color={Colors.greyScale500}
								/>
								<Text
									style={{
										fontFamily: 'Regular',
										fontSize: wp(18),
										color: Colors.greyScale500,
									}}
								>
									Add article image
								</Text>
							</>
						)}
						{imageLoading && !coverImage && (
							<ActivityIndicator
								size={'small'}
								color={Colors.primary900}
							/>
						)}
					</View>
				</TouchableOpacity>

				<View>
					<Text style={{ fontFamily: 'Bold', fontSize: wp(18) }}>
						Title
					</Text>
					<TextInput
						placeholder='Article Title'
						style={styles.input}
						value={title}
						onChangeText={setTitle}
					/>
				</View>
				<View>
					<Text style={{ fontFamily: 'Bold', fontSize: wp(18) }}>
						Article
					</Text>
					<View
						style={{
							backgroundColor: Colors.greyScale200,
							marginVertical: 15,
							borderRadius: 10,
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-evenly',
								marginVertical: 10,
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor:
										selectedEditIcon === 'alignLeft'
											? Colors.primary900
											: 'transparent',
									padding: 5,
									borderRadius: 8,
								}}
								onPress={() => setSelectedEditIcon('alignLeft')}
							>
								<MaterialCommunityIcons
									name='format-align-left'
									size={25}
									color={
										selectedEditIcon === 'alignLeft'
											? Colors.white
											: Colors.black
									}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									backgroundColor:
										selectedEditIcon === 'center'
											? Colors.primary900
											: 'transparent',
									padding: 5,
									borderRadius: 8,
								}}
								onPress={() => setSelectedEditIcon('center')}
							>
								<MaterialCommunityIcons
									name='format-align-center'
									size={25}
									color={
										selectedEditIcon === 'center'
											? Colors.white
											: Colors.black
									}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									backgroundColor:
										selectedEditIcon === 'alignRight'
											? Colors.primary900
											: 'transparent',
									padding: 5,
									borderRadius: 8,
								}}
								onPress={() => setSelectedEditIcon('alignRight')}
							>
								<MaterialCommunityIcons
									name='format-align-right'
									size={25}
									color={
										selectedEditIcon === 'alignRight'
											? Colors.white
											: Colors.black
									}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor:
										selectedEditIcon === 'justify'
											? Colors.primary900
											: 'transparent',
									padding: 5,
									borderRadius: 8,
								}}
								onPress={() => setSelectedEditIcon('justify')}
							>
								<MaterialCommunityIcons
									name='format-align-justify'
									size={25}
									color={
										selectedEditIcon === 'justify'
											? Colors.white
											: Colors.black
									}
								/>
							</TouchableOpacity>

							<MaterialCommunityIcons
								name='format-underline'
								size={25}
							/>
							<MaterialCommunityIcons name='format-size' size={25} />
							<MaterialCommunityIcons name='palette' size={25} />
							<MaterialCommunityIcons name='link' size={25} />
							<MaterialCommunityIcons name='image' size={25} />
						</View>
						<Divider />
						<TextInput
							ref={articleInputRef}
							placeholder='Write your article here...'
							value={article}
							onChangeText={setArticle}
							style={{
								padding: 10,
								fontFamily: 'Bold',
								fontSize: wp(17),
							}}
							textAlign='left'
							multiline
							autoCorrect
							autoCapitalize='sentences'
							keyboardType='default'
						/>
					</View>
				</View>
				<View>
					<Text style={{ fontFamily: 'Bold', fontSize: wp(18) }}>
						Select Topics
					</Text>
					<TouchableOpacity
						onPress={() => setTopicsModalVisible(true)}
						activeOpacity={0.8}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								backgroundColor: Colors.greyScale200,
								padding: 10,
								borderRadius: 10,
								marginVertical: 10,
								overflow: 'hidden',
							}}
						>
							<ScrollView
								style={{ flex: 1 }}
								horizontal
								showsHorizontalScrollIndicator={false}
							>
								{topics.map((t) => {
									if (selectedTopics.includes(t.id)) {
										return (
											<TouchableOpacity
												style={{
													backgroundColor: Colors.primary900,
													marginHorizontal: 5,
													padding: 5,
													justifyContent: 'center',
													alignItems: 'center',
													borderRadius: 5,
												}}
												key={t.id}
												onPress={() => handleSelectTopic(t.id)}
											>
												<Text
													style={{
														flex: 1,
														color: Colors.white,
													}}
												>
													{t.topic}
												</Text>
											</TouchableOpacity>
										);
									}
								})}
							</ScrollView>

							{selectedTopics.length === 0 && (
								<Text style={{ flex: 1, color: Colors.greyScale600 }}>
									Select Topic
								</Text>
							)}

							<MaterialCommunityIcons
								name='menu-down'
								size={25}
								onPress={() => setTopicsModalVisible(true)}
							/>
						</View>
						<Portal>
							<Modal
								visible={topicsModalVisible}
								onDismiss={() => setTopicsModalVisible((prev) => !prev)}
								contentContainerStyle={styles.containerStyle}
							>
								<View style={{ marginVertical: 10 }}>
									<Text
										style={{
											fontFamily: 'Bold',
											fontSize: wp(24),
											textAlign: 'center',
										}}
									>
										Topics
									</Text>
									<MaterialCommunityIcons
										name='close'
										size={25}
										color={Colors.error}
										style={{
											position: 'absolute',
											right: 10,
											top: 0,
										}}
										onPress={() => setTopicsModalVisible(false)}
									/>
								</View>
								<Divider />
								<FlatList
									data={topics}
									renderItem={({ item }) => {
										return (
											<TouchableOpacity
												style={{
													...styles.topic,
													backgroundColor: selectedTopics.includes(
														item.id
													)
														? Colors.primary900
														: Colors.white,
												}}
												onPress={() => handleSelectTopic(item.id)}
											>
												<Text
													style={{
														...styles.topicText,
														color: selectedTopics.includes(
															item.id
														)
															? Colors.white
															: Colors.black,
													}}
												>
													{item.topic}
												</Text>
											</TouchableOpacity>
										);
									}}
									keyExtractor={(item) => item.id}
									ItemSeparatorComponent={
										<View style={{ width: 10, height: 15 }} />
									}
									style={{
										flex: 1,
									}}
									contentContainerStyle={{ padding: 10 }}
								/>
							</Modal>
						</Portal>
					</TouchableOpacity>
				</View>
				<View>
					<Text style={{ fontFamily: 'Bold', fontSize: wp(18) }}>
						Set Publication Time
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							backgroundColor: Colors.greyScale200,
							padding: 15,
							borderRadius: 10,
							marginVertical: 10,
						}}
					>
						<Text style={{ flex: 1, color: Colors.greyScale600 }}>
							Now
						</Text>
						<MaterialCommunityIcons name='calendar-month' size={25} />
					</View>
				</View>
				<View>
					<Text style={{ fontFamily: 'Bold', fontSize: wp(18) }}>
						Allow Comments from Community
					</Text>
					<TouchableOpacity
						onPress={() => setCommentsModalVisible(true)}
						activeOpacity={0.8}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								backgroundColor: Colors.greyScale200,
								padding: 15,
								borderRadius: 10,
								marginVertical: 10,
							}}
						>
							<Text style={{ flex: 1, color: Colors.greyScale600 }}>
								{commentsAllowed ? 'Yes' : 'No'}
							</Text>
							<MaterialCommunityIcons
								name='menu-down'
								size={25}
								onPress={() => setCommentsModalVisible(true)}
							/>
						</View>
						<Portal>
							<Modal
								visible={commentsModalVisible}
								onDismiss={() =>
									setCommentsModalVisible((prev) => !prev)
								}
								contentContainerStyle={{
									...styles.containerStyle,
									height: hp(150),
								}}
							>
								<View style={{ marginVertical: 10 }}>
									<Text
										style={{
											fontFamily: 'Bold',
											fontSize: wp(24),
											textAlign: 'center',
											marginBottom: 10,
										}}
									>
										Allow Comments
									</Text>
									<Divider />
									<TouchableOpacity
										style={{ ...styles.topic, marginTop: 10 }}
										onPress={() => {
											setCommentsAllowed(true);
											setCommentsModalVisible(false);
										}}
									>
										<Text style={styles.topicText}>{'Yes'}</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={{ ...styles.topic, marginTop: 10 }}
										onPress={() => {
											setCommentsAllowed(false);
											setCommentsModalVisible(false);
										}}
									>
										<Text style={styles.topicText}>{'No'}</Text>
									</TouchableOpacity>
								</View>
							</Modal>
						</Portal>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Portal>
				<Modal
					visible={imageModalOpen}
					onDismiss={() => setImageModalOpen((prev) => !prev)}
					contentContainerStyle={styles.modalContainerStyle}
				>
					<View style={styles.modalContainer}>
						<Text
							style={{
								fontFamily: 'Medium',
								fontSize: 18,
								textAlign: 'center',
								marginBottom: 10,
							}}
						>
							Choose an action
						</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-around',
							}}
						>
							<TouchableOpacity
								onPress={handleCameraSelect}
								style={styles.modalButton}
							>
								<MaterialIcons
									name='camera-alt'
									size={30}
									color={Colors.white}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={handleGallerySelect}
								style={styles.modalButton}
							>
								<MaterialIcons
									name='insert-photo'
									size={30}
									color={Colors.white}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</Portal>
		</View>
	);
};

export default CreateArticleScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingHorizontal: 15,
	},
	button: {
		backgroundColor: Colors.primary900,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		width: wp(90),
		marginHorizontal: 5,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',

		marginVertical: 10,
		marginTop: hp(40),
	},
	imageContainer: {
		backgroundColor: Colors.greyScale200,
		height: hp(350),
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 15,
		borderRadius: 10,
		overflow: 'hidden',
	},
	input: {
		backgroundColor: Colors.greyScale200,
		padding: 15,
		borderRadius: 10,
		marginVertical: 10,
	},
	containerStyle: {
		backgroundColor: Colors.white,
		width: wp(350),
		alignSelf: 'center',
		height: hp(500),
		borderRadius: 12,
		justifyContent: 'flex-start',
	},
	topic: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	topicText: {
		fontFamily: 'SemiBold',
		fontSize: wp(17),
		color: Colors.black,
	},
	modalContainer: {
		backgroundColor: 'white',
		height: 150,
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	modalContainerStyle: {
		justifyContent: 'flex-end',
		flex: 1,
	},
	modalButton: {
		width: wp(80),
		height: hp(80),
		backgroundColor: Colors.primary900,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		// marginRight: 20,
	},
});
