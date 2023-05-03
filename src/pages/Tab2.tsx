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
  IonButton,
  IonPopover,
  IonButtons,
  IonItem
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';

const Tab2: React.FC = () => {

  const { takePhoto, getPhotosByDate, sendPhotoToTrash } = usePhotoGallery();

  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
          <IonItem key="patata" class="it2">
            <IonButton id="trigger-button2">Help</IonButton>
            <IonPopover trigger="trigger-button2">
              <IonContent className="ion-padding">Orri honetan argazkiak atera ditzakezu. Behin aterata, dataren arabera ordenatuko dira. 
              Gainera argazkiak ezabatu ditzazkezu; argazkiak ezabatzean zabortegira mugituko dira.</IonContent>
            </IonPopover>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          {
            // Lortu argazkiak dataren arabera. Mapa egitura: Map<timestamp,UserPhoto[]>
            Array.from(getPhotosByDate().entries()).sort(entry => -entry[0]).filter(entry => { // TODO: Mirar este codigo repetido del filter
              const [date, photos] = entry;
              const filteredPhotos = photos.filter(photo => !photo.toDelete);
              return filteredPhotos.length > 0;
            }).map((entry) => { // Array batera pasa .map erabiltzeko
              const [date, photos] = entry;
              const filteredPhotos = photos.filter(photo => !photo.toDelete);
              return (
                <IonGrid>
                  <IonRow class="ion-justify-content-center">
                    <IonCol size='12'>
                      <IonText color="primary"><h1>{(new Date(date)).toLocaleDateString()}<hr /></h1></IonText>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    {
                      filteredPhotos.map((photo) => { // Uneko dataren argazki bakoitzeko IonCard elementu bat sortu ( barruan irudia izango duena )
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
        header={`Send ${photoToDelete?.filepath} to trash?`}
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  sendPhotoToTrash(photoToDelete);
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
