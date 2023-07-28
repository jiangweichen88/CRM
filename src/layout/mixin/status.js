const UIshow_actionBar = ['phoneNum_show', 'actionBar_show']
const UIshow_bridge = [...UIshow_actionBar, 'hangup_show', 'hold_show', 'quiet_show'] // 通话中的UI
const UIshow_hangup = ['call_show'] // 话后的UI
export default {
  computed: {
    status() {
      return {
        locked: {
          name: this.$t('status.locked'),
          id: 'locked',
          isShowStatus: true
        },
        logon: {
          name: this.$t('status.logon'),
          id: 'logon',
          isShowStatus: true,
          statusShowText: {
            success: this.$t('status.logon') + ' ' + this.$t('main.success'),
            fail: {
              default: this.$t('status.logon') + ' ' + this.$t('main.fail'),
              2: this.$t('main.loginOther')
            }
          },
          sendArr: ['agentId', 'password', 'phoneType', 'workType', 'phone', 'callModel'],
          setSendArr: '@all',
          isUnlock: true,
          UIshow: UIshow_hangup
        },
        logout: {
          name: this.$t('status.logout'),
          id: 'logout',
          isShowStatus: true,
          // themeColor: '#FF3C34',
          isUnlock: true,
          statusShowText: {
            success: this.$t('status.logout') + ' ' + this.$t('main.success'),
            fail: {
              default: this.$t('status.logout') + ' ' + this.$t('main.fail')
            }
          }
        },
        startCall: {
          name: this.$t('status.startCall'),
          id: 'startCall',
          isShowStatus: true,
          sendArr: ['called', 'caller', 'followData', 'callUui', 'agentCaller', 'callModel', 'autoAnswer', 'taskInfo']
        },

        ring: {
          name: this.$t('status.ring'),
          id: 'ring',
          isShowStatus: true,
          UIshow: 'cache'
        },
        bridge: {
          name: this.$t('status.bridge'),
          id: 'bridge',
          isShowStatus: true,
          sendArr: [],
          setSendArr: ['called', 'caller'],
          UIshow: UIshow_bridge
        },
        hangup: {
          name: this.$t('status.hangup'),
          id: 'startCall',
          isShowStatus: true,
          // themeColor: '#FF3C34',
          isUnlock: true,
          UIshow: UIshow_hangup
        },
        reconnection: {
          name: this.$t('status.reconnection'),
          id: 'startCall',
          isShowStatus: true,
          sendArr: ['agentId', 'password', 'phoneType', 'workType']
        },
        busy: {
          name: this.$t('status.busy'),
          id: 'startCall',
          isShowStatus: true,
          themeColor: '#FF3C34',
          isUnlock: true
        },
        free: {
          name: this.$t('status.free'),
          id: 'startCall',
          isShowStatus: true,
          themeColor: '#00b972',
          isUnlock: true
        },
        quiet: {
          name: this.$t('status.quiet'),
          id: 'quiet',
          isShowStatus: true,
          statusShowText: {
            success: this.$t('status.quiet'),
            fail: this.$t('status.quiet') + this.$t('main.fail')
          },
          UIshow: 'cache'
        },
        unQuiet: {
          name: this.$t('status.unQuiet'),
          id: 'unQuiet',
          isShowStatus: true,
          statusShowText: {
            success: this.$t('status.bridge'),
            fail: this.$t('status.unQuiet') + this.$t('main.fail')
          },
          UIshow: 'cache'
        },
        hold: {
          name: this.$t('status.hold'),
          id: 'hold',
          isShowStatus: true,
          statusShowText: this.getSuccessOrFail('hold'),
          statusShowText: {
            success: this.$t('status.hold'),
            fail: this.$t('status.hold') + this.$t('main.fail')
          },
          UIshow: 'cache'
        },
        unHold: {
          name: this.$t('status.unHold'),
          id: 'unHold',
          isShowStatus: true,
          statusShowText: {
            success: this.$t('status.bridge'),
            fail: this.$t('status.unHold') + this.$t('main.fail')
          },
          UIshow: 'cache'
        },
        playNo: {
          name: this.$t('status.playNo'),
          id: 'playNo',
          isShowStatus: true,
          isUnlock: false,
          UIshow: 'cache'
        },
        error: {
          name: this.$t('status.error'),
          id: 'error',
          isShowStatus: true,
          isUnlock: false
          // themeColor: '#FF3C34'
        }
        // keepalive: {
        //   name: this.$t('status.keepalive'),
        // },
      }
    }
  },
  methods: {
    getSuccessOrFail(type) {
      return {
        success: this.$t('status.' + type) + ' ' + this.$t('main.success'),
        fail: this.$t('status.' + type) + ' ' + this.$t('main.fail')
      }
    }
  }
}
