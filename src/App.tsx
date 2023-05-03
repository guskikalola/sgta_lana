import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonItem,
  IonBadge
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { image, square, triangle, trashBinOutline, logoWindows, helpOutline, personOutline } from 'ionicons/icons';
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

/* Theme variables */
import './theme/variables.css';

import { /* trashClick, */ usePhotoGallery } from './hooks/usePhotoGallery';
import { createContext } from 'react';
import { UserPhoto } from './hooks/usePhotoGallery';
import { Photo } from '@capacitor/camera';

setupIonicReact();

export const PhotoAppContext = createContext<ReturnType<typeof usePhotoGallery> | null>(null);

const App: React.FC = () => {
  const photoGallery = usePhotoGallery();
  return (<IonApp>
    <IonReactRouter>
      <PhotoAppContext.Provider value={photoGallery}>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1" /* onClick={() => trashClick()} */ >
              <IonIcon icon={trashBinOutline}></IonIcon >
              <IonItem class='ion-item'>

                <IonLabel>Trash</IonLabel>
                <IonBadge color="danger" className='badgeTrash e-badge-dot'>{photoGallery.getDeletedPhotos().length > 0 ? photoGallery.getDeletedPhotos().length : ''}</IonBadge>
              </IonItem>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={image} />
              <IonLabel>Photos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon aria-hidden="true" icon={personOutline} />
              <IonLabel>About Us</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </PhotoAppContext.Provider>

    </IonReactRouter>
  </IonApp>)
};

export default App;
