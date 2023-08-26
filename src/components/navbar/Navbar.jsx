import { AppBar, Box, Button, InputBase, Slide, Toolbar, Typography, alpha, styled, useScrollTrigger } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Data } from '../../api/Data';
import { useDispatch } from 'react-redux';
import { dataSucc } from '../../store/dataSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const Navbar = (props) => {
    const data = Data

    let [search, setSearch] = useState("")
    let [newData, setNewData] = useState([])
    const dispatch = useDispatch()
    const handleSearch = (e) => {
        setSearch(e.target.value)
        data.filter((dat) => {
            if (dat.name === search) {
                setNewData(dat)
            }
        })
    }

    const handleData = () => {
        data.filter((f) => {
            if (f.name.toLowerCase().includes(search)) {
                dispatch(dataSucc([f]))
            }
        })
    }
    if (search.length == 0) {
        dispatch(dataSucc(data))
    }
    return (
        <>
            <Box>
                <AppBar>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            {props.city} Info
                        </Typography>
                        {props.search ?
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={(e) => handleSearch(e)}
                                    />
                                </Search>
                                <Button variant="contained" onClick={handleData}>Search</Button>
                            </div> : <></>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Navbar