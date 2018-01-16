<template>
  <div>
    <h4>{{name}}</h4>
    <div class="row md-gutter no-vert-gutter">
      <div class="col-6">
        <q-field>
          <q-input
            float-label="Nom"
            v-model="name"
          ></q-input>
        </q-field>
      </div>
      <div class="col-6">
        <q-field>
          <q-input
            float-label="Url"
            v-model="url"
          ></q-input>
        </q-field>
      </div>
      <div class="col-6">
        <q-field>
          <q-select
            v-model="authType"
            float-label="Type d'autentification"
            :options="envAuthTypesOptions"
          />
        </q-field>
      </div>
      <div v-if="authType === envAuthTypes.ntlm.key" class="col-6 self-center">
        <q-checkbox label="Use current user" v-model="useCurrentUser"></q-checkbox>
      </div>
      <div v-if="!useCurrentUser && authType === envAuthTypes.ntlm.key" class="col-6">
        <q-field>
          <q-input
            float-label="Utilisateur"
            v-model="username"
          ></q-input>
        </q-field>
      </div>
      <div v-if="!useCurrentUser && authType === envAuthTypes.ntlm.key" class="col-6">
        <q-field>
          <q-input
            float-label="Mot de passe"
            v-model="password"
            type="password"
          ></q-input>
        </q-field>
      </div>
    </div>
    <q-fixed-position corner="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        icon="save"
        @click="save"/>
    </q-fixed-position>
  </div>
</template>

<script>
  import {
    QBtn,
    QCheckbox,
    QField, QFixedPosition,
    QInput, QItem, QItemMain, QItemSeparator, QItemSide, QItemTile, QList,
    QModal,
    QSelect, Toast
  } from 'quasar-framework'
  import {
    UPDATE_ENVIRONMENT_AUTH_TYPE,
    UPDATE_ENVIRONMENT_DOMAIN,
    UPDATE_ENVIRONMENT_NAME, UPDATE_ENVIRONMENT_PASSWORD, UPDATE_ENVIRONMENT_URL,
    UPDATE_ENVIRONMENT_USE_CURRENT_USER, UPDATE_ENVIRONMENT_USER
  } from '../../store/mutation-types'
  import { envAuthTypes } from 'utils/enums'
  import settings from 'electron-settings'

  export default {
    components: {
      QModal,
      QField,
      QInput,
      QCheckbox,
      QBtn,
      QSelect,
      QList,
      QItem,
      QItemSide,
      QItemMain,
      QItemTile,
      QItemSeparator,
      QFixedPosition
    },
    data () {
      return {
        envAuthTypes: envAuthTypes,
        envAuthTypesOptions: envAuthTypes.get().map(t => { return {label: t.label, value: t.key} })
      }
    },
    computed: {
      name: {
        get () {
          return this.$store.state.environment ? this.$store.state.environment.name : ''
        },
        set (value) {
          this.$store.commit(UPDATE_ENVIRONMENT_NAME, value)
        }
      },
      authType: {
        get () {
          return this.$store.state.environment ? this.$store.state.environment.authType : ''
        },
        set (value) {
          this.$store.commit(UPDATE_ENVIRONMENT_AUTH_TYPE, value)
        }
      },
      url: {
        get () {
          return this.$store.state.environment ? this.$store.state.environment.url : ''
        },
        set (value) {
          this.$store.commit(UPDATE_ENVIRONMENT_URL, value)
        }
      },
      username: {
        get () {
          return this.$store.state.environment ? this.$store.state.environment.username : ''
        },
        set (value) {
          this.$store.commit(UPDATE_ENVIRONMENT_USER, value)
        }
      },
      password: {
        get () {
          return this.$store.state.environment ? this.$store.state.environment.password : ''
        },
        set (value) {
          this.$store.commit(UPDATE_ENVIRONMENT_PASSWORD, value)
        }
      },
      domain: {
        get () {
          return this.$store.state.environment ? this.$store.state.environment.domain : ''
        },
        set (value) {
          this.$store.commit(UPDATE_ENVIRONMENT_DOMAIN, value)
        }
      },
      useCurrentUser: {
        get () {
          return this.$store.state.environment ? this.$store.state.environment.useCurrentUser : ''
        },
        set (value) {
          this.$store.commit(UPDATE_ENVIRONMENT_USE_CURRENT_USER, value)
        }
      }
    },
    methods: {
      save () {
        settings.set('environment', this.$store.state.environment)
        Toast.create.positive('Sauvegardé avec succès')
      }
    }
  }
</script>
