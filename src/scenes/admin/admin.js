const {Scenes: {BaseScene}} = require('telegraf');

const admin = new BaseScene('admin');
const dbConnect = require('../../services/dbConnect.js');

admin.enter(async (ctx) => {
    ctx.reply('Admin panel', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Channels settings',
                        callback_data: 'channels_settings',
                    },

                ],
                [
                    {
                        text: 'Distribution',
                        callback_data: 'distribution',
                    }
                ]
            ]
        }
    })
})

admin.action('channels_settings', (ctx) => {
    ctx.reply('Channels settings', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Startups forms',
                        callback_data: 'startups_forms',
                    }
                ],
                [
                    {
                        text: 'Specialists forms',
                        callback_data: 'specialists_forms',
                    }
                ],
                [
                    {
                        text: 'Vacancies forms',
                        callback_data: 'vacancies_forms',
                    }
                ],
            ]
        }
    })
})

admin.action('startups_forms', async (ctx) => {
    const db = await dbConnect();
    db.collection('config').findOne({name:"channels"}).then((doc) => {
        const startup_config = doc.startup
        // console.log(startup_config);
        if (startup_config) {
            ctx.reply(`Startups forms settings:
Channel name: ${startup_config.channel_name}
Chat id: ${startup_config.chat_id}
            `, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Edit',
                                callback_data: 'edit_startup',
                            }
                        ]
                    ]
                }
            })
        }
        else {
            ctx.reply('Startups forms settings not found, please contact developer')
        }
    })
})
admin.action('specialists_forms', async (ctx) => {
    const db = await dbConnect();
    db.collection('config').findOne({name:"channels"}).then((doc) => {
        const specialist_config = doc.specialist
        console.log(specialist_config);
        if (specialist_config) {
            ctx.reply(`Specialists forms settings:
Channel name: ${specialist_config.channel_name}
Chat id: ${specialist_config.chat_id}
                        `, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Edit',
                                callback_data: 'edit_specialist',
                            }
                        ]
                    ]
                }
            })

        }
        else {
            ctx.reply('Specialists forms settings not found, please contact developer')
        }
    })
})
admin.action('vacancies_forms', async (ctx) => {
    const db = await dbConnect();
    db.collection('config').findOne({name:"channels"}).then((doc) => {
        const vacancy_config = doc.vacancy
        console.log(vacancy_config);
        if (vacancy_config) {
            ctx.reply(`Vacancies forms settings:
Channel name: ${vacancy_config.channel_name}
Chat id: ${vacancy_config.chat_id}

                        `, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {

                                text: 'Edit',
                                callback_data: 'edit_vacancy',
                            }
                        ]
                    ]
                }
            })
        }
        else {
            ctx.reply('Vacancies forms settings not found, please contact developer')
        }
    })
})


admin.action('edit_startup', (ctx) => {
    ctx.reply('Edit startups forms settings', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Channel name',
                        callback_data: 'edit_startup_channel_name',
                    }

                ],
                [
                    {
                        text: 'Chat id',
                        callback_data: 'edit_startup_chat_id',
                    }
                ],
                [
                    {
                        text: 'Back',
                        callback_data: 'back',
                    }
                ]
            ]
        }
    })
})
admin.action('edit_specialist', (ctx) => {
    ctx.reply('Edit specialists forms settings', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Channel name',
                        callback_data: 'edit_specialist_channel_name',
                    }
                    
                ],
                [
                    {
                        text: 'Chat id',
                        callback_data: 'edit_specialist_chat_id',
                    }
                ],
                [
                    {
                        text: 'Back',
                        callback_data: 'back',
                    }
                ]
            ]
        }
    })
})
admin.action('edit_vacancy', (ctx) => {
    ctx.reply('Edit vacancies forms settings', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Channel name',
                        callback_data: 'edit_vacancy_channel_name',
                    }

                ],
                [
                    {
                        text: 'Chat id',
                        callback_data: 'edit_vacancy_chat_id',
                    }
                ],
                [
                    {
                        text: 'Back',
                        callback_data: 'back',
                    }
                ]
            ]
        }
    })
})

admin.action('edit_startup_channel_name', (ctx) => {
    ctx.scene.enter('edit_startup_channel_name')
})
admin.action('edit_startup_chat_id', (ctx) => {
    ctx.scene.enter('edit_startup_chat_id')
})
admin.action('edit_specialist_channel_name', (ctx) => {
    ctx.scene.enter('edit_specialist_channel_name')
})
admin.action('edit_specialist_chat_id', (ctx) => {
    ctx.scene.enter('edit_specialist_chat_id')
})
admin.action('edit_vacancy_channel_name', (ctx) => {
    ctx.scene.enter('edit_vacancy_channel_name')
})
admin.action('edit_vacancy_chat_id', (ctx) => {
    ctx.scene.enter('edit_vacancy_chat_id')
})

admin.action('distribution', (ctx) => {
    ctx.scene.enter('distribution')
})

admin.action('back', (ctx) => {
    ctx.scene.enter('admin')
})

module.exports = admin;

