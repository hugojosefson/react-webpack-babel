import React from 'react';
import api from './api';
import { connect } from 'react-redux';

const NewsHeader = ({body}) => <p className="lead">Header {body}</p>;

const NewsItem = (onSelect, {id, header}) =>
    <li key={id}>
        <a href="#" onClick={onSelect.bind(undefined, id)}>Item {id} - {header}</a>
    </li>;

const NewsList = ({list, onSelect}) => <div>{list.map(NewsItem.bind(undefined, onSelect))}</div>;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        this.props.loadHeaders();
    }

    onSelect(id) {
        this.props.loadBody(id);
        console.log('selected id ', id);
    }

    render() {
        return (
            <div className="container">
                <NewsHeader body={this.props.newsBody.body}/>
                <NewsList list={this.props.newsList.headers} onSelect={this.onSelect}/>
            </div>
        );
    }
}

var mapStateToProps = state => state;
var mapDispatchToProps = {
    loadHeaders: () => dispatch => {
        dispatch({type: 'LOAD_HEADERS'});
        api.getHeaders().then(
            headers => dispatch({type: 'LOAD_HEADERS_SUCCESS', headers}),
            reason => dispatch({type: 'LOAD_HEADERS_FAIL', reason})
        );
    },
    loadBody: (id) => dispatch => {
        dispatch({type: 'LOAD_BODY'});
        api.getBody(id).then(
            body => dispatch({type: 'LOAD_BODY_SUCCESS', body}),
            reason => dispatch({type: 'LOAD_BODY_FAIL', reason})
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);