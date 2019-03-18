import React, { Component } from 'react';
import axios from 'axios'
import './ChangeSchedule.css'
import TimeField from 'react-simple-timefield';

class ChangeSchedule extends Component {
    constructor(args) {
        super(args);
        this.state = {
            time: '00:00'
        }
        this.onTimeChange = this.onTimeChange.bind(this);
    };

    onTimeChange(time) {
        time = time + ":00"
        this.setState({ time });
        console.log(typeof time);
        console.log(time);


    }
    state = {
        time: '',
        reason: '',
        duration: '',
        status: ''
    }


    handleChange = (e) => {
        var element = document.getElementById('inputReason').value;
        document.getElementById('duration').style.display = element == 2 ? 'block' : 'none';
        this.setState({ reason: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var hour = this.state.time.split(':');
        var d = new Date();
        if (hour[0] < d.getHours()) {
            this.setState({ status: 'Entered time is less than current time' })
            console.log('time not valid');
        }
        else if (hour[0] == d.getHours() && (hour[1] <= d.getMinutes())) {
            this.setState({ status: 'Entered time is less than current time' })
            console.log('time not valid')
        }
        else {
            console.log('hi');

            var bodyFormData = new FormData();
            bodyFormData.append('time', this.state.time);
            bodyFormData.append('reason', this.state.reason);
            bodyFormData.append('duration', this.state.duration);
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/postData',
                data: bodyFormData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            }).then(res => {
                console.log(res, typeof res);

                if (res.status == 200) {
                    this.setState({ status: 'Data Sent to API successfully' })
                    this.setState({ status: res.data.myStatus })
                }

            })
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
                            <TimeField value={time} onChange={this.onTimeChange} id="timeField" />
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
                            <label for="duration">Enter Duration</label>
                            <input type="text" name="duration" placeholder="Duration" onChange={this.handleDuration} value={this.state.duration} className="form-control" />
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