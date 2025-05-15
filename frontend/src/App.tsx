import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, homeOutline, logInOutline, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login" component={LoginPage} />
            {/* Protected Routes */}
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/tab1" component={Tab1} />
            {/* Default route */}
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
          
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="login" href="/login">
              <IonIcon icon={logInOutline} />
              <IonLabel>Login</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
