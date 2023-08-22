<template>
    <div class="container">
        <div class="not-found-tile">
            <h2>404 :(</h2>
            <p>The user you are looking for does not exist.</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .container {
        padding:0 2rem;
    }
    .not-found-tile {
        max-width:80%;
        margin:2rem auto;
        background:#fff;
        border:1px solid #fff;
        border-radius:3px;
        display:flex;
        align-items: center;
        flex-wrap:wrap;
        padding:2rem;

        h2{
            font-size:4rem;
            margin-right:2rem;
            color:#aaa;
        }

        p {
            font-size:2rem;
            color:#888;
        }
    }

</style>