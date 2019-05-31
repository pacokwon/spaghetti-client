import React, { Component, Fragment } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography
} from '@material-ui/core';
import PortionIcon from '@material-ui/icons/PregnantWoman';
import PriceIcon from '@material-ui/icons/AttachMoney';
import TasteIcon from '@material-ui/icons/RoomService';
import Ratings from 'react-ratings-declarative'
import { withStyles } from '@material-ui/core/styles'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
    paper: {
        width: 450
    },
    div: {
        marginBottom: 10,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: {
        paddingBottom: 0
    }
})

class PreferenceDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            preference: {
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
        let preference = Object.assign({}, this.state.preference);
        preference[key] = newRating;

        this.setState({preference})
    }

    sendRating = (event, preference) => {
        this.handleClose();

        if (!(preference.taste || preference.portion || preference.price)) {
            preference.taste = preference.portion = preference.price = 1;
        }

        this.props.onSend(event, preference);
    }

    render() {
        const { open, preference } = this.state;
        const { classes } = this.props;
        const icons = {
            'taste': <TasteIcon />,
            'portion': <PortionIcon />,
            'price': <PriceIcon />
        }

        return (
            <Fragment>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleClickOpen}
                    fullWidth
                >
                    Next
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    classes={{paper: classes.paper}}
                >
                    <DialogTitle
                        disableTypography={true}
                        className={classes.title}
                    >
                        <Typography variant="overline">
                            There's one more thing...
                        </Typography>
                        <Typography variant="h6">
                            Select your preference
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        {
                            Object.keys(icons).map(key =>
                                <div className={classes.div} key={key}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {icons[key]}
                                        {key[0].toUpperCase() + key.slice(1)}
                                    </Typography>
                                    <Ratings
                                        rating={preference[key]}
                                        widgetDimensions="30px"
                                        widgetSpacings="5px"
                                        widgetRatedColors="rgb(255, 190, 6)"
                                        widgetHoverColors="rgb(255, 190, 6)"
                                        changeRating={newRating => this.changeRating(key, newRating)}
                                    >
                                        {[0, 1, 2, 3, 4].map(e =>
                                            <Ratings.Widget key={e}/>
                                        )}
                                    </Ratings>
                                </div>
                            )
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20, width: '60%'}}
                            fullWidth
                            onClick={event => this.sendRating(event, preference)}
                            color="primary"
                            variant="contained"
                        >
                            Submit!
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default withStyles(styles)(PreferenceDialog);
