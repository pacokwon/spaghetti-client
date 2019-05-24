import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import food from './food.jpg'
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    Grid,
    Typography
} from '@material-ui/core'

const styles = theme => ({
    img: {
        maxHeight: '100%',
        maxWidth: '100%',
    },
    center: {
        margin: 'auto',
        textAlign: 'center'
    },
    gridText: {
        marginTop: 20,
        marginBottom: 20
    },
    subheader: {
        marginTop: 20,
        marginBottom: 20
    },
    grid: {
        margin: 15
    }
})

class Browser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            building_data: null
        }
    }

    componentDidMount() {
        axios('/api/allRestaurants', {
            method: 'GET',
        })
        .then(res => {
            this.setState({
                /*
                    menu_data   -> array of objects
                    object keys -> caft_info(array of objects), building_name(string), caft_name(string)
                    caft_info element keys -> category(string), menus(array of strings)
                */
                building_data: res.data
            })
        })
    }

    render() {
        const { building_data } = this.state;
        const { classes, onCardClick } = this.props;
        if (building_data) {
            console.log(building_data.map(e => e))
            return (
                <Fragment>
                    <Grid container>
                    {building_data.map(e =>
                        <Grid
                            item
                            key={e.caft_name}
                            className={classes.grid}
                            component={Card}
                            xs={6}
                            sm={4}
                            md={3}
                            lg={2}
                        >
                            <CardHeader
                                title={e.caft_name}
                                titleTypographyProps={{variant: 'body1'}}
                            />
                            <CardActionArea
                                onClick={(e)=>onCardClick(e, 'hell')}
                            >
                                <CardMedia
                                    title={e.caft_name}
                                    src={require('../resources/' + e.caft_name + '.jpeg')}
                                    component="img"
                                />
                            </CardActionArea>
                            <CardContent>
                                <Typography
                                    component="p"
                                    variant="body2"
                                >
                                    {e.description}
                                </Typography>
                            </CardContent>
                        </Grid>
                    )}
                    </Grid>
                </Fragment>
            );
        } else {
            return (
                <div>Hello</div>
            );
        }
    }
}

export default withStyles(styles)(Browser);
