<template>
  <div class="layout-padding">
    <div class="row q-mt-md">
      <div class="col-3">
        <q-checkbox label="Liste items uniquement" v-model="onlyListItems"></q-checkbox>
      </div>
      <div class="col-3">
        <q-checkbox label="Afficher les fields cachés" v-model="showHiddenFields"></q-checkbox>
      </div>
      <div class="col-3">
        <q-checkbox label="Afficher les fields en lecture seule" v-model="showReadonlyFields"></q-checkbox>
      </div>
      <div class="col-3">
        <q-checkbox label="Afficher les fields de base" v-model="showFromBaseTypeFields"></q-checkbox>
      </div>
    </div>
    <div class="row q-mt-md q-mb-md">
      <div class="col-12">
        <q-table
          title=""
          :filter="tableFilter"
          :data="tableData"
          :columns="tableColumns"
          :pagination.sync="tablePagination"
          row-key="name">
          <template slot="top-left" slot-scope="props">
            <q-search
              hide-underline
              color="secondary"
              v-model="tableFilter"
              class="col-6"
            />
          </template>
          <q-td slot="body-cell-title" slot-scope="props" :props="props">
            <q-chip v-if="!props.row.jsonList" small color="primary">{{ props.value }}</q-chip>
            <q-chip v-else-if="listExist(props.row)" small color="positive">{{ props.value }}</q-chip>
            <q-chip v-else="" small color="orange">{{ props.value }}</q-chip>
          </q-td>
          <q-td slot='body-cell-action' slot-scope="props" :props="props">
            <div v-if="!props.row.jsonList">
              <!-- Items generation -->
              <q-btn class="q-mr-xs" color="primary" size="12px" round>
                <q-icon name="shuffle"/>
                <q-popover :ref="'popover-random-items-' + props.row.Id">
                  <q-list link separator class="scroll" style="min-width: 100px">
                    <q-item
                      @click.native="generateRandomItems(props.row, 1), $refs['popover-random-items-' + props.row.Id].hide()">
                      <q-item-main label="Créer 1 item"/>
                    </q-item>
                    <q-item
                      @click.native="generateRandomItems(props.row, 10), $refs['popover-random-items-' + props.row.Id].hide()">
                      <q-item-main label="Créer 10 items"/>
                    </q-item>
                    <q-item
                      @click.native="generateRandomItems(props.row, 100), $refs['popover-random-items-' + props.row.Id].hide()">
                      <q-item-main label="Créer 100 items"/>
                    </q-item>
                    <q-item
                      @click.native="generateRandomItems(props.row, 1000), $refs['popover-random-items-' + props.row.Id].hide()">
                      <q-item-main label="Créer 1000 items"/>
                    </q-item>
                    <q-item
                      @click.native="insertDataFrom(props.row), $refs['popover-random-items-' + props.row.Id].hide()">
                      <q-item-main label="Insérer des données depuis..."/>
                    </q-item>
                    <q-item
                      @click.native="insertDataFromFile(props.row), $refs['popover-random-items-' + props.row.Id].hide()">
                      <q-item-main label="Insérer des données depuis un fichier"/>
                    </q-item>
                  </q-list>
                </q-popover>
                <q-tooltip>
                  Création items Randoms/Update avec import fichier Json/Excel ou un autre environement
                </q-tooltip>
              </q-btn>
              <!-- Download list -->
              <q-btn :loading="props.row.btnDownloadListLoading" class="q-mr-xs" @click="downloadList(props.row)" size="12px" round
                     color="primary">
                  <q-tooltip>
                      Telecharge au format Json les infos sur la liste(Field/Type)
                  </q-tooltip>
                  <q-icon name="file_download" />
              </q-btn>
              <!-- Get list Fields -->
              <q-btn :loading="props.row.btnListFieldsLoading" class="q-mr-xs" color="primary"
                     @click="updateListFields(props.row)" size="12px" round>
                <q-popover :ref="'popover-json-lists' + props.row.Id">
                  <q-list link separator class="scroll" style="min-width: 100px">
                    <q-item
                      v-for="field in props.row.fields"
                      v-if="(showHiddenFields || !field.Hidden) && (showReadonlyFields || !field.ReadOnlyField) && (showFromBaseTypeFields || !field.FromBaseType)"
                      :key="field.title"
                    >
                      <q-item-main :label="field.Title + ' (' + field.EntityPropertyName + ')'"/>
                    </q-item>
                  </q-list>
                </q-popover>
                  <q-tooltip>
                    Afficher les fields de la liste
                  </q-tooltip>
                  <q-icon name="assignment"/>
              </q-btn>
              <q-btn class="q-mr-xs" color="negative" @click="deleteList(props.row)" size="12px" round>
                <q-tooltip>
                  Supprimer une liste
                </q-tooltip>
                <q-icon name="clear"/>
              </q-btn>
            </div>
            <div v-else="">
              <q-btn class="q-mr-xs" color="primary" size="12px" round>
                <q-icon name="assignment"/>
                <q-popover ref="popover-json-lists">
                  <q-list link separator class="scroll" style="min-width: 100px">
                    <q-item
                      v-for="field in props.row.fields"
                      :key="field.title"
                    >
                      <q-item-main :label="field.title" :sublabel="field.type"/>
                    </q-item>
                  </q-list>
                </q-popover>
              </q-btn>
              <q-btn class="q-mr-xs" v-if="listExist(props.row)" size="12px" round color="positive">
                <q-tooltip>
                  Déjà Ajouté à la liste
                </q-tooltip>
                <q-icon name="playlist_add"></q-icon>
              </q-btn>
              <q-btn class="q-mr-xs" v-else="" size="12px" round @click="addToLists(props.row)">
                <q-tooltip>
                  Ajouter la liste
                </q-tooltip>
                <q-icon name="playlist_add"/>
              </q-btn>
            </div>
          </q-td>
        </q-table>
      </div>
    </div>

    <insert-data-from-modal ref="insertDataFromModal"></insert-data-from-modal>

    <insert-data-from-file-modal ref="insertDataFromFileModal"></insert-data-from-file-modal>

    <q-page-sticky position="bottom-right" :offset="[80, 18]">
      <q-btn
        round
        color="orange"
        icon="sync"
        size="18px"
        @click="refresh">
           <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              Synchroniser
          </q-tooltip>
      </q-btn>
    </q-page-sticky>
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
          Ajouter des listes
        </q-tooltip>
        <q-fab-action color="purple" icon="add" @click="addAllLists">
          <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">Ajouter toutes les listes</q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script>

import List from '../../models/List'
import {
  UPDATE_LISTS,
  UPDATE_LIST_FIELDS_IN_LISTS,
  CREATE_LIST,
  CREATE_LIST_FIELD,
  CREATE_LIST_ITEMS,
  DELETE_LIST,
  UPDATE_INSERT_DATA_TO_LIST
} from 'src/store/mutation-types'
import PrimaryLookupField from '../../models/PrimaryLookupField'
import SecondaryLookupField from '../../models/SecondaryLookupField'
import Field from '../../models/Field'
import { fieldType } from '../../utils/enums'
import InsertDataFromModal from 'src/components/InsertDataFromModal.vue'
import InsertDataFromFileModal from 'src/components/InsertDataFromFileModal.vue'
import { ipcRenderer } from 'electron'

export default {
  components: {
    InsertDataFromModal,
    InsertDataFromFileModal
  },
  data () {
    return {
      onlyListItems: true,
      showHiddenFields: false,
      showReadonlyFields: false,
      showFromBaseTypeFields: false,
      tablePagination: {
        rowsPerPage: 10,
        options: [5, 10, 15, 30, 50, 500],
        page: 1
      },
      tableFilter: '',
      tableColumns: [
        {
          name: 'id',
          label: 'Id',
          field: 'Id',
          align: 'left',
          style: 'width: 20%'
        },
        {
          name: 'title',
          label: 'Titre',
          field: 'Title',
          align: 'left',
          sortable: true
        },
        {
          name: 'itemCount',
          label: 'Nombre d\'éléments',
          field: 'ItemCount',
          sortable: true,
          sort: (a, b) => a - b
        },
        // {
        //   name: 'description',
        //   label: 'Description',
        //   field: 'Description',
        //   align: 'left',
        //   sortable: true
        // },
        {
          label: '',
          field: 'action',
          name: 'action',
          format (value, row) {
            return ``
          },
          width: '200px'
        }
      ]
    }
  },
  methods: {
    async updateListFields (list) {
      this.$set(list, 'btnListFieldsLoading', true)
      try {
        await this.$store.dispatch(UPDATE_LIST_FIELDS_IN_LISTS, list)
      } catch (e) {
        console.log(e)
      }
      this.$set(list, 'btnListFieldsLoading', false)
      await new Promise(resolve => setTimeout(resolve, 1))
      this.$refs['popover-json-lists' + list.Id].show()
    },
    addToLists (list) {
      const vm = this
      this.$q.dialog({
        title: `Ajout de la liste ${list.title}`,
        message: `Êtes-vous sur de vouloir ajouter la liste ${list.title} au site sic ?`,
        cancel: {
          label: 'Non',
          color: 'negative',
          outline: true,
          style: 'text-decoration: underline'
        },
        ok: {
          label: 'Oui',
          color: 'positive'
        }
      }).then(() => {
        // check if dependencies exists
        const dependencies = [...new Set(list.fields
          .filter(f => f.lookupList && !vm.lists.some(l => l.Title === f.lookupList))
          .map(f => f.lookupList))]
        if (dependencies.length) {
          this.$q.notify({
            message: `Impossible de trouver les listes <b>${dependencies.join(', ')}</b>`,
            color: 'negative',
            timeout: 4000,
            icon: 'check',
            position: 'top'
          })
          return
        }
        const l = new List(list.title, list.description)
        this.$q.loading.show({message: `Création de la liste ${list.title}`})
        vm.$store.dispatch(CREATE_LIST, l)
          .then(async id => {
            for (const f of list.fields) {
              this.$q.loading.show({message: `Création du champs ${f.title} dans la liste ${list.title}`})
              if (f.lookupList) {
                const lookupListId = vm.lists.find(l => l.Title === f.lookupList).Id
                const field = new PrimaryLookupField(f.title, f.type, f.lookupField, lookupListId, f.multiple)
                const primaryLookupFieldId = await vm.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: field})
                if (f.fieldType) {
                  for (const sf of f.fields) {
                    this.$q.loading.show({message: `Création du champs ${sf.title} dans la liste ${list.title}`})
                    const subField = new SecondaryLookupField(sf.title, fieldType.lookup.label, sf.lookupField, lookupListId, primaryLookupFieldId, f.multiple)
                    await vm.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: subField})
                  }
                }
              } else {
                const field = new Field(f.title, f.type)
                await vm.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: field})
              }
            }
            this.$q.loading.hide()
          })
      })
    },
    addAllLists () {
      for (const jsonList of this.jsonLists) {
        if (!this.listExist(jsonList)) {
          this.__addTolists(jsonList)
        }
      }
    },
    // converters
    listExist (list) {
      return this.lists.some(l => l.Title === list.title)
    },
    async generateRandomItems (list, count) {
      const jlist = this.jsonLists.find(jl => jl.title === list.Title)
      const fieldGroups = list.fields.filter(f => f.FieldTypeKind === fieldType.user.key).map(f => {
        const jf = jlist.fields.find(jf => jf.title === f.Title)
        if (!jf || !jf.group) {
          return {title: f.Title}
        }
        return {title: jf.title, group: jf.group}
      })
      const groups = [...new Set(fieldGroups.map(fg => fg.group))]
      const fieldGroupTasks = []
      for (let group of groups) {
        if (!group) {
          fieldGroupTasks.push(this.$http.api.siteUsers.getIds()
            .then(response => {
              fieldGroups.filter(fg => fg.group === group).forEach(fg => {
                fg.users = response.value
              })
            }))
        } else {
          fieldGroupTasks.push(this.$http.api.siteGroups.getByName(group.group)
            .then(response => {
              fieldGroups.filter(fg => fg.group === group).forEach(fg => {
                fg.users = response.value
              })
            }))
        }
      }
      await Promise.all(fieldGroupTasks)
      const lookupFields = list.fields
        .filter(f => f.FieldTypeKind === fieldType.lookup.key && !f.Hidden && !f.ReadOnlyField && !f.FromBaseType)
        .map(f => {
          return {title: f.Title, LookupList: f.LookupList, AllowMultipleValues: f.AllowMultipleValues}
        })
      const lookupFieldsListId = [...new Set(lookupFields.map(lf => lf.LookupList))]
      const lookupFieldsTasks = []
      for (let lookupFieldListId of lookupFieldsListId) {
        if (lookupFieldListId) {
          lookupFieldsTasks.push(this.$http.api.lists.getItemsIds(lookupFieldListId.replace('{', '').replace('}', ''))
            .then(response => {
              lookupFields.filter(fg => fg.LookupList === lookupFieldListId).forEach(fg => {
                fg.values = response.value
              })
            }))
        }
      }
      await Promise.all(lookupFieldsTasks)
      // eslint-disable-next-line no-unreachable
      if (count === 1) {
        this.$q.loading.show({message: `Ajout d'un élément dans la liste ${list.Title}`})
      } else {
        this.$q.loading.show({message: `Ajout de ${count} éléments simultanément dans la liste ${list.Title}`})
      }
      this.$store.dispatch(CREATE_LIST_ITEMS, {list, count, fieldGroups, lookupFields})
        .then(() => {
          this.$q.loading.hide()
          this.$q.notify({
            message: `Ajout réalisé avec succès`,
            color: 'positive',
            timeout: 4000,
            icon: 'check',
            position: 'top'
          })
        })
    },
    deleteList (list) {
      const vm = this
      this.$q.dialog({
        title: `Suppression de ${list.Title}`,
        message: `Êtes-vous sur de vouloir supprimer la liste ${list.Title} au site sic ?`,
        cancel:
          {
            label: 'Non',
            color: 'negative',
            outline: true,
            style: 'text-decoration: underline'
          },
        yes: {
          label: 'Oui',
          color: 'positive'
        }
      }).then(() => {
        vm.$store.dispatch(DELETE_LIST, list)
      })
    },
    insertDataFrom (list) {
      this.$store.commit(UPDATE_INSERT_DATA_TO_LIST, list)
      this.$refs.insertDataFromModal.open()
    },
    insertDataFromFile (list) {
      this.$store.commit(UPDATE_INSERT_DATA_TO_LIST, list)
      this.$refs.insertDataFromFileModal.open()
    },
    async downloadList (list) {
      this.$set(list, 'btnDownloadListLoading', true)
      const response = await this.$http.api.lists.getFields(list.Id)
      const items = []
      const values = response.value.filter(v => !v.Hidden && !v.ReadOnlyField && !v.FromBaseType)
      for (let i of values) {
        if (i.FieldTypeKind === 7) {
          console.log('lookup')
        }
        items.push({
          title: i.Title,
          type: fieldType.find(i.FieldTypeKind).label
        })
      }

      console.log(items)
      ipcRenderer.send('downloadJson', {title: list.Title, items: items})

      this.$set(list, 'btnDownloadListLoading', false)
      this.$q.notify({
        message: `La liste a bien été téléchargé à l'emplacement défini dans l'environement`,
        color: 'positive',
        timeout: 4000,
        icon: 'check',
        position: 'bottom'
      })
    },
    refresh () {
      this.$q.loading.show({message: 'Récupérations des données..'})
      this.$store.dispatch(UPDATE_LISTS).then(_ => {
        ipcRenderer.send('readJsonFiles')
        this.$q.loading.hide()
      })
    },
    __addTolists (list) {
      const dependencies = [...new Set(list.fields
        .filter(f => f.lookupList && !this.lists.some(l => l.Title === f.lookupList))
        .map(f => f.lookupList))]
      if (dependencies.length) {
        this.$q.notify({
          message: `Impossible de trouver les listes <b>${dependencies.join(', ')}</b>`,
          color: 'negative',
          timeout: 4000,
          icon: 'check',
          position: 'top'
        })
        return
      }
      const l = new List(list.title, list.description)
      this.$q.loading.show({message: `Création de la liste ${list.title}`})
      this.$store.dispatch(CREATE_LIST, l)
        .then(async id => {
          for (const f of list.fields) {
            this.$q.loading.show({message: `Création du champs ${f.title} dans la liste ${list.title}`})
            if (f.lookupList) {
              const lookupListId = this.lists.find(l => l.Title === f.lookupList).Id
              const field = new PrimaryLookupField(f.title, f.type, f.lookupField, lookupListId, f.multiple)
              const primaryLookupFieldId = await this.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: field})
              if (f.fieldType) {
                for (const sf of f.fields) {
                  this.$q.loading.show({message: `Création du champs ${sf.title} dans la liste ${list.title}`})
                  const subField = new SecondaryLookupField(sf.title, fieldType.lookup.label, sf.lookupField, lookupListId, primaryLookupFieldId, f.multiple)
                  await this.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: subField})
                }
              }
            } else {
              const field = new Field(f.title, f.type)
              await this.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: field})
            }
          }
          this.$q.loading.hide()
        })
    }
  },
  computed: {
    lists () {
      return this.$store.getters.visibleLists
    },
    jsonLists () {
      return this.$store.state.jsonLists
    },
    tableData () {
      let newJsonLists = this.jsonLists.map(x => {
        return {
          ...x,
          jsonList: true,
          Title: x.title
        }
      })
      return [...this.lists, ...newJsonLists]
    }
  },
  created () {
    if (!this.lists.length) {
      this.$store.dispatch(UPDATE_LISTS)
    }
  }
}
</script>
