import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import { isIos } from '../utils/Utils';

type Props = {
  error: boolean,
  errorMessage: string,
  keyboardType:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad',
  placeholder: string,
  maxLength: number,
  autoFocus: boolean,
  inputStyle: [TextStyle],
  value: string,
  onChangeText: (value) => void,
  label: string,
  onSubmitEditing: () => void,
  blurOnSubmit: boolean,
  returnKeyType: 'done' | 'go' | 'next' | 'search' | 'send',
  required: boolean,
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
  onPress: () => void,
  style: [ViewStyle],
  multiline: boolean,
  button: Node,
  editable: boolean,
  secureTextEntry: Boolean,
};

const TextBox = ({
  error,
  errorMessage,
  keyboardType = 'default',
  placeholder,
  maxLength,
  autoFocus,
  inputStyle,
  value,
  onChangeText,
  label = '',
  onSubmitEditing,
  blurOnSubmit,
  returnKeyType,
  required,
  autoCapitalize,
  onPress,
  style,
  multiline,
  button,
  editable = true,
  secureTextEntry,
}: Props) => {
  const renderLabel = () => {
    return (
      label.length > 0 && (
        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 5}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.titleTextColor,
              fontSize: 16,
            }}>
            {label}
          </Text>
          {required && (
            <Text
              style={{
                fontWeight: 'bold',
                color: 'tomato',
                fontSize: 16,
                marginLeft: 5,
              }}>
              *
            </Text>
          )}
        </View>
      )
    );
  };

  const renderErrorMessage = () => {
    return (
      error && (
        <Text style={{marginTop: 8, marginLeft: 2, color: 'tomato'}}>
          {errorMessage}
        </Text>
      )
    );
  };

  const render = () => {
    return (
      <View style={[_styles.container, style]}>
        {renderLabel()}
        <View
          style={[
            _styles.inputContainer,
            {backgroundColor: Colors.inputTextBackground},
            error && _styles.error,
            multiline && {height: 120},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              editable={editable}
              keyboardType={keyboardType}
              placeholderTextColor={Colors.placeholderColor}
              selectionColor={Colors.selectionColor}
              placeholder={placeholder}
              maxLength={maxLength}
              autoFocus={autoFocus}
              autoCorrect={false}
              style={[
                _styles.input,
                {
                  color: editable ? Colors.titleTextColor : Colors.disableColor,
                  height: '100%',
                  flex: 1,
                },
                inputStyle,
              ]}
              value={value}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              blurOnSubmit={blurOnSubmit}
              returnKeyType={returnKeyType}
              autoCapitalize={autoCapitalize}
              multiline={multiline}
              textAlignVertical={isIos? 'auto' : 'top'}
              secureTextEntry={secureTextEntry}
            />
            {button}
          </View>
        </View>
        {renderErrorMessage()}
      </View>
    );
  };

  if (onPress) {
    return (
      <View>
        {renderLabel()}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          style={[
            _styles.input,
            _styles.inputContainer,
            error && _styles.error,
            inputStyle,
            {
              justifyContent: 'center',
              backgroundColor: Colors.inputTextBackground,
            },
          ]}>
          <Text
            style={[
              styles.form.inputText,
              {
                fontSize: 19,
                olor: Colors.titleTextColor,
              },
            ]}>
            {value}
          </Text>
        </TouchableOpacity>
        {renderErrorMessage()}
      </View>
    );
  }

  return render();
};

const _styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
  },
  input: {
    fontSize: 18,
  },
  error: {
    borderWidth: 1,
    borderColor: 'tomato',
    backgroundColor: '#faddd7',
  },
});

export default TextBox;
