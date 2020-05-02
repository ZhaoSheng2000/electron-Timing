import React from 'react'
import {Button, Divider, Steps, Input, Tag, message, Statistic, Row, Col} from "antd"
import formateTime from '../../utils/formateTime'

const {Step} = Steps;


export default class Today extends React.Component {
    state = {
        time: '',
        add: false,
        title: '',
        label: '',
        date: new Date().toLocaleTimeString(),
        // timeline: [
        //     {
        //         title: '',
        //         label: '',
        //         fromDate: '',
        //         toDate: '',
        //     }
        // ],
    };

    //  清除计时器
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    createTimeLine = () => {
        this.setState({add: true})
    }
    titleChange = ({target: {value}}) => {
        this.setState({title: value});
    };
    labelChange = ({target: {value}}) => {
        this.setState({label: value});
    }
    onPress = () => {
        const {title, label} = this.state;
        if (this.timer !== undefined) {
            clearInterval(this.timer);
            this.setState({time: ''})
        }
        if (title === '') {
            message.warning('您还没有告诉我您要做什么呢')
        } else {
            let {timeline = []} = this.state;
            timeline.push({
                title,
                label,
                fromDate: '2020-10-10',
                toDate: '',
            })
            this.setState({
                timeline: timeline,
                title: '',
                label: '',
            })

            // 计时器开始工作
            this.timer = setInterval(() => {
                this.setState({time: ++this.state.time})
            }, 1000)
        }
    }

    render() {
        const {timeline, add, title, label} = this.state
        const time = formateTime(this.state.time)
        return (
            <div>
                <Row>
                    <Col span={22} offset={1}>
                        <Row gutter={16}>
                            <Col span={12}>
                                {timeline!== undefined?
                                    <Statistic title={timeline[timeline.length-1].title} value={time}/>
                                    :null
                                }
                            </Col>
                            <Col span={12}>
                                <Button size={"small"} type={"primary"} onClick={this.createTimeLine}>NEW</Button>
                            </Col>
                        </Row>
                        <Divider/>
                        <Steps progressDot  direction="vertical">
                            {timeline !== undefined ? timeline.map((name, index) => {
                                return (
                                    <Step key={index} status={"finish"} title={name.title} description={<span><Tag
                                        color="cyan">{name.label}</Tag><br/>{name.fromDate}</span>}/>
                                )
                            }) : null
                            }

                            {add ?
                                <Step
                                    title={<Input size={"small"} value={title} placeholder="做点什么呢 ？" onChange={this.titleChange}
                                                  onPressEnter={this.onPress}/>}
                                    description={<Input style={{width: 125}} size={"small"} value={label} placeholder={'标签（可选）'}
                                                        onChange={this.labelChange} onPressEnter={this.onPress}/>}/>
                                : null
                            }
                        </Steps>
                        <Button>结束</Button>

                    </Col>
                </Row>

            </div>
        )
    }
}