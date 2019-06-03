import React, { Component } from 'react';
import NavBar from './subcomponents/NavBar.jsx';
import { Button, CssBaseline, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Link, Paper, Typography} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import AuthHelperMethods from '../helpers/AuthHelperMethods.js';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(5),
    },
    main: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(848)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    gridItem: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    register: {
        marginLeft: 20
    }
})

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const Auth = new AuthHelperMethods();
        const { username, password } = this.state;
        Auth.login(username, password)
        .then(res => {
            const { success } = res.data;

            if (success) {
                this.props.history.push('/dashboard')
            } else {
                this.setState({ loginFailed: true });
            }
        })
    }

    handleClickShowPassword = () => {
        this.setState(prev => ({
            visible: !prev.visible
        }))
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <NavBar title="Spaghetti-Login" />
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography
                            variant="h4"
                            color="inherit"
                            align="center"
                            gutterBottom
                        >
                            Login
                        </Typography>
                        <form>
                            <Grid container>
                                <Grid item xs={12} sm={12} className={classes.gridItem}>
                                    <FormControl fullWidth required>
                                        <InputLabel
                                            htmlFor="username"
                                        >
                                            Username
                                        </InputLabel>
                                        <Input
                                            id="username"
                                            value={this.state.username}
                                            onChange={this.handleChange('username')}
                                            autoFocus
                                            />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} className={classes.gridItem}>
                                    <FormControl fullWidth required>
                                        <InputLabel
                                            htmlFor="password"
                                            >
                                            Password
                                        </InputLabel>
                                        <Input
                                            id="password"
                                            type={this.state.visible ? "text" : "password"}
                                            value={this.state.password}
                                            onChange={this.handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={() => this.handleClickShowPassword('password')}
                                                    >
                                                        {this.state.visible ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                {this.state.loginFailed
                                    ?
                                    <Grid item sm={12}>
                                        <Typography
                                            variant="overline"
                                            align="center"
                                            color="error"
                                        >
                                            아이디 또는 비밀번호를 다시 확인하세요. 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.
                                        </Typography>
                                    </Grid>
                                    :
                                    null
                                }
                                <Grid item sm={6} xs={12} className={classes.gridItem}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSubmit}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item sm={6} xs={12} className={classes.gridItem}>
                                    <Typography
                                        variant="body1"
                                        align="center"
                                        className={classes.register}
                                    >
                                        Don't have an account? <br />
                                        <Link href='/register' color='primary'>
                                            Register here
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Login)
