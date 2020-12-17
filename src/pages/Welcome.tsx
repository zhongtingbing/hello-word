import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Input } from 'antd';

//acebookarchive/fixed-data-table

// react-lazyload

export default class Index extends React.PureComponent {
  state = {
    renderData: [],
    itemHeight: 60,
    canSeeNums: 0,
    head: 0,
    tail: 10,
  };
  componentDidMount() {
    this.createMockData();
    this.refs.wrrapCpntainer.addEventListener('scroll', (e: any) => {
      requestAnimationFrame(() => {
        this.handSrcoll(e);
      });
    });
  }

  componentWillUnmount() {
    // 去掉addEventListener
  }

  createMockData = () => {
    let data = [];
    for (var i = 0; i < 10000; i++) {
      data.push({ name: 'ss', index: i });
    }
    this.setState({
      renderData: data,
    });
    const { itemHeight } = this.state;
    this.refs.scrollBody.style.height = 10000 * itemHeight + 'px';
    const canSeeNums =
      Math.ceil(Number(this.refs.wrrapCpntainer.style.height.split('px')[0]) / itemHeight) + 2;
    this.setState({
      tail: canSeeNums,
      canSeeNums: canSeeNums, // 可展示的数量+2
    });
  };

  onChange = (value: any, index: number) => {
    const renderData: any = [...this.state.renderData];
    renderData[index]['name'] = value;
    this.setState({ renderData });
  };

  handSrcoll = (e: any) => {
    const { itemHeight } = this.state;
    if (e.target.scrollTop) {
      this.setState({
        head: Math.ceil((e.target.scrollTop - itemHeight + 10) / itemHeight),
        tail: Math.ceil(e.target.scrollTop / itemHeight) + 11,
      });
    }
  };

  render() {
    const { itemHeight, head, tail, renderData } = this.state;
    return (
      <PageHeaderWrapper>
        <div
          style={{
            width: 300,
            height: 500,
            border: '1px solid #ddd',
            overflowY: 'scroll',
            margin: '20px auto',
          }}
          ref="wrrapCpntainer"
        >
          {/** 滚动容器 */}
          <div ref="scrollBody">
            <div
              style={{
                transform: `translateY(${head * itemHeight}px)`,
              }}
            >
              {renderData.slice(head, tail).map((item: any) => (
                <div
                  key={item.index}
                  style={{
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ margin: '0 20px' }}>{item.index + 1}</span>
                  <Input
                    style={{ width: '200px' }}
                    value={item.name}
                    onChange={e => {
                      this.onChange(e.target.value, item.index);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

/// 订单中心/拆单
