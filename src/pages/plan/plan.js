import React from 'react'
import {Card, Steps, Tooltip, Col, Row, Timeline, Statistic} from 'antd';
import {DeleteOutlined, BellOutlined} from '@ant-design/icons';
import moment from "moment"
import {reqGetPlan, reqDelPlan} from "../../api"


const {Countdown} = Statistic;



export default class Plan extends React.Component {

    state = {
        myplan: [],
        name:'暂无',
        deadline:moment(new Date()).format("YYYY-MM-DD")
    };

    componentDidMount() {
        const userId = localStorage.getItem("userId")
        reqGetPlan({userId}).then(res => {
            console.log(res.data)
            this.setState({
                myplan: res.data.data
            })
        })
    }


    onNotice = () => {
        setTimeout(() => {
            let myNotification = new Notification('今日计划', {
                body: '喝水'
            })
        }, 10000);
    }
    onDelete = (id) => {
        console.log(id)
        reqDelPlan({id}).then(res => {
            console.log(res.data)
            const userId = localStorage.getItem("userId")
            reqGetPlan({userId}).then(res => {
                console.log(res.data)
                this.setState({
                    myplan: res.data.data
                })
            })
        })
    }
    onConfirm =(name)=>{
        console.log(name[0])
        const day = moment(new Date()).format("YYYY-MM-DD")
        const date = new Date(`${day} ${name[0].date}`)
        this.setState({
            name:name[0].plan,
            deadline:date
        })
    }
    onFinish =(name)=>{
        console.log('finished!');
        let myNotification = new Notification('今日计划', {
            body: name
        })
    }

    render() {
        const {myplan,name,deadline} = this.state

        return (
            <div>
                <Countdown title={`当前执行计划: ${name}`} value={deadline} onFinish={()=>this.onFinish(name)}/>
                <br/>
                <Row gutter={[16, 16]}>
                    <Col>
                        {
                            myplan.reverse().map((name, index) => {
                                return (
                                    <Card key={index} style={{width: 300, marginBottom: 20}}
                                          actions={[
                                              <Tooltip title="执行">
                                                  <BellOutlined key="setting" onClick={()=>this.onConfirm(name.plans)}/>
                                              </Tooltip>,
                                              <Tooltip title="删除">
                                                  <DeleteOutlined key="ellipsis"
                                                                  onClick={() => this.onDelete(name._id)}/>
                                              </Tooltip>,
                                          ]}
                                    >
                                        <Timeline mode={"left"}>
                                            {
                                                name.plans.map((names, indexs) => {
                                                    return (
                                                        <Timeline.Item key={indexs}
                                                                       label={names.date}>{names.plan}</Timeline.Item>
                                                    )
                                                })
                                            }
                                        </Timeline>
                                    </Card>
                                )
                            })
                        }
                    </Col>
                </Row>

            </div>
        )
    }
}