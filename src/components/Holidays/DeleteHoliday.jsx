import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './Description.css'
class DeleteHoliday extends Component {
    constructor(args) {
        super(args);
        this.state = {
            startDate: '',
            status:''
        }
        this.dateChange = this.dateChange.bind(this);
        this.ip = "raspberrypi.mshome.net:8000";
    }


    dateChange = (date) => {
        this.setState({ startDate: date }, () => {
            console.log(this.state.startDate);
        });
    }

    state = {
        date: ''
    }
    handleChange = (e) => {
        this.setState({ date: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        var day = this.state.startDate.getDate();
        var month = this.state.startDate.getMonth()+1;
        if(month<10){
            var date = day + '-0'+month;     
        }
        else{ date = day + '-'+month;}
        bodyFormData = new FormData();
        console.log(date);
        bodyFormData.append('date', date);
        axios({
            method: 'post',
            url: "http://"+this.ip+"/deleteHoliday",
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(res => {
            console.log(res.data.myStatus);
            
                if (res.status === 200) {
                this.setState({ status: res.data.myStatus })
            }

        })
    }
    render() {
        return (
            <div class=" container-fluid">
                <div className="des">
                    <h1 align="center">Delete Holiday</h1>

                    <p align="center"> Enter a date to remove from holiday list</p>
                </div>

                <div class="container container-fluid jumbotron">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="inputTime">Enter Date </label>
                            <br></br>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.dateChange} id="date"
                                autoComplete="off"
                            />
                            </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <p>{this.state.status}</p>
                </div >
            </div>
        );

    }
}

export default DeleteHoliday
