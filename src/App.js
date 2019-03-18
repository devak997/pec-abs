import React, { Component } from 'react'
import {Header} from './components/Header/Header'
import { Route, Switch } from 'react-router-dom'
import CurrentSchedule from './components/CurrentSchedule/CurrentSchedule'
import ChangeSchedule from './components/ChangeSchedule/ChangeSchedule'
import LogDetails from './components/LogDetails/LogDetails'
import HolidayPage from './components/Holidays/HolidayPage'
import AddHoliday from './components/Holidays/AddHoliday'
import DeleteHoliday from './components/Holidays/DeleteHoliday' 
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {

  state = {
    mobileMenuClicked: false
  }

  handleMenuClick = () => {
    this.setState({mobileMenuClicked: !this.state.mobileMenuClicked});
  }

  render() {
    return(
      <div>
        <Header isMobileMenuActive =  {this.state.isMobileMenuActive} handleClick = {this.handleMenuClick}/>
        <Switch>
          <Route exact path='/' component={ChangeSchedule}/>
          <Route path='/currentSchedule' component={CurrentSchedule}/>
          <Route path='/logDetails' component={LogDetails}/>
          <Route path='/holidayPage' component={ HolidayPage}/>
          <Route path='/addHoliday' component={AddHoliday}/>
          <Route path='/deleteHoliday' component={DeleteHoliday}/>
        </Switch>
      </div>
    );
  }
}

export default App;