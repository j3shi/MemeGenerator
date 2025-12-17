import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchMemes } from './api/memeApi';
import { Meme } from './types/meme';

export default function App() {
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetRandomMeme = async () => {
    setLoading(true)
    const allMemes = await fetchMemes()

    if (allMemes.length > 0) {
      const randomIndex = Math.floor(Math.random() * allMemes.length)
      setCurrentMeme(allMemes[randomIndex])
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meme Roulette</Text>

      <View style={styles.memeBox}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : currentMeme ? (
          <View style={styles.memeContent}>
            <Image source={{ uri: currentMeme.url }} style={styles.memeImage} />
            <Text style={styles.memeName}>{currentMeme.name}</Text>
          </View>
        ) : (
          <Text style={styles.infoText}>Ready to laugh?</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetRandomMeme}>
        <Text style={styles.buttonText}>GET A RANDOM MEME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 40 
  },
  memeBox: { 
    width: '100%', 
    height: 400, 
    backgroundColor: '#1e1e1e', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden', 
    marginBottom: 40, 
    borderWidth: 1, 
    borderColor: '#333' 
  },
  memeContent: { 
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    padding: 10 
  },
  memeImage: { 
    width: '100%', 
    height: '85%', 
    resizeMode: 'contain' 
  },
  memeName: { 
    color: '#fff', 
    fontSize: 18,  
    marginTop: 10, 
    textAlign: 'center', 
    fontWeight: '500' 
  },
  infoText: { 
    color: '#666', 
    fontSize: 16 
  },
  button: { 
    backgroundColor: '#BB86FC', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 30, 
    elevation: 5 
  },
  buttonText: { 
    color: '#000', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});