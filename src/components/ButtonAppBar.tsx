import * as React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "./ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../app/store";
import {RequestStatusType} from "../app/app-reducer";


export default function ButtonAppBar() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <Box sx={{flexGrow: 1}}>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                { status === "loading" && <LinearProgress/> }
            </AppBar>
        </Box>
    );
}