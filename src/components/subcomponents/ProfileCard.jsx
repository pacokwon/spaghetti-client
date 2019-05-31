import React, { Component } from 'react';
import {
    Button,
    Grid,
    FormGroup,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Paper,
    Snackbar,
    Switch
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { dorms } from './store.js'
import PriceIcon from '@material-ui/icons/AttachMoney';
import CloseIcon from '@material-ui/icons/Close';
import PortionIcon from '@material-ui/icons/PregnantWoman';
import TasteIcon from '@material-ui/icons/RoomService';
import MenuStarRatings from './MenuStarRatings';
import Ratings from 'react-ratings-declarative';
import axios from 'axios';

const styles = theme => ({
    paper: {
        [theme.breakpoints.up(748)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    },
    close: {
        padding: theme.spacing(0.5)
    }
})

class ProfileCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userdata: props.userdata,
            editMode: false,
            selectedDorm: props.userdata.dormitory,
            preference: props.userdata.preference,
            snackbarOpen: false
        }
    }

    toggleSwitch = event => {
        this.setState(prev => ({
            editMode: !prev.editMode
        }))
    }

    handleSelectChange = event => {
        this.setState({
            selectedDorm: event.target.value
        });
    }

    handleRatingChange = (key, newRating) => {
        let preference = Object.assign({}, this.state.preference);
        preference[key] = newRating;

        this.setState({preference})
    }

    handleSaveChange = () => {
        const { preference, selectedDorm } = this.state;
        const { username } = this.props.userdata;

        let changes = {}
        if (preference !== this.props.userdata.preference)
            changes['preference'] = preference;
        if (selectedDorm !== this.props.userdata.dormitory)
            changes['dormitory'] = selectedDorm;

        if (Object.getOwnPropertyNames(changes).length === 0) {
            this.setState({
                message: 'No Changes Made',
            })
        } else {
            axios.put('/api/user/modify', {
                username,
                preference,
                selectedDorm
            })
            .then(res => {
                let newUserdata = this.state.userdata;

                Object.keys(changes).map(key => {
                    newUserdata[key] = changes[key];
                    return null;
                })

                this.setState({
                    userdata: newUserdata,
                    message: res.data.message,
                    editMode: false
                })
            })
        }

        this.setState({
            snackbarOpen: true,
        })
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;

        this.setState({
            snackbarOpen: false
        })
    }

    render() {
        const { username, dormitory, name, preference } = this.state.userdata;
        const { classes } = this.props;
        const { editMode, selectedDorm, snackbarOpen, message } = this.state;

        const icons = {
            'taste': <TasteIcon />,
            'portion': <PortionIcon />,
            'price': <PriceIcon />
        }

        return (
            <React.Fragment>
                <Grid
                    container
                    alignItems="flex-start"
                    justify="flex-end"
                    direction="row"
                    className={classes.paper}
                >
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={editMode}
                                    onChange={this.toggleSwitch}
                                />
                            }
                            label={
                                <Typography variant="overline">
                                    Toggle Edit Mode
                                </Typography>
                            }
                            labelPlacement="start"
                        >
                        </FormControlLabel>
                    </FormGroup>
                </Grid>
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
                                <TableCell align="right">
                                    { editMode ? (
                                        <Select
                                            value={selectedDorm}
                                            onChange={this.handleSelectChange}
                                        >
                                            {Object.keys(dorms).map(key =>
                                                <MenuItem key={key} value={key}>{dorms[key]}</MenuItem>
                                            )}
                                        </Select>
                                    ) : dorms[dormitory]}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <Paper className={classes.paper} style={{paddingTop: 10, paddingBottom: 20}}>
                    <Typography
                        variant="h6"
                        align="center"
                    >
                        {(editMode ? 'Select ' : '') + 'Your Preferences'}
                    </Typography>
                    { editMode
                    ? (
                        <div style={{marginLeft: 'auto', marginRight: 'auto', width: 190}}>
                            {Object.keys(icons).map(key =>
                                <div className={classes.div} key={key}>
                                    <Typography variant="subtitle1" gutterBottom>
                                    {icons[key]}
                                    {key}
                                    </Typography>
                                    <Ratings
                                        rating={this.state.preference[key]}
                                        widgetDimensions="30px"
                                        widgetSpacings="5px"
                                        widgetRatedColors="rgb(255, 190, 6)"
                                        widgetHoverColors="rgb(255, 190, 6)"
                                        changeRating={newRating => this.handleRatingChange(key, newRating)}
                                    >
                                        {[0, 1, 2, 3, 4].map(e =>
                                            <Ratings.Widget key={e}/>
                                        )}
                                    </Ratings>
                                </div>
                            )}
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                style={{marginTop: 20}}
                                onClick={this.handleSaveChange}
                            >
                                Save Changes
                            </Button>
                        </div>

                    ) : <MenuStarRatings ratings={[preference]} />
                    }
                </Paper>
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
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProfileCard);
