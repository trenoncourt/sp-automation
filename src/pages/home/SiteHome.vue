<template>
  <div>
    <h4>{{name}}</h4>
    <div class="row gutter-x-md">
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
          <q-input
            float-label="Path"
            v-model="path"
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
      <div v-if="authType === envAuthTypes.ntlm.key" class="col-6 self-center q-mt-md">
        <q-checkbox label="Use current user" v-model="useCurrentUser"></q-checkbox>
      </div>
      <div v-if="authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            float-label="Tenant"
            v-model="tenantId"
          ></q-input>
        </q-field>
      </div>
      <div v-if="authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            float-label="Client Id"
            v-model="clientId"
          ></q-input>
        </q-field>
      </div>
      <div v-if="authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            float-label="Resource"
            v-model="resource"
          ></q-input>
        </q-field>
      </div>
      <div v-if="authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            float-label="Certificate thumbprint"
            v-model="certThumbprint"
          ></q-input>
        </q-field>
      </div>
      <div v-if="authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            type="textarea"
            :min-rows="1"
            float-label="Certificate Private Key"
            v-model="certPrivateKey"
          ></q-input>
        </q-field>
      </div>
      <div v-if="authType === envAuthTypes.ntlm.key" class="col-6 self-center q-mt-md">
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
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        icon="save"
        size="18px"
        @click="save"/>
    </q-page-sticky>
  </div>
</template>

<script>

import {
  UPDATE_ENVIRONMENT_AUTH_TYPE, UPDATE_ENVIRONMENT_CERT_PRIVATE_KEY, UPDATE_ENVIRONMENT_CERT_THUMBPRINT,
  UPDATE_ENVIRONMENT_CLIENT_ID,
  UPDATE_ENVIRONMENT_DOMAIN,
  UPDATE_ENVIRONMENT_IN_LIST,
  UPDATE_ENVIRONMENT_NAME,
  UPDATE_ENVIRONMENT_PASSWORD, UPDATE_ENVIRONMENT_PATH,
  UPDATE_ENVIRONMENT_RESOURCE,
  UPDATE_ENVIRONMENT_TENANT,
  UPDATE_ENVIRONMENT_URL,
  UPDATE_ENVIRONMENT_USE_CURRENT_USER,
  UPDATE_ENVIRONMENT_USER
} from 'src/store/mutation-types'
import { Notify } from 'quasar'
import { envAuthTypes } from 'src/utils/enums'
import settings from 'electron-settings'

export default {
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
    },
    tenantId: {
      get () {
        return this.$store.state.environment ? this.$store.state.environment.tenantId : ''
      },
      set (value) {
        this.$store.commit(UPDATE_ENVIRONMENT_TENANT, value)
      }
    },
    clientId: {
      get () {
        return this.$store.state.environment ? this.$store.state.environment.clientId : ''
      },
      set (value) {
        this.$store.commit(UPDATE_ENVIRONMENT_CLIENT_ID, value)
      }
    },
    resource: {
      get () {
        return this.$store.state.environment ? this.$store.state.environment.resource : ''
      },
      set (value) {
        this.$store.commit(UPDATE_ENVIRONMENT_RESOURCE, value)
      }
    },
    certPrivateKey: {
      get () {
        return this.$store.state.environment ? this.$store.state.environment.certPrivateKey : ''
      },
      set (value) {
        this.$store.commit(UPDATE_ENVIRONMENT_CERT_PRIVATE_KEY, value)
      }
    },
    certThumbprint: {
      get () {
        return this.$store.state.environment ? this.$store.state.environment.certThumbprint : ''
      },
      set (value) {
        this.$store.commit(UPDATE_ENVIRONMENT_CERT_THUMBPRINT, value)
      }
    },
    path: {
      get () {
        return this.$store.state.environment ? this.$store.state.environment.path : ''
      },
      set (value) {
        this.$store.commit(UPDATE_ENVIRONMENT_PATH, value)
      }
    }
  },
  methods: {
    save () {
      settings.set('environment', this.$store.state.environment)
      this.$store.commit(UPDATE_ENVIRONMENT_IN_LIST, this.$store.state.environment)
      settings.set('environments', this.$store.state.environments)
      Notify.create({
        message: 'Sauvegardé avec succès',
        color: 'positive',
        timeout: 4000,
        icon: 'check',
        position: 'top'
      })
    }
  }
}
</script>
