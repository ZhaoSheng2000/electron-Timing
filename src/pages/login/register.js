import React from 'react'
import {Form, Input, Button, Card} from 'antd';
import {BellOutlined,UserOutlined, LockOutlined} from '@ant-design/icons';
import Cookies from 'js-cookie'
import {reqLogin} from "../../api";


export default class Register extends React.Component {
    state = {

    };
    onFinish = (e) => {
        console.log(e);
        this.props.userLogin(e);
        reqLogin({
            username: e.username,
            password: e.password
        }).then(r => {
            const userId = r.data.data[0].id;
            Cookies.set("userId", userId, {expires: 1});
        });
    };


    render() {
        return (
            <div style={{
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: window.innerHeight,
                backgroundImage: "url(" + require("./loginBg.jpg") + ")",
            }}
            >
                <Card
                    title='注册账号'
                    style={{
                        width: 330,
                    }}>
                    <Form
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[{required: true, message: '请输入您的邮箱！'}]}
                        >
                            <Input
                                type="email"
                                prefix={<BellOutlined/>}
                                placeholder="email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: '请输入您的昵称！'}]}
                        >
                            <Input
                                prefix={<UserOutlined/>}
                                placeholder="username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: '请输入您的密码！'}]}
                        >
                            <Input
                                prefix={<LockOutlined/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                注 册
                            </Button>
                            <a href="/login">返回登录</a>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
