<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lFf">
    <q-toolbar slot="header">
      <q-btn flat icon="menu" @click="$refs.layout.toggleLeft()"></q-btn>
      <q-toolbar-title>
        SharePoint Automation
      </q-toolbar-title>

      <q-btn ref="target" flat>
        {{$store.state.environment.name || 'Aucun environement'}}
        <q-popover ref="popover">
          <q-list highlight link>
            <q-item v-for="env in $store.state.environments" :key="env.name">
              <q-item-main :label="env.name"/>
            </q-item>
            <q-item-separator/>
            <q-item @click="$refs['environment-modal'].open()">
              <q-item-main label="Ajouter un environement"/>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>

      <q-btn ref="target" flat>
        {{$store.state.me.name}}
        <q-popover ref="popover">
          <q-list highlight link>
            <q-item>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>
        </q-list-header>
        <q-side-link item :to="{name: 'home'}">
          <q-item-side icon="list"/>
          <q-item-main label="Lists" sublabel="Listes"/>
        </q-side-link>
      </q-list>
    </div>

    <router-view/>
    <environment-modal ref="environment-modal"></environment-modal>
  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QList,
    QSideLink,
    QItemSide,
    QItemMain,
    QListHeader, QItem, QPopover, QItemSeparator, QItemTile
  } from 'quasar-framework'
  import EnvironmentModal from 'views/environments/EnvironmentModal.vue'

  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QList,
      QSideLink,
      QItemSide,
      QItemMain,
      QListHeader,
      QPopover,
      QItem,
      QItemSeparator,
      QItemTile,
      EnvironmentModal
    },
    data () {
      return {}
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
