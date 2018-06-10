import React from 'react';

import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; // v1.x
import { MuiThemeProvider as V0MuiThemeProvider} from 'material-ui';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';

/* application components */
import  Header  from '../../components/Header';
import  {Footer}  from '../../components/Footer';

/* global styles for app */
import './styles/app.scss';

const theme = createMuiTheme({
    /* theme for v1.x */
});
// const themeV0 = getMuiTheme({
//     /* theme for v0.x */
// });


class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: PropTypes.node,
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiThemeProvider muiTheme={theme}>
                <section>
                    <Header />
                    <div
                    //  className="container"
                    //  style={{ marginTop: 10, paddingBottom: 250 }}
                    >
                        {this.props.children}
                    </div>
                    <div>
                        <Footer />
                    </div>
                </section>
                </MuiThemeProvider>
            </MuiThemeProvider>
        );
    }
}

export { App };
