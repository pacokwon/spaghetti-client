import React, { Component } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography
} from '@material-ui/core';
import Ratings from 'react-ratings-declarative'
import { withStyles } from '@material-ui/core/styles'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
    center: {
        maxWidth: 119,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    },
    paper: {
        width: 450
    },
    div: {
        marginBottom: 10,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
})

class MenuRateDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            ratings: {
                "taste": 0,
                "portion": 0,
                "price": 0
            }
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    changeRating = (key, newRating) => {
        let ratings = Object.assign({}, this.state.ratings);
        ratings[key] = newRating;

        this.setState({ratings})
    }

    sendRating = ratings => {
        this.handleClose();

        if (!ratings.taste && !ratings.portion && !ratings.price) return;

        this.props.onSend(ratings);
        this.setState({
            ratings: {
                "taste": 0,
                "portion": 0,
                "price": 0
            }
        })
    }

    render() {
        const { open, ratings } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.center}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClickOpen}
                >
                    Rate Menu!
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    classes={{paper: classes.paper}}
                >
                    <DialogTitle>{"Rate this Menu!"}</DialogTitle>
                    <DialogContent>
                        <div className={classes.div}>
                            <Typography variant="subtitle1" gutterBottom>
                                Taste
                            </Typography>
                            <Ratings
                                rating={ratings['taste']}
                                widgetDimensions="30px"
                                widgetSpacings="5px"
                                widgetRatedColors="rgb(255, 190, 6)"
                                widgetHoverColors="rgb(255, 190, 6)"
                                changeRating={newRating => this.changeRating('taste', newRating)}
                            >
                                {[0, 1, 2, 3, 4].map(e =>
                                    <Ratings.Widget key={e}/>
                                )}
                            </Ratings>
                        </div>
                        <div className={classes.div}>
                            <Typography variant="subtitle1" gutterBottom>
                                Portion
                            </Typography>
                            <Ratings
                                rating={ratings['portion']}
                                widgetDimensions="30px"
                                widgetSpacings="5px"
                                widgetRatedColors="rgb(255, 190, 6)"
                                widgetHoverColors="rgb(255, 190, 6)"
                                changeRating={newRating => this.changeRating('portion', newRating)}
                            >
                                {[0, 1, 2, 3, 4].map(e =>
                                    <Ratings.Widget key={e}/>
                                )}
                            </Ratings>
                        </div>

                        <div className={classes.div}>
                            <Typography variant="subtitle1" gutterBottom>
                                Price
                            </Typography>
                            <Ratings
                                rating={ratings['price']}
                                widgetDimensions="30px"
                                widgetSpacings="5px"
                                widgetRatedColors="rgb(255, 190, 6)"
                                widgetHoverColors="rgb(255, 190, 6)"
                                changeRating={newRating => this.changeRating('price', newRating)}
                            >
                                {[0, 1, 2, 3, 4].map(e =>
                                    <Ratings.Widget key={e}/>
                                )}
                            </Ratings>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.sendRating(ratings)} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(MenuRateDialog);
