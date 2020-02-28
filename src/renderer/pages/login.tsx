import React, { Component, ChangeEvent, KeyboardEvent } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { forEach } from 'lodash';
//import './Login.global.css';
import Events from '../core/events';
import NotificationsQueue from '../components/NotificationsQueue';
import Input from '../components/textInput';
import {RootState, QueueRequest} from "../core/types";

const mapState = (state: RootState) => {
    const { api, ui, queue } = state;
    let isFetching = false;
    forEach(queue.api, (req: QueueRequest) => {
        if (req.status === 'Processing' || req.status === 'Pending') {
            isFetching = true;
        }
    });

    return {
        api,
        isFetching,
        image: ui.loginImage || ''
    };
};

const mapDispatch = {
    setValue: (field: string, value: string) => ({ type: Events.API_SET_VALUE, payload: { field, value } }),
    login: () => ({ type: Events.LOGIN }),
    loginImage: () => ({ type: Events.LOGIN_IMAGE }),

};

const connector = connect(
    mapState,
    mapDispatch
);

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    image: string
}

type State = {
    version: string
}

class Login extends Component<Props, State> {
    static defaultProps = {
        image: ''
    };

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            version: window.require('electron').remote.app.getVersion()
        };
    }

    componentDidMount() {
        this.props.loginImage();
    }

    handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.props.login();
        }
    };

    render() {
        const { setValue, login, api, image, isFetching } = this.props;
        const { user, password, host } = api;

        return (
            <div className="page-login-v2 page-content">
                {image !== '' && <img alt="" className="login-bg" src={image} />}
                <div className="page-login-main animation-slide-right animation-duration-1">
                    <div className="app-info">
                        <div className="font-size-24">SHOKO DESKTOP</div>
                        Version {this.state.version}
                    </div>
                    <h3 className="font-size-24">Welcome back</h3>
                    <p>Please enter your login details below.</p>
                    <form method="post" action="">
                        <Input
                            name="username"
                            placeholder="Username"
                            value={user}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setValue('user', e.target.value);
                            }}
                            onKeyPress={this.handleKeyPress}
                        />
                        <Input
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setValue('password', e.target.value);
                            }}
                            onKeyPress={this.handleKeyPress}
                        />
                        <Input
                            name="server"
                            placeholder="Server address"
                            value={host}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setValue('host', e.target.value);
                            }}
                            onKeyPress={this.handleKeyPress}
                        />
                        <button
                            disabled={isFetching}
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={login}
                        >
                            {isFetching ? (
                                <div className="loader loader-circle" />
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>
                    <footer className="page-copyright">
                        <div className="panel panel-bordered panel-dark">
                            <div className="panel-heading">
                                <h3 className="panel-title">AUTO-LOGIN</h3>
                            </div>
                            <div className="panel-body">
                                You can change the default login behavior by navigating to
                                Settings &gt; User.
                            </div>
                        </div>
                    </footer>
                </div>
                <NotificationsQueue />
            </div>
        );
    }
}

export default connector(Login);
