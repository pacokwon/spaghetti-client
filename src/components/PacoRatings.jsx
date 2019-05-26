import React from 'react';
import Ratings from 'react-ratings-declarative';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Typography } from '@material-ui/core'
import StarIcon from '@material-ui/icons/StarRate'
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
    ratingsCenter: {
        maxWidth: 200,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    icon: {
        color: 'rgb(255, 190, 6)',
    },
    badge: {
        top: '50%'
    }
})

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '20%',
    // The border color match the background color.
    border: `2px solid white`,
  },
}))(Badge);


function PacoRatings(props) {
    const { classes, starPoints } = props;

    return (
        <div className={classes.ratingsCenter}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                >
                    Restaurant Rating
                </Typography>
                <StyledBadge
                    badgeContent={starPoints}
                    color="primary"
                >
                    <StarIcon
                        className={classes.icon}
                        fontSize='large'
                    />
                </StyledBadge>
            </div>
            <Ratings
                rating={starPoints}
                widgetDimensions="30px"
                widgetSpacings="5px"
                widgetRatedColors="rgb(255, 190, 6)"
            >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
            </Ratings>
        </div>
    )
}

export default withStyles(styles)(PacoRatings);
