<template>
  <div class="singlePage WebApi MFlex">
    <h2>This page is a demo for web Api mode to load OpenAd Interactive ad! </h2>
    <van-button type="primary" @click="handleAction('getLineAD')">
      Get Line Interactive AD
    </van-button>
    <van-button type="primary" @click="router.push('/')">
      Go Home
    </van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, reactive, getCurrentInstance } from 'vue';
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
        zoneId: 428, // int,  This is an example zoneId, please get your own code parameters
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
    });

    const handleAction = async(type) => {
      if(type === 'getLineAD'){
        window.OpenADLineJsSDK.interactive.init({ ...lineAd }).then(res => {
          lineAd.hasAD = res.code === 0;
          if(res.code === 0){
            // eslint-disable-next-line no-use-before-define
            Render();
          }
          // hasAD = true, you can callback Render function, user can load an interactive ad;
          // hasAD = false, you can't callback Render function, user can't load an interactive ad;
        });
      }
    }

    const cb = {
      // indicates load ad resource from OpenAD platform, false will be returned if there is no resource to be loaded for the publisher slot/zone
      onAdResourceLoad: (e) => {
        console.log('onAdResourceLoad', e);  // e = true / false
      },
      // indicates the interactive ad is opening
      onAdOpening: (e) => {
        console.log('onAdOpening', e); // e = true / false
      },
      // indicates the interactive ad is opened,
      onAdOpened: (e) => {
        console.log('onAdOpened', e);  // e = true / false
      },
      // indicates the interactive ad task is finished, the task is defined by advertiser, return task status
      // judgment of issuing rewards, use this to return
      onAdTaskFinished: (e) => {
        console.log('onAdTaskFinished', e);  // e = true / false
      },
      // indicates the interactive ad is closing
      onAdClosing: (e) => {
        console.log('onAdClosing', e);  // e = true / false
      },
      // indicates the interactive ad is closed
      onAdClosed: (e) => {
        console.log('onAdClosed', e);  // e = view / click / close
        // view: viewed Ad completed, not clicked, not manually closed ads; client side needs to issue rewards level 1.
        // click: click Ad completed, include viewed Ad, not manually closed ads; client side needs to issue rewards level 2.
        // close: user manually closed ads. client side can not get any rewards.
        // If you want to perform different steps based on different shutdown states, please write the code here.
        if(e === 'view'){
          // eslint-disable-next-line no-use-before-define
          viewReward();
        }
        if(e === 'click'){
          // eslint-disable-next-line no-use-before-define
          clickReward();
        }
      },
      // indicates clicked and jumps
      onAdClick: (e) => {
        console.log('onAdClick', e);  // e = true / false
      },
    };

    const clickReward = async () => {
      let res = await proxy.$axios.get(window.location.origin+window.location.pathname+proxy.$AppEnv.staticURL+'static/json/token.json');
      console.log('clickReward', res);
    }

    const viewReward = async () => {
      let res = await proxy.$axios.get(window.location.origin+window.location.pathname+proxy.$AppEnv.staticURL+'static/json/wallet.json');
      console.log('viewReward', res);
    }

    const Render = () => {
      window.OpenADLineJsSDK.interactive.getRender({ adInfo: lineAd.adInfo, cb });
    }

    return { router, lineAd, handleAction };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
