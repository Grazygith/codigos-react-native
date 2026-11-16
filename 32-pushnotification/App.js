import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import notifee, { AuthorizationStatus, EventType, AndroidImportance, TriggerType, RepeatFrequency } from '@notifee/react-native';

export default function App() {
  const [statusNotification, setStatusNotication] = useState(true);

  useEffect(() => {
    async function getPermission() {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        console.log("Permission:", settings.authorizationStatus)
        setStatusNotication(true);
      } else {
        console.log("Usuario negou a permissão!");
        setStatusNotication(false);
      }
    }

    getPermission();
  }, [])

  //Notificação de background -  quando o app estiver minimizado ou fechado
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (type == EventType.PRESS) {
      console.log("Clicou na notificação do Background: ", pressAction?.id)
      if (notification?.id) {
        await notifee.cancelNotification(notification?.id)
      }
    }
    console.log("Evento do Background")
  })

  // Evento que aparece na tela aberta
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("Usuario descartou a notificação");
          break;
        case EventType.PRESS:
          console.log("Tocou na notificação: ", detail.notification)
      }
    })
  }, [])

  async function handleNoticate() {
    if (!statusNotification) {
      return;
    }

    // Canal de lembrete
    const channelId = await notifee.createChannel({
      id: 'lembrete',
      name: 'lembrete',
      vaibration: true,
      importance: AndroidImportance.HIGH

    })
    await notifee.displayNotification({
      id: 'Atenção',
      title: 'Produto em Promoção',
      body: 'Veja agora as nossas promoções de Black Friday',
      android: {
        channelId,
        pressAction: {
          id: 'default'
        }
      }
    })

  }

  // Função assincrona para um notificação nova
  async function handleNewNotification() {
    const date = new Date(Date.now())

    date.setMinutes(date.getMinutes() + 3);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime()
    }



    // aguardando o disparo da notificação
    await notifee.createTriggerNotification({
      title: 'Lembrete para Hoje',
      body: "Estudar notificações do React Native ainda hoje",
      android: {
        channelId: 'lembrete',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default'
        }
      }
    }, trigger);
  }

  // função para  com listar IDS
  function handleListNotifications() {
    notifee.getTriggerNotificationIds()
      .then((ids) => {
        console.log(ids);
      })
  }

  // Função assincrona para cancelar notificação
  async function handleCancelNotifications() {
    notifee.cancelNotification("gciipB82iUyH4g2lhKnD")
  }

  // Função assincrona para disparar a notifIcação semanalmente com repeatfrequency
  async function handleWeekly() {
    const date = new Date(Date.now());

    date.setMinutes(date.getMinutes() + 1);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.WEEKLY
    }
    await notifee.createTriggerNotification({
      title: 'Lembrete - React native',
      body: 'Estude semanalmente ',
      android: {
        channelId: 'lambrete',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default'
        }
      }
    }, trigger)

  }
  return (

    <View style={styles.container}>
      <Text>Notificações APP</Text>
      <Button title='Enviar notificação' onPress={handleNoticate} />
      <Button title='Agendar notificação' onPress={handleNewNotification} />
      <Button title='Listar notificações' onPress={handleListNotifications} />
      <Button title='Cancelar  notificações' onPress={handleCancelNotifications} />
      <Button title='Agendar semanalmente' onPress={handleWeekly} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});
