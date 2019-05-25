import React, { Component, Fragment } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Grow,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios';
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const styles = theme => ({
    card: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        [theme.breakpoints.up(1500 + theme.spacing.unit * 3 * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    },
    description: {
        marginBottom: 20
    },
    divider: {
        marginBottom: 20
    },
    category: {
        marginTop: 10,
        marginBottom: 5
    },
    content: {
        maxHeight: 500,
        overflow: 'auto',
        marginTop: 20
    },
    grid: {
        marginRight: 5
    },
    media: {
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

class SingleRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            rating: null,
            title: ""
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
                'name': name
            }
        })
        .then(res => {
            this.setState({
                rating: res.data
            })
        })
    }

    handleMenuClick = title => event => {
        const { ratings } = this.state.rating[title];

        const defaultValues = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0
        }

        const chartData = ratings.reduce((acc, cur) => {
            acc[0][cur.taste] += 1;
            acc[1][cur.portion] += 1;
            acc[2][cur.price] += 1;

            return acc;
        }, [
            {
                'name': 'taste', ...defaultValues
            },
            {
                'name': 'portion', ...defaultValues
            },
            {
                'name': 'price', ...defaultValues
            }
        ]);

        console.log(chartData);

        this.setState({
            title,
            chartData
        })
    }

    render() {
        const { classes } = this.props;
        const { data, title, rating, chartData } = this.state;
        console.log(rating);
        if (data && rating) {
            const { name, categories, description } = data;
            return (
                <Grid container spacing={16}>
                    <Grow in = {data !== null && rating != null}>
                        <Grid
                            item
                            xs={6} sm={6} md={6}
                            component={Card}
                        >
                            <CardHeader
                                title={name}
                                titleTypographyProps={{variant: 'title', align: 'center'}}
                            />
                            <CardMedia
                                title={name}
                                src={require('../resources/' + name + '.jpeg')}
                                component="img"
                                className={classes.media}
                            />
                            <CardContent className={classes.content}>
                                <Typography
                                    component="p"
                                    variant="body2"
                                    className={classes.description}
                                >
                                    {description}
                                </Typography>
                                <Divider className={classes.divider} />
                                {categories.map(obj =>
                                    <Fragment key={obj.category}>
                                        <Typography
                                            variant="h6"
                                            color="secondary"
                                            className={classes.category}
                                        >
                                            {obj.category}
                                        </Typography>
                                        <List>
                                        {obj.menus.map(menu =>
                                            <ListItem
                                                button
                                                key={menu}
                                                onClick={this.handleMenuClick(menu)}
                                            >
                                                <ListItemText primary={menu} />
                                            </ListItem>
                                        )}
                                        </List>
                                    </Fragment>
                                )}
                            </CardContent>
                        </Grid>
                    </Grow>
                    <Grow in={title !== ""}>
                        <Grid
                            item
                            xs={6} sm={6} md={6}
                            component={Card}
                        >
                            <CardHeader
                                title={title}
                                titleTypographyProps={{variant: 'title', align: 'center'}}
                            />
                            <CardMedia
                                title={title}
                                src={require('../resources/food.jpeg')}
                                component="img"
                                className={classes.media}
                            />
                            <CardContent className={classes.content}>
                                <ResponsiveContainer width='100%' aspect={2.5}>
                                    <BarChart layout={'vertical'} data={chartData}
                                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>

                                        <YAxis dataKey="name" type="category"/>
                                        <XAxis type="number" />
                                        <Tooltip/>
                                        <Legend />
                                        <Bar dataKey="1" stackId="a" fill="#003f5c" />
                                        <Bar dataKey="2" stackId="a" fill="#58508d" />
                                        <Bar dataKey="3" stackId="a" fill="#bc5090" />
                                        <Bar dataKey="4" stackId="a" fill="#ff6361" />
                                        <Bar dataKey="5" stackId="a" fill="#ffa600" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Grid>
                    </Grow>
                </Grid>
            );
        } else {
            return (
                null
            );
        }
    }
}

export default withStyles(styles)(SingleRestaurant);
