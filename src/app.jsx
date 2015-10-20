import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './action-creators';

const NewsHeader = ({body, isLoading}) => {
    if (isLoading) {
        return <div className="heartbeat-loader">Loading body...</div>;
    } else {
        return <p className="lead">{body}</p>;
    }
};

const NewsItem = (onSelect, {id, header}) =>
    <li key={id}>
        <a href="#" onClick={onSelect.bind(undefined, id)}>Item {id} - {header}</a>
    </li>;

const NewsList = ({list, isLoading, onSelect}) => {
    if (isLoading) {
        return <div className="heartbeat-loader">Loading body...</div>;
    } else {
        return <div>{list.map(NewsItem.bind(undefined, onSelect))}</div>;
    }
};

class App extends React.Component {
    componentDidMount() {
        this.props.loadHeaders();
    }

    render() {
        return (
            <div className="container">
                <NewsList list={this.props.newsList.headers} isLoading={this.props.newsList.isLoading}
                          onSelect={this.props.loadBody}/>
                <hr/>
                <NewsHeader body={this.props.newsBody.body} isLoading={this.props.newsBody.isLoading}/>
            </div>
        );
    }
}

export default connect(state => state, actionCreators)(App);