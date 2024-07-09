import React from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native'

const Tab = createBottomTabNavigator();
const Navegacao = createStackNavigator();

//-------------------------------------------------------------------------------------------------------------

class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
  }
  render() {
    return (
      <View style={estilo.container}>
        <View style={estilo.titulo}>
          <Text style={{fontSize: 30, color:'#EAFFFD'}}>{'DUNGEON TALES'}</Text>
        </View>
        <Text style={estilo.texto}>{'Novo nome de Usuário'}</Text>
        <TextInput
          style={estilo.entrada}
          onChangeText={(text) => this.setState({ user: text })}></TextInput>

        <Text style={estilo.texto}>{'Nova senha'}</Text>
        <TextInput
          style={estilo.entrada}
          onChangeText={(text) =>
            this.setState({ password: text })
          }></TextInput>

      <View style={{position: 'absolute', bottom: '30%', width: '30%'}}>
        <Button title={'Registrar'} onPress={() => this.reg()}></Button>
      </View>
      
      </View>
    );
  }
  reg() {
    AsyncStorage.setItem(this.state.user, this.state.password, (erro) => {
      if (erro == undefined) {
        alert('Registrado!');
      } else {
        alert('Ocorreu um erro!');
      }
    });
  }
}

//-------------------------------------------------------------------------------------------------------------

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: undefined,
      senha: undefined,
    };
  }
  render() {
    return (
      <View style={estilo.container}>
        <View style={estilo.titulo}>
          <Text style={{fontSize: 30, color:'#EAFFFD'}}>{'DUNGEON TALES'}</Text>
        </View>
        <Text style={estilo.texto}>{'Nome do Usuário'}</Text>
        <TextInput
          style={estilo.entrada}
          onChangeText={(text) => this.setState({ usuario: text })}></TextInput>

        <Text style={estilo.texto}>{'Senha'}</Text>
        <TextInput
          style={estilo.entrada}
          onChangeText={(text) => this.setState({ senha: text })}></TextInput>

      <View style={{position: 'absolute', bottom: '30%', width: '30%'}}>
        <Button title={'Login'} onPress={() => this.log()}></Button>
      </View>

      </View>
    );
  }
  log() {
    AsyncStorage.getItem(this.state.usuario, (erro, senha) => {
      if (erro == undefined && senha != null) {
        if (senha == this.state.senha) {
          alert('Bem-Vindo(a)!');
          this.props.navigation.navigate('Player');
        } else {
          alert('Senha incorreta');
        }
      } else {
        alert('Usuario não encontrado');
      }
    });
  }
}

//-------------------------------------------------------------------------------------------------------------

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomePlayer: undefined,
      skinEscolhida: null,
    };
  }
  
  render() {
    return (
      <View style={estilo.container}>

        <Text style={{position: 'absolute',bottom:'80%',fontSize: 25,color:'white'}}>{'ESCOLHA UMA CLASSE'}</Text>

        <TouchableOpacity 
          style={estilo.skinBotao3} 
          onPress={() => this.selectSkin(require('./assets/Arqueiro.png'))} 
          activeOpacity={0.5}>
          <Image style={estilo.skinImagem} source={require('./assets/Arqueiro.png')} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={estilo.skinBotao2} 
          onPress={() => this.selectSkin(require('./assets/MagoSombrio.png'))} 
          activeOpacity={0.5}>
          <Image style={estilo.skinImagem} source={require('./assets/MagoSombrio.png')} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={estilo.skinBotao1} 
          onPress={() => this.selectSkin(require('./assets/Cavaleiro.png'))} 
          activeOpacity={0.5}>
          <Image style={estilo.skinImagem} source={require('./assets/Cavaleiro.png')} />
        </TouchableOpacity>

      <View style={{position:'absolute', bottom: '40%', width: '40%'}}>
        <Button title={'JOGAR!'} onPress={() => this.telaJogo()}></Button>
      </View>

      <View style={{position:'absolute', top: '95%', left: '95%', width: '5%', height: '10%'}}>
        <Button title={'!'} onPress={() => this.segredo()}></Button>
      </View>

      </View>
    );
  }

  selectSkin(skin){
    this.setState({ skinEscolhida: skin });
  }

  telaJogo() {
    contJ = 0;
    contM = 0;
    this.props.navigation.navigate('Start', { skinEscolhida: this.state.skinEscolhida });
  }

  segredo() {
    contJ = 0;
    contM = 0;
    this.props.navigation.navigate('EasterEgg', { skinEscolhida: this.state.skinEscolhida });
  }
}

//-------------------------------------------------------------------------------------------------------------

dado_jogador1 = Math.floor(Math.random() * 99) + 1;
dado_monstro1 = Math.floor(Math.random() * 60) + 1;

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.som = new Audio.Sound();
    this.som.loadAsync(require('./assets/Gordasso_audio.mp3'));
    this.ferimento = new Audio.Sound();
    this.ferimento.loadAsync(require('./assets/Jogador_audio.mp3'));
  }

  rosnado() {
    this.som.setPositionAsync(0);
    this.som.playAsync();
  }

  dor() {
    this.ferimento.setPositionAsync(0);
    this.ferimento.playAsync();
  }

  state = {
    textValueJ: '',
    textValueM: '',
    showImage1: true,
    showImage2: true,
    showImage3: true,
    showImageMonstro1: true,
    showImageMonstro2: true,
    showImageMonstro3: true,
  };

  render() {
    return (
      <View>
        <ImageBackground
        source={require('./assets/Caverna.png')}
        style={estilo.fundo}/>
        <Image
          style={estilo.personagem}
          source={this.props.route.params.skinEscolhida}
        />

        {this.state.showImage1 && (
          <Image style={estilo.hpJ1} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImage2 && (
          <Image style={estilo.hpJ2} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImage3 && (
          <Image style={estilo.hpJ3} source={require('./assets/Vida.png')} />
        )}

        <Text style={estilo.textDadoJ}>{'A FORÇA DO SEU ATAQUE É ...'}</Text>
        <Text style={estilo.dadoJ}>{this.state.textValueJ}</Text>

        <View style={estilo.botaoDadoJ}>
          <Button title="X" onPress={() => this.combate()} />
        </View>

        <Image
          style={estilo.monstro}
          source={require('./assets/Gordasso.png')}
        />

        {this.state.showImageMonstro1 && (
          <Image style={estilo.hpM1} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImageMonstro2 && (
          <Image style={estilo.hpM2} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImageMonstro3 && (
          <Image style={estilo.hpM3} source={require('./assets/Vida.png')} />
        )}

        <Text style={estilo.textDadoM}>{'A FORÇA DO OPONENTE É ...'}</Text>
        <Text style={estilo.dadoM}>{this.state.textValueM}</Text>
        
      </View>
    );
  }

  combate() {
    this.setState({
      textValueJ: dado_jogador1,
      textValueM: dado_monstro1,
    });

    if (dado_jogador1 >= dado_monstro1) {
      contM = contM + 1;
      if (contM == 1) {
        this.setState({
          showImageMonstro1: false,
        });
        {
          this.rosnado();
        }
        dado_jogador1 = Math.floor(Math.random() * 99) + 1;
        dado_monstro1 = Math.floor(Math.random() * 60) + 1;
      }
      if (contM == 2) {
        this.setState({
          showImageMonstro2: false,
        });
        {
          this.rosnado();
        }
        dado_jogador1 = Math.floor(Math.random() * 99) + 1;
        dado_monstro1 = Math.floor(Math.random() * 60) + 1;
      }
      if (contM >= 3) {
        this.setState({
          showImageMonstro3: false,
        });
        dado_jogador1 = Math.floor(Math.random() * 99) + 1;
        dado_monstro1 = Math.floor(Math.random() * 60) + 1;
        contJ = 0;
        contM = 0;
        this.props.navigation.navigate('Fase2', { skinEscolhida: this.props.route.params.skinEscolhida });
      }
    } else {
      contJ = contJ + 1;
      if (contJ == 1) {
        this.setState({
          showImage3: false,
        });
        {
          this.dor();
        }
        dado_jogador1 = Math.floor(Math.random() * 99) + 1;
        dado_monstro1 = Math.floor(Math.random() * 60) + 1;
      }
      if (contJ == 2) {
        this.setState({
          showImage2: false,
        });
        {
          this.dor();
        }
        dado_jogador1 = Math.floor(Math.random() * 99) + 5;
        dado_monstro1 = Math.floor(Math.random() * 60) + 1;
      }
      if (contJ >= 3) {
        this.setState({
          showImage1: false,
        });
        {
          this.dor();
        }
        dado_jogador1 = Math.floor(Math.random() * 99) + 1;
        dado_monstro1 = Math.floor(Math.random() * 60) + 1;
        contJ = 0;
        contM = 0;
        this.props.navigation.navigate('GameOver');
      }
    }
  }
}

//-------------------------------------------------------------------------------------------------------------

dado_jogador2 = Math.floor(Math.random() * 200) + 50;
dado_monstro2 = Math.floor(Math.random() * 200) + 75;

class Fase2 extends React.Component {
  constructor(props) {
    super(props);
    this.som = new Audio.Sound();
    this.som.loadAsync(require('./assets/Agonia_audio.mp3'));
    this.ferimento = new Audio.Sound();
    this.ferimento.loadAsync(require('./assets/Jogador_audio.mp3'));
  }

  murmurio() {
    this.som.setPositionAsync(0);
    this.som.playAsync();
  }

  dor() {
    this.ferimento.setPositionAsync(0);
    this.ferimento.playAsync();
  }

  state = {
    textValueJ: '',
    textValueM: '',
    showImage1: true,
    showImage2: true,
    showImage3: true,
    showImageMonstro1: true,
    showImageMonstro2: true,
    showImageMonstro3: true,
  };

  render() {
    const{ skinEscolhida } = this.props.route.params;
    return (
      <View>

        <ImageBackground
        source={require('./assets/Prisao.png')}
        style={estilo.fundo}/>

        <Image
          style={estilo.personagem}
          source={skinEscolhida}
        />

        {this.state.showImage1 && (
          <Image style={estilo.hpJ1} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImage2 && (
          <Image style={estilo.hpJ2} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImage3 && (
          <Image style={estilo.hpJ3} source={require('./assets/Vida.png')} />
        )}

        <Text style={estilo.textDadoJ}>{'A FORÇA DO SEU ATAQUE É ...'}</Text>
        <Text style={estilo.dadoJ}>{this.state.textValueJ}</Text>

        <View style={estilo.botaoDadoJ}>
          <Button title="X" onPress={() => this.combate()} />
        </View>

        <Image style={estilo.monstro} source={require('./assets/Agonia.png')} />

        {this.state.showImageMonstro1 && (
          <Image style={estilo.hpM1} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImageMonstro2 && (
          <Image style={estilo.hpM2} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImageMonstro3 && (
          <Image style={estilo.hpM3} source={require('./assets/Vida.png')} />
        )}

        <Text style={estilo.textDadoM}>{'A FORÇA DO OPONENTE É ...'}</Text>
        <Text style={estilo.dadoM}>{this.state.textValueM}</Text>
      </View>
    );
  }

  combate() {
    this.setState({
      textValueJ: dado_jogador2,
      textValueM: dado_monstro2,
    });

    if (dado_jogador2 >= dado_monstro2) {
      contM = contM + 1;
      if (contM == 1) {
        this.setState({
          showImageMonstro1: false,
        });
        {
          this.murmurio();
        }
        dado_jogador2 = Math.floor(Math.random() * 200) + 50;
        dado_monstro2 = Math.floor(Math.random() * 200) + 75;
      }
      if (contM == 2) {
        this.setState({
          showImageMonstro2: false,
        });
        {
          this.murmurio();
        }
        dado_jogador2 = Math.floor(Math.random() * 200) + 50;
        dado_monstro2 = Math.floor(Math.random() * 200) + 75;
      }
      if (contM >= 3) {
        this.setState({
          showImageMonstro3: false,
        });
        dado_jogador2 = Math.floor(Math.random() * 200) + 50;
        dado_monstro2 = Math.floor(Math.random() * 200) + 75;
        contJ = 0;
        contM = 0;
        this.props.navigation.navigate('Final', { skinEscolhida: this.props.route.params.skinEscolhida });
      }
    } else {
      contJ = contJ + 1;
      if (contJ == 1) {
        this.setState({
          showImage3: false,
        });
        {
          this.dor();
        }
        dado_jogador2 = Math.floor(Math.random() * 200) + 50;
        dado_monstro2 = Math.floor(Math.random() * 200) + 75;
      }
      if (contJ == 2) {
        this.setState({
          showImage2: false,
        });
        {
          this.dor();
        }
        dado_jogador2 = Math.floor(Math.random() * 200) + 50;
        dado_monstro2 = Math.floor(Math.random() * 200) + 75;
      }
      if (contJ >= 3) {
        this.setState({
          showImage1: false,
        });
        {
          this.dor();
        }
        dado_jogador2 = Math.floor(Math.random() * 200) + 50;
        dado_monstro2 = Math.floor(Math.random() * 200) + 75;
        contJ = 0;
        contM = 0;
        this.props.navigation.navigate('GameOver');
      }
    }
  }
}

//-------------------------------------------------------------------------------------------------------------

dado_jogador3 = Math.floor(Math.random() * 250) + 50;
dado_monstro3 = Math.floor(Math.random() * 250) + 75;

class Final extends React.Component {
  constructor(props) {
    super(props);
    this.som = new Audio.Sound();
    this.som.loadAsync(require('./assets/Abert_Audio.mp3'));
    this.ferimento = new Audio.Sound();
    this.ferimento.loadAsync(require('./assets/Jogador_audio.mp3'));
  }

  grito() {
    this.som.setPositionAsync(0);
    this.som.playAsync();
  }

  dor() {
    this.ferimento.setPositionAsync(0);
    this.ferimento.playAsync();
  }

  state = {
    textValueJ: '',
    textValueM: '',
    showImage1: true,
    showImage2: true,
    showImage3: true,
    showImageMonstro1: true,
    showImageMonstro2: true,
    showImageMonstro3: true,
  };

  render() {
    const{ skinEscolhida } = this.props.route.params;
    return (
      <View>

        <ImageBackground
        source={require('./assets/Templo.png')}
        style={estilo.fundo}/>

        <Image
          style={estilo.personagem}
          source={skinEscolhida}
        />

        {this.state.showImage1 && (
          <Image style={estilo.hpJ1} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImage2 && (
          <Image style={estilo.hpJ2} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImage3 && (
          <Image style={estilo.hpJ3} source={require('./assets/Vida.png')} />
        )}

        <Text style={estilo.textDadoJ}>{'A FORÇA DO SEU ATAQUE É ...'}</Text>
        <Text style={estilo.dadoJ}>{this.state.textValueJ}</Text>

        <View style={estilo.botaoDadoJ}>
          <Button title="X" onPress={() => this.combate()} />
        </View>

        <Image style={estilo.monstro} source={require('./assets/Abert.png')} />

        {this.state.showImageMonstro1 && (
          <Image style={estilo.hpM1} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImageMonstro2 && (
          <Image style={estilo.hpM2} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImageMonstro3 && (
          <Image style={estilo.hpM3} source={require('./assets/Vida.png')} />
        )}

        <Text style={estilo.textDadoM}>{'A FORÇA DO OPONENTE É ...'}</Text>
        <Text style={estilo.dadoM}>{this.state.textValueM}</Text>
      </View>
    );
  }

  combate() {
    this.setState({
      textValueJ: dado_jogador3,
      textValueM: dado_monstro3,
    });

    if (dado_jogador3 >= dado_monstro3) {
      contM = contM + 1;
      if (contM == 1) {
        this.setState({
          showImageMonstro1: false,
        });
        {
          this.grito();
        }
        dado_jogador3 = Math.floor(Math.random() * 250) + 50;
        dado_monstro3 = Math.floor(Math.random() * 250) + 75;
      }
      if (contM == 2) {
        this.setState({
          showImageMonstro2: false,
        });
        {
          this.grito();
        }
        dado_jogador3 = Math.floor(Math.random() * 250) + 50;
        dado_monstro3 = Math.floor(Math.random() * 250) + 75;
      }
      if (contM >= 3) {
        this.setState({
          showImageMonstro3: false,
        });
        dado_jogador3 = Math.floor(Math.random() * 250) + 50;
        dado_monstro3 = Math.floor(Math.random() * 250) + 75;
        contJ = 0;
        contM = 0;
        this.props.navigation.navigate('Vitoria');
      }
    } else {
      contJ = contJ + 1;
      if (contJ == 1) {
        this.setState({
          showImage3: false,
        });
        {
          this.dor();
        }
        dado_jogador3 = Math.floor(Math.random() * 250) + 50;
        dado_monstro3 = Math.floor(Math.random() * 250) + 75;
      }
      if (contJ == 2) {
        this.setState({
          showImage2: false,
        });
        {
          this.dor();
        }
        dado_jogador3 = Math.floor(Math.random() * 250) + 50;
        dado_monstro3 = Math.floor(Math.random() * 250) + 75;
      }
      if (contJ >= 3) {
        this.setState({
          showImage1: false,
        });
        {
          this.dor();
        }
        dado_jogador3 = Math.floor(Math.random() * 250) + 50;
        dado_monstro3 = Math.floor(Math.random() * 250) + 75;
        contJ = 0;
        contM = 0;
        this.props.navigation.navigate('GameOver');
      }
    }
  }
}

//-------------------------------------------------------------------------------------------------------------

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.som = new Audio.Sound();
  }

  async componentDidMount() {
    try {
      await this.som.loadAsync(require('./assets/GameOver.mp3'));
      await this.som.playAsync();
    } catch (error) {
      console.error('Erro: ', error);
    }
  }

  render() {
    return (
      <View style={estilo.go}>
        <Text style={estilo.textoDerrota}>{'DERROTA!'}</Text>
        <View style={estilo.tentardenovo}>
          <Button title={'TENTAR DE NOVO!'} onPress={() => this.derrota()}></Button>
        </View>
      </View>
    );
  }

  derrota(){
    this.props.navigation.navigate('Player');
  }
}

//-------------------------------------------------------------------------------------------------------------

class Vitoria extends React.Component {
  constructor(props) {
    super(props);
    this.som = new Audio.Sound();
  }

  async componentDidMount() {
    try {
      await this.som.loadAsync(require('./assets/Vitoria.mp3'));
      await this.som.playAsync();
    } catch (error) {
      console.error('Erro: ', error);
    }
  }

  render() {
    return (
      <View style={estilo.vi}>
        <Text style={estilo.textoVitoria}>{'VOCÊ CHEGOU AO FIM DA MASMORRA E DERROTOU O MAL ANTIGO, PARABÉNS!'}</Text>
        <View style={estilo.voltaraomenu}>
          <Button title={'VOLTAR AO MENU!'} onPress={() => this.vitoria()}></Button>
        </View>
      </View>
    );
  }

  vitoria(){
    this.props.navigation.navigate('Player');
  }
}

//-------------------------------------------------------------------------------------------------------------

dado_jogador4 = Math.floor(Math.random() * 100) + 1;
dado_monstro4 = Math.floor(Math.random() * 100) + 1;

class EasterEgg extends React.Component {
  constructor(props) {
    super(props);
    this.som = new Audio.Sound();
    this.som.loadAsync(require('./assets/EasterEgg_Audio.ogg'));
    this.ferimento = new Audio.Sound();
    this.ferimento.loadAsync(require('./assets/Jogador_audio.mp3'));
  }

  ai() {
    this.som.setPositionAsync(0);
    this.som.playAsync();
  }

  dor() {
    this.ferimento.setPositionAsync(0);
    this.ferimento.playAsync();
  }

  state = {
    textValueJ: '',
    textValueM: '',
    showImage1: true,
    showImage2: true,
    showImage3: true,
    showImageMonstro1: true,
    showImageMonstro2: true,
    showImageMonstro3: true,
  };

  render() {
    const{ skinEscolhida } = this.props.route.params;
    return (
      <View>

        <ImageBackground
        source={require('./assets/Fundo_EasterEgg.jfif')}
        style={estilo.fundo}/>

        <Image
          style={estilo.personagem}
          source={skinEscolhida}
        />

        {this.state.showImage1 && (
          <Image style={estilo.hpJ1} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImage2 && (
          <Image style={estilo.hpJ2} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImage3 && (
          <Image style={estilo.hpJ3} source={require('./assets/Vida.png')} />
        )}

        <Text style={estilo.textDadoJ}>{'A FORÇA DO SEU ATAQUE É ...'}</Text>
        <Text style={estilo.dadoJ}>{this.state.textValueJ}</Text>

        <View style={estilo.botaoDadoJ}>
          <Button title="X" onPress={() => this.combate()} />
        </View>

        <Image style={estilo.monstro} source={require('./assets/EasterEgg.png')} />

        {this.state.showImageMonstro1 && (
          <Image style={estilo.hpM1} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImageMonstro2 && (
          <Image style={estilo.hpM2} source={require('./assets/Vida.png')} />
        )}

        {this.state.showImageMonstro3 && (
          <Image style={estilo.hpM3} source={require('./assets/Vida.png')} />
        )}

        <Text style={estilo.textDadoM}>{'A FORÇA DO OPONENTE É ...'}</Text>
        <Text style={estilo.dadoM}>{this.state.textValueM}</Text>
      </View>
    );
  }

  combate() {
    this.setState({
      textValueJ: dado_jogador4,
      textValueM: dado_monstro4,
    });

    if (dado_jogador4 >= dado_monstro4) {
      contM = contM + 1;
      if (contM == 1) {
        this.setState({
          showImageMonstro1: false,
        });
        {
          this.ai();
        }
        dado_jogador4 = Math.floor(Math.random() * 100) + 1;
        dado_monstro4 = Math.floor(Math.random() * 100) + 1;
      }
      if (contM == 2) {
        this.setState({
          showImageMonstro2: false,
        });
        {
          this.ai();
        }
        dado_jogador4 = Math.floor(Math.random() * 100) + 1;
        dado_monstro4 = Math.floor(Math.random() * 100) + 1;
      }
      if (contM >= 3) {
        this.setState({
          showImageMonstro3: false,
        });
        dado_jogador4 = Math.floor(Math.random() * 100) + 1;
        dado_monstro4 = Math.floor(Math.random() * 100) + 1;
        contJ = 0;
        contM = 0;
        this.props.navigation.navigate('GanhouDoEasterEgg');
      }
    } else {
      contJ = contJ + 1;
      if (contJ == 1) {
        this.setState({
          showImage3: false,
        });
        {
          this.dor();
        }
        dado_jogador4 = Math.floor(Math.random() * 100) + 1;
        dado_monstro4 = Math.floor(Math.random() * 100) + 1; 
      }
      if (contJ == 2) {
        this.setState({
          showImage2: false,
        });
        {
          this.dor();
        }
        dado_jogador4 = Math.floor(Math.random() * 100) + 1;
        dado_monstro4 = Math.floor(Math.random() * 100) + 1;
      }
      if (contJ >= 3) {
        this.setState({
          showImage1: false,
        });
        {
          this.dor();
        }
        dado_jogador4 = Math.floor(Math.random() * 100) + 1;
        dado_monstro4 = Math.floor(Math.random() * 100) + 1;
        contJ = 0;
        contM = 0;
        this.props.navigation.navigate('GameOver');
      }
    }
  }
}


//-------------------------------------------------------------------------------------------------------------


class GanhouDoEasterEgg extends React.Component {
  constructor(props) {
    super(props);
    this.som = new Audio.Sound();
  }

  async componentDidMount() {
    try {
      await this.som.loadAsync(require('./assets/EasterEgg_Vitoria.mp3'));
      await this.som.playAsync();
    } catch (error) {
      console.error('Erro: ', error);
    }
  }

  componentWillUnmount() {
    this.som.unloadAsync(); 
  }

  render() {
    return (
      <View style={estilo.vi}>
        <Image style={estilo.fimEasterEgg} 
        source={require('./assets/FimDoEasterEgg.jpg')}/>
        <Image style={{position: 'absolute', top: '35%'}} source={require('./assets/GanhouDoEasterEgg.gif')}/>
        <View style={estilo.voltaraomenu}>
          <Button title={'VOLTAR AO MENU!'} onPress={() => this.ganhou()}></Button>
        </View>
      </View>
    );
  }

  ganhou(){
    this.props.navigation.navigate('Player');
  }
}

//-------------------------------------------------------------------------------------------------------------

class Jogo extends React.Component {
  render() {
    return (
      <Navegacao.Navigator>
        <Navegacao.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Navegacao.Screen
          name="Player"
          component={Player}
          options={{ headerShown: false }}
        />
        <Navegacao.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Navegacao.Screen
          name="Fase2"
          component={Fase2}
          options={{ headerShown: false }}
        />

        <Navegacao.Screen
          name="Final"
          component={Final}
          options={{ headerShown: false }}
        />

        <Navegacao.Screen
          name="GameOver"
          component={GameOver}
          options={{ headerShown: false }}
        />

        <Navegacao.Screen
          name="Vitoria"
          component={Vitoria}
          options={{ headerShown: false }}
        />

        <Navegacao.Screen
          name="EasterEgg"
          component={EasterEgg}
          options={{ headerShown: false }}
        />

        <Navegacao.Screen
          name="GanhouDoEasterEgg"
          component={GanhouDoEasterEgg}
          options={{ headerShown: false }}
        />
      </Navegacao.Navigator>
    );
  }
}

//-------------------------------------------------------------------------------------------------------------

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={Jogo}
            options={{
              tabBarLabel: 'Login',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="login"
                  color={color}
                  size={size}
                />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Cadastrar"
            component={Registro}
            options={{
              tabBarLabel: 'Sign In',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-circle"
                  color={color}
                  size={size}
                />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#24272B',
  },

  texto: {
    fontSize: 20,
    color: '#E8EDDF',
  },

  entrada: {
    borderWidth: 2,
    borderColor: '#E8EDDF',
    color: '#E8EDDF',
    width: '70%',
  },

  titulo: {
    position: 'absolute', 
    top: '20%',
    borderWidth: 2, 
    padding: 10, 
    backgroundColor:'#7392B7'
  },

  //--------------------------------------------------------------------

  personagem: {
    position: 'relative',
    top: '70%',
    right: 30,
    width: 200,
    height: 305, 
    resizeMode: 'contain'
  },

  dadoJ: {
    position: 'absolute',
    left: 235,
    top: '90%',
    fontSize: 15,
    borderWidth: 2,
    paddingLeft: 7,
    paddingRight: 5,
    borderColor: 'blue',
    color:'white',
  },

  textDadoJ: {
    position: 'absolute',
    color:'white',
    left: 155,
    top: '85%',
    fontSize: 15,
  },

  botaoDadoJ: {
    width: '20%',
    left: 215,
    top: '45%',
  },

  //--------------------------------------------------------------------

  monstro: {
    bottom: '50%',
    left: '55%',
    width: 200,
    height: 275,
  },

  dadoM: {
    position: 'absolute',
    right: 255,
    bottom: '75%',
    fontSize: 15,
    borderWidth: 2,
    paddingLeft: 7,
    paddingRight: 5,
    borderColor: 'red',
    color:'white',
  },

  textDadoM: {
    position: 'absolute',
    color:'white',
    right: 165,
    bottom: '80%',
    fontSize: 15,
  },
  //--------------------------------------------------------------------
  hpJ1: {
    position: 'absolute',
    left: 140,
    top: '60%',
    fontSize: 15,
    width: '30%',
    resizeMode: 'contain',
  },

  hpJ2: {
    position: 'absolute',
    left: 200,
    top: '60%',
    fontSize: 15,
    width: '30%',
    resizeMode: 'contain',
  },

  hpJ3: {
    position: 'absolute',
    left: 260,
    top: '60%',
    fontSize: 15,
    width: '30%',
    resizeMode: 'contain',
  },

  hpM1: {
    position: 'absolute',
    right: 150,
    bottom: '50%',
    fontSize: 15,
    width: '30%',
    resizeMode: 'contain',
  },

  hpM2: {
    position: 'absolute',
    right: 210,
    bottom: '50%',
    fontSize: 15,
    width: '30%',
    resizeMode: 'contain',
  },

  hpM3: {
    position: 'absolute',
    right: 270,
    bottom: '50%',
    fontSize: 15,
    width: '30%',
    resizeMode: 'contain',
  },

//--------------------------------------------------------------------

  skinBotao1: {
    position: 'absolute',
    right: 230,
    backgroundColor: '#2E2532',
    bottom: '50%',
    borderWidth: 2,
    borderColor:'white',
    height: 120,
  },

   skinBotao2: {
    position: 'absolute',
    right: 125,
    backgroundColor: '#2E2532',
    bottom: '50%',
    borderWidth: 2,
    borderColor:'white',
    height: 120,
  },

   skinBotao3: {
    position: 'absolute',
    right: 25,
    backgroundColor: '#2E2532',
    bottom: '50%',
    borderWidth: 2,
    borderColor:'white',
    height: 120,
  },

  skinImagem: {
    padding: 10,
    margin: 5,
    height: 100,
    width: 100,
    resizeMode: 'stretch',
  },

//--------------------------------------------------------------------

  fundo: {
    position: 'absolute',
    flex: 1,
    width: '100%', 
    height: '150%',
  },

//--------------------------------------------------------------------

  go: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },

  textoDerrota: {
    color: 'white',
    fontSize: 40, 
  },

  tentardenovo: {
    position: 'absolute',
    top: '75%',
  },

//--------------------------------------------------------------------

  vi: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1EFB5',
  },

  textoVitoria: {
    color: 'white',
    fontSize: 40, 
    textAlign: 'center',
  },

  voltaraomenu: {
    position: 'absolute',
    top: '75%',
  },

//--------------------------------------------------------------------

  fimEasterEgg: {
    position: 'absolute', 
    bottom: '40%', 
    width: '100%',
    resizeMode: 'contain'
  },
});

export default App;
