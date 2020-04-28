import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {Button, Layout, Menu} from 'antd';
import {
    CarryOutOutlined,
    FlagOutlined,
    BarChartOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import './index.less'

import History from '../history/History'
import Today from "../today/Today"

const electron = window.require('electron');


const {Footer, Content, Sider} = Layout;
const {clipboard, desktopCapturer, screen, shell, remote} = electron;


export default class Index extends React.Component {

    state = {
        collapsed: true,
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
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to={'/today'}>
                                    <CarryOutOutlined />
                                    <span>今天</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={'/history'}>
                                    <ClockCircleOutlined/>
                                    <span>历史</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <FlagOutlined/>
                                <span>计划</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <BarChartOutlined/>
                                <span>统计</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{margin: '16px 16px'}}>
                            <Switch>
                                <Route path={'/today'} component={Today}/>
                                <Route path={'/history'} component={History}/>
                                <Route component={Today}/>
                            </Switch>
                        </Content>
                        <Footer
                            style={{textAlign: "center", fontSize: 10, paddingBottom: 10}}>如鱼饮水，冷暖自知。</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}