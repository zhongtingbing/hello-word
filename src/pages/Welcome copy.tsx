import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Alert, Input } from 'antd';
import List from 'react-virtualized/dist/es/List';

import styles from './Welcome.less';
import { divide } from 'lodash';

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);
const list = new Array(100).fill('1');

function rowRenderer({
  key, // Unique key within array of rows
  index, // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible, // This row is visible within the List (eg it is not an overscanned row)
  style, // Style object to be applied to row (to position it)
}) {
  return (
    <div key={key} style={{ marginTop: '10px' }}>
      <span>{index}</span>
      <Input value={list[index]} onChange={e => {}} />
    </div>
  );
}
export default class Index extends React.PureComponent {
  state = {
    list: new Array(100).fill('1'),
  };

  onChange = (value: any, index: any) => {
    const list = [...this.state.list];
    list[index] = value;
    this.setState({ list });
  };
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    return (
      <div key={key} style={{ marginTop: '10px' }}>
        <span>{index}</span>
        <Input
          value={list[index]}
          onChange={e => {
            this.onChange(e.target.value, index);
          }}
        />
      </div>
    );
  };
  render() {
    console.log(this.state.list, 'list');
    return (
      <PageHeaderWrapper>
        <List
          width={400}
          height={600}
          rowCount={list.length}
          rowHeight={20}
          rowRenderer={(param: any) => {
            console.log(param, 'param');
            this.rowRenderer(param);
          }}
        />
      </PageHeaderWrapper>
    );
  }
}
// export default (): React.ReactNode => (
//   <PageHeaderWrapper>
//     <List
//       width={400}
//       height={600}
//       rowCount={list.length}
//       rowHeight={20}
//       rowRenderer={rowRenderer}
//     />
//   </PageHeaderWrapper>
// );
