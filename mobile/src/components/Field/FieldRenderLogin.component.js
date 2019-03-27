import React from 'react'
import { Text, TextInput, View } from 'react-native'

import styles from '../../assets/styles/_login-styles.scss'

const renderField = ({label, placeholder, isSecure, meta: {touched, error}, input: {onChange, ...restInput}}) => {
	return (
		<View>
			<View>
				<TextInput
					{...restInput}
					style={styles['input-login']}
					onChangeText={onChange}
					placeholder={placeholder}
					autoCapitalize="none"
					secureTextEntry={isSecure}
				/>
			</View>
			{touched && (error && <Text style={{color: 'red', paddingLeft: 20}}>{error}</Text>)}
		</View>
	)
}

export default renderField