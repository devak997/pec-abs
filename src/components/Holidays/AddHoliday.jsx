import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Description.css'


class AddHoliday extends Component {

    constructor(args) {
        super(args);
        this.state = {
            startDate: '',
            status:'',
            reason:''
        }
        this.dateChange = this.dateChange.bind(this);
        this.ip = "raspberrypi.mshome.net:8000";
    }


    dateChange = (date) => {
        this.setState({ startDate: date }, () => {
            console.log(this.state.startDate);
        });
    }

    handleChange = (e) => {
        this.setState({ reason: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        var day = this.state.startDate.getDate();
        var month = this.state.startDate.getMonth()+1;
        var year = this.state.startDate.getYear()+1900;
        // console.log(year);
        if(month<10){
            var date = day + '-0'+month+'-'+year;     
        }
        else{ date = day + '-'+month+'-'+year;}
        console.log(date);
        bodyFormData.append('date',date);
        bodyFormData.append('reason',this.state.reason);
        axios({
            method: 'post',
            url: "http://"+this.ip+"/addHoliday",
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(res => {
                if (res.status === 200) {
                // console.log(res);  
                this.setState({ status: 'Data Sent to API successfully' })
                this.setState({ status: res.data.myStatus })
            }
        })
    }
    render() {
        return (
            <div class=" container-fluid">
            <div className="des">
            <h1 align="center">Add Holiday</h1>
        
            <p align="center"> Enter a date to add into holiday list</p>
            </div>
                <div className="jumbotron container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="inputTime">Enter Date</label>
                            <br></br>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.dateChange} id="date"
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputReason">Reason</label>
                            <select name="reasonSelected" id="inputReason" className="form-control" onChange={this.handleChange.bind(this)}>
                                <option >Select Reason</option>
                                <option value="Temporary holiday">General Holiday</option>
                                <option value="Public holiday">Public Holiday</option>
                                <option value="Regional holiday">Regional Holiday</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <p>{this.state.status}</p>
                    
                </div>
            </div >
        );

    }
}

export default AddHoliday
