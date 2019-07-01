import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Card, Row, Col, Input, Button, Select, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FooterToolbar from '@/components/FooterToolbar';
import FormTable from './FormTable';
import styles from './style.less';

// 底部table的数据
const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

@Form.create()
class FormTest extends PureComponent {
  state = {
    width: '100%',
  };

  // 验证提交
  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'form/submitAdvancedForm', // 调用接口
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { width } = this.state;

    return (
      <PageHeaderWrapper title="测试表单" content="这是面包屑的content功能">
        <Card title="管理" className={styles.card}>
          <Form>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="仓库名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入仓库名称' }],
                  })(<Input placeholder="请输入仓库名称" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="仓库域名">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label="仓库管理员">
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: '请选择管理员' }],
                  })(
                    <Select placeholder="请选择管理员">
                      <Select.Option value="xiao">付晓晓</Select.Option>
                      <Select.Option value="mao">周毛毛</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row guttre={16}>
              <Col xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label="生效日期">
                  {getFieldDecorator('dateRange', {
                    rules: [{ required: true, message: '请选择生效日期' }],
                  })(
                    <DatePicker.RangePicker
                      placeholder={['开始日期', '结束日期']}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="成员管理">
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<FormTable />)}
        </Card>
        <FooterToolbar style={{ width }}>
          {/* {this.getErrorInfo()} */}
          <Button type="primary" onClick={this.validate}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default FormTest;
