import * as React from 'react';
import {PropsWithChildren} from "react";
import Show from "../components/Show.tsx";

interface State {
    message?: string,
}

class ErrorBoundary extends React.Component<PropsWithChildren, State> {
    constructor() {
        super({});
        this.state = { message: undefined };
    }

    static getDerivedStateFromError(error: string) {
        return { message: error };
    }

    componentDidCatch(error: Error) {
        this.setState({message: error.message});
    }

    render() {
        return (
            <div>
                {this.props.children}
                <Show when={this.state.message !== undefined}>
                    <p className='text-error'>
                        {this.state.message}
                    </p>
                </Show>
            </div>
        );
    }
}

export default ErrorBoundary