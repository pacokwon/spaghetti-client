import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Paper 
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { dorms } from './store.js'
import MenuStarRatings from './MenuStarRatings';

const styles = theme => ({
    paper: {
        marginTop: 20,
        [theme.breakpoints.up(748)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
})

class ProfileCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { username, dormitory, name, preference } = this.props.userdata;
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="body1">
                                        Your Name
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">{name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="body1">
                                        Username
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">{username}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="body1">
                                        Dormitory
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">{dorms[dormitory]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Paper className={classes.paper} style={{paddingTop: 10, paddingBottom: 20}}>
                    <Typography
                        variant="h6"
                        align="center"
                    >
                        Your Preferences
                    </Typography>
                    <MenuStarRatings ratings={[preference]} />
                </Paper>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProfileCard);
