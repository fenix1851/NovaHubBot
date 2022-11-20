module.exports = (type)=> { return [
    [
      {
        text: "Continue",
        callback_data: "continue_"+type,
      },
    ]
  ]}