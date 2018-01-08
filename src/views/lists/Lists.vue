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
    </div>
    <div class="row">
      <div class="col-3" v-for="list in lists" v-if="!onlyListItems || list.BaseTemplate == 100" :key="list.Id">
        <q-card>
          <q-card-media class="bg-primary">
            <div class="row items-stretch">
              <div class="col-6">
                <img :src="list.ImageUrl | spImage">
              </div>
              <div class="col-6">
                <!-- todo: type de liste -->
              </div>
            </div>
          </q-card-media>
          <q-card-title>
            {{list.Title}}
            <div slot="right" class="row items-center">
              <q-icon name="euro_symbol"/>
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
              <q-icon name="assignment"/>
              <q-popover ref="popover-json-lists">
                <q-list link separator class="scroll" style="min-width: 100px">
                  <q-item
                    v-for="field in list.fields"
                    v-if="(showHiddenFields || !field.Hidden) && (showReadonlyFields || !field.ReadOnlyField)"
                    :key="field.title"
                  >
                    <q-item-main :label="field.EntityPropertyName" :sublabel="field.type"/>
                  </q-item>
                </q-list>
              </q-popover>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="list in jsonLists" :key="list.Id">
        <q-card>
          <q-card-media class="bg-warning">
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
            <q-btn flat round small @click="addToLists(list)">
              <q-tooltip>
                Ajouter la liste
              </q-tooltip>
              <q-icon name="playlist_add"/>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
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
    QCardTitle, QCheckbox,
    QFixedPosition,
    QIcon, QItem, QItemMain, QList, QPopover, QTooltip
  } from 'quasar-framework'
  import {UPDATE_LISTS, UPDATE_LIST_FIELDS_IN_LISTS} from 'store/mutation-types'
  import List from 'models/List'
  import {CREATE_LIST} from '../../store/mutation-types'

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
      QItemMain
    },
    data () {
      return {
        onlyListItems: false,
        showHiddenFields: false,
        showReadonlyFields: false
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
                const l = new List(list.title, list.description, list.fields)
                vm.$store.dispatch(CREATE_LIST, l)
              }
            }
          ]
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
      this.$store.dispatch(UPDATE_LISTS)
    }
  }
</script>
