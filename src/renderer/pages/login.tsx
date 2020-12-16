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
            version: '2002'
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
            <div className="h-screen p-1">
            <div className="rounded-lg h-full flex flex-row flex-auto overflow-hidden shadow">
                <div className="max-h-full flex-grow w-1/2 overflow-hidden flex justify-center items-center bg-cover" style={{background: image && `url(${image}), rgba(10, 11, 29, 0.6)`}}>
                    <span className="text-5xl text-white font-display font-bold flex flex-col items-center">
                        <span>Shoko</span>
                        <span>Desktop</span>
                        <span className="text-xl font-semibold">V{this.state.version}</span>
                    </span>
                </div>
                <div className="flex-grow w-1/2 bg-white flex-column">
                    <div className="flex-grow p-6">
                        
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
                    </div>
                    <div className="bg-gray-300"></div>
                    
                    <NotificationsQueue />
                </div>
            </div>
            </div>
        );
    }
}

export default connector(Login);
