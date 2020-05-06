import React from 'react'
import {Form, Input, Button, Card} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import Cookies from 'js-cookie'
import {reqLogin} from "../../api";


export default class Login extends React.Component {
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
                    title='邮箱登陆'
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
                                prefix={<UserOutlined/>}
                                placeholder="email"
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
                                登 录
                            </Button>
                            没有账号？ <a href="/register">现在注册！</a>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
