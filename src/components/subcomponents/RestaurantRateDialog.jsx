import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide
} from '@material-ui/core';
import Ratings from 'react-ratings-declarative'
import { withStyles } from '@material-ui/core/styles'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
    center: {
        maxWidth: 169,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20
    }
})

function RestaurantRateDialog(props) {
    const { classes, onSend } = props;
    const [open, setOpen] = React.useState(false);
    const [newRating, setRating] = React.useState(0);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setRating(0);
        setOpen(false);
    }

    function changeRating(newRating) {
        setRating(newRating);
    }

    function sendRating(newRating) {
        handleClose()
        onSend(newRating)
    }

    return (
        <div className={classes.center}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Rate Restaurant!
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{"Rate this Restaurant!"}</DialogTitle>
                <DialogContent>
                    <Ratings
                        rating={newRating}
                        widgetDimensions="30px"
                        widgetSpacings="5px"
                        widgetRatedColors="rgb(255, 190, 6)"
                        widgetHoverColors="rgb(255, 190, 6)"
                        changeRating={changeRating}
                    >
                        {[0, 1, 2, 3, 4].map(e =>
                            <Ratings.Widget key={e}/>
                        )}
                    </Ratings>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => sendRating(newRating)} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(RestaurantRateDialog);
