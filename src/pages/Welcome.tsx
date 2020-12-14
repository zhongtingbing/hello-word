import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Table, Input } from 'antd';
import { VTComponents } from 'virtualizedtableforantd';

import styles from './Welcome.less';

//acebookarchive/fixed-data-table

// react-lazyload
const MyCustomCell = ({ mySpecialProp }) => (
  <Cell>{mySpecialProp === 'column2' ? "I'm column 2" : "I'm not column 2"}</Cell>
);
export default class Index extends React.PureComponent {
  state = {
    rows: [],
  };
  componentDidMount() {
    const a = [];
    for (let i = 0; i < 1000; i++) {
      a.push({
        name: 'ww',
        id: i + 'iii',
      });
    }
    this.setState({
      rows: a,
    });
  }

  onChange = (value: any, index: number) => {
    const rows = [...this.state.rows];
    rows[index]['name'] = value;
    this.setState({ rows });
  };
  columns = [
    { title: '序号', dataIndex: 'index', width: 50 },
    {
      title: '名称',
      dataIndex: 'name',
      width: 50,
      render: (value: any, record: any, index: number) => (
        <Input
          style={{ width: '200px' }}
          value={value}
          onChange={e => {
            this.onChange(e.target.value, index);
          }}
        />
      ),
    },
  ];
  render() {
    const { rows } = this.state;
    return (
      <PageHeaderWrapper>
        <Table
          className="templateTable"
          dataSource={rows} //dataSource 是table的数据
          // bordered
          columns={this.columns}
          pagination={false}
          rowKey={record => record.id}
          scroll={{ y: 500 }} //y: 500 it's important!!!
          /*the id is immutable   the height prop is variable */
          components={VTComponents({ id: 1000 })} // 这是最核心的代码
        />
      </PageHeaderWrapper>
    );
  }
}
