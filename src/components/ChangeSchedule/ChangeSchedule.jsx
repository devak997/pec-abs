import React, { Component } from 'react';
import axios from 'axios'
import './ChangeSchedule.css'
import TimeField from 'react-simple-timefield';

class ChangeSchedule extends Component {
    constructor(args) {
        super(args);
        this.state = {
            time: '00:00',
            duration: '00:00',
            reason: '',
            status: ''
        }
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onDurationChange = this.onDurationChange.bind(this);
        this.ip = "raspberrypi.mshome.net";
    };

    onTimeChange(time) {
        time = time + ":00"
        this.setState({ time });
    }

    onDurationChange(duration) {
        this.setState({ duration });
    }

    handleChange = (e) => {
        var element = document.getElementById('inputReason').value;
        document.getElementById('duration').style.display = element === '2' ? 'block' : 'none';
        this.setState({ reason: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var hour = this.state.time.split(':');
        var min = this.state.duration.split(':')
        var d = new Date();
        console.log("HAHAHAHHAHAHA"+typeof(hour[0])+":"+typeof(toString(d.getHours())))
        if (hour[0] < d.getHours()) {
            this.setState({ status: 'Entered time is less than current time' })
        }
        else if (parseInt(hour[0]) === d.getHours() && (hour[1] <= d.getMinutes())) {
            console.log(d.getMinutes())
            this.setState({ status: 'Entered time is less than current time' })
        }
        else {
            if (this.state.reason === '1') {
                console.log(this.state.reason);
                var bodyFormData = new FormData();
                bodyFormData.append('time', this.state.time);
                bodyFormData.append('reason', this.state.reason);
                axios({
                    method: 'post',
                    url: 'http://' + this.ip + ':5000/handleEndBell',
                    data: bodyFormData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } }
                }).then(res => {
                    // console.log(res, typeof res);

                    if (res.status === 200) {
                        this.setState({ status: 'Data Sent to API successfully' })
                        this.setState({ status: res.data.myStatus })
                    }

                })
            }
            else if (this.state.reason === '2') {
                console.log(this.state.reason);
                 bodyFormData = new FormData();
                bodyFormData.append('time', this.state.time);
                
                if (min[0] === "00" && min[1] === "00") {
                    console.log("lan");
                    this.setState({ status: "Sorry!! Duration can not be zero." })
                }
                else {
                    var extraBell = parseInt(hour[1]) + parseInt(min[0]);
                    console.log("ex"+extraBell);
                    var newTime;
                    if (extraBell >= 60) {
                        if (extraBell - 60 < 10) { extraBell = "0" + (extraBell - 60); }
                        else { extraBell = extraBell - 60; }
                        if (hour[0] + 1 < 10) { hour[0] = "0" + hour[0] + 1; }
                        else { hour[0] = "0" + (hour[0]) }
                        newTime = (parseInt(hour[0]) + 1) + ":" + (extraBell) + ":"+min[1];
                        console.log(newTime);
                        bodyFormData.append('extraTime', newTime);
                    }
                    else if (extraBell < 60) {
                        console.log("<60");
                        if(extraBell<10){extraBell = "0"+extraBell}
                        newTime = hour[0] + ":" + extraBell +":"+ min[1];
                        console.log(newTime);
                        bodyFormData.append('extraTime', newTime);
                    }
                    axios({
                        method: 'post',
                        url: 'http://' + this.ip + ':5000/handleMiddleBell',
                        data: bodyFormData,
                        config: { headers: { 'Content-Type': 'multipart/form-data' } }
                    }).then(res => {
                        if (res.status === 200) {
                            this.setState({ status: 'Data Sent to API successfully' })
                            this.setState({ status: res.data.myStatus })
                        }

                    })
                }
            }
            else if (this.state.reason === '3') {
                console.log(this.state.reason);
                 bodyFormData = new FormData();
                bodyFormData.append('time', this.state.time);
                axios({
                    method: 'post',
                    url: 'http://' + this.ip + ':5000/handleExtraBell',
                    data: bodyFormData,
                    config: { headers: { 'Content-Type': 'multipart/form-data' } }
                }).then(res => {
                    if (res.status === 200) {
                        this.setState({ status: 'Data Sent to API successfully' })
                        this.setState({ status: res.data.myStatus })
                    }

                })
            }
        }
    }

    handleInput = (e) => {
        this.setState({ time: e.target.value });
    }

    handleDuration = (e) => {
        this.setState({ duration: e.target.value });
    }

    render() {
        const { time } = '00:00:00'
        const { duration } = '00:00'
        return (
            <div class=" container-fluid">
                <div className="des">
                    <h1 align="center">Change Schedule</h1>
                    <p align="center"> Enter time and reason to ring the bell at that time</p>
                </div>
                <div class="container container-fluid jumbotron">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="inputTime">Enter Time</label>
                            <br></br>
                            <TimeField value={time} onChange={this.onTimeChange} title="Enter Time in 24 Hour Format" autoComplete="off" id="timeField" />
                        </div>
                        <div className="form-group">
                            <label for="inputReason">Reason</label>
                            <select name="reasonSelected" id="inputReason" className="form-control" onChange={this.handleChange.bind(this)}>
                                <option >Select Reason</option>
                                <option value="1">End Bell</option>
                                <option value="2">Middle Bell</option>
                                <option value="3">Extra Bell</option>
                            </select>
                        </div>
                        <div class="form-group" id='duration'>
                            <label htmlFor="duration">Enter Duration</label>
                            <br></br>
                            <TimeField value={duration} onChange={this.onDurationChange} autoComplete="off" id="timeField" />
                        </div>
                        <button type="submit" class="btn btn-primary" >Submit</button>
                    </form>
                    <p>{this.state.status}</p>
                </div >
            </div>
        );

    }
}

export default ChangeSchedule