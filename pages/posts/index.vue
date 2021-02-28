<template>
    <div>
        <h2>{{ title }}</h2>
        <div class="posts-page">
            <PostList :posts="loadedPosts" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Posts Page:",
        }
    },

    computed: {
        loadedPosts() {
            return this.$store.getters.loadedPosts
        }
    },

    // created() {
    //     this.$store.dispatch('setPosts', this.loadedPosts)
    // },

    /*
    fetch(context) {
        console.log("posts Page >> fetch - with a Promise >> INIT");
        if (context.store.state.loadedPosts.length > 0) {
            return null
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // reject(new Error())
                // OR
                resolve({
                    title: "Posts Page:",

                    loadedPosts: [
                        {
                            id: "1",
                            thumbnail:
                                "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                            title: "Hello there!",
                            previewText: "This my first post!",
                        },
                        {
                            id: "2",
                            thumbnail:
                                "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                            title: "Hello there - the second time!",
                            previewText: "This my second post!",
                        },
                        {
                            id: "3",
                            thumbnail:
                                "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                            title: "Hello there - the third time!",
                            previewText: "This my third post!",
                        },
                    ],
                })
            }, 1500)
        })
        .then(data => {
            context.store.dispatch('setPosts', data.loadedPosts)
        })
        .catch(e => {
            context.error(e)
        })
    },
    */

    // implement asyncData with a Promise
    /*
    asyncData(context) {
        console.log("posts Page >> asyncData - with a Promise >> INIT");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // reject(new Error())
                // OR
                resolve({
                    title: "Posts Page:",

                    loadedPosts: [
                        {
                            id: "1",
                            thumbnail:
                                "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                            title: "Hello there!",
                            previewText: "This my first post!",
                        },
                        {
                            id: "2",
                            thumbnail:
                                "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                            title: "Hello there - the second time!",
                            previewText: "This my second post!",
                        },
                        {
                            id: "3",
                            thumbnail:
                                "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                            title: "Hello there - the third time!",
                            previewText: "This my third post!",
                        },
                    ],
                })
            }, 1500)
        })
        .then(data => {
            return data
        })
        .catch(e => {
            context.error(e)
        })
    },
    */

    // implement asyncData with a calback
    /*
    asyncData(context, callback) {
        console.log("posts Page >> asyncData - with a callback >> INIT");
        setTimeout(() => {
            return callback(null, {
                title: "Posts Page:",

                loadedPosts: [
                    {
                        id: "1",
                        thumbnail:
                            "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                        title: "Hello there!",
                        previewText: "This my first post!",
                    },
                    {
                        id: "2",
                        thumbnail:
                            "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                        title: "Hello there - the second time!",
                        previewText: "This my second post!",
                    },
                    {
                        id: "3",
                        thumbnail:
                            "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg",
                        title: "Hello there - the third time!",
                        previewText: "This my third post!",
                    },
                ],
            });
        }, 3000);
    },
    */
}
</script>


<style scoped>
.posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
