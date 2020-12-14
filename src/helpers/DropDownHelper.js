import React, {Component} from 'react';
import {Platform} from 'react-native';

let dropDown = null;

const setDropDown = (ref) => {
  dropDown = ref;
};

const showSuccess = (title, message, duration = null) => {
  dropDown.alertWithType(
    'success',
    title,
    message,
    null,
    getDuration(title, message, duration),
  );
};

const showInfo = (title, message, duration = null) => {
  dropDown.alertWithType(
    'info',
    title,
    message,
    null,
    getDuration(title, message, duration),
  );
};

const showWarning = (title, message, duration = null) => {
  dropDown.alertWithType(
    'warn',
    title,
    message,
    null,
    getDuration(title, message, duration),
  );
};

const showError = (title, message, duration = null) => {
  dropDown.alertWithType(
    'error',
    title,
    message,
    null,
    getDuration(title, message, duration),
  );
};

const getDuration = (
  title: string,
  message: string,
  duration: number = null,
) => {
  const t = title;
  const m = message;
  let _duration = (t.length + m.length) * 50;
  _duration = _duration < 4000 ? 4000 : _duration;
  if (duration) {
    return duration > _duration ? duration : _duration;
  }
  return _duration;
};

export default {
  setDropDown,
  showSuccess,
  showInfo,
  showWarning,
  showError,
};
