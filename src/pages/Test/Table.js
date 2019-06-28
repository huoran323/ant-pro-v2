import React, { PureComponent } from 'react';
import { Card, Badge } from 'antd';
// 导入dva
import { connect } from 'dva';

import styles from './Table.less';

// 导入面包屑
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// 导入表格
import StandardTable from '@/components/StandardTable';

// 设置状态
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

// tableModel为models文件中的namespece,此处的名字必须与命名空间的名字一致
@connect(({ tableModel, loading }) => ({
  tableModel,
  loading: loading.models.tableModel,
}))
class TableList extends PureComponent {
  state = {
    selectedRows: [],
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
        {
          text: status[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '任务',
      dataIndex: 'title',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableModel/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'tableModel/fetch',
      payload: params,
    });
  };

  render() {
    const {
      tableModel: { data },
      loading,
    } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderWrapper title="测试表格">
        <Card>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              //   onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
