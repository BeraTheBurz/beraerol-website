window.Actions = {
  damage1: {
    name: "Fırlat!",
    description: "hamur yumruğu!",
    success: [
      { type: "textMessage", text: "{CASTER} {ACTION} kullandı!"},
      { type: "animation", animation: "spin"},
      { type: "stateChange", damage: 10}
    ]
  },
  saucyStatus: {
    name: "domates sosu",
    description: "cıvıklaştırır",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} {ACTION} kullandı! "},
      { type: "stateChange", status: { type: "saucy", expiresIn: 3 } }
    ]
  },
  clumsyStatus: {
    name: "zeytin yağı",
    description: "lezzetli kayganlık karışımı",
    success: [
      { type: "textMessage", text: "{CASTER} {ACTION} kullandı!"},
      { type: "animation", animation: "glob", color: "#dafd2a" },
      { type: "stateChange", status: { type: "clumsy", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} yağlı yağlı!"},
    ]
  },
  //Items
  item_recoverStatus: {
    name: "ayran",
    description: "taze ve ferah",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} {ACTION} kullandı!"},
      { type: "stateChange", status: null },
      { type: "textMessage", text: "enerjik hissettirdi!", },
    ]
  },
  item_recoverHp: {
    name: "kaşar",
    targetType: "friendly",
    success: [
      { type:"textMessage", text: "{CASTER} üzerine serpiştirdi {ACTION}!", },
      { type:"stateChange", recover: 10, },
      { type:"textMessage", text: "{CASTER} can yeniledi!", },
    ]
  },
}
