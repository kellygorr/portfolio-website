/**
 * Consistent date formatting for `HighlightName.Dates` highlight values.
 * `Dates` is a free-text `body` string (see IProject.ts), so nothing
 * enforces its format at the type level — these helpers are the actual
 * mechanism for consistency: call one of these instead of hand-typing a
 * date string, and every project's Dates highlight renders in the same
 * style for its "shape" (single year, year range, month+year, month+
 * year range, full date, or full date range).
 *
 * Convention: months are ALWAYS abbreviated (3 letters + period), except
 * "May" which stays as-is since abbreviating it wouldn't shorten it.
 */

export type Month = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'

const abbr = (month: Month): string => (month === 'May' ? 'May' : `${month}.`)

/** e.g. formatYear(2018) -> "2018" */
export const formatYear = (year: number): string => `${year}`

/** e.g. formatYearRange(2025) -> "2025 - Present"; formatYearRange(2014, 2015) -> "2014 - 2015" */
export const formatYearRange = (startYear: number, end: number | 'Present' = 'Present'): string => `${startYear} - ${end}`

/**
 * e.g. formatMonthYear('Sep', 2020) -> "Sep. 2020"
 *      formatMonthYear('Sep', 2020, 'Present') -> "Sep. 2020 - Present"
 */
export const formatMonthYear = (month: Month, year: number, end?: number | 'Present'): string => {
	const base = `${abbr(month)} ${year}`
	return end !== undefined ? `${base} - ${end}` : base
}

/** e.g. formatMonthYearRange('May', 2015, 'Jun', 2015) -> "May 2015 - Jun. 2015" */
export const formatMonthYearRange = (startMonth: Month, startYear: number, endMonth: Month, endYear: number): string =>
	`${abbr(startMonth)} ${startYear} - ${abbr(endMonth)} ${endYear}`

/** e.g. formatFullDate('Mar', 29, 2015) -> "Mar. 29, 2015" */
export const formatFullDate = (month: Month, day: number, year: number): string => `${abbr(month)} ${day}, ${year}`

/**
 * e.g. formatFullDateRange('Jun', 17, 'Jun', 18, 2015) -> "Jun. 17 - 18, 2015"
 *      formatFullDateRange('Jun', 28, 'Jul', 2, 2015) -> "Jun. 28 - Jul. 2, 2015"
 */
export const formatFullDateRange = (startMonth: Month, startDay: number, endMonth: Month, endDay: number, year: number): string =>
	startMonth === endMonth
		? `${abbr(startMonth)} ${startDay} - ${endDay}, ${year}`
		: `${abbr(startMonth)} ${startDay} - ${abbr(endMonth)} ${endDay}, ${year}`
