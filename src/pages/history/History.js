import React from 'react'
import {Steps, Card, Row, Col, Tag} from 'antd';

import {reqFindLine} from "../../api"
const {Step} = Steps;


export default class History extends React.Component {

    state = {
        timelines:[]
    };

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        reqFindLine({userId}).then(res => {
            console.log(res.data)
            this.setState({timelines: res.data})
        })
    }

    render() {
        const {timelines} = this.state
        return (
            <div>
                <Row gutter={[16, 16]}>
                    {
                        timelines.reverse().map((name, index) => {
                            return (
                                <Col key={index}>
                                    <Card style={{width: 240}} title={name.createTime}>
                                        <Steps progressDot direction="vertical">
                                            {
                                                name.timeline.map((line, index) => {
                                                    return (
                                                        <Step
                                                            key={index}
                                                            status={"finish"}
                                                            title={line.title}
                                                            description={
                                                                <span>
                                                                    {
                                                                    line.label !== '' ?
                                                                        <span><Tag color="cyan">{line.label}</Tag> <br/></span>
                                                                        : null
                                                                    }
                                                                    {line.fromDate}
                                                                    {<span><br/>{line.toDate}</span>}
                                                                </span>
                                                            }
                                                        />
                                                    )
                                                })
                                            }
                                        </Steps>
                                    </Card>
                                </Col>
                            )
                        })
                    }

                </Row>
            </div>
        )
    }
}