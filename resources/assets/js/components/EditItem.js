import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class EditItem extends Component {

    constructor(props) {
        super(props);
        this.state = {name: '', price: ''};
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:8000/items/${this.props.params.id}/edit`)
            .then((response) => {
                this.setState({name: response.data.name, price: response.data.price});
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    handleChange1(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleChange2(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const products = {
            name: this.state.name,
            price: this.state.price
        }
        let uri = 'http://localhost:8000/items/'+this.props.params.id;
        axios.patch(uri, products)
            .then((response) => {
                this.props.history.push('/display-item');
            });
    }


    render() {
        return(
            <div>
                <h1>update item</h1>
                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <Link to="/display-item" className="btn btn-primary">back</Link>    
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">item name</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.name}
                               onChange={this.handleChange1}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">item price</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.price}
                               onChange={this.handleChange2}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default EditItem;
