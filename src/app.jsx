import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';

const NewsHeader = ({body}) => <p className="lead">Header {body}</p>;

const NewsItem = (onSelect, {id, header}) =>
    <li key={id}>
        <a href="#" onClick={onSelect.bind(undefined, id)}>Item {id} - {header}</a>
    </li>;

const NewsList = ({list, onSelect}) => <div>{list.map(NewsItem.bind(undefined, onSelect))}</div>;

class App extends React.Component {
    componentDidMount() {
        this.props.loadHeaders();
    }

    render() {
        return (
            <div className="container">
                <NewsHeader body={this.props.newsBody.body}/>
                <NewsList list={this.props.newsList.headers} onSelect={this.props.loadBody}/>
            </div>
        );
    }
}

export default connect(state => state, actionCreators)(App);