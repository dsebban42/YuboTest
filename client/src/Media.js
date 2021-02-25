import React from 'react';
import { Table } from 'react-bootstrap';
import './Media.css'

class Media extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    printMedia = () => {
        const media = this.props.media.map((media, key) => {
            var jsx =
                <img src={media.url}></img>
            return jsx;
        });
        return media;
    }
    render() {
        console.log(this.props);
        return (
            <div className="media"> 
            <h4>MEDIAS</h4>
                        {this.printMedia()}
            </div>
        );
    }
}

export default Media;