import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

//the key for the store 
const PHOTO_STORAGE = 'photos';

//ezabatu diren argazki kopuru eguneratua
let deletedPhotoCount =0;

export function usePhotoGallery() {

  // useState bi elementu bueltatzen ditu:
  // photos : argazkien zerrenda
  // setPhotos() : argazkien zerrenda eguneratzeko metodoa
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  // Hook honek konponente bat kargatzen den bakoitzean exekutatuko da
  // Parametro bezela array bat pasata, array-ko elementu bakoitza eguneratzean funtzioa deituko da.
  // Array hutsa pasata, behin bakarrik exekutatuko da.
  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PHOTO_STORAGE });

      const photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];
      // If running on the web...
      if (!isPlatform('hybrid')) {
        for (let photo of photosInPreferences) {
          const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          // Web platform only: Load the photo as base64 data
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setPhotos(photosInPreferences);
    };
    loadSaved();
  }, []);

  // Argazki bat atera eta bueltatu
  const takePhoto = async () => {
    // CameraAPI bidez argazki bat atera
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // Azgazkiaren fitxategiaren izena definitu. Uneko data + .jpeg
    const fileName = new Date().getTime() + '.jpeg';

    // Argazkia fitxategi sisteman gorde eta bueltatu 
    const savedFileImage = await savePicture(photo, fileName);

    // Argazki berrien lista gorde
    const newPhotos = [savedFileImage, ...photos];


    // Argazki berriak gorde
    setPhotos(newPhotos);

    //the Photos array is stored each time a new photo is taken
    // Honek gordeko du localStorage-n [{"filepath":"webfilePath"}, ...] motako datuak
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

  };

  // Metodo honek FilesystemAPI erabilita nabigatzailean irudia gordeko du (Memory > IndexedDB > Disk > FileStorage)
  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    let base64Data: string;
    let timestamp: Number = Date.now();
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        metadata: {
          timestamp: timestamp
        }
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
        metadata: {
          timestamp: timestamp
        }
      };
    }
  };

  const sendPhotoToTrash = (photo: UserPhoto) => {
    const newPhotos = photos.map(item => {
      if (item.filepath == photo.filepath) {
        item.toDelete = true;
      }
      return item;
    })
    setPhotos(newPhotos);
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
  };

  const restorePhoto = (photo: UserPhoto) => {
    const newPhotos = photos.map(item => {
      if (item.filepath == photo.filepath) {
        item.toDelete = false;
      }
      return item;
    })
    setPhotos(newPhotos);
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
  }

  const getDeletedPhotos = () => {
    return photos.filter(photo => photo.toDelete);
  }

  const deletePhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);
  
    // Update photos array cache by overwriting the existing photo array
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
  
    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
    setPhotos(newPhotos);
    
    let trashBadge = document.getElementsByClassName('badgeTrash')[0]
  
    deletedPhotoCount++
    trashBadge.textContent=deletedPhotoCount.toString()
  };

  const getPhotosByDate  = () : Map<number, UserPhoto[]> => {
    let grouped = new Map<number, UserPhoto[]>();

    photos.forEach((photo, index, array) => {
      let timestamp = photo.metadata.timestamp;
      let d = new Date(<number>timestamp); // Casting egin behar da. number != Number delako
      let dGroup = new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0,0);
      let key = dGroup.getTime();
      if(grouped.has(key)) {
        grouped.get(key)?.push(photo);
      } else {
        grouped.set(key, [photo]);
      }

    });
    return grouped;
  }

  return {
    photos,
    takePhoto,
    savePicture,
    deletePhoto,
    sendPhotoToTrash,
    getDeletedPhotos,
    restorePhoto,
    getPhotosByDate
  };
}

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}


interface PhotoMetadata {
  timestamp: Number;
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  metadata: PhotoMetadata;
  toDelete?: boolean;
}

//Zaborra tab-a klikatzerakoan ezabatu diren argazki kopuru notifikazioa kendu 
export function trashClick(){
  let trashBadge = document.getElementsByClassName('badgeTrash')[0]
  
  deletedPhotoCount=0
  trashBadge.textContent=''
}