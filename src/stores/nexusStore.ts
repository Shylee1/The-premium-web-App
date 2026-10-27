import { create } from 'zustand';

export type PanelType = 
  | 'none' 
  | 'chat' 
  | 'architecture' 
  | 'capabilities' 
  | 'benchmarks' 
  | 'pricing' 
  | 'waitlist' 
  | 'admin';

export type AGiState = 'idle' | 'thinking' | 'speaking' | 'error';
export type CoreMode = 'baseline' | 'inference' | 'synthesis' | 'hyper';

interface TelemetryData {
  activePathways: string;
  inferenceLatency: string;
  coherence: string;
  globalNodes: string;
}

interface NexusState {
  activePanel: PanelType;
  agiState: AGiState;
  coreMode: CoreMode;
  isBooted: boolean;
  isImmersive: boolean;
  telemetry: TelemetryData;
  excitationLevel: number;
  
  // Actions
  setActivePanel: (panel: PanelType) => void;
  setAGiState: (state: AGiState) => void;
  setCoreMode: (mode: CoreMode) => void;
  setBooted: (booted: boolean) => void;
  toggleImmersive: () => void;
  triggerExcitation: () => void;
}

export const useNexusStore = create<NexusState>((set) => ({
  activePanel: 'none',
  agiState: 'idle',
  coreMode: 'baseline',
  isBooted: true, // Immediate start, zero fake boot delays
  isImmersive: false,
  excitationLevel: 0,
  telemetry: {
    activePathways: '4.82B',
    inferenceLatency: '1.42ms',
    coherence: '99.994%',
    globalNodes: '158 clusters',
  },

  setActivePanel: (panel) => set({ activePanel: panel }),
  setAGiState: (state) => set({ agiState: state }),
  setCoreMode: (mode) => {
    let telemetryUpdates: TelemetryData;
    switch (mode) {
      case 'inference':
        telemetryUpdates = {
          activePathways: '12.4B',
          inferenceLatency: '0.84ms',
          coherence: '99.998%',
          globalNodes: '384 clusters',
        };
        break;
      case 'synthesis':
        telemetryUpdates = {
          activePathways: '48.9B',
          inferenceLatency: '0.41ms',
          coherence: '99.999%',
          globalNodes: '812 clusters',
        };
        break;
      case 'hyper':
        telemetryUpdates = {
          activePathways: '124.6B',
          inferenceLatency: '0.12ms',
          coherence: '100.000%',
          globalNodes: '1,420 clusters',
        };
        break;
      default:
        telemetryUpdates = {
          activePathways: '4.82B',
          inferenceLatency: '1.42ms',
          coherence: '99.994%',
          globalNodes: '158 clusters',
        };
    }
    set({ coreMode: mode, telemetry: telemetryUpdates });
  },
  setBooted: (booted) => set({ isBooted: booted }),
  toggleImmersive: () => set((state) => ({ isImmersive: !state.isImmersive })),
  triggerExcitation: () => {
    set((state) => ({ excitationLevel: state.excitationLevel + 1 }));
  },
}));
