import React from 'react';
import {Text} from 'react-native';

interface IProps {
  message: string;
}

const NoResult = (prop: IProps) => {
  return <Text style={{padding: 8}}>{prop.message || ''}</Text>;
};

export default NoResult;
