import { Data } from '../../api/Data'
import { Avatar, Card, CardActions, CardContent, CardMedia, Container, List, ListItem, ListItemAvatar, ListItemText, Pagination, Typography } from '@mui/material';
import { Button } from '@mui/base';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataIdSucc } from '../../store/dataIdSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHigh, faTemperatureLow, faThermometerFull } from '@fortawesome/free-solid-svg-icons';
const Api_Key = "dc4c5c29e96a3a8ccdf2f99665ff930d"

const City = () => {
    const [id, setId] = useState()

    let [page, setPage] = useState(0)
    let [count, setCount] = useState(0)

    let [page2, setPage2] = useState(12)
    let [nameCity, setNameCity] = useState([])
    const [url, setUrl] = useState("https://api.openweathermap.org/data/2.5/weather?q")
    const { data } = useSelector((state) => state.data)
    const { weatherDat } = useSelector((state) => state.data)
    const dispatch = useDispatch()

    const getApi = useCallback(async () => {
        try {
            for (let i = 0; i < data.length; i++) {
                const res = await axios.get(`${url}=${data[i].wName}&appid=${Api_Key}`)
                setNameCity([...nameCity, nameCity.push(res.data)])
            }
            if (nameCity.length == data.length) {
                let i = +1
                const res = await axios.get(`${url}=${data[i].wName}&appid=${Api_Key}`)
                setNameCity([...nameCity, nameCity.push(res.data)])
            }
        }
        catch (error) {

        }
    }, [url]
    )

    const getApiSearch = useCallback(async () => {
        try {
            const res = await axios.get(`${url}=${data[0].wName}&appid=${Api_Key}`)
            setNameCity(nameCity.push(res.data))
        } catch (error) {

        }
    }, [url]
    )

    useEffect(() => {
        if (data.length > 1) {
            getApi()
        }
        else {
            getApiSearch()
        }
    }, [getApi, getApiSearch])

    const datas = Data

    let num = (datas.length / 12)

    const handleChange = (e, p) => {
        setPage(p * 12 - 12)
        setPage2(p * 12)
    }

    const handleId = (id) => {
        setId(id)
        const ids = datas.filter((i) => i.numericCode === id)
        dispatch(dataIdSucc(ids))
    }

    return (
        <>
            <Container fixed sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '40px', mt: "100px", background: " rgb(182, 182, 182);" }}>
                {data.length > 0 ?
                    <>
                        {
                            data.slice(page, page2).map((d) => {
                                return (
                                    <Card sx={{ maxWidth: 345, background: "rgb(62,62,62)" }} key={d.numericCode}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={d.flags.png}
                                            title="green iguana"
                                        />
                                        <CardContent sx={{ background: "rgb(62,62,62)" }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {d.name}
                                            </Typography>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(62,62,62)' }}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <SouthAmericaIcon style={{ color: "#000000" }} />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Region" secondary={d.region} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <ApartmentIcon style={{ color: "#000000" }} />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Capital" secondary={d.capital} />
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                        <CardContent>
                                            {nameCity.length > 1 ?
                                                <>
                                                    {nameCity.map((e) => {
                                                        return (
                                                            <div key={e.name}>
                                                                {
                                                                    e.name == d.wName &&
                                                                    <>
                                                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'rgb(62,62,62)' }}>
                                                                            <ListItem>
                                                                                <ListItemAvatar>
                                                                                    <Avatar>
                                                                                        <FontAwesomeIcon icon={faThermometerFull} style={{ color: "#000000" }} />
                                                                                    </Avatar>
                                                                                </ListItemAvatar>
                                                                                <ListItemText primary="Temp" secondary={e.main?.temp} />
                                                                            </ListItem>
                                                                            <ListItem>
                                                                                <ListItemAvatar>
                                                                                    <Avatar>
                                                                                        <FontAwesomeIcon icon={faTemperatureHigh} style={{ color: "#000000" }} />
                                                                                    </Avatar>
                                                                                </ListItemAvatar>
                                                                                <ListItemText primary="Temp-Max" secondary={e.main?.temp_max} />
                                                                            </ListItem>
                                                                            <ListItem>
                                                                                <ListItemAvatar>
                                                                                    <Avatar>
                                                                                        <FontAwesomeIcon icon={faTemperatureLow} style={{ color: "#000000" }} />
                                                                                    </Avatar>
                                                                                </ListItemAvatar>
                                                                                <ListItemText primary="Temp-Min" secondary={e.main?.temp_min} />
                                                                            </ListItem>
                                                                        </List>
                                                                    </>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                                :
                                                ""
                                            }
                                        </CardContent>
                                        <CardActions>
                                            <Link to='/city'>
                                                <Button size="small" onClick={() => handleId(d.numericCode)} style={{ background: "rgb(210,210,210)", border: "none" }}>Learn More</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                )
                            })
                        }
                    </>
                    :
                    <>
                        <Card sx={{ maxWidth: 345 }} key={data.numericCode}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={data.flags.png}
                                title="green iguana"
                            />
                            <CardContent>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <DeviceThermostatIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <WorkIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Work" secondary="Jan 7, 2014" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <BeachAccessIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardContent>

                                <>
                                    <Typography>
                                        Temp: {nameCity.main?.temp}
                                    </Typography>
                                    <Typography>
                                        Temp-Max: {nameCity.main?.temp_max}
                                    </Typography>
                                    <Typography>
                                        Temp-Min: {nameCity.main?.temp_min}
                                    </Typography>
                                    <Typography>
                                        Weather:
                                        <ul>
                                            <li>description: {nameCity.description}</li>
                                        </ul>
                                        <ul>
                                            Wind
                                            <li>deg: {nameCity.wind.deg}</li>
                                            <li>gust: {nameCity.wind.gust}</li>
                                            <li>speed: {nameCity.wind.speed}</li>
                                        </ul>
                                    </Typography>
                                </>

                            </CardContent>
                            <CardActions>
                                <Link to='/city'>
                                    <Button size="small" onClick={() => handleId(data.numericCode)}>Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </>

                }

            </Container>
            {
                data.length > 1 &&
                <Container sx={{ width: '100%', display: 'flex', justifyContent: 'right', mt: '30px' }}>
                    <Pagination count={num.toFixed()} color="primary" onChange={handleChange} />
                </Container>
            }
        </>
    )
}

export default City