<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="8"
        md="8"
      >
        <v-card>
          <v-card-title>
            file upload
          </v-card-title>
          <v-card-text>
            <vue-dropzone
              id="dropzone"
              ref="myVueDropzone"
              :options="dropzoneOptions"
              @vdropzone-complete="afterComplete"
              @vdropzone-success="successF"
              @vdropzone-error="errorF"
            />
            <v-row>
              <v-col offset="2">
                <v-btn
                  id="thisbtn"
                  @click="clicker"
                >
                  submit
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  id="clearbutton"
                  @click="clearDropzone"
                >
                  Clear
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
        md="4"
      >
        <v-card>
          <v-card-text
            v-for="f in files"
            id="filenameTag"
          >
            <v-list-item style="height: 20px;">
              <v-list-item-content>
                <v-list-item-title v-model="f.name">
                  {{ f.name }}
                </v-list-item-title>
                <v-list-item-subtitle v-model="f.status">
                  {{ f.status }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import MaterialCard from '../components/material/Card'
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'

  export default {
    components: {
      MaterialCard,
      vueDropzone: vue2Dropzone
    },
    data () {
      return {
        dropzoneOptions: {
          url: 'http://10.30.20.180:3000/filecheck',
          thumbnailWidth: 100,
          thumbnailHeight: 50,
          maxFilesize: 1000,
          headers: { 'My-Awesome-Header': 'header value' },
          includeStyling: true,
          duplicateCheck: true,
          uploadMultiple: false,
          retryChunks: true,
          paramName: 'file',
          autoProcessQueue: false,
          acceptedFiles: 'image/*,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,video/*'
        },
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38]
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

            ]
          },
          options: {
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        files: [],
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id'
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name'
          },
          {
            sortable: false,
            text: 'Salary',
            value: 'salary',
            align: 'right'
          },
          {
            sortable: false,
            text: 'Country',
            value: 'country',
            align: 'right'
          },
          {
            sortable: false,
            text: 'City',
            value: 'city',
            align: 'right'
          }
        ],
        items: [
          {
            id: 1,
            name: 'Dakota Rice',
            country: 'Niger',
            city: 'Oud-Tunrhout',
            salary: '$35,738'
          },
          {
            id: 2,
            name: 'Minerva Hooper',
            country: 'Curaçao',
            city: 'Sinaai-Waas',
            salary: '$23,738'
          },
          {
            id: 3,
            name: 'Sage Rodriguez',
            country: 'Netherlands',
            city: 'Overland Park',
            salary: '$56,142'
          },
          {
            id: 4,
            name: 'Philip Chanley',
            country: 'Korea, South',
            city: 'Gloucester',
            salary: '$38,735'
          },
          {
            id: 5,
            name: 'Doris Greene',
            country: 'Malawi',
            city: 'Feldkirchen in Kārnten',
            salary: '$63,542'
          }
        ],
        tabs: 0,
        list: {
          0: false,
          1: false,
          2: false
        }
      }
    },
    mounted () {

    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      afterComplete (file) {
        /* console.log(file); */
      },
      addComplete (filename) {

      },
      successF (file, response) {
        console.log(file, response)
        this.files.unshift({ name: file.name, status: file.status })
      },
      errorF (file, message, xhr) {
        console.log(file, response)
        this.files.unshift({ name: file.name, status: file.status })
      },
      onadd (file) {
        document.getElementById('shower').innerText = 'sweet ' + file.filename
        console.log('added new file', file)
      },
      clicker () {
        console.log('processing')
        this.$refs.myVueDropzone.processQueue()
      },
      clearDropzone () {
        this.$refs.myVueDropzone.removeAllFiles()
      }
    }
  }
</script>
