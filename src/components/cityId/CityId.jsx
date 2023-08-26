import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../navbar/Navbar';
import { Avatar, ListItemText, Card, CardActionArea, CardContent, CardMedia, Container, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import axios from 'axios';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PeopleIcon from '@mui/icons-material/People';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import '../../App.css'
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
const Api_Key = "69fe9ee88b91a1d65fbabb566739a3dc"

const CityId = () => {
  const { dataId } = useSelector(state => state.dataId)

  const getApi = async () => {
    try {
      const res = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${dataId[0].name}&appid=${Api_Key}`)
      console.log(res, "adads");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getApi()
  }, [])
  const borders = dataId[0]?.borders?.map((b) => b)

  return (
    <>
      <Navbar city={dataId[0].name} />
      <Container fixed sx={{ mt: "90px" }}>
        <Card sx={{ maxWidth: "100%", background: "rgb(62,62,62)" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="500"
              width="500"
              image={dataId[0].flags.png}
              alt="green iguana"
              sx={{ mt: '20px' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                {dataId[0].name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
      <Container>
        <Card sx={{ width: "100%", display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", background: "rgb(62,62,62)" }}>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationCityIcon className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Capital" secondary={dataId[0].capital} />
            </ListItem>
          </List>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WifiCalling3Icon className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Calling code" secondary={dataId[0].callingCodes} />
            </ListItem>
          </List>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SpellcheckIcon className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Spellings" secondary={dataId[0]?.altSpellings?.map((s) => {
                return (
                  <span style={{ paddingLeft: "10px" }}>{s}</span>
                )
              })} />
            </ListItem>
          </List>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SouthAmericaIcon className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Region" secondary={dataId[0].region} />
            </ListItem>
          </List>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SouthAmericaIcon className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Subregion" secondary={dataId[0].subregion} />
            </ListItem>
          </List>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PeopleIcon className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Population" secondary={dataId[0].population} />
            </ListItem>
          </List>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FontAwesomeIcon icon={faChartArea} className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Area" secondary={dataId[0].area} />
            </ListItem>
          </List>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccessTimeIcon className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Time-zona" secondary={dataId[0].timezones} />
            </ListItem>
          </List>
          <List className='List'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DomainDisabledIcon className='icons' />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Borders" secondary={dataId[0]?.borders?.map((b) => {
                return (
                  <span style={{ paddingLeft: "10px" }}>{b}</span>
                )
              })} />
            </ListItem>
          </List>
        </Card>
      </Container>
    </>
  )
}

export default CityId