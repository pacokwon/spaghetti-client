import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    CssBaseline,
    Drawer,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Toolbar,
    Tooltip,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home'
import WhatShotIcon from '@material-ui/icons/Whatshot'
import LocalDiningIcon from '@material-ui/icons/LocalDining.js'
import AccountCircle from '@material-ui/icons/AccountCircle';
import AuthHelperMethods from '../helpers/AuthHelperMethods'
import ProfileCard from './ProfileCard.jsx'
import NearbyRestaurants from './NearbyRestaurants.jsx'
import Explorer from './Explorer.jsx'
import SingleRestaurant from './SingleRestaurant.jsx'
import classNames from 'classnames';

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        paddingRight: 24
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        padding: 0
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        width: theme.spacing.unit * 8 + 1,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    icon: {
        fontSize: 32
    },
    rightSide: {
        marginLeft: 'auto',
        marginRight: 12,
    },
    title: {
        display: 'inline-block',
        textAlign: 'center'
    },
    content: {
        padding: theme.spacing.unit * 3,
        marginLeft: 65
    },
    svgGrey: {
        fill: '#ddd'
    },
    svgWhite: {
        fill: '#fff'
    }
})

class Dashboard extends Component {
    state = {
        open: false,
        anchorElement: null,
    }

    componentDidMount() {
        const Auth = new AuthHelperMethods();

        if (!Auth.loggedIn()) {
            console.log('Not Logged In');
            this.props.history.replace('/login');
        } else {
            try {
                Auth.getConfirm()

                Auth.getUserData()
                .then(res => {
                    this.setState({
                        userData: res,
                        contentElement: <NearbyRestaurants userdata={res} onCardClick={this.handleCardClick}/>,
                        title: 'Welcome, ' + res.username
                    })
                })
            } catch (e) {
                Auth.logout();
                this.props.history.replace('/login');
            }

        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    }

    handleDrawerClose = () => {
        this.setState({ open: false });
    }

    handleMenuOpen = event => {
        this.setState({ anchorElement: event.currentTarget });
    }

    handleMenuClose = () => {
        this.setState({ anchorElement: null });
    }

    handleCardClick = (event, name) => {
        this.setState(prevState => ({
            title: '',
            contentElement: <SingleRestaurant name={name}/>
        }))
    }

    handleHomeOpen = event => {
        this.setState(prevState => ({
            title: 'Welcome, ' + prevState.userData.username,
            contentElement: <NearbyRestaurants userdata={prevState.userData} onCardClick={this.handleCardClick} />
        }))
    }

    handleHomeClose = () => {

    }

    handleExplorerOpen = () => {
        this.setState(prevState => ({
            title: '',
            contentElement: <Explorer onCardClick={this.handleCardClick} />
        }))
    }

    handleProfileClick = () => {
        this.setState(prevState => ({
            title: 'Your Profile',
            contentElement: <ProfileCard userdata={prevState.userData} />
        }))
        this.handleMenuClose();
    }

    handleLogoutClick = () => {
        this.props.history.push('/login')
    }

    render() {
        const { classes } = this.props;
        // userData --> object. has the keys: dormitory, name, username
        const { anchorElement, title, userData } = this.state;

        const renderMenu = (
            <Menu
                anchorEl={anchorElement}
                open={Boolean(anchorElement)}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleProfileClick}>Your Profile</MenuItem>
                <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>

            </Menu>
        );

        if (userData) {
            return (
                <div>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.open,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, {
                                    [classes.hide]: this.state.open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h5"
                                color="inherit"
                                className={classes.title}
                            >
                                Hello
                            </Typography>
                            <span className={classes.rightSide}>
                                <Typography
                                    color="inherit"
                                    variant="subheading"
                                    className={classes.title}
                                >
                                    {userData.username}
                                </Typography>
                                <IconButton
                                    className={classes.icon}
                                    onClick={this.handleMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </span>
                        </Toolbar>
                    </AppBar>
                    {renderMenu}
                    <Drawer
                        variant="permanent"
                        className={classNames(classes.drawer, {
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open
                        })}
                        classes={{
                            paper: classNames({
                                [classes.drawerOpen]: this.state.open,
                                [classes.drawerClose]: !this.state.open,
                            }),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <Tooltip title='Home'>
                                <ListItem
                                    button
                                    key='home'
                                    onClick={this.handleHomeOpen}
                                >
                                    <ListItemIcon>
                                        <HomeIcon
                                            className={classes.icon}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary='Home' />
                                </ListItem>
                            </Tooltip>
                            <Tooltip title='Recommended'>
                                <ListItem
                                    button
                                    key='whatshot'
                                >
                                    <ListItemIcon>
                                        <WhatShotIcon className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary='Recommended' />
                                </ListItem>
                            </Tooltip>
                            <Tooltip title='Explore'>
                                <ListItem
                                    button
                                    key='local_dining'
                                    onClick={this.handleExplorerOpen}
                                >
                                    <ListItemIcon>
                                        <LocalDiningIcon
                                            className={classes.icon}
                                        />
                                    </ListItemIcon>
                                <ListItemText primary='Explore' />
                                </ListItem>
                            </Tooltip>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Typography variant="h5">
                            {title}
                        </Typography>
                        {this.state.contentElement
                        ? this.state.contentElement
                        : null
                        }
                    </main>

                </div>
            );
        } else {
            return (
                null
            );
        }
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard)
