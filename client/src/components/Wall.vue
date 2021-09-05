<template>
  <div>

    <mdb-container>
      <h1>Working area</h1>

      <mdb-row>
        <mdb-col v-if="!isWallDetailsForm" id="panel" lg="3">
          <mdb-input v-if="!isEdit" label= "Enter wall width" size="lg" v-model="inputData.wallx_input" />
          <mdb-input v-else label= "Edit wall width" size="lg" v-model="forEdit.wallx" />

          <mdb-input v-if="!isEdit" label="Enter wall height" size="lg" v-model="inputData.wally_input" />
          <mdb-input v-else label="Edit wall height" size="lg" v-model="forEdit.wally" />

          <mdb-input v-if="!isEdit" label="Enter tile width" size="lg" v-model="inputData.tilex_input" />
          <mdb-input v-else label="Edit tile width" size="lg" v-model="forEdit.tilex" />

          <mdb-input v-if="!isEdit" label="Enter tile height" size="lg" v-model="inputData.tiley_input" />
          <mdb-input v-else label="Edit tile height" size="lg" v-model="forEdit.tiley" />

          <mdb-input v-if="!isEdit" label="Enter gap size" size="lg" v-model="inputData.gap_input" />
          <mdb-input v-else label="Edit gap size" size="lg" v-model="forEdit.gap" />

          <mdb-btn v-if="!isEdit" block color="green" @click="createWall">Loo sein</mdb-btn><br>

          <mdb-btn block :disabled="!isEdit" color="green" @click="editWall">Muuda andmeid</mdb-btn><br>
          <mdb-btn block :disabled="!isEdit" color="red" @click="deleteWall">Kustuta andmed</mdb-btn><br>
          <mdb-btn block :disabled= !isEdit color="blue" @click="modifyWall">Modify wall</mdb-btn><br>


        </mdb-col>
        <mdb-col v-else id="panel" lg="3">
          <div >
            <wall-details
              @add:hole = "addRoundDetail"

              @add:rect = "addRectDetail"
              @update:hole_form = "emptyFields"
              :wall_data = "wall_data"
            />

          </div>
          <div v-if="isEditSocket" :class="[sockets.length > 0 ? 'addedSocketsPanel' : null]">
            <edit-socket
              :socket = "currentSocket"
              @cansel:edit = "cancelEditSocket"
              @edit:socket = "saveEditedSocket"
              :sockets = "sockets"
            />
          </div>
          <div v-else :class="[sockets.length > 0 ? 'addedSocketsPanel' : null]">
            <h3 v-if="sockets.length > 0">Added sockets:</h3>
            <ul v-for="(socket, index) in sockets" :key="socket.id">
              <li>Socket {{index + 1}}
                <br>
                <mdb-btn color="green" @click="editSocket(socket)">
                  Edit
                </mdb-btn>
                <mdb-btn color="red" @click="removeSocket(socket.id)">
                  X
                </mdb-btn>
              </li>

            </ul>
          </div><br>
          <mdb-btn @click="isWallDetailsForm = false" block color="red">Cansel</mdb-btn>
        </mdb-col>


        <mdb-col id="container" style="overflow: scroll">
          <mdb-row v-if="!wall_data">
            <h2>Laadib...</h2>
          </mdb-row>
          <mdb-row v-else>
            <mdb-col>
              <canvas id="wall" width="0" height="0"></canvas><br>
            </mdb-col>


          </mdb-row>
          <mdb-row>
            <mdb-col class="tileNavigation">
              <mdb-btn @click="moveTilesRight"><i class="arrow right icon"></i></mdb-btn>
              <mdb-btn @click="moveTilesLeft"><i class="arrow left icon"></i></mdb-btn><br>
              <mdb-btn @click="moveTilesUp"><i class="arrow up icon"></i></mdb-btn>
              <mdb-btn @click="moveTilesDown"><i class="arrow down icon"></i></mdb-btn>
            </mdb-col>
          </mdb-row>



        </mdb-col>


      </mdb-row>

    </mdb-container>


  </div>
</template>

<script>
import {mdbContainer, mdbBtn, mdbRow, mdbCol, mdbInput} from 'mdbvue'
import WallDetails from '@/components/WallDetails'
import EditSocket from '@/components/wall/EditSocket'
import wallService from '@/service/walls'
import socketService from '@/service/socket'
//import {moveTiles} from '@/wall-tiles/moveWallTiles'
//import { leftCol, rightCol } from '@/wall-tiles/wallTiles'
//import { rightCol } from '@/wall-tiles/wallTiles'
import coords from '@/wall-tiles/wallTiles'
import renderTiles  from '@/wall-tiles/renderWallTiles'
//import {corners, fullTiles, leftCol, lineBottom, lineTop, rightCol} from "../wall-tiles/wallTiles";

export default {
name: "main-page",
  components: {
    mdbContainer,
    mdbBtn,
    mdbRow,
    mdbCol,
    mdbInput,

    WallDetails,
    EditSocket

  },
  data () {
  return {
    canvas: null,
    wall: null,

    wall_data: [],
    sockets: [],

    wall_id: null,
    currentSocket: {},

    isEdit: false,
    isEditSocket: false,
    isWallDetailsForm: false,

    coords: [],

    inputData: {
      wallx_input: '',
      wally_input: '',
      tilex_input: '',
      tiley_input: '',
      gap_input: '',
    },

    wallx: 0,
    wally: 0,
    tilex: 0,
    tiley: 0,
    gap: 0,
    forEdit: {
      wallx: '',
      wally: '',
      tilex: '',
      tiley: '',
      gap: ''
    },
    socket: [],
    rect: {
      xDistance: 0,
      yDistance: 0,
      x: 0,
      y: 0
    },
    x_full_tiles: 0,
    x_full_tiles_len: 0,
    y_full_tiles_len: 0,
    y_full_tiles: 0,
    wallx_start_space: 0,
    start_of_last_col: 0,
    wall_y_space: 0,
    rowFirstTilexSize: 0,
    rowLastTilexSize: 0,
    colFirstTileySize: 0,
    colLastTileySize: 0,
    counter: {
      x: 0,
      y: 0
    }
  }
  },
  mounted() {
    this.canvas = document.getElementById('wall')
    this.wall = this.canvas.getContext('2d')
    this.getWallData()

  },
  methods: {
    // drawing wall and tiles from db after refreshing the page
    async getWallData() {
      const wall_data = await wallService.getAll()
      this.wall_data = wall_data
      if (wall_data[0] !== undefined) {
        this.isEdit = true
        this.wallx = wall_data[0].wallx
        this.wally = wall_data[0].wally
        this.tilex = wall_data[0].tilex
        this.tiley = wall_data[0].tiley
        this.gap = wall_data[0].gap
        this.wall_id  = wall_data[0].id

        this.createCurrentWallData(this.wallx, this.wally, this.tilex, this.tiley, this.gap)

        this.canvas.width = wall_data[0].wallx
        this.canvas.height = wall_data[0].wally

        this.coords = coords.tileCoords
        console.log("Wall data: ", wall_data)
        //console.log("wall socket ", wall_data[0].sockets)
        console.log("Tiles coords: ", coords.tileCoords)

      } else {
        this.isEdit = false
        this.wallx = 0
        this.wally = 0
        this.tilex = 0
        this.tiley = 0
        this.gap = 0
      }

      // TODO Make database and connections for wall details and updata

      this.renderWall()
      if(wall_data[0] !== undefined && wall_data[0].sockets.length > 0) {
        this.sockets = wall_data[0].sockets
        for(let i = 0; i < wall_data[0].sockets.length; i++) {
          this.socket.push(wall_data[0].sockets[i])
          this.createSocket(this.wall_data[0].sockets[i])
        }

      }


    },
    async createWall() {
      this.isEdit = true
      const newData = {
        wallx: this.inputData.wallx_input,
        wally: this.inputData.wally_input,
        tilex: this.inputData.tilex_input,
        tiley: this.inputData.tiley_input,
        gap: this.inputData.gap_input
      }
      const data = await wallService.createData(newData)
      console.log("Data about the wall: ", data)

      this.wall_id = data.id

      this.wallx = data.wallx
      this.wally = data.wally
      this.tilex = data.tilex
      this.tiley = data.tiley
      this.gap = data.gap



      this.canvas.width = data.wallx
      this.canvas.height = data.wally

      const tileWidth = parseFloat(this.inputData.tilex_input)
      const tileHeight = parseFloat(this.inputData.tiley_input)
      const wallWidth = parseFloat(this.inputData.wallx_input)
      const wallHeight = parseFloat(this.inputData.wally_input)
      const gapSize = parseFloat(this.inputData.gap_input)

      this.createCurrentWallData(wallWidth, wallHeight, tileWidth, tileHeight, gapSize)

      this.renderWall()
    },
    modifyWall() {
      this.isWallDetailsForm = true
    },
    createCurrentWallData(wx, wy, tx, ty, gap) {
      // getting full tiles count on wall width
      let x_full_tiles = wx / (tx + gap)

      x_full_tiles = (x_full_tiles | 0) - 1
      // getting y tiles count on wall height
      let y_full_tiles = wy / (ty + gap)

      y_full_tiles = (y_full_tiles | 0) - 1

      const x_space = ((wx - (x_full_tiles * (tx + gap)) - gap) / 2) + gap
      const y_space = ((wy - (y_full_tiles * (ty + gap)) - gap) / 2) + gap

      this.x_full_tiles = x_full_tiles
      this.y_full_tiles = y_full_tiles
      this.x_full_tiles_len = x_full_tiles * (tx + gap)
      this.y_full_tiles_len = y_full_tiles * (ty + gap)
      // getting tiles beginning space on wall horizontally
      this.wall_x_start_space = x_space

      this.wall_y_space = y_space
      this.start_of_last_col = x_full_tiles * (tx + gap)

      this.rowFirstTilexSize = x_space - (2 * gap)
      this.rowLastTilexSize = x_space - (2 * gap)

      this.colFirstTileySize = y_space - (2 * gap)
      this.colLastTileySize = y_space - (2 * gap)
    },

    createTiledWall(items) {

      const tileWidth = items[2] === "tilex" ? parseFloat(this.forEdit.tilex) : parseFloat(this.tilex)
      const tileHeight = items[3] === "tiley" ? parseFloat(this.forEdit.tiley) : parseFloat(this.tiley)
      const wallWidth = items[0] === "wallx" ? parseFloat(this.forEdit.wallx) : parseFloat(this.wallx)
      const wallHeight = items[1] === "wally" ? parseFloat(this.forEdit.wally) : parseFloat(this.wally)
      const gapSize = items[4] === "gap" ? parseFloat(this.forEdit.gap) : parseFloat(this.gap)

      this.wallx = wallWidth
      this.wally = wallHeight
      this.tilex = tileWidth
      this.tiley = tileHeight
      this.gap = gapSize

      this.createCurrentWallData(this.wallx, this.wally, this.tilex, this.tiley, this.gap)

      this.wall.clearRect(0, 0, this.wallx, this.wally)

      this.canvas.width = wallWidth
      this.canvas.height = wallHeight

      this.renderWall()
      this.setScreenActionUpdate()
    },

    async editWall() {
      const items = new Array(5)
      let dataForEdit = {
        wallx: this.wallx,
        wally: this.wally,
        tilex: this.tilex,
        tiley: this.tiley,
        gap: this.gap
      }

      if(dataForEdit.wallx !== this.forEdit.wallx && this.forEdit.wallx !== '') {
        dataForEdit = {...dataForEdit, wallx: this.forEdit.wallx}
        items[0] = "wallx"
      }
      if(dataForEdit.wally !== this.forEdit.wally && this.forEdit.wally !== '') {
        dataForEdit = {...dataForEdit, wally: this.forEdit.wally }
        items[1] = "wally"
      }
      if(dataForEdit.tilex !== this.forEdit.tilex && this.forEdit.tilex !== '') {
        dataForEdit = {...dataForEdit, tilex: this.forEdit.tilex }
        items[2] = "tilex"
      }
      if(dataForEdit.tiley !== this.forEdit.tiley && this.forEdit.tiley !== '') {
        dataForEdit = {...dataForEdit, tiley: this.forEdit.tiley }
        items[3] = "tiley"
      }
      if(dataForEdit.gap !== this.forEdit.gap && this.forEdit.gap !== '') {
        dataForEdit = {...dataForEdit, gap: this.forEdit.gap }
        items[4] = "gap"
      }
      await wallService.editData(this.wall_id, {...dataForEdit})
      //console.log("Edited wall data: ", edited)
      this.counter.x = 0
      this.createTiledWall(items)
      this.resetEditFields()
    },
    async deleteWall() {
      await wallService.deleteAllData()
      await socketService.deleteAll()
      this.canvas.width = 0
      this.canvas.height = 0
      this.isEdit = false
    },
    resetEditFields() {
      this.forEdit.wallx = ''
      this.forEdit.wally = ''
      this.forEdit.tilex = ''
      this.forEdit.tiley = ''
      this.forEdit.gap = ''
    },

    renderWall() {
      this.wall.clearRect(0, 0, this.wallx, this.wally)

      renderTiles.render(this.wall, this.x_full_tiles, this.x_full_tiles_len, this.y_full_tiles, this.y_full_tiles_len,
          this.wall_x_start_space, this.wall_y_space, this.tilex, this.tiley, this.gap, this.counter.x, this.counter.y)
    },

    moveTilesRight() {
      if(this.rowFirstTilexSize < this.tilex && this.rowLastTilexSize > 0) {
        this.counter.x += 1
        this.rowFirstTilexSize += 1
        this.rowLastTilexSize -= 1
        console.log("Tiles move right")
        console.log("counter is: ", this.counter.x)

        for(let i = 0; i < this.coords.length; i++) {
          this.coords[i].x += 1
          //console.log("pos x is ", this.coords[i].x)
        }

        this.setScreenActionUpdate()


        //this.addRectDetail(this.rect)
      }
      console.log("first col len: ", this.rowFirstTilexSize)
      console.log("last col len: ", this.rowLastTilexSize)

    },
    moveTilesLeft() {
      //console.log("space: ", this.wall_x_start_space)

      if(this.rowFirstTilexSize > 0 && this.rowLastTilexSize < this.tilex) {
        this.counter.x -= 1
        this.rowFirstTilexSize -= 1
        this.rowLastTilexSize += 1
        console.log("Tiles move left")
        console.log("counter is: ", this.counter.x)

        for(let i = 0; i < this.coords.length; i++) {
          this.coords[i].x -= 1
          //console.log("pos x is ", this.coords[i].x)
        }
        this.setScreenActionUpdate()
      }
      console.log("first col len: ", this.rowFirstTilexSize)
      console.log("last col len: ", this.rowLastTilexSize)
    },
    moveTilesUp() {
      console.log("Tiles are moved up")
      if(this.colFirstTileySize > 0 && this.colLastTileySize < this.tiley) {
        this.counter.y -= 1
        this.colFirstTileySize -= 1
        this.colLastTileySize += 1
        console.log("Tiles moved up")
        console.log("counter is: ", this.counter.y)

        for(let i = 0; i < this.coords.length; i++) {
          this.coords[i].y += 1
          //console.log("pos x is ", this.coords[i].x)
        }
        this.setScreenActionUpdate()
      }
      console.log("first col len: ", this.colFirstTileySize)
      console.log("last col len: ", this.colLastTileySize)

    },
    moveTilesDown() {
      console.log("Tiles are moved down")
      if(this.colFirstTileySize < this.tiley && this.colLastTileySize > 0) {
        this.counter.y += 1
        this.colFirstTileySize += 1
        this.colLastTileySize -= 1
        console.log("Tiles moved up")
        console.log("counter is: ", this.counter.y)

        for(let i = 0; i < this.coords.length; i++) {
          this.coords[i].y += 1
          //console.log("pos x is ", this.coords[i].x)
        }
        this.setScreenActionUpdate()
      }
      console.log("first col len: ", this.colFirstTileySize)
      console.log("last col len: ", this.colLastTileySize)

    },
    async addRoundDetail (details) {
      console.log("Here is the new xxxx detail! ", details)
      console.log("Added round detail: ", details.distance_x)
      //const wallId = this.wall_data[0].id

      const savedSocket = await socketService.createSocket(this.wall_id, {
        x_distance: details.distance_x,
        y_distance: details.distance_y,
        diameter: details.diameter,
      })

      this.sockets = this.sockets.concat(savedSocket)

      this.createSocket(details)

      this.emptyFields(details)

    },
    editSocket(socket) {
      console.log("Editing socket vvvv ", socket.id)
      this.currentSocket = socket
      this.isEditSocket = true
    },
    async saveEditedSocket(newData) {
      console.log("is save edited socket here???")
      const savedSocket = await socketService.editSocket(this.currentSocket.id, newData)
      this.wall.clearRect(0, 0, this.wallx, this.wally)
      this.renderWall()
      this.sockets = this.sockets.map(socket => socket.id === this.currentSocket.id ? savedSocket : socket)
      this.setScreenActionUpdate()
    },
    cancelEditSocket() {
      this.isEditSocket = false
    },
    removeSocket(id) {
      console.log("Removing socket ", id)
      socketService.deleteSocket(id, this.wall_id)
      this.wall.clearRect(0, 0, this.wallx, this.wally)
      this.sockets = this.sockets.filter(socket => socket.id !== id)
      this.renderWall()
      for(let i = 0; i < this.sockets.length; i++) {
        this.createSocket(this.sockets[i])
      }

    },
    addRectDetail(detail) {
      console.log("Rect adding...")

      this.createRect(detail.distance_x, detail.distance_y, detail.x, detail.y)

      this.rect.xDistance = detail.xDistance
      this.rect.yDistance = detail.yDistance
      this.rect.x = detail.x
      this.rect.y = detail.y
    },
    createSocket(parameters) {
      this.wall.beginPath();

      console.log("Parameters: ", parameters.distance_x)

      this.wall.arc(parameters.distance_x, parameters.distance_y, parameters.diameter, 0, 2 * Math.PI);
      this.wall.fillStyle = 'yellow'
      this.wall.fill()
      this.wall.stroke();


    },

    createRect(x, y, w, h) {
      this.wall.fillStyle = "yellow"
      this.wall.fillRect(x, y, w, h)
    },
    setScreenActionUpdate() {
      this.renderWall()
      for(let i = 0; i < this.sockets.length; i++) {
        this.createSocket(this.sockets[i])
      }
    },
    emptyFields(data) {
      data.xDistance = ''
      data.yDistance = ''
      data.width = ''
    }
  }
}
</script>

<style scoped>
  #wall {
    border: 1px solid gray;
  }

  #panel {
    border: 1px solid red;
    padding: 20px;
  }

  #container {
    border: 1px solid green;
    padding: 20px;
    text-align: center;
  }

  .tileNavigation {
    border: 1px solid red;
    margin-top: 20px;
  }

  .addedSocketsPanel {
    border: 1px solid green;
    padding: 5px;
  }
</style>