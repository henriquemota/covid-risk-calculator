import React from 'react'
import axios from 'axios'
import { View, Text, Modal, ScrollView, FlatList } from 'react-native'
import { List, Switch, Button } from 'react-native-paper'

export default function Home(props) {
  const [exibir, setExibir] = React.useState(false)
  const [resultado, setResultado] = React.useState('')
  const [unidades, setUnidades] = React.useState([])
  const [questionario, setQuestionario] = React.useState({
    item01_1: false,
    item01_2: false,
    item01_3: false,
    item01_4: false,
    item01_5: false,
    item03_1: false,
    item05_1: false,
    item10_1: false,
    item10_2: false,
  })

  function calcular() {
    let pontos = 0
    Object.keys(questionario).forEach((e) => {
      if (questionario[e] === true) pontos = pontos + parseInt(e.substr(4, 2))
    })
    if (pontos <= 0) setResultado('')
    else if (pontos <= 9) setResultado('Baixo risco')
    else if (pontos <= 19) {
      listarUnidades()
      setResultado('Médio risco')
      setExibir(true)
    } else {
      listarUnidades()
      setResultado('Alto risco')
      setExibir(true)
    }
  }

  function alterarValor(nome, value) {
    setQuestionario({ ...questionario, [nome]: value })
  }

  function listarUnidades() {
    axios
      .get(``)
      .then((res) => {
        let data = Object.entries(res.data).map((e) => {
          return { id: e[0], ...e[1] }
        })
        setUnidades(data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgb(45,45,55)',
      }}
    >
      <Modal visible={exibir} animationType='slide' transparent={true}>
        <View
          style={{
            flex: 1,
            margin: 20,
            padding: 10,
            paddingTop: 20,
            backgroundColor: 'rgba(200,200,200,0.95)',
            borderWidth: 2,
            borderColor: '#f3f3f3',
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Lista de unidades de saúde
          </Text>
          <FlatList
            data={unidades}
            refreshing={false}
            onRefresh={listarUnidades}
            renderItem={({ item }) => (
              <List.Item
                title={item.nome}
                description={`${item.endereco} - ${item.telefone}`}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <Button mode='contained' onPress={() => setExibir(false)}>
            Fechar
          </Button>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: 'rgb(102,70,238)',
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
          paddingTop: 30,
          borderBottomStartRadius: 15,
          borderBottomEndRadius: 15,
        }}
      >
        <Text
          style={{
            color: '#f3f3f3',
            textAlign: 'center',
            fontSize: 30,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Calculador de Risco da COVID-19
        </Text>
      </View>
      <ScrollView style={{ marginLeft: 20, marginRight: 20 }}>
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Dor de cabeça'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item01_1}
              onValueChange={(e) => alterarValor('item01_1', e)}
            />
          )}
        />
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Secreção nasal ou espirros'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item01_2}
              onValueChange={(e) => alterarValor('item01_2', e)}
            />
          )}
        />
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Irritação na garganta'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item01_3}
              onValueChange={(e) => alterarValor('item01_3', e)}
            />
          )}
        />
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Dores no corpo'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item01_4}
              onValueChange={(e) => alterarValor('item01_4', e)}
            />
          )}
        />
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Diarreia'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item01_5}
              onValueChange={(e) => alterarValor('item01_5', e)}
            />
          )}
        />
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Tosse seca'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item03_1}
              onValueChange={(e) => alterarValor('item03_1', e)}
            />
          )}
        />
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Febre'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item05_1}
              onValueChange={(e) => alterarValor('item05_1', e)}
            />
          )}
        />
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Falta de ar ou dificuldade respiratória'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item10_1}
              onValueChange={(e) => alterarValor('item10_1', e)}
            />
          )}
        />
        <List.Item
          titleStyle={{ color: '#f3f3f3' }}
          descriptionStyle={{ color: '#f3f3f3' }}
          title='Contato com caso confirmado de COVID-19'
          description=''
          left={(props) => (
            <Switch
              {...props}
              value={questionario.item10_2}
              onValueChange={(e) => alterarValor('item10_2', e)}
            />
          )}
        />
        <Button
          mode='contained'
          onPress={calcular}
          style={{ marginBottom: 10, marginTop: 10 }}
        >
          Calcular
        </Button>
      </ScrollView>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          marginTop: 10,
          marginBottom: 40,
          color: '#f3f3f3',
        }}
      >
        {resultado}
      </Text>
    </View>
  )
}
