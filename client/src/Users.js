import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import './Users.css';
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentsearchedUser: {}
        }
    }

    componentDidMount() {
        fetch("http://localhost:8081/users")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        users: result
                    });
                },
                (error) => {
                    console.log("error in fetch");
                    console.log(error);
                });
    }

    deleteUser = (userName) => {
        var data = { userName: userName};
        fetch(`http://localhost:8081/users/deleteAccount/${userName}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
                .then((response) => {
                    console.log('Success: ', JSON.stringify(response));
                    console.log(this.loginState.user);
                    this.setState({ isLoaded: true });
                })
                .catch(error => console.error('Error:', error));
                
    }

    showDetails = (id) => {
        fetch(`http://localhost:8081/messages/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.onMessageUpdated(result);
                },
                (error) => {
                    console.log("error in fetch");
                    console.log(error);
                });

        fetch(`http://localhost:8081/media/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.onMediaUpdated(result);
                },
                (error) => {
                    console.log("error in fetch");
                    console.log(error);
                });
    }

    printUsers = () => {
        const users = this.state.users.map((usr, key) => {
            var jsx =
                <tr>
                    <td>{usr.username}</td>
                    <td>{usr.country}</td>
                    <td>{usr.name}</td>
                    <td>{usr.city}</td>
                    <Button variant="info" onClick={this.showDetails.bind(undefined, usr.id)}>Show Details</Button>
                    <Button variant="danger" onClick={this.deleteUser.bind(undefined, usr.username)}>DeleteUser</Button>
                </tr>
            return jsx;
        });
        return users;
    }

    searchUser = (e) => {
        console.log(e.target.value);
        const allusers = this.state.users;
        const user = allusers.find(elem => elem.username === e.target.value)
        console.log(user);
        if (user !== undefined)
            this.setState({currentsearchedUser : user})
        else
            this.setState({currentsearchedUser: {name: null, username: null, Country: null, city: null}})
    }

    render() {
        console.log(this.state);

        return (
            <div className="users">
                <h3>USERS</h3>
                <form>
                    <label>
                        Search User:
                        <input type="text" value={this.state.value} onChange={this.searchUser} />
                    </label>
                </form>
                <div>
                    currentUser: username : {this.state.currentsearchedUser.username}
                    Country: {this.state.currentsearchedUser.Country}
                    name: {this.state.currentsearchedUser.name}
                    city: {this.state.currentsearchedUser.city}
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Country</th>
                            <th>name</th>
                            <th>city</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.printUsers()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Users;