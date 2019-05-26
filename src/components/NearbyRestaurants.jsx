import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid,
    Grow,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography
} from '@material-ui/core';
import axios from 'axios';
import { dorms } from './store.js';
import RestaurantCard from './RestaurantCard.jsx';

const styles = theme => ({
    card: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: '100%'
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
            dist_arr: null,
            closest_N: 3,
            selectedRestaurant: null
        }
    }

    componentDidMount() {
        /**
         * this.props.userdata 는 dormitory code를 담고 있다.
         * 이는 dorms object의 key이다. 이에 대응하는 값은 "한글이름 영어이름"이다.
         * 따라서 split으로 두 이름을 자르고 첫 번째 원소를 선택하면 한글이름을 얻게 된다.
         */
        const dormitory = '카이스트본원' + this.getDormName()
        axios('/api/restaurant/nearby', {
            method: 'GET',
            params: {
                start: dormitory,
                closest_N: this.state.closest_N
            }
        })
        .then(res => {
            this.setState({
                dist_arr: res.data
            })
        })
    }

    getDormName = () => {
        return dorms[this.props.userdata.dormitory].split(" ")[0];
    }

    handleCaftClick = (caft, ratings) => event => {
        this.setState({
            selectedRestaurant: <RestaurantCard name={caft} ratings={ratings} onCardClick={this.props.onCardClick} />
        })
    }

    render() {
        const { classes, onCardClick } = this.props;
        const { dist_arr, closest_N, selectedRestaurant } = this.state;

        if (dist_arr) {
            return (
                <Grid container spacing={16}>
                    <Grow in={dist_arr !== null}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card className={classes.card}>
                                <Typography
                                    variant="subheading"
                                    align="center"
                                    className={classes.title}
                                >
                                    {`${closest_N} closest restaurants to ${this.getDormName()}`}
                                </Typography>

                                <List>
                                {dist_arr.map(({ _id, cafeteria_list }) =>
                                    <Fragment key={_id.destination}>
                                    <ListSubheader> {_id.destination} </ListSubheader>
                                    {cafeteria_list.map(({ cafeteria, ratings }, index) =>
                                        <ListItem
                                            key={cafeteria}
                                            button
                                            onClick={this.handleCaftClick(cafeteria, ratings)}
                                        >
                                            <ListItemText primary={cafeteria}/>
                                            {index === 0
                                                ?
                                                <ListItemText
                                                    disableTypography
                                                    className={classes.distance}
                                                    primary={
                                                        <Typography
                                                            variant="caption"
                                                        >
                                                            {`${_id.distance}m`}
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
                    </Grow>
                        {selectedRestaurant
                        ?
                            <Grow in={selectedRestaurant !== null}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    {selectedRestaurant}
                                </Grid>
                            </Grow>
                        :
                            null
                        }
                </Grid>
            );
        } else {
            return (
                null
            );
        }
    }
}

export default withStyles(styles)(NearbyRestaurants)
