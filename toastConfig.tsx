import { Text, View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { wp } from './src/utils/Responsive_layout';
import { Colors } from './src/constants';

/*
  1. Create the config
*/
export const toastConfig = {
	/*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
	success: (props) => (
		<BaseToast
			{...props}
			style={{ borderLeftColor: Colors.success }}
			contentContainerStyle={{ paddingHorizontal: 15 }}
			text1Style={{
				fontSize: 15,
				fontWeight: '400',
			}}
		/>
	),
	/*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
	error: (props) => (
		<ErrorToast
			{...props}
			text1Style={{
				fontSize: wp(14),
				fontFamily: 'Medium',
				color: Colors.greyScale600,
			}}
			text2Style={{
				fontSize: 15,
			}}
		/>
	),
	/*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
	tomatoToast: ({ text1, props }) => (
		<View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
			<Text>{text1}</Text>
			<Text>{props.uuid}</Text>
		</View>
	),
};
