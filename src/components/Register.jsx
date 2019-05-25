import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import { dorms } from './store.js'
import { Button, CssBaseline, FormControl, Grid, FormHelperText, IconButton, Input, InputAdornment, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 3,
        paddingLeft: theme.spacing.unit * 12,
        paddingRight: theme.spacing.unit * 12,
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 5,
    },
    main: {
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
})

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            dormitory: '',
            password: '',
            confirm: '',
            visibleInfo: [
                {
                    id: 'password',
                    visible: false
                },
                {
                    id: 'confirm',
                    visible: false
                }
            ],
            error: {},
            registerSuccessful: true
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleUsernameKeyup = event => {
        axios('/api/user/check', {
            method: 'GET',
            params: { username: event.target.value }
        })
        .then(res => {
            const { exists } = res.data;

            this.setState({nameOverlap: exists});
        })
    }

    handleConfirmBlur = event => {
        const { password, confirm } = this.state;

        this.setState(prev => ({
            error: {
                ...prev.error,
                confirm: (password !== confirm)
            }
        }))
    }

    handleSelectChange = event => {
        this.setState({ dormitory: event.target.value });
    }

    handleClickShowPassword = name => {
        this.setState(prevState => ({
            visibleInfo: prevState.visibleInfo.map(
                obj => (obj.id === name ? Object.assign(obj, {visible: !obj.visible}) : obj)
            )
        }))
    }

    handleSubmit = event => {
        event.preventDefault();

        const { firstName, lastName, username, password, confirm, dormitory, nameOverlap } = this.state;
        if (!firstName) {
            this.setState((prev) => ({
                error: {
                    ...prev.error,
                    firstName: true
                }
            }))
        }
        if (!lastName) {
            this.setState((prev) => ({
                error: {
                    ...prev.error,
                    lastName: true
                }
            }))
        }
        if (!username) {
            this.setState((prev) => ({
                error: {
                    ...prev.error,
                    username: true
                }
            }))
        }
        if (!password) {
            this.setState((prev) => ({
                error: {
                    ...prev.error,
                    password: true
                }
            }))
        }
        if (!confirm) {
            this.setState((prev) => ({
                error: {
                    ...prev.error,
                    confirm: true
                }
            }))
        }
        if (!dormitory) {
            this.setState((prev) => ({
                error: {
                    ...prev.error,
                    dormitory: true
                }
            }))
        }
        if (password) console.log(password);

        if (!(firstName && lastName && username && password && confirm && dormitory)) return;

        console.log('here');
        if (password !== confirm || nameOverlap) return;

        axios('/api/user/register', {
            method: 'POST',
            data: {
                name: firstName + lastName,
                username,
                password,
                dormitory
            }
        })
        .then(res => {
            if (res.data.success) {
                this.props.history.push('/login')
            } else {
                this.setState({registerSuccessful: false});
            }
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <NavBar title="Register"/>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography
                            variant="h4"
                            color="inherit"
                            align="center"
                            gutterBottom
                        >
                            Register
                        </Typography>
                        <form>
                            <Grid container spacing={24} className={classes.grid}>
                                <Grid item sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel
                                            htmlFor="firstName"
                                            error={this.state.error.firstName}
                                        >
                                            First name
                                        </InputLabel>
                                        <Input
                                            id="firstName"
                                            value={this.state.firstName}
                                            autoFocus
                                            onChange={this.handleChange('firstName')}
                                            error={this.state.error.firstName}
                                        />
                                    </FormControl>
                                    {this.state.error.firstName ? <FormHelperText error>Enter first name</FormHelperText> : null}
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel
                                            htmlFor="lastName"
                                            error={this.state.error.lastName}
                                        >
                                            Last name
                                        </InputLabel>
                                        <Input
                                            id="lastName"
                                            value={this.state.lastName}
                                            onChange={this.handleChange('lastName')}
                                            error={this.state.error.lastName}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel
                                            htmlFor="username"
                                            error={this.state.error.username || this.state.nameOverlap}
                                        >
                                            Username
                                        </InputLabel>
                                        <Input
                                            id="username"
                                            value={this.state.username}
                                            onChange={this.handleChange('username')}
                                            onKeyUp={this.handleUsernameKeyup}
                                            error={this.state.error.username || this.state.nameOverlap}
                                        />

                                        {this.state.nameOverlap
                                            ? <FormHelperText error>Username occupied</FormHelperText>
                                            : this.state.error.username
                                                ? <FormHelperText error>Enter username</FormHelperText>
                                                : null
                                        }
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            htmlFor="dormitory"
                                            error={this.state.error.dormitory}
                                        >
                                            Dormitory
                                        </InputLabel>
                                        <Select
                                            id="dormitory"
                                            value={this.state.dormitory}
                                            onChange={this.handleSelectChange}
                                            error={this.state.error.dormitory}
                                        >
                                            {Object.keys(dorms).map(key =>
                                                <MenuItem key={key} value={key}>{dorms[key]}</MenuItem>
                                            )}
                                        </Select>
                                        {this.state.error.dormitory ? <FormHelperText error>Choose dormitory</FormHelperText> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel
                                            htmlFor="password"
                                            error={this.state.error.password}
                                        >
                                            Password
                                        </InputLabel>
                                        <Input
                                            id="password"
                                            type={this.state.visibleInfo[0].visible ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={this.handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={() => this.handleClickShowPassword('password')}
                                                    >
                                                        {this.state.visibleInfo[0].visible ? <Visibility /> : <VisibilityOff /> }
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            error={this.state.error.password}
                                        />
                                        {this.state.error.password ? <FormHelperText error>Enter password</FormHelperText> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel
                                            htmlFor="confirm"
                                            error={this.state.error.confirm}
                                        >
                                            Confirm Password
                                        </InputLabel>
                                        <Input
                                            id="confirm"
                                            type={this.state.visibleInfo[1].visible ? 'text' : 'password'}
                                            value={this.state.confirm}
                                            onChange={this.handleChange('confirm')}
                                            onBlur={this.handleConfirmBlur}
                                            error={this.state.error.confirm}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={() => this.handleClickShowPassword('confirm')}
                                                    >
                                                        {this.state.visibleInfo[1].visible ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {this.state.error.confirm ? <FormHelperText error>Passwords do not match!</FormHelperText> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item sm={12} >
                                    {this.state.registerSuccessful ? null : <FormHelperText error>Something is wrong</FormHelperText>}
                                </Grid>
                                <Grid item sm={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSubmit}
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Register);
