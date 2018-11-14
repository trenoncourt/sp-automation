<template>
  <div>
    <h4>{{environment.name}}</h4>
    <div class="row gutter-x-md">
      <div class="col-6">
        <q-field>
          <q-input
            float-label="Nom"
            v-model="environment.name"
          ></q-input>
        </q-field>
      </div>
      <div class="col-6">
        <q-field>
          <q-input
            float-label="Url"
            v-model="environment.url"
          ></q-input>
        </q-field>
      </div>
      <div class="col-6">
        <q-field>
          <q-input
            float-label="Path"
            v-model="environment.path"
          ></q-input>
        </q-field>
      </div>
      <div class="col-6">
        <q-field>
          <q-select
            v-model="environment.authType"
            float-label="Type d'autentification"
            :options="envAuthTypesOptions"
          />
        </q-field>
      </div>
      <div v-if="environment.authType === envAuthTypes.ntlm.key" class="col-6 self-center q-mt-md">
        <q-checkbox label="Use current user" v-model="environment.useCurrentUser"></q-checkbox>
      </div>
      <div v-if="environment.authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            float-label="Tenant"
            v-model="environment.tenantId"
          ></q-input>
        </q-field>
      </div>
      <div v-if="environment.authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            float-label="Client Id"
            v-model="environment.clientId"
          ></q-input>
        </q-field>
      </div>
      <div v-if="environment.authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            float-label="Resource"
            v-model="environment.resource"
          ></q-input>
        </q-field>
      </div>
      <div v-if="environment.authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            float-label="Certificate thumbprint"
            v-model="environment.certThumbprint"
          ></q-input>
        </q-field>
      </div>
      <div v-if="environment.authType === envAuthTypes.bearer.key" class="col-6">
        <q-field>
          <q-input
            type="textarea"
            :min-rows="1"
            float-label="Certificate Private Key"
            v-model="environment.certPrivateKey"
          ></q-input>
        </q-field>
      </div>
      <div v-if="environment.authType === envAuthTypes.ntlm.key" class="col-6 self-center q-mt-md">
        <q-checkbox label="Use current user" v-model="environment.useCurrentUser"></q-checkbox>
      </div>
      <div v-if="!environment.useCurrentUser && environment.authType === envAuthTypes.ntlm.key" class="col-6">
        <q-field>
          <q-input
            float-label="Utilisateur"
            v-model="environment.username"
          ></q-input>
        </q-field>
      </div>
      <div v-if="!environment.useCurrentUser && environment.authType === envAuthTypes.ntlm.key" class="col-6">
        <q-field>
          <q-input
            float-label="Mot de passe"
            v-model="environment.password"
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

import { Notify } from 'quasar'
import { envAuthTypes } from 'src/utils/enums'
import { environmentMixin } from 'src/store/modules/environment'

export default {
  mixins: [environmentMixin],
  data () {
    return {
      envAuthTypes: envAuthTypes,
      envAuthTypesOptions: envAuthTypes.get().map(t => { return {label: t.label, value: t.key} })
    }
  },
  methods: {
    save () {
      this.updateEnvironment(this.environment)
      this.syncEnvironments()

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
