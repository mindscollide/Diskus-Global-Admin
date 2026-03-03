import Paho from "paho-mqtt";
// import { setClient } from "../../store/actions/Auth2_actions";
import Helper from "./historyLogout";
import { decrypt } from "./Regex";
import { setClient } from "../../store/ActionsSlicers/RealtimeSlicer";
let newClient;

export const onConnected = (newClient, subscribeID) => {
  console.log("Connected to MQTT broker onConnected");
  if (newClient.isConnected()) {
    newClient.subscribe(subscribeID.toString());
  } else {
    console.log("WebSocket is not in OPEN state for subscription.");
  }
};
export const onConnectionLost = (subscribeID) => {
  console.log("Connected to MQTT broker onConnectionLost");
  setTimeout(mqttConnection(subscribeID), 3000);
};

export const mqttConnection = (subscribeID, dispatch) => {
  try {
    if (newClient && newClient.isConnected()) {
      console.log("MQTT client already connected");
      return;
    }

    const min = 10000;
    const max = 90000;
    const id = min + Math.random() * (max - min);
    const clientId = `${subscribeID}-${id}`;
    // Construct the correct broker URL

    if (process.env.REACT_APP_ENV === "dev") {
      newClient = new Paho.Client("192.168.18.243", 8228, clientId);
    } else {
      const brokerUrl = `wss://${process.env.REACT_APP_MQTT}:${process.env.REACT_APP_MQTT_PORT}/mqtt`;

      newClient = new Paho.Client(brokerUrl, clientId);
    }
    const options = {
      onSuccess: () => {
        console.log("Connected to MQTT broker");
        onConnected(newClient, subscribeID);
      },

      onFailure: () => {
        console.log("Connected to MQTT broker onFailedConnect");
        setTimeout(onConnectionLost(subscribeID), 6000);
      },
      keepAliveInterval: 30,
      reconnect: true, // Enable automatic reconnect
      userName: decrypt(
        process.env.REACT_APP_MQTT_User,
        process.env.REACT_APP_SECERETKEY
      ),
      password: decrypt(
        process.env.REACT_APP_MQTT_Pass,
        process.env.REACT_APP_SECERETKEY
      ),
    };
    newClient.connect(options);

    Helper.socket = newClient;

    dispatch(
      setClient({
        clientId: newClient.clientId,
        isConnected: newClient.isConnected(),
      })
    );
  } catch (error) {
    console.log("Error checking MQTT client connection:", error);
  }
};
