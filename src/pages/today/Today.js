import React from 'react'
import {Button, Divider, Steps, Input, Tag, message, Row, Col} from "antd"

import formateTime from '../../utils/formateTime'
import {reqTimeLine} from "../../api"

const {Step} = Steps;


export default class Today extends React.Component {
    state = {
        time: '',
        add: false,
        title: '',
        label: '',
        date: '',
        createTime:''
        // timeline: [
        //     {
        //         title: '',
        //         label: '',
        //         fromDate: '',
        //         toDate: '',
        //     }
        // ],
    };
    componentDidMount() {
        let userId = localStorage.getItem("userId")
        if (!userId){
            this.props.history.push('/login')
        }
    }

    //  清除计时器
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    createTimeLine = () => {
        this.setState({add: true,createTime: new Date().toLocaleDateString()})
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
            this.setState({
                time: '',
            })
            let timeline = this.state.timeline;
            timeline[timeline.length - 1].toDate = new Date().toLocaleTimeString()
            this.setState({
                timeline: timeline
            })
            console.log(this.state)

        }
        if (title === '') {
            message.warning('您还没有告诉我您要做什么呢')
        } else {
            let {timeline = []} = this.state;
            timeline.push({
                title,
                label,
                fromDate: new Date().toLocaleTimeString(),
                toDate: '',
            })
            this.setState({
                date: new Date().toLocaleTimeString(),
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

    onEndLine = () => {
        let timeline = this.state.timeline;
        timeline[timeline.length - 1].toDate = new Date().toLocaleTimeString()
        this.setState({
            add: false,
            endbtn: false,
            timeline: timeline,
        })
        clearInterval(this.timer);
        console.log(this.state)
        reqTimeLine({userId: localStorage.getItem('userId'), createTime: this.state.createTime, timeline: this.state.timeline}).then((res) => {
            const msg = res.data.msg
            if (msg === 'success') {
                message.success('保存成功！请在"更多"中查看')
                setTimeout(()=>window.location.reload(),2000)
            }else {
                message.error("保存失败！请稍后再试")
            }
        })
    }

    render() {
        const {timeline, add, title, label} = this.state
        const time = formateTime(this.state.time)
        return (
            <div style={{paddingTop: 10}}>
                <Row>
                    <Col span={22} offset={1}>
                        {timeline !== undefined ?
                            (
                                <span>
                                    <span style={{fontSize: 24}}>
                                        {timeline[timeline.length - 1].title}
                                    </span>&nbsp;&nbsp;
                                    {timeline[timeline.length - 1].label !== '' ?
                                        <Tag color="cyan">{timeline[timeline.length - 1].label}</Tag>
                                        : null
                                    }
                                    <br/>{time}
                                </span>
                            )
                            : null
                        }

                        {timeline === undefined ?
                            <div style={{textAlign: "center"}}>
                                <Button size={"small"} type={"primary"} onClick={this.createTimeLine}>NEW</Button>
                            </div>
                            : null
                        }
                        <Divider/>
                        <Steps progressDot direction="vertical">
                            {
                                timeline !== undefined ? timeline.map((name, index) => {
                                    return (
                                        <Step
                                            key={index}
                                            status={"finish"}
                                            title={name.title}
                                            description={
                                                <span>
                                            {
                                                name.label !== '' ?
                                                    <span><Tag color="cyan">{name.label}</Tag> <br/></span>
                                                    : null
                                            }
                                                    {name.fromDate}
                                                    {
                                                        name.toDate !== '' ?
                                                            <span> <br/> {name.toDate} </span>
                                                            : null
                                                    }
                                            </span>
                                            }
                                        />
                                    )
                                }) : null
                            }

                            {
                                add ?
                                    <Step
                                        title={<Input size={"small"} value={title} placeholder="做点什么呢 ？"
                                                      onChange={this.titleChange}
                                                      onPressEnter={this.onPress}/>}
                                        description={<Input style={{width: 125}} size={"small"} value={label}
                                                            placeholder={'标签（可选）'}
                                                            onChange={this.labelChange} onPressEnter={this.onPress}/>}/>
                                    : null
                            }
                        </Steps>
                        {
                            timeline !== undefined ?
                                <Button onClick={this.onEndLine}>ENDLINE</Button>
                                : null
                        }

                    </Col>
                </Row>
            </div>
        )
    }
}