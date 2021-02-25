import React from 'react';
import { Table } from 'react-bootstrap';
import './Messages.css'

class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    printMsg = () => {
        const msg = this.props.messages.map((msg, key) => {
            var jsx =
                <tr>
                    <td>{msg.receiverId}</td>
                    <td>{msg.senderId}</td>
                    <td>{msg.content}</td>

                </tr>
            return jsx;
        });
        return msg;
    }
    render() {
        console.log(this.props);
        return (
            <div className="messages">
                <h4>MESSAGES</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>receiverId</th>
                            <th>senderId</th>
                            <th>content</th>
                        </tr>
                    </thead>
                    <tbody >
                        {this.printMsg()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Messages;