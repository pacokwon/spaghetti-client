import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon'
import { ReactComponent as Logo } from '../../assets/Symbol_white.svg'

const NavBar = ({ title }) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        {title}
                    </Typography>
                    <SvgIcon>
                        <img src={Logo} alt="" />
                    </SvgIcon>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;
