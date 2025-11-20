import { useState } from 'react';
import { Palette, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme, Theme, ThemeColors } from '@/contexts/ThemeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ThemeCustomizer = () => {
  const { currentTheme, setTheme, themes, addCustomTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [customTheme, setCustomTheme] = useState<Theme>({
    id: 'custom-' + Date.now(),
    name: 'Custom Theme',
    colors: { ...currentTheme.colors },
  });

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setCustomTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const handleSaveCustomTheme = () => {
    const themeToSave = {
      ...customTheme,
      id: 'custom-' + Date.now(),
    };
    addCustomTheme(themeToSave);
    setTheme(themeToSave);
  };

  const hslToHex = (hsl: string) => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v));
    const hDecimal = h / 360;
    const sDecimal = s / 100;
    const lDecimal = l / 100;
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (sDecimal === 0) {
      r = g = b = lDecimal;
    } else {
      const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal;
      const p = 2 * lDecimal - q;
      r = hue2rgb(p, q, hDecimal + 1/3);
      g = hue2rgb(p, q, hDecimal);
      b = hue2rgb(p, q, hDecimal - 1/3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0 0% 0%';
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow z-50 bg-gradient-hero text-white hover:scale-110 hover:rotate-12 transition-all duration-500 animate-glow border-0"
        >
          <Palette className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Kustomisasi Tema
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Tema Preset</TabsTrigger>
            <TabsTrigger value="custom">Buat Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {themes.map((theme) => (
                <Card
                  key={theme.id}
                  className={`group p-4 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-glow ${
                    currentTheme.id === theme.id ? 'ring-2 ring-primary shadow-glow scale-105' : ''
                  }`}
                  onClick={() => setTheme(theme)}
                >
                  <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{theme.name}</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(theme.colors).slice(0, 5).map(([key, value]) => (
                      <div
                        key={key}
                        className="aspect-square rounded border group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `hsl(${value})` }}
                        title={key}
                      />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="theme-name">Nama Tema</Label>
                <Input
                  id="theme-name"
                  value={customTheme.name}
                  onChange={(e) => setCustomTheme({ ...customTheme, name: e.target.value })}
                  placeholder="Tema Kustom Saya"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(customTheme.colors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="capitalize">
                      {key.replace(/-/g, ' ')}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id={key}
                        type="color"
                        value={hslToHex(value)}
                        onChange={(e) => handleColorChange(key as keyof ThemeColors, hexToHsl(e.target.value))}
                        className="w-20 h-10"
                      />
                      <Input
                        value={value}
                        onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                        placeholder="0 0% 0%"
                        className="flex-1"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveCustomTheme} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Simpan Tema
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCustomTheme({ ...customTheme, colors: { ...currentTheme.colors } })}
                >
                  Reset
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeCustomizer;
