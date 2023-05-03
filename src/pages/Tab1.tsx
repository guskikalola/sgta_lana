import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonCard, IonImg, 
  IonCardHeader, IonCardSubtitle, IonButton, IonActionSheet, IonIcon, IonText, IonItem, IonPopover } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { UserPhoto, usePhotoGallery } from '../hooks/usePhotoGallery';
import { shieldOutline, trash, close, trashBinOutline } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';

import { PhotoAppContext } from '../App';

const Tab1: React.FC = () => {
  const photoGallery = useContext(PhotoAppContext);
  if(photoGallery == null) return (<b>Errorea</b>); // Type-script hard-typed izanda, hau eginda "null izan daiteke" errorea kentzen du
  const { getDeletedPhotos, deletePhoto, getPhotosByDate, restorePhoto} = photoGallery;
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Trash</IonTitle>
          <IonItem class="it1">
            <IonButton id="trigger-button1">Help</IonButton>
            <IonPopover trigger="trigger-button1">
              <IonContent className="ion-padding">Orri hau zabortegia da, bertan argazkiak ezabatuz, betirako ezabatuko dira.</IonContent>
            </IonPopover>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
        <IonRow class="ion-justify-content-center">
                    <IonCol size='12'>
                      <IonText color="primary"><h1>Ezabatzeko<hr /></h1></IonText>
                    </IonCol>
                  </IonRow>
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
                              <b>File</b>: {photo.filepath}
                            </IonRow>
                            <IonRow>
                              <b>Date</b>: {new Date(photo.metadata.timestamp.valueOf()).toLocaleString()}
                            </IonRow>
                          </IonCol>
                        </IonGrid>
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonButton fill="clear" color="danger" onClick={() => setPhotoToDelete(photo)}><span><IonIcon icon={trashBinOutline} /> Delete</span></IonButton>
                    <IonButton fill="clear" color="tertiary" onClick={() => restorePhoto(photo)}><span><IonIcon icon={shieldOutline} /> Restore</span></IonButton>
                  </IonCard>
                </IonCol>)
            })
            }
          </IonRow>
        </IonGrid>
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
            role: 'cancel'
          },
        ]}
        onDidDismiss={() => setPhotoToDelete(undefined)}
      />
    </IonPage>
  );
};

export default Tab1;
