import React, {Component} from "react";
import axios from "axios";
class PostFilterAjax extends Component{
    constructor(){
        super();
        this.state ={
            posts : [],
            
        }

    }

    componentDidMount(){
        axios.get('http://localhost/test/wp-json/wp/v2/posts').then(response=>{
        //console.log(response);
        this.setState({posts:response.data});

        });
    }
    formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(date.getFullYear()).slice(2); // Get last two digits of year
        return `${day}/${month}/${year}`;
    }
    render(){
        return(
            <>
            <div className="postfilter">
                <h2>Filter Conditions</h2>
                <div className="checkboxwrap">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Posts with multiple H1 tags.</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Posts without H2 and H3 tags.</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Posts with multiple H1 tags.</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Posts with multiple H1 tags.</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Posts with multiple H1 tags.</label>
                </div>
                </div>

                <div className="posttablewrap">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>Post Id</td>
                                <td>Title</td>
                                <td>Date</td>
                            </tr>
                        </thead>
                        <tbody>
                                {this.state.posts.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td><a href="{item.link}">{item.title.rendered}</a></td>
                                            <td>{this.formatDate(item.date)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    </table>
                </div>
            </div>
            </>
        )
    }
}

export default PostFilterAjax;