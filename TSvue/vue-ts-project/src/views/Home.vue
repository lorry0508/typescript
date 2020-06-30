<template>
	<div class="home">
        <count-to></count-to>
        <count-to></count-to>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CountTo from '@/components/CountTo';

@Component({
    name: 'HomePage',
    components: {
        CountTo
    }
})

export default class Home extends Vue {}
</script>