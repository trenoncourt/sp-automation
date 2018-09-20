<template>
  <div>
    <q-modal no-backdrop-dismiss ref="modal" :content-css="{padding: '35px', minWidth: '45vw'}">
      <h5>Ajout d'un environement</h5>
      <div class="row gutter-x-md no-vert-gutter">
        <div class="col-6">
          <q-field>
            <q-input
              float-label="Nom"
              v-model="env.name"
            ></q-input>
          </q-field>
        </div>
        <div class="col-6">
          <q-field>
            <q-input
              float-label="Url"
              v-model="env.url"
            ></q-input>
          </q-field>
        </div>
        <div class="col-6">
          <q-field>
            <q-select
              v-model="env.authType"
              float-label="Type d'autentification"
              :options="envAuthTypesOptions"
            />
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Tenant"
              v-model="env.tenantId"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Client Id"
              v-model="env.clientId"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Resource"
              v-model="env.resource"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Certificate thumbprint"
              v-model="env.certThumbprint"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              type="textarea"
              :min-rows="1"
              float-label="Certificate Private Key"
              v-model="env.certPrivateKey"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.ntlm.key" class="col-6 self-center">
          <q-checkbox label="Use current user" v-model="env.useCurrentUser"></q-checkbox>
        </div>
        <div v-if="!env.useCurrentUser && env.authType === envAuthTypes.ntlm.key" class="col-6">
          <q-field>
            <q-input
              float-label="Utilisateur"
              v-model="env.username"
            ></q-input>
          </q-field>
        </div>
        <div v-if="!env.useCurrentUser && env.authType === envAuthTypes.ntlm.key" class="col-6">
          <q-field>
            <q-input
              float-label="Mot de passe"
              v-model="env.password"
              type="password"
            ></q-input>
          </q-field>
        </div>
      </div>
      <br>
      <q-btn class="float-right" color="primary" @click="createEnvironment()">Ajouter l'environement</q-btn>
    </q-modal>
  </div>
</template>

<script>

import { envAuthTypes } from 'src/utils/enums'
import settings from 'electron-settings'
import { UPDATE_ENVIRONMENTS } from 'src/store/mutation-types'

export default {
  data () {
    return {
      env: {
        name: '',
        url: '',
        authType: null,
        useCurrentUser: false,
        username: '',
        password: '',
        tenantId: '',
        clientId: '',
        resource: '',
        certPrivateKey: '',
        certThumbprint: ''
      },
      envAuthTypes: envAuthTypes,
      envAuthTypesOptions: envAuthTypes.get().map(t => { return {label: t.label, value: t.key} })
    }
  },
  methods: {
    open () {
      this.$refs.modal.show()
    },
    close () {
      this.$refs.modal.hide()
    },
    createEnvironment () {
      const environments = settings.get('environments') || []
      environments.push(this.env)
      settings.set('environments', environments)
      this.$store.commit(UPDATE_ENVIRONMENTS, environments)
      this.close()
    }
  }
}
</script>
