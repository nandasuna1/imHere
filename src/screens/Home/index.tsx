import { useState } from "react";
import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant } from "../../../components/Participant";
import { styles } from "./styles";


export default function Home() {

  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante existe", "Já existe um participante com esse nome")
    }
    if(!participantName.length) {
      return Alert.alert("Nome invalido", "Insira o nome do participante para adiciona-lo")
    }
    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string){
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: "Não",
        style: "cancel"
      }
    ])
  }


  return (
    <View style={styles.container}>
        <Text style={styles.eventName}>
        Nome do evento
        </Text>
        <Text style={styles.eventDate}>
            Dias 25 à 27 de novembro de 2022
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Nome do participante'
            placeholderTextColor='#6b6b6b'
            onChangeText={e => setParticipantName(e)}
            value={participantName}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleParticipantAdd()}
            >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={participants}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.listEmpty}>
              Ninguem chegou no evento ainda? adicione participantes a sua lista de presença.
            </Text>
          )}
        />

    </View>
  )
}
