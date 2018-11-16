<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lFf">
    <q-layout-header>
      <q-toolbar>
        <q-btn flat icon="menu" @click="left = !left"></q-btn>
        <q-toolbar-title>
          SharePoint Automation
        </q-toolbar-title>

        <q-btn ref="target" flat>
          {{environment ? environment.name : 'Aucun environement'}}
          <q-popover ref="environment-popover">
            <q-list highlight link>
              <q-item v-for="env in environments" :key="env.name"
                      @click.native="changeEnvironment(env), $refs['environment-popover'].hide()">
                <q-item-main :label="env.name"/>
              </q-item>
              <q-item-separator/>
              <q-item @click.native="$refs['environment-modal'].open()">
                <q-item-main label="Ajouter un environement"/>
              </q-item>
              <q-item @click.native="$refs['delete-environment'].open()">
                <q-item-main label="Supprimer un environement"/>
              </q-item>
              <q-item-separator v-if="environment"/>
              <q-item v-if="environment"
                      @click.native="quitCurrentEnvironment(), $refs['environment-popover'].hide()">
                <q-item-main label="quiter l'environement"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>

        <!--
        <q-btn ref="target" flat>
          {{me ? me.name : ''}}
          <q-popover ref="popover">
            <q-list highlight link>
              <q-item>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn> -->
      </q-toolbar>

    </q-layout-header>

    <q-layout-drawer
      side="left"
      v-model="left"
      :behavior="'default'"
      :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null"
    >
      <q-scroll-area class="fit">
        <q-item :to="{name: 'home'}">
          <q-item-side icon="home" />
          <q-item-main label="Home" sublabel="Home" />
        </q-item>
        <q-item v-if="environment" item :to="{name: 'lists'}">
          <q-item-side icon="list" />
          <q-item-main label="Lists" sublabel="Lists" />
        </q-item>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>

    <delete-environment ref="delete-environment"></delete-environment>
    <environment-modal ref="environment-modal"></environment-modal>
  </q-layout>
</template>

<script>

import EnvironmentModal from 'components/EnvironmentModal.vue'
import DeleteEnvironment from 'components/DeleteEnvironment.vue'
// import settings from 'electron-settings'
// import { RESET_ENVIRONMENT, UPDATE_ENVIRONMENT } from '../store/mutation-types'
import { authMixin } from 'src/store/modules/auth'
import { environmentMixin } from 'src/store/modules/environment'
import { listMixin } from 'src/store/modules/list'

export default {
  mixins: [authMixin, environmentMixin, listMixin],
  components: {
    DeleteEnvironment,
    EnvironmentModal
  },
  data () {
    return {
      left: false
    }
  },
  methods: {
    test () {
      // console.log(this.environments)
      // this.delEnvironment('test')
    },
    changeEnvironment (env) {
      // settings.set('environment', env)
      // this.$store.commit(UPDATE_ENVIRONMENT, env)
      this.selectEnvironment(env)
      this.fetchLists()
    },
    quitCurrentEnvironment () {
      this.$router.push({name: 'home'})
      this.resetEnvironment()
      // this.$store.commit(RESET_ENVIRONMENT)
    },
    created () {
      debugger
      console.log(this.environments)
    }
  }
}
</script>

<style>
  .img-header {
    width: 100%;
    margin-top: -20px;
    margin-left: -20px;
  }
</style>
