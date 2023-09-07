import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function newDate(date: Date) {
    const dateFormat = format(date, "d de LLLL às HH:mm'h'", {
        locale: ptBR,
    })
    const relativeDate = formatDistanceToNow(date, {
        locale: ptBR,
        addSuffix: true,
    })
    return { dateFormat, relativeDate }
}
