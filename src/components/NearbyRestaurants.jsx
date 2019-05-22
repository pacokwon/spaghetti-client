import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { 
    Paper,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography
} from '@material-ui/core'
import axios from 'axios';
import { dorms } from './store.js'

const styles = theme => ({
    paper: {
        marginTop: 20,
        [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    heading: {
        paddingTop: 20
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
         *  */ 
        const dormitory = '카이스트본원' + this.getDormName()
        // console.log(this.state);
        axios('/api/nearby', {
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
    /*
    cafeteria_list: ["풀빛마루"]
    destination: "카이스트본원학사학생회관"
    distance: 148
    start: "카이스트본원신뢰관"
    _id: "5ce2c8a0dcb25cb8b1c788b9"
    */
    render() {
        const { classes } = this.props;
        const { name, username } = this.props.userdata;
        const dormitory = this.getDormName();
        const { rest_arr } = this.state;
        console.log(rest_arr);
        if (rest_arr) {
            return (
                <Paper className={classes.paper}>
                    <Typography
                        variant="headline"
                        align='center'
                        className={classes.heading}
                    >
                        {`${this.state.closest_N} closest restaurants to your dormitory ${dormitory}`}
                    </Typography>
                    <List>
                        {rest_arr.map(({ destination, cafeteria_list }) => 
                            <Fragment key={destination}>
                                <ListSubheader> {destination} </ListSubheader>
                                {cafeteria_list.map(caft =>
                                    <ListItem key={caft}>
                                        <ListItemText primary={caft}/>
                                    </ListItem>
                                )}
                            </Fragment>
                        )}
                    </List>
                </Paper>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    }
}

export default withStyles(styles)(NearbyRestaurants)