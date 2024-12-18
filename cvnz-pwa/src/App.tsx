
import React, { useState, FunctionComponent, useEffect } from 'react';
import { Router, useParams } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
// IMPORTANT: In MUI V5 you need to import ThemeProvider and createTheme from @mui/material/styles instead of @mui/styles.  src: https://keep.google.com/#NOTE/1BdCt9n-KHzwC0oCh60QYU1-vsdXBPYkabtWB-TYk4rZDqqnyqhZo1RFFCIvGx5I
import { ThemeProvider } from '@mui/material/styles';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { theme, themeWithRtl } from './theme';
import { store } from './redux/store/configureStore';
import routes from './routes';
import GoogleAnalytics from './components/GoogleAnalytics';
import CookiesNotification from './components/CookiesNotification';
import ScrollReset from './components/ScrollReset';
import StylesProvider from './components/StylesProvider';
import DirectionToggle from './components/DirectionToggle';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/main.scss';
import { myFirebase } from './firebase/firebase';
import { rootState, RootState } from './redux/reducers/rootReducer';
import * as _ from "underscore";
import { bindActionCreators, Dispatch } from 'redux';
import DataContextService from './service/DataContextService';
import { recoverOrgSession, recoverStoredSession } from './redux/actions/userSessionActions';
import { StyledEngineProvider, Theme } from '@mui/material';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme { }
}

const history = createBrowserHistory();

interface IApp {
  actions?: {
  },
  authCheckComplete?: boolean
}

const App: FunctionComponent<IApp> = (props) => {
  const [direction, setDirection] = useState<any>('ltr');
  const session = useSelector((state: RootState) => state.userSessionV2);
  const dispatch = useDispatch();

  const handleDirecitonToggle = () => {
    setDirection(prevDirection => (prevDirection === 'ltr' ? 'rtl' : 'ltr'));
  };

  useEffect(() => {

    let mounted = true;
    // get the User here and show details on the navbar/profile section
    const unsubOnIdTokenChanged = myFirebase.auth().onIdTokenChanged(async data => {
      if (mounted) {
        await dispatch(recoverStoredSession());

        unsubOnIdTokenChanged();
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <DataContextService>
      {/* dg: root already has provider?? TBD: can we have only one Provider? */}
      <Provider store={store}>

        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <StylesProvider direction={direction}>
              <Router history={history}>
                <ScrollReset></ScrollReset>
                <GoogleAnalytics></GoogleAnalytics>
                {session && renderRoutes(routes)}
              </Router>
            </StylesProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>

    </DataContextService>
  );
}

function mapStateToProps(state: RootState) {
  var authCheckComplete = state.userSessionV2?.loggedIn;
  // anything added here will become props.ANYTHING
  // eg. props.projects will get assigned anytime state changes
  //console.log(authCheckComplete);
  return {
    authCheckComplete,
    // loading: state.apiCallsInProgress > 0
  };
}

const authCheckStatus = bindActionCreators(recoverOrgSession, store.dispatch);
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      authCheckStatus,
      // loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      // deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App as any);
