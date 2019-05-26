import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Typography
} from '@material-ui/core'
import PacoRatings from './PacoRatings.jsx'

const styles = theme => ({
    card: {
        marginTop: 20,
        [theme.breakpoints.up(1600 + theme.spacing.unit * 3 * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginLeft: 10,
        marginRight: 10,
        height: '100%'
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
    button: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

class RestaurantCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, ratings, classes, onCardClick } = this.props;

        const average = ratings.reduce((acc, cur, idx) => {
            acc += cur;
            return idx === ratings.length - 1 ? acc / ratings.length : acc;
        })

        return (
            <Card className={classes.card}>
                <CardHeader
                    title={name}
                    titleTypographyProps={{variant: 'title', align: 'center'}}
                />
                <CardMedia
                    title={name}
                    src={require('../resources/' + name + '.jpeg')}
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
                        className={classes.button}
                        onClick={(event) => onCardClick(event, name)}
                    >
                        Explore
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default withStyles(styles)(RestaurantCard)
