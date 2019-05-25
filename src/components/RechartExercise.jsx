import React, { Component } from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import {
    Card,
    CardHeader,
    CardContent
} from '@material-ui/core'
import axios from 'axios';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data2 = [
    {
        '1': 0,
        '2': 3,
        '3': 2,
        '4': 1,
        '5': 4,
        'name': 'taste'
    },
    {
        '1': 4,
        '2': 2,
        '3': 1,
        '4': 2,
        '5': 1,
        'name': 'portion'
    },
    {
        '1': 1,
        '2': 2,
        '3': 1,
        '4': 4,
        '5': 2,
        'name': 'price'
    }
]

class RechartExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            rating: null,
        }
    }

    componentDidMount() {
        const { name } = this.props;

        axios('/api/restaurant/single', {
            method: 'GET',
            params: {
                'name': name
            }
        })
        .then(res => {
            this.setState({
                data: res.data[0]
            })
        })

        axios('/api/rating/single', {
            method: 'GET',
            params: {
                'name': '오니기리와 이규동'
            }
        })
        .then(res => {
            this.setState({
                rating: res.data
            })
        })
    }

    render() {
        const { rating } = this.state;

        return (

            <Card
                style={{width: 500}}
            >
                <CardHeader title={'hello'} />
                <CardContent>
                    <BarChart layout={'vertical'} width={600} height={300} data={data2}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>

                        <YAxis dataKey="name" type="category"/>
                        <XAxis type="number" />
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="1" stackId="a" fill="#8884d8" />
                        <Bar dataKey="2" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="3" stackId="a" fill="#f49548" />
                        <Bar dataKey="4" stackId="a" fill="#e94252" />
                        <Bar dataKey="5" stackId="a" fill="#f24ce7" />
                    </BarChart>
                </CardContent>
            </Card>
        );
    }
}

export default RechartExercise;
