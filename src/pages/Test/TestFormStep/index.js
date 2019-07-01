import React, { PureComponent } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { Step } = Steps;

export default class TestFormStep extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <PageHeaderWrapper title="分步表单">
        <Card>
          <>
            <Steps className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            {children}
          </>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
