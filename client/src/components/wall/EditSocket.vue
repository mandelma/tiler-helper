<template>
  <div>
    <h2>Editing socket</h2>
    <mdb-input label= "Edit hole x distance" size="lg" v-model="forEdit.distance_x" />
    <mdb-input label= "Edit hole y distance" size="lg" v-model="forEdit.distance_y" />
    <mdb-input label= "Edit hole width" size="lg" v-model="forEdit.diameter" />
    <mdb-btn block color="green" @click="editSocket">Save socket</mdb-btn><br>
    <mdb-btn block color="red" @click="canselEdit">Cansel edit</mdb-btn><br>
  </div>
</template>

<script>
//import socketService from '@/service/socket'
import { mdbInput, mdbBtn } from 'mdbvue'
export default {
  name: "edit-socket",
  props: {
    socket: Object,
    sockets: Array
  },
  components: {
    mdbInput,
    mdbBtn
  },
  data () {
    return {
      forEdit: {
        distance_x: '',
        distance_y: '',
        diameter: ''
      },
      editedSocket: {

      }
    }
  },
  methods: {
    async editSocket() {
      console.log("Editing this socket... ", this.id)
      console.log("socket data in edit ", this.socket)
      let newSocket = {
        distance_x: this.socket.distance_x,
        distance_y: this.socket.distance_y,
        diameter: this.socket.diameter
      }
      if(this.forEdit.distance_x !== '') {
        newSocket = {
          ...newSocket, distance_x: this.forEdit.distance_x
        }
      }
      if(this.forEdit.distance_y !== '') {
        newSocket = {
          ...newSocket, distance_y: this.forEdit.distance_y
        }
      }
      if(this.forEdit.diameter !== '') {
        newSocket = {
          ...newSocket, diameter: this.forEdit.diameter
        }
      }

      console.log("new edited socket: ", newSocket)
      //await socketService.editSocket(this.socket.id, newSocket)
      this.$emit('edit:socket', newSocket)

      //const currentSocket =
      //const newSocketData =
    },
    canselEdit() {
      console.log("Cansel editing")
      this.$emit('cansel:edit')
    }
  }
}
</script>

<style scoped>

</style>