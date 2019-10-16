<template>
  <!--<v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item two-line>
      &lt;!&ndash;<v-list-item-avatar>
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/v.png"
          height="34"
          contain
        />
      </v-list-item-avatar>&ndash;&gt;

      <v-list-item-title class="title">
        BigBlue
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      &lt;!&ndash; Bug in Vuetify for first child of v-list not receiving proper border-radius &ndash;&gt;
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white&#45;&#45;text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>

    &lt;!&ndash;<template v-slot:append>
      <v-list nav>
        <v-list-item
          to="/upgrade"
        >
          <v-list-item-action>
            <v-icon>mdi-package-up</v-icon>
          </v-list-item-action>

          <v-list-item-title class="font-weight-light">
            Upgrade To PRO
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>&ndash;&gt;
  </v-navigation-drawer>-->
</template>

<script>
// Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      links: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
        },
        /*{
          to: '/user-profile',
          icon: 'mdi-account',
          text: 'User Profile'
        }*/
      ]
    }),

    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
    }
  }
</script>
