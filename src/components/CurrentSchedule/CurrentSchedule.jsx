import React, { Component } from 'react';
import axios from 'axios'
import './Description.css'
class CurrentSchedule extends Component {
    
    constructor(args){
        super(args);
        this.ip = "raspberrypi.mshome.net";
    }

    state = {
        result : []
    }

    handleClick = () =>{ 
        axios.get("http://"+this.ip+":5000/RestoreDefaults").then( res => {
            window.location.reload();
        })
    }

    handleClear = () =>{ 
        axios.get("http://"+this.ip+":5000/clearSchedule").then( res => {
            window.location.reload();
        })
    }

    componentDidMount() {
        axios.get("http://"+this.ip+":5000/currentSchedule").then( res => {
            let result = res.data.result
            this.setState({result: result});
            console.log(res)
        })
    }

    render() {
        return (
            <div class=" container-fluid">
                <div className="des">
                    <h1 align="center">Current Schedule</h1>

                    <p align="center"> List of current running schedule</p>
                </div>
            <div className="container-fluid">
                <table className="table table-bordered" >
                    <thead className = "thead-light"> 
                    <tr>
                        <th>S NO.</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                    </thead> 
                    <tbody>
                        {this.state.result.map((item,i) => {
                            return (<tr>
                                <td>{i+1}</td>
                                <td>{item.time}</td>
                                <td>{item.status}</td>
                            </tr>)
                        })}
                    </tbody>

                </table>
            </div>
            <button  class="btn btn-primary" onClick={this.handleClick.bind(this)} id="restore">Restore to Default</button>
            <button  class="btn btn-primary"  onClick={this.handleClear.bind(this)} id="clear">Clear Schedule</button>
            </div>
        );

    }
}

export default CurrentSchedule