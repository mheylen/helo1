import React, {Component} from "react"
import axios from "axios";
import {connect} from "react-redux"

export default class Auth extends Component{
    constructor(props) {
        super(props);
            this.state = {
                username: "",
                password: "",
                profile_pic: ""
            };
            this.logIn = this.logIn.bind(this);
            // this.register = this.register.bind(this);
        }
    componentDidMount(){
        axios.get("/api/users").then(res => {
            console.log(res)
            this.props.setUsers(res.data)
        });
        this.logIn();
    }
    logIn(){
        const loginPayload = {
            username: this.state.username,
            password: this.state.password,
        };
        axios
        .post("/api/login", loginPayload)
        .then(res => {
            console.log("logged in", res.data)
            this.props.setUsers(res.data);
        })
        .catch(err => alert(err));
    }
    
    register(){
        const loginPayload = {
            username: this.state.username,
            password: this.state.password,
            profile_pic: this.state.profile_pic
        };
        axios.post("/api/register", loginPayload)
        .then( res => {
            this.props.setUsers(res.data);
        })
        .catch(err => alert(err));
    }
    changeHandler = (name, value) => {
        this.state({
            [name]: value
        });
    };
    logout (){
        axios.post("/api/logout")
    }


    render() {
        const { username, password, profile_pic } = this.state
        const {users} = this.props;
        
        return (
            <div>
                <nav>
                    <ul>
                        {!users ? (
                        <li>
                        <input required
                        placeholder = "username"
                        name = "username"
                        value={username}
                        onChange={ e =>
                        this.changeHandler(e.target.name, e.target.value)
                    }
                    />
                    <input required
                    placeholder = "password"
                    name = "password"
                    value={password}
                    onChange={ e =>
                    this.changeHandler(e.target.name, e.target.value)
                }
                />
                <button onClick={this.register}>register</button>
                <button onClick={() => this.logIn()}>login</button>
                </li>
                        ) : (
                            <button>logout</button>
                        )}
                </ul>
                </nav>

            </div>


        )
    }
    
}

const mapStateToProps = reduxState => {
    return{
        users: reduxState.users
    }
};
const mapDispatchToProps = {
    setUsers: setUsers
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);