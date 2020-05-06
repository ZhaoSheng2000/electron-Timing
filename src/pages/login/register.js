import React from 'react'
import {Form, Input, Button, Card, message} from 'antd';
import {BellOutlined, UserOutlined, LockOutlined} from '@ant-design/icons';
import {reqRegister} from "../../api";


export default class Register extends React.Component {
    state = {};
    onFinish = (e) => {
        console.log(e);
        reqRegister({
            email: e.email,
            name: e.username,
            password: e.password
        }).then(res => {
            console.log(res.data)
            const {success} = res.data
            if (success === 0){
                message.success('注册成功，正在为您跳转至登陆界面')
                this.props.history.push('/login')
            }else {
                message.error('该邮箱已被占用,换一个试试吧')
            }
        })
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
