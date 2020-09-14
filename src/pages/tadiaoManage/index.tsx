import React from 'react';
import { Button, Form, Table, Menu, Dropdown } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { router } from 'umi';
import Filter from '@/components/Filter';

// const { Option } = Select;

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  list: Item[];
}

interface AppListProps {
  form: WrappedFormUtils;
}

const getTableData = (
  { current, pageSize }: PaginatedParams[0],
  formData: Object,
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      list: res.results,
    }));
};

const fields = [
  {
    name: '11',
    label: '单据号',
    placeholder: '请输入单据号',
  },
  {
    name: '12',
    label: '单据号',
    placeholder: '请输入单据号',
  },
  {
    name: '13',
    label: '单据号',
    placeholder: '请输入单据号',
  },
  {
    name: '14',
    label: '单据号',
    placeholder: '请输入单据号',
  },
  {
    name: '16',
    label: '单据号',
    placeholder: '请输入单据号',
  },
  {
    name: '101',
    label: '单据号',
    placeholder: '请输入单据号',
  },
  {
    name: '8989',
    label: '创建方式',
    type: 'checkbox',
    options: [
      {
        value: '1',
        key: '商户自建',
      },
      {
        value: '2',
        key: '配送方统配',
      },
    ],
  },
];
const handleMenuClick = () => {};
const handleButtonClick = () => {};
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">删除</Menu.Item>
    <Menu.Item key="2">禁用</Menu.Item>
    <Menu.Item key="3">实时运行数据</Menu.Item>
    <Menu.Item key="4">工作循环数据</Menu.Item>
    <Menu.Item key="5">拆除</Menu.Item>
    <Menu.Item key="6">报警联系人</Menu.Item>
    <Menu.Item key="7">编辑安装信息</Menu.Item>
  </Menu>
);
const AppList = (props: AppListProps) => {
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    form: props.form,
  });
  const { submit, reset } = search;
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 50,
      fixed: 'left',
      render: (val: any, row: any, index: number) => index + 1,
    },
    {
      title: '出厂编号',
      dataIndex: 'ccbh',
      fixed: 'left',
      width: 100,
    },
    {
      title: '塔吊类型',
      dataIndex: 'tdlx',
      width: 100,
    },
    {
      title: '塔身高(m)',
      dataIndex: 'tsg',
      width: 100,
    },
    {
      title: '塔顶高(m)',
      dataIndex: 'tdg',
      width: 100,
    },
    {
      title: '大臂（m）',
      dataIndex: 'db',
      width: 100,
    },
    {
      title: '最大起重（kg）',
      dataIndex: 'zdqz',
      width: 100,
    },
    {
      title: '额定风级',
      dataIndex: 'edfj',
      width: 100,
    },
    {
      title: '最小变幅/最大变幅(m)',
      dataIndex: 'zxbf',
      width: 150,
    },
    {
      title: '最小角度/最大角度(°)',
      dataIndex: 'zxjd',
      width: 150,
    },
    {
      title: '额定倾角(°)',
      dataIndex: 'edqj',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'zction',
      width: 100,
      fixed: 'right',
      render: () => (
        <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
          编辑
        </Dropdown.Button>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <div>
        <Filter fields={fields} onReset={reset} onSubmit={submit} form={props.form} />
        <Button
          style={{ margin: '5px 0' }}
          type="primary"
          size="small"
          icon="plus"
          onClick={() => {
            router.push({
              pathname: '/tadiaoManage/edit', // 这个路由为要跳转的页面（在router.config中定义）
            });
          }}
        >
          添加塔吊
        </Button>
        <Table
          columns={columns}
          rowKey="email"
          {...tableProps}
          scroll={{ x: 1500 }}
          size="small"
          pagination={{
            ...tableProps.pagination,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total: String | Number, range: any) => `共计 ${total} 条`,
          }}
        />
      </div>
    </PageHeaderWrapper>
  );
};

export default Form.create()(AppList);
