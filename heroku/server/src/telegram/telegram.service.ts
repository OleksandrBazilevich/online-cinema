import { Injectable } from '@nestjs/common'
import { getTelegramConfig } from 'src/config/telegram.config'
import { Telegraf } from 'telegraf'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { ITelegram } from './telegram.interface'

@Injectable()
export class TelegramService {
  bot: Telegraf
  options: ITelegram

  constructor() {
    this.options = getTelegramConfig()
    this.bot = new Telegraf(this.options.token)
  }

  async sendMessage(
    message: string,
    options?: ExtraReplyMessage,
    chatId: string = this.options.chatId,
  ) {
    await this.bot.telegram.sendMessage(chatId, message, {
      ...options,
      parse_mode: 'HTML',
    })
  }

  async sendPhoto(
    photo: string,
    message?: string,
    options?: ExtraReplyMessage,
    chatId: string = this.options.chatId,
  ) {
    await this.bot.telegram.sendPhoto(
      chatId,
      photo,
      message ? { caption: message } : {},
    )
  }
}
