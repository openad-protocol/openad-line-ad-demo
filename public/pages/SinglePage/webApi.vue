<template>
  <div class="singlePage WebApi MFlex">
    <h2>This page is a demo for web Api mode to load OpenAd banner ad! </h2>
    <div v-if="lineAd.banner.resource_url && lineAd.banner.width && lineAd.banner.height" class="openADJsSDKBanner lineAd">
      <a href="javascript:void(0)" class="Flex" rel="noopener nofollow" @click="CallBackClickInfo(lineAd.adInfo)">
        <img
          :src="lineAd.banner.resource_url"
          style="max-width: 100%;max-height: 100%;object-fit: contain;"
        >
      </a>
    </div>
    <van-button v-else type="primary" @click="handleAction('getLineAD')">
      Get Line AD
    </van-button>
    <van-button type="primary" @click="router.push('/')">
      Go Home
    </van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, reactive, nextTick, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SinglePageWebApi',
  components: {
    'van-button': Button,
  },
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    /** If your web application is a web app, please use the following codes. **/
    const lineAd = reactive({
      adInfo: {
        zoneId: 427, // int,  This is an example zoneId, please get your own code parameters
        publisherId: 1, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        line: {
          type: 'WEB',
        },
        web: { // line.type = 'WEB', web is required
          token: 'data', // response object key, how to get token value.
          valid: 171, // token's length.
          method: 'get', // GET / POST,  method is required.
          api: window.location.origin+window.location.pathname+proxy.$AppEnv.staticURL+'static/json/token.json', // here is the required API. We will call this API to get user's wallet.
        },
      },
      userInfo: { // line.type = 'WEB', userInfo is required
        userId: 'vincent', // the id of the current user in your APP
        displayName: 'vincent', // the firstName / lastName / username / userId  of the current user in your APP,
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

    const handleAction = async(type) => {
      if(type === 'getLineAD'){
        let res = await window.OpenADLineJsSDK.banner.get({ adInfo: lineAd.adInfo, adParams: lineAd.adParams, userInfo: lineAd.userInfo });
        console.log('getLineAD', JSON.stringify(res));
        if(res.code === 0){
          lineAd.banner = res.data;
          // eslint-disable-next-line no-use-before-define
          await CallBackLogInfo(lineAd.adInfo);
        }
      }
    }

    const CallBackLogInfo = (adInfo) => {
      nextTick(async() => {
        let res = await window.OpenADLineJsSDK.banner.log(adInfo);
        if(res.code === 0){
          console.log(res.msg);
        }else{
          console.log(res.msg);
        }
      });
    }

    const CallBackClickInfo = (adInfo) => {
      window.OpenADLineJsSDK.banner.click(adInfo);
      // SDK will open a new app by the above function;
      // No Callback, if you want to do sth, you should use yourself functions or methods;
    }

    return { router, lineAd, CallBackClickInfo, handleAction };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
