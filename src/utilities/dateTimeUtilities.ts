import {
    addDays,
    startOfDay,
    nextMonday,
    nextTuesday,
    nextWednesday,
    nextThursday,
    nextFriday,
    nextSaturday,
    nextSunday,
    isValid,
    parse,
    isToday,
    isTomorrow,
    isSameDay,
    format,
    isBefore,
} from 'date-fns';
import nl from 'date-fns/locale/nl';

export type RelativeDateDescription =
    | 'today'
    | 'tomorrow'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday';

export function transformRelativeDateDescriptionToFormattedFixedDate(
    value: RelativeDateDescription,
): string {
    const now = new Date();

    switch (value) {
        case 'tomorrow':
            return format(addDays(now, 1), 'yyyy-MM-dd', { locale: nl });

        case 'monday':
            return format(nextMonday(now), 'yyyy-MM-dd', { locale: nl });

        case 'tuesday':
            return format(nextTuesday(now), 'yyyy-MM-dd', { locale: nl });

        case 'wednesday':
            return format(nextWednesday(now), 'yyyy-MM-dd', { locale: nl });

        case 'thursday':
            return format(nextThursday(now), 'yyyy-MM-dd', { locale: nl });

        case 'friday':
            return format(nextFriday(now), 'yyyy-MM-dd', { locale: nl });

        case 'saturday':
            return format(nextSaturday(now), 'yyyy-MM-dd', { locale: nl });

        case 'sunday':
            return format(nextSunday(now), 'yyyy-MM-dd', { locale: nl });

        default:
            console.warn(`'unsupported relative date description: '${value}'`);

            return value;
    }
}

export function parseDateDescription(value: string): Date | null {
    const normalizedValue = value.trim().toLowerCase() as
        | RelativeDateDescription
        | string;

    const today = startOfDay(new Date());

    switch (normalizedValue) {
        case 'today':
            return today;

        case 'tomorrow':
            return addDays(today, 1);

        case 'monday':
            return nextMonday(today);

        case 'tuesday':
            return nextTuesday(today);

        case 'wednesday':
            return nextWednesday(today);

        case 'thursday':
            return nextThursday(today);

        case 'friday':
            return nextFriday(today);

        case 'saturday':
            return nextSaturday(today);

        case 'sunday':
            return nextSunday(today);

        default: {
            const date = parse(value, 'yyyy-MM-dd', today, {
                locale: nl,
            });

            if (!isValid(date) || !date) {
                return null;
            }

            return date;
        }
    }
}

export function formatAsDateDescription(
    date: Date,
): RelativeDateDescription | string {
    if (isToday(date)) {
        return 'today';
    }

    if (isTomorrow(date)) {
        return 'tomorrow';
    }

    const today = startOfDay(new Date());

    if (isSameDay(date, nextMonday(today))) {
        return 'monday';
    }

    if (isSameDay(date, nextTuesday(today))) {
        return 'tuesday';
    }

    if (isSameDay(date, nextWednesday(today))) {
        return 'wednesday';
    }

    if (isSameDay(date, nextThursday(today))) {
        return 'thursday';
    }

    if (isSameDay(date, nextFriday(today))) {
        return 'friday';
    }

    if (isSameDay(date, nextSaturday(today))) {
        return 'saturday';
    }

    if (isSameDay(date, nextSunday(today))) {
        return 'sunday';
    }

    return formatAsDate(date);
}

export function formatAsDate(date: Date): string {
    return format(date, 'yyyy-MM-dd', { locale: nl });
}

export function determineUrgencyLevel(date: Date): 1 | 2 | 3 {
    if (isToday(date) || isBefore(date, new Date())) {
        return 1;
    }

    if (isTomorrow(date)) {
        return 2;
    }

    return 3;
}
