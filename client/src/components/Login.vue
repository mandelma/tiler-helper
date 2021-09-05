<template>
  <div>
    <mdb-container v-if="!isRegister">
      <mdb-alert color="success">
        This is a success alert—check it out!
      </mdb-alert>
      <section class="form-simple" >
        <mdb-row center class="d-flex">
          <mdb-col md="7">
            <mdb-card>
              <div class="header pt-3 grey lighten-2">
                <mdb-row class="d-flex justify-content-start">
                  <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
                </mdb-row>
              </div>
              <mdb-card-body class="mx-4 mt-4">
                <mdb-alert v-if="testError" color="danger">
                  Username and password are missing!
                </mdb-alert>
                <mdb-input label="Your username" icon="user icon" type="text" v-model="username"/>
                <mdb-input label="Your password" icon="lock icon" type="password" containerClass="mb-0" v-model="password"/>
                <p class="font-small grey-text d-flex justify-content-end">Forgot <a href="#" class="dark-grey-text font-weight-bold ml-1"> Password?</a></p>
                <div class="text-center mb-4 mt-5">
                  <mdb-btn color="danger" type="button" class="btn-block z-depth-2" @click="login">Log in</mdb-btn>
                </div>
                <p class="font-small grey-text d-flex justify-content-center">Don't have an account? <a href="#" @click="register" class="dark-grey-text font-weight-bold ml-1"> Sign up</a></p>
              </mdb-card-body>
            </mdb-card>
          </mdb-col>
        </mdb-row>

      </section>

    </mdb-container>
    <div v-else style="width: 50%; margin: auto;">
      <register
          @cansel:register="canselRegister"
      />
    </div>
  </div>
</template>

<script>
import {mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbContainer, mdbAlert} from 'mdbvue';

import Register from './Register'
import userService from "@/service/users";
import loginService from "@/service/login";

export default {
  name: "login",
  components: {
    Register,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbInput,
    mdbBtn,
    mdbAlert,
    mdbContainer
  },
  props: {
    type: Object
  },
  data () {
    return {
      testError: false,
      isRegister: false,
      isUsername: false,
      userDetails: {
        name: '',
        username: '',
        password: ''
      },
      loginUser: '',
      username: '',
      password: '',
      usernameError: false,
      isError: false,
      pwError: false,
      message: ''
    }
  },
  mounted () {

  },
  methods: {
    getUserDetails(details) {

      // this.userDetails = {
      //   name: this.$route.params.name,
      //   username: this.$route.params.username,
      //   password: this.$route.params.password
      // }

      //this.$emit('create:user', )


      this.$emit('create:user', details)
    },
    async login() {
      // this.usernameError = false
      // this.pwError = false
      // if(this.username === '' && this.password === '') {
      //   this.usernameError = true
      //   this.pwError = true
      // } else if(this.username === '') {
      //   this.usernameError = true
      // } else if(this.password === '') {
      //   this.pwError = true
      // } else {
      //   this.$emit('login', {username: this.username, password: this.password})
      // }
      this.usernameError = false
      this.pwError = false
      if(this.username === '' && this.password === '') {
        this.message = "Username and password are missing"
        console.log("username and password are empty")
        this.usernameError = true
        this.pwError = true
        this.isError = true
        if(this.username.length > 0) {
          this.usernameError = false
        }
        setTimeout(() => {
          this.isError = false
        }, 3000)

      } else if(this.username === '') {
        console.log("username is missing")
        this.message = "username is missing"
        this.usernameError = true
        this.isError = true


      } else if(this.password === '') {
        console.log("password is missing")
        this.message = "Password is missing"
        this.pwError = true
        this.isError = true
      } else {
        //this.usernameError = false
        const userDetails = await userService.getAll()
        userDetails.forEach(detail => {   // käydään tiedot läpi ja tarkistetaan, onko käyttäjä jo olemassa
          if(detail.username === this.username) {   // jos sisestetty käyttäjätunnus on tietokannassa
            this.isUsername = true
          }
        })


        if(!this.isUsername) {    // jos käyttäjää ei ole tietokannassa
          this.message = "Käyttäjätunnus tai salasana ovat virheelliset!"
          this.usernameError = true
          this.pwError = true
          this.isError = true
          //this.isError = true
          // virhen tiedot nöytölle
          // setTimeout(() => {
          //   this.isError = false
          // }, 3000)
          console.log("Käyttäjätunnus tai salasana ovat virheelliset!")
          this.message = "Käyttäjätunnus tai salasana ovat virheelliset!"

        } else {    // jos käyttäjänimi on tietokannassa, mutta salasana menee väärin
          const user = await loginService.login({username: this.username, password: this.password})
          if(user.error) {
            //this.isError = true
            //this.errorMessage = "Salasana on virheelline!"
            // kuvataan virhetiedot näytölle
            // setTimeout(() => {
            //   this.isError = false
            // }, 3000)
            console.log("Salasana on virheelline!")
            this.pwError = true
            this.isError = true
            this.message = "Salasana on virheelline!"
          } else {    // jos käyttäjä on tietokannassa, salasana ja käyttäjätunnus on oikein
            this.$emit('login', user)
            this.loginUser = user
            // tallennetaan global windows käyttäjätiedot
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            this.message = "You ara successfully signed in!"
            // palataan etusivulle
            this.$router.push('/')
          }
        }
      }


    },
    register() {
      console.log("Tested!")
      this.isRegister = true
    },
    canselRegister(data) {
      console.log("Register is out ", data)
      this.isRegister = data
    }
  }
}
</script>

<style scoped>
  .message {
    width: 70%;
    margin: auto;
  }
</style>