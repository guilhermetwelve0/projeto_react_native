import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image } from "react-native";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [partialTimes, setPartialTimes] = useState([]);

  const startTimer = () => {
    setTimerId(
      setInterval(() => {
        changeTime();
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const clear = () => {
    stopTimer();
    setSeconds(0);
    setMinutes(0);
    setPartialTimes([]);
  };

  const changeTime = () => {
    setSeconds((prevState) => {
      if (prevState + 1 === 60) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  };

  const savePartialTime = () => {
    const partialTime = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    setPartialTimes([...partialTimes, partialTime]);
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/arquivo.jpg")} />
      <Text style={styles.textTimer}>
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </Text>
      <View style={styles.buttonContainer}>
        <Button key="startButton" title="Start" onPress={startTimer} />
        <Button key="stopButton" title="Stop" onPress={stopTimer} />
        <Button key="clearButton" title="Clear" onPress={clear} />
        <Button
          key="saveButton"
          title="Salva Parcial"
          onPress={savePartialTime}
        />
        <Button
          key="clearPartialsButton"
          title="Limpa Parcial"
          onPress={() => setPartialTimes([])}
        />
      </View>
      {partialTimes.map((time, index) => (
        <Text key={index}>{time}</Text>
      ))}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textTimer: {
    fontSize: 30,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
