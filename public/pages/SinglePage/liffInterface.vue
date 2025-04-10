<template>
  <div class="singlePage interface MFlex">
    <h2>This page is a demo for liff width interface mode to load OpenAD banner ad! </h2>
    <div class="openADJsSDKBanner lineAd" v-if="lineAd.banner.resource_url && lineAd.banner.width && lineAd.banner.height">
      <a href="javascript:void(0)" class="Flex" rel="noopener nofollow" @click="CallBackClickInfo(lineAd.adInfo)">
        <img
          :src="lineAd.banner.resource_url"
          style="max-width: 100%;max-height: 100%;object-fit: contain;"
        >
      </a>
    </div>
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
import { defineComponent, onMounted, reactive, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SinglePageLiffInterface',
  components: {
    'van-button': Button,
  },
  setup(){
    const liffId = '2007231647-qVXDQlb6';
    const result = ref(null);
    const router = useRouter();
    /** If your web application is a TMA (Telegram Mini App), please use the following code. **/
    const lineAd = reactive({
      adInfo: {
        zoneId: 158, // int,  This is an example zoneId, please get your own code parameters
        publisherId: 49, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        line: {
          type: 'LWA', // LMA: Line Mini App, LWA: Line Web App, web: browser,
          liffId: '2007231647-qVXDQlb6', // when type = LMA / LWA, liffId is required
          prototype: window.liff, // when type = LMA / LWA, prototype is required
        },
        wallet: { // If you have a web3 wallet components
          type: '', // eth: eth wallet, kaia: line wallet, ton: ton wallet;
          provider: null, // here is a provider object after wallet initialization.
          components: '', // web3 wallet components name
        },
      },
      banner: {
        'width': null,
        'type': 'banner',
        'height': null,
        'resource_id': null,
        'resource_url': '',
        'resource_text': '',
        'resource_desc': '',
      },
    });

    onMounted(() => {
      nextTick(() => {
        window.liff.init({ liffId }).then(() => {
          if (!window.liff.isLoggedIn()) {
            result.value = 'LIFF not logged in, please logging in';
          } else {
            window.liff.getProfile().then(profile => {
              result.value = profile;
              // eslint-disable-next-line no-use-before-define
              getLineAD();
            }).catch(err => {
              result.value = 'Error getting profile:'+err;
            });
          }
        }).catch(err => {
          result.value = 'LIFF Initialization failed：'+err;
        });
      });
    });

    const getLineAD = async () => {
      let res = await window.OpenADLineJsSDK.banner.get({ adInfo: lineAd.adInfo, adParams: lineAd.adParams });
      console.log('getLineAD', JSON.stringify(res));
      if(res.code === 0){
        lineAd.banner = res.data;
        // eslint-disable-next-line no-use-before-define
        await CallBackLogInfo(lineAd.adInfo);
      }
      /**
       * code: 0, data: {  } // openAD.banner object and values
       * code: -1, msg: 'please login by line first!'
       * code: -2, msg: 'invalid liffId'
       * code: -3, msg: 'invalid LWA access token!'
       * code: -4, msg: 'liff sdk invalid profile response'
       * code: -5, msg: 'liff sdk failed to parse profile response'
       * code: -6, msg: 'liff sdk cannot detect LINE WebView API'
       * code: -7, msg: 'liff sdk getProfile error: ...
       * code: -8, msg: 'invalid userId',
       * code: -9, msg: 'invalid liff sdk',
       * code: -21, msg: 'get openAD ads error!'
       * code: -101, msg: 'Ajax Request 404 !'
       * code: -102, msg: 'Ajax Request Timeout !'
       * code: -103, msg: 'Ajax Request Error !'
       **/
    }

    const CallBackLogInfo = (adInfo) => {
      nextTick(async() => {
        let res = await window.OpenADLineJsSDK.banner.log(adInfo);
        if(res.code === 0){
          console.log(res.msg);
        }else{
          console.log(res.msg);
        }
        /**
         * code: 0, msg: 'send log info successfully'
         * code: -1, msg: 'can not find resource'
         * code: -2, msg: 'send log info failed'
         * code: -101, msg: 'Ajax Request 404 !'
         * code: -102, msg: 'Ajax Request Timeout !'
         * code: -103, msg: 'Ajax Request Error !'
         **/
      });
    }

    const CallBackClickInfo = (adInfo) => {
      window.OpenADLineJsSDK.banner.click(adInfo);
      // SDK will open a new app by the above function;
      // No Callback, if you want to do sth, you should use yourself functions or methods;
    }

    return { router, lineAd, CallBackClickInfo, result }
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
