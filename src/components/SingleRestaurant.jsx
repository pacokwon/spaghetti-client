import React, { Component, Fragment } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Divider,
    FormGroup,
    FormControlLabel,
    Grid,
    Grow,
    IconButton,
    List,
    ListItemText,
    MenuItem,
    Snackbar,
    Switch,
    Typography
} from '@material-ui/core'
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios';
import AuthHelperMethods from '../helpers/AuthHelperMethods'
import CloseIcon from '@material-ui/icons/Close';
import PacoRatings from './subcomponents/PacoRatings.jsx';
import RestaurantRateDialog from './subcomponents/RestaurantRateDialog.jsx'
import MenuRateDialog from './subcomponents/MenuRateDialog.jsx'
import MenuStarRatings from './subcomponents/MenuStarRatings.jsx';

const styles = theme => ({
    card: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        [theme.breakpoints.up(1548)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    },
    category: {
        marginTop: 10,
        marginBottom: 5
    },
    constraint: {
        [theme.breakpoints.up(1300)]: {
            width: 554,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    },
    close: {
        padding: theme.spacing(0.5)
    },
    description: {
        marginBottom: 20
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    grid: {
        marginRight: 5
    },
    media: {
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    menus: {
        maxHeight: 350,
        overflow: 'scroll',
        marginTop: 10
    }
})

class SingleRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            rating: null,
            menu: props.menu ? props.menu : "",
            checked: true,
            chartData: null,
            snackbarOpen: false
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

        axios('/api/rating/wholemenu', {
            method: 'GET',
            params: {
                'name': name
            }
        })
        .then(res => {
            if (this.props.menu) this.setChartData(res.data[this.props.menu].ratings)

            this.setState({
                rating: res.data
            })
        })
    }

    setChartData = ratings => {
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
                'name': 'taste',
                ...defaultValues
            },
            {
                'name': 'portion',
                ...defaultValues
            },
            {
                'name': 'price',
                ...defaultValues
            }
        ]);

        this.setState({
            chartData
        })
    }

    handleMenuClick = menu => event => {
        const { ratings } = this.state.rating[menu];

        this.setChartData(ratings);

        this.setState({
            menu
        })
    }

    handleRestaurantSend = rating => {
        const { name } = this.props;

        if (rating === 0) {
            this.setState({
                message: 'Rating must be between 1~5',
                snackbarOpen: true
            })
            return;
        }

        let data = Object.assign({}, this.state.data);
        data.rating.push(rating);
        this.setState({ data });

        const Auth = new AuthHelperMethods();
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Auth.getToken()}`
        }

        axios.put('/api/rating/restaurant', {
            name,
            rating,
        }, { headers })
        .then(res => {
            this.setState({
                message: 'Rating Successful',
                snackbarOpen: true
            })
        })

    }

    handleMenuSend = starPointsObj => {
        const { name } = this.props;
        const { menu } = this.state;
        const { taste, portion, price } = starPointsObj;

        if (!taste || !portion || !price) {
            this.setState({
                message: 'Rating must be between 1~5',
                snackbarOpen: true
            })

            return;
        }

        let rating = this.state.rating;
        rating[menu].ratings.push(starPointsObj);
        this.setChartData(rating[menu].ratings)

        this.setState({ rating })

        const Auth = new AuthHelperMethods();
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Auth.getToken()}`
        }

        axios.put('/api/rating/menu', {
            name,
            menu,
            starPointsObj
        }, { headers })
        .then(res => {
            this.setState({
                message: 'Rating Successful',
                snackbarOpen: true
            })
        })
    }

    handleSwitchChange = () => {
        this.setState(prev => ({
            checked: !prev.checked
        }));
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;

        this.setState({
            snackbarOpen: false
        })
    }

    render() {
        const { classes } = this.props;
        const { data, menu, rating, chartData, checked, snackbarOpen, message } = this.state;

        // https://learnui.design/tools/data-color-picker.html#palette
        const chartPalette = [
            [
                '#fb3a3a',
                '#fb6f00',
                '#e99e00',
                '#c6c800',
                '#8bee00'
            ],
            [
                '#003f5c',
                '#58508d',
                '#bc5090',
                '#ff6361',
                '#ffa600'
            ],
            [
                '#7875d1',
                '#cf67c1',
                '#ff5f93',
                '#ff7857',
                '#ffa600'
            ],
            [
                '#0a71bf',
                '#a069c7',
                '#f35aa1',
                '#ff6f60',
                '#ffa600'
            ]
        ]

        const randomIndex = 3;
        // Math.floor(Math.random() * chartPalette.length)

        if (data && rating) {
            console.log(rating);
            const { name, categories, description } = data;
            const avgRating = Math.round(data.rating.reduce((acc, cur, idx) => {
                acc += cur;
                return idx === data.rating.length - 1 ? acc / data.rating.length : acc;
            }) * 10) / 10;

            return (
                <Fragment>
                    <Grid container spacing={2}>
                        <Grow in = {data !== null && rating != null}>
                            <Grid
                                item
                                xs={12} sm={6} md={6}
                                component={Card}
                            >
                                <CardHeader
                                    title={name}
                                    titleTypographyProps={{variant: 'h5', align: 'center'}}
                                />
                                <CardMedia
                                    title={name}
                                    src={require('../assets/' + name + '.jpeg')}
                                    component="img"
                                    className={classes.media}
                                />
                                <CardContent>
                                    <Typography
                                        component="p"
                                        variant="body2"
                                        align='center'
                                        className={classes.description}
                                    >
                                        {description}
                                    </Typography>
                                    <PacoRatings starPoints={avgRating} title={'Restaurant Rating'} />
                                    <RestaurantRateDialog onSend={this.handleRestaurantSend}/>
                                    <Divider className={classes.divider} />
                                    <div className={classes.menus}>
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
                                                {obj.menus.map(menuElement =>
                                                    <MenuItem
                                                        button
                                                        key={menuElement}
                                                        onClick={this.handleMenuClick(menuElement)}
                                                        selected={menuElement === menu}
                                                    >
                                                        <ListItemText primary={menuElement} />
                                                    </MenuItem>
                                                )}
                                                </List>
                                            </Fragment>
                                        )}
                                    </div>
                                </CardContent>
                            </Grid>
                        </Grow>
                        {
                            menu !== "" && chartData !== null
                            ?
                            (<Grow in={menu !== "" && chartData !== null}>
                                <Grid
                                    item
                                    xs={12} sm={6} md={6}
                                    component={Card}
                                >
                                    <CardHeader
                                        title={menu}
                                        titleTypographyProps={{variant: 'subtitle1', align: 'center'}}
                                    />
                                    <CardMedia
                                        title={menu}
                                        src={require('../assets/chicken.jpeg')}
                                        component="img"
                                        className={classes.media}
                                    />
                                    <CardContent className={classes.content}>
                                        <div style={{display: 'flex', justifyContent: 'space-between', width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
                                            <Typography
                                                variant="h6"
                                            >
                                                Menu Ratings
                                            </Typography>
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={checked}
                                                            onChange={this.handleSwitchChange}
                                                        />
                                                    }
                                                    label={
                                                        <Typography variant="overline">
                                                            {checked ? 'Star Ratings' : 'Graph Ratings'}
                                                        </Typography>
                                                    }
                                                    labelPlacement="start"
                                                >
                                                </FormControlLabel>
                                            </FormGroup>
                                        </div>
                                        <div className={classes.constraint}>
                                            {
                                                checked
                                            ?
                                                <MenuStarRatings ratings={rating[menu].ratings}/>
                                            :
                                                <ResponsiveContainer width='100%' aspect={2.4}>
                                                <BarChart
                                                    layout='vertical'
                                                    data={chartData}
                                                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                                                >
                                                <YAxis dataKey="name" type="category"/>
                                                <XAxis type="number" />
                                                <Tooltip/>
                                                <Legend />
                                                {[1, 2, 3, 4, 5].map(e =>
                                                    <Bar
                                                    key={e}
                                                    dataKey={e}
                                                    stackId="a"
                                                    fill={chartPalette[randomIndex][e - 1]}
                                                    />
                                                )}
                                                </BarChart>
                                                </ResponsiveContainer>
                                            }
                                        </div>
                                        <MenuRateDialog onSend={this.handleMenuSend} />
                                    </CardContent>
                                </Grid>
                            </Grow>)
                            :
                            null
                        }
                        </Grid>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={snackbarOpen}
                        autoHideDuration={4000}
                        onClose={this.handleSnackbarClose}
                        message={message}
                        action={[
                            <IconButton
                                key="close"
                                onClick={this.handleSnackbarClose}
                                className={classes.close}
                                color="inherit"
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </Fragment>
            );
        } else {
            return null;
        }
    }
}

export default withStyles(styles)(SingleRestaurant);
