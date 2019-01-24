import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';

class DisplayItem extends Component {

    constructor(props){
        super(props);
        this.state = {value: '', items: ''};
    }

    componentDidMount(){
        axios.get('http://localhost:8000/items')
            .then((response) => {
                this.setState({items: response.data});
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    tabRow(){
        if(this.state.items instanceof Array){
            return this.state.items.map(function(object, i){
                return <TableRow obj={object} key={i} />;
            })
        }
    }

    render(){
        return(
            <div>
                <h1>Items</h1>
                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <Link to="/add-item" className="btn btn-primary">Create</Link>
                    </div>
                </div><br/>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>item</td>
                            <td>item name</td>
                            <td>item price</td>
                            <td>actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DisplayItem;