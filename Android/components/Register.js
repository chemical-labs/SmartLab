import React, { Component } from 'react'
import { View, StatusBar, Text, TextInput, AsyncStorage, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import axios from 'axios'
import konfigurasi from '../config'
import { StackActions } from '@react-navigation/native'
import Loading from 'react-native-loading-spinner-overlay'

export default class Register extends Component{
    constructor(props){
        super(props)

        this.state = {
            success: false,
            alert_success: "Users Registered !",
            username: "",
            password: "",
            loading: false
        }
    }

    register(){
        if(this.state.username.length == 0 || this.state.password.length == 0){
            alert('Username & password still empty !')
        }else{
            (async() => {
                this.setState({ loading: true })
                await axios.post(konfigurasi.server + "auth/register", { username: this.state.username, password: this.state.password }).then(result => {
                    if(result.status == 200){
                        this.setState({ success: true, username: "", password: "" })
                    }else{
                    
                    }
                })
                this.setState({ loading: false })
            })()
       }
    }

    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', backgroundColor: '#292928' }}>
                <Loading visible={this.state.loading} textContent={"Please Wait.."} textStyle={{ color: 'white' }} />
                <StatusBar barStyle={"light-content"} backgroundColor={"#292928"} />
                <Modal isVisible={this.state.success}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10 }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Succesfully Registed</Text>
                            </View>

                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <Image source={require('../assets/illustrations/success.png')} style={{ width: 140, height: 120 }} />
                                <TouchableOpacity style={{ backgroundColor: 'black', padding: 5, borderRadius: 5, marginTop: 10 }} onPress={() => this.setState({ success: false })}>
                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ alignItems: 'center', marginTop: -25 }}>
                    <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 15, elevation: 15, paddingTop: 5 }}>
                        <Image source={require('../assets/icons/icon.png')} style={{ width: 100, height: 100, }}  />
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, color: 'white' }}>Smart Lab</Text>
                    <Text style={{ color: 'white' }}>Version: 1.2.8</Text>
                </View>
                <View style={{ backgroundColor: 'white', padding: 15, elevation: 15, marginTop: 20, borderRadius: 10, alignItems: 'center', paddingLeft: 35, paddingRight: 35 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Register</Text>
                    <TextInput placeholder="Username" style={{ marginTop: 15, padding: 10, backgroundColor: '#ededed', width: 120, borderRadius: 10  }} onChangeText={(value) => this.setState({ username: value })} />
                    <TextInput placeholder="Password" style={{ marginTop: 10, padding: 10, backgroundColor: '#ededed', width: 120, borderRadius: 10  }} onChangeText={(value) => this.setState({ password: value })} secureTextEntry={true}/>
                    <TouchableOpacity style={{ marginTop: 15 }} onPress={() => this.register()}>
                        <Text style={{ color: 'white', backgroundColor: 'black', elevation: 15, borderRadius: 5, padding: 5 }}>Create</Text>
                    </TouchableOpacity>
                    {this.state.success ? <Text style={{ marginTop: 8, color: 'green' }} onPress={() => this.setState({ success: false })} >{this.state.alert_success}</Text> : <Text></Text>}
                </View>
            </View>
        )
    }
}
