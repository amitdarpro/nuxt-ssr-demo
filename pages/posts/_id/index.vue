<template>
    <div class="single-post-page">
        <section v-if="loadedPost" class="post">
            <h1 class="post-title">{{ loadedPost.title }}</h1>
            <div class="post-details">
                <div class="post-detail">
                    Last updated on {{ loadedPost.updatedDate | date }}
                </div>
                <div class="post-detail">
                    Written by {{ loadedPost.author }}
                </div>
            </div>
            <p class="post-content">{{ loadedPost.content }}</p>
        </section>
        <section class="post-feedback">
            <p>
                Let me know what you think about the post, send a mail to
                <a href="mailto:feedback@my-awesome-domain.com"
                    >feedback@my-awesome-domain.com</a
                >.
            </p>
        </section>
    </div>
</template>

<script>
export default {
    // data() {
    //     return {
    //         loadedPost: null
    //     }
    // },

    // created() {
    //     this.$axios.$get(`https://nuxt-demo-app-987e2-default-rtdb.firebaseio.com/posts/${this.$route.params.id}.json`)
    //     .then(data => {
    //         debugger
    //         this.loadedPost = data
    //     })
    //     .catch(e => console.log(e))
    // },

    asyncData(context) {
        return context.app.$axios.$get(`/posts/${context.params.id}.json`)
            .then(data => {
                return {
                    loadedPost: data
                }
            })
            .catch(e => context.error(e))
    }

    // asyncData(context, callback) {
    //     console.log("posts/id Page >> asyncData >> INIT");
    //     setTimeout(() => {
    //         return callback(null, {
    //             loadedPost: {
    //                 id: "1",
    //                 thumbnail:
    //                     "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
    //                 title: `First Post (ID: ${context.params.id})`,
    //                 updatedDate: new Date(),
    //                 auther: 'Amit Dar',
    //                 previewText: "This my first post!",
    //                 content: "This is some dummy text which is only temporary text for tests...!"
    //             }
    //         })
    //     }, 1000)
    // }


    // computed: {
    //     loadedPost() {
    //         return this.$store.getters.loadedPost(this.$route.params.id);
    //     },
    // },
};
</script>

<style scoped>
.single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
}

.post {
    width: 100%;
}

@media (min-width: 768px) {
    .post {
        width: 600px;
        margin: auto;
    }
}

.post-title {
    margin: 0;
}

.post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

@media (min-width: 768px) {
    .post-details {
        flex-direction: row;
    }
}

.post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
}

.post-feedback {
    font-size: 80%;
    border-top: 1px black solid;
    margin-top: 1.5rem;
}

.post-feedback a {
    color: red;
    text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
    color: salmon;
}
</style>
