import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
    Badge,
    Button,
    Card,
    Grow,
    Grid,
    Typography
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/StarRate'

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '20%',
    // The border color match the background color.
    border: `2px solid white`,
  },
}))(Badge);

const styles = theme => ({
    img: {
        width: 150,
        height: 150,
        margin: 10
    },
    container: {
        marginTop: 30
    },
    icon: {
        color: 'rgb(255, 190, 6)',
    },
    ratingBlock: {
        display: 'flex',
        width: '50%',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'space-between'
    },
    contentBlock: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})

class Recommended extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rcmArr: null
        }
    }

    componentDidMount() {
        axios('/api/rating/recommended', {
            method: 'GET',
            params: this.props.userData.preference
        })
        .then(res => {
            this.setState({
                rcmArr: res.data
            })
        })
    }

    render() {
        const { classes, onButtonClick } = this.props;
        const { rcmArr } = this.state;

        if (rcmArr) {
            return (
                <Grow in={rcmArr !== null}>
                    <Grid
                        container
                        spacing={2}
                        className={classes.container}
                    >
                        {rcmArr.map(elem =>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                key={elem.menu}
                            >
                                <Card>
                                    <div style={{display: 'flex'}}>
                                        <img
                                            src={require('../assets/' + elem.name + '.jpeg')}
                                            alt={elem.name}
                                            className={classes.img}
                                        />
                                        <div className={classes.contentBlock}>
                                            <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                                <Typography
                                                    align="right"
                                                    variant="body1"
                                                    display='inline'
                                                    >
                                                    {elem.menu}
                                                </Typography>
                                                <Typography
                                                    align="left"
                                                    variant="caption"
                                                    display='inline'
                                                    color='textSecondary'
                                                >
                                                    {elem.name}
                                                </Typography>
                                            </div>
                                            {Object.keys(elem.rating).map(category =>
                                                <div className={classes.ratingBlock} key={category}>
                                                    <Typography
                                                        variant="overline"
                                                    >
                                                        {category}
                                                    </Typography>
                                                    <StyledBadge
                                                        badgeContent={Math.round(elem.rating[category] * 10) / 10}
                                                        color="primary"
                                                    >
                                                        <StarIcon
                                                            className={classes.icon}
                                                            fontSize="default"
                                                        />
                                                    </StyledBadge>
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            style={{display: 'flex', alignItems: 'center', paddingRight: 10}}
                                        >
                                            <Button
                                                color="primary"
                                                size="small"
                                                variant="outlined"
                                                onClick={event => onButtonClick(event, elem.name, elem.menu)}
                                            >
                                                Explore
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Grow>
            )
        } else {
            return null;
        }
    }
}

export default withStyles(styles)(Recommended);
