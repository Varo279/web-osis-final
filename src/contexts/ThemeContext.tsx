import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  'muted-foreground': string;
  card: string;
  'card-foreground': string;
  border: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

export const defaultThemes: Theme[] = [
  {
    id: 'default',
    name: 'Default Blue',
    colors: {
      primary: '221 83% 53%',
      secondary: '210 40% 96%',
      accent: '199 89% 48%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      muted: '210 40% 96.1%',
      'muted-foreground': '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      'card-foreground': '222.2 84% 4.9%',
      border: '214.3 31.8% 91.4%',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: {
      primary: '199 89% 48%',
      secondary: '197 37% 24%',
      accent: '174 72% 56%',
      background: '200 20% 98%',
      foreground: '222.2 84% 4.9%',
      muted: '200 25% 95%',
      'muted-foreground': '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      'card-foreground': '222.2 84% 4.9%',
      border: '200 20% 90%',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    colors: {
      primary: '24 95% 53%',
      secondary: '45 93% 47%',
      accent: '359 75% 57%',
      background: '30 20% 98%',
      foreground: '222.2 84% 4.9%',
      muted: '30 25% 95%',
      'muted-foreground': '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      'card-foreground': '222.2 84% 4.9%',
      border: '30 20% 90%',
    },
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: '142 71% 45%',
      secondary: '140 50% 30%',
      accent: '88 50% 53%',
      background: '140 15% 98%',
      foreground: '222.2 84% 4.9%',
      muted: '140 20% 95%',
      'muted-foreground': '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      'card-foreground': '222.2 84% 4.9%',
      border: '140 18% 90%',
    },
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    colors: {
      primary: '262 83% 58%',
      secondary: '270 50% 40%',
      accent: '280 75% 60%',
      background: '270 15% 98%',
      foreground: '222.2 84% 4.9%',
      muted: '270 20% 95%',
      'muted-foreground': '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      'card-foreground': '222.2 84% 4.9%',
      border: '270 18% 90%',
    },
  },
  {
    id: 'crimson',
    name: 'Crimson Red',
    colors: {
      primary: '348 83% 47%',
      secondary: '0 65% 51%',
      accent: '15 75% 57%',
      background: '0 15% 98%',
      foreground: '222.2 84% 4.9%',
      muted: '0 20% 95%',
      'muted-foreground': '215.4 16.3% 46.9%',
      card: '0 0% 100%',
      'card-foreground': '222.2 84% 4.9%',
      border: '0 18% 90%',
    },
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
  addCustomTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themes, setThemes] = useState<Theme[]>(() => {
    const saved = localStorage.getItem('custom-themes');
    return saved ? [...defaultThemes, ...JSON.parse(saved)] : defaultThemes;
  });

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('current-theme');
    if (saved) {
      const savedTheme = JSON.parse(saved);
      return savedTheme;
    }
    return defaultThemes[0];
  });

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    localStorage.setItem('current-theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

  const addCustomTheme = (theme: Theme) => {
    const customThemes = themes.filter(t => !defaultThemes.find(dt => dt.id === t.id));
    const newCustomThemes = [...customThemes, theme];
    setThemes([...defaultThemes, ...newCustomThemes]);
    localStorage.setItem('custom-themes', JSON.stringify(newCustomThemes));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, themes, addCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
