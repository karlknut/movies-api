const vue = Vue.createApp({
  data() {
    return {
      movieInModal: { name: null },
      movies: [],
      // description: "",
      // actors: "",
    };
  },
  async created() {
    this.movies = await (await fetch("http://localhost:8080/movies")).json();
    console.log(this.movies);
  },
  methods: {
    getMovie: async function(id) {
      this.movieInModal = await (
        await fetch(`http://localhost:8080/movies/${id}`)
      ).json();
      let movieInfoModal = new bootstrap.Modal(
        document.getElementById("movieInfoModal"),
        {}
      );
      movieInfoModal.show();
    },
  },
}).mount("#app");
