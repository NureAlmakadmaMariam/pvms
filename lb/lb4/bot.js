const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const BACK_TO_MENU_BUTTON = [{ text: 'Повернутись до меню', callback_data: 'start' }];

class Bot {
    constructor(token) {
        this.bot = new TelegramBot(token, { polling: true });
        this.data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        this.userQueryCount = 0;

        this.initListeners();
    }

    initListeners() {
        // Handle '/start' command
        this.bot.onText(/\/start/, (msg) => this.handleStart(msg));

        this.bot.on('callback_query', (callbackQuery) => this.handleCallbackQuery(callbackQuery));
    }

    handleStart(msg) {
        const chatId = msg.chat.id;
        const userName = msg.from.first_name;

        this.bot.sendMessage(chatId, `Привіт, ${userName}! Я чат-бот для абітурієнтів на Програмну інженерію в ХНУРЕ. Ось наше меню:`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Оновлення для абітурієнтів', callback_data: 'updates' }],
                    [{ text: 'Контактна інформація', callback_data: 'contact' }],
                    [{ text: 'Порядок подання документів', callback_data: 'application_process' }],
                    [{ text: 'Інженерія програмного забезпечення', callback_data: 'programming_engineering' }],
                    [{ text: 'Статистика', callback_data: 'stats' }]
                ]
            }
        });
    }

    handleCallbackQuery(callbackQuery) {
        const chatId = callbackQuery.message.chat.id;
        const dataCallback = callbackQuery.data;

        this.userQueryCount++;

        switch (dataCallback) {
            case 'updates':
                this.sendUpdates(chatId);
                break;
            case 'stats':
                this.sendStats(chatId);
                break;
            case 'contact':
                this.sendContactInfo(chatId);
                break;
            case 'application_process':
                this.sendApplicationProcess(chatId);
                break;
            case 'programming_engineering':
                this.sendProgrammingEngineeringOptions(chatId);
                break;
            case 'history_industry':
                this.sendHistoryIndustry(chatId);
                break;
            case 'education_levels':
                this.sendEducationLevels(chatId);
                break;
            case 'form_of_study':
                this.sendFormOfStudy(chatId);
                break;
            case 'career_opportunities':
                this.sendCareerOpportunities(chatId);
                break;
            case 'companies':
                this.sendCompanies(chatId);
                break;
            case 'start':
                this.handleStart(callbackQuery.message);
                break;
            default:
                this.sendUnknownOption(chatId);
        }
    }

    sendUpdates(chatId) {
        this.bot.sendMessage(chatId, this.data.updates, {
            reply_markup: {
                inline_keyboard: [BACK_TO_MENU_BUTTON]
            }
        });
    }

    // Send statistics information
    sendStats(chatId) {
        this.bot.sendMessage(chatId, `Кількість запитів користувачів: ${this.userQueryCount}`, {
            reply_markup: {
                inline_keyboard: [BACK_TO_MENU_BUTTON]
            }
        });
    }

    // Send contact information
    sendContactInfo(chatId) {
        const contactInfo = `Контактна інформація:
Локація: ${this.data.contact.location}
Телефони: ${this.data.contact.phones.join(', ')}
Email: ${this.data.contact.email}
Декан: ${this.data.contact.dean.name}, ${this.data.contact.dean.position}`;

        this.bot.sendMessage(chatId, contactInfo, {
            reply_markup: {
                inline_keyboard: [BACK_TO_MENU_BUTTON]
            }
        });
    }

    // Send application process information
    sendApplicationProcess(chatId) {
        const applicationProcess = `
        Порядок подання документів:
${this.data.application_process.steps.join('\n')}
Детальніше за посиланням: ${this.data.application_process.link}`;
        this.bot.sendMessage(chatId, applicationProcess, {
            reply_markup: {
                inline_keyboard: [BACK_TO_MENU_BUTTON]
            }
        });
    }

    // Send programming engineering options
    sendProgrammingEngineeringOptions(chatId) {
        this.bot.sendMessage(chatId, 'Оберіть розділ для детальнішої інформації:', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Історія кафедри + Опис індустрії', callback_data: 'history_industry' }],
                    [{ text: 'Ступені освіти', callback_data: 'education_levels' }],
                    [{ text: 'Форма навчання', callback_data: 'form_of_study' }],
                    [{ text: 'Кар\'єрні можливості', callback_data: 'career_opportunities' }],
                    [{ text: 'Основні компанії, де працюють випускники', callback_data: 'companies' }],
                    BACK_TO_MENU_BUTTON
                ]
            }
        });
    }

    // Send history and industry information
    sendHistoryIndustry(chatId) {
        const historyIndustry = `
        Історія кафедри:
        ${this.data.programming_engineering.history}
        
        Опис індустрії:
        ${this.data.programming_engineering.industry}
        `;
        this.bot.sendMessage(chatId, historyIndustry, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Повернутись до розділу Інженерія програмного забезпечення', callback_data: 'programming_engineering' }],
                    BACK_TO_MENU_BUTTON
                ]
            }
        });
    }

    sendEducationLevels(chatId) {
        const educationLevels = `
        Ступені освіти:
${this.data.programming_engineering.education_levels.join('\n')}`;
        this.bot.sendMessage(chatId, educationLevels, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Повернутись до розділу Інженерія програмного забезпечення', callback_data: 'programming_engineering' }],
                    BACK_TO_MENU_BUTTON
                ]
            }
        });
    }

    sendFormOfStudy(chatId) {
        const formOfStudy = `
        Форма навчання: ${this.data.programming_engineering.form_of_study}
        `;
        this.bot.sendMessage(chatId, formOfStudy, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Повернутись до розділу Інженерія програмного забезпечення', callback_data: 'programming_engineering' }],
                    BACK_TO_MENU_BUTTON
                ]
            }
        });
    }

    sendCareerOpportunities(chatId) {
        const careerOpportunities = `
        Кар'єрні можливості:
${this.data.programming_engineering.career_opportunities.join('\n')}`;
        this.bot.sendMessage(chatId, careerOpportunities, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Повернутись до розділу Інженерія програмного забезпечення', callback_data: 'programming_engineering' }],
                    BACK_TO_MENU_BUTTON
                ]
            }
        });
    }

    sendCompanies(chatId) {
        const companies = `
Основні компанії, де працюють випускники:
${this.data.programming_engineering.companies.join('\n')}`;
        this.bot.sendMessage(chatId, companies, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Повернутись до розділу Інженерія програмного забезпечення', callback_data: 'programming_engineering' }],
                    BACK_TO_MENU_BUTTON
                ]
            }
        });
    }

    // Handle unknown callback queries
    sendUnknownOption(chatId) {
        this.bot.sendMessage(chatId, 'Не знайдено таку опцію. Виберіть одну з кнопок у меню.', {
            reply_markup: {
                inline_keyboard: [BACK_TO_MENU_BUTTON]
            }
        });
    }
}

const botInstance = new Bot('7654138519:AAHpn_YyVjpSiVhGZYXEhmgriLUWFOQTV0E');
