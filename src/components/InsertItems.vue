<template>
  <div>
    <q-modal ref="modal" :content-css="{padding: '35px', minWidth: '55vw'}">
      <div class="text-center">
        <h5>Ajout d'un Item</h5>
      </div>
      <div v-for="row in mappedData" v-bind:key="row.fieldName" class="row gutter-x-md">
        <div class="col-md-6">

          <q-btn disabled size="md" flat  :label="row.fieldName" />
        </div>

        <div class="col-md-6">
          <q-field v-if="row.type === 1 || row.type === 9 ">
            <q-input v-model="row.data" type="number" />
          </q-field>
          <q-field v-if="row.type === 2 ">
            <q-input v-model="row.data" type="text" />
          </q-field>
          <q-field v-if="row.type === 3 ">
            <q-input v-model="row.data" type="textarea" />
          </q-field>
          <q-field v-if="row.type === 4 ">
             <q-datetime color="purple" v-model="row.data" type="datetime" float-label="Date & Time" />
          </q-field>
          <q-field v-if="row.type === 7 ">
            <q-select v-model="row.data" v-if="selectCompagnie.length > 1 && row.fieldName === 'printCompany'" :options="selectCompagnie" />
            <q-select v-model="row.data" v-if="selectAttTypes.length > 1 && row.fieldName === 'AttachmentTypes'" :options="selectAttTypes" />
            <q-select v-model="row.data" v-if="selectPackageSpline.length > 1 && row.fieldName === 'packageSpline'" :options="selectPackageSpline" />
            <q-select v-model="row.data" v-if="selectPackageSplineOnu.length > 1 && row.fieldName === 'packageSplineONU'" :options="selectPackageSplineOnu" />
            <q-select v-model="row.data" v-if="selectPackageSplineOnu2.length > 1 && row.fieldName === 'packageSplineONU2'" :options="selectPackageSplineOnu2" />
            <q-select v-model="row.data" v-if="selectPackageType.length > 1 && row.fieldName === 'packageType'" :options="selectPackageType" />
            <q-select v-model="row.data" v-if="selectSimStatus.length > 1 && row.fieldName === 'simStatus'" :options="selectSimStatus" />
            <q-select v-model="row.data" v-if="selectSemStatus.length > 1 && row.fieldName === 'semStatus'" :options="selectSemStatus" />
            <q-select v-model="row.data" v-if="selectQuoteStatus.length > 1 && row.fieldName === 'quoteStatus'" :options="selectQuoteStatus" />
            <q-select v-model="row.data" v-if="selectLabStatus.length > 1 && row.fieldName === 'labStatus'" :options="selectLabStatus" />
            <q-select v-model="row.data" v-if="selectCustomer.length > 1 && row.fieldName === 'customer'" :options="selectCustomer" />
            <q-select v-model="row.data" v-if="selectPallStack.length > 1 && row.fieldName === 'palletStacking'" :options="selectPallStack" />
            <q-select v-model="row.data" v-if="selectPallType.length > 1 && row.fieldName === 'palletType'" :options="selectPallType" />
            <q-select v-model="row.data" v-if="selectMecPacktype.length > 1 && row.fieldName === 'mechanisedPackaging'" :options="selectMecPacktype" />
            <q-select v-model="row.data" v-if="selectAnnualMarket.length > 1 && row.fieldName === 'annualMarket'" :options="selectAnnualMarket" />
            <q-select v-model="row.data" v-if="selectQuantityChoice.length > 1 && row.fieldName === 'quantityChoice'" :options="selectQuantityChoice" />
            <q-select v-model="row.data" v-if="selectStampLne.length > 1 && row.fieldName === 'stampLne'" :options="selectStampLne" />
            <q-select v-model="row.data" v-if="selectPantoneType.length > 1 && row.fieldName === 'pantoneType'" :options="selectPantoneType" />
            <q-select v-model="row.data" v-if="selectPantoneType2.length > 1 && row.fieldName === 'pantoneType2'" :options="selectPantoneType2" />
            <q-select v-model="row.data" v-if="selectSupportType.length > 1 && row.fieldName === 'supportType'" :options="selectSupportType" />
            <q-select v-model="row.data" v-if="selectColorType.length > 1 && row.fieldName === 'tenColorType'" :options="selectColorType" />
            <q-select v-model="row.data" v-if="selectRackType.length > 1 && row.fieldName === 'rackType'" :options="selectRackType" />
            <q-select v-model="row.data" v-if="selectDelCity.length > 1 && row.fieldName === 'deliveryCity'" :options="selectDelCity" />
            <q-select v-model="row.data" v-if="selectDelCity2.length > 1 && row.fieldName === 'deliveryCity2'" :options="selectDelCity2" />
            <q-select v-model="row.data" v-if="selectDelType.length > 1 && row.fieldName === 'deliveryType'" :options="selectDelType" />
            <q-select v-model="row.data" v-if="selectPicType.length > 1 && row.fieldName === 'huePictureType'" :options="selectPicType" />
            <q-select v-model="row.data" v-if="selectTransportType.length > 1 && row.fieldName === 'transportType'" :options="selectTransportType" />
            <q-select v-model="row.data" v-if="selectProductNature.length > 1 && row.fieldName === 'productNature'" :options="selectProductNature" />
            <q-select v-model="row.data" v-if="selectProductNature2.length > 1 && row.fieldName === 'productNature2'" :options="selectProductNature2" />
            <q-select v-model="row.data" v-if="selectStack.length > 1 && row.fieldName === 'stacking'" :options="selectStack" />
            <q-select v-model="row.data" v-if="selectDelPlace.length > 1 && row.fieldName === 'deliveryPlace'" :options="selectDelPlace" />
            <q-select v-model="row.data" v-if="selectTruckType.length > 1 && row.fieldName === 'truckType'" :options="selectTruckType" />
          </q-field>
          <q-field v-if="row.type === 8 ">
            <q-select v-model="row.data" :options="selectBool" />
          </q-field>
           <q-field v-if="row.type === 20 ">
            <q-search v-model="row.data" >
              <q-autocomplete @search="search" @selected="selected" />
            </q-search>
          </q-field>
        </div>
      </div>
      <q-btn class="q-mt-md float-right" color="primary" @click="add()">valider</q-btn>
    </q-modal>
  </div>
</template>
<script>

import { filter } from 'quasar'

export default {
  data () {
    return {
      countSelect: 0,
      mappedData: [],
      list: {},
      Users: [],
      Groups: [],
      listTest: [],

      selectCompagnie: [ {
        label: '( Aucun )',
        value: 0,
        id: '843ece8c-82e6-437b-b191-65f7d294cdfd'
      }],
      selectAttTypes: [ {
        label: '( Aucun )',
        value: 0,
        id: 'e35e2250-4e9a-4c41-b1b7-d06e591b1b28'
      }],
      selectPackageSpline: [ {
        label: '( Aucun )',
        value: 0,
        id: 'b9801f7e-193b-477b-97eb-e79b84237570'
      }],
      selectPackageSplineOnu: [ {
        label: '( Aucun )',
        value: 0,
        id: '03f7a9cc-d26b-49e4-95a0-f913946b2609'
      }],
      selectPackageSplineOnu2: [ {
        label: '( Aucun )',
        value: 0,
        id: '03f7a9cc-d26b-49e4-95a0-f913946b2609'
      }],
      selectPackageType: [ {
        label: '( Aucun )',
        value: 0,
        id: '2658f40b-9499-4ba8-bdef-08be90208e96'
      }],
      selectSemStatus: [ {
        label: '( Aucun )',
        value: 0,
        id: '06312865-9915-4034-9811-8dd47a8d732f'
      }],
      selectSimStatus: [ {
        label: '( Aucun )',
        value: 0,
        id: '06312865-9915-4034-9811-8dd47a8d732f'
      }],
      selectLabStatus: [ {
        label: '( Aucun )',
        value: 0,
        id: '06312865-9915-4034-9811-8dd47a8d732f'
      }],
      selectQuoteStatus: [ {
        label: '( Aucun )',
        value: 0,
        id: '06312865-9915-4034-9811-8dd47a8d732f'
      }],
      selectCustomer: [ {
        label: '( Aucun )',
        value: 0,
        id: '39a21d6d-68a2-4a7f-8522-361b497665e4'
      }],
      selectPack: [ {
        label: '( Aucun )',
        value: 0,
        id: 'f839ecc3-23f3-4663-9f5e-92e0bf1d6e72'
      }],
      selectPallType: [ {
        label: '( Aucun )',
        value: 0,
        id: '7e10b43e-d1da-4be4-a835-fca8a43fd376'
      }],
      selectPallStack: [ {
        label: '( Aucun )',
        value: 0,
        id: 'ef232e13-d1d5-45f9-ba8c-017bef9c80ec'
      }],
      selectPackAtt: [ {
        label: '( Aucun )',
        value: 0,
        id: 'cf4f8725-4477-4d55-9ec2-127cf62ffc92'
      }],
      selectAnnualMarket: [ {
        label: '( Aucun )',
        value: 0,
        id: '39a21d6d-68a2-4a7f-8522-361b497665e4'
      }],
      selectPantoneType: [ {
        label: '( Aucun )',
        value: 0,
        id: '1493f80a-61af-4c79-92e1-6a720e747ee3'
      }],
      selectPantoneType2: [ {
        label: '( Aucun )',
        value: 0,
        id: '1f3b89b6-6ca0-4f0d-928a-fd62b481438a'
      }],
      selectQuantityChoice: [ {
        label: '( Aucun )',
        value: 0,
        id: '2c44e0b7-0740-40aa-b24b-e56b5b953f62'
      }],
      selectStampLne: [ {
        label: '( Aucun )',
        value: 0,
        id: '6d3ed0f5-7dd8-404d-a761-b1067f9010e7'
      }],
      selectMecPacktype: [ {
        label: '( Aucun )',
        value: 0,
        id: '7f021781-14af-4fd9-b3d6-0f2280523bd0'
      }],
      selectColorType: [ {
        label: '( Aucun )',
        value: 0,
        id: 'dd57d19c-8df8-4302-b1d4-88bf515f49ce'
      }],
      selectRackType: [ {
        label: '( Aucun )',
        value: 0,
        id: '21a29a1e-5f23-4173-8f05-ffdd9573301e'
      }],
      selectSupportType: [ {
        label: '( Aucun )',
        value: 0,
        id: '40321999-30cf-470f-b74a-c2db6c6076ff'
      }],
      selectDelCity: [ {
        label: '( Aucun )',
        value: 0,
        id: 'b75754c1-cd69-4b78-9366-fd85cad70f75'
      }],
      selectStack: [ {
        label: '( Aucun )',
        value: 0,
        id: 'd93b519a-4b5e-49fe-a1d5-00c625b42008'
      }],
      selectDelCity2: [ {
        label: '( Aucun )',
        value: 0,
        id: 'b75754c1-cd69-4b78-9366-fd85cad70f75'
      }],
      selectDelType: [ {
        label: '( Aucun )',
        value: 0,
        id: 'd64e0a39-6026-44ac-a70e-6eab756cbffa'
      }],
      selectTransportType: [ {
        label: '( Aucun )',
        value: 0,
        id: 'd0ddb02e-cde3-43cc-9b38-083d6d6e3f7c'
      }],
      selectPicType: [ {
        label: '( Aucun )',
        value: 0,
        id: 'ac0104bb-22bf-42d3-b45a-4f7467d719b1'
      }],
      selectProductNature: [ {
        label: '( Aucun )',
        value: 0,
        id: 'a7e925e5-37e6-40aa-83bc-83d56bdb17e7'
      }],
      selectProductNature2: [ {
        label: '( Aucun )',
        value: 0,
        id: 'ef5803bd-5487-43d1-a045-7b1cc24131cf'
      }],
      selectDelPlace: [ {
        label: '( Aucun )',
        value: 0,
        id: 'd032016c-da27-471e-8c41-84d384aa3720'
      }],
      selectTruckType: [ {
        label: '( Aucun )',
        value: 0,
        id: '7e6a666f-1d1a-4e0e-bf72-111724b50dbb'
      }],
      selectBool: [ {
        label: 'true',
        value: true
      },
      {
        label: 'false',
        value: false
      }],
      allSelect: []
    }
  },
  computed: {
  /*  verifSelect (type) {
      for (let i = 0; i < allSelectData.length; i++ ) {
          if (this.allSelectData[i].length > 1 && this.allSelectData[i].type === type ) {
            this.actifSelect = this.allSelectData[i]
            return true
          }
      }
      return false
    } */
  },
  methods: {
    getItemTypeForListName (name) {
      return 'SP.Data.' + name.charAt(0).toUpperCase() + name.split(' ').join('').slice(1) + 'ListItem'
    },
    add () {
      let list = this.$store.state.changeVue
      let tasks = []
      let item = {}
      item.__metadata = {type: this.getItemTypeForListName(list.Title)}
      for (let j = 0; j < this.mappedData.length; j++) {
        if (this.mappedData[j].data !== '') {
          item[this.mappedData[j].nameForPost] = this.mappedData[j].data
        }
      }
      if (this.$parent.isAdd) {
        let createTask = this.$http.api.lists.createItem(list.Id, item)
        tasks.push(createTask)

        Promise.all(tasks).then(_ => {
          this.$q.notify({
            message: `Ajout réalisé avec succès`,
            color: 'positive',
            timeout: 4000,
            icon: 'check',
            position: 'top'
          })
        })
      } else {
        let updateTask = this.$http.api.lists.modifItem(list.Id, item, this.$parent.idItemModif)
        tasks.push(updateTask)

        Promise.all(tasks).then(_ => {
          this.$q.notify({
            message: `Ajout réalisé avec succès`,
            color: 'positive',
            timeout: 4000,
            icon: 'check',
            position: 'top'
          })
        })
      }
      this.$refs.modal.hide()
    },
    open () {
      let vm = this
      this.mappedData = []
      for (let i = 0; i < this.$parent.Fields.length; i++) {
        vm.mappedData.push({nameForPost: this.$parent.Fields[i].name, fieldName: this.$parent.Fields[i].label, data: '', type: this.$parent.Fields[i].type})
      }
      this.$refs.modal.show()
    },
    parseList () {
      return this.listTest.map(x => ({
        label: x.name,
        sublabel: x.mail,
        icon: x.icon,
        id: x.id,
        value: x.id
      })
      )
    },
    search (terms, done) {
      if (filter(terms, {field: 'label', list: this.parseList()}).length === 0) {
        setTimeout(() => {
          done(filter(terms, {field: 'sublabel', list: this.parseList()}))
        }, 1000)
      } else {
        setTimeout(() => {
          done(filter(terms, {field: 'label', list: this.parseList()}))
        }, 1000)
      }
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.id}"`)
    },
    findType (type) {
      let typeSharepoint = type
      if (typeSharepoint === 'Text') {
        return 'text'
      }
    },
    getUsersAndGroups () {
      this.$http.api.lists.getUsers().then(response => {
        this.Users = response.value
        for (let i = 0; i < this.Users.length; i++) {
          this.listTest.push({name: this.Users[i].Title, mail: this.Users[i].Email, icon: `person`, id: this.Users[i].Id})
        }
      })
      this.$http.api.lists.getGroups().then(response => {
        this.Groups = response.value
        for (let i = 0; i < this.Groups.length; i++) {
          this.listTest.push({name: this.Groups[i].Title, mail: '', icon: `group`, id: this.Groups[i].Id})
        }
      })
    },
    count (id, table) {
      this.$http.api.lists.getList(id).then(response => {
        let countSelect = response.ItemCount
        this.data(id, countSelect, table)
      })
    },
    data (id, countSelect, table) {
      this.$http.api.lists.getItems(id, countSelect).then(response => {
        for (let i = 0; i < response.value.length; i++) {
          table.push({label: response.value[i].Id + '', value: response.value[i].Id})
        }
      })
    },
    getSelectOption () {
      this.count(this.selectCustomer.id, this.selectCustomer)
      this.count(this.idAttachmentTypes.id, this.idAttachmentTypes)
      this.count(this.selectCompagnie.id, this.selectCompagnie)
      this.count(this.selectPackageSpline.id, this.selectPackageSpline)
      this.count(this.selectPackageSplineOnu.id, this.selectPackageSplineOnu)
      this.count(this.selectPackageSplineOnu2.id, this.selectPackageSplineOnu2)
      this.count(this.selectPackageType.id, this.selectPackageType)
      this.count(this.selectPackAtt.id, this.selectPackAtt)
      this.count(this.selectSemStatus.id, this.selectSemStatus)
      this.count(this.selectSimStatus.id, this.selectSimStatus)
      this.count(this.selectLabStatus.id, this.selectLabStatus)
      this.count(this.selectQuoteStatus.id, this.selectQuoteStatus)
      this.count(this.selectPallStack.id, this.selectPallStack)
      this.count(this.selectPallType.id, this.selectPallType)
      this.count(this.selectAnnualMarket.id, this.selectAnnualMarket)
      this.count(this.selectQuantityChoice.id, this.selectQuantityChoice)
      this.count(this.selectStampLne.id, this.selectStampLne)
      this.count(this.selectMecPacktype.id, this.selectMecPacktype)
      this.count(this.selectPantoneType.id, this.selectPantoneType)
      this.count(this.selectPantoneType2.id, this.selectPantoneType2)
      this.count(this.selectPack.id, this.selectPack)
      this.count(this.selectColorType.id, this.selectColorType)
      this.count(this.selectRackType.id, this.selectRackType)
      this.count(this.selectSupportType.id, this.selectSupportType)
      this.count(this.selectDelType.id, this.selectDelType)
      this.count(this.selectDelCity.id, this.selectDelCity)
      this.count(this.selectDelCity2.id, this.selectDelCity2)
      this.count(this.selectPicType.id, this.selectPicType)
      this.count(this.selectTransportType.id, this.selectTransportType)
      this.count(this.selectProductNature.id, this.selectProductNature)
      this.count(this.selectProductNature2.id, this.selectProductNature2)
      this.count(this.selectStack.id, this.selectStack)
      this.count(this.selectDelPlace.id, this.selectDelPlace)
      this.count(this.selectTruckType.id, this.selectTruckType)
    }
  },
  created () {
    this.getUsersAndGroups()
    this.getSelectOption()
  }
}
</script>
