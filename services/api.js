import { NativeModules, Platform } from "react-native";
import Constants from "expo-constants";

// Endereço do back-end (Node/Express).
//
// O IP da máquina na rede muda com frequência (Wi-Fi de casa, da escola, do
// celular), e "localhost" não funciona quando o app roda no celular — lá
// "localhost" é o próprio aparelho. Em vez de deixar o IP fixo aqui, pegamos o
// host do próprio bundler do Expo: é exatamente a máquina que está servindo o
// app, ou seja, a mesma que roda o `node server.js`.
//
// Se precisar apontar para outro servidor, preencha IP_MANUAL abaixo.
const IP_MANUAL = ""; // ex.: "192.168.1.169"
const PORTA = 3000; // mesma porta do backend/server.js

// Extrai só o host de "http://192.168.1.169:8081/index.bundle" ou de
// "192.168.1.169:8081" (formato do hostUri do Expo)
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

  // 1) hostUri do Expo — é o endereço pelo qual este aparelho baixou o app.
  //    Caminho oficial e o que funciona no SDK 54 com a nova arquitetura.
  const hostExpo = hostDaURL(
    Constants.expoConfig?.hostUri ??
      Constants.expoGoConfig?.debuggerHost ??
      Constants.manifest2?.extra?.expoGo?.debuggerHost
  );
  if (hostExpo) return hostExpo;

  // 2) scriptURL do SourceCode — funciona na arquitetura antiga
  const hostNativo = hostDaURL(NativeModules?.SourceCode?.scriptURL);
  if (hostNativo) return hostNativo;

  // 3) Último recurso: o emulador Android enxerga a máquina host em 10.0.2.2;
  //    em qualquer outro caso, localhost (simulador iOS e web).
  return Platform.OS === "android" ? "10.0.2.2" : "localhost";
}

export const API_URL = IP_MANUAL
  ? `http://${IP_MANUAL}:${PORTA}`
  : `http://${hostDoServidor()}:${PORTA}`;

// Aparece no terminal do `npx expo start` assim que o app abre — é por aqui que
// se descobre que o celular está chamando o endereço errado.
if (__DEV__) {
  console.log("[EducaMente] API_URL =", API_URL);
}
