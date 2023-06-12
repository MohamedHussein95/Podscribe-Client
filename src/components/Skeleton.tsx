import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native';
import React from 'react';
import SkeletonLoader from 'expo-skeleton-loader';

export const CardLayout = ({
	size = 100,
	style,
}: {
	size?: number;
	style?: ViewStyle;
}) => (
	<SkeletonLoader>
		<SkeletonLoader.Container
			style={[{ flex: 1, flexDirection: 'row' }, style]}
		>
			<SkeletonLoader.Item
				style={{
					width: size,
					height: size,
					borderRadius: size / 2,
					marginRight: 20,
				}}
			/>
			<SkeletonLoader.Container style={{ paddingVertical: 10 }}>
				<SkeletonLoader.Item
					style={{ width: 220, height: 20, marginBottom: 5 }}
				/>
				<SkeletonLoader.Item style={{ width: 150, height: 20 }} />
			</SkeletonLoader.Container>
		</SkeletonLoader.Container>
	</SkeletonLoader>
);
