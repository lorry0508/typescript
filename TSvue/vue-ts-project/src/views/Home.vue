<template>
	<div class="home">
		home页面
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { loginReq } from '@/api/user';

@Component({
    name: 'HomePage',
    components: {

    }
})

export default class Home extends Vue {
    public mounted() {
        loginReq({ user_name: 'Lison', password: 123 })
        .then((res) => {
            console.log(res.data.code);
        })
    }
}
</script>