import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Alert, Button } from "react-native";
import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
 
// Coordenadas fixas da sua Loja (Exemplo: São Paulo - SP)
const STORE_LOCATION = {
  latitude: -23.55052,
  longitude: -46.633308,
};
 
const CITY_STATE_DEFAULT = 'São Paulo, SP, Brasil';
 
 
export default function App() {
  const mapRef = useRef(null);
 
  const [addressInput, setAddressInput] = useState('');
  const [deliveryLocation, setDeliverLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deliveryDistance, setDeliveryyDistance] = useState(null);
  const [deliveryDuration, setDeliveryDuration] = useState(null);
 
  // Guarda as coordenadas da rota pelas ruas (para desenhar na Polyline)
  const [routeCoordinates, setRouteCoordinates] = useState([]);
 
  // Âgulo de rotação do ícone da moto em graus
  const [heading, setHeading] = useState(0);
 
  const [region] = useState({
    ...STORE_LOCATION,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
 
  //Marcador Animado da Moto
  const [motoCoordinate] = useState(
    new AnimatedRegion({
      latitude: STORE_LOCATION.latitude,
      longitude: STORE_LOCATION.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  );
 
  // Calcula o angulo em graus entre dois pontos para girar a moto no sentiso da rua
  const CalculaBearing = (startLat, startLng, destLat, destLng) => {
    const startLatRad = (startLat * Math.PI) / 180;
    const startLngRad = (startLng * Math.PI) / 180;
    const destLatRad = (destLat * Math.PI) / 180;
    const destLngRad =  (destLng * Math.PI) / 180;
 
    const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
    const x =
    Math.cos(startLatRad) * Math.sin(destLatRad) -
    Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLatRad - startLatRad);
 
    const brng = (Math.atan2(y, x) * 180) / Math.PI;
    return (brng + 360) % 360;
 
  };
 
  //Annima a moto ponto a ponto seguindo as ruas do trecho
  const animateAlongPath =  (points, totalDuration = 10000) => {
   if (!points || points.length < 2) return;
 
  //  Reseta posição da moto
   motoCoordinate.setValue({
    latitude: points[0].latitude,
    longitude: points[0].longitude,
   });
 
   const stepDuration = totalDuration / (points.length - 1);
   
   const animateStep = (index) => {
    if (index >= points.length - 1) return;
 
    const currentPoint = points[index];
    const nextPoint = points[index + 1];
 
    const angle = CalculaBearing(
      currentPoint.latitude,
      currentPoint.longitude,
      nextPoint.latitude,
      nextPoint.longitude
    );
    setHeading(angle);
 
    // Anima para o próximo segmento da rua
    motoCoordinate
    .timing({
      latitude: nextPoint.latitude,
      longitude: nextPoint.longitude,
      duration: stepDuration,
      useNativeDriver: false,
    })
    .start(({ finished }) => {
      if (finished) {
        animateStep(index + 1);
      }
    });
   }
   animateStep(0);
  };
 
  //Busca as vias urbanas reais entre a loja e o destino via OSRM
  const fetchRouteOSRM = async (destination) => {
    try {
      // Usamos http em vez de https no Android para evitar falha de certificado SSL em dev,
      // ou um endpoint alternativo como 'http://router.project-osrm.org'
      const url = `http://router.project-osrm.org/route/v1/driving/${STORE_LOCATION.longitude},${STORE_LOCATION.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
 
      const response = await fetch(url);
      const data = await response.json();
 
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
 
        const coords = route.geometry.coordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
 
        setRouteCoordinates(coords);
        setDeliveryyDistance((route.distance / 1000).toFixed(1));
        setDeliveryDuration(Math.ceil(route.duration / 60));
 
        animateAlongPath(coords, 10000);
      } else {
        setRouteCoordinates([STORE_LOCATION, destination]);
      }
 
    } catch (error) {
      console.error('Erro ao obter rota do OSRM:', error);
      //Caso a requisição falhe por rede, mantém a linha reta como fallback
      setRouteCoordinates([STORE_LOCATION, destination]);
      animateAlongPath([STORE_LOCATION, destination], 5000);
    }
  }
 
  const processLocationFound = (lat, lng) => {
    const newDeliveryLoc = { latitude: lat, longitude: lng };
    setDeliverLocation(newDeliveryLoc);
 
    mapRef.current?.fitToCoordinates([STORE_LOCATION, newDeliveryLoc], {
      edgePadding: { top: 100, right: 80, bottom: 120, left: 80 },
      animated: true,
    });
 
    // Chama a função de rota pelas ruas
    fetchRouteOSRM(newDeliveryLoc);
  }
 
  const geocodeAddress = async (searchQuery) => {
    try {
      const cleanQuery = searchQuery.replace(/[-]/g, ' ');
 
      const osmUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        cleanQuery
      )}&countrycodes=br&limit=1`;
 
      const osmResponse = await fetch(osmUrl, {
        headers: {
          'User-Agent': 'MeuAppExpoDelivery/1.0',
        },
      });
 
      const osmData = await osmResponse.json();
 
      if (osmData && osmData.length > 0) {
        const lat = parseFloat(osmData[0].lat);
        const lng = parseFloat(osmData[0].lon);
        processLocationFound(lat, lng);
        return true;
      }
 
    } catch (err) {
      console.error('Erro na geolocalização:', err);
    }
 
    return false;
  };
 
  const handleSearchAddress = async () => {
    if (!addressInput.trim()) {
      Alert.alert('Aviso', 'Por favor, digite um CEP ou nome da rua e número.');
      return;
    }
 
    Keyboard.dismiss();
    setLoading(true);
 
    const cleanInput = addressInput.replace(/\D/g, '');
 
    try {
      let queryToSearch = '';
 
      if (cleanInput.length === 8) {
        const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cleanInput}/json`);
        const viaCepData = await viaCepResponse.json();
 
        if (viaCepData.erro) {
          Alert.alert('Erro', 'CEP não localizado');
          setLoading(false);
          return;
        }
 
        queryToSearch = `${viaCepData.logradouro}, ${viaCepData.bairro}, ${viaCepData.localidade}, ${viaCepData.uf}`;
      } else {
        queryToSearch = `${addressInput}, ${CITY_STATE_DEFAULT}`;
      }
 
      const success = await geocodeAddress(queryToSearch);
 
      if (!success) {
        Alert.alert(
          'Não encontrado',
          'Não foi possível encontrar este endereço. Tente digitar o nome da rua com número ou outro CEP.'
        )
      }
    } catch (error) {
      Alert.alert('Error', 'Falha ao realizar a busca. Verifique sua conexão com a internet.')
    } finally {
      setLoading(false);
    }
 
  }
 
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="CEP (ex: 04750-000) ou Rua e Número"
          value={addressInput}
          onChangeText={setAddressInput}
          returnKeyType="search"
          onSubmitEditing={handleSearchAddress}
        />
 
        <TouchableOpacity style={styles.button} onPress={handleSearchAddress}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>
 
      <MapView ref={mapRef} style={styles.map} initialRegion={region}>
        {/* Ponto da Loja */}
        <Marker coordinate={STORE_LOCATION} title="Loja da Graziele">
          <View style={[styles.markerBadge, { backgroundColor: '#E74C3C' }]}>
            <MaterialCommunityIcons name="store" size={24} color="#FFF" />
          </View>
        </Marker>
        {/* Ponto de Entrega */}
        {deliveryLocation && (
          <Marker coordinate={deliveryLocation} title="Endereço de Entrega">
            <View style={[styles.markerBadge, { backgroundColor: '#2ECC71' }]}>
              <MaterialCommunityIcons name="home-map-marker" size={24} color="#FFF" />
            </View>
          </Marker>
        )}
 
        {/* Moto Animada com Rotação (Heading) */}
        <Marker.Animated coordinate={motoCoordinate} title="Entregador" anchor={{ x: 0.5, y: 0.5 }}>
          <View style={[styles.motoBadge, { transform: [{ rotate: `${heading}deg` }] }]} >
            <MaterialCommunityIcons name="motorbike" size={26} color="#FFF" />
          </View>
        </Marker.Animated>
 
        {/* Desenha a Rota Exata pelas Ruas */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#3498DB"
            strokeWidth={5}
          />
        )}
      </MapView>
 
      {deliveryDistance && (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Entrega em Andamento</Text>
          <Text style={styles.infoText}>Distância: {deliveryDistance}</Text>
          <Text style={styles.infoText}>Tempo estimado: {deliveryDuration} min</Text>
        </View>
      )}
 
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14
  },
  button: {
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 6
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  map: {
    flex: 1
  },
  markerBadge: {
    backgroundColor: '#f31212ff',
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  motoBadge: {
    backgroundColor: '#F39C12',
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  infoCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2C3E50'
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D'
  }
 
});
 
 
 
 