import React, { Component } from 'react';
import { Card, Divider, Table, Badge } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import styles from './TestBasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ testProfile }) => {
  return {
    // 命名空间
    testProfile,
  };
})
class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'testProfile/fetchBasic',
      payload: params.id || '1000000000',
    });
  }

  render() {
    const { testProfile = {} } = this.props;
    const { application = {}, userInfo = {}, basicProgress = [] } = testProfile;

    return (
      <PageHeaderWrapper title="测试详情">
        <Card>
          <DescriptionList size="large" title="退款申请" style={{ marginBottom: 32 }}>
            <Description term="取货单号">{application.id}</Description>
            <Description term="状态">{application.status}</Description>
            <Description term="销售单号">{application.orderNo}</Description>
            <Description term="子订单">{application.childOrderNo}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">{userInfo.name}</Description>
            <Description term="联系电话">{userInfo.tel}</Description>
            <Description term="常用快递">{userInfo.delivery}</Description>
            <Description term="取货地址">{userInfo.addr}</Description>
            <Description term="备注">{userInfo.remark}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>退货进度</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={false}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
