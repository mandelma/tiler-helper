<template>
  <mdb-row>
    <mdb-col>
      <h2>Details adding form</h2>

      <select class="browser-default custom-select custom-select-lg mb-3" id="details" @click="getDetail">
        <option selected>Details</option>
        <option value="1">hole</option>
        <option value="2">window</option>
        <option value="3">door</option>
      </select>

      <div v-if="detailValue === '1' && isDetailPanel" class="details">
        <div>
          <mdb-input label= "Enter hole x distance" size="lg" v-model="hole.distance_x" />
          <mdb-input label= "Enter hole y distance" size="lg" v-model="hole.distance_y" />
          <mdb-input label= "Enter hole width" size="lg" v-model="hole.diameter" />
          <mdb-btn block color="green" @click="newRoundDetail">Add socket</mdb-btn><br>

        </div>

      </div>
      <div v-else-if="detailValue === '2' && isDetailPanel" class="details">
        <mdb-input label= "Enter window x distance" size="lg" v-model="rect.distance_x" />
        <mdb-input label= "Enter window y distance" size="lg" v-model="rect.distance_y" />
        <mdb-input label= "Enter window width" size="lg" v-model="rect.x" />
        <mdb-input label= "Enter window height" size="lg" v-model="rect.y" />
        <mdb-btn block color="green" @click="newRectDetail">Add window</mdb-btn><br>
      </div>

    </mdb-col>
  </mdb-row>
</template>

<script>
import {mdbBtn, mdbRow, mdbCol, mdbInput} from 'mdbvue'


export default {
  name: "wall-details",
  components: {
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbInput
  },
  props: {
    wall_data: Array,
  },
  data() {
    return {
      selectedDetail: null,
      detailValue: null,
      selectedHole: null,
      socketValue: null,

      isDetailPanel: false,

      hole: {
        distance_x: '',
        distance_y: '',
        diameter: ''
      },
      rect: {
        distance_x: '',
        distance_y: '',
        x: '',
        y: ''
      }
    }
  },
  mounted() {
    this.selectedDetail = document.getElementById('details')
  },
  computed: {

    },
  methods: {
    newRoundDetail() {
      this.$emit('add:hole', this.hole)

      this.isDetailPanel = false
    },
    newRectDetail() {
      //TODO make rect to work. array for wall rects
      this.$emit('add:rect', this.rect)
    },
    getDetail() {
      this.detailValue = this.selectedDetail.options[this.selectedDetail.selectedIndex].value;
      console.log("Testaus here ", this.detailValue)
      this.isDetailPanel = true
    },

  }
}
</script>

<style scoped>
.details {
  border: 1px solid green;
  margin-bottom: 10px;
  padding: 10px;
}
</style>