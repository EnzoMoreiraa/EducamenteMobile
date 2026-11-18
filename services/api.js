import { NativeModules, Platform } from "react-native";
import Constants from "expo-constants";

const IP_MANUAL = "";
const PORTA = 3000;

function hostDaURL(valor) {
  if (!valor) return null;
  const semProtocolo = valor.includes("://") ? valor.split("://")[1] : valor;
  const host = semProtocolo.split("/")[0].split(":")[0];
  if (!host || host === "localhost" || host === "127.0.0.1") return null;
  return host;
}

function hostDoServidor() {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.location.hostname;
  }

  const hostExpo = hostDaURL(
    Constants.expoConfig?.hostUri ??
      Constants.expoGoConfig?.debuggerHost ??
      Constants.manifest2?.extra?.expoGo?.debuggerHost
  );
  if (hostExpo) return hostExpo;

  const hostNativo = hostDaURL(NativeModules?.SourceCode?.scriptURL);
  if (hostNativo) return hostNativo;

  return Platform.OS === "android" ? "10.0.2.2" : "localhost";
}

export const API_URL = IP_MANUAL
  ? `http://${IP_MANUAL}:${PORTA}`
  : `http://${hostDoServidor()}:${PORTA}`;

if (__DEV__) {
  console.log("[EducaMente] API_URL =", API_URL);
}
