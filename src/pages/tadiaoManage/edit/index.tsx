/* eslint-disable react/jsx-curly-newline */
import React, { useEffect, useState } from 'react';
import { Form, FormItem, FormButtonGroup, Submit, Reset } from '@formily/antd'; // 或者 @formily/next
// import Printer from '@formily/printer';
import { Input, Upload, DatePicker } from '@formily/antd-components'; // 或者@formily/next-components
import DevicePosition from '@/components/DevicePosition';
import { Row, Col } from 'antd';

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
      <Form initialValues={initialValues} labelCol={8} wrapperCol={14}>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              label="塔吊名称"
              required
              placeholder="请输入"
              name="name"
              component={Input}
            />
          </Col>
          <Col span={12}>
            <FormItem
              label="塔吊出厂编号"
              required
              placeholder="请输入"
              name="code"
              component={Input}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              label="安检站备案编号"
              required
              placeholder="请输入"
              name="ajzCode"
              component={Input}
            />
          </Col>
          <Col span={12}>
            <FormItem
              label="设备型号"
              required
              placeholder="请输入"
              name="deviceTypeCode"
              component={Input}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              label="监测设备安装日期"
              placeholder=""
              name="azDate"
              component={DatePicker}
            />
          </Col>
          <Col span={12}>
            <FormItem
              label="设备证书日期"
              placeholder=""
              name="deviceDate"
              component={DatePicker}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="制造商" required placeholder="请输入" name="zzs" component={Input} />
          </Col>
          <Col span={12}>
            <FormItem label="产权单位" placeholder="请输入" name="ccdw" component={Input} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="维保商" placeholder="请输入" name="wbs" component={Input} />
          </Col>
          <Col span={12}>
            <FormItem label="检测商" placeholder="请输入" name="jcs" component={Input} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="设备有效日期" placeholder="" name="azDate" component={DatePicker} />
          </Col>
          <Col span={12}>
            <FormItem
              label="设备进场时间"
              placeholder=""
              name="deviceDate"
              component={DatePicker}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="设备出场时间" placeholder="请输入" name="azDate" component={Input} />
          </Col>
          <Col span={12}>
            <FormItem
              label="安装位置"
              placeholder="点击设置位置"
              require
              name="position"
              component={DatePicker}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem label="设备出场时间" placeholder="请输入" name="azDate" component={Input} />
          </Col>
          <Col span={12}>
            <FormItem
              label="当前高度（米）"
              placeholder="请输入塔吊当前高度"
              require
              name="deviceDate"
              component={DevicePosition}
            />
          </Col>
        </Row>
        <FormButtonGroup sticky offset={5}>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </Form>
    </PageHeaderWrapper>
  );
};

export default Edit;
