import React, { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.68.59:5005';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const handleSendInput = async () => {
    try {
      const response = await axios.post(`${API_URL}/input`, {
        username: 'danibalcells',
        input: userInput,
      });

      setQuestions(response.data.questions);
    } catch (err) {
      setError('Error connecting to the server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={userInput}
        onChangeText={setUserInput}
        style={styles.input}
        placeholder="What's on your mind?"
      />
      <Button title="Send" onPress={handleSendInput} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ScrollView>
        {questions.map((q, index) => (
          <Text key={index} style={styles.question}>
            {q}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default App;
