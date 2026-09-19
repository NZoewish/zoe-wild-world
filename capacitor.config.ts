import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zoe.wildworld',
  appName: "Zoe's Wild World",
  webDir: 'public',
  server: {
    // In production, point this to your Render hosted URL so Zoe gets live animal updates on iOS without recompiling!
    // url: 'https://zoe-wild-world.onrender.com',
    cleartext: true,
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#080d1a',
      showSpinner: false
    }
  }
};

export default config;
