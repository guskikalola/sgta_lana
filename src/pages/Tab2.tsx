import React, { useState } from 'react';
import { camera, trash, close, trashBinOutline } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonProgressBar,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonButton
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';

const Tab2: React.FC = () => {

  const { photos, takePhoto, deletePhoto, getPhotosByDate } = usePhotoGallery();

  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          {
            // Lortu argazkiak dataren arabera. Mapa egitura: Map<timestamp,UserPhoto[]>
            Array.from(getPhotosByDate().entries()).sort(entry => -entry[0]).map((entry) => { // Array batera pasa .map erabiltzeko
              const [date, photos] = entry;
              return (
                <IonGrid>
                  <IonRow class="ion-justify-content-center">
                    <IonCol size='12'>
                      <IonText color="primary"><h1>{(new Date(date)).toLocaleDateString()}<hr /></h1></IonText>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    {
                      photos.map((photo) => { // Uneko dataren argazki bakoitzeko IonCard elementu bat sortu ( barruan irudia izango duena )
                        return (
                          <IonCol size="6" key={photo.filepath} class="photo">
                            <IonCard>
                              <IonImg src={photo.webviewPath} />
                              <IonCardHeader>
                                <IonCardSubtitle>
                                  <IonGrid>
                                    <IonCol>
                                      <IonRow>
                                        <b>File</b>: {photo.filepath}
                                      </IonRow>
                                      <IonRow>
                                        <b>Date</b>: {new Date(photo.metadata.timestamp.valueOf()).toLocaleString()}
                                      </IonRow> 
                                    </IonCol>
                                  </IonGrid>
                                </IonCardSubtitle>
                              </IonCardHeader>
                              <IonButton fill="clear" color="danger" onClick={() => setPhotoToDelete(photo)}><span><IonIcon icon={trashBinOutline}/> Delete</span></IonButton>
                            </IonCard>
                          </IonCol>)
                      })
                    }
                  </IonRow>

                </IonGrid>

              )
            })

          }
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => takePhoto()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
        <IonActionSheet
        header={`Delete ${photoToDelete?.filepath}? This action cannot be undone`}
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: 'Delete',
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
              text: 'Cancel',
              icon: close,
              role: 'cancel',
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>


    </IonPage>
  );
};

export default Tab2;
