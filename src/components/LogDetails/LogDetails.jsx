import React, { Component } from 'react';
import axios from 'axios'
import './Description.css'
class LogDetails extends Component {

    state = {
        result : []
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:5000/logDetails").then( res => {
            console.log(res)
            let result = res.data.result
            this.setState({result: result});
            console.log(result);
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
                    <th>Reason</th>
                </tr>
                </thead>
                <tbody>
                {this.state.result.map((item,i) => {
                            return (<tr>
                                <td>{i+1}</td>
                                <td>{item.time}</td>
                                <td>{item.reason}</td>
                            </tr>)
                        })}
                </tbody>

            </table>
        </div>
        </div>
        );

    }
}

export default LogDetails