<template>
  <div class="singlePage normal MFlex">
    <h2>This page is a demo for web3 provider mode to load OpenAd banner ad! </h2>
    <template v-if="walletInfo.status === 'connected'">
      <div v-if="lineAd.banner.resource_url && lineAd.banner.width && lineAd.banner.height" class="openADJsSDKBanner lineAd">
        <a href="javascript:void(0)" class="Flex" rel="noopener nofollow" @click="CallBackClickInfo(lineAd.adInfo)">
          <img
            :src="lineAd.banner.resource_url"
            style="max-width: 100%;max-height: 100%;object-fit: contain;"
          >
        </a>
      </div>
      <van-button type="primary" @click="handleAction('getLineAD')" v-else>
        Get Line AD
      </van-button>
    </template>
    <van-button type="primary" @click="handleAction('connect')" v-else>
      Connect Wallet
    </van-button>
    <van-button type="primary" @click="router.push('/')">
      Go Home
    </van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, reactive, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
/** reown components codes **/
import { createAppKit, useAppKitAccount } from '@reown/appkit/vue';
import { arbitrum, mainnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
const projectId = '23f032046003b9084c924ed6fc3cfe0d'; // this is demo projectId
const networks = [mainnet, arbitrum];
const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks,
  enableEIP6963: true,
  enableInjected: true,
});
const Modal = createAppKit({
  adapters: [ wagmiAdapter ],
  networks: [ mainnet, arbitrum ],
  defaultNetwork: mainnet,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: false,
    socials: [ ],
    emailShowWallets: false,
    allWallets: 'SHOW',
  },
});

export default defineComponent({
  name: 'SinglePageWeb3Provider',
  components: {
    'van-button': Button,
  },
  setup() {
    const router = useRouter();
    const EVMWalletAccount = useAppKitAccount();
    const walletInfo = reactive({
      address: '', //
      isConnected: false,
      status: 'disconnected', // disconnected, connected, connecting
      allAccounts: [],
      caipAddress: '', // eip155:1:0x103775E58AFA3D3FdaF521D9B0c46ddfB47a4349
      embeddedWalletInfo: { }, // {user: Proxy(Object), authProvider: 'email', accountType: undefined, isSmartAccountDeployed: false}
      provider: null,
      action: '', // bind, unbind,
    });
    watch(EVMWalletAccount.value, async(newVal) => {
      if(newVal.status === 'connecting' || newVal.status === walletInfo.status){
        return false;
      }
      for(let key in walletInfo){
        walletInfo[key] = newVal[key] || walletInfo[key];
      }
      if(newVal.status === 'disconnected'){
        walletInfo.address = '';
      }
      if(newVal.status === 'connected'){
        let address = Modal.getAddress('eip155');
        console.log('address', address);
      }
    });
    /** If your web application is a web3 app and has a wallet provider, please use the following codes. **/
    const lineAd = reactive({
      adInfo: {
        zoneId: 427, // int,  This is an example zoneId, please get your own code parameters
        publisherId: 1, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        line: {
          type: 'WEB3',
        },
        wallet: { // line.type = 'WEB3', wallet is required
          type: 'eth', // eth: eth wallet, kaia: line wallet, ton: ton wallet;
          provider: Modal, // this is a demo to use reown, Modal is the wallet provider
          components: '@reown', // web3 wallet components name
        },
      },
      userInfo: { // line.type = 'WEB3', userInfo is required
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
      if(type === 'connect'){
        Modal.open();
      }
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

    return { router, lineAd, CallBackClickInfo, walletInfo, handleAction };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
