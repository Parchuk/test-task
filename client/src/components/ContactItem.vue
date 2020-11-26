<template>
  <li v-if="getStatusLoader">
    <Loader />
  </li>
  <li v-else-if="allContacts.length">
    <ul class="user-list__item" v-for="contact in allContacts" :key="contact._id">
      <router-link tag="li" :to="'/contact-details/' + contact._id" exact class="user-link">
        <span v-if="contact.imgUrl">
          <img
            :src="'https://thawing-oasis-29267.herokuapp.com/uploads/' + contact.imgUrl"
            alt="contactImg"
          />
        </span>
        <span v-else class="userDefaultImg">
          <font-awesome-icon :icon="['fas', 'user']" />
        </span>
      </router-link>
      <template v-for="(attribute, index) in contact.attributes">
        <li class="attributesContact" v-if="index < 3" :key="attribute._id">
          <router-link
            tag="span"
            :to="'/contact-details/' + contact._id"
            exact
            v-if="attribute.attribut === 'name'"
            class="attribut user-link"
            >{{ attribute.attribut }}:</router-link
          >
          <span v-else class="attribut">{{ attribute.attribut }}:</span>
          <span class="value">{{ attribute.value }}</span>
        </li>
      </template>
      <li class="attributesContact">
        <span class="attribut">Created:</span>
        <span class="value">{{ contact.createdAt }}</span>
      </li>
      <span class="delete" v-on:click="setCurrentContactId('DELETE_CONTACT', contact._id)">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </span>
    </ul>
  </li>
  <li v-else>
    <h2>Contacts Not Found</h2>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'

export default {
  props: ['toggleModal', 'setCurrentContactId'],
  components: {
    Loader,
  },
  methods: {},
  computed: mapGetters(['allContacts', 'getStatusLoader', 'getStatusModal']),
  async mounted() {
    this.$store.dispatch('fetchContacts')
  },
}
</script>

<style lang="scss" scoped>
ul {
  box-sizing: border-box;
  width: 100%;
  list-style-type: none;
  padding: 0;
  ul {
    display: flex;
    .user-link {
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        color: #b93e55;
      }
    }
    li {
      display: flex;
      align-items: flex-end;
      &:not(.user-link) {
        width: 20%;
      }
    }
  }
}
.user-list__item {
  background-color: #f3f7fa;
  margin-bottom: 10px;
  transition: 0.3s;
  justify-content: space-between;
  align-items: center;
  &:hover {
    transform: scale(1.02);
  }
  li {
    margin-top: 10px;
    padding: 10px 15px;
    color: darken(#93a6cf, 30%);
    img {
      width: 50px;
    }
  }
}
.delete {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  margin: 0 25px 0 10px;
  cursor: pointer;
  svg {
    color: #b93e55;
    margin: 0 auto;
  }
  &:hover {
    svg {
      color: #9b646e;
    }
  }
}
.userDefaultImg {
  font-size: 35.43px;
  svg {
    margin: 7px 10px 3px 10px;
  }
  border: 1px solid darken(#93a6cf, 30%);
}
.attributesContact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .attribut {
    font-weight: 700;
    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
