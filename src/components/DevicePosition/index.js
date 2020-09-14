/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import { Modal, Button } from 'antd';
import IMG from './demo.jpg';
// import styles from './index.less';

export default class Index extends React.Component {
  state = {
    visible: false,
    value: this.props.value || { x: 0, y: 0 },
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleOk = () => {
    const { value } = this.state;
    this.props.onChange(value);
  };

  onClickHandle = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    const { imgUrl = IMG } = this.props;
    return (
      <>
        <Button onClick={this.onClickHandle}>点我选择位置</Button>
        <Modal
          className="device-position-modal"
          title="请点击选择位置"
          width="700px"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <img style={{ width: '650px', height: '400px' }} src={imgUrl} />
        </Modal>
      </>
    );
  }
}
