<template>
  <main class="bg-gray-800 text-white h-screen flex flex-col items-center">
    <div class="m-auto content-center">
      <form
        id="form"
        method="post"
        class="border-green-700 border-4 p-4 flex justify-between"
      >
        <input type="file" name="file" id="files" multiple />
        <button type="submit" class="bg-green-900 rounded-lg px-4 py-2">
          Upload
        </button>
      </form>

      <table class="m-auto border-green-700 border-4 rounded-full p-10">
        <tr>
          <th>Id</th>
          <th>Data incarcare</th>
          <th>Nume fisier</th>
          <th>Marime Fisier</th>
          <th>Buton de vizualizare</th>
        </tr>
        <tr class="p-10" v-for="file in files" :key="file.id">
          <td>{{ file.id }}</td>
          <td>{{ file.data_incarcare }}</td>
          <td>{{ file.nume_fisier }}</td>
          <td>{{ file.marime_fisier }}</td>
          <td>
            <button
              class="bg-green-900 rounded-lg px-4 py-2"
              @click="viewFile(file.nume_fisier)"
            >
              Vizualizeaza
            </button>
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'PaginaUpload',
  setup() {
    const files = ref([])
    console.log('FETCH FILES')
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3000/paginaUpload')
        const data = await response.json()

        console.log(data)
        files.value = data
      } catch (error) {
        console.error('Error fetching files:', error)
      }
    }

    onMounted(() => {
      fetchFiles()
    })

    return {
      files,
    }
  },
  mounted() {
    this.runAfterRender()
  },
  methods: {
    runAfterRender() {
      console.log('Page has been rendered')
      const form = document.getElementById('form')
      const files = document.getElementById('files')

      form.addEventListener('submit', async e => {
        e.preventDefault()

        const formData = new FormData()

        for (let i = 0; i < files.files.length; i++) {
          formData.append('files', files.files[i])
        }
        console.log('click')
        const response = await fetch('http://localhost:3000/paginaUpload', {
          method: 'POST',
          body: formData,
        })
        console.log(response)
        // const data = await response.json()
        // console.log(data)
      })
    },
    viewFile(file) {
      window.open(`http://localhost:3000/paginaUpload/${file}`)
    },
  },
}
</script>

<style scoped>
/* Your styles here */
</style>
