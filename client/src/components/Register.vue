<template>
  <div>
    <mdb-container>


      <!-- here -->

      <form @submit.prevent="validateForm" novalidate>
        <mdb-input
            type="text"
            id="customInput1"
            label="First name"
            v-model="customValues.name"
            :customValidation="validation.name.validated"
            :isValid="validation.name.valid"
            @change="validate('name')"
            required

            :invalidFeedback = errorMsg.firstnameError
        />
        <mdb-input
            type="text"
            id="customInput2"
            label="Last name"
            v-model="customValues.lastname"
            :customValidation="validation.lastname.validated"
            :isValid="validation.lastname.valid"
            @change="validate('lastname')"
            required
            validFeedback="Look's good."
            :invalidFeedback= errorMsg.lastnameError
        />




        <mdb-btn type="Submit" size="sm" color="danger" @click="handleSubmit">Submit</mdb-btn>

      </form>
    </mdb-container>
  </div>
</template>

<script>
import { mdbInput, mdbBtn, mdbContainer } from 'mdbvue'
export default {
  name: "register",
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer
  },
  data () {
    return {
      submitting: false,
      errorMsg: {
        lastnameError: '',
        firstnameError: ''
      },
      userData: {
        name: '',
        username: '',
        password:''
      },

      hasError: false,
      isError: false,


      customValues: {
        name: '',
        lastname: ''

      },

      validation: {
        name: {
          valid: false,
          validated: false
        },
        lastname: {
          valid: false,
          validated: false
        },


      }
    }
  },
  methods: {
    newUser() {
      this.isError = true
      this.hasError = true
      this.$emit('user:details', this.userData)
      // this.$router.push({
      //   name: 'login',
      //   params: {
      //     newUser: this.createNewUser()
      //   }
      // })
    },
    canselRegister() {
      console.log("Canselled!")
      this.$emit('cansel:register', false)
      //this.$router.push('/login')
    },
    handleSubmit() {
      console.log("Submitting the form")
      this.submitting = true
    },


    validateForm() {
      Object.keys(this.customValues).forEach(key => {
        if(this.submitting) {
          this.validate(key);
        }

      });
    },
    validate(key) {
      if (key === "name") {
        if (this.customValues[key]) {
          this.validation[key].valid = true;
        } else {
          this.validation[key].valid = false;
          this.errorMsg.firstnameError = 'Name field is empty!'
        }
        if (this.customValues[key].length >= 1 && this.customValues[key].length < 3) {
          this.validation[key].valid = false
          this.errorMsg.firstnameError = "Name should be longer than 2 letters!"
        }
        this.validation[key].validated = true;
      }

      else if (key === "lastname" && this.submitting) {
        if (this.customValues[key]) {
          this.validation[key].valid = true;
        } else {
          this.validation[key].valid = false;
          this.errorMsg.lastnameError = 'Lastname field is empty!'
        }
        if (this.customValues[key].length >= 1 && this.customValues[key].length < 5) {
          this.validation[key].valid = false
          this.errorMsg.lastnameError = "Name should be longer than 4 letters!"
        }
        this.validation[key].validated = true;
      }
    },
  }
}
</script>

<style scoped>

</style>