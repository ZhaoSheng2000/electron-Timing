import React from 'react'
import { Column } from '@antv/g2plot';
import { StackedColumn } from '@antv/g2plot';


const data = [
    {
        type: '周日',
        sales: 38,
    },
    {
        type: '周一',
        sales: 52,
    },
    {
        type: '周二',
        sales: 61,
    },
    {
        type: '周三',
        sales: 145,
    },
    {
        type: '周四',
        sales: 48,
    },
    {
        type: '周五',
        sales: 38,
    },
    {
        type: '周六',
        sales: 38,
    },
];

const data2 = [
    { year: '06', type: 'redDeliciou', value: 10 },
    { year: '06', type: 'mcintosh', value: 15 },
    { year: '06', type: 'oranges', value: 9 },
    { year: '06', type: 'pears', value: 6 },
    { year: '07', type: 'redDeliciou', value: 12 },
    { year: '07', type: 'mcintosh', value: 18 },
    { year: '07', type: 'oranges', value: 9 },
    { year: '07', type: 'pears', value: 4 },
    { year: '08', type: 'redDeliciou', value: 5 },
    { year: '08', type: 'mcintosh', value: 20 },
    { year: '08', type: 'oranges', value: 8 },
    { year: '08', type: 'pears', value: 2 },
    { year: '09', type: 'redDeliciou', value: 1 },
    { year: '09', type: 'mcintosh', value: 15 },
    { year: '09', type: 'oranges', value: 5 },
    { year: '09', type: 'pears', value: 4 },
    { year: '10', type: 'redDeliciou', value: 2 },
    { year: '10', type: 'mcintosh', value: 10 },
    { year: '10', type: 'oranges', value: 4 },
    { year: '10', type: 'pears', value: 2 },
    { year: '11', type: 'redDeliciou', value: 3 },
    { year: '11', type: 'mcintosh', value: 12 },
    { year: '11', type: 'oranges', value: 6 },
    { year: '11', type: 'pears', value: 3 },
    { year: '12', type: 'redDeliciou', value: 4 },
    { year: '12', type: 'mcintosh', value: 15 },
    { year: '12', type: 'oranges', value: 8 },
    { year: '12', type: 'pears', value: 1 },
    { year: '13', type: 'redDeliciou', value: 6 },
    { year: '13', type: 'mcintosh', value: 11 },
    { year: '13', type: 'oranges', value: 9 },
    { year: '13', type: 'pears', value: 4 },
    { year: '14', type: 'redDeliciou', value: 10 },
    { year: '14', type: 'mcintosh', value: 13 },
    { year: '14', type: 'oranges', value: 9 },
    { year: '14', type: 'pears', value: 5 },
];
export default class Count extends React.Component {
    state = {};
    componentDidMount() {
        const columnPlot = new Column(document.getElementById('container'), {
            title: {
                visible: true,
                text: '每周日均',
                style:{
                    fontSize: 18,
                    fill: 'white',
                }
            },
            description: {
                visible: true,
                text: '与上周相比增加24%',
            },
            forceFit: true,
            data,
            padding: 'auto',
            xField: 'type',
            yField: 'sales',
            meta: {
                type: {
                    //alias: '类别',
                },
                sales: {
                    alias: '记录时间（min）',
                },
            },
            label: {
                visible: true,
                position: 'middle', // option: middle / top / bottom
            }
        });
        const columnPlot2 = new StackedColumn(document.getElementById('container2'), {
            forceFit: true,
            title: {
                visible: true,
                text: '每日所有活动',
                style:{
                    fontSize: 18,
                    fill: 'white',
                }
            },
            description: {
                visible: true,
                text: '可点击右上方活动名称进行不同数据对比。',
            },
            padding: 'auto',
            data:data2,
            xField: 'year',
            yField: 'value',
            stackField: 'type',
            color: ['#ae331b', '#f27957', '#dadada', '#609db7', '#1a6179'],
            yAxis: {
                min: 0,
            },
            label: {
                visible: true,
                position: 'middle',
            }
        });



        columnPlot.render();
        columnPlot2.render()
    }

    render() {
        return (
            <div>
                <div id='container'/>
                <div id='container2'/>

            </div>
        )
    }
}