import React, { Component } from 'react'
import { View, StatusBar, Text, TextInput, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import Loading from 'react-native-loading-spinner-overlay'
import { StackActions } from '@react-navigation/native'

export default class Guide extends Component{
    constructor(props){
        super(props)

        this.state = {
            localip: '',
            ip: '',
            name: '',
            loading: false
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('mode').then(x => {
            if(x == 'offline'){
                this.props.navigation.navigate(
                    StackActions.replace('offline', { type: 'offline' })
                )
            }else if(x == 'outside'){
                this.props.navigation.navigate(
                    StackActions.replace('offline', { type: 'outside' })
                )
            }
        })
    }

    async connection(){
        AsyncStorage.setItem('localip', this.state.ip)
        await axios.get('http://' + this.state.ip).then(res => {
            if(res.status == 200){
                alert('Connected Successfully')
            }else{
                alert("Can't connect to your local network")
            }
        })
    }

    offline(){
        AsyncStorage.setItem('mode', null);
        AsyncStorage.setItem('mode', 'outside');
        this.props.navigation.dispatch(
            StackActions.replace('Login', { type: 'outside' })
        )
    }

    name(){
        AsyncStorage.setItem('name', this.state.name)
        alert('Hey ' + this.state.name)
    }

    render(){
        return(
            <View style={{ backgroundColor: "#282829", flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar barStyle={"light-content"} backgroundColor="#282829" />
                <Loading visible={this.state.loading} textContent={"Please Wait..."} textStyle={{ color: 'white', fontWeight: 'bold' }} />
                <Swiper showButtons={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 170 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Set Up The Machine !</Text>
                        <Image source={require('../assets/illustrations/update_lights.png')} style={{ width: 300, height: 220, marginTop: 10, marginBottom: 10 }} />
                        <Text style={{ color: "white" }}>Hal Pertama yang di lakukan adalah</Text>
                        <Text style={{ color: "white" }}>Menambahkan mesin IOT ke aplikasi</Text>
                        <Text style={{ color: "white" }}>Ketika kamu sudah masuk ke aplikasi</Text>
                        <Text style={{ color: 'white' }}>Kamu akan di minta untuk menambahkan mesin IOT</Text>
                    </View>
                    
                    <View style={{ marginTop: 170, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Adding Some Relay !</Text>
                        <Image source={require('../assets/illustrations/data.png')} style={{ width: 220, height: 180, marginTop: 10 }} />
                        <Text style={{ color: 'white', marginTop: 10 }}>Setelah Menginput IP dari mesin IOT </Text>
                        <Text style={{ color: 'white' }}>Agar Kamu bisa berkomunikasi dengan mesin </Text>
                        <Text style={{ color: 'white' }}>Maka kamu harus menambahkan relay </Text>
                        <Text style={{ color: 'white' }}>Dengan Menekan tombol ini <Image source={require('../assets/icons/addrelay.png')} style={{ width: 20, height: 20 }} /> di bagian menu, </Text>
                        <Text style={{ color: 'white' }}>lalu klik tombol <Image source={require('../assets/icons/touch.png')} style={{ width: 20, height: 20 }} /></Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Selamat Datang !</Text>
                        <Image source={require('../assets/illustrations/wellcome_lights.png')} style={{ width: 330, height: 220, marginTop: 15 }} />
                        <Text style={{ marginTop: 10, color: 'white' }}><Text style={{ fontWeight: 'bold' }}>Ingat</Text>, semua konfigurasi</Text>
                        <Text style={{ color: 'white' }}>Ada pada aplikasi, jika aplikasi</Text>
                        <Text style={{ color: 'white' }}>Terhapus maka semua konfigurasi akan hilang</Text>

                        <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 15, elevation: 15, marginTop: 10 }} onPress={() => this.offline()}>
                            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Masuk !</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}
