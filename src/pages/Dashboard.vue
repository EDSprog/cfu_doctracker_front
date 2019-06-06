<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-settings-90 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">В разработке</p>
              <h4 class="card-title">{{docFlow.inDevelop.length}} документ</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-history"></i> {{updatedInfo}}
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-settings-tool-66 text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">На доработке</p>
              <h4 class="card-title">{{docFlow.inRefactoring.length}} документ</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-history"></i> {{updatedInfo}}
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-check-2 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Рекомендован</p>
              <h4 class="card-title">{{docFlow.accept.length}} документ</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-history"></i> {{updatedInfo}}
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-single-copy-04 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Всего</p>
              <h4 class="card-title">{{docFlow.all.length}} документ</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-history"></i> {{updatedInfo}}
            </div>
          </stats-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Документооборот</h4>
              <div class="card-category">
                <ul class="drop_list">
                  <base-dropdown :title="lineChart.title">
                    <div class="dropdown-item" v-on:click="titleChange('24 часа', 'line')">24 часа</div>
                    <div class="dropdown-item" v-on:click="titleChange('Неделя', 'line')">Неделя</div>
                    <div class="dropdown-item" v-on:click="titleChange('Месяц', 'line')">Месяц</div>
                    <div class="dropdown-item" v-on:click="titleChange('Год', 'line')">Год</div>
                    <div class="dropdown-item" v-on:click="titleChange('Все время', 'line')">Все время</div>
                  </base-dropdown>
                </ul>
              </div>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-primary"></i> В разработке
                <i class="fa fa-circle text-danger"></i> На доработке
                <i class="fa fa-circle text-success"></i> Рекомендовано
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> {{updatedInfo}}
              </div>
            </template>
          </chart-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">Документооборот по факультетам</h4>
              <div class="card-category">
                <ul class="drop_list">
                  <base-dropdown :title="barChart.title">
                    <div class="dropdown-item" v-on:click="titleChange('24 часа', 'bar')">24 часа</div>
                    <div class="dropdown-item" v-on:click="titleChange('Неделя', 'bar')">Неделя</div>
                    <div class="dropdown-item" v-on:click="titleChange('Месяц', 'bar')">Месяц</div>
                    <div class="dropdown-item" v-on:click="titleChange('Год', 'bar')">Год</div>
                    <div class="dropdown-item" v-on:click="titleChange('Все время', 'bar')">Все время</div>
                  </base-dropdown>
                </ul>
              </div>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-primary"></i> В разработке
                <i class="fa fa-circle text-danger"></i> На доработке
                <i class="fa fa-circle text-success"></i> Рекомендовано
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> {{updatedInfo}}
              </div>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import BaseDropdown from "../components/BaseDropdown";
  import {mapState} from "vuex";
  import moment from 'moment'
  moment.locale('ru');

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      BaseDropdown,
    },
    created() {
      this.$store.dispatch('dashboard/getDocFlow');
      this.updatedTime = Date.now();
      this.updatedInfo = moment(this.updatedTime).fromNow();
      setInterval(() => {
        this.updatedInfo = moment(this.updatedTime).fromNow();
      }, 30000)
    },
    computed: {
      ...mapState({
        docFlow: state => state.dashboard.docFlow,
      }),
    },
    methods: {
      titleChange(title, type) {
        switch (type) {
          case 'line':
            this.lineChart.title = title;
            break;
          case 'bar':
            this.barChart.title = title;
            break;
        }
      }
    },
    data () {
      return {
        moment: moment,
        updatedTime: null,
        updatedInfo: '',
        lineChart: {
          title: '24 часа',
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          title: '24 часа',
          data: {
            labels: ['ФТИ', 'КНЭУ'],
            series: [
              [542, 234],
              [412, 654],
              [123, 234],
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
      }
    }
  }
</script>
<style>
  .drop_list {
    list-style-type: none;
    padding: 0;
  }

  .dropdown-item {
    cursor: pointer;
  }

  .col-md-6, .col-md-12 {
    padding-left: 6px;
  }

  .content {
    background-color: rgb(240, 240, 240);
  }
</style>
