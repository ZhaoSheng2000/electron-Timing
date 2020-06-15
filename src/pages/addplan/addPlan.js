import React from 'react'
import {Input, Card, TimePicker, Button, Tooltip, Timeline, message} from 'antd';
import moment from 'moment';
import {PlusOutlined} from '@ant-design/icons';

import {reqAddPlan} from "../../api"

export default class AddPlan extends React.Component {

    state = {
        plan: '',
        date: '',
        plans: []
    };

    titleChange = ({target: {value}}) => {
        this.setState({plan: value});
    };
    onChange = (time, timeString) => {
        console.log("time：" + time);
        console.log("timeString:" + timeString)
        this.setState({date: timeString})
    }
    onContinue = () => {
        const {plan, date} = this.state
        if (!plan) {
            message.warning('请输入计划名称')
        } else if (!date) {
            message.warning('请选择计划时间')
        } else {
            let {plans = []} = this.state;
            plans.push({
                plan: plan,
                date: date
            })

            this.setState({
                plans: plans,
                plan: '',
                date: ''
            })
            const userId = localStorage.getItem('userId')
            reqAddPlan({userId, plans}).then(res => {
                console.log(res.data)
                if (res.data.success === 1) {
                    message.success('创建计划成功')
                    this.props.history.push('/more/plan')
                }
            })
        }
    }


    render() {
        const {plans} = this.state
        return (
            <div>
                <Card title="添加计划" style={{width: 300}}>
                    <Timeline mode={"left"}>
                        {plans.map((name, index) => {
                            return (
                                <Timeline.Item label={name.date} key={index}>{name.plan}</Timeline.Item>
                            )
                        })}

                    </Timeline>
                    <Input placeholder="请输入计划名称" value={this.state.plan} onChange={this.titleChange}/>
                    <br/><br/>
                    <TimePicker
                        onChange={this.onChange}
                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                    />
                    <Tooltip title="确认添加">
                        <Button type="primary" shape="circle" style={{float: "right"}} onClick={this.onContinue}
                                icon={<PlusOutlined/>}/>
                    </Tooltip>
                </Card>
            </div>
        )
    }
}