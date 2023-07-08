<template>
    <div class="menu-bar">
        <a class="menu-bar__link" href="#">
            <client-only>
                <font-awesome-icon icon="fas fa-refresh"></font-awesome-icon>
            </client-only>
            Live Feed
        </a>
        <a class="menu-bar__link" href="#">
            <client-only>
                <font-awesome-icon icon="fas fa-list"></font-awesome-icon>
            </client-only>
            Channels
        </a>
        <a class="menu-bar__link" href="#">
            <client-only>
                <font-awesome-icon icon="fas fa-chart-line"></font-awesome-icon>
            </client-only>
            Trending
        </a>
    </div>
</template>

<style lang="scss">
    .menu-bar{
        background:linear-gradient(to bottom right, $dark-grey-2, $dark-grey-4);
        display:flex;

        &__link{
            display:block;
            color: $white;
            font-size:1.5rem;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding:1rem;
            transition: background .3s;

            &:hover{
                background: $dark-grey-1;
            }
        }
    }
</style>