import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library/legacy';
import * as Sharing from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  // Estado reativo para gariantir a ativação do sensor no android
  const [facing, setFacing] = useState('back')

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions({ writeOnly: true });

  const cameraRef = useRef(null);


  // Pegar  a imagem sa Galeria
  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      maediaTypea: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  }

  // Abrir a camera
  const handleOpenCamera = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert('Permissão necessária', 'Voce precisa permitir  o acesso a camera');
        return;
      }
    }
    setShowCamera(true);

  }

  // Tirar foto e salvar
  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      if (!photo?.uri) return;

      setImageUri(photo.uri);
      setShowCamera(false);

      if (Platform.OS !== 'web') {
        let savedDirectly = false;

        try {
          let permission = mediaPermission;
          if (!permission || permission.status !== 'granted') {
            permission = await requestMediaPermission();
          }

          if (permission?.granted) {
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            savedDirectly = true;
            Alert.alert('Sucesso', 'Foto salva na galeria!');
          }
        } catch (e) {
          savedDirectly = false;
        }

        if (!savedDirectly) {
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(photo.uri);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
      Alert.alert('Erro', 'Não foi possível capturar a foto.');
    }
  };

  // Tela camera
  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        {/* Colocar os botões DENTRO da Cameraview resolve o visor escuro no android */}

        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          animateShutter={false}
        >
          <SafeAreaView style={styles.cameraOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowCamera(false)}>
              <Text style={styles.buttonText}>✕ Sair</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.innerCaptureCircle} />
            </TouchableOpacity>
          </SafeAreaView>
        </CameraView>
      </View>
    )
  }

  // Tela principal
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.imagecontainer}>
          {imageUri ? (
            <Image
              key={imageUri}
              source={{ uri: imageUri }}
              style={styles.previewImage}
              resizeMode='contain'
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonGroup}>
          <Button title='Tirar Foto (Câmera)' onPress={handleOpenCamera} />
          <Button title='Escolher da Galeria ' onPress={pickImageFromLibrary} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagecontainer: {
    width: 300,
    height: 300,
    marginBottom: 20,
    backgroundColor: '#e1e1e1',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  placeholder: {
    padding: 20,
    alignItems: 'center'
  },
  placeholderText: {
    color: '#666',
  },
  buttonGroup: {
    gap: 12,
    width: '100%',
    maxWidth: 300
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    padding: 20
  },
  closeButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  captureButton: {
    alignSelf: 'center',
    marginBottom: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCaptureCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  }


});