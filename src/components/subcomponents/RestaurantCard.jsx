import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
} from '@material-ui/core'
import PacoRatings from './PacoRatings.jsx'

const styles = theme => ({
    card: {
        marginTop: 20,
        [theme.breakpoints.up(1648)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginLeft: 10,
        marginRight: 10,
        height: 660
    },
    media: {
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    ratingsCenter: {
        maxWidth: 200,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

class RestaurantCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: true
        }
    }

    toChartData = ratings => {
        return ratings
        .reduce((acc, cur) => {
            acc[cur - 1] += 1;

            return acc;
        }, [0, 0, 0, 0, 0])
        .reduce((acc, cur, idx) => {
            acc.push({
                name: idx + 1,
                votes: cur
            })

            return acc;
        }, [])

    }

    handleToggle = () => {
        this.setState(prev => ({
            checked: !prev.checked
        }))
    }

    render() {
        const { name, ratings, classes, onCardClick } = this.props;

        const average = Math.round(ratings.reduce((acc, cur, idx) => {
            acc += cur;
            return idx === ratings.length - 1 ? acc / ratings.length : acc;
        }) * 10) / 10;

        return (
            <Card className={classes.card}>
                <CardHeader
                    title={name}
                    titleTypographyProps={{variant: 'subtitle1', align: 'center'}}
                />
                <CardMedia
                    title={name}
                    src={require('../../assets/' + name + '.jpeg')}
                    component="img"
                    className={classes.media}
                />
                <CardContent>
                    <PacoRatings starPoints={average} />
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={event => onCardClick(event, name)}
                        className={classes.button}
                    >
                        Explore
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(RestaurantCard)
