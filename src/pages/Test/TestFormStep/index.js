import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { Step } = Steps;

export default class TestFormStep extends PureComponent {
  getCurrentStep = () => {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    // 将地址拆分，替换最后的路由地址
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  };

  render() {
    const { children, location } = this.props;

    return (
      <PageHeaderWrapper
        title="分步表单"
        tabActiveKey={location.pathname}
        content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="分步1" />
              <Step title="分步2" />
              <Step title="分步3" />
            </Steps>
            {children}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
