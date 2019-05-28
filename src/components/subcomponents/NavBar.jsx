import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography'

const NavBar = ({ title }) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        {title}
                    </Typography>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 20 100 216" style={{height: 'auto'}}>
                        <polygon points="0 149.46 34.08 81.99 0 27.52 0 149.46" styles={{fill: "#ddd"}}/>
                        <polygon points="15.47 216 100 138.25 45.96 161.54 15.47 216" styles={{fill: "#fff"}}/>
                        <polygon points="82.01 0 0.71 157.3 53.62 130.48 99.38 75.13 82.01 0" styles={{fill: "#fff"}}/>
                        <polygon points="53.62 130.48 0.71 157.3 45.96 161.54 100 138.25 53.62 130.48" styles={{fill: "#ddd"}}/>
                    </svg>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
