<template>
  <div class="contact-details">
    <div class="contact-details__contaiter">
      <div class="user-img-box">
        <span v-if="currentContact.imgUrl">
          <img
            :src="'https://contact-list-2020.herokuapp.com/uploads/' + currentContact.imgUrl"
            alt="userImg"
          />
        </span>
        <span v-else class="userDefaultImg">
          <font-awesome-icon :icon="['fas', 'user']" />
        </span>
      </div>
      <ul class="user-details">
        <li
          class="attributesContact"
          v-for="attribute in currentContact.attributes"
          :key="attribute._id"
          ref="listAttributes"
        >
          <button class="backOneStep editActive" v-on:click="backOneStep($event, attribute._id)">
            <font-awesome-icon :icon="['fas', 'undo']" />
          </button>
          <input class="attribut editActive" :value="attribute.attribut" />
          <input class="attributValue editActive" :value="attribute.value" />
          <button
            class="cancelChange editActive"
            v-on:click="toggleModal, setCurrentContactId('BACK_ONE_STEP', attribute._id)"
          >
            Cancel
          </button>
          <button class="attributSave editActive" v-on:click="saveAttribute($event, attribute._id)">
            Save
          </button>

          <i class="delete" v-on:click="setCurrentContactId('DELETE_ATTRIBUTE', attribute._id)">
            <font-awesome-icon :icon="['fas', 'trash']"/></i
          ><i class="edit" v-on:click="editAttribute($event, attribute._id)"
            ><font-awesome-icon :icon="['fas', 'pen']"
          /></i>
        </li>
        <li class="attributesContact">
          <span class="attribut">Created</span> {{ this.currentContact.createdAt }}
        </li>
      </ul>
    </div>
    <form @submit.prevent="submitHandler">
      <p>You can add new information for this user</p>
      <input type="text" v-model="newAttribut" placeholder="Name attribute" required />
      <input type="text" v-model="newValue" placeholder="Value attribute" required />
      <input type="submit" value="Add new attribute" />
    </form>
    <router-link to="/">Back to Contact List</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactListService from '../ContactListService'

export default {
  computed: mapGetters(['allContacts']),
  props: ['toggleModal', 'setCurrentContactId'],
  data() {
    return {
      currentContact: [],
      newAttribut: '',
      newValue: '',
      editedAttribut: '',
      editedValue: '',
      oldAttribut: '',
      oldValue: '',
    }
  },
  methods: {
    findCurrentContact() {
      let currentContact = [...this.allContacts].filter(
        (contact) => contact._id === this.$route.params.id
      )
      this.currentContact = currentContact[0]
    },
    async submitHandler() {
      const newArrtibute = {
        attribut: this.newAttribut,
        value: this.newValue,
        id: this.currentContact._id,
      }
      this.newAttribut = ''
      this.newValue = ''
      await ContactListService.insertContact('add-attribute', newArrtibute).then(
        (createdArrtibute) => {
          this.currentContact.attributes.push(createdArrtibute.data)
          const newContactList = [...this.allContacts, this.currentContact]
          this.$store.dispatch('updateContacts', newContactList)
        }
      )
    },
    editAttribute(e, id) {
      this.setOldAttributeValue(id)
      if (e.target.parentNode.classList.contains('edit')) {
        e.target.parentNode.parentNode.classList.toggle('editActive')
        let $elm = this.$refs.listAttributes
        for (let i = 0; i < $elm.length; i++) {
          if ($elm[i] !== e.target.parentNode.parentNode) {
            $elm[i].classList.remove('editActive')
          }
        }
      }
    },
    saveAttribute(e, id) {
      this.editedAttribut = e.target.previousSibling.previousSibling.previousSibling.value
      this.editedValue = e.target.previousSibling.previousSibling.value

      const editedAttribute = {
        attribut: this.editedAttribut,
        value: this.editedValue,
        id,
      }
      ContactListService.updateAttribute('update-attribute', editedAttribute)
      e.target.parentNode.classList.remove('editActive')
      this.editedAttribut = ''
      this.editedValue = ''
    },
    setOldAttributeValue(id) {
      const currentAttribute = [...this.currentContact.attributes].filter(
        (attribut) => attribut._id === id
      )
      this.oldAttribut = currentAttribute[0].attribut
      this.oldValue = currentAttribute[0].value
    },
    backOneStep(e, id) {
      const editedAttribute = {
        attribut: this.oldAttribut,
        value: this.oldValue,
        id,
      }

      e.target.nextSibling.nextSibling.value = this.oldValue
      e.target.nextSibling.value = this.oldAttribut
      ContactListService.updateAttribute('update-attribute', editedAttribute)
    },
  },
  mounted() {
    this.findCurrentContact()
  },
}
</script>

<style lang="scss" scoped>
.contact-details__contaiter {
  display: flex;
  justify-content: space-between;
}
.user-img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0;
  width: 315px;
  height: 315px;
  img {
    width: 100%;
    height: 100%;
  }
  svg {
    font-size: 250px;
  }
}
.user-details {
  padding: 20px;
  margin: 0;
  list-style-type: none;
  width: 100%;
  width: 70%;
  span {
    font-weight: 700;
  }
  li {
    position: relative;
    font-size: 20px;
    padding: 10px;
    padding-left: 0;
    border-bottom: #ccc 1px solid;
  }
  .delete,
  .edit {
    position: absolute;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    svg {
      color: #b93e55;
      transition: 0.3s;
      &:hover {
        opacity: 0.7;
        transform: scale(1.2);
      }
    }
  }
  .edit {
    right: 50px;
    svg {
      color: #244152;
      path {
        pointer-events: none;
      }
    }
  }
}
form {
  padding: 20px;
  text-align: center;
  p {
    font-weight: 700;
    font-size: 25px;
  }
  input {
    text-transform: capitalize;
    font-size: 16px;
    padding: 10px;
    outline: none;
    border: 1px solid #298cc5;
  }
  input[type='submit'] {
    background-color: #244152;
    color: #fff;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  }
}
a {
  margin: 40px auto 0 auto;
  width: 150px;
  display: block;
  color: #fff;
  text-align: center;
}
.attributesContact {
  display: flex;
  width: 100%;
  display: flex;
  align-items: flex-start;
  input {
    outline: none;
    flex-grow: 1;
    padding: 3px 10px;
    pointer-events: none;
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 20px;
  }
  button {
    transition: 0.3s;
    background-color: #ffc107;
    color: #244152;
    border: none;
    font-size: 18px;
    padding: 4px 10px;
    margin-left: 20px;
    display: none;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }
  .backOneStep {
    background-color: #17a2b8;
    color: #fff;
    margin: 0 20px 0 0;
    .backOneStep.active {
      background-color: #28a745;
    }
    svg {
      pointer-events: none;
    }
  }
  .attributSave {
    background-color: #28a745;
    color: #fff;
  }
  .attribut {
    max-width: 180px;
    margin-right: 20px;
    font-weight: 700;
    text-transform: capitalize;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  .attributValue {
    max-width: 280px;
  }
}
.editActive {
  input.editActive {
    pointer-events: auto;
    background-color: #fff;
    color: #244152;
  }
  button.editActive {
    display: block;
  }
}
</style>
