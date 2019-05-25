import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles'
import {
    Card,
    Grid,
    Grow,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography
} from '@material-ui/core'
import axios from 'axios';
import { dorms } from './store.js'

const styles = theme => ({
    card: {
        marginTop: 20,
        [theme.breakpoints.up(1500 + theme.spacing.unit * 3 * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginLeft: 10,
        marginRight: 10,
    },
    heading: {
        paddingTop: 20
    },
    distance: {
        textAlign: 'right'
    },
    title: {
        paddingTop: 20,
    }
})

class NearbyRestaurants extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rest_arr: null,
            closest_N: 3
        }
    }

    componentDidMount() {
        /**
         * this.props.userdata 는 dormitory code를 담고 있다.
         * 이는 dorms object의 key이다. 이에 대응하는 값은 "한글이름 영어이름"이다.
         * 따라서 split으로 두 이름을 자르고 첫 번째 원소를 선택하면 한글이름을 얻게 된다.
         */
        const dormitory = '카이스트본원' + this.getDormName()
        // console.log(this.state);
        axios('/api/restaurant/nearby', {
            method: 'GET',
            params: {
                start: dormitory,
                closest_N: this.state.closest_N
            }
        })
        .then(res => {
            this.setState({
                rest_arr: res.data
            })
        })
    }

    getDormName() {
        return dorms[this.props.userdata.dormitory].split(" ")[0];
    }

    render() {
        const { classes } = this.props;
        const { rest_arr, closest_N } = this.state;

        if (rest_arr) {
            return (
                <Grow in={rest_arr !== null}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                <Typography
                                    variant="subheading"
                                    align="center"
                                    className={classes.title}
                                >
                                    {`${closest_N} closest restaurants to ${this.getDormName()}`}
                                </Typography>
                                <List>
                                {rest_arr.map(({ destination, cafeteria_list , distance}) =>
                                    <Fragment key={destination}>
                                    <ListSubheader> {destination} </ListSubheader>
                                    {cafeteria_list.map((caft, index) =>
                                        <ListItem
                                            key={caft}
                                        >
                                            <ListItemText primary={caft}/>
                                            {index === 0
                                                ?
                                                <ListItemText
                                                    disableTypography
                                                    className={classes.distance}
                                                    primary={
                                                        <Typography
                                                            variant="caption"
                                                        >
                                                            {`${distance}m`}
                                                        </Typography>
                                                    }
                                                />
                                                :
                                                null
                                            }
                                        </ListItem>
                                    )}
                                    </Fragment>
                                )}
                                </List>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                Hello
                            </Card>
                        </Grid>
                    </Grid>
                </Grow>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default withStyles(styles)(NearbyRestaurants)
