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
            File Upload
          </v-card-title>
          <v-card-text>
            <vue-dropzone
                    id="dropzone"
                    ref="myVueDropzone"
                    :options="dropzoneOptions"
                    @vdropzone-complete="afterComplete"
                    @vdropzone-success="successF"
                    @vdropzone-error="errorF"
                    :useCustomSlot=true
            />
            <div class="dropzone-custom-content">
              <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
              <div class="subtitle">...or click to select a file from your computer</div>
            </div>
            <v-row>
              <!--<v-col cols="12" md="12">
                <v-btn
                        id="thisbtn"
                        @click="clicker"
                        style="text-transform: none !important;"
                        color="blue"
                >
                  Submit
                </v-btn>
              </v-col>-->
            </v-row>
          </v-card-text>
        </v-card>
        <v-snackbar
                v-model="snackbar"
        >
          {{ text }}
          <v-btn
                  color="blue"
                  text
                  @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </v-col>
      <v-col
              cols="12"
              lg="4"
              md="4"
      >
        <v-card>
          <v-card-text>
            <v-row>
              <v-col class="text-left" style="font-weight: bold;">Uploaded Files</v-col>
              <v-col ><v-btn class="text-right" text color="blue" v-on:click="clear(i)" style="margin-left: 100px; margin-top: -10px; text-transform: none !important;">
                <v-icon>mdi-autorenew</v-icon>Clear
              </v-btn></v-col>
            </v-row>
          </v-card-text>
          <v-card-text style="margin-top: -10px;"
                       v-for="(f,i) in files"
                       id="filenameTag"
          >
            <v-list-item style="height: 20px;">
              <v-list-item-content>
                <v-list-item-title v-model="f.name">
                  {{ f.name }}
                </v-list-item-title>
                <v-list-item-subtitle v-model="f.status">
                  {{ f.status }}

                  <v-progress-linear
                          :active="f.response"
                          :indeterminate="f.response"
                          absolute
                          bottom
                          color="deep-purple accent-4"
                  ></v-progress-linear>
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
  /* import MaterialCard from '../components/material/Card' */
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import { mdiAutorenew } from '@mdi/js';
  import {set} from "../utils/vuex";

  export default {

    components: {
      vueDropzone: vue2Dropzone,
        VueAxios,
        axios
    },
    data () {
      return {

        loading: true,
        snackbar: false,
        text: 'Hello, I\'m a snackbar',
        dropzoneOptions: {
          url: 'https://10.30.20.87:3002/filecheck',
          thumbnailWidth: 150,
          thumbnailHeight: 50,
          addRemoveLinks: false,
          maxFilesize: 1000,
          headers: false,
          includeStyling: false,
          duplicateCheck: false,
          uploadMultiple: false,
          retryChunks: true,
          paramName: 'file',
          autoProcessQueue: true,
          acceptedFiles: 'image/*,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,video/*',
          createImageThumbnails: false
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
        console.log(file, response);
        let oFileName = file.name;
        if (response.status === 'true'){
          this.files.unshift({ name: file.name, status: 'Upload complete...' +' Ingestion ongoing!', response: true });
          this.snackbar = true;
          this.text = 'File submitted for ingestion';
          console.log('true');

          this.checkStatus(response.filename, oFileName);
            console.log('checking ' , oFileName);
            console.log('checking ' ,oFileName);
        }else if (response.status === 'false'){
          this.files.unshift({ name: file.name, status: file.status + ' already exists ', response: false });
          this.snackbar = true;
          this.text = 'File already exists.';
            this.checkStatus(response.filename, oFileName);
            console.log('checking ' , oFileName);
        }
        this.$refs.myVueDropzone.removeFile(file);

      },
      errorF (file, message, xhr) {
        console.log(file, message);
        this.files.unshift({ name: file.name, status: file.status , response: '0' })
      },
      onadd (file) {
        document.getElementById('shower').innerText = 'sweet ' + file.filename;
        console.log('added new file', file)
      },
      clicker () {
        console.log('processing');
        this.$refs.myVueDropzone.processQueue();
      },
      clearDropzone () {
        this.$refs.myVueDropzone.removeAllFiles();
      },
      clear(i){
        this.files.splice(i);
        this.$refs.myVueDropzone.removeAllFiles();
        let x = location.hostname;
      },
        checkStatus(filename,originalfilename) {

          let self = this;
            axios.post('https://10.30.20.87:3002/ingested/checkstatus', {
                filename: filename
            })
                .then(function (response) {
                    console.log(response);

                    if (response.data === null){
                        setTimeout(function () {
                            console.log('ch ' , originalfilename);
                            self.checkStatus(filename,originalfilename);
                        },1000);
                    }else {
                        let status = response.data.status;
                        console.log('found handler 2 : ' + status);
                        if (response.data.status === 'true'){
                            console.log('passed if : ', true);
                            for(let i=0; i < self.files.length; i++){
                                console.log('in loop ', originalfilename);
                                console.log(self.files);
                                if( self.files[i].name === originalfilename){

                                    console.log('passed second loop');
                                    self.files[i].response = false;
                                    self.files[i].status = 'Ingestion completed.';
                                    console.log('found handler ' + self.files[i].name);
                                }
                            }
                        }
                    }


                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    },
    watch: {
      loading (val) {
        if (!val) return;

        setTimeout(() => (this.loading = false), 3000)
      },
    },
  }
</script>
<style>
  .dropzone-custom-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .dropzone-custom-title {
    margin-top: 0;
    color: #00b782;
  }

  .subtitle {
    color: #314b5f;
  }






  .container{
    margin: 0 auto;
    width: 100%;
  }

  .content{
    padding: 5px;
    margin: 0 auto;
  }
  .content span{
    width: 250px;
  }

  .dz-message{
    text-align: center;
    font-size: 28px;
    opacity: 0;
  }
  .dz-details{
    background-color: aqua;
    color: aqua;
  }
  .dropzone, .dropzone * {
    box-sizing: border-box;
  }
  .dropzone {
    min-height: 150px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    background: white;
    padding: 54px 54px;
  }
  .dropzone.dz-clickable {
    cursor: pointer;
  }
  .dropzone.dz-clickable * {
    cursor: default;
  }
  .dropzone.dz-clickable .dz-message, .dropzone.dz-clickable .dz-message * {
    cursor: pointer;
  }
  .dropzone.dz-started .dz-message {
    display: none;
  }
  .dropzone.dz-drag-hover {
    border-style: solid;
  }
  .dropzone.dz-drag-hover .dz-message {
    opacity: 0.5;
  }
  .dropzone .dz-message {
    text-align: center;
    margin: 2em 0;
  }
  .dropzone .dz-preview {
    position: relative;
    display: inline-block;
    vertical-align: top;
    margin: 16px;
    min-height: 100px;
  }
  .dropzone .dz-preview:hover {
    z-index: 1000;
  }
  .dropzone .dz-preview:hover .dz-details {
    opacity: 1;
  }
  .dropzone .dz-preview.dz-file-preview .dz-image {
    border-radius: 20px;
    background: #999;
    background: linear-gradient(to bottom, #333333, #333333);
  }
  .dropzone .dz-preview.dz-file-preview .dz-details {
    opacity: 1;
  }
  .dropzone .dz-preview.dz-image-preview {
    background: aquamarine;
  }
  .dropzone .dz-preview.dz-image-preview .dz-details {
    -webkit-transition: opacity 0.2s linear;
    -moz-transition: opacity 0.2s linear;
    -ms-transition: opacity 0.2s linear;
    -o-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
  }
  .dropzone .dz-preview .dz-remove {
    font-size: 20px;
    text-align: center;
    display: block;
    cursor: pointer;
    border: none;
  }
  .dropzone .dz-preview .dz-remove:hover {
    text-decoration: underline;
  }
  .dropzone .dz-preview:hover .dz-details {
    opacity: 1;
  }
  .dropzone .dz-preview .dz-details {
    z-index: 330;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    font-size: 13px;
    min-width: 100%;
    max-width: 100%;
    padding: 2em 1em;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    line-height: 150%;
  }
  .dropzone .dz-preview .dz-details .dz-size {
    margin-bottom: 1em;
    font-size: 16px;
  }
  .dropzone .dz-preview .dz-details .dz-filename {
    white-space: nowrap;
  }
  .dropzone .dz-preview .dz-details .dz-filename:hover span {
    border: 1px solid rgba(200, 200, 200, 0.8);
    background-color: #333333;
  }
  .dropzone .dz-preview .dz-details .dz-filename:not(:hover) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dropzone .dz-preview .dz-details .dz-filename:not(:hover) span {
    border: 1px solid transparent;
  }
  .dropzone .dz-preview .dz-details .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0 0.4em;
    border-radius: 3px;
  }
  .dropzone .dz-preview:hover .dz-image img {
    -webkit-transform: scale(1.05, 1.05);
    -moz-transform: scale(1.05, 1.05);
    -ms-transform: scale(1.05, 1.05);
    -o-transform: scale(1.05, 1.05);
    transform: scale(1.05, 1.05);
    -webkit-filter: blur(8px);
    filter: blur(8px);
  }
  .dropzone .dz-preview .dz-image {
    border-radius: 20px;
    overflow: hidden;
    width: 120px;
    height: 120px;
    position: relative;
    display: block;
    z-index: 10;
  }
  .dropzone .dz-preview .dz-image img {
    display: block;
  }
  .dropzone .dz-preview.dz-success .dz-success-mark {
    -webkit-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -moz-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -ms-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    -o-animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
    animation: passing-through 3s cubic-bezier(0.77, 0, 0.175, 1);
  }
  .dropzone .dz-preview.dz-error .dz-error-mark {
    opacity: 1;
    -webkit-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -moz-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -ms-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    -o-animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
    animation: slide-in 3s cubic-bezier(0.77, 0, 0.175, 1);
  }
  .dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {
    pointer-events: none;
    opacity: 0;
    z-index: 500;
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    margin-left: -27px;
    margin-top: -27px;
  }
  .dropzone .dz-preview .dz-success-mark svg, .dropzone .dz-preview .dz-error-mark svg {
    display: block;
    width: 54px;
    height: 54px;
  }
  .dropzone .dz-preview.dz-processing .dz-progress {
    opacity: 1;
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -ms-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }
  .dropzone .dz-preview.dz-complete .dz-progress {
    opacity: 0;
    -webkit-transition: opacity 0.4s ease-in;
    -moz-transition: opacity 0.4s ease-in;
    -ms-transition: opacity 0.4s ease-in;
    -o-transition: opacity 0.4s ease-in;
    transition: opacity 0.4s ease-in;
  }
  .dropzone .dz-preview:not(.dz-processing) .dz-progress {
    -webkit-animation: pulse 6s ease infinite;
    -moz-animation: pulse 6s ease infinite;
    -ms-animation: pulse 6s ease infinite;
    -o-animation: pulse 6s ease infinite;
    animation: pulse 6s ease infinite;
  }
  .dropzone .dz-preview .dz-progress {
    opacity: 1;
    z-index: 1000;
    pointer-events: none;
    position: absolute;
    height: 16px;
    left: 50%;
    top: 50%;
    margin-top: -8px;
    width: 80px;
    margin-left: -40px;
    background: #333333;
    -webkit-transform: scale(1);
    border-radius: 8px;
    overflow: hidden;
  }
  .dropzone .dz-preview .dz-progress .dz-upload {
    background: #333;
    background: linear-gradient(to bottom, dodgerblue, dodgerblue);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0;
    -webkit-transition: width 300ms ease-in-out;
    -moz-transition: width 300ms ease-in-out;
    -ms-transition: width 300ms ease-in-out;
    -o-transition: width 300ms ease-in-out;
    transition: width 300ms ease-in-out;
  }
  .dropzone .dz-preview.dz-error .dz-error-message {
    display: block;
    position: absolute;
  }
  .dropzone .dz-preview.dz-error:hover .dz-error-message {
    opacity: 1;
    margin-right: 40px;
    pointer-events: auto;
  }
  .dropzone .dz-preview .dz-error-message {
    pointer-events: none;
    z-index: 1000;
    position: absolute;
    display: block;
    display: none;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
    border-radius: 8px;
    font-size: 13px;
    top: 130px;
    left: -10px;
    width: 140px;
    background: #333333;
    background: linear-gradient(to bottom, #be2626, #a92222);
    padding: 0.5em 1.2em;
    color: red;
  }
  .dropzone .dz-preview .dz-error-message:after {
    content:'';
    position: absolute;
    top: -6px;
    left: 64px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #be2626;
  }
  .dropzone{
    border-style: dashed;
  }
  .dz-error-message:after{
    margin-right: 20px;
  }
  body{
    background: white;
  }
</style>
