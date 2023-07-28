<template>
  <div class="box">
    <div class="wifi-symbol">
      <!-- <div class="wifi-circle first0"></div> -->
      <div class="wifi-circle" v-for="i in 4" :key="i" :class="{ active: i > 4 - hasColorLen, disabled: hasColorLen === 0 }"></div>
    </div>
    <div
      v-show="hasColorLen === 0"
      style="    position: absolute;
          display: flex;
    bottom: 0;
    right: -5px;
    font-size: 10px;
    color: red;"
    >
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>
<script>
import Ping from 'ping.js'
export default {
  name: '',
  data() {
    return {
      hasColorLen: 4,
      timer: null,
      p: null,
      wsInstance:window.$CCCSdkWsInstance,
    }
  },
  computed: {
    socketInstance() {
      return this.wsInstance ? this.wsInstance.socketInstance : null
    }
  },
  watch: {
    socketInstance: {
      handler(val, oldval) {
        if (val && val.readyState === 3) {
          this.hasColorLen = 0
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    const p = new Ping()
    this.p = p;
    // this.getPing(p)

  },
  mounted() {
    this.timer = setInterval(() => {
      this.getPing(this.p)
    }, 3000)
    // RTT（往返时间）是传出和传入数据包的网络延迟的表示。这是从用户发送请求到收到响应（往返）所花费的时间。为确保良好的通话质量，RTT 应为 300 毫秒或更短。RTT小于300ms为全白，低于400ms为红3格，无法连接为全红及叉。
  },
  destroyed() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    getPing(p) {
      const baseUrl = window.HispeakConfig ? window.HispeakConfig.baseUrl : ''
      let _origin = baseUrl ? baseUrl : window.location.origin
      p.ping(_origin)
        .then((data) => {
          // console.log('Successful ping: ' + data)
          // data = Math.ceil(Math.random() * 800)
          // console.log(data)
          // data = 0;
          if (!window.$CCCSdkWsInstance || !window.$CCCSdkWsInstance.socketInstance) {
            this.hasColorLen = 0
            return
          } else if (window.$CCCSdkWsInstance.socketInstance.readyState === 3) {
            // CONNECTING：值为0，表示正在连接。
            // OPEN：值为1，表示连接成功，可以通信。
            // CLOSING：值为2，表示连接正在关闭。
            // CLOSED：值为3，表示连接已经关闭，或者打开连接失败
            this.hasColorLen = 0
            return
          }
          const num = 4
          const baseNum = 300
          if (data <= baseNum) {
            this.hasColorLen = num
          } else if (data > baseNum && data <= baseNum + 100) {
            this.hasColorLen = num - 1
          } else if (data > baseNum + 100 && data <= baseNum + 200) {
            this.hasColorLen = num - 2
          } else if (data > baseNum + 200) {
            this.hasColorLen = num - 3
          }
          // this.hasColorLen = 0

        })
        .catch((data) => {
          console.error('Ping failed: ' + data)
          this.hasColorLen = 0
        })
    }
  }
}
</script>
<style scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
}
.wifi-symbol {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(45deg);
  position: absolute;
  top: -30%;
}
.wifi-circle {
  border: 3px solid #cecece;
  border-radius: 50%;
  position: absolute;
}
.wifi-circle.active {
  border-color: #65c468;
}
.wifi-circle.disabled {
  border-color: red;
}
.wifi-circle:nth-child(1) {
  width: 140%;
  height: 140%;
  top: 25%;
  left: 25%;
}
.wifi-circle:nth-child(2) {
  width: 100%;
  height: 100%;
  top: 45%;
  left: 45%;
}
.wifi-circle:nth-child(3) {
  width: 60%;
  height: 60%;
  top: 65%;
  left: 65%;
}
.wifi-circle:nth-child(4) {
  width: 15%;
  height: 15%;
  top: 85%;
  left: 85%;
}
</style>
