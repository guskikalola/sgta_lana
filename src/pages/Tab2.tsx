import React, { useState } from 'react';
import { camera, trash, close } from 'ionicons/icons';
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
  IonProgressBar
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
                Array.from(getPhotosByDate().entries()).sort(entry => -entry[0]).map((entry) => {
                  const [date, photos] = entry;
                  return (
                    <IonGrid>
                      <b>{(new Date(date)).toLocaleDateString()}</b>
                      <IonRow>
                        {
                          photos.map((photo) => {
                            return (
                              <IonCol size="6" key={photo.filepath}>
                                <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
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
