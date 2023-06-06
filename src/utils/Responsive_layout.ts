import { Dimensions } from 'react-native';
import {
	heightPercentageToDP as hp2dp,
	widthPercentageToDP as wp2dp,
} from 'react-native-responsive-screen';

export const wp = (dimension: number) => {
	return wp2dp((dimension / 392) * 100 + '%');
};

export const hp = (dimension: number) => {
	return hp2dp((dimension / 781) * 100 + '%');
};

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
