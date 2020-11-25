<template>
  <div class="modal-overlay" :class="{ active: getStatusModal }">
    <div class="modal" :class="{ active: getStatusModal }">
      <div class="modal-content" :class="{ active: getStatusModal }">
        <h2>You really want to confirm your decision???</h2>
        <div class="nuv-button">
          <i class="close-modal"
            ><font-awesome-icon :icon="['fas', 'times']" v-on:click="toggleModal"
          /></i>
          <button
            class="confirm"
            v-on:click="confirmedModal(getActionsForModal, getCurrentContactId)"
          >
            Sure
          </button>
          <button class="cancel" v-on:click="toggleModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ContactListServices from '../ContactListService'
export default {
  props: ['toggleModal'],
  computed: mapGetters([
    'allContacts',
    'getStatusModal',
    'getCurrentContactId',
    'getActionsForModal',
  ]),
  methods: {
    async confirmedModal(action, id) {
      this.toggleModal()

      if (action === 'DELETE_CONTACT') {
        const newState = [...this.allContacts].filter((contact) => id !== contact._id)
        this.$store.dispatch('updateContacts', newState)
        await ContactListServices.deleteContact('delete-contact/', id)
      } else if (action === 'DELETE_ATTRIBUTE') {
        const newState = [...this.allContacts]
        newState.forEach((contact) => {
          contact.attributes = [...contact.attributes.filter((attribut) => attribut._id !== id)]
        })
        await ContactListServices.deleteContact('delete-attribute/', id)
      } else if (action === 'BACK_ONE_STEP') {
        let currentAttribute
        this.allContacts.forEach((contact) => {
          contact.attributes.forEach((attribut) => {
            if (attribut._id === id) {
              currentAttribute = attribut
            }
          })
        })
        let $elm = document.querySelectorAll('.user-details > li')
        for (let i = 0; i < $elm.length; i++) {
          if ($elm[i].classList.contains('editActive')) {
            $elm[i].children[1].value = currentAttribute.attribut
            $elm[i].children[2].value = currentAttribute.value
          }
          $elm[i].classList.remove('editActive')
        }
      }
      this.$store.dispatch('setCurrentContactId', '')
    },
  },
}
</script>

<style scoped lang="scss" scoped>
$speed: 0.6s;
$delay: ($speed * 0.5);
$easing: cubic-bezier(0.55, 0, 0.1, 1);

.modal {
  padding: 30px;
  position: relative;
  margin: 0 auto;
  background: rgba(#f3f7fa, 0.8);
  width: 400px;
  border-radius: 3px;
  opacity: 0;
  overflow-y: auto;
  visibility: hidden;
  box-shadow: 0 2px 10px rgba(#000, 0.1);
  backface-visibility: hidden;
  transform: scale(1.2);
  transition: all $speed $easing;

  .close-modal {
    position: absolute;
    cursor: pointer;
    top: 5px;
    right: 15px;
    opacity: 0;
    backface-visibility: hidden;
    transition: opacity $speed $easing, transform $speed $easing;
    transition-delay: $delay;
    font-size: 25px;
  }

  // close modal

  .modal-content {
    color: #298cc5;
    opacity: 0;
    backface-visibility: hidden;
    transition: opacity $speed $easing;
    transition-delay: $delay;
    h2 {
      text-align: center;
    }
    .nuv-button {
      display: flex;
      justify-content: space-between;
    }
    button {
      cursor: pointer;
      border: none;
      color: #fff;
      padding: 5px 20px;
    }
    .cancel {
      background-color: coral;
    }
    .confirm {
      background-color: rgb(38, 151, 53);
    }
  }

  // content

  &.active {
    visibility: visible;
    opacity: 1;
    transform: scale(1);

    .modal-content {
      opacity: 1;
    }

    .close-modal {
      transform: translateY(10px);
      opacity: 1;
    }
  }
}

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0;
  background-color: rgba(#fff, 0.3);
  backdrop-filter: saturate(180%) blur(10px);
  visibility: hidden;
  backface-visibility: hidden;
  transition: opacity $speed $easing, visibility $speed $easing;

  &.active {
    opacity: 1;
    visibility: visible;
  }
}
</style>
