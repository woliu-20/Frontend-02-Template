<template>
    <p>{{ greeting }}</p>
</template>

<script>
module.exports = {
    data: function () {
        return {
            greeting: "myvueapp",
        };
    },
};
</script>

<style scoped>
p {
    font-size: 2em;
    text-align: center;
}
</style>
