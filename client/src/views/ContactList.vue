<template>
  <div class="contact-list">
    <!--  start form for adding a new contact -->
    <form @submit.prevent="submitHandler" enctype="multipart/form-data">
      <div class="input-contain">
        <h2 class="info">New Contact</h2>
        <div class="image-previe__box">
          <span v-if="this.imgUrl" class="preview-img-box">
            <img
              :src="this.imgUrl"
              alt="image-preview"
              class="preview"
              style="width:80px;margin:10px;"
            />
          </span>
          <span v-else>
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
        </div>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Name"
          required
          maxlength="100"
          v-model="name"
        />
        <input type="text" placeholder="Phone" name="phone" v-model="phone" required />
        <input type="email" placeholder="Email" name="email" v-model="email" required />
        <div class="image-input">
          <input type="file" id="imageInput" @change="selectFile" ref="file" />
          <label for="imageInput" class="image-button"> Choose image</label>
        </div>
        <div class="allsub">
          <button class="submit" type="submit">Add Contact</button>
        </div>
      </div>
    </form>
    <!--  End form for adding a new contact -->
    <ul class="user-list">
      <ContactItem :toggleModal="toggleModal" :setCurrentContactId="setCurrentContactId" />
    </ul>
  </div>
</template>

<script>
import ContactItem from '@/components/ContactItem'
import ContactListService from '../ContactListService'
import { mapGetters } from 'vuex'

export default {
  props: ['toggleModal', 'setCurrentContactId'],
  components: {
    ContactItem,
  },
  computed: mapGetters(['allContacts']),
  data: () => ({
    name: '',
    phone: '',
    email: '',
    file: '',
    imgUrl: '',
    originFileName: '',
  }),
  methods: {
    async submitHandler() {
      if (this.file) {
        const formData = new FormData()
        formData.append('file', this.file, this.originFileName)
        ContactListService.insertContact('upload', formData)
        this.file = ''
      }
      const newContact = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        imgUrl: this.originFileName,
      }
      this.name = ''
      this.phone = ''
      this.email = ''
      this.imgUrl = ''
      this.originFileName = ''
      const createdContact = await ContactListService.insertContact('add-contact', newContact)
      const newContactList = [...this.allContacts, createdContact.data]
      this.$store.dispatch('updateContacts', newContactList)
    },
    selectFile(e) {
      this.file = this.$refs.file.files[0]
      this.imgUrl = URL.createObjectURL(this.file)
      this.originFileName = this.file.name
      e.target.value = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.contact-list {
  display: flex;
}
$gray: #f3f7fa;
$gray-dk: darken(#ccc, 10%);
$green: #7aada5;
$green-lt: lighten($green, 10%);
$green-dk: darken($green, 10%);
form {
  background: $gray;
  width: 280px;
  padding: 30px 30px 50px 30px;
  height: 400px;
  h2 {
    text-align: center;
    font-size: 18px;
    color: darken(#93a6cf, 30%);
    letter-spacing: 0.061em;
    margin: 0;
  }
  input:not([type='file']) {
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    text-align: center;
    margin-bottom: 25px;
    box-shadow: none;
    appearance: none;
    border: 1px solid #fff;
    border-bottom: 1px solid $gray-dk;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 11px;
    letter-spacing: 0.06em;
    &:focus {
      border: 1px solid $gray-dk;
      outline: none;
      appearance: none;
    }
  }
  .submit {
    padding-top: 12px;
    padding-bottom: 12px;
    border: none;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-align: center;
    cursor: pointer;
    background: #298cc5;
    color: #fff;
    width: 101%;
    transition: 0.8s all ease;
    &:hover {
      opacity: 0.8;
      transform: translateY(1px);
      transition: 0.4s all ease;
    }
  }
}
#firstname {
  margin-top: 20px;
}
label {
  padding: 5px 0;
  text-align: center;
  display: block;
  background-color: #244152;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  cursor: pointer;
}

.image-previe__box {
  display: flex;
  justify-content: center;
  padding: 15px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin: 0 auto 70px auto;

  svg {
    padding-top: 30px;
    font-size: 40px;
    color: #298cc5;
  }
}

.image-input input {
  display: none;
}

.image-input span {
  display: none;
  text-align: center;
  cursor: pointer;
}
ul {
  box-sizing: border-box;
  width: 100%;
  list-style-type: none;
  padding: 0;
  ul {
    display: flex;
    li {
      width: 25%;
      display: flex;
      align-items: center;
    }
  }
}
.user-list {
  padding: 0 0 0 20px;
  margin: 0;
}
.user-list__head {
  padding: 12px 15px 0 15px;
  background-color: #298cc5;
  border-bottom: 2px solid #f3f7fa;
  font-weight: 700;
  li {
    padding: 0 10px;
  }
  span:after {
    display: block;
    content: '';
    height: 2px;
    width: 100%;
    background-color: #f3f7fa;
  }
}
</style>
