/* eslint-disable react/jsx-curly-newline */
import React, { useEffect, useState } from 'react';
import { Form, FormItem, FormButtonGroup, Submit, Reset } from '@formily/antd'; // 或者 @formily/next
// import Printer from '@formily/printer';
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
} from '@formily/antd-components'; // 或者@formily/next-components
import 'antd/dist/antd.css';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const getInitialValues = () => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove({
        daterange: ['2018-12-19', '2018-12-19'],
        string: 'this is string',
        radio: '2',
        checkbox: ['2', '3', '4'],
        textarea:
          'this is long text.this is long text.this is long text.this is long text.this is long text.',
        rating: 3,
        transfer: [1, 2],
        range: 384,
        date: '2020-02-20',
        month: '2020-08',
        time: '22:29:53',
        timerange: ['9:00:00', '18:00:00'],
        week: '2020-9th',
        number: 123,
        boolean: true,
        select: '2',
      });
    }, 1000);
  });
};

const Edit = () => {
  const [initialValues, setIntialValues] = useState({});
  useEffect(() => {
    getInitialValues().then(initialValues => {
      setIntialValues(initialValues);
    });
  }, []);
  return (
    <PageHeaderWrapper>
      <Form initialValues={initialValues} labelCol={5} wrapperCol={14}>
        <FormItem label="String" name="string" component={Input} />
        <FormItem
          dataSource={['1', '2', '3', '4']}
          label="Radio"
          name="radio"
          component={Radio.Group}
        />
        <FormItem
          dataSource={['1', '2', '3', '4']}
          label="Select"
          name="select"
          component={Select}
        />
        <FormItem
          dataSource={['1', '2', '3', '4']}
          label="Checkbox"
          name="checkbox"
          component={Checkbox.Group}
        />
        <FormItem label="TextArea" name="textarea" component={Input.TextArea} />
        <FormItem label="数字选择" name="number" component={NumberPicker} />
        <FormItem label="开关选择" name="boolean" component={Switch} />
        <FormItem label="日期选择" name="date" component={DatePicker} />
        <FormItem
          label="日期范围"
          initalValue={['2018-12-19', '2018-12-19']}
          name="daterange"
          component={DatePicker.RangePicker}
        />
        <FormItem label="年份" name="year" component={DatePicker.YearPicker} />
        <FormItem label="月份" name="month" component={DatePicker.MonthPicker} />
        <FormItem label="时间" name="time" component={TimePicker} />
        {/* <FormItem label="时间范围" name="timerange" component={TimePicker.RangePicker} />
      <FormItem label="周" name="week" component={DatePicker.WeekPicker} /> */}
        <FormItem label="卡片上传文件" name="upload" listType="card" component={Upload} />
        <FormItem label="拖拽上传文件" name="upload2" listType="dragger" component={Upload} />
        <FormItem label="普通上传文件" name="upload3" listType="text" component={Upload} />
        <FormItem
          label="范围选择"
          name="range"
          min={0}
          max={1024}
          marks={[0, 1024]}
          component={Range}
        />
        <FormItem
          dataSource={[
            { key: 1, title: '选项1' },
            { key: 2, title: '选项2' },
          ]}
          render={(item: any) => item.title}
          label="穿梭框"
          name="transfer"
          component={Transfer}
        />
        <FormItem label="等级" name="rating" component={Rating} />
        <FormButtonGroup offset={5}>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </Form>
    </PageHeaderWrapper>
  );
};

export default Edit;
