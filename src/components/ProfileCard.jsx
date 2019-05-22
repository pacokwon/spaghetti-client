import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableRow, Typography, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { dorms } from './store.js'

const styles = theme => ({
    paper: {
        marginTop: 20,
        [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
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
        const { username, dormitory, name } = this.props.userdata;
        const { classes } = this.props;
        
        return (
            <Paper className={classes.paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subheading">
                                    Your Name
                                </Typography>
                            </TableCell>
                            <TableCell align="right">{name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subheading">
                                    Username
                                </Typography>
                            </TableCell>
                            <TableCell align="right">{username}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subheading">
                                    Dormitory
                                </Typography>
                            </TableCell>
                            <TableCell align="right">{dorms[dormitory]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(ProfileCard);