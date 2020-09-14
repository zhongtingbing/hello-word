/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Radio,
  Checkbox,
  Switch,
  TreeSelect,
  Select,
  DatePicker,
} from 'antd';

import RangePicker from './RangePicker';
import './index.less';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const mapOptions = options =>
  options.map(({ key, value }) => {
    if (!key) {
      throw new Error('radio|select|checkbox option must have an key attribute');
    }
    return { label: key, value };
  });

export default class Index extends PureComponent {
  state = {
    expand: false,
  };

  // 获取数据输入组件
  // eslint-disable-next-line
  getDataInComponent = ({ type, Component, onEnterSearch, ...other }) => {
    const _type = typeof type === 'string' ? type.toLowerCase() : '';
    let _options = other.options;

    if (typeof Component === 'function') {
      return <Component {...other} />;
    }
    // 项目中很多option都是用的{key ,value}结构，所以这里添加转换
    // 所以项目中现在用到这个组件的地方配置都“必须是”这个结构
    if (/^(radio|select|checkbox)$/.test(_type) && _options && _options.length) {
      _options = mapOptions(_options);
    }
    switch (_type) {
      case 'select':
        return (
          <Select placeholder="请选择" allowClear {...other}>
            {_options.map(({ label, value }) => (
              <Select.Option key={value} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        );
      case 'radio':
        return <RadioGroup {...other} options={_options} />;
      case 'rangepicker':
        const { showTime, ...rest } = other;
        return (
          <RangePicker
            style={{ width: '100%' }}
            showTime={
              showTime
                ? {
                    defaultValue: [moment().startOf('day'), moment().endOf('day')],
                    ...showTime,
                  }
                : false
            }
            {...rest}
          />
        );
      case 'checkbox':
        return <CheckboxGroup {...other} options={_options} />;
      case 'datepicker':
        return <DatePicker {...other} />;
      case 'switch':
        return <Switch {...other} />;
      case 'treeselect':
        return (
          <TreeSelect
            treeNodeFilterProp="label"
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            {...other}
          />
        );
      default:
        return <Input allowClear onPressEnter={onEnterSearch && this.handleSubmit} {...other} />;
    }
  };

  handleToggle = () => this.setState({ expand: !this.state.expand });

  // 获取一行能放下表单的个数，计算的目的是在宽屏上充分利用空间，所以以fieldsVisibledCount作为最小值

  getOnelineVisibleCount = () => {
    const { fieldsVisibledCount } = this.props;
    const buttonsWidth = 210;

    if (this.wrapperDom) {
      const width = this.wrapperDom.clientWidth;
      const itemList = this.wrapperDom.querySelectorAll('.filter-collapsible-form-item');
      let baseWidth = buttonsWidth;
      let count = 0;
      for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        if (baseWidth + item.clientWidth > width) {
          break;
        } else {
          baseWidth += item.clientWidth + 30;
          count += 1;
        }
      }
      return count < fieldsVisibledCount ? fieldsVisibledCount : count;
    }
    return fieldsVisibledCount;
  };

  fieldsRef = e => {
    if (e) {
      this.wrapperDom = e;
      this.setState({
        onelineVisibleCount: this.getOnelineVisibleCount(),
      });
    }
  };

  renderFields() {
    const { fields, expand: propsExpand } = this.props;
    const { expand, onelineVisibleCount } = this.state;
    const visibleCount = onelineVisibleCount ? onelineVisibleCount : fields.length;
    const count = this.state.expand || propsExpand ? fields.length : visibleCount;
    const { getFieldDecorator } = this.props.form;
    // 收起状态下一列最多两个
    const rowNumber = visibleCount;
    const lastRowIndex = (Math.ceil(count / rowNumber) - 1) * rowNumber;
    return fields.reduce(
      (result, { name, label, decoratorOption = {}, oneLine, ...other }, index) => {
        const key = index + 1;
        if (/combinedselector/i.test(other.type)) {
          // eslint-disable-next-line
          decoratorOption.initialValue = decoratorOption.initialValue || [];
        }
        const className = classnames({
          'filter-collapsible-form-item': true,
          'filter-collapsible-form-item_one-line': oneLine,
          'filter-collapsible-form-item_hidden': index >= count,
          'filter-collapsible-form-item_mb0_last':
            index === visibleCount - 1 && !(expand || propsExpand),
          'filter-collapsible-form-item_mb0':
            index < count && index >= lastRowIndex && !(expand || propsExpand), // 避免可见行最后一行出现marginBottom
        });
        result.push(
          <Col key={key} className={className}>
            <FormItem labelAlign="left" label={label}>
              {getFieldDecorator(name, decoratorOption)(this.getDataInComponent({ ...other }))}
            </FormItem>
          </Col>,
        );
        return result;
      },
      [],
    );
  }

  renderButton() {
    const { expand } = this.state;
    const { onReset, onSubmit } = this.props;
    const { expand: propsExpand, fields, extendBtns = [] } = this.props;
    const expandBtnClass = classnames({
      'filter-collapsible__button_margin-right-10': true,
      'filter-collapsible__button_hidden':
        propsExpand || (!fields.filter(item => item.oneLine).length && fields.length <= 2),
    });

    return (
      <div style={{ marginTop: '4px' }}>
        <a onClick={this.handleToggle} className={expandBtnClass}>
          {expand ? '收起' : '高级'} <Icon type={this.state.expand ? 'up' : 'down'} />
        </a>

        <Button
          onClick={onReset}
          className="filter-collapsible__button filter-collapsible__button_margin-right-10"
        >
          重置
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          onClick={onSubmit}
          style={{ marginLeft: '4px' }}
          className="filter-collapsible__button"
        >
          <Icon type="search" />
          查询
        </Button>
        {extendBtns.map(item => (
          <Button type="primary" onClick={item.handleClick} className="filter-collapsible__button">
            {item.text}
          </Button>
        ))}
      </div>
    );
  }

  renderForm = () => {
    const { className, style, expand: propsExpand } = this.props;
    const { expand } = this.state;

    const finalyClass = classnames({
      'filter-collapsible': true,
      'filter-collapsible_expand': expand || propsExpand,
      ...className,
    });
    return (
      <div className="component-filter-collapsible-v2">
        <Form layout="inline" className={finalyClass} style={style}>
          <div className="filter-collapsible-fields" ref={this.fieldsRef}>
            <Row type="flex">
              {this.renderFields()}
              <Col className="filter-collapsible-form-item filter-collapsible-form-item-filter-button">
                <div className="filter-collapsible-button-wrapper">{this.renderButton()}</div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    );
  };

  render() {
    return this.renderForm();
  }
}

Index.defaultProps = {
  className: '',
  style: { width: '100%' },
  // 可见字段数量
  fieldsVisibledCount: 2,
  fields: [],
  formItemLayout: {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  },
  onReset: null,
  //  如果props有expand属性，则关闭展开收起功能，并展开
  expand: false,
};
