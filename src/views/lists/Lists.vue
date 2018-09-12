<template>
  <div class="layout-padding">
    <div class="row">
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
    <div class="row">
      <div class="col-3" v-for="list in lists" v-if="!onlyListItems || list.BaseTemplate == 100" :key="list.Id">
        <q-card>
          <q-card-media class="bg-primary">
            <div class="row items-stretch">
              <div class="col-auto">
                <img :src="list.ImageUrl | spImage">
              </div>
              <div class="col self-center text-light">
                <small>{{list.Id}}</small>
                <!-- todo: type de liste -->
              </div>
            </div>
          </q-card-media>
          <q-card-title>
            {{list.Title}}
            <div slot="right" class="row items-center">
              <q-icon name="equalizer"/>
              {{list.ItemCount}} item(s)
            </div>
          </q-card-title>
          <q-card-main>
            <p class="text-faded" style="height: 96px; -ms-text-overflow: ellipsis;text-overflow: ellipsis;">
              {{list.Description}}</p>
          </q-card-main>
          <q-card-separator/>
          <q-card-actions align="end">
            <q-btn color="primary" @click="updateListFields(list)">
              <q-icon name="shuffle"/>
              <q-popover :ref="'popover-random-items-' + list.Id">
                <q-list link separator class="scroll" style="min-width: 100px">
                  <q-item @click="generateRandomItems(list, 1), $refs['popover-random-items-' + list.Id][0].close()">
                    <q-item-main label="Créer 1 item"/>
                  </q-item>
                  <q-item @click="generateRandomItems(list, 10), $refs['popover-random-items-' + list.Id][0].close()">
                    <q-item-main label="Créer 10 items"/>
                  </q-item>
                  <q-item @click="generateRandomItems(list, 100), $refs['popover-random-items-' + list.Id][0].close()">
                    <q-item-main label="Créer 100 items"/>
                  </q-item>
                  <q-item @click="generateRandomItems(list, 1000), $refs['popover-random-items-' + list.Id][0].close()">
                    <q-item-main label="Créer 1000 items"/>
                  </q-item>
                  <q-item
                    @click="insertDataFrom(list), $refs['popover-random-items-' + list.Id][0].close()">
                    <q-item-main label="Insérer des données depuis..."/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
            <q-btn color="primary" @click="downloadList(list)">
              <q-icon name="file_download"/>
              <!--<q-popover ref="popover-json-lists">-->
              <!--<q-list link separator class="scroll" style="min-width: 100px">-->
              <!--<q-item-->
              <!--v-for="field in list.fields"-->
              <!--v-if="(showHiddenFields || !field.Hidden) && (showReadonlyFields || !field.ReadOnlyField) && (showFromBaseTypeFields || !field.FromBaseType)"-->
              <!--:key="field.title"-->
              <!--&gt;-->
              <!--&lt;!&ndash;<q-item-main :label="field.EntityPropertyName" :sublabel="toSpFieldTypeWithId(field)"/>&ndash;&gt;-->
              <!--</q-item>-->
              <!--</q-list>-->
              <!--</q-popover>-->
            </q-btn>
            <q-btn color="primary" @click="updateListFields(list)">
              <q-icon name="assignment"/>
              <q-popover ref="popover-json-lists">
                <q-list link separator class="scroll" style="min-width: 100px">
                  <q-item
                    v-for="field in list.fields"
                    v-if="(showHiddenFields || !field.Hidden) && (showReadonlyFields || !field.ReadOnlyField) && (showFromBaseTypeFields || !field.FromBaseType)"
                    :key="field.title"
                  >
                    <q-item-main :label="field.Title + ' (' + field.EntityPropertyName + ')'"
                                 :sublabel="field | spFieldTypeWithId"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
            <q-btn color="negative" @click="deleteList(list)">
              <q-icon name="clear"/>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="list in jsonLists" :key="list.Id">
        <q-card>
          <q-card-media :class="listExist(list) | bool-to-background">
            <div class="row items-stretch">
              <div class="col-6">
                <img :src="'/_layouts/15/images/ltgen.png?rev=40' | spImage">
              </div>
              <div class="col-6">
                <!-- todo: type de liste -->
              </div>
            </div>
          </q-card-media>
          <q-card-title>
            {{list.title}}
          </q-card-title>
          <q-card-main>
            <p class="text-faded" style="height: 96px; -ms-text-overflow: ellipsis;text-overflow: ellipsis;">
              {{list.description}}</p>
          </q-card-main>
          <q-card-separator/>
          <q-card-actions align="end">
            <q-btn color="primary">
              <q-icon name="assignment"/>

              <q-popover ref="popover-json-lists">
                <q-list link separator class="scroll" style="min-width: 100px">
                  <q-item
                    v-for="field in list.fields"
                    :key="field.title"
                  >
                    <q-item-main :label="field.title" :sublabel="field.type"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
            <q-btn v-if="listExist(list)" flat round small color="positive">
              <q-tooltip>
                Déjà Ajouté à la liste
              </q-tooltip>
              <q-icon name="playlist_add"></q-icon>
            </q-btn>
            <q-btn v-else="" flat round small @click="addToLists(list)">
              <q-tooltip>
                Ajouter la liste
              </q-tooltip>
              <q-icon name="playlist_add"/>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <insert-data-from-modal ref="insertDataFromModal"></insert-data-from-modal>

    <q-fixed-position corner="bottom-right" :offset="[86, 18]">
      <q-btn round color="primary" @click="refresh">
        <q-icon name="sync"/>
      </q-btn>
    </q-fixed-position>
    <q-fixed-position corner="bottom-right" :offset="[18, 18]">
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
    </q-fixed-position>
  </div>
</template>

<script>
  import {
    Dialog,
    QBtn,
    QCard,
    QCardActions,
    QCardMain,
    QCardMedia,
    QCardSeparator,
    QCardTitle, QCheckbox, QFab, QFabAction,
    QFixedPosition,
    QIcon, QItem, QItemMain, QList, QPopover, QTooltip, Loading, Toast
  } from 'quasar-framework'
  import { UPDATE_LISTS, UPDATE_LIST_FIELDS_IN_LISTS } from 'store/mutation-types'
  import List from 'models/List'
  import {
    CREATE_LIST,
    CREATE_LIST_FIELD,
    CREATE_LIST_ITEMS,
    DELETE_LIST,
    UPDATE_INSERT_DATA_TO_LIST
  } from '../../store/mutation-types'
  import PrimaryLookupField from '../../models/PrimaryLookupField'
  import SecondaryLookupField from '../../models/SecondaryLookupField'
  import Field from '../../models/Field'
  import { fieldType } from '../../utils/enums'
  import InsertDataFromModal from './insertDataFromModal.vue'
  import { ipcRenderer } from 'electron'

  export default {
    components: {
      QCard,
      QBtn,
      QCardActions,
      QCardSeparator,
      QCardMain,
      QCardTitle,
      QIcon,
      QCardMedia,
      QFixedPosition,
      QCheckbox,
      QTooltip,
      QPopover,
      QList,
      QItem,
      QItemMain,
      QFab,
      QFabAction,
      InsertDataFromModal
    },
    data () {
      return {
        onlyListItems: true,
        showHiddenFields: false,
        showReadonlyFields: false,
        showFromBaseTypeFields: false
      }
    },
    methods: {
      updateListFields (list) {
        this.$store.dispatch(UPDATE_LIST_FIELDS_IN_LISTS, list)
      },
      addToLists (list) {
        const vm = this
        Dialog.create({
          title: `Ajout de la liste ${list.title}`,
          message: `Êtes-vous sur de vouloir ajouter la liste ${list.title} au site sic ?`,
          buttons: [
            {
              label: 'Non',
              color: 'negative',
              outline: true,
              style: 'text-decoration: underline'
            },
            {
              label: 'Oui',
              color: 'positive',
              handler () {
                // check if dependencies exists
                const dependencies = [...new Set(list.fields
                  .filter(f => f.lookupList && !vm.lists.some(l => l.Title === f.lookupList))
                  .map(f => f.lookupList))]
                if (dependencies.length) {
                  Toast.create.negative(`Impossible de trouver les listes <b>${dependencies.join(', ')}</b>`)
                  return
                }
                const l = new List(list.title, list.description)
                Loading.show({message: `Création de la liste ${list.title}`})
                vm.$store.dispatch(CREATE_LIST, l)
                  .then(async id => {
                    for (const f of list.fields) {
                      Loading.show({message: `Création du champs ${f.title} dans la liste ${list.title}`})
                      if (f.lookupList) {
                        const lookupListId = vm.lists.find(l => l.Title === f.lookupList).Id
                        const field = new PrimaryLookupField(f.title, f.type, f.lookupField, lookupListId, f.multiple)
                        const primaryLookupFieldId = await vm.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: field})
                        if (f.fieldType) {
                          for (const sf of f.fields) {
                            Loading.show({message: `Création du champs ${sf.title} dans la liste ${list.title}`})
                            const subField = new SecondaryLookupField(sf.title, fieldType.lookup.label, sf.lookupField, lookupListId, primaryLookupFieldId, f.multiple)
                            await vm.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: subField})
                          }
                        }
                      }
                      else {
                        const field = new Field(f.title, f.type)
                        await vm.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: field})
                      }
                    }
                    Loading.hide()
                  })
              }
            }
          ]
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
            fieldGroupTasks.push(this.$http.api.get('siteusers?$select=id&$filter=PrincipalType eq 1')
              .then(response => {
                fieldGroups.filter(fg => fg.group === group).forEach(fg => {
                  fg.users = response.data.value
                })
              }))
          }
          else {
            fieldGroupTasks.push(this.$http.api.get(`sitegroups/getbyname('${group.group}')/users?$select=id&$filter=PrincipalType eq 1`)
              .then(response => {
                fieldGroups.filter(fg => fg.group === group).forEach(fg => {
                  fg.users = response.data.value
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
            lookupFieldsTasks.push(this.$http.api.get(`lists(guid'${lookupFieldListId.replace('{', '').replace('}', '')}')/items?$select=id`)
              .then(response => {
                lookupFields.filter(fg => fg.LookupList === lookupFieldListId).forEach(fg => {
                  fg.values = response.data.value
                })
              }))
          }
        }
        await Promise.all(lookupFieldsTasks)
        // eslint-disable-next-line no-unreachable
        if (count === 1) {
          Loading.show({message: `Ajout d'un élément dans la liste ${list.Title}`})
        }
        else {
          Loading.show({message: `Ajout de ${count} éléments simultanément dans la liste ${list.Title}`})
        }
        this.$store.dispatch(CREATE_LIST_ITEMS, {list, count, fieldGroups, lookupFields})
          .then(() => {
            Loading.hide()
            Toast.create.positive(`Ajout réalisé avec succès`)
          })
      },
      deleteList (list) {
        const vm = this
        Dialog.create({
          title: `Suppression de ${list.Title}`,
          message: `Êtes-vous sur de vouloir supprimer la liste ${list.Title} au site sic ?`,
          buttons: [
            {
              label: 'Non',
              color: 'negative',
              outline: true,
              style: 'text-decoration: underline'
            },
            {
              label: 'Oui',
              color: 'positive',
              handler () {
                vm.$store.dispatch(DELETE_LIST, list)
              }
            }
          ]
        })
      },
      insertDataFrom (list) {
        this.$store.commit(UPDATE_INSERT_DATA_TO_LIST, list)
        this.$refs.insertDataFromModal.open()
      },
      async downloadList (list) {
        console.log(list)
        const response = await this.$http.api.get(`lists(guid'${list.Id}')/fields`)
        const items = []
        const values = response.data.value.filter(v => !v.Hidden && !v.ReadOnlyField && !v.FromBaseType)
        console.log(values)
        for (let i of values) {
          if (i.FieldTypeKind === 7) {
            console.log('lookup')
          }
          items.push({
            title: i.Title,
            type: fieldType.find(i.FieldTypeKind).label
          })
        }
        ipcRenderer.send('downloadJson', {title: list.Title, items: items})
        console.log(items)
      },
      refresh () {
        this.$store.dispatch(UPDATE_LISTS)
      },
      __addTolists (list) {
        const dependencies = [...new Set(list.fields
          .filter(f => f.lookupList && !this.lists.some(l => l.Title === f.lookupList))
          .map(f => f.lookupList))]
        if (dependencies.length) {
          Toast.create.negative(`Impossible de trouver les listes <b>${dependencies.join(', ')}</b>`)
          return
        }
        const l = new List(list.title, list.description)
        Loading.show({message: `Création de la liste ${list.title}`})
        this.$store.dispatch(CREATE_LIST, l)
          .then(async id => {
            for (const f of list.fields) {
              Loading.show({message: `Création du champs ${f.title} dans la liste ${list.title}`})
              if (f.lookupList) {
                const lookupListId = this.lists.find(l => l.Title === f.lookupList).Id
                const field = new PrimaryLookupField(f.title, f.type, f.lookupField, lookupListId, f.multiple)
                const primaryLookupFieldId = await this.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: field})
                if (f.fieldType) {
                  for (const sf of f.fields) {
                    Loading.show({message: `Création du champs ${sf.title} dans la liste ${list.title}`})
                    const subField = new SecondaryLookupField(sf.title, fieldType.lookup.label, sf.lookupField, lookupListId, primaryLookupFieldId, f.multiple)
                    await this.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: subField})
                  }
                }
              }
              else {
                const field = new Field(f.title, f.type)
                await this.$store.dispatch(CREATE_LIST_FIELD, {id: id, field: field})
              }
            }
            Loading.hide()
          })
      }
    },
    computed: {
      lists () {
        return this.$store.getters.visibleLists
      },
      jsonLists () {
        return this.$store.state.jsonLists
      }
    },
    created () {
      if (!this.lists.length) {
        this.$store.dispatch(UPDATE_LISTS)
      }
    }
  }
</script>
