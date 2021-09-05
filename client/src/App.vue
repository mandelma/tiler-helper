<template>
  <div>
    <mdb-navbar color="red" class="mt-2 lighten-1" expand="xl" dark animated animation="3" style="padding: 20px;">
      <mdb-navbar-brand href="#">
        Navbar
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <mdb-nav-item href="#" active>
            <router-link to="/">Etusivu</router-link>
          </mdb-nav-item>
          <mdb-nav-item href="#" active>
            <router-link to="/wall">Wall</router-link>
          </mdb-nav-item>
          <mdb-nav-item href="#">
            <router-link to="/floor">Floor</router-link>
          </mdb-nav-item>
          <mdb-nav-item class="disabled" href="#">Disabled</mdb-nav-item>
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="stylish" slot="toggle" waves-fixed>Dropdown</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item>Action</mdb-dropdown-item>
              <mdb-dropdown-item>Another action</mdb-dropdown-item>
              <mdb-dropdown-item>Something else here</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <mdb-nav-item v-if="!loginUser" class="nav-login" href="#">
            <router-link to="/login">
              <i class="user icon"></i>
              Login
            </router-link>
          </mdb-nav-item>
          <mdb-dropdown v-else tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="stylish" slot="toggle" waves-fixed>Profile</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item>Data</mdb-dropdown-item>
              <mdb-dropdown-item @click="handleLogout">Log out</mdb-dropdown-item>
              <mdb-dropdown-item>Something else here</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </mdb-navbar-nav>

      </mdb-navbar-toggler>
    </mdb-navbar>

    <mdb-container>
      <h3 style="text-align: center;">User name: {{loginUser.name}}</h3>

    </mdb-container>
    <div  class="messagefield">

    </div>


    <router-view
      @login = "handleLogin"
      @create:user = "createUser"
    />
  </div>
</template>

<script>
import { mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem, mdbContainer, mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue'
//import HelloWorld from './components/HelloWorld.vue'
import userService from './service/users'
//import loginService from './service/login'
export default {
  name: 'App',
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbContainer,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownMenu,
    mdbDropdownItem
  },
  data () {
    return {
      users: [],
      isUsername: false,
      loginUser: '',
      message: '',
      message1: '',

      passwordError: false


    }
  },
  mounted() {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.loginUser = user
    }
    this.getUsers()

  },
  computed: {

  },
  methods: {
    async getUsers() {
      this.users = await userService.getAll()
    },
    createUser(user) {
      console.log("New user name is ", user.name)
      if(user.name !== '' && user.username !== '' && user.password !== '') {
        userService.createUser(user)
        console.log("All fields are set")
      }
    },
    handleLogin(userData) {
      //console.log("User data after log in: ", userData)
      this.loginUser = userData
    },
    handleLogout() {    // kirjaudetaan ulos
      window.localStorage.removeItem('loggedUser')
      this.loginUser = ''
      //this.$router.push('/')
    },
    errorHandling() {

    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

nav .navbar-brand {
  font-size: 36px;
}
nav ul li a{
  font-size: 24px;
  color: White;
}
nav ul li a:hover {
  color: #ddd;
}

.nav-login {
  margin-left: 300px;
}

.messagefield {
  width: 50%;
  margin: auto;
}

@media only screen and (max-width: 1199px) {
  .nav-login {
    margin-left: 0;
  }
}


.messagefield {
    width: 50%;
    margin: auto;
  }

</style>
