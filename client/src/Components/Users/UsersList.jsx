import { AppBar, Box, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Users.css';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


function UsersList(props) {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let [usersList, setUsersList] = useState(null);
    let [searched, setSearched] = useState(props.searched);

    let searchInput = React.createRef();
    useEffect(async () => {
        let req = await axios.get('http://localhost:8001/friends/' + props.author)
        setUsersList(req.data)
    }, [])

    useEffect(() => {
        if (searched.requestNumber < props.searched.requestNumber || props.searched.requestNumber === 0)
            setSearched(props.searched)
    }, [props.searched])
    let makeInvite = async (partner) => {
        await axios.post('http://localhost:8001/make_invite', {
            initiator: props.author,
            partner,
        })
    }
    let stopWait=async(inviteId,answer)=>{
        await axios.put('http://localhost:8001/frendship/'+ inviteId, {
            waiting: answer,
        })
    }
    return <div style={{ height: '100vh' }}>
        <form action="#" className='searching-form'>
            <h3>Найти и отправить инвайт</h3>
            <input className="text-search" type="text" value={props.newSearchText}
                onChange={() => { props.searchThunk(searchInput.current.value, props.requestNumber,props.author) }}
                ref={searchInput}
                name="s"
                placeholder="Искать здесь..." />
            {
                props.newSearchText !== ''
                    ? <NavLink to={"/search/" + props.newSearchText} onClick={() => {
                        props.CloseListThunk()
                        props.SearchChange('')
                    }}>
                        <input type="submit" className="submit-search" value="" />
                    </NavLink>
                    : <input type="submit" disabled='true' className="submit-search" value="" />
            }
            {props.isListLoading ? <div className='preloader'>
                <Preloader />
            </div>
                :
                <ul className="collection">
                    {
                        (props.isClosed && !searched.request) ? null :
                            searched.request.map((item) => {

                                return <li className="collection-item"
                                    onClick={() => {
                                        makeInvite(item._id)
                                        props.SearchChange('')
                                        props.CloseListThunk()
                                    }}>
                                    {/* <NavLink to={`/post/${item.title}`} */}
                                        {/* //className="collection-item" */}
                                       {/* > */}
                                    {item.name}
                                    {/* </NavLink> */}
                                </li>
                            })
                    }
                    {
                        (!searched.request || searched.request.length === 0) ? null :
                            <li className="collection-item">
                                <NavLink to={"/search/" + props.newSearchText} onClick={() => {
                                    props.CloseListThunk()
                                    props.SearchChange('')
                                }}>
                                    Все результаты
              </NavLink>
                            </li>
                    }
                </ul>
            }
        </form>
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Контакты" {...a11yProps(0)} />
                    <Tab label="Приглошения" {...a11yProps(1)} />
                    <Tab label="Ожидания" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {
                    !usersList
                        ? <Preloader />
                        : usersList.friends.map(item => {
                            if (item.initiator._id === props.author) {
                                return <div>
                                    {item.partner.name}
                                </div>
                            }
                            if (item.partner._id === props.author) {
                                return <div>
                                    {item.initiator.name}
                                </div>
                            }
                        })
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    !usersList
                        ? <Preloader />
                        : usersList.invites.map(item =>
                            <div>
                                <div>
                                {item.initiator.name}
                                </div>
                                <button onClick={()=>{stopWait(item._id,false)}}>Принять</button>
                                <button 
                                // onClick={()=>{stopWait(item._id,false)}}
                                >Пошел нахуй</button>
                            </div>
                        )
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
            {
                    !usersList
                        ? <Preloader />
                        : usersList.waitings.map(item =>
                            <div>
                                {item.partner.name}
                            </div>
                        )
                }
      </TabPanel>
        </div>
    </div>
}

export default UsersList