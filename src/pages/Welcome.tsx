import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography, Input } from 'antd';
import { Table, Column, Cell } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';

import styles from './Welcome.less';

//acebookarchive/fixed-data-table

// react-lazyload
const MyCustomCell = ({ mySpecialProp }) => (
  <Cell>{mySpecialProp === 'column2' ? "I'm column 2" : "I'm not column 2"}</Cell>
);
export default class Index extends React.PureComponent {
  state = {
    rows: new Array(100).fill('1'),
  };

  onChange = (value: any, index: any) => {};

  render() {
    console.log(this.state.rows, 'rows');
    const { rows } = this.state;
    return (
      <PageHeaderWrapper>
        <Table rowHeight={50} rowsCount={rows.length} width={5000} height={5000} headerHeight={50}>
          <Column
            header={<Cell>Col 1</Cell>}
            cell={<Cell>Column 1 static content</Cell>}
            width={2000}
          />
          <Column
            header={<Cell>Col 2</Cell>}
            cell={<MyCustomCell mySpecialProp="column2" />}
            width={1000}
          />
          <Column
            header={<Cell>Col 3</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props}>Data for column 3: {rows[rowIndex]}</Cell>
            )}
            width={2000}
          />
        </Table>
        ,
      </PageHeaderWrapper>
    );
  }
}
