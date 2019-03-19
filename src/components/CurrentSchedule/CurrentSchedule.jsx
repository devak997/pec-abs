import React, { Component } from 'react';
import axios from 'axios'
import './Description.css'
class CurrentSchedule extends Component {

    state = {
        result : []
    }

    // tableMapping = () => {
    //     return this.state.result.map(item => {
    //        return (<div><tr>{item.time}</tr>
    //        <tr>{item.time}</tr>
    //        </div>

    //     });
    // }
    handleClick = () =>{ 
        axios.get("http://127.0.0.1:5000/RestoreDefaults").then( res => {
            let result = res.data.result
            // this.setState({result: result});
            console.log(result);
            window.location.reload();
        })
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:5000/currentSchedule").then( res => {
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
                    <h1 align="center">Current Schedule</h1>

                    <p align="center"> List of current running schedule</p>
                </div>
            <div className="container-fluid">
                <table className="table table-bordered" >
                    <thead className = "thead-light"> 
                    <tr>
                        <th>S NO.</th>
                        <th>Time</th>
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
            <button  class="btn btn-primary" onClick={this.handleClick.bind(this)} id="restore">Restore to Default</button>
            </div>
        );

    }
}

export default CurrentSchedule