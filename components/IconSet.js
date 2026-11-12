import Svg, { Path, Circle, Rect, Line } from "react-native-svg";
import { COLORS } from "../styles/theme";

// Conjunto de ícones próprios do EducaMente, desenhados em SVG (react-native-svg).
//
// Todos seguem o mesmo grid de 24x24, traço entre 1.5 e 2.0 (padrão 1.8) e
// pontas arredondadas, pra manterem a mesma "voz" visual do resto do app.
// Desenho de linha, sem detalhe miúdo: no tamanho de uso (18 a 26pt) só a
// silhueta sobrevive.
//
// Props comuns a todos os ícones:
//   size   — lado do quadrado em pt (default 24)
//   color  — cor do traço (default cinza de texto secundário)
//   filled — quando true, a silhueta principal recebe um preenchimento suave
//            da própria cor (usado, por exemplo, na aba ativa da BottomTabBar)

const DEFAULT_SIZE = 24;
const STROKE_WIDTH = 1.8;
const FILL_OPACITY = 0.16;

function Frame({ size = DEFAULT_SIZE, children }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );
}

// Props de traço compartilhadas por todos os desenhos
function stroke(color, width = STROKE_WIDTH) {
  return {
    stroke: color,
    strokeWidth: width,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
}

// Preenchimento suave da silhueta principal quando o ícone está "ativo"
function body(color, filled) {
  return {
    fill: filled ? color : "none",
    fillOpacity: filled ? FILL_OPACITY : 0,
  };
}

export function HomeIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M12 3.1 3.4 10.4a1 1 0 0 0-.4.8V20a1 1 0 0 0 1 1h5v-6.2h6V21h5a1 1 0 0 0 1-1v-8.8a1 1 0 0 0-.4-.8Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
    </Frame>
  );
}

export function CalendarIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Rect x={3} y={5} width={18} height={16} rx={4} {...body(color, filled)} {...stroke(color)} />
      <Line x1={8} y1={2.8} x2={8} y2={7} {...stroke(color)} />
      <Line x1={16} y1={2.8} x2={16} y2={7} {...stroke(color)} />
      <Line x1={3} y1={10} x2={21} y2={10} {...stroke(color)} />
    </Frame>
  );
}

export function ChatIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M20.5 11.6c0 4.1-3.8 7.4-8.5 7.4a9.9 9.9 0 0 1-2.7-.36L4.6 21l1.3-3.5A7 7 0 0 1 3.5 11.6C3.5 7.5 7.3 4.2 12 4.2s8.5 3.3 8.5 7.4Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
    </Frame>
  );
}

export function HeartIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M12 20.4S4.3 15.6 4.3 10.5A4.5 4.5 0 0 1 12 7.3a4.5 4.5 0 0 1 7.7 3.2c0 5.1-7.7 9.9-7.7 9.9Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
    </Frame>
  );
}

export function ProfileIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Circle cx={12} cy={8.4} r={3.9} {...body(color, filled)} {...stroke(color)} />
      <Path
        d="M4.4 20.4c0-3.7 3.4-5.9 7.6-5.9s7.6 2.2 7.6 5.9"
        {...stroke(color)}
      />
    </Frame>
  );
}

// "User" é o rosto do canal identificado — mesma família do ProfileIcon,
// mas dentro de um círculo, pra ler como "identidade revelada"
export function UserIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Circle cx={12} cy={12} r={9} {...body(color, filled)} {...stroke(color)} />
      <Circle cx={12} cy={10} r={3.1} {...stroke(color)} />
      <Path d="M6.3 19.2c.6-2.6 2.9-4 5.7-4s5.1 1.4 5.7 4" {...stroke(color)} />
    </Frame>
  );
}

// Máscara de baile (domino) — canal anônimo
export function MaskIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M3.2 8.3c5.8-2 11.8-2 17.6 0v3.1a4.6 4.6 0 0 1-4.6 4.6h-.7a2.4 2.4 0 0 1-2-1.1L12 12.6l-1.5 2.3a2.4 2.4 0 0 1-2 1.1h-.7a4.6 4.6 0 0 1-4.6-4.6Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
      <Circle cx={8.3} cy={10.7} r={1.15} fill={color} />
      <Circle cx={15.7} cy={10.7} r={1.15} fill={color} />
    </Frame>
  );
}

export function BackIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Path d="M20 12H4.6" {...stroke(color)} />
      <Path d="M11 5.5 4.5 12 11 18.5" {...stroke(color)} />
    </Frame>
  );
}

export function EyeIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M2.6 12S6.1 5.9 12 5.9 21.4 12 21.4 12 17.9 18.1 12 18.1 2.6 12 2.6 12Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
      <Circle cx={12} cy={12} r={3} {...stroke(color)} />
    </Frame>
  );
}

export function EyeOffIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Path
        d="M2.6 12S6.1 5.9 12 5.9 21.4 12 21.4 12 17.9 18.1 12 18.1 2.6 12 2.6 12Z"
        {...stroke(color)}
      />
      <Circle cx={12} cy={12} r={3} {...stroke(color)} />
      <Line x1={4} y1={20} x2={20} y2={4} {...stroke(color)} />
    </Frame>
  );
}

export function CheckIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Path d="M4.6 12.6 9.4 17.4 19.4 7.3" {...stroke(color, 2)} />
    </Frame>
  );
}

export function BellIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M18 9.2a6 6 0 0 0-12 0c0 5.5-2.2 7-2.2 7h16.4S18 14.7 18 9.2Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
      <Path d="M13.8 19.4a2.1 2.1 0 0 1-3.6 0" {...stroke(color)} />
    </Frame>
  );
}

export function EditIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M4.5 19.5v-3.2L16.3 4.5a2.2 2.2 0 0 1 3.2 3.1L7.7 19.5Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
      <Path d="M14.6 6.3 17.7 9.4" {...stroke(color)} />
    </Frame>
  );
}

export function SaveIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M4.6 6.6a2 2 0 0 1 2-2h8.8l4 4v8.8a2 2 0 0 1-2 2H6.6a2 2 0 0 1-2-2Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
      <Path d="M8.6 19.4v-5.2h6.8v5.2" {...stroke(color)} />
    </Frame>
  );
}

// Grupo de alunos — usado no portal pedagógico
export function TurmasIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Circle cx={9.2} cy={8.2} r={3.2} {...body(color, filled)} {...stroke(color)} />
      <Path
        d="M2.9 19.6c0-3.3 2.9-5.1 6.3-5.1s6.3 1.8 6.3 5.1"
        {...stroke(color)}
      />
      <Path d="M16.6 5.7a3.2 3.2 0 0 1 0 5.6" {...stroke(color)} />
      <Path d="M18 14.9c2.1.6 3.5 2 3.5 4.2" {...stroke(color)} />
    </Frame>
  );
}

// Agenda do educador — calendário com confirmação
export function AgendaIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Rect x={3} y={5} width={18} height={16} rx={4} {...body(color, filled)} {...stroke(color)} />
      <Line x1={8} y1={2.8} x2={8} y2={7} {...stroke(color)} />
      <Line x1={16} y1={2.8} x2={16} y2={7} {...stroke(color)} />
      <Line x1={3} y1={10} x2={21} y2={10} {...stroke(color)} />
      <Path d="M8.4 14.8 10.8 17.2 15.6 12.4" {...stroke(color)} />
    </Frame>
  );
}

export function MensagensIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Rect x={2.8} y={5.2} width={18.4} height={13.6} rx={3} {...body(color, filled)} {...stroke(color)} />
      <Path d="M3.6 7.6 12 13.4 20.4 7.6" {...stroke(color)} />
    </Frame>
  );
}

export function PlusIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Line x1={12} y1={5} x2={12} y2={19} {...stroke(color, 2)} />
      <Line x1={5} y1={12} x2={19} y2={12} {...stroke(color, 2)} />
    </Frame>
  );
}

export function ChevronRightIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Path d="M9.5 5.5 16 12l-6.5 6.5" {...stroke(color)} />
    </Frame>
  );
}

export function ChevronLeftIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Path d="M14.5 5.5 8 12l6.5 6.5" {...stroke(color)} />
    </Frame>
  );
}

export function CloseIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Line x1={5.5} y1={5.5} x2={18.5} y2={18.5} {...stroke(color, 2)} />
      <Line x1={18.5} y1={5.5} x2={5.5} y2={18.5} {...stroke(color, 2)} />
    </Frame>
  );
}

export function LogoutIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Path
        d="M14.5 17.6v1.7a1.7 1.7 0 0 1-1.7 1.7H5.6a1.7 1.7 0 0 1-1.7-1.7V4.7A1.7 1.7 0 0 1 5.6 3h7.2a1.7 1.7 0 0 1 1.7 1.7v1.7"
        {...stroke(color)}
      />
      <Path d="M17.8 8.4 21.4 12l-3.6 3.6" {...stroke(color)} />
      <Line x1={9.6} y1={12} x2={21.4} y2={12} {...stroke(color)} />
    </Frame>
  );
}

export function SettingsIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Line x1={3.5} y1={9} x2={6.2} y2={9} {...stroke(color)} />
      <Line x1={11.8} y1={9} x2={20.5} y2={9} {...stroke(color)} />
      <Circle cx={9} cy={9} r={2.6} {...body(color, filled)} {...stroke(color)} />
      <Line x1={3.5} y1={15} x2={12.2} y2={15} {...stroke(color)} />
      <Line x1={17.8} y1={15} x2={20.5} y2={15} {...stroke(color)} />
      <Circle cx={15} cy={15} r={2.6} {...body(color, filled)} {...stroke(color)} />
    </Frame>
  );
}

export function ClockIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Circle cx={12} cy={12} r={8.6} {...body(color, filled)} {...stroke(color)} />
      <Path d="M12 6.8V12.3l3.4 2" {...stroke(color)} />
    </Frame>
  );
}

export function AlertIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path d="M12 3.9 21.3 20H2.7Z" {...body(color, filled)} {...stroke(color)} />
      <Line x1={12} y1={10} x2={12} y2={14.4} {...stroke(color)} />
      <Circle cx={12} cy={17.2} r={1.05} fill={color} />
    </Frame>
  );
}

// Histórico — relógio com seta de "voltar no tempo"
export function HistoryIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path d="M3.9 12a8.1 8.1 0 1 0 2.4-5.7" {...stroke(color)} />
      <Path d="M3.4 4.2v3.9h3.9" {...stroke(color)} />
      <Path d="M12 7.6v4.7l3.2 1.9" {...stroke(color)} />
    </Frame>
  );
}

export function SendIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path d="M21 3 3 10.4l7.4 3.2L13.6 21Z" {...body(color, filled)} {...stroke(color)} />
      <Path d="M21 3 10.4 13.6" {...stroke(color)} />
    </Frame>
  );
}

export function TrashIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Path d="M4.5 6.6h15" {...stroke(color)} />
      <Path
        d="M9.4 6.6V4.9a1.4 1.4 0 0 1 1.4-1.4h2.4a1.4 1.4 0 0 1 1.4 1.4v1.7"
        {...stroke(color)}
      />
      <Path
        d="M6.4 6.6 7.3 19a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.9-12.4"
        {...stroke(color)}
      />
    </Frame>
  );
}

export function LockIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Rect x={4.5} y={10} width={15} height={10.5} rx={2.6} {...body(color, filled)} {...stroke(color)} />
      <Path d="M8.1 10V7.7a3.9 3.9 0 0 1 7.8 0V10" {...stroke(color)} />
    </Frame>
  );
}

export function SearchIcon({ size, color = COLORS.textGray }) {
  return (
    <Frame size={size}>
      <Circle cx={10.8} cy={10.8} r={6.6} {...stroke(color)} />
      <Path d="M15.6 15.6 20.4 20.4" {...stroke(color)} />
    </Frame>
  );
}

// Conteúdo educativo (Autocuidado)
export function BookIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Path
        d="M4 5.4A2.4 2.4 0 0 1 6.4 3H19.4v14.6H6.4A2.4 2.4 0 0 0 4 20Z"
        {...body(color, filled)}
        {...stroke(color)}
      />
      <Path d="M4 20a2.4 2.4 0 0 1 2.4-2.4H19.4V21H6.4A2.4 2.4 0 0 1 4 20Z" {...stroke(color)} />
    </Frame>
  );
}

// Check-in emocional
export function SmileIcon({ size, color = COLORS.textGray, filled = false }) {
  return (
    <Frame size={size}>
      <Circle cx={12} cy={12} r={8.7} {...body(color, filled)} {...stroke(color)} />
      <Circle cx={9.2} cy={10.2} r={1.15} fill={color} />
      <Circle cx={14.8} cy={10.2} r={1.15} fill={color} />
      <Path d="M8.3 14.4a4.6 4.6 0 0 0 7.4 0" {...stroke(color)} />
    </Frame>
  );
}

// Mapa nome -> componente, pra telas que escolhem o ícone por dado
// (ex.: grid 2x2 do portal pedagógico)
export const ICONS = {
  home: HomeIcon,
  calendar: CalendarIcon,
  chat: ChatIcon,
  heart: HeartIcon,
  profile: ProfileIcon,
  user: UserIcon,
  mask: MaskIcon,
  back: BackIcon,
  eye: EyeIcon,
  eyeOff: EyeOffIcon,
  check: CheckIcon,
  bell: BellIcon,
  edit: EditIcon,
  save: SaveIcon,
  turmas: TurmasIcon,
  agenda: AgendaIcon,
  mensagens: MensagensIcon,
  plus: PlusIcon,
  chevronRight: ChevronRightIcon,
  chevronLeft: ChevronLeftIcon,
  close: CloseIcon,
  logout: LogoutIcon,
  settings: SettingsIcon,
  clock: ClockIcon,
  alert: AlertIcon,
  history: HistoryIcon,
  send: SendIcon,
  trash: TrashIcon,
  lock: LockIcon,
  search: SearchIcon,
  book: BookIcon,
  smile: SmileIcon,
};

// Uso: <Icon name="turmas" size={26} color={COLORS.primary} filled />
export default function Icon({ name, ...props }) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component {...props} />;
}
