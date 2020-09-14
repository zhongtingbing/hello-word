import moment from 'moment';
import React from 'react';
import { DatePicker } from 'antd';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const { RangePicker } = DatePicker;

const onChangeTimeStampAdapter = onChange => value => {
  if (Array.isArray(value)) {
    onChange(value.map(date => date.valueOf()));
  }
};

const NewRangePicker = ({ useTimeStamp = false, value, onChange, ...other }) => {
  const newValue = useTimeStamp
    ? value && value.length && value.map(date => moment(parseInt(date, 10)))
    : value;
  return (
    <RangePicker
      {...other}
      value={newValue}
      onChange={useTimeStamp ? onChangeTimeStampAdapter(onChange) : onChange}
    />
  );
};

export default NewRangePicker;
