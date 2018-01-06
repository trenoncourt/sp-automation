<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="lHr LpR lFf">
    <q-toolbar slot="header">
      <q-btn flat icon="menu" @click="$refs.layout.toggleLeft()"></q-btn>
      <q-toolbar-title>
        SharePoint Automation
      </q-toolbar-title>

      <q-btn ref="target" flat>
        {{$store.state.me.name}}
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>
        </q-list-header>
        <q-side-link item :to="{name: 'RecruitmentAuth'}">
          <q-item-side icon="build"/>
          <q-item-main label="Recrutement" sublabel="Autorisation de recrutement"/>
        </q-side-link>
      </q-list>
    </div>

    <router-view/>

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
    QListHeader, QItem, QPopover
  } from 'quasar-framework'

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
      QItem
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
