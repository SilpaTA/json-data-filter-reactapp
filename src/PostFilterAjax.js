import React, {Component} from "react";
import axios from "axios";


class PostFilterAjax extends Component{
    constructor(props){
        super(props);
        this.state ={
            posts: [],
            filterh1: false,
            filterNoH2H3: false,
            filterTestKeyword: false,
            filterAuthorIdOne: false,
            filterDateRange: false
            
        }

    }
   
    componentDidMount(){

        const currentDomain = window.location.origin;
        // console.log('path array',window.location.pathname.split('/'));
        const pathname = window.location.pathname.split('/')[1]; // Get the folder name
        // console.log('path name',pathname);
        const baseURL = currentDomain.includes('localhost') ? `${currentDomain}/${pathname}` : currentDomain;
        // console.log('base url',baseURL);
        const endpoint = '/wp-json/wp/v2/posts';
       
        //console.log(response); 
        axios.get(`${baseURL}${endpoint}`).then(response=>{
        
        if(response.data)
            var data =  response.data
        else
            var data = response
        //console.log(data); 
        data.forEach(element => {
            element.visibility = true
        });
        //console.log(response.data);
        this.setState({posts:data} )//, () => console.log(this.state.posts));
        
        });
       
    }
    setFilterWithH1 = () => {
        // alert('yes');
        // console.log('before ', this.state.filterh1);
        this.setState(
            {
                filterh1:!this.state.filterh1
            }, this.filterPostData
        )
        
    }
    setFilterWithoutH2h3tag = () => {
        this.setState(
            {
                filterNoH2H3:!this.state.filterNoH2H3
            }, this.filterPostData
        )
        
    }

    setFilterWithTestKeyword = () => {
      //  console.log('keyword test');
        this.setState(
            {
                filterTestKeyword:!this.state.filterTestKeyword
            },this.filterPostData
        )
        
    }

    setFilterAuthorId1 = () => {
        this.setState(
            {
                filterAuthorIdOne:!this.state.filterAuthorIdOne
            }, this.filterPostData
        )
        
    }

    setFilterDateRange = () => {
        this.setState(
            {
                filterDateRange:!this.state.filterDateRange
            }, this.filterPostData
        )
       
    }
        
    filterPostData = () => {
        let newPostArray = [];
       // console.log('filter init');
       // console.log('current post data: ', this.state.posts);
        this.state.posts.forEach((post) => {
            
            var passcount = 0;
            if(this.state.filterh1 || this.state.filterNoH2H3){
               // console.log((post.content.rendered.match(/<h1>/g) || []).length);
               //check h1 tags
               if(this.state.filterh1){
                const parser = new DOMParser();
                const doc = parser.parseFromString(post.content.rendered, 'text/html');
                const h1Tags = doc.querySelectorAll('h1');
               // console.log(post.content.rendered);
                //console.log(h1Tags)
                if(h1Tags.length > 1){
                    passcount++;
                }
                }
                if(passcount === 0 && this.state.filterNoH2H3) {
                    //check h2 and h3 tags
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(post.content.rendered, 'text/html');
                    const h2Tags = doc.querySelectorAll('h2'); // Get all <h2> tags
                    const h3Tags = doc.querySelectorAll('h3'); // Get all <h3> tags
                    if(h2Tags.length === 0 && h3Tags.length === 0) {
                        passcount++;
                    }
                }

               // console.log('group 1: ', passcount);
        }
        else {
        passcount++;
        }

        //check 'test' keyword
        if(this.state.filterTestKeyword) {
            if(post.content.rendered.toLowerCase().includes('test') || post.title.rendered.includes('test')) {
                passcount++;
            }
            
        }
        else {
            passcount++;
        }

        //console.log('group 2: ', passcount);



        if(this.state.filterAuthorIdOne && this.state.filterDateRange) {
        
                if(this.checkAuthor(post) && this.checkDateRange(post)) {
                    passcount++;
                }
        }
        else if(this.state.filterAuthorIdOne) {
            if(this.checkAuthor(post)) {
                passcount++;
            }
        }else if(this.state.filterDateRange) {
            if(this.checkDateRange(post)) {
                passcount++;
            }
        }
        else{
            passcount++;
        }

        //console.log('passcount is: ', passcount);
        if(passcount === 3)
            post.visibility = true;
        else
            post.visibility = false;
        newPostArray.push(post);

            //console.log(post);
            
        } );
        //console.log('the new posts array: ', newPostArray);
        this.setState({posts:newPostArray});
        //console.log('post list after filter: ', this.state.posts);
    }

    checkDateRange(post) {
        const postDate = new Date(post.date);
                    const startDate = new Date('2021-01-01');
                    const endDate = new Date('2022-01-01');
                    console.log('postdate: ', postDate);
                    console.log('startdat: ', startDate);
                    console.log('enddate: ', endDate);
                    if(postDate >= startDate && postDate <= endDate) {
                        return true
                    }
                    else
                    return false;
    }

    checkAuthor(post) {
        if(post.author == 1) {
            return true;       
        }
        else {
            return false;
        }
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
            <div className="postfilter mt-3">
                <h2 className="pb-3">Filter Conditions</h2>
                <div className="checkboxwrap">
                <div className="row">
                    <div className="col-6">
                        <div className="custom-control custom-checkbox pb-3">
                            <input type="checkbox" className="custom-control-input me-2" id="customCheck1" onClick={this.setFilterWithH1}/>
                            <label className="custom-control-label" for="customCheck1">Posts with multiple H1 tags.</label>
                        </div>
                        <div className="custom-control custom-checkbox pb-3">
                            <input type="checkbox" className="custom-control-input me-2" id="customCheck2" onClick={this.setFilterWithoutH2h3tag}/>
                            <label className="custom-control-label" for="customCheck2">Posts without H2 and H3 tags.</label>
                        </div>
                        <div className="custom-control custom-checkbox pb-3">
                            <input type="checkbox" className="custom-control-input me-2" id="customCheck3" onClick={this.setFilterWithTestKeyword}/>
                            <label className="custom-control-label" for="customCheck3">Posts with keyword 'Test'.</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="custom-control custom-checkbox pb-3">
                            <input type="checkbox" className="custom-control-input me-2" id="customCheck4" onClick={this.setFilterAuthorId1}/>
                            <label className="custom-control-label" for="customCheck4">Posts with author id 1</label>
                        </div>
                        <div className="custom-control custom-checkbox pb-3">
                            <input type="checkbox" className="custom-control-input me-2" id="customCheck5" onClick={this.setFilterDateRange}/>
                            <label className="custom-control-label" for="customCheck5">Posts by date range 01/01/2021 to 01/01/2022</label>
                        </div>
                    </div>
                </div>
            </div>

                <div className="posttablewrap">
                    <table className="table table-striped table-bordered table-responsive text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>Post Id</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Author Id</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                this.state.posts.filter(item => item.visibility).length > 0 ?
                                this.state.posts.filter(item => item.visibility).map((item, key) => {
                                        return(
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td><a href={item.link}>{item.title.rendered}</a></td>
                                            <td>{item.content.rendered.replace(/<[^>]*>/g, '').substring(1,150)+ '...'}</td>
                                            <td>{item.author}</td>
                                            <td>{this.formatDate(item.date)}</td>
                                        </tr>
                                        )
                                })
                                :
                                <tr>
                                    <td colSpan='5'>No posts to display</td>
                                </tr>
                            }
                            </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PostFilterAjax;