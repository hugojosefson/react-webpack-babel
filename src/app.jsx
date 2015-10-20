import React from 'react';
import api from './api';

const NewsHeader = ({body}) => <p className="lead">Header {body}</p>;

const NewsItem = (onSelect, {id, header}) =>
    <li key={id}>
        <a href="#" onClick={onSelect.bind(undefined, id)}>Item {id} - {header}</a>
    </li>;

const NewsList = ({list, onSelect}) => <div>{list.map(NewsItem.bind(undefined, onSelect))}</div>;


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.state = {headers: []};
    }

    componentDidMount() {
        api.getHeaders().then((headers) => this.setState({headers}))
    }

    onSelect(id) {
        api.getBody(id).then((body) => this.setState({body}))
    }

    render() {
        return (
            <div className="container">
                <NewsHeader body={this.state.body}/>
                <NewsList list={this.state.headers} onSelect={this.onSelect}/>
            </div>
        );
    }
}
