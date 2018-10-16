<template>
  <div class="layout-padding">
    <div class="row q-mt-md q-mb-md">
      <div class="col-12">
        <q-table
          :filter="tableFilter"

          ref="table"
          :data="tableData"
          :columns="tableColumns"
          :pagination.sync="tablePagination"
          @refresh="refresh"
          row-key="name">
            <template slot="top-left" slot-scope="props">
              <q-search
                hide-underline
                color="secondary"
                v-model="tableFilter"
                class="col-6"
              />
            </template>
             <q-td slot='body-cell-action' slot-scope="props" :propos="props">
            <div>
               <q-btn color="orange"  @click="modifItem(props.row)" >
              <q-icon name="assignment"/>
              <q-tooltip>
                Modifier un item
              </q-tooltip>
               </q-btn>
            <q-btn  color="negative" @click="deleteItem(props.row)">
              <q-icon name="clear"/>
              <q-tooltip>
                Supprimer un item
              </q-tooltip>
            </q-btn>
            </div>
            </q-td>

        </q-table>
      </div>
    </div>
     <insert-items ref="InsertItems" ></insert-items>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-fab
        color="primary"
        active-icon="keyboard_arrow_down"
        direction="up"
      >
        <q-tooltip
          slot="tooltip"
          anchor="center left"
          self="center right"
          :offset="[20, 0]"
        >
          Ajouter un item
        </q-tooltip>
        <q-fab-action color="purple" icon="add" @click="addItem">
          <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">Ajouter un item</q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>
<q-page-sticky position="bottom-right" :offset="[80, 18]">
      <q-btn
        round
        color="red"
        icon="clear"
        size="18px"
        @click="dellAllItems"/>
    </q-page-sticky>
  </div>
</template>

<script>

import InsertItems from 'src/components/InsertItems.vue'

export default {
  components: {
    InsertItems
  },
  data () {
    return {
      Fields: [],
      idItemModif: 0,
      isAdd: false,
      Data: [],
      titleList: '',
      idList: '',
      tablePagination: {
        rowsPerPage: 10,
        options: [5, 10, 15, 30, 50, 500],
        page: 1
      },
      tableFilter: '',
      tableColumns: [{
        label: '',
        field: 'action',
        name: 'action',
        format (value, row) {
          return ``
        },
        width: '200px'
      }]
    }
  },
  methods: {
    refresh (done) {
      this.timeout = setTimeout(() => {
        done()
      }, 5000)
    },
    addItem () {
      this.isAdd = true
      this.$refs.InsertItems.open()
    },
    modifItem (item) {
      this.idItemModif = item.Id
      this.isAdd = false
      this.$refs.InsertItems.open()
    },
    dellAllItems () {
      for (let i = 0; i < this.Data.length; i++) {
        this.$http.api.lists.deleteItem(this.idList, this.Data[i].Id)
      }
      this.$q.notify({
        message: `Tous les items de la liste sont supprimer`,
        color: 'positive',
        timeout: 4000,
        icon: 'check',
        position: 'top'
      })
    },
    deleteItem (item) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'êtes-vous sûr de vouloir supprimer cet item ?',
        ok: 'Supprimer',
        cancel: 'Ne pas supprimer'
      }).then(() => {
        this.$http.api.lists.deleteItem(this.idList, item.Id)
        console.log(this.tableData)
        this.$q.notify({
          message: `L'item ${item.Title} a été supprimer de la liste`,
          color: 'positive',
          timeout: 4000,
          icon: 'check',
          position: 'top'
        })
      }).catch(() => {
        this.$q.notify({
          message: `L'item ${item.Title} n'a pas été supprimer de la liste`,
          color: 'positive',
          timeout: 4000,
          icon: 'check',
          position: 'top'
        })
      })
    }
  },
  computed: {
    tableData () {
      return [...this.Data]
    }
  },
  created () {
    this.idList = this.$store.state.changeVue.Id
    this.titleList = this.$store.state.changeVue.Title
    let nbItemsList = this.$store.state.changeVue.ItemCount
    this.$http.api.lists.getFields(this.idList).then(response => {
      let fields = response.value
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].Required || (!fields[i].Hidden && !fields[i].ReadOnlyField && !fields[i].FromBaseType)) {
          if (fields[i].FieldTypeKind === 20 || fields[i].FieldTypeKind === 7) {
            this.Fields.push({name: (fields[i].EntityPropertyName + 'Id'), type: fields[i].FieldTypeKind, label: fields[i].Title})
          } else {
            this.Fields.push({name: fields[i].EntityPropertyName, type: fields[i].FieldTypeKind, label: fields[i].Title})
          }
        }
      }
      for (let i = 0; i < this.Fields.length; i++) {
        this.tableColumns.push({name: this.Fields[i].name, label: this.Fields[i].label, field: this.Fields[i].name})
      }
    })
    this.$http.api.lists.getItems(this.idList, nbItemsList).then(response => {
      this.Data = response.value
    })
  }
}
</script>
