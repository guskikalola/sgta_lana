import {
  IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonCard, IonImg,
  IonCardHeader, IonCardSubtitle, IonButton, IonActionSheet, IonIcon, IonText, IonItem, IonPopover
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { UserPhoto, usePhotoGallery } from '../hooks/usePhotoGallery';
import { shieldOutline, trash, close, trashBinOutline } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';

import { PhotoAppContext } from '../App';

const Tab1: React.FC = () => {
  const photoGallery = useContext(PhotoAppContext);
  if (photoGallery == null) return (<b>Errorea</b>); // Type-script hard-typed izanda, hau eginda "null izan daiteke" errorea kentzen du
  const { getDeletedPhotos, deletePhoto, getPhotosByDate, restorePhoto, photos } = photoGallery;
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Zaborra</IonTitle>
          <IonItem class="it1">
            <IonButton id="trigger-button1">Help</IonButton>
            <IonPopover trigger="trigger-button1">
              <IonContent className="ion-padding">Orri hau zabortegia da, bertan argazkiak ezabatuz, betirako ezabatuko dira.</IonContent>
            </IonPopover>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ "display": photos.filter(photo => photo.toDelete).length > 0 ? "none" : "block" }}>
          <h1>Ez dituzu argazkirik ezabatzeko.</h1>
        </div>
        <IonGrid>
          <IonRow>
            {getDeletedPhotos().map(photo => {
              return (
                <IonCol size="6" key={photo.filepath} class="photo">
                  <IonCard>
                    <IonImg src={photo.webviewPath} />
                    <IonCardHeader>
                      <IonCardSubtitle>
                        <IonGrid>
                          <IonCol>
                            <IonRow>
                              <b>Fitxategia</b>: {photo.filepath}
                            </IonRow>
                            <IonRow>
                              <b>Data</b>: {new Date(photo.metadata.timestamp.valueOf()).toLocaleString()}
                            </IonRow>
                          </IonCol>
                        </IonGrid>
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonButton fill="clear" color="danger" onClick={() => setPhotoToDelete(photo)}><span><IonIcon icon={trashBinOutline} /> Ezabatu</span></IonButton>
                    <IonButton fill="clear" color="tertiary" onClick={() => restorePhoto(photo)}><span><IonIcon icon={shieldOutline} /> Berreskuratu</span></IonButton>
                  </IonCard>
                </IonCol>)
            })
            }
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonActionSheet
        header={`Ezabatu ${photoToDelete?.filepath}? Ekintza hau ezin da desegin.`}
        isOpen={!!photoToDelete}
        buttons={[
          {
            text: 'Ezabatu',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            },
          },
          {
            text: 'Atzera egin',
            icon: close,
            role: 'cancel'
          },
        ]}
        onDidDismiss={() => setPhotoToDelete(undefined)}
      />
    </IonPage>
  );
};

export default Tab1;
