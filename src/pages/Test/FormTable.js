import React, { PureComponent, Fragment } from 'react';
import { Table, Input, Divider } from 'antd';

class FormTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
    };
  }

  render() {
    const columns = [
      {
        title: '成员姓名',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: '工号',
        dataIndex: 'workId',
        key: 'workId',
        width: '20%',
      },
      {
        title: '所属部门',
        dataIndex: 'department',
        key: 'department',
        width: '40%',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>编辑</a>
            <Divider type="vertical" />
            <a>删除</a>
          </span>
        ),
      },
    ];

    const { data } = this.state;

    return (
      <Fragment>
        <Table columns={columns} dataSource={data} />
      </Fragment>
    );
  }
}

export default FormTable;
