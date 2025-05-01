<template>
  <div class="singlePage interactive MFlex">
    <h2>This page is a demo for liff with interactive mode to load OpenAd ads! </h2>
    <van-button @click="Render" type="primary" v-if="lineAd.hasAD">
      Render
    </van-button>
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
  name: 'SinglePageLiffInteractive',
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
        zoneId: 428, // int,  This is an example zoneId, please get your own code parameters
        publisherId: 1, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        line: {
          type: 'LWA', // LMA: Line Mini App, LWA: Line Web App, web: browser,
          liffId: '2007231647-qVXDQlb6', // when type = LMA / LWA, liffId is required
          prototype: window.liff, // when type = LMA / LWA, prototype is required
        },
        wallet: { // If you have a web3 wallet components, Optional
          type: '', // eth: eth wallet, kaia: line wallet, ton: ton wallet;
          provider: null, // here is a provider object after wallet initialization.
          components: '', // web3 wallet components name
        },
      },
      hasAD: false, // 通过方法获取
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
              init();
            }).catch(err => {
              result.value = 'Error getting profile:'+err;
            });
          }
        }).catch(err => {
          result.value = 'LIFF Initialization failed：'+err;
        });
      });
    });

    const init = () => {
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
      },
      // indicates clicked and jumps
      onAdClick: (e) => {
        console.log('onAdClick', e);  // e = true / false
      },
    };

    const Render = () => {
      window.OpenADLineJsSDK.interactive.getRender({ adInfo: lineAd.adInfo, cb });
    }

    return { router, Render, lineAd, result };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
