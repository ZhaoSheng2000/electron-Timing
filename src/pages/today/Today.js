import React from 'react'
import {Button, Divider, Steps, Input, Tag} from "antd"
const {Step} = Steps;

export default class Today extends React.Component {

    state = {
        timeline: [
            {
                id: 1,
                title: '事件一',
                label: '标签',
                date:  new Date().toLocaleTimeString(),
            }
        ],
    };
    componentDidMount() {
        console.log('aaa')
    }

    createTimeLine = () => {

    }

    render() {
        const {timeline} = this.state
        return (
            <div>
                <Button size={"small"} type={"primary"} onClick={this.createTimeLine}>NEW</Button>
                <Divider/>
                <Steps progressDot current={3} direction="vertical">
                    <Step title={timeline[0].title} description={<span><Tag color="cyan">{timeline[0].label}</Tag><br/>{timeline[0].date}</span>}/>
                    <Step title="长句测试长句测试" description="This is a description. This is a description."/>
                    <Step title="Waiting" description="This is a description."/>
                    <Step title="Waiting" description="This is a description."/>
                    <Step title={<Input size={"small"} placeholder="做点什么呢 ？"/>}
                          description={<Input style={{width: 125}} size={"small"} placeholder={'标签（可选）'}/>}/>
                </Steps>
            </div>
        )
    }
}