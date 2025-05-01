<template>
  <div class="singlePage normal MFlex">
    <h2>This page is a demo for liff width normal mode to load OpenAd banner ad! </h2>
    <div class="openADJsSDKBanner lineAd" :zoneId="lineAd.adInfo.zoneId" :publisherId="lineAd.adInfo.publisherId" />
    <van-button @click="router.push('/')" type="primary">
      Go Home
    </van-button>
    <template v-if="result && result.userId">
      <van-button>
        userId: {{ result.userId }}
      </van-button>
      <van-button>
        displayName: {{ result.displayName }}
      </van-button>
    </template>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, reactive, onMounted, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SinglePageLiffBanner',
  components: {
    'van-button': Button,
  },
  setup() {
    const liffId = '2007231647-qVXDQlb6';
    const result = ref(null);
    const router = useRouter();
    /** If your web application is LMA or LWA, please use the following codes. **/
    const lineAd = reactive({
      adInfo: {
        zoneId: 427, // int,  This is an example zoneId, please get your own code parameters
        publisherId: 1, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        line: {
          type: 'LMA', // LMA: Line Mini App, LWA: Line Web App, web: browser,
          liffId: '2007231647-qVXDQlb6', // when type = LMA / LWA, liffId is required
          prototype: window.liff, // when type = LMA / LWA, prototype is required
        },
        wallet: { // If you have a web3 wallet components, Optional
          type: '', // eth: eth wallet, kaia: line wallet, ton: ton wallet;
          provider: null, // here is a provider object after wallet initialization.
          components: '', // web3 wallet components name
        },
      },
    });

    // docs:
    // eslint-disable-next-line vue/no-lifecycle-after-await
    onMounted(() => {
      nextTick(() => {
        window.liff.init({ liffId }).then(() => {
          if (!window.liff.isLoggedIn()) {
            result.value = 'LIFF not logged in, please logging in';
          } else {
            window.liff.getProfile().then(profile => {
              result.value = profile;
              window.OpenADLineJsSDK.banner.init({ ...lineAd });
            }).catch(err => {
              result.value = 'Error getting profile:'+err;
            });
          }
        }).catch(err => {
          result.value = 'LIFF Initialization failed：'+err;
        });
      });
    });

    return { router, lineAd, result };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
