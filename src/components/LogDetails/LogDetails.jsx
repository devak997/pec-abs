import React, { Component } from 'react';
import axios from 'axios'
import './Description.css'
class LogDetails extends Component {
    constructor(args){
        super(args);
        this.ip = "raspberrypi.mshome.net:8000";       
    }

    state = {
        result : []
    }

    componentDidMount() {
        axios.get("http://"+this.ip+"/logDetails").then( res => {
            console.log(res)
            let result = res.data.result
            this.setState({result: result});
            console.log(result);
        })
    }

    handleClick = () =>{ 
        axios.get("http://"+this.ip+"/clearLog").then( res => {
            window.location.reload();
        })
    }

    render() {
        return (
            <div class=" container-fluid">
                <div className="des">
                    <h1 align="center">Log</h1>

                    <p align="center"> List of events performed</p>
                </div>
            <div className="container-fluid">
            <table className="table table-bordered" >
                <thead className = "thead-light">
                <tr>
                    <th>S NO.</th>
                    <th>Time</th>
                    {/* <th>Reason</th>6 */}
                </tr>
                </thead>
                <tbody>
                {this.state.result.map((item,i) => {
                            return (<tr>
                                <td>{i+1}</td>
                                <td>{item.time}</td>
                            </tr>)
                        })}
                </tbody>

            </table>
        </div>
        <button  class="btn btn-primary" onClick={this.handleClick.bind(this)} id="restore">Clear Log</button>
        </div>
        );

    }
}

export default LogDetails