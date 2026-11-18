# EducaMente

App mobile (React Native + Expo SDK 58) de apoio à saúde mental de estudantes,
com back-end em Node.js + MySQL.

Para instalar e rodar o projeto, veja o [README.md](README.md).

---

## Convenções do código

- **Uma tela por arquivo** em `screens/`; componentes reutilizáveis em `components/`.
- **Cores, espaçamentos, toque e sombras** sempre de `styles/theme.js`
  (`COLORS`, `SPACING`, `SIZES`, `TOUCH`, `SHADOW`) — nada de valores soltos.
- **Ícones** só do `components/IconSet.js` (SVG). Nada de PNG para ícone nem emoji.
- **Áreas tocáveis** usam `components/PressableScale.js`, com alvo mínimo `TOUCH.min` (44pt).
- **Toda tela** fica dentro de `SafeAreaView` (`react-native-safe-area-context`).
- **Rotas** estão em `navigation/AppNavigator.js`; navegar com `navigation.navigate("Nome")`.
- **Sem comentários** no código.
- **Nunca** criar `package.json`, `.git` ou `node_modules` em subpastas além de `backend/`.
- **Commits** são feitos só pelo dono do repositório — não commitar; lembrar de commitar.
