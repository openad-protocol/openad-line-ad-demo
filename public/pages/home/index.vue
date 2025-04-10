<template>
  <!---->
  <div class="Home MFlex">
    <ul>
      <template v-if="!login">
        <li v-for="(item,index) in paths" :key="index">
          <van-button type="primary" @click="router.push(item.path)">
            {{ item.desc }}
          </van-button>
        </li>
        <template v-if="result && result.userId">
          <li>
            <van-button>
              userId: {{ result.userId }}
            </van-button>
          </li>
          <li>
            <van-button>
              displayName: {{ result.displayName }}
            </van-button>
          </li>
        </template>
      </template>
      <template v-if="login">
        <li v-if="result && !result.userId">
          <van-button>
            {{ result }}
          </van-button>
        </li>
        <li>
          <van-button @click="handle" type="primary">
            Log In By Line Liff SDK
          </van-button>
        </li>
      </template>
    </ul>
  </div>
  <!---->
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Button } from 'vant';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'HomeIndex',
  components: {
    'van-button': Button,
  },
  setup(){
    const paths = ref([
      { path: '/SinglePage/liffBanner', desc: 'load banner ad with liff...' },
      { path: '/SinglePage/liffInterface', desc: 'load banner ad with liff and interface...' },
      { path: '/SinglePage/liffInteractive', desc: 'load interactive ad with liff...' },
    ]);

    const liffId = '2007231647-qVXDQlb6';
    const result = ref(null);
    const login = ref(true);
    window.liff.init({ liffId }).then(() => {
      result.value = 'LIFF initialized';
      if (!window.liff.isLoggedIn()) {
        result.value = 'LIFF not logged in, please logging in';
        login.value = true;
      } else {
        result.value = 'LIFF logged in';
        window.liff.getProfile().then(profile => {
          login.value = false;
          result.value = profile;
          console.log('token', sessionStorage.getItem('LIFF_STORE:'+liffId+':accessToken'))
        }).catch(err => {
          result.value = 'Error getting profile:'+err;
          console.error('Error getting profile:', err);
        });
      }
    }).catch(err => {
      result.value = 'LIFF Initialization failed：'+err;
    });

    const router = useRouter();

    const handle = () => {
      window.liff.login()
    }

    return { router, paths, result, login, handle };
  },
});
</script>
<style scoped lang="less">
@import "index.less";
</style>
