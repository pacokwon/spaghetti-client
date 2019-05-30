import React, { Component, Fragment } from 'react';
import {
    Breadcrumbs,
    Link,
} from '@material-ui/core'
import PortionIcon from '@material-ui/icons/PregnantWoman';
import PriceIcon from '@material-ui/icons/AttachMoney';
import TasteIcon from '@material-ui/icons/RoomService';
import { withStyles } from '@material-ui/core/styles'
import PacoRatings from './PacoRatings.jsx';

const styles = theme => ({
    card: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 280,
        marginTop: 20
    }
})

class MenuStarRatings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'Taste'
        }
    }

    handleClick = (event, category) => {
        event.preventDefault();

        this.setState({ selected: category })
    }

    render() {
        const { classes, ratings } = this.props;
        const { selected } = this.state;

        const avgObj = ratings.reduce((acc, cur, idx) => {
            acc['Taste'] += cur['taste'];
            acc['Portion'] += cur['portion'];
            acc['Price'] += cur['price'];

            if (idx === ratings.length - 1) {
                Object.keys(acc).map(key => {
                    acc[key] = Math.round((acc[key] / ratings.length) * 10) / 10;

                    return null;
                })
            }

            return acc;
        }, {
            'Taste': 0,
            'Portion': 0,
            'Price': 0
        });

        const icons = {
            'Taste': <TasteIcon />,
            'Portion': <PortionIcon />,
            'Price': <PriceIcon />
        }

        return (
            <Fragment>
                <div className={classes.card}>
                    <Breadcrumbs >
                        {Object.keys(avgObj).map(key =>
                            <Link
                                href='/'
                                color={selected === key ? 'inherit' : 'inherit'}
                                onClick={event => this.handleClick(event, key)}
                                key={key}
                            >
                                {
                                    <Fragment>
                                        {icons[key]}
                                        {key}
                                    </Fragment>
                                }
                            </Link>
                        )}
                    </Breadcrumbs>
                </div>
                {
                    Object.keys(avgObj).map(key =>
                        selected === key
                        ?
                            <PacoRatings starPoints={avgObj[key]} title={key} key={key}/>
                        :
                            null
                    )
                }
            </Fragment>
        );
    }
}

export default withStyles(styles)(MenuStarRatings);
