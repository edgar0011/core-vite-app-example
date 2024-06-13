import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'


dayjs.extend(customParseFormat)

export const DATE_FORMAT = 'DD.MM.YYYY'
export const DATE_TIME_FORMAT = 'DD.MM.YYYY HH:mm:ss'

export const formatDate = (date: string | Date): string => (dayjs(date) as Dayjs).format(DATE_FORMAT)
export const formatDateTime = (date: string | Date): string => (dayjs(date) as Dayjs).format(DATE_TIME_FORMAT)
