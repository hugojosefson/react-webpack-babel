require("bootstrap/dist/css/bootstrap.min.css")
import React from 'react';
import ReactDOM from 'react-dom';

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';

import App from './app';
import store from './config-store';

function createDebugPanel() {
    return (<DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
    );
}


ReactDOM.render(
    <div>
        <Provider store={ store }>
            <App/>
        </Provider>
        {createDebugPanel()}
    </div>,
    document.querySelector("#myApp"));

