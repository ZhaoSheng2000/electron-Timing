import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {
    FlagOutlined,
    BarChartOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import './index.less'

import History from '../history/History'
import Count from "../count/count"
import Plan from "../plan/plan"

// const electron = window.require('electron');


const {Footer, Content, Sider} = Layout;
// const {clipboard, desktopCapturer, screen, shell, remote} = electron;


export default class Index extends React.Component {

    state = {
        collapsed: false,
    };


    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        return (
            <div>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider
                        collapsible
                        width={100}
                        collapsedWidth={80}
                        collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                    >
                        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline">
                            <Menu.Item key="2">
                                <Link to={'/#/more/history'}>
                                    <ClockCircleOutlined/>
                                    <span>历史</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Link to={'/#/more/plan'}>
                                    <FlagOutlined/>
                                    <span>计划</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to={'/#/more/count'}>
                                    <BarChartOutlined/>
                                    <span>统计</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{margin: '16px 16px'}}>
                            <Switch>
                                <Route path={'/more/history'} component={History}/>
                                <Route path={'/more/count'} component={Count}/>
                                <Route path={'/more/plan'} component={Plan}/>
                                <Route component={History}/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: "center", fontSize: 10, paddingBottom: 10}}>如鱼饮水，冷暖自知。</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}