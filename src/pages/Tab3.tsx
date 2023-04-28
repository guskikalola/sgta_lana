import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonCard, IonCardContent, IonCardSubtitle
, IonCardTitle, IonCardHeader, IonGrid, IonRow, IonCol } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
          </IonHeader>
          <h1 style={{textAlign: "center"}}>Ionic Online Photo Taker</h1>
        <IonGrid>
          <IonRow>
            <IonCol>
            </IonCol>
            <IonCol>
            <h6>IKA irakasleko lau irakasle gara, eta React framework-aren bidez honako webgunea garatu dugu. Bertan, argazkiak atera daitezke, 
          orri nagusia; eta bertan, atera dituzun argazki guztien bilduma ageriko da. Gainera, argazki horiek ezabatu ditzakezu, argazkian klik
          eginez. Argazkia ezabatzean, zaborra orrira joango da.
        </h6>
            </IonCol>
            <IonCol>
            </IonCol>
         </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                  <IonCardHeader>
                    <IonCardTitle>Juan Alagon</IonCardTitle>
                    <IonCardSubtitle>Disenatzailea eta garatzailea</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Email: jalagon001@ikasle.ehu.eus
                  </IonCardContent>
               </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                  <IonCardHeader>
                    <IonCardTitle>Mikel Martin</IonCardTitle>
                    <IonCardSubtitle>Disenatzailea eta garatzailea</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Email:
                  </IonCardContent>
               </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                  <IonCardHeader>
                    <IonCardTitle>Xabier Artola</IonCardTitle>
                    <IonCardSubtitle>Disenatzailea eta garatzailea</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Email: xartola003@ikasle.ehu.eus
                  </IonCardContent>
               </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                  <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                  <IonCardHeader>
                    <IonCardTitle>David Pintado</IonCardTitle>
                    <IonCardSubtitle>Disenatzaile eta garatzailea</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Email: dpintado001@ikasle.ehu.eus
                  </IonCardContent>
               </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
